"use client";

import { useEffect, type RefObject } from "react";

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

/**
 * Горизонтальный проезд по вертикальному скроллу: секция-обёртка задаёт
 * «пробег», внутренняя панель прилипает (sticky), а трек сдвигается влево
 * пропорционально прогрессу прокрутки обёртки.
 *
 * `colors` (по одному на слайд) плавно перетекают друг в друга на фоне
 * `bgRef` по мере проезда — цвет сорта ведёт полотно.
 *
 * На узких экранах и при prefers-reduced-motion трек не трогаем — там
 * работает нативный горизонтальный скролл со snap (см. CSS), а фон
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
    const rgb = (colorsKey ?? "").split(",").filter(Boolean).map(hexToRgb);

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
      if (bgEl && rgb.length > 1) {
        const f = p * (rgb.length - 1);
        const i = Math.min(rgb.length - 2, Math.floor(f));
        const t = f - i;
        const mix = rgb[i].map((c, k) => Math.round(c + (rgb[i + 1][k] - c) * t));
        bgEl.style.backgroundColor = `rgb(${mix[0]}, ${mix[1]}, ${mix[2]})`;
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    track.addEventListener("scroll", schedule, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      track.removeEventListener("scroll", schedule);
    };
  }, [wrapRef, trackRef, bgRef, colorsKey]);
}
