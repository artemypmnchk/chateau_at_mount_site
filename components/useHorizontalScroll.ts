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
 * На узких экранах и при prefers-reduced-motion трек не трогаем — там
 * работает нативный горизонтальный скролл со snap (см. CSS), а лента
 * следует за scrollLeft трека.
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

    const buildGradient = () => {
      if (!bgEl || colors.length < 2) return;
      const total = track.scrollWidth;
      bgEl.style.width = `${total}px`;
      const slides = Array.from(track.children) as HTMLElement[];
      const stops = colors.map((c, i) => {
        const el = slides[i];
        const pos = el
          ? ((el.offsetLeft + el.offsetWidth / 2) / total) * 100
          : (i / (colors.length - 1)) * 100;
        return `${c} ${pos.toFixed(2)}%`;
      });
      bgEl.style.background = `linear-gradient(90deg, ${stops.join(", ")})`;
    };
    buildGradient();

    const skip = window.matchMedia(
      "(max-width: 900px), (prefers-reduced-motion: reduce)"
    );
    let raf = 0;

    const update = () => {
      raf = 0;
      let p = 0;
      if (skip.matches) {
        track.style.transform = "";
        const max = track.scrollWidth - track.clientWidth;
        p = max > 0 ? track.scrollLeft / max : 0;
      } else {
        const rect = wrap.getBoundingClientRect();
        const runway = rect.height - window.innerHeight;
        if (runway <= 0) return;
        p = Math.min(1, Math.max(0, -rect.top / runway));
        const shift = Math.max(0, track.scrollWidth - track.clientWidth);
        track.style.transform = `translate3d(${-p * shift}px, 0, 0)`;
      }
      if (bgEl) {
        const bgShift = Math.max(0, bgEl.offsetWidth - track.clientWidth);
        bgEl.style.transform = `translate3d(${-p * bgShift}px, 0, 0)`;
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      buildGradient();
      schedule();
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    track.addEventListener("scroll", schedule, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      track.removeEventListener("scroll", schedule);
    };
  }, [wrapRef, trackRef, bgRef, colorsKey]);
}
