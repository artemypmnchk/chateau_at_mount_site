import { wines, type Locale, type WineLine } from "@/lib/content";

/**
 * Линейки вин для блока на главной (components/WineLines.tsx).
 * Тексты глав — черновики к вычитке владельцем (03.09.2026): имя линейки
 * по-английски (как главы на /wines), строка характера — только факты.
 * glow — цвет свечения за коллажем в покое; при раскрытии ленты свечение
 * берёт band-цвет центральной бутылки.
 */
export const LINE_COPY: Record<
  WineLine,
  {
    title: string;
    count: Record<Locale, string>;
    lead: Record<Locale, string>;
    glow: string;
  }
> = {
  classic: {
    title: "Classic",
    count: { ru: "семь вин", en: "seven wines", ro: "șapte vinuri" },
    lead: {
      // ru согласован владельцем 03.09.2026: без чисел, без терминов.
      //   после предлогов и союзов — не висят в конце строки.
      ru: "Основная линейка вин: каждое только из одного сорта. От французской классики до местного молдавского винограда.",
      en: "Our main line: each wine is made from a single grape variety. From the French classics to local Moldovan grapes.",
      ro: "Linia noastră principală: fiecare vin e făcut dintr-un singur soi. De la clasicele soiuri franțuzești la strugurii locali din Moldova.",
    },
    glow: "#0f4c45",
  },
  rare: {
    title: "Rare",
    count: { ru: "четыре вина", en: "four wines", ro: "patru vinuri" },
    lead: {
      // ru согласован владельцем 03.09.2026.
      ru: "Красные вина небольшими партиями. Те же сорта, что в основной линейке, но плотнее и глубже.",
      en: "Small-batch reds. The same grapes as our main line, only fuller and deeper.",
      ro: "Vinuri roșii în loturi mici. Aceleași soiuri ca în linia principală, dar mai pline și mai profunde.",
    },
    // чуть светлее band-тона: тёмные бутылки на тёмной сцене нужно отделить
    glow: "#5c474d",
  },
  experimental: {
    title: "Experimental",
    count: { ru: "пять вин", en: "five wines", ro: "cinci vinuri" },
    lead: {
      // ru согласован владельцем 03.09.2026.
      ru: "Здесь мы пробуем новое: игристые, оранжевое вино и PONI — вино без строгих правил.",
      en: "This is where we try new things: sparkling wines, orange wine and PONI — a wine with no strict rules.",
      ro: "Aici încercăm lucruri noi: vinuri spumante, vin oranj și PONI — un vin fără reguli stricte.",
    },
    glow: "#6f4527",
  },
};

/** Порядок глав на главной. */
export const LINES: WineLine[] = ["classic", "rare", "experimental"];

/** Порядок вин в главе. Коллаж симметричен вокруг середины ряда, поэтому
 *  «первое к читателю» вино стоит в центре. Classic (владелец, 03.09.2026):
 *  Viorica в центре и спереди, рядом белое и розе, красные по краям;
 *  лента раскрывается на Viorica. Experimental (владелец, 03.09.2026):
 *  Amber в центре, игристые с одной стороны, PONI с другой. Rare — порядок
 *  content.ts. */
const LINE_ORDER: Partial<Record<WineLine, string[]>> = {
  experimental: [
    "extra-brut-alb",
    "extra-brut-rose",
    "amber",
    "poni-white",
    "poni-red",
  ],
  classic: [
    "cabernet-sauvignon",
    "merlot",
    "feteasca-alba",
    "viorica",
    "cabernet-rose",
    "feteasca-neagra",
    "shiraz",
  ],
};

export const byLine = (line: WineLine) => {
  const list = wines.filter((w) => w.line === line);
  const order = LINE_ORDER[line];
  if (!order) return list;
  return [...list].sort(
    (a, b) => order.indexOf(a.slug) - order.indexOf(b.slug)
  );
};

/** Микротексты блока (черновики к вычитке вместе с LINE_COPY). */
export const linesUi = {
  seeLine: { ru: "Смотреть линейку", en: "See the line", ro: "Vezi linia" },
  browse: { ru: "листать", en: "browse", ro: "răsfoiește" },
  prev: { ru: "Предыдущее вино", en: "Previous wine", ro: "Vinul anterior" },
  next: { ru: "Следующее вино", en: "Next wine", ro: "Vinul următor" },
  headLine: {
    ru: "Три линейки, шестнадцать вин · шесть медалей 2023–2025",
    en: "Three lines, sixteen wines · six medals 2023–2025",
    ro: "Trei linii, șaisprezece vinuri · șase medalii 2023–2025",
  },
};
