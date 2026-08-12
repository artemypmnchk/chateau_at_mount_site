/**
 * Пейзаж в первом экране «О нас»: взгляд издалека и сбоку.
 * Земля, на которой всё стоит, — одна прямая линия; за ней несколько дальних
 * гряд, они дают глубину. Слева на земле ряд виноградника в профиль, справа —
 * наше шато, над ними небольшое солнце.
 *
 * Здание срисовано с фотографий (`hero-building.jpg`): длинный низкий объём под
 * пологой двускатной кровлей с широким свесом, ритм высоких окон с импостом
 * посередине, справа высокий остеклённый угол под плоской плитой, а на плите
 * открытый бельведер: четыре колонны держат пологую пирамиду кровли. Пол
 * бельведера лежит на уровне конька основной кровли — как в оригинале.
 *
 * Геометрия строго фронтальная: карниз и конёк горизонтальны, скаты и вальма
 * симметричны. Перспективные завалы тут читаются не как ракурс, а как кривизна.
 * Внизу — цоколь: без него здание прорастает из земли, а не стоит на ней.
 *
 * Манера прежняя: волосяные линии трёх толщин, прямые торцы. Заливка только
 * цветом фона и только там, где ближний объём должен перекрыть дальний.
 * Декоративно (aria-hidden).
 */

const W = 440;
const H = 304;
const GY = 248; // земля — на ней стоит и ряд, и здание

// ——————————————————————————————————————————————————————————————
// Здание. Локальные координаты: земля — y = 0, вверх — минус.
// ——————————————————————————————————————————————————————————————

const BASE = -3.5; // верх цоколя: с него начинаются стены
const WALL_TOP = -32;

/** Окно с импостом: высокий прямоугольник, перемычка посередине */
function Win({ x, w }: { x: number; w: number }) {
  const top = -28;
  const h = 22.5;
  return (
    <g>
      <rect className="ab-hill-glass" x={x} y={top} width={w} height={h} />
      <rect className="ab-ln-fine" x={x} y={top} width={w} height={h} />
      <path className="ab-ln-fine" d={`M${x} -16.8 L${x + w} -16.8`} />
    </g>
  );
}

/**
 * Тонированная плоскость кровли: непрозрачная подложка, поверх — тон с
 * обводкой. Одним слоем нельзя — сквозь полупрозрачную заливку просвечивает
 * то, что под ней, и кровля двоится.
 */
function Roof({ d }: { d: string }) {
  return (
    <>
      <path className="ab-hill-mask" d={d} />
      <path className="ab-hill-solid is-roof" d={d} />
    </>
  );
}

/** Угловая колонна бельведера */
function Col({ x }: { x: number }) {
  return <rect className="ab-hill-solid" x={x - 1.5} y={-58} width={3} height={10.5} />;
}

function Winery() {
  return (
    <g className="ab-hill-bld">
      {/* — цоколь: здание стоит на земле, а не растёт из неё — */}
      <path className="ab-hill-solid" d={`M3 0 L3 ${BASE} L143 ${BASE} L143 0 Z`} />

      {/* — основной объём — */}
      <path
        className="ab-hill-solid"
        d={`M6 ${BASE} L6 ${WALL_TOP} L104 ${WALL_TOP} L104 ${BASE} Z`}
      />
      {/* торец — два окна */}
      <Win x={13} w={11} />
      <Win x={27} w={11} />
      {/* угол между торцом и длинным фасадом */}
      <path className="ab-ln-fine" d={`M44 ${WALL_TOP} L44 ${BASE}`} />
      {/* длинный фасад — три окна */}
      <Win x={53.25} w={10.5} />
      <Win x={68.75} w={10.5} />
      <Win x={84.25} w={10.5} />
      {/* водосточные трубы */}
      <path className="ab-ln-hair" d={`M45.6 ${WALL_TOP} L45.6 ${BASE} M98 ${WALL_TOP} L98 ${BASE}`} />

      {/* — кровля: щипец слева, горизонтальный конёк, справа вальма — */}
      <Roof d="M2 -32 L23 -46 L86 -46 L110 -32 Z" />
      {/* правый скат щипца отделяет торцовую плоскость от длинной */}
      <path className="ab-ln-fine" d="M23 -46 L47 -32" />
      <path className="ab-ln-hair" d="M2 -30.6 L110 -30.6" />

      {/* — высокий остеклённый угол; переплёт по центру грани — */}
      <path className="ab-hill-solid" d={`M104 ${BASE} L104 -44.5 L140 -44.5 L140 ${BASE} Z`} />
      <rect className="ab-hill-glass" x={111} y={-41.5} width={22} height={35.5} />
      <rect className="ab-ln-fine" x={111} y={-41.5} width={22} height={35.5} />
      {/* Переплёт как в оригинале: три неравные колонки — узкая, широкая, узкая;
          снизу одна большая створка в два ряда высотой, над ней глухой тёмный
          поясок, а выше два обычных ряда. Стойки в поясок не заходят — он
          монолитный, иначе полоса читается кладкой. */}
      <path
        className="ab-ln-fine"
        d="M117.2 -41.5 L117.2 -23.1 M127.8 -41.5 L127.8 -23.1
           M117.2 -20.7 L117.2 -6 M127.8 -20.7 L127.8 -6
           M111 -31.7 L133 -31.7"
      />
      <rect className="ab-hill-band" x={111} y={-23.1} width={22} height={2.4} />

      {/* — плита: пол бельведера на уровне конька основной кровли — */}
      <path className="ab-hill-solid" d="M100 -47.5 L144 -47.5 L144 -44.5 L100 -44.5 Z" />

      {/* — бельведер: три колонны, пустой балочный пояс, пологая пирамида.
           Пояс без насечек: с ними он читался кирпичной кладкой. — */}
      <Col x={109} />
      <Col x={123.25} />
      <Col x={137.5} />
      <path className="ab-hill-solid" d="M105 -61.5 L141 -61.5 L141 -58 L105 -58 Z" />
      <Roof d="M97 -62 L113 -69 L133 -69 L149 -62 Z" />
    </g>
  );
}

// ——————————————————————————————————————————————————————————————
// Ряд виноградника — в профиль: шпалерные столбы, сплошной полог листвы
// и грозди под ним.
// ——————————————————————————————————————————————————————————————

const ROW_L = 8;
const ROW_R = 196;
const POSTS = [8, 45.6, 83.2, 120.8, 158.4, 196];
const CANOPY_BOTTOM = -8.4;
const CANOPY_TOP = -20.5;
const LOBES = 22;
const STEP = (ROW_R - ROW_L) / LOBES;

/** Разброс кромок — детерминированный, чтобы полог не был причёсан гребёнкой */
function jit(i: number, seed: number) {
  if (i === 0 || i === LOBES) return 0;
  const s = Math.sin((i + 1) * seed) * 10000;
  return (s - Math.floor(s)) * 2 - 1;
}
/** К концам ряда полог оседает — иначе он обрывается как отпиленный брус */
const taper = (i: number) => {
  const e = Math.min(i, LOBES - i);
  return e >= 3 ? 0 : e === 2 ? 1.2 : e === 1 ? 2.6 : 4.4;
};

const topY = (i: number) => CANOPY_TOP + jit(i, 12.9898) * 2.3 + taper(i);
const botY = (i: number) => CANOPY_BOTTOM + jit(i, 78.233) * 1.3 - taper(i) * 0.35;

/**
 * Полог ряда — сплошная масса листвы с рваными кромками. На этом масштабе
 * отдельный лист не читается, а масса читается сразу — так ряд лозы и
 * выглядит издалека.
 */
function canopy() {
  let d = `M${ROW_L} ${botY(0).toFixed(1)}`;
  for (let i = 1; i <= LOBES; i++) {
    const x = ROW_L + STEP * i;
    d += ` Q${(x - STEP / 2).toFixed(1)} ${(botY(i - 1) + 1.8).toFixed(1)} ${x.toFixed(
      1
    )} ${botY(i).toFixed(1)}`;
  }
  d += ` L${ROW_R} ${topY(LOBES).toFixed(1)}`;
  for (let i = LOBES - 1; i >= 0; i--) {
    const x = ROW_L + STEP * i;
    d += ` Q${(x + STEP / 2).toFixed(1)} ${(topY(i) - 2.9).toFixed(1)} ${x.toFixed(
      1
    )} ${topY(i).toFixed(1)}`;
  }
  return `${d} Z`;
}

/** Псевдослучайное в [-1, 1]: грозди должны быть похожими, но не одинаковыми */
function rnd(i: number, seed: number) {
  const s = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return (s - Math.floor(s)) * 2 - 1;
}

/**
 * Гроздь. Настоящая кисть — не треугольник: самый широкий ряд не верхний, а
 * второй (это «плечи»), ягоды лежат смещёнными рядами и перекрывают друг друга,
 * книзу кисть сходит на одну ягоду, а бок слегка неровный. Ряды идут сверху
 * вниз, ближние ложатся поверх дальних — от этого кисть читается объёмной.
 */
const GRAPE_ROWS = [3, 4, 4, 3, 3, 2, 1];
function grapes(seed: number): [number, number, number][] {
  const out: [number, number, number][] = [];
  GRAPE_ROWS.forEach((n, i) => {
    const shift = rnd(i + 1, seed) * 0.3;
    for (let k = 0; k < n; k++) {
      out.push([
        (k - (n - 1) / 2) * 1.1 + shift,
        i * 1,
        0.62 + rnd(i * 7 + k + 3, seed) * 0.07,
      ]);
    }
  });
  return out;
}

/** Грозди — по три на пролёт между столбами: шаг ровный, и ни одна не садится
    на опору */
const SPAN = (POSTS[1] - POSTS[0]) / 3;
const CLUSTERS = Array.from(
  { length: (POSTS.length - 1) * 3 },
  (_, i) => POSTS[0] + SPAN / 2 + i * SPAN
);

function VineRow() {
  return (
    <g className="ab-hill-rows">
      {/* шпалерные столбы — держат проволоку, макушки торчат над листвой */}
      <path className="ab-ln-fine" d={POSTS.map((x) => `M${x} 0 L${x} -25`).join(" ")} />
      <path className="ab-hill-mask" d={canopy()} />
      <path className="ab-hill-solid is-leaf" d={canopy()} />
      {CLUSTERS.map((x, i) => (
        <g key={i} transform={`translate(${x.toFixed(1)} -9.2)`}>
          <path className="ab-ln-hair" d="M0 -1.6 L0.2 0" />
          {grapes(i + 1).map(([bx, by, r], k) => (
            <circle
              key={k}
              className="ab-hill-berry"
              cx={bx.toFixed(2)}
              cy={by}
              r={r.toFixed(2)}
            />
          ))}
        </g>
      ))}
    </g>
  );
}

// ——————————————————————————————————————————————————————————————
// Солнце
// ——————————————————————————————————————————————————————————————

const SUN = { x: 318, y: 90, r: 14 };
const RAYS = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI * 2) / 8 - Math.PI / 2;
  const r0 = SUN.r + 5;
  const r1 = SUN.r + 13;
  return `M${(SUN.x + Math.cos(a) * r0).toFixed(1)} ${(SUN.y + Math.sin(a) * r0).toFixed(
    1
  )} L${(SUN.x + Math.cos(a) * r1).toFixed(1)} ${(SUN.y + Math.sin(a) * r1).toFixed(1)}`;
}).join(" ");

export function HillScene() {
  return (
    <div className="ab-hill" aria-hidden>
      <svg viewBox={`0 0 ${W} ${H}`} className="ab-hill-svg">
        {/* Солнце */}
        <g className="ab-hill-sun">
          <circle className="ab-ln-fine" cx={SUN.x} cy={SUN.y} r={SUN.r} />
          <path className="ab-ln-hair ab-hill-rays" d={RAYS} />
        </g>

        {/* Дальние гряды: чем дальше, тем выше линия и тем мельче её волна */}
        <g className="ab-hill-far">
          <path
            className="ab-ln-hair"
            d="M0 200 C60 192 130 204 210 196 C290 188 360 201 440 194"
          />
          <path
            className="ab-ln-fine"
            d="M0 224 C50 215 120 229 200 220 C280 211 360 226 440 218"
          />
          {/* земля — прямая: на неё опирается цоколь */}
          <path className="ab-ln" d={`M0 ${GY} L${W} ${GY}`} />
        </g>

        {/* Ряд лозы слева */}
        <g transform={`translate(0 ${GY})`}>
          <VineRow />
        </g>

        {/* Шато справа */}
        <g transform={`translate(222 ${GY}) scale(1.42)`}>
          <Winery />
        </g>
      </svg>
    </div>
  );
}
