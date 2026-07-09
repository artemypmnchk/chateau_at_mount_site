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

    const skip = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    // Инерция: трек и лента плавно догоняют целевой прогресс (lerp),
    // а не дёргаются за каждым тиком скролла.
    const EASE = 0.09;
    let current = -1; // прогресс, отрисованный на экране
    let target = 0;

    const readTarget = () => {
      if (skip.matches) {
        const max = track.scrollWidth - track.clientWidth;
        target = max > 0 ? track.scrollLeft / max : 0;
      } else {
        const rect = wrap.getBoundingClientRect();
        const runway = rect.height - window.innerHeight;
        if (runway <= 0) return;
        const p = Math.min(1, Math.max(0, -rect.top / runway));
        // Квантуем к ближайшему слайду: проезд шагает от вина к вину,
        // в покое всегда бутылка по центру — никаких «между».
        const steps = Math.max(1, track.children.length - 1);
        target = Math.round(p * steps) / steps;
      }
    };

    const render = (p: number) => {
      if (skip.matches) {
        track.style.transform = "";
      } else {
        const shift = Math.max(0, track.scrollWidth - track.clientWidth);
        track.style.transform = `translate3d(${-p * shift}px, 0, 0)`;
      }
      if (bgEl) {
        const bgShift = Math.max(0, bgEl.offsetWidth - track.clientWidth);
        bgEl.style.transform = `translate3d(${-p * bgShift}px, 0, 0)`;
      }
    };

    const tick = () => {
      raf = 0;
      // На нативном свайпе и при reduced-motion — без инерции, один в один
      if (skip.matches || current < 0) {
        current = target;
      } else {
        current += (target - current) * EASE;
        if (Math.abs(target - current) < 0.0004) current = target;
      }
      render(current);
      if (current !== target) raf = requestAnimationFrame(tick);
    };
    const schedule = () => {
      readTarget();
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      buildGradient();
      schedule();
    };

    schedule();
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
