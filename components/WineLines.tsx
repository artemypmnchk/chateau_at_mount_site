"use client";

import { t } from "@/lib/content";
import { LINES, LINE_COPY, byLine, linesUi } from "@/lib/lines";
import { useLocale } from "./locale";
import LineRow from "./LineRow";

/**
 * Блок вин на главной: шапка («Наши вина», заголовок, «Смотреть все вина»)
 * и три главы по линейкам. Глава = имя линейки, ряд вин LineRow (коллаж в
 * покое, лента без пина по клику/свайпу), строка характера и линия-штрих
 * в /wines#линейка. Ряд выезжает за колонку до кромки экрана — раскрытая
 * лента продолжается за край, это и есть подсказка «дальше есть ещё».
 * Чётные главы зеркальны. На ≤900px порядок: заголовок → ряд → описание.
 */
export default function WineLines() {
  const { L, lp } = useLocale();
  return (
    <section id="wines" className="wine-lines" data-header-theme="dark">
      <div className="container band-head" data-reveal>
        <div>
          <span className="eyebrow">{L(t.winesSection.eyebrow)}</span>
          <h2>{L(t.winesSection.title)}</h2>
          <span className="band-medals">{L(linesUi.headLine)}</span>
        </div>
        <a href={lp("/wines")} className="band-all">
          {L(t.winesSection.all)} →
        </a>
      </div>
      {LINES.map((line, ci) => {
        const c = LINE_COPY[line];
        return (
          <div key={line} className={`wl-ch${ci % 2 === 1 ? " reverse" : ""}`}>
            <div className="container wl-ch-grid">
              <div className="wl-ch-text" data-reveal>
                <h2>{c.title}</h2>
              </div>
              <div className="wl-ch-media">
                <LineRow wines={byLine(line)} line={line} lineColor={c.glow} />
              </div>
              <div
                className="wl-ch-foot"
                data-reveal
                style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
              >
                <p className="wl-lead">{L(c.lead)}</p>
                <a href={lp(`/wines#${line}`)} className="hero-link">
                  {L(linesUi.seeLine)}
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
