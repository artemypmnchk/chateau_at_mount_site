"use client";

import { useBookingModal } from "./BookingModal";

/**
 * Финал страницы «О нас»: виноградная лоза обвивает кольцом единственную
 * кнопку-призыв, а снизу свисает крупная финальная гроздь. Формы (лист,
 * гроздь, усик) — те же, что у лозы-хребта (VineSpine). Кольцо
 * прорисовывается, а листья/грозди проявляются при въезде секции в экран
 * (класс .is-in от useReveal); при reduced-motion — сразу раскрыто.
 */

const LEAF_D =
  "M0 0 L3 -3 L2 -6 L7 -7 L4 -9 L3 -11 L9 -13 L6 -15 L5 -17 L8 -20 L4 -21 L3 -23 L0 -26 L-3 -23 L-4 -21 L-8 -20 L-5 -17 L-6 -15 L-9 -13 L-3 -11 L-4 -9 L-7 -7 L-2 -6 L-3 -3 Z";
const LEAF_VEINS =
  "M0 -1 L0 -24 M0 -4 L7 -7 M0 -4 L-7 -7 M0 -9 L9 -13 M0 -9 L-9 -13 M0 -14 L8 -20 M0 -14 L-8 -20";
const TENDRIL_D = "M0 0 C6 -3 13 -1 13 5 C13 10 5 12 3 5 C1.5 0 9 -1 9 4 C9 7 5 7 5 4";

// Крупная гроздь (референс #cl4) — ягоды + золотые блики
const BIG_B: [number, number][] = [
  [-3.4, -2], [3.4, -2], [-8, 2.6], [-1.5, 2.6], [4.5, 2.6], [9, 3], [-5.2, 7.2],
  [1.2, 7.2], [6.8, 7.6], [-7, 11.8], [-1, 12], [4.8, 12], [-3.4, 16.4],
  [2.4, 16.6], [-0.6, 21],
];
const BIG_H: [number, number, number][] = [
  [-4.2, -2.8, 0.9], [2.6, -2.8, 0.9], [-8.8, 1.8, 0.9], [-2.3, 1.8, 0.9],
];
// Малая гроздь на кольце (референс #cl3)
const SM_B: [number, number][] = [
  [-2.5, -1], [2.5, -1], [-5, 3], [0, 3], [5, 3], [-2.5, 7], [2.5, 7], [0, 11],
];

const CX = 180;
const CY = 120;
const RX = 150;
const RY = 82;
const K = 0.5523;
// Кольцо-эллипс (4 дуги Безье)
const RING = `M${CX} ${CY - RY} C${CX + RX * K} ${CY - RY} ${CX + RX} ${
  CY - RY * K
} ${CX + RX} ${CY} C${CX + RX} ${CY + RY * K} ${CX + RX * K} ${CY + RY} ${CX} ${
  CY + RY
} C${CX - RX * K} ${CY + RY} ${CX - RX} ${CY + RY * K} ${CX - RX} ${CY} C${
  CX - RX
} ${CY - RY * K} ${CX - RX * K} ${CY - RY} ${CX} ${CY - RY} Z`;

function pt(deg: number) {
  const th = (deg * Math.PI) / 180;
  const x = CX + RX * Math.cos(th);
  const y = CY + RY * Math.sin(th);
  const phi = (Math.atan2(y - CY, x - CX) * 180) / Math.PI;
  return { x: +x.toFixed(1), y: +y.toFixed(1), rot: +(phi + 90).toFixed(1) };
}

const LEAVES = [18, 52, 128, 152, 182, 214, 250, 288, 326].map((a, i) => ({
  ...pt(a),
  s: 1.05 + (i % 3) * 0.12,
}));
const SMALLS = [120, 60, 205].map((a) => pt(a));
const TENDRILS = [8, 172, 300].map((a) => pt(a));

export function CtaWreath() {
  const { openBooking } = useBookingModal();
  return (
    <div className="ab-cta-wreath" data-reveal>
      <svg viewBox="0 0 360 300" className="ab-wreath-svg" aria-hidden>
        <path className="ab-wreath-ring ab-vine-cane" d={RING} />

        {TENDRILS.map((p, i) => (
          <g
            key={`t${i}`}
            className="ab-wreath-deco"
            transform={`translate(${p.x} ${p.y}) rotate(${p.rot})`}
          >
            <path className="ab-vine-tendril" d={TENDRIL_D} />
          </g>
        ))}

        {LEAVES.map((p, i) => (
          <g
            key={`l${i}`}
            className="ab-wreath-deco"
            transform={`translate(${p.x} ${p.y}) rotate(${p.rot}) scale(${p.s})`}
          >
            <path className="ab-vine-leaf" d={LEAF_D} />
            <path className="ab-vine-vein" d={LEAF_VEINS} />
          </g>
        ))}

        {SMALLS.map((p, i) => (
          <g
            key={`s${i}`}
            className="ab-wreath-deco"
            transform={`translate(${p.x} ${p.y}) scale(1.15)`}
          >
            {SM_B.map(([cx, cy], j) => (
              <circle key={j} className="ab-vine-berry" cx={cx} cy={cy} r="3.2" />
            ))}
          </g>
        ))}

        {/* Финальная крупная гроздь — свисает снизу под кнопкой */}
        <g className="ab-wreath-deco ab-wreath-final" transform={`translate(${CX} 200) scale(2.6)`}>
          {BIG_B.map(([cx, cy], j) => (
            <circle key={j} className="ab-vine-berry" cx={cx} cy={cy} r="3.7" />
          ))}
          {BIG_H.map(([cx, cy, r], j) => (
            <circle key={`h${j}`} className="ab-vine-hi" cx={cx} cy={cy} r={r} />
          ))}
        </g>
      </svg>

      <button onClick={() => openBooking()} className="btn btn-accent ab-cta-btn">
        <span>Приехать в гости</span>
      </button>
    </div>
  );
}
