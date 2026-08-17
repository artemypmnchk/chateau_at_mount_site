"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Виноградная лоза-хребет страницы «О нас» (спека: docs/spec-about-page.md).
 * Формы листа/гроздей/усика/узлов — по мотивам casamoldovei.ru. Побег
 * прорастает сверху вниз по скроллу (stroke-dashoffset); по всей ветке —
 * частые крупные грозди и множество курчавых усиков с обеих сторон,
 * растущих прямо из ветки. Всё «распускается», когда до него дорастает
 * лоза. Заодно ведёт «свет за скроллом» (--ab-warm на <html>).
 * Декоративно (aria-hidden); при reduced-motion всё раскрыто статично.
 */

const BAND = 130;

// Зубчатый лист + пальчатое жилкование
const LEAF_D =
  "M0 0 L3 -3 L2 -6 L7 -7 L4 -9 L3 -11 L9 -13 L6 -15 L5 -17 L8 -20 L4 -21 L3 -23 L0 -26 L-3 -23 L-4 -21 L-8 -20 L-5 -17 L-6 -15 L-9 -13 L-3 -11 L-4 -9 L-7 -7 L-2 -6 L-3 -3 Z";
const LEAF_VEINS =
  "M0 -1 L0 -24 M0 -4 L7 -7 M0 -4 L-7 -7 M0 -9 L9 -13 M0 -9 L-9 -13 M0 -14 L8 -20 M0 -14 L-8 -20";

// Курчавые усики-кудри (2 варианта), растут из ветки и сворачиваются в спираль
const TENDRILS = [
  "M0 0 C6 -3 13 -1 13 5 C13 10 5 12 3 5 C1.5 0 9 -1 9 4 C9 7 5 7 5 4",
  "M0 0 C7 -2 11 4 7 9 C3 13 -3 10 -1 4 C0.5 0.5 7 0 7 5 C7 8 4 8 4 5",
];

// Грозди трёх размеров: конус из перекрывающихся ягод, сужается книзу.
// Блики не хранятся — считаются от каждой ягоды при отрисовке.
const CL: Record<string, { r: number; b: [number, number][] }> = {
  cl2: {
    r: 3.4,
    b: [
      [-3, -1], [3, -1], [-6, 3.4], [0, 3.4], [6, 3.4], [-3, 7.8], [3, 7.8],
      [-4.5, 12.2], [1.5, 12.2], [-1.5, 16.4],
    ],
  },
  cl3: {
    r: 3.2,
    b: [
      [-2.5, -1], [2.5, -1], [-5, 3], [0, 3], [5, 3], [-2.5, 7], [2.5, 7], [0, 11],
    ],
  },
  cl4: {
    r: 3.7,
    b: [
      [-3.4, -2], [3.4, -2], [-8, 2.6], [-1.5, 2.6], [4.5, 2.6], [9, 3],
      [-5.2, 7.2], [1.2, 7.2], [6.8, 7.6], [-7, 11.8], [-1, 12], [4.8, 12],
      [-3.4, 16.4], [2.4, 16.6], [-0.6, 21],
    ],
  },
};

type Recipe = {
  stem: string;
  leaves: [number, number][];
  cl: string;
  ct: [number, number, number, number];
};

const NODES: Recipe[] = [
  { stem: "M0 -2 L1 3", leaves: [[-52, 0.5], [-8, 0.44], [40, 0.5]], cl: "cl4", ct: [1, 3, 5, 0.86] },
  { stem: "M0 -2 L0 3", leaves: [[-42, 0.5], [28, 0.46]], cl: "cl3", ct: [0, 3, -6, 0.8] },
  { stem: "M0 -2 L0 3", leaves: [[-62, 0.46], [-28, 0.5], [8, 0.46], [48, 0.48]], cl: "cl4", ct: [0, 3, -4, 0.82] },
  { stem: "M0 -2 L1 3", leaves: [[-46, 0.56], [2, 0.5], [50, 0.54]], cl: "cl4", ct: [1, 4, 4, 1] },
  { stem: "M0 -2 L0 3", leaves: [[-58, 0.48], [-10, 0.5]], cl: "cl3", ct: [0, 3, -8, 0.9] },
  { stem: "M0 -2 L1 3", leaves: [[-50, 0.5], [-18, 0.46], [18, 0.5], [58, 0.46]], cl: "cl4", ct: [1, 3, 6, 0.84] },
  { stem: "M0 -2 L0 3", leaves: [[-58, 0.48], [-22, 0.5], [12, 0.46], [52, 0.5]], cl: "cl3", ct: [0, 3, 5, 0.8] },
  { stem: "M0 -2 L-1 3", leaves: [[-50, 0.5], [-6, 0.48]], cl: "cl4", ct: [-1, 3, -8, 0.82] },
];

type Deco =
  | { kind: "cluster"; t: number; sideX: 1 | -1; size: number; r: number; rot: number }
  | { kind: "tendril"; t: number; sideX: 1 | -1; size: number; v: number; rot: number };

// Грозди — равномерно по всей странице, все разные (размер, вид, наклон, сторона)
const CLUSTER_N = 35;
/* Разброс намеренно узкий. Раньше стояло 1.35…2.15, и вместе с разной массой
   рецептов (см. NORM ниже) соседние грозди отличались почти вдвое — на
   мелкой лозе это читалось не «все разные», а «часть недоросла». */
const CLUSTER_SIZES = [1.8, 1.68, 1.9, 1.74, 1.64, 1.86, 1.7, 1.82, 1.66];
const RECIPE_ORDER = [0, 3, 6, 1, 4, 7, 2, 5];
const CLUSTER_ROTS = [0, -6, 5, -3, 7, -4, 3, -8, 4];

/**
 * Выравнивание рецептов по видимому размеру.
 *
 * Рецепты разной массы: в cl4 пятнадцать ягод и полуширина 12.7 единицы,
 * в cl3 — восемь и 8.2, плюс у каждого свой множитель ct. В сумме широкая
 * гроздь выходила в 1.86 раза шире узкой, и это, а не список размеров, было
 * главной причиной пестроты: рядом стояли грозди 21px и 40px.
 *
 * Здесь для каждого рецепта считается его собственная полуширина, и размер
 * потом делится на неё — так рецепт задаёт рисунок грозди (сколько ягод, как
 * лежат, крупные или мелкие), но не её габарит. Габарит остаётся за
 * CLUSTER_SIZES, где разброс виден и управляем.
 *
 * Опорное значение — средняя полуширина по всем рецептам: так средний размер
 * грозди остаётся прежним и лоза в целом не мельчает и не грубеет.
 */
/* Точки контура листа — из LEAF_D, парами. Нужны, чтобы честно посчитать,
   насколько лист вылезает вбок после своего поворота: у узких гроздей листья
   не ужимались вместе с ягодами, и нормировка по одной грозди делала разброс
   не меньше, а больше. */
const LEAF_PTS: [number, number][] = (() => {
  const nums = (LEAF_D.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
  const pts: [number, number][] = [];
  for (let i = 0; i + 1 < nums.length; i += 2) pts.push([nums[i], nums[i + 1]]);
  return pts;
})();

/** Полуширина фигуры после поворота на deg и масштаба sc */
const spread = (pts: [number, number][], deg: number, sc: number) => {
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return sc * Math.max(...pts.map(([x, y]) => Math.abs(x * c - y * s)));
};

/** Видимая полуширина рецепта целиком: и грозди, и листьев */
const halfWidth = (n: Recipe) => {
  const cl = CL[n.cl];
  const berries = spread(cl.b, n.ct[2], n.ct[3]) + cl.r * n.ct[3];
  const cluster = Math.abs(n.ct[0]) + berries;
  const leaves = Math.max(
    ...n.leaves.map(([rot, sc]) => spread(LEAF_PTS, rot, sc))
  );
  return Math.max(cluster, leaves);
};
const REF_HALF = NODES.reduce((a, n) => a + halfWidth(n), 0) / NODES.length;
const NORM = NODES.map((n) => REF_HALF / halfWidth(n));

/**
 * Грозди и усики для заданного их числа. Число зависит от ширины полосы:
 * на узких экранах орнамент мельче, и чтобы плотность рисунка осталась
 * прежней, гроздей нужно больше — иначе лоза читается голой ниткой с
 * редкими крапинками вместо сплошного орнамента.
 * Усики идут строго в просветах между гроздьями (по одному в каждый плюс по
 * одному до первой и после последней): два независимых ряда расходились
 * шагами и местами накладывались друг на друга.
 */
function makeDecos(n: number): Deco[] {
  const t = (i: number) => 0.02 + (0.96 * i) / (n - 1);
  const clusters: Deco[] = Array.from({ length: n }, (_, i) => {
    const r = RECIPE_ORDER[i % RECIPE_ORDER.length];
    return {
      kind: "cluster" as const,
      t: t(i),
      sideX: (i % 2 ? -1 : 1) as 1 | -1,
      // NORM снимает разницу в габарите между рецептами, CLUSTER_SIZES
      // оставляет управляемый разброс поверх неё
      size: CLUSTER_SIZES[i % CLUSTER_SIZES.length] * NORM[r],
      r,
      rot: CLUSTER_ROTS[i % CLUSTER_ROTS.length],
    };
  });
  const half = (t(1) - t(0)) / 2;
  const ts = [
    t(0) - half,
    ...Array.from({ length: n - 1 }, (_, i) => (t(i) + t(i + 1)) / 2),
    t(n - 1) + half,
  ];
  const tendrils: Deco[] = ts.map((tt, i) => ({
    kind: "tendril" as const,
    t: tt,
    sideX: (i % 2 ? 1 : -1) as 1 | -1,
    size: 1.2 + (i % 4) * 0.28,
    v: i % 2,
    rot: [8, 20, -6, 32][i % 4],
  }));
  return [...clusters, ...tendrils];
}

/**
 * Два разных множителя, и это намеренно.
 *
 * k — во сколько раз полоса уже эталонных BAND. Им ужимается только
 * горизонтальная геометрия побега: размах ветки должен уложиться в отведённое
 * поле, каким бы узким оно ни было.
 *
 * orn — насколько мельче сам орнамент: грозди, усики, толщина линий. Он
 * растёт медленнее (k^0.55), потому что при честном k рисунок на телефоне
 * распадался — грозди по 12px на нитке в 1px с шагом в 70px читались не
 * лозой, а проволокой с крапинами. Замерено: плотность (ширина грозди к шагу
 * между соседями) падала с 0.43 на десктопе до 0.17 на телефоне.
 *
 * Вертикаль не масштабируется никогда: лоза идёт во всю высоту страницы,
 * а плотность выравнивается числом гроздей, а не сжатием побега.
 */
const ornScale = (k: number) => Math.pow(k, 0.55);

/** Горизонтальное положение побега на высоте y (см. k выше). */
function xAt(y: number, k: number): number {
  return (84 + 14 * Math.sin(y * 0.02) + 6 * Math.sin(y * 0.055 + 1)) * k;
}

type Placed = Deco & { nx: number; ny: number };

export function VineSpine() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const caneRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<SVGGElement>(null);
  const [geo, setGeo] = useState<{
    h: number;
    band: number;
    d: string;
    placed: Placed[];
  }>({
    h: 0,
    band: BAND,
    d: "",
    placed: [],
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const main = wrap?.parentElement;
    if (!wrap || !main) return;
    const build = () => {
      // На узких экранах лоза стартует не от нуля, а из-под шапки (CSS даёт
      // .ab-spine отступ сверху) — иначе побег прорастал прямо из логотипа.
      // Вычитаем этот отступ из высоты, чтобы низ лозы по-прежнему сходился
      // с низом страницы, а не уезжал за неё.
      const topOff = parseFloat(getComputedStyle(wrap).top) || 0;
      const h = Math.max(1, main.scrollHeight - topOff);
      // Ширину полосы задаёт CSS (--ab-band по брейкпоинтам) — там же, где
      // страница отводит под лозу левое поле. Так вёрстка и рисунок не могут
      // разъехаться, и до гидрации поле уже правильной ширины: без скачка.
      // Берём именно измеренную ширину обёртки, а не getPropertyValue:
      // у некастомизированного свойства computed value — это подставленная
      // строка «calc(130px * 0.4)», из которой парсится не то число.
      const band = wrap.getBoundingClientRect().width || BAND;
      const k = band / BAND;
      const orn = ornScale(k);
      // Чем мельче орнамент, тем чаще грозди — так шаг между ними ужимается
      // вместе с ними и плотность рисунка держится одинаковой на всех
      // экранах. Потолок в 70 — чтобы на очень длинной странице не разносить
      // в DOM лишние тысячи ягод ради разницы, которой не видно.
      const n = Math.min(70, Math.round(CLUSTER_N / orn));
      // Толщину линий считает CSS, но множитель знает только здесь
      wrap.style.setProperty("--ab-orn", orn.toFixed(3));
      let d = `M ${xAt(0, k).toFixed(1)} 0`;
      for (let y = 14; y <= h; y += 14) d += ` L ${xAt(y, k).toFixed(1)} ${y}`;
      const placed = makeDecos(n).map((dc) => ({
        ...dc,
        size: dc.size * orn,
        nx: +xAt(dc.t * h, k).toFixed(1),
        ny: +(dc.t * h).toFixed(1),
      }));
      setGeo((g) => (g.h === h && g.band === band ? g : { h, band, d, placed }));
    };
    build();
    const ro = new ResizeObserver(build);
    ro.observe(main);
    window.addEventListener("resize", build);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", build);
    };
  }, []);

  useEffect(() => {
    const cane = caneRef.current;
    const main = wrapRef.current?.parentElement;
    if (!cane || !main || !geo.d) return;
    // len — настоящая длина, нужна только для getPointAtLength (pathLength
    // на неё не влияет). Штрих же считается в нормированных единицах.
    const len = cane.getTotalLength();
    const decos = Array.from(
      wrapRef.current!.querySelectorAll<SVGGElement>(".ab-vine-deco")
    );

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      cane.style.strokeDashoffset = "0";
      decos.forEach((el) => {
        el.setAttribute(
          "transform",
          `translate(${el.dataset.nx} ${el.dataset.ny}) scale(${el.dataset.s})`
        );
        el.style.opacity = "1";
      });
      if (tipRef.current) tipRef.current.style.opacity = "0";
      document.documentElement.style.setProperty("--ab-warm", "0.4");
      return;
    }

    let raf = 0;
    // Последнее применённое раскрытие каждой грозди; -1 — «ещё не писали»
    const lastGe = new Float32Array(decos.length).fill(-1);
    const update = () => {
      raf = 0;
      const rect = main.getBoundingClientRect();
      const viewed = -rect.top; // сколько страницы уже пролистано
      // Кончик побега идёт внутри экрана: на входе — примерно на середине
      // первого экрана (лоза с виноградом видна сразу), дальше плавно
      // смещается к нижней кромке и доходит ровно до низа страницы. Так рост
      // всё время происходит в поле зрения, а не выше или ниже него.
      const maxScroll = Math.max(1, rect.height - window.innerHeight);
      const readP = Math.min(1, Math.max(0, viewed / maxScroll));
      const p0 = Math.min(0.5, (window.innerHeight * 0.55) / rect.height);
      const p = p0 + (1 - p0) * readP;
      cane.style.strokeDashoffset = String(1 - p);
      // Раскрытие занимает узкую полоску прогресса (0.025), поэтому в любой
      // момент меняются считанные грозди: остальные либо ещё свёрнуты, либо
      // давно раскрыты. Записываем только изменившиеся — иначе каждый кадр
      // трогает сотню узлов ради значений, которые и так на месте. Прогресс
      // не монотонен (вверх листают тоже), поэтому сравниваем с прошлым
      // значением, а не «досчитали — и забыли».
      for (let i = 0; i < decos.length; i++) {
        const el = decos[i];
        const t = +el.dataset.t!;
        const g = Math.min(1, Math.max(0, (p - t) / 0.025));
        const ge = 1 - (1 - g) * (1 - g);
        if (Math.abs(ge - lastGe[i]) < 0.002) continue;
        lastGe[i] = ge;
        const s = +el.dataset.s!;
        el.setAttribute(
          "transform",
          `translate(${el.dataset.nx} ${el.dataset.ny}) scale(${(ge * s).toFixed(
            3
          )})`
        );
        el.style.opacity = Math.min(1, ge * 1.6).toFixed(3);
      }
      if (tipRef.current) {
        const pt = cane.getPointAtLength(len * p);
        tipRef.current.setAttribute(
          "transform",
          `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`
        );
        tipRef.current.style.opacity = p > 0.01 && p < 0.995 ? "1" : "0";
      }
      // Тёплый свет идёт за фактическим чтением, а не за кончиком лозы
      document.documentElement.style.setProperty("--ab-warm", readP.toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [geo.d]);

  return (
    <>
      <div className="ab-warm-layer" aria-hidden />
      <div className="ab-spine" aria-hidden ref={wrapRef}>
        <svg
          width={geo.band}
          height={geo.h || undefined}
          viewBox={`0 0 ${geo.band} ${geo.h || 1}`}
          preserveAspectRatio="none"
          fill="none"
        >
          {/* pathLength="1" нормирует длину: стартовое «свёрнуто» задаётся в
              CSS и работает с первого кадра, до всякого JS */}
          <path ref={caneRef} className="ab-vine-cane" d={geo.d} pathLength={1} />

          {geo.placed.map((dc, i) => {
            const flip = dc.sideX < 0;
            if (dc.kind === "tendril") {
              return (
                <g
                  key={i}
                  className="ab-vine-deco"
                  data-t={dc.t}
                  data-nx={dc.nx}
                  data-ny={dc.ny}
                  data-s={dc.size}
                  transform={`translate(${dc.nx} ${dc.ny}) scale(0)`}
                  style={{ opacity: 0 }}
                >
                  <g
                    transform={`${flip ? "scale(-1,1) " : ""}rotate(${dc.rot})`}
                  >
                    <path className="ab-vine-tendril" d={TENDRILS[dc.v]} />
                  </g>
                </g>
              );
            }
            const n = NODES[dc.r];
            const cl = CL[n.cl];
            return (
              <g
                key={i}
                className="ab-vine-deco"
                data-t={dc.t}
                data-nx={dc.nx}
                data-ny={dc.ny}
                data-s={dc.size}
                transform={`translate(${dc.nx} ${dc.ny}) scale(0)`}
                style={{ opacity: 0 }}
              >
                <g
                  transform={`${flip ? "scale(-1,1) " : ""}rotate(${dc.rot})`}
                >
                  <path className="ab-vine-stem" d={n.stem} />
                  {n.leaves.map(([rot, sc], j) => (
                    <g key={j} transform={`rotate(${rot}) scale(${sc})`}>
                      <path className="ab-vine-leaf" d={LEAF_D} />
                      <path className="ab-vine-vein" d={LEAF_VEINS} />
                    </g>
                  ))}
                  <g
                    transform={`translate(${n.ct[0]} ${n.ct[1]}) rotate(${n.ct[2]}) scale(${n.ct[3]})`}
                  >
                    {cl.b.map(([cx, cy], j) => (
                      <circle
                        key={j}
                        className="ab-vine-berry"
                        cx={cx}
                        cy={cy}
                        r={cl.r}
                      />
                    ))}
                    {/* блик у каждой ягоды — свет падает с одной стороны */}
                    {cl.b.map(([cx, cy], j) => (
                      <circle
                        key={`h${j}`}
                        className="ab-vine-hi"
                        cx={cx - cl.r * 0.32}
                        cy={cy - cl.r * 0.34}
                        r={cl.r * 0.3}
                      />
                    ))}
                  </g>
                </g>
              </g>
            );
          })}

          <g ref={tipRef} className="ab-vine-tip" style={{ opacity: 0 }}>
            <circle r="2.4" />
          </g>
        </svg>
      </div>
    </>
  );
}
