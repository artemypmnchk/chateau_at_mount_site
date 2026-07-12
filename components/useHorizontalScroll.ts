"use client";

import { useEffect, type RefObject } from "react";

/**
 * Горизонтальный проезд по вертикальному скроллу: секция-обёртка задаёт
 * «пробег», внутренняя панель прилипает (sticky), а трек сдвигается влево
 * пропорционально прогрессу прокрутки обёртки.
 *
 * Фон — лента-градиент в `bgRef`, приклеенная к треку: та же ширина,
 * цветовые стопы под центрами слайдов. Каждая бутылка стоит на своём
 * цвете, а перетекание видно при листании.
 *
 * Проезд непрерывный: трек скользит ровно за скроллом с инерцией, а когда
 * скролл затихает внутри пина — мягкий магнит доводит до ближайшей бутылки.
 *
 * На тач-устройствах и при prefers-reduced-motion трек не трогаем — там
 * работает нативный горизонтальный скролл со snap (см. CSS): свайп вбок
 * листает вино, вертикальный скролл никто не отбирает. Хук в этом режиме
 * ведёт за scrollLeft ленту-градиент и кроссфейд соседних слайдов.
 */
export function useHorizontalScroll(
  wrapRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  opts?: { bgRef?: RefObject<HTMLElement | null>; colors?: string[] }
) {
  const bgRef = opts?.bgRef;
  const colorsKey = opts?.colors?.join(",");

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;
    const bgEl = bgRef?.current;
    const colors = (colorsKey ?? "").split(",").filter(Boolean);

    const slidesEls = Array.from(track.children) as HTMLElement[];
    const metaEls = slidesEls.map((el) =>
      el.querySelector<HTMLElement>(".band-meta")
    );

    // Геометрия проезда — от центров крайних слайдов, а не от scrollWidth:
    // тот теряет правый паддинг трека, и сдвиг «уезжал» при узких слайдах.
    // span — путь между центрами первого и последнего слайда,
    // base — поправка, ставящая первый слайд ровно в центр вьюпорта,
    // total — полная ширина полотна с симметричным правым хвостом.
    let span = 0;
    let base = 0;
    const measure = () => {
      const first = slidesEls[0];
      const last = slidesEls[slidesEls.length - 1];
      if (!first || !last) return 0;
      const c0 = first.offsetLeft + first.offsetWidth / 2;
      const cN = last.offsetLeft + last.offsetWidth / 2;
      span = cN - c0;
      base = c0 - track.clientWidth / 2;
      return last.offsetLeft + last.offsetWidth + first.offsetLeft;
    };

    const buildGradient = () => {
      const total = measure();
      if (!bgEl || colors.length < 2 || total <= 0) return;
      bgEl.style.width = `${total}px`;
      const stops = colors.map((c, i) => {
        const el = slidesEls[i];
        const pos = el
          ? ((el.offsetLeft + el.offsetWidth / 2) / total) * 100
          : (i / (colors.length - 1)) * 100;
        return `${c} ${pos.toFixed(2)}%`;
      });
      bgEl.style.background = `linear-gradient(90deg, ${stops.join(", ")})`;
    };
    buildGradient();

    const skip = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Тач — нативный режим, как reduced-motion: пин и инерция остаются
    // только колесу/клавиатуре. Живые matchMedia, а не снимок: системная
    // настройка reduced-motion может смениться по ходу сессии.
    const coarse = window.matchMedia("(pointer: coarse)");
    const isNative = () => skip.matches || coarse.matches;
    let raf = 0;
    // Инерция: трек и лента плавно догоняют целевой прогресс (lerp),
    // а не дёргаются за каждым тиком скролла (актуально только пину).
    const EASE = 0.09;
    let current = -1; // прогресс, отрисованный на экране
    let target = 0;

    const steps = Math.max(1, slidesEls.length - 1);

    let lastDir = 0; // направление последнего движения: 1 вперёд, -1 назад

    // Жест-лимит для тача: один свайп двигает максимум на одну бутылку.
    // На touchstart якоримся к отрисованной бутылке, и пока живёт жест
    // (включая инерцию после отпускания пальца) цель зажата соседними
    // слайдами. Колесо/клавиатура лимит снимают (гибридные устройства).
    let clampLo = -Infinity;
    let clampHi = Infinity;
    const anchorGesture = () => {
      const rect = wrap.getBoundingClientRect();
      const runway = rect.height - window.innerHeight;
      const p = runway > 0 ? -rect.top / runway : -1;
      // Вне пина не якоримся: флик, влетающий в секцию, остаётся
      // быстрым — пролистать ленту насквозь одним жестом можно.
      if (p <= 0.001 || p >= 0.999) {
        clampLo = -Infinity;
        clampHi = Infinity;
        return;
      }
      const idx = Math.round((current >= 0 ? current : p) * steps);
      clampLo = Math.max(0, (idx - 1) / steps);
      clampHi = Math.min(1, (idx + 1) / steps);
    };
    const releaseGesture = () => {
      clampLo = -Infinity;
      clampHi = Infinity;
    };

    const readTarget = () => {
      if (isNative()) {
        const max = track.scrollWidth - track.clientWidth;
        target = max > 0 ? track.scrollLeft / max : 0;
      } else {
        const rect = wrap.getBoundingClientRect();
        const runway = rect.height - window.innerHeight;
        if (runway <= 0) return;
        // Непрерывный прогресс: трек едет ровно за скроллом, без
        // квантования к слайдам — к бутылке подводит мягкий магнит ниже.
        // Жест-лимит: инерция может унести scrollY дальше, но трек
        // останавливается на соседней бутылке; рассинхрон со скроллом
        // невидим внутри пина, его тихо убирает магнит.
        const p = Math.min(
          clampHi,
          Math.max(clampLo, Math.min(1, Math.max(0, -rect.top / runway)))
        );
        if (p !== target) lastDir = p > target ? 1 : -1;
        target = p;
      }
    };

    const render = (p: number) => {
      const native = isNative();
      if (native) {
        // Трек скроллится сам; лента приклеена к его scrollLeft
        track.style.transform = "";
        if (bgEl) {
          bgEl.style.transform = `translate3d(${-track.scrollLeft}px, 0, 0)`;
        }
      } else {
        const tx = -(base + p * span);
        track.style.transform = `translate3d(${tx.toFixed(2)}px, 0, 0)`;
        // Лента едет тем же сдвигом — стопы остаются под центрами слайдов
        if (bgEl) {
          bgEl.style.transform = `translate3d(${tx.toFixed(2)}px, 0, 0)`;
        }
      }
      // Кроссфейд в обоих режимах: чем дальше слайд от центра сцены, тем
      // он тише и чуть мельче — переход читается как перетекание.
      // В нативном режиме соседи гаснут мягче (peek-стекло у кромок должно
      // читаться), а подписи — резче: шаг слайдов узкий (52vw), и на
      // середине свайпа широкие подписи (92vw) иначе накладывались бы.
      const dim = native ? 0.35 : 0.55;
      const metaFade = native ? 2 : 1.4;
      for (let i = 0; i < slidesEls.length; i++) {
        const d = Math.min(1, Math.abs(p * steps - i));
        slidesEls[i].style.opacity = (1 - d * dim).toFixed(3);
        slidesEls[i].style.transform = `scale(${(1 - d * 0.04).toFixed(4)})`;
        // Подпись гаснет раньше бутылки: у кромок экрана остаются
        // силуэты соседей, а не обрезанные полуслова названий
        const m = metaEls[i];
        if (m) m.style.opacity = Math.max(0, 1 - d * metaFade).toFixed(3);
      }
    };

    let settling = false; // магнит ведёт страницу — трек следует без лага

    const tick = () => {
      raf = 0;
      // В нативном режиме — без инерции, лента один в один за скроллом
      if (isNative() || current < 0) {
        current = target;
      } else {
        // Во время доводки сведение быстрое: путь уже сглажен ease-out
        // магнита, второй слой инерции давал «переехал-вернулся» и дрейф
        current += (target - current) * (settling ? 0.3 : EASE);
        if (Math.abs(target - current) < 0.0004) current = target;
      }
      render(current);
      if (current !== target) raf = requestAnimationFrame(tick);
    };

    // Магнит к бутылке: когда скролл затих внутри пина, страница сама
    // плавно доезжает до ближайшего слайда. Любой жест пользователя
    // (колесо, палец, клавиша) доводку отменяет — скролл не «отбирается».
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    let settleRaf = 0;
    const cancelSettle = () => {
      if (settleRaf) cancelAnimationFrame(settleRaf);
      settleRaf = 0;
      settling = false;
    };
    const settleToNearest = () => {
      if (isNative()) return;
      const rect = wrap.getBoundingClientRect();
      const runway = rect.height - window.innerHeight;
      if (runway <= 0) return;
      const p = -rect.top / runway;
      // Доводим только внутри пина: на кромках секция уже уезжает
      if (p <= 0.001 || p >= 0.999) return;
      // Магнит не спорит с направлением: заметный прогресс вперёд
      // (>12% шага — один тик колеса) доводит к следующему вину,
      // назад — зеркально. Откат против движения пользователя запрещён.
      // Позиция и цель — в пределах жест-лимита; deltaY считается от
      // сырого прогресса, чтобы вернуть уехавший на инерции scrollY.
      const pos = Math.min(clampHi, Math.max(clampLo, p)) * steps;
      const frac = pos - Math.floor(pos);
      let idx: number;
      if (lastDir > 0) idx = frac > 0.12 ? Math.ceil(pos) : Math.floor(pos);
      else if (lastDir < 0)
        idx = frac < 0.88 ? Math.floor(pos) : Math.ceil(pos);
      else idx = Math.round(pos);
      const nearest = Math.min(
        clampHi,
        Math.max(clampLo, Math.min(steps, Math.max(0, idx)) / steps)
      );
      const deltaY = (nearest - p) * runway;
      if (Math.abs(deltaY) < 1) return;
      const startY = window.scrollY;
      const t0 = performance.now();
      const dur = Math.min(700, 320 + Math.abs(deltaY));
      const ease = (t: number) => 1 - Math.pow(1 - t, 3);
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / dur);
        // behavior: instant — иначе глобальный scroll-behavior: smooth
        // превращает каждый кадр доводки в отдельную smooth-анимацию
        window.scrollTo({
          top: startY + deltaY * ease(k),
          behavior: "instant",
        });
        if (k < 1) {
          settleRaf = requestAnimationFrame(step);
        } else {
          settleRaf = 0;
          settling = false;
        }
      };
      cancelSettle();
      settling = true;
      settleRaf = requestAnimationFrame(step);
    };

    const armSettle = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settleToNearest, 180);
    };
    const schedule = () => {
      readTarget();
      if (!raf) raf = requestAnimationFrame(tick);
      armSettle();
    };
    const onResize = () => {
      buildGradient();
      schedule();
    };
    // Жест пользователя прерывает доводку, но перезаводит её таймер:
    // хвостовые wheel-события инерции трекпада не должны оставлять
    // кадр застрявшим «между винами» без шанса на магнит.
    const interrupt = () => {
      cancelSettle();
      armSettle();
    };
    // Колесо/клавиатура — не тач: снимаем жест-лимит, иначе стареющий
    // якорь последнего свайпа запер бы обычный скролл в ±1 слайде.
    const pointerInterrupt = () => {
      releaseGesture();
      interrupt();
    };
    // Пока палец на экране, магнит молчит совсем — не дёргаем страницу.
    // Здесь же ставится якорь жест-лимита: одна бутылка за свайп.
    const touchDown = () => {
      cancelSettle();
      clearTimeout(settleTimer);
      anchorGesture();
    };
    // Вкладка вернулась из фона: rAF там был заморожен — синхронизируем
    // кадр со скроллом мгновенно, без видимого доезда
    const onVisible = () => {
      if (document.hidden) return;
      current = -1;
      schedule();
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("wheel", pointerInterrupt, { passive: true });
    window.addEventListener("keydown", pointerInterrupt);
    window.addEventListener("touchstart", touchDown, { passive: true });
    window.addEventListener("touchend", interrupt, { passive: true });
    document.addEventListener("visibilitychange", onVisible);
    track.addEventListener("scroll", schedule, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(settleTimer);
      cancelSettle();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("wheel", pointerInterrupt);
      window.removeEventListener("keydown", pointerInterrupt);
      window.removeEventListener("touchstart", touchDown);
      window.removeEventListener("touchend", interrupt);
      document.removeEventListener("visibilitychange", onVisible);
      track.removeEventListener("scroll", schedule);
    };
  }, [wrapRef, trackRef, bgRef, colorsKey]);
}
