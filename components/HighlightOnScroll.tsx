"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Побуквенное «проявление» фразы-манифеста по скроллу
 * (механика и поправки: docs/spec-manifesto-block.md, §3).
 *
 * Слова в *звёздочках* — акцентные: курсив + пыльная роза в зажжённом
 * состоянии. Прогресс считает IntersectionObserver с порогами по буквам
 * на невидимом якоре; постоянных scroll/rAF-листенеров нет — короткий
 * rAF-цикл живёт только пока текущий индекс догоняет цель.
 *
 * SSR рендерит фразу полностью зажжённой: без JS и при reduced-motion блок
 * читается как обычный абзац.
 */

type Word = { text: string; accent: boolean; start: number };

function parseWords(src: string): { words: Word[]; total: number } {
  const words: Word[] = [];
  let open = false;
  let start = 0;
  for (const raw of src.split(/\s+/)) {
    if (!raw) continue;
    let accent = open;
    let text = raw;
    if (text.includes("*")) {
      accent = true;
      const stars = (text.match(/\*/g) ?? []).length;
      if (stars % 2 === 1) open = !open;
      text = text.replace(/\*/g, "");
    }
    if (text) {
      words.push({ text, accent, start });
      start += [...text].length;
    }
  }
  return { words, total: start };
}

export function HighlightOnScroll({ text }: { text: string }) {
  const { words, total } = useMemo(() => parseWords(text), [text]);
  // SSR-состояние — всё зажжено (деградация без JS / reduced-motion).
  const [lit, setLit] = useState(total);
  const rootRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const anchor = anchorRef.current;
    if (!root || !anchor) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const N = total;
    let target = N;
    let current = N;
    let first = true;
    let raf = 0;
    let io: IntersectionObserver | null = null;

    // Догон с адаптивным шагом: далёкая цель — крупнее шаг (быстрый скролл
    // не превращается в полутора-секундное доползание), близкая — по букве
    // за кадр. Цикл самозатухающий — вне анимации rAF не крутится.
    const step = () => {
      raf = 0;
      const diff = target - current;
      if (diff === 0) return;
      current += Math.sign(diff) * Math.max(1, Math.floor(Math.abs(diff) / 6));
      setLit(current);
      if (current !== target) raf = requestAnimationFrame(step);
    };
    const setTarget = (next: number, immediate = false) => {
      target = next;
      if (immediate) {
        current = next;
        setLit(next);
        return;
      }
      if (!raf && current !== target) raf = requestAnimationFrame(step);
    };

    const build = () => {
      io?.disconnect();
      // Якорь (55vh) начинается ровно от верха фразы и тянется вниз:
      // зажигание стартует в момент, когда первая строка входит в экран
      // снизу (не раньше!), и завершается, когда фраза целиком видна.
      // Якорь всегда ниже вьюпорта, поэтому ratio достигает 1 на любом
      // экране.
      const anchorH = window.innerHeight * 0.55;
      anchor.style.height = `${anchorH}px`;
      anchor.style.top = "0px";

      io = new IntersectionObserver(
        (entries) => {
          const e = entries[entries.length - 1];
          // Симметрично в обе стороны (по фидбеку владельца): прогресс
          // следует за видимостью якоря — фраза гаснет и разжигается при
          // каждом проезде, вниз и вверх.
          const ratio = e.isIntersecting ? e.intersectionRatio : 0;
          const next = Math.max(0, Math.min(N, Math.floor(ratio * N + 1e-6)));

          if (first) {
            // Первый замер задаёт стартовый прогресс без анимации — нет
            // вспышки гашения при открытии страницы сразу на манифесте.
            first = false;
            setTarget(next, true);
            return;
          }
          setTarget(next);
        },
        { threshold: Array.from({ length: N + 1 }, (_, i) => i / N) }
      );
      io.observe(anchor);
    };

    build();
    const onResize = () => build();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      io?.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [total]);

  return (
    <div className="manifesto-scroll" ref={rootRef}>
      <span className="manifesto-anchor" ref={anchorRef} aria-hidden="true" />
      <p className="manifesto-phrase">
        {words.map((w, wi) => (
          <span key={wi} className={`m-word${w.accent ? " m-accent" : ""}`}>
            {[...w.text].map((ch, ci) => (
              <span
                key={ci}
                className={`m-char${w.start + ci < lit ? " lit" : ""}`}
              >
                {ch}
              </span>
            ))}
            {wi < words.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}
