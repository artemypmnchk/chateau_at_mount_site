"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal в духе напских сайтов: элементы с [data-reveal] всплывают
 * из лёгкого сдвига при входе в вьюпорт, один раз. Каскад — через
 * CSS-переменную --reveal-delay на элементе.
 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
