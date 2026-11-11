import { t, wines, links, type Locale, type Wine } from "./content";
import { LINES, LINE_COPY } from "./lines";
import { site } from "./site";
import { localizePath, markdownPath, stripLocale } from "./i18n";

/**
 * Markdown-версии страниц для ИИ-агентов: /index.md, /wines.md,
 * /wines/<slug>.md и т. п., а также ответ на «Accept: text/markdown»
 * (см. middleware.ts) и llms.txt / llms-full.txt. Текст берётся из тех же
 * строк lib/content.ts, что и HTML, — правка контента обновляет обе версии.
 */

type Text = Record<Locale, string> | { ru: string; en?: string; ro?: string };

/** Снимает разметку акцентов (*слово*), word joiner и неразрывные пробелы. */
function clean(s: string): string {
  return s.replace(/\*/g, "").replace(/⁠/g, "").replace(/ /g, " ");
}

function tr(locale: Locale) {
  return (v: Text): string =>
    clean((v as Record<string, string | undefined>)[locale] ?? v.ru);
}

/** Абсолютный адрес страницы на нужном языке. */
function url(locale: Locale, path: string): string {
  const p = localizePath(locale, path);
  return `${site.url}${p === "/" ? "" : p}`;
}

const contactsBlock = (locale: Locale) => {
  const L = tr(locale);
  return [
    `## ${L(t.footer.contactsCol)}`,
    "",
    `- ${L(t.contactsPage.phoneLabel)}: ${site.contacts.phone}`,
    `- ${L(t.contactsPage.emailLabel)}: ${site.contacts.email}`,
    `- ${L(t.contactsPage.addressLabel)}: ${site.contacts.addressLine[locale]}`,
    `- ${L(t.contactsPage.showOnMap)}: ${site.contacts.mapUrl}`,
    `- Telegram: ${links.telegram}`,
    `- Instagram: ${links.instagram}`,
    `- Vivino: ${links.vivino}`,
  ].join("\n");
};

function wineLine(locale: Locale, w: Wine): string {
  const L = tr(locale);
  return `- [${w.name}](${url(locale, `/wines/${w.slug}`)}) — ${L(w.type)}. ${L(w.desc)}`;
}

function home(locale: Locale): string {
  const L = tr(locale);
  const out = [
    `# ${t.hero.brand}`,
    "",
    `${L(t.hero.location)}. ${L(t.hero.tagline)}.`,
    "",
    L(t.about.manifesto) + ".",
    "",
    `## ${L(t.features.vineyard.title)}`,
    "",
    L(t.features.vineyard.text) + ".",
    "",
    `## ${L(t.features.taste.title)}`,
    "",
    L(t.features.taste.text),
    "",
    `## ${L(t.winesSection.title)}`,
    "",
    L(t.winesSection.medals) + ".",
  ];
  for (const line of LINES) {
    out.push("", `### ${LINE_COPY[line].title}`, "");
    for (const w of wines.filter((x) => x.line === line))
      out.push(wineLine(locale, w));
  }
  out.push(
    "",
    `## ${L(t.control.title)}`,
    "",
    L(t.control.text),
    "",
    `## ${L(t.memories.title)}`,
    "",
    L(t.memories.text),
    "",
    `## ${L(t.visitPage.packagesTitle)}`,
    "",
    ...t.visitPage.packages.map(
      (p) =>
        `- ${L(p.name)}: ${p.price} ${L(t.visitPage.priceUnit)} (${L(p.meta)})`
    ),
    "",
    `## ${L(t.footer.extraCol)}`,
    "",
    `- [${L(t.nav.about)}](${url(locale, "/about")})`,
    `- [${L(t.nav.wines)}](${url(locale, "/wines")})`,
    `- [${L(t.nav.visit)}](${url(locale, "/visit")})`,
    `- [${L(t.nav.events)}](${url(locale, "/events")})`,
    `- [${L(t.nav.contacts)}](${url(locale, "/contacts")})`,
    "",
    contactsBlock(locale)
  );
  return out.join("\n");
}

function winesPage(locale: Locale): string {
  const L = tr(locale);
  const out = [`# ${L(t.nav.wines)} — ${site.name}`];
  for (const line of LINES) {
    out.push("", `## ${LINE_COPY[line].title}`, "");
    for (const w of wines.filter((x) => x.line === line))
      out.push(wineLine(locale, w));
  }
  return out.join("\n");
}

function winePage(locale: Locale, w: Wine): string {
  const L = tr(locale);
  const out = [
    `# ${w.name} — ${site.name}`,
    "",
    `${L(w.type)} · ${L(w.alcohol)} · ${w.servingTemp}`,
    "",
    L(w.desc) + ".",
  ];
  if (w.about) out.push("", L(w.about));
  out.push("", L(w.story));
  if (w.awards?.length)
    out.push(
      "",
      `## ${L({ ru: "Награды", en: "Awards", ro: "Premii" })}`,
      "",
      ...w.awards.map((a) => `- ${L(a.text)}`)
    );
  out.push(
    "",
    `## ${L(t.winePage.pairingsTitle)}`,
    "",
    ...w.pairings[locale].map((p) => `- ${clean(p)}`)
  );
  return out.join("\n");
}

function visitPage(locale: Locale): string {
  const v = t.visitPage;
  const L = tr(locale);
  const out = [
    `# ${L(v.title)}`,
    "",
    L(v.intro),
    "",
    `## ${L(v.packagesTitle)}`,
  ];
  out.push("", L(v.packagesIntro));
  for (const p of v.packages) {
    out.push(
      "",
      `### ${L(p.name)} — ${p.price} ${L(v.priceUnit)}`,
      "",
      `${L(p.meta)}. ${L(p.blurb)}`,
      "",
      ...p.includes[locale].map((i) => `- ${clean(i)}`)
    );
  }
  out.push(
    "",
    L(v.priceNote),
    "",
    `## ${L(v.gettingTitle)}`,
    "",
    L(v.gettingText),
    "",
    `## ${L(v.faqTitle)}`
  );
  for (const f of v.faq) out.push("", `### ${L(f.q)}`, "", L(f.a));
  out.push("", contactsBlock(locale));
  return out.join("\n");
}

/** Только цены: дегустации и мероприятия (для /pricing.md). */
function pricingPage(locale: Locale): string {
  const v = t.visitPage;
  const L = tr(locale);
  const out = [
    `# ${site.name} — prices`,
    "",
    "Prices in Moldovan lei (MDL).",
    "",
    `## ${L(v.packagesTitle)}`,
    "",
    ...v.packages.map(
      (p) => `- ${L(p.name)}: ${p.price} ${L(v.priceUnit)} — ${L(p.meta)}`
    ),
    "",
    `## ${L(t.nav.events)}`,
    "",
  ];
  for (const o of t.eventsPage.offers)
    if ("price" in o && o.price) out.push(`- ${L(o.name)}: ${L(o.price)}`);
  out.push(
    "",
    L(v.priceNote),
    "",
    `${L(t.winesPage.wholesaleCta)}: ${url(locale, "/contacts")}`
  );
  return out.join("\n");
}

function eventsPage(locale: Locale): string {
  const e = t.eventsPage;
  const L = tr(locale);
  const out = [
    `# ${L(e.titleA)} — ${L(e.titleB)}`,
    "",
    L(e.intro),
    "",
    `## ${L(e.offersTitle)}`,
  ];
  for (const o of e.offers) {
    out.push("", `### ${L(o.name)}`);
    if ("blurb" in o && o.blurb) out.push("", L(o.blurb));
    if ("items" in o && o.items)
      out.push("", ...o.items.map((i: Text) => `- ${L(i)}`));
    if ("includes" in o && o.includes)
      out.push(
        "",
        ...(o.includes as Record<Locale, readonly string[]>)[locale].map(
          (i) => `- ${clean(i)}`
        )
      );
    if ("price" in o && o.price) out.push("", L(o.price));
  }
  out.push("", contactsBlock(locale));
  return out.join("\n");
}

function aboutPage(locale: Locale): string {
  const a = t.aboutPage;
  const L = tr(locale);
  const c = a.chapters;
  return [
    `# ${L(t.nav.about)} — ${site.name}`,
    "",
    `${L(a.tagline)}. ${L(a.statement.before)}${L(a.statement.ink)}${L(a.statement.after)}`,
    "",
    `## ${L(c.story.eyebrow)}`,
    "",
    L(c.story.p1),
    "",
    L(c.story.p2),
    "",
    `## ${L(c.vineyards.title)}`,
    "",
    L(c.vineyards.p1),
    "",
    `## ${L(c.terroir.title)}`,
    "",
    L(c.terroir.p1),
    "",
    L(c.terroir.p2),
    "",
    `## ${L(c.making.title)}`,
    "",
    L(c.making.p1),
    "",
    L(c.making.p2),
    "",
    L(a.manifesto) + ".",
    "",
    `## ${L(a.invite.title)}`,
    "",
    L(a.invite.lead),
  ].join("\n");
}

function contactsPage(locale: Locale): string {
  const c = t.contactsPage;
  const L = tr(locale);
  return [
    `# ${L(c.title)}`,
    "",
    L(c.intro),
    "",
    `## ${L(c.offerTitle)}`,
    "",
    ...c.offer[locale].map((i) => `- ${clean(i)}`),
    "",
    `## ${L(c.togetherTitle)}`,
    "",
    ...c.together[locale].map((i) => `- ${clean(i)}`),
    "",
    contactsBlock(locale),
  ].join("\n");
}

/**
 * Markdown страницы по пути сайта (с языковым префиксом или без).
 * null — у пути нет Markdown-версии.
 */
export function markdownFor(pathname: string): string | null {
  const { locale, path } = stripLocale(pathname);
  const p = path.replace(/\/index$/, "/").replace(/(.)\/$/, "$1");
  let body: string | null = null;
  if (p === "/") body = home(locale);
  else if (p === "/wines") body = winesPage(locale);
  else if (p === "/visit") body = visitPage(locale);
  else if (p === "/pricing") body = pricingPage(locale);
  else if (p === "/events") body = eventsPage(locale);
  else if (p === "/about") body = aboutPage(locale);
  else if (p === "/contacts") body = contactsPage(locale);
  else {
    const m = p.match(/^\/wines\/([a-z0-9-]+)$/);
    const w = m && wines.find((x) => x.slug === m[1]);
    if (w) body = winePage(locale, w);
  }
  if (body === null) return null;
  const htmlPath = p === "/pricing" ? "/visit" : p;
  return `${body}\n\nSource: ${url(locale, htmlPath)}\n`;
}

/** llms.txt — короткий указатель для языковых моделей. */
export function llmsTxt(): string {
  const page = (title: string, path: string, note: string) =>
    `- [${title}](${site.url}${markdownPath("ru", path)}): ${note}`;
  return [
    `# ${site.name}`,
    "",
    `> Chateau At Mount (At Mount Winery) — family winery in Ceadîr-Lunga, Gagauzia, southern Moldova. Founded in 2019: 15 ha of own vineyards, 7 grape varieties, dry wines with international competition medals. Tastings, events and wholesale supply for shops, bars and restaurants.`,
    "",
    "The site is in Russian, with English (/en) and Romanian (/ro) versions. Every page has a Markdown version: add .md to the URL (home: /index.md) or send `Accept: text/markdown`. Prices are in Moldovan lei (MDL).",
    "",
    "## Pages",
    "",
    page("Home", "/", "who we are, wine lines, tasting prices"),
    page("About", "/about", "history, vineyards, terroir, winemaking"),
    page("Wines", "/wines", "all wines: Classic, Rare, Experimental"),
    page(
      "Tastings and visits",
      "/visit",
      "tasting packages, prices, FAQ, how to get here"
    ),
    page("Prices", "/pricing", "tasting and event prices in MDL"),
    page(
      "Events",
      "/events",
      "picnics, workshops, open-air cinema, venue hire"
    ),
    page("Contacts and partnership", "/contacts", "wholesale supply, contacts"),
    "",
    "## Wines",
    "",
    ...wines.map(
      (w) =>
        `- [${w.name}](${site.url}/wines/${w.slug}.md): ${w.type.en}, ${w.line}`
    ),
    "",
    "## Optional",
    "",
    `- [Full text of the site](${site.url}/llms-full.txt)`,
    `- [English version](${site.url}/en/index.md)`,
    `- [Romanian version](${site.url}/ro/index.md)`,
    "",
  ].join("\n");
}

/** llms-full.txt — весь русский текст сайта одним файлом. */
export function llmsFullTxt(): string {
  const paths = [
    "/",
    "/about",
    "/wines",
    ...wines.map((w) => `/wines/${w.slug}`),
    "/visit",
    "/events",
    "/contacts",
  ];
  return paths.map((p) => markdownFor(p)).join("\n---\n\n");
}
