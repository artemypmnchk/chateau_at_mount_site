#!/usr/bin/env node
// .design-audit/shot.mjs — standalone browser layer for /design-review
// Replaces gstack's `$B` (browse) binary with a tiny Playwright driver that
// Claude Code runs itself. No external service, no daemon, works headless in CI.
//
// One-time setup:
//   npm i -D playwright && npx playwright install chromium
//
// Usage:
//   node .design-audit/shot.mjs screenshot <url> <out.png> [--width 1440] [--no-full]
//   node .design-audit/shot.mjs responsive <url> <prefix>        -> <prefix>-mobile|tablet|desktop.png
//   node .design-audit/shot.mjs eval       <url> "<jsExpr>"       -> prints JSON result of the expression
//   node .design-audit/shot.mjs console     <url>                 -> prints console errors + page errors as JSON
//   node .design-audit/shot.mjs perf        <url>                 -> prints basic perf timings as JSON
//
// Common flags: --wait <load|domcontentloaded|networkidle> (default networkidle),
//               --timeout <ms> (default 30000), --cookies <path-to-storageState.json>

import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const WIDTHS = { mobile: 390, tablet: 834, desktop: 1440 };
const HEIGHTS = { mobile: 844, tablet: 1112, desktop: 900 };

function parseFlags(argv) {
  const flags = { wait: 'networkidle', timeout: 30000, width: 1440, full: true, cookies: null };
  const pos = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--wait') flags.wait = argv[++i];
    else if (a === '--timeout') flags.timeout = parseInt(argv[++i], 10);
    else if (a === '--width') flags.width = parseInt(argv[++i], 10);
    else if (a === '--no-full') flags.full = false;
    else if (a === '--cookies') flags.cookies = argv[++i];
    else if (a === '--autoscroll') flags.autoscroll = true;
    else pos.push(a);
  }
  return { flags, pos };
}

async function withPage(url, flags, fn) {
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext(
      flags.cookies ? { storageState: flags.cookies } : {}
    );
    const errors = [];
    const page = await ctx.newPage();
    page.on('console', (m) => { if (m.type() === 'error') errors.push({ type: 'console', text: m.text() }); });
    page.on('pageerror', (e) => errors.push({ type: 'pageerror', text: String(e) }));
    await page.setViewportSize({ width: flags.width, height: 900 });
    await page.goto(url, { waitUntil: flags.wait, timeout: flags.timeout });
    return await fn(page, ctx, errors);
  } finally {
    await browser.close();
  }
}

async function cmdScreenshot(url, out, flags) {
  await withPage(url, flags, async (page) => {
    // Прокатываем страницу, чтобы сработали scroll-reveal (IntersectionObserver),
    // и даём транзишенам доиграть перед снимком.
    if (flags.autoscroll) {
      await page.evaluate(async () => {
        // behavior:'instant' — на странице может стоять scroll-behavior:smooth,
        // из-за которого частые scrollTo() анимируются и не доезжают.
        const h = document.documentElement.scrollHeight;
        for (let y = 0; y < h; y += 600) {
          window.scrollTo({ top: y, behavior: 'instant' });
          await new Promise((r) => setTimeout(r, 80));
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
      await page.waitForTimeout(1500);
    }
    await page.screenshot({ path: out, fullPage: flags.full });
  });
  console.log(JSON.stringify({ ok: true, out }));
}

async function cmdResponsive(url, prefix, flags) {
  const browser = await chromium.launch();
  const results = {};
  try {
    for (const [name, w] of Object.entries(WIDTHS)) {
      const ctx = await browser.newContext(flags.cookies ? { storageState: flags.cookies } : {});
      const page = await ctx.newPage();
      await page.setViewportSize({ width: w, height: HEIGHTS[name] });
      await page.goto(url, { waitUntil: flags.wait, timeout: flags.timeout });
      const out = `${prefix}-${name}.png`;
      await page.screenshot({ path: out, fullPage: true });
      results[name] = out;
      await ctx.close();
    }
  } finally {
    await browser.close();
  }
  console.log(JSON.stringify({ ok: true, screenshots: results }));
}

async function cmdEval(url, expr, flags) {
  const value = await withPage(url, flags, async (page) =>
    // eslint-disable-next-line no-eval
    page.evaluate((code) => eval(code), expr)
  );
  console.log(typeof value === 'string' ? value : JSON.stringify(value));
}

async function cmdConsole(url, flags) {
  const errors = await withPage(url, flags, async (page, _ctx, errs) => {
    // give late errors a beat to surface
    await page.waitForTimeout(500);
    return errs;
  });
  console.log(JSON.stringify({ ok: true, errorCount: errors.length, errors }, null, 2));
}

async function cmdPerf(url, flags) {
  const timings = await withPage(url, flags, async (page) =>
    page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0] || {};
      const paints = Object.fromEntries(
        performance.getEntriesByType('paint').map((p) => [p.name, Math.round(p.startTime)])
      );
      return {
        domContentLoaded: Math.round(nav.domContentLoadedEventEnd || 0),
        loadComplete: Math.round(nav.loadEventEnd || 0),
        firstPaint: paints['first-paint'] || null,
        firstContentfulPaint: paints['first-contentful-paint'] || null,
      };
    })
  );
  console.log(JSON.stringify({ ok: true, ...timings }, null, 2));
}

const { flags, pos } = parseFlags(process.argv.slice(2));
const [cmd, ...rest] = pos;

try {
  if (cmd === 'screenshot') await cmdScreenshot(rest[0], rest[1], flags);
  else if (cmd === 'responsive') await cmdResponsive(rest[0], rest[1], flags);
  else if (cmd === 'eval') await cmdEval(rest[0], rest[1], flags);
  else if (cmd === 'console') await cmdConsole(rest[0], flags);
  else if (cmd === 'perf') await cmdPerf(rest[0], flags);
  else {
    console.error('Unknown command. Use: screenshot | responsive | eval | console | perf');
    process.exit(2);
  }
} catch (err) {
  console.error(JSON.stringify({ ok: false, error: String(err && err.message || err) }));
  process.exit(1);
}
