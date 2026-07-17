# SEO-аудит и спека улучшений — Chateau At Mount

Дата: 2026-07-17. Статус: **черновик, ждёт «ок» владельца** (код не трогали).
Проверено на живом dev-сервере (curl по `/`, `/en`, `/visit`, `/wines/merlot`).

---

## 1. Контекст: нормы и тренды SEO (июль 2026)

Коротко, что изменилось и что важно для нас:

- **AI Overviews** показываются на 50–60 % запросов в Google. Цель смещается с
  «встать выше в выдаче» на «быть процитированным в AI-ответе». Цитируют страницы
  с прямыми, короткими ответами в начале секции; длинные нарративы без выжимки
  цитируют реже. ([Google AI-optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide),
  [Stackmatix](https://www.stackmatix.com/blog/google-ai-overviews-impact-seo-2026),
  [Search Engine Land](https://searchengineland.com/seo-2026-higher-standards-ai-influence-web-catching-up-473540))
- **Структурированные данные** сменили роль: мартовское core-обновление 2026
  сузило FAQ/HowTo rich-results, но schema.org стала сигналом доверия для
  AI-цитирования (Gemini, ChatGPT, Perplexity, Claude опираются на entity-сигналы).
  ([GW Content](https://www.gwcontent.com/blogs/news/structured-data-for-seo),
  [Clickforest](https://www.clickforest.com/en/blog/structured-data-google))
- **Для виноделен** ключевое: LocalBusiness/Winery-schema с полным адресом и часами,
  Product-schema с ценами (когда появятся), Event-schema для дегустаций, Review —
  когда будут отзывы; Google Business Profile — главный рычаг локального поиска.
  ([Outshinery](https://www.outshinery.com/articles/top-winery-seo-strategies),
  [CoveCommerce](https://covecommerce.com/blog/seo-for-wineries))
- **Яндекс** (важен для ru-аудитории): валидатор микроразметки в Вебмастере,
  Schema.org + OpenGraph, технический аудит и Метрика как базис.
  ([Яндекс Вебмастер](https://yandex.ru/support/webmaster/ru/service/about.html),
  [гайд 2026](https://lpmotor.ru/articles/seo-yandex-2026-polnyj-gajd-2603))
- Вечное ядро не изменилось: Core Web Vitals, чистые canonical/hreflang,
  E-E-A-T (семья, реальные фото, история — наш козырь).

## 2. Что уже хорошо (не трогаем)

- Metadata API: title-шаблон, description, canonical + hreflang (ru/en/ro +
  x-default) на всех страницах — проверено в HTML.
- `sitemap.xml` с языковыми альтернативами, `robots.txt`, manifest, фавиконы.
- JSON-LD: Winery, ItemList (список вин), BreadcrumbList (страницы вин).
  Product без цен сознательно не размечен — это правильно (иначе ошибка в GSC).
- `next/image` + AVIF/WebP, hero с `fetchPriority="high"`, `next/font` — база
  Core Web Vitals в порядке.
- SSR-контент на нужном языке, age-gate — оверлей, краулеров не блокирует.
- Security-заголовки, verification-меты через env, Метрика подключена.

## 3. Найденные проблемы

### P0 — баги, чинить в первую очередь

| # | Проблема | Где | Доказательство |
|---|----------|-----|----------------|
| 1 | `<html lang="ru">` на **всех** языках — /en и /ro тоже отдаются как ru | `app/layout.tsx:126` (нет layout у `[lang]`) | curl `/en` → `<html lang="ru"` |
| 2 | **og:image пропал** на всех страницах, кроме винных: Next заменяет `openGraph` целиком, `pageMetadata()` задаёт og без images — картинка из layout теряется | `lib/i18n.ts` (`pageMetadata`) | curl `/`, `/en`, `/visit` → тега `og:image` нет вовсе |
| 3 | `twitter:title` везде глобальный «Винные традиции юга Молдовы» — не совпадает с title страницы | `app/layout.tsx:89` | curl любой страницы |

Шеринг в соцсети/мессенджеры (наш канал продаж) сейчас без превью-картинки —
это прямые потери кликов.

### P1 — быстрые улучшения

4. **og:image винных страниц** — PNG бутылки (вертикальный, прозрачный фон)
   вместо 1200×630: в Telegram/WhatsApp превью выглядит случайным.
5. **WinerySchema обогатить**: `@id`, `priceRange`, `openingHoursSpecification`
   (или «по записи»), `contactPoint`, `areaServed`, `inLanguage`. Улица и дом —
   TODO в `lib/site.ts:38`, нужно у владельца.
6. **`public/images`: 88 файлов ≈ 78 МБ не используются кодом** (IMG_*.JPG,
   «ChatGPT Image …».png и т.п.). Всё это деплоится и публично доступно по URL;
   имена файлов «ChatGPT Image» видны любому. Вынести из `public/` в архив.
7. **sitemap `lastModified: new Date()`** — каждая сборка «обновляет» все
   страницы; сигнал для краулеров шумный. Заменить на реальные/фиксированные даты.
8. Кастомный `not-found.tsx` (сейчас дефолтная страница Next) — мягкий возврат
   на главную/вина.
9. `keywords` meta — Google игнорирует с 2009, Яндекс тоже давно; можно убрать
   (шум, не вред).

### P2 — стратегия под цель «продавать вино» (после ок владельца, по мере готовности материалов)

10. **Google Business Profile + Яндекс Бизнес** — для винодельни это главный
    локальный канал (карты, «винодельня рядом», отзывы). Организационная задача
    владельца; сайт готов (NAP совпадает).
11. **FAQ-блок на /visit** (цена дегустации, длительность, как добраться, дети,
    группы) — прямые короткие ответы = кандидаты в AI Overviews и «быстрые
    ответы»; + FAQPage JSON-LD. Тексты — сверить с владельцем.
12. **Отзывы и награды** (уже ждём материалы — см. приоритеты): как появятся —
    `Review`/`aggregateRating` в schema, блок на сайте.
13. **Цены на вина**: когда владелец готов публиковать — вернуть `Product` +
    `Offer` на страницы вин (комментарий-заглушка уже есть в
    `components/WineRoutes.tsx:81`).
14. **Контент под информационные запросы** («фетяска нягрэ что это», «вино из
    Гагаузии») — раздел историй/журнала. Большой рычаг, но затратно; решение
    владельца, не срочно.
15. Search Console + Яндекс.Вебмастер: завести, прописать env
    `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_YANDEX_VERIFICATION`
    на Vercel, отправить sitemap. (Заодно — env Telegram-бота для /api/lead.)

Не предлагаем: менять H1 хиро (там бренд — по железному правилу «чистый хиро»,
title-тег ключевые слова уже несёт); llms.txt (ценность спорная).

## 4. Предлагаемый план работ (код)

**Этап 1 — фиксы P0 (маленький диф):**
- `lang`: два варианта —
  - **A (рекомендую): мини-фикс** — инлайн-скрипт до гидрации ставит
    `document.documentElement.lang` по префиксу пути. 5 строк, ноль риска для
    роутинга. Минус: в исходном HTML остаётся `ru` (hreflang это компенсирует).
  - **B: полный рефактор** — все страницы под `app/[lang]/` + middleware-rewrite
    корня. Правильный lang в SSR, но заметная перестройка роутинга с риском
    регрессий.
- og:image: добавить `images: [site.ogImage]` в `pageMetadata()`; убрать
  `twitter`-блок из layout (платформы возьмут og:*) или генерить per-page.

**Этап 2 — P1:** schema-обогащение, чистка public/images (архив вне репо,
покажу список до удаления), sitemap-даты, not-found, минус keywords.

**Этап 3 — P2:** по мере материалов от владельца (FAQ-тексты, отзывы, цены,
адрес с улицей, GBP).

## 5. Вопросы владельцу

1. Ок по этапам 1–2? По `lang` — вариант A или B?
2. Точный адрес (улица, дом) для schema и будущего Google Business Profile?
3. Search Console / Яндекс.Вебмастер — заводим? (нужен доступ к домену)
4. 88 неиспользуемых файлов в `public/images` — убрать в архив вне репо?
