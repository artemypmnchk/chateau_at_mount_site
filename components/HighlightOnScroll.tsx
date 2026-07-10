"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Побуквенное «проявление» фразы-манифеста по скроллу
 * (механика и поправки: docs/spec-manifesto-block.md, §3).
 *
 * Слова в *звёздочках* — акцентные: курсив + пыльная роза в зажжённом
 * состоянии. Прогресс считается напрямую от позиции фразы во вьюпорте
 * (getBoundingClientRect на passive-скролле, коалесится в один rAF-кадр):
 * 0 — верх фразы у нижней кромки экрана, 1 — верх поднялся до «линии
 * зажигания» (35vh). Выше линии прогресс держит 1 — фраза остаётся
 * полностью зажжённой, пока она на экране, и гаснет только уходя вниз.
 *
 * Раньше прогресс брался с IntersectionObserver по 55vh-якорю. От этого
 * отказались: (1) overflow:hidden на секции подрезал якорь, и хвост фразы
 * не догорал на низких секциях (мобайл); (2) ratio якоря падал, едва тот
 * уходил за верх экрана, — фраза «откатывалась» назад, ещё будучи целиком
 * видимой. Позиция фразы от обоих кейсов свободна.
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

  useEffect(() => {
    const root = rootRef.current;
    const phrase = root?.querySelector<HTMLElement>(".manifesto-phrase");
    if (!phrase) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const N = total;
    let target = N;
    let current = N;
    let first = true;
    let stepRaf = 0;
    let readRaf = 0;

    // Догон с адаптивным шагом: далёкая цель — крупнее шаг (быстрый скролл
    // не превращается в полутора-секундное доползание), близкая — по букве
    // за кадр. Цикл самозатухающий — вне анимации rAF не крутится.
    const step = () => {
      stepRaf = 0;
      const diff = target - current;
      if (diff === 0) return;
      current += Math.sign(diff) * Math.max(1, Math.floor(Math.abs(diff) / 6));
      setLit(current);
      if (current !== target) stepRaf = requestAnimationFrame(step);
    };
    const setTarget = (next: number, immediate = false) => {
      target = next;
      if (immediate) {
        current = next;
        setLit(next);
        return;
      }
      if (!stepRaf && current !== target) stepRaf = requestAnimationFrame(step);
    };

    // Прогресс = насколько верх фразы поднялся от нижней кромки экрана
    // (0) к «линии зажигания» на 35vh (1). Выше линии clamp держит 1:
    // фраза не гаснет, пока стоит в верхней части экрана, — гаснет лишь
    // уходя вниз (симметрично входу). Никакого якоря: overflow секции и
    // дрожь innerHeight на мобайле больше ни на что не влияют.
    const compute = () => {
      readRaf = 0;
      const H = window.innerHeight;
      const top = phrase.getBoundingClientRect().top;
      const enter = H; // верх фразы у нижней кромки → старт
      const full = H * 0.35; // верх фразы на 35vh → фраза зажжена целиком
      const p = Math.max(0, Math.min(1, (enter - top) / (enter - full)));
      const next = Math.round(p * N);
      // Первый замер — без анимации: не гасим восстановленный скролл/#about.
      setTarget(next, first);
      first = false;
    };

    const onScroll = () => {
      if (!readRaf) readRaf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (stepRaf) cancelAnimationFrame(stepRaf);
      if (readRaf) cancelAnimationFrame(readRaf);
    };
  }, [total]);

  return (
    <div className="manifesto-scroll" ref={rootRef}>
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
