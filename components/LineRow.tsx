"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Wine, WineLine } from "@/lib/content";
import { LINE_COPY, linesUi } from "@/lib/lines";
import { useLocale } from "./locale";

/**
 * Ряд вин одной линейки в двух состояниях (DESIGN.md, правило 7).
 *
 * Покой («коллаж»): слайды стоят в потоке на полной ширине, но стянуты к
 * центральному трансформами (translateX + scale) — центральная бутылка
 * спереди и крупнее, соседи уходят назад и за неё ярусами. Подписи погашены.
 * Вьюпорт ряда — overflow:hidden, scrollLeft заранее стоит на слайде mid,
 * поэтому при раскрытии лента не едет. При чётном n визуальная ось коллажа —
 * зазор между двумя средними (квартет симметричен), и вся группа сдвинута
 * трансформом на полслайда (--shift), чтобы эта ось совпала с центром mid.
 *
 * Раскрыто («лента»): трансформы снимаются (соседи разъезжаются на свои
 * места), подписи проявляются, вьюпорт становится нативным горизонтальным
 * скроллом со snap. Соседи центра гаснут по расстоянию (кроссфейд), цвет
 * свечения следует за центральной бутылкой.
 *
 * Раскрытие: тап/клик по коллажу, горизонтальное перетаскивание, стрелки
 * (кнопки и клавиатура ← →), подсказка «листать». Уход ряда из вьюпорта
 * возвращает покой. Высота сцены одинакова в обоих состояниях — страница
 * не прыгает. Пина и перехвата вертикального скролла нет.
 */
export default function LineRow({
  wines,
  line,
  lineColor,
}: {
  wines: Wine[];
  line: WineLine;
  lineColor: string;
}) {
  const { L, lp } = useLocale();
  const n = wines.length;
  /** Индекс слайда, который центрируется при раскрытии. При чётном n — правая
   *  из двух средних: она позже в DOM и рисуется поверх, клик по центру
   *  коллажа попадает и фокусится в неё, а snap Chrome тянет ленту к
   *  сфокусированному слайду — mid обязан быть тем же слайдом. */
  const mid = Math.floor(n / 2);
  /** Визуальная ось коллажа: при чётном n — зазор между двумя средними,
   *  так квартет стоит симметрично, а не «на одну бутылку вбок» */
  const axis = (n - 1) / 2;
  /** Сдвиг группы в покое (в слайдах), чтобы ось коллажа встала на слайд mid:
   *  0 при нечётном n, −0.5 при чётном. Без него snap при раскрытии дёргал
   *  ленту на полслайда к ближайшему слайду. */
  const shift = mid - axis;
  const rootRef = useRef<HTMLDivElement>(null);
  const vpRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  /** Пока слайды разъезжаются (0.9s), snap выключен: иначе Chrome целится в
   *  трансформированную (ещё стянутую) коробку сфокусированного слайда,
   *  дёргает ленту и скользит обратно вслед за анимацией */
  const [settling, setSettling] = useState(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [centre, setCentre] = useState(mid);
  const openRef = useRef(false);
  const suppressClick = useRef(false);

  const slides = () =>
    Array.from(vpRef.current?.querySelectorAll<HTMLElement>(".wl-slide") ?? []);

  /** Ставит scrollLeft так, чтобы слайд i оказался по центру вьюпорта.
   *  Дробный i (x.5) — центр зазора между соседними слайдами. */
  const centreOn = useCallback((i: number, smooth = false) => {
    const vp = vpRef.current;
    const els = slides();
    const a = els[Math.floor(i)];
    const b = els[Math.ceil(i)];
    if (!vp || !a || !b) return;
    const ca = a.offsetLeft + a.offsetWidth / 2;
    const cb = b.offsetLeft + b.offsetWidth / 2;
    const left = (ca + cb) / 2 - vp.clientWidth / 2;
    vp.scrollTo({ left, behavior: smooth ? "smooth" : "instant" });
  }, []);

  const openRow = useCallback(() => {
    if (openRef.current) return;
    openRef.current = true;
    setOpen(true);
    setSettling(true);
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => setSettling(false), 950);
  }, []);

  const closeRow = useCallback(() => {
    openRef.current = false;
    setOpen(false);
    setSettling(false);
    if (settleTimer.current) clearTimeout(settleTimer.current);
    setCentre(mid);
    requestAnimationFrame(() => centreOn(mid));
  }, [centreOn, mid]);

  useEffect(
    () => () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
    },
    []
  );

  // Покой: слайд mid всегда в центре вьюпорта (и после ресайза)
  useEffect(() => {
    centreOn(mid);
    const onResize = () => {
      if (!openRef.current) centreOn(mid);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [centreOn, mid]);

  // Кроссфейд соседей и центр — по реальному scrollLeft (только раскрыто)
  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    let raf = 0;
    const render = () => {
      raf = 0;
      const els = slides();
      const c = vp.scrollLeft + vp.clientWidth / 2;
      let best = 0;
      let bestD = Infinity;
      els.forEach((el, i) => {
        const w = el.offsetWidth || 1;
        const d = Math.abs(el.offsetLeft + w / 2 - c) / w;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
        const m = el.querySelector<HTMLElement>(".wl-slide-meta");
        if (openRef.current) {
          el.style.opacity = (1 - Math.min(1, d) * 0.45).toFixed(3);
          if (m) m.style.opacity = Math.max(0, 1 - d * 2).toFixed(3);
        } else {
          el.style.opacity = "";
          if (m) m.style.opacity = "";
        }
      });
      setCentre((cur) => (cur === best ? cur : best));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    vp.addEventListener("scroll", schedule, { passive: true });
    schedule();
    return () => {
      vp.removeEventListener("scroll", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [open]);

  // Ушёл из вьюпорта — снова коллаж
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting && openRef.current) closeRow();
        }
      },
      { threshold: 0 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [closeRow]);

  // Перетаскивание указателем: в покое — раскрывает и тянет ленту в том же
  // жесте; в раскрытом — drag-to-scroll для мыши (тач скроллит нативно).
  useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    let downX = 0;
    let downY = 0;
    let lastX = 0;
    let dragging = false;
    let id: number | null = null;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      id = e.pointerId;
      downX = lastX = e.clientX;
      downY = e.clientY;
      dragging = false;
      vp.classList.remove("is-dragging");
    };
    const onMove = (e: PointerEvent) => {
      if (id !== e.pointerId) return;
      const dx = e.clientX - downX;
      const dy = e.clientY - downY;
      if (!dragging) {
        if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy)) return;
        dragging = true;
        vp.classList.add("is-dragging");
        openRow();
        try {
          vp.setPointerCapture(e.pointerId);
        } catch {}
      }
      vp.scrollLeft -= e.clientX - lastX;
      lastX = e.clientX;
    };
    const settle = () => {
      // Доводка к ближайшему слайду после ручного протаскивания
      const els = slides();
      const c = vp.scrollLeft + vp.clientWidth / 2;
      let best = 0;
      let bestD = Infinity;
      els.forEach((el, i) => {
        const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - c);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      centreOn(best, true);
    };
    const onUp = (e: PointerEvent) => {
      if (id !== e.pointerId) return;
      id = null;
      if (dragging) {
        suppressClick.current = true;
        setTimeout(() => (suppressClick.current = false), 0);
        vp.classList.remove("is-dragging");
        settle();
      }
      dragging = false;
    };
    vp.addEventListener("pointerdown", onDown);
    vp.addEventListener("pointermove", onMove);
    vp.addEventListener("pointerup", onUp);
    vp.addEventListener("pointercancel", onUp);
    return () => {
      vp.removeEventListener("pointerdown", onDown);
      vp.removeEventListener("pointermove", onMove);
      vp.removeEventListener("pointerup", onUp);
      vp.removeEventListener("pointercancel", onUp);
    };
  }, [centreOn, openRow]);

  const step = (dir: 1 | -1) => {
    if (!openRef.current) {
      // Первая стрелка из покоя — только раскрыть, бутылка не уезжает
      openRow();
      return;
    }
    const next = Math.max(0, Math.min(n - 1, centre + dir));
    centreOn(next, true);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (!openRef.current && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openRow();
    }
  };

  const glow = open ? (wines[centre]?.band ?? lineColor) : lineColor;
  /** Масштаб коллажа в покое: короткий ряд крупнее, чтобы четыре бутылки
   *  Rare не выглядели мелкими рядом с семью Classic (7 — полный ряд) */
  const k = 1 + Math.max(0, 7 - n) * 0.06;

  return (
    <div
      ref={rootRef}
      className={`wl-row${open ? " is-open" : ""}${settling ? " is-settling" : ""}`}
      style={{ "--c": glow, "--k": k, "--shift": shift } as React.CSSProperties}
    >
      <div className="wl-row-glow" aria-hidden />
      <div
        ref={vpRef}
        className="wl-row-vp"
        tabIndex={0}
        role="region"
        aria-label={`${LINE_COPY[line].title}: ${L(LINE_COPY[line].count)}`}
        onKeyDown={onKey}
      >
        <div className="wl-row-track">
          {wines.map((w, i) => {
            const d = i - axis;
            return (
              <a
                key={w.slug}
                href={lp(`/wines/${w.slug}`)}
                className="wl-slide"
                style={
                  {
                    "--d": d,
                    "--ad": Math.abs(d),
                    "--z": 10 - Math.ceil(Math.abs(d)),
                  } as React.CSSProperties
                }
                onClick={(e) => {
                  if (suppressClick.current) {
                    e.preventDefault();
                    return;
                  }
                  if (!openRef.current) {
                    e.preventDefault();
                    openRow();
                  }
                }}
                tabIndex={open ? 0 : -1}
                aria-hidden={!open}
              >
                <div
                  className="wl-slide-bottle"
                  data-reveal
                  style={
                    {
                      "--reveal-delay": `${80 + Math.abs(d) * 70}ms`,
                    } as React.CSSProperties
                  }
                >
                  <Image
                    src={w.image}
                    alt={w.name}
                    fill
                    /* Видимая ширина бутылки (contain в слайде 250×360, PNG
                       410×1542 — в основном прозрачный) ≈ 96px, ×1.3 в коллаже;
                       на мобиле ≈ 66px ×1.2. По ширине слайда браузер брал
                       w=384 и ~45 KB на бутылку. */
                    sizes="(max-width: 900px) 84px, 128px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <div className="wl-slide-meta">
                  <h3>{w.name}</h3>
                  {/* Награды — строка-кредит конкурсов (без счётчика и
                      «Подробнее»: бутылка целиком ссылка, решение 03.09.2026) */}
                  <p className="band-award-line">
                    {w.awards
                      ?.map((a) => a.competition)
                      .filter(Boolean)
                      .join("  ·  ")}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      {/* Полка: в покое — подсказка «листать», раскрыто — стрелки
          (счётчик живёт в подписи бутылки) */}
      <div className="wl-row-shelf">
        {open ? (
          <>
            <button
              type="button"
              className="wl-row-arrow"
              onClick={() => step(-1)}
              aria-label={L(linesUi.prev)}
              disabled={centre === 0}
            >
              ←
            </button>
            <button
              type="button"
              className="wl-row-arrow"
              onClick={() => step(1)}
              aria-label={L(linesUi.next)}
              disabled={centre === n - 1}
            >
              →
            </button>
          </>
        ) : (
          <button type="button" className="wl-row-hint" onClick={openRow}>
            {L(linesUi.browse)} →
          </button>
        )}
      </div>
    </div>
  );
}
