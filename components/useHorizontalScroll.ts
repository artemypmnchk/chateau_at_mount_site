"use client";

import { useEffect, type RefObject } from "react";

/**
 * Горизонтальный проезд по вертикальному скроллу: секция-обёртка задаёт
 * «пробег», внутренняя панель прилипает (sticky), а трек сдвигается влево
 * пропорционально прогрессу прокрутки обёртки.
 *
 * На узких экранах и при prefers-reduced-motion трек не трогаем — там
 * работает нативный горизонтальный скролл со snap (см. CSS).
 */
export function useHorizontalScroll(
  wrapRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const skip = window.matchMedia(
      "(max-width: 900px), (prefers-reduced-motion: reduce)"
    );
    let raf = 0;

    const update = () => {
      raf = 0;
      if (skip.matches) {
        track.style.transform = "";
        return;
      }
      const rect = wrap.getBoundingClientRect();
      const runway = rect.height - window.innerHeight;
      if (runway <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / runway));
      const shift = Math.max(0, track.scrollWidth - track.clientWidth);
      track.style.transform = `translate3d(${-p * shift}px, 0, 0)`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [wrapRef, trackRef]);
}
