/**
 * Гравюрный пейзаж в первом экране «О нас» — по композиции классической
 * виноградниковой сцены: дорога уходит к горизонту, по обе стороны ряды лозы,
 * на холмах кипарисы, в небе облака и небольшое солнце. Передний план
 * обрамляют шпалерные столбы с крупными листьями, усиками и гроздьями —
 * именно они «объясняют» зрителю, что это виноградник.
 *
 * Манера прежняя: волосяные линии трёх толщин, прямые торцы. Единственная
 * заливка — у массивов листвы, и та цветом фона: она нужна, чтобы ближний ряд
 * перекрывал дальний. Ряды строятся к точке схода и обрезаются по краю дороги
 * (clipPath), чтобы не пересекать её. Декоративно (aria-hidden).
 */

const W = 420;
const H = 400;
const HZ = 150; // горизонт
const VP = { x: 211, y: 146 }; // точка схода рядов

// --- формы винограда (те же, что у лозы-хребта) ---
const LEAF_D =
  "M0 0 L3 -3 L2 -6 L7 -7 L4 -9 L3 -11 L9 -13 L6 -15 L5 -17 L8 -20 L4 -21 L3 -23 L0 -26 L-3 -23 L-4 -21 L-8 -20 L-5 -17 L-6 -15 L-9 -13 L-3 -11 L-4 -9 L-7 -7 L-2 -6 L-3 -3 Z";
const LEAF_VEINS =
  "M0 -1 L0 -23 M0 -6 L8 -11 M0 -6 L-8 -11 M0 -13 L7 -18 M0 -13 L-7 -18";
const TENDRIL_D = "M0 0 C6 -2 10 2 9 6 C8 10 2 10 2 6 C2 3 7 3 7 6";
const BERRIES: [number, number][] = [
  [-4, 0], [1, 0], [-6.5, 4.4], [-1.5, 4.4], [3.5, 4.4],
  [-4, 8.8], [1, 8.8], [-6.5, 13.2], [-1.5, 13.2], [-4, 17.4],
];

// --- дорога ---
const ROAD_L = "M206 151 C195 198 168 282 124 400";
const ROAD_R = "M216 151 C228 196 254 284 300 400";

// --- ряды лозы: сходятся к точке схода, обрезаются по полям ---
const ROW_X = [-300, -215, -135, -60, 10, 78, 340, 410, 484, 562, 646, 736];
const rowEndY = 158;
/**
 * Ряд лозы как сплошной массив листвы: низ идёт по линии ряда, верх —
 * фестонами (лоб за лобом), которые мельчают к горизонту. Заливка цветом
 * фона нужна, чтобы ближний ряд перекрывал дальний, — без неё листва
 * просвечивает насквозь и превращается в кашу.
 */
const FOLIAGE_N = 18;
function foliage(x0: number) {
  const t1 = (H - rowEndY) / (H - VP.y);
  const x1 = x0 + (VP.x - x0) * t1;
  const pts: { x: number; y: number; h: number }[] = [];
  for (let i = 0; i <= FOLIAGE_N; i++) {
    const t = i / FOLIAGE_N;
    const x = x0 + (x1 - x0) * t;
    const y = H + (rowEndY - H) * t;
    const h = 34 * Math.pow(1 - t, 1.45) + 3.5;
    pts.push({ x, y: y - h, h });
  }
  // низ — по земле, затем назад по кромке листвы фестонами
  let d = `M${x0.toFixed(1)} ${H} L${x1.toFixed(1)} ${rowEndY}`;
  d += ` L${pts[FOLIAGE_N].x.toFixed(1)} ${pts[FOLIAGE_N].y.toFixed(1)}`;
  for (let i = FOLIAGE_N - 1; i >= 0; i--) {
    const cur = pts[i];
    const prev = pts[i + 1];
    const mx = (cur.x + prev.x) / 2;
    const my = (cur.y + prev.y) / 2;
    const bulge = cur.h * 0.5 + 2;
    d += ` Q${mx.toFixed(1)} ${(my - bulge).toFixed(1)} ${cur.x.toFixed(1)} ${cur.y.toFixed(1)}`;
  }
  return d + " Z";
}

/** Лёгкая фактура внутри ближней части ряда — намёк на листья */
function foliageTexture(x0: number) {
  const t1 = (H - rowEndY) / (H - VP.y);
  const x1 = x0 + (VP.x - x0) * t1;
  const out: string[] = [];
  for (const t of [0.06, 0.16, 0.26, 0.37, 0.48]) {
    const x = x0 + (x1 - x0) * t;
    const y = H + (rowEndY - H) * t;
    const h = 34 * Math.pow(1 - t, 1.45) + 3.5;
    out.push(
      `M${x.toFixed(1)} ${(y - h * 0.25).toFixed(1)} C${(x - h * 0.3).toFixed(1)} ${(y - h * 0.5).toFixed(1)} ${(x - h * 0.34).toFixed(1)} ${(y - h * 0.7).toFixed(1)} ${(x - h * 0.16).toFixed(1)} ${(y - h * 0.86).toFixed(1)}`
    );
    out.push(
      `M${(x + h * 0.12).toFixed(1)} ${(y - h * 0.2).toFixed(1)} C${(x + h * 0.36).toFixed(1)} ${(y - h * 0.45).toFixed(1)} ${(x + h * 0.4).toFixed(1)} ${(y - h * 0.66).toFixed(1)} ${(x + h * 0.22).toFixed(1)} ${(y - h * 0.82).toFixed(1)}`
    );
  }
  return out.join(" ");
}

// --- кипарис ---
function cypress(x: number, base: number, h: number) {
  const w = h * 0.17;
  return `M${x} ${base} L${x} ${base - 4} M${x} ${base - 2} C${x - w} ${
    base - h * 0.42
  } ${(x - w * 0.72).toFixed(1)} ${base - h * 0.8} ${x} ${base - h} C${(
    x + w * 0.72
  ).toFixed(1)} ${base - h * 0.8} ${x + w} ${base - h * 0.42} ${x} ${base - 2} Z`;
}

// --- облако ---
function cloud(x: number, y: number, s: number) {
  return `M${x - 26 * s} ${y} C${x - 32 * s} ${y - 8 * s} ${x - 24 * s} ${
    y - 15 * s
  } ${x - 15 * s} ${y - 13 * s} C${x - 12 * s} ${y - 23 * s} ${x + 4 * s} ${
    y - 24 * s
  } ${x + 8 * s} ${y - 14 * s} C${x + 19 * s} ${y - 18 * s} ${x + 29 * s} ${
    y - 9 * s
  } ${x + 24 * s} ${y} Z`;
}

// --- трава пучком ---
function grass(x: number, y: number) {
  return `M${x - 7} ${y} C${x - 6} ${y - 8} ${x - 5} ${y - 11} ${x - 7} ${
    y - 15
  } M${x - 2} ${y} C${x - 1} ${y - 9} ${x} ${y - 13} ${x - 1} ${y - 18} M${
    x + 3
  } ${y} C${x + 4} ${y - 8} ${x + 6} ${y - 11} ${x + 8} ${y - 15}`;
}

const SUN = { x: 348, y: 46, r: 15 };
const RAYS = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI * 2) / 8 - Math.PI / 2;
  const r0 = SUN.r + 6;
  const r1 = SUN.r + 12;
  return `M${(SUN.x + Math.cos(a) * r0).toFixed(1)} ${(SUN.y + Math.sin(a) * r0).toFixed(1)} L${(SUN.x + Math.cos(a) * r1).toFixed(1)} ${(SUN.y + Math.sin(a) * r1).toFixed(1)}`;
}).join(" ");

/** Шпалерный столб с лозой — обрамляет кадр слева или справа */
function Post({ side }: { side: 1 | -1 }) {
  const x = side > 0 ? 38 : 382;
  const dir = side; // куда уходит рукав
  return (
    <g>
      <path
        className="ab-ln"
        d={`M${x - 8} ${H} L${x - 8} 236 C${x - 8} 232 ${x + 8} 232 ${x + 8} 236 L${
          x + 8
        } ${H}`}
      />
      <path className="ab-ln-hair" d={`M${x - 8} 252 L${x + 8} 252`} />
      {/* проволока внутрь кадра */}
      <path
        className="ab-ln-hair"
        d={`M${x + 8 * dir} 268 L${x + 96 * dir} 276 M${x + 8 * dir} 316 L${
          x + 92 * dir
        } 322`}
      />
      {/* рукав лозы вдоль проволоки */}
      <path
        className="ab-ln-fine"
        d={`M${x + 6 * dir} ${H - 6} C${x + 14 * dir} 340 ${x + 10 * dir} 300 ${
          x + 26 * dir
        } 274 C${x + 40 * dir} 252 ${x + 62 * dir} 262 ${x + 78 * dir} 272`}
      />
      {/* листья */}
      <g transform={`translate(${x + 30 * dir} 258) rotate(${-18 * dir}) scale(1.75)`}>
        <path className="ab-ln-fine" d={LEAF_D} />
        <path className="ab-ln-hair" d={LEAF_VEINS} />
      </g>
      <g transform={`translate(${x + 72 * dir} 296) rotate(${26 * dir}) scale(1.5)`}>
        <path className="ab-ln-fine" d={LEAF_D} />
        <path className="ab-ln-hair" d={LEAF_VEINS} />
      </g>
      <g transform={`translate(${x + 4 * dir} 312) rotate(${-40 * dir}) scale(1.55)`}>
        <path className="ab-ln-fine" d={LEAF_D} />
        <path className="ab-ln-hair" d={LEAF_VEINS} />
      </g>
      {/* усик */}
      <g transform={`translate(${x + 52 * dir} 268) scale(${1.25 * dir} 1.25)`}>
        <path className="ab-ln-hair" d={TENDRIL_D} />
      </g>
      {/* гроздь */}
      <g transform={`translate(${x + 44 * dir} 306) scale(1.35)`}>
        <path className="ab-ln-hair" d="M0 -7 L0.5 -1" />
        {BERRIES.map(([bx, by], i) => (
          <circle key={i} className="ab-ln-fine" cx={bx} cy={by} r="3" />
        ))}
      </g>
      <path className="ab-ln-hair" d={grass(x, H)} />
    </g>
  );
}

export function HillScene() {
  return (
    <div className="ab-hill" aria-hidden>
      <svg viewBox={`0 0 ${W} ${H}`} className="ab-hill-svg">
        <defs>
          <clipPath id="ab-field-l">
            <path d={`M0 ${HZ} L206 ${HZ} ${ROAD_L.slice(1)} L0 ${H} Z`} />
          </clipPath>
          <clipPath id="ab-field-r">
            <path d={`M216 ${HZ} L${W} ${HZ} L${W} ${H} L300 ${H} C254 284 228 196 216 151 Z`} />
          </clipPath>
        </defs>

        {/* Небо */}
        <g className="ab-hill-sun">
          <circle className="ab-ln-fine" cx={SUN.x} cy={SUN.y} r={SUN.r} />
          <path className="ab-ln-hair ab-hill-rays" d={RAYS} />
        </g>
        <g className="ab-hill-sky">
          <path className="ab-ln-fine" d={cloud(96, 56, 1.15)} />
          <path className="ab-ln-fine" d={cloud(238, 40, 0.85)} />
          <path className="ab-ln-hair" d={cloud(330, 104, 0.7)} />
        </g>

        {/* Дальние холмы и кипарисы */}
        <g className="ab-hill-far">
          <path
            className="ab-ln-hair"
            d="M0 128 C58 112 116 128 168 120 C226 111 288 126 350 116 C384 111 404 116 420 113"
          />
          <path
            className="ab-ln-fine"
            d={`M0 ${HZ - 8} C70 ${HZ - 20} 140 ${HZ - 4} 214 ${HZ - 12} C286 ${
              HZ - 20
            } 356 ${HZ - 4} 420 ${HZ - 12}`}
          />
          <path className="ab-ln-fine" d={cypress(58, HZ - 6, 62)} />
          <path className="ab-ln-fine" d={cypress(80, HZ - 4, 74)} />
          <path className="ab-ln-fine" d={cypress(101, HZ - 5, 56)} />
          <path className="ab-ln-fine" d={cypress(318, HZ - 5, 58)} />
          <path className="ab-ln-fine" d={cypress(339, HZ - 4, 72)} />
          <path className="ab-ln-fine" d={cypress(360, HZ - 6, 52)} />
        </g>

        {/* Линия горизонта */}
        <path
          className="ab-ln"
          d={`M0 ${HZ} C82 ${HZ - 4} 168 ${HZ + 3} 244 ${HZ - 1} C320 ${
            HZ - 5
          } 376 ${HZ + 2} 420 ${HZ - 2}`}
        />

        {/* Виноградник — по обе стороны дороги */}
        {/* Ряды рисуются от дальних к ближним: заливка листвы цветом фона
            даёт перекрытие, поэтому порядок важен */}
        <g className="ab-hill-rows">
          <g clipPath="url(#ab-field-l)">
            {ROW_X.slice(0, 6).map((x0, i) => (
              <g key={i}>
                <path className="ab-hill-foliage" d={foliage(x0)} />
                <path className="ab-ln-hair" d={foliageTexture(x0)} />
              </g>
            ))}
          </g>
          <g clipPath="url(#ab-field-r)">
            {[...ROW_X.slice(6)].reverse().map((x0, i) => (
              <g key={i}>
                <path className="ab-hill-foliage" d={foliage(x0)} />
                <path className="ab-ln-hair" d={foliageTexture(x0)} />
              </g>
            ))}
          </g>
        </g>

        {/* Дорога */}
        <g className="ab-hill-road">
          <path className="ab-ln-fine" d={ROAD_L} />
          <path className="ab-ln-fine" d={ROAD_R} />
          <g className="ab-ln-hair">
            <ellipse cx="205" cy="214" rx="2.6" ry="1.5" />
            <ellipse cx="219" cy="252" rx="3" ry="1.7" />
            <ellipse cx="198" cy="286" rx="3.4" ry="1.9" />
            <ellipse cx="228" cy="330" rx="3.8" ry="2.1" />
            <ellipse cx="196" cy="366" rx="4.2" ry="2.3" />
          </g>
        </g>

        {/* Передний план: шпалера слева и справа обрамляет кадр */}
        <g className="ab-hill-front">
          <Post side={1} />
          <Post side={-1} />
        </g>
      </svg>
    </div>
  );
}
