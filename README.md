# Chateau At Mount — самописная копия сайта

Лендинг винодельни **Chateau At Mount** (Гагаузия, Молдова), переписанный с Framer на собственный код (Next.js + React).

Оригинал: <https://chateauatmount.framer.website/>

## Что внутри

- **Next.js 14** (App Router) + **TypeScript**
- Шрифт **Inter** через `next/font`
- Все изображения сохранены локально в `public/images/` (фото, логотип, 7 этикеток вин)
- Оптимизация картинок через **`next/image`**: AVIF/WebP, адаптивные размеры, blur-заглушки, ленивая загрузка (`sharp`)
- Переключатель языка **RU / EN / RO** в навигации
- Страница **«Дегустации и визиты»** (`/visit`): форматы дегустаций, как проходит визит, как добраться
- **Возрастное подтверждение 18+** (модальное окно, выбор хранится в localStorage)
- Адаптивная вёрстка (десктоп / планшет / мобайл), мобильное меню, слайдер вин
- **SEO**: `sitemap.xml`, `robots.txt`, Open Graph / Twitter-метаданные, JSON-LD `Winery` (schema.org)
- **Безопасность**: CSP и security-заголовки в `next.config.mjs`
- **Проверки кода**: ESLint + Prettier + строгий TypeScript (`npm run check`)
- Готов к деплою в контейнере: `Dockerfile` (standalone) + `docker-compose.yml`

## Отличия от оригинала

- Удалён блок-анонс **«24 августа — Фестиваль сбора урожая»** (по просьбе заказчика).
- Раздел «Мероприятия» теперь ведёт на блок «Место для ваших воспоминаний».
- Страница **«Контакты и сотрудничество»** (`/contacts`) переработана: оптимизирован
  текст и визуал. Форма заявки собирает письмо на почту винодельни (без бэкенда),
  рядом — прямая кнопка в Telegram и блок контактов с картой.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
```

Сборка прод-версии:

```bash
npm run build
npm start
```

Проверки перед коммитом (ESLint + tsc + Prettier):

```bash
npm run check     # проверить
npm run format    # автоформат
```

Деплой в Docker:

```bash
docker compose up --build   # http://localhost:3000
```

## Структура

```
app/
  layout.tsx        # метаданные (SEO/OG), шрифт, <html>, общие Header/Footer, JSON-LD
  page.tsx          # главная
  visit/page.tsx    # страница «Дегустации и визиты»
  contacts/page.tsx # страница «Контакты и сотрудничество»
  globals.css       # дизайн-токены и все стили
  sitemap.ts        # sitemap.xml
  robots.ts         # robots.txt
components/
  Header.tsx        # общая шапка (навигация, переключатель языка, мобильное меню)
  Footer.tsx        # общий футер
  locale.tsx        # контекст языка RU/EN/RO (общий для всех страниц, localStorage)
  Site.tsx          # секции главной: hero, вина-слайдер и т.д.
  VisitPage.tsx     # секции страницы дегустаций и визитов
  ContactsPage.tsx  # секции страницы контактов + форма заявки
  AgeGate.tsx       # возрастное подтверждение 18+
  WinerySchema.tsx  # JSON-LD структурированные данные (schema.org Winery)
lib/
  content.ts        # весь текст (RU/EN), список вин, ссылки
  site.ts           # домен, адрес, контакты, гео, соцсети (для SEO/sitemap/JSON-LD)
public/images/      # изображения
```

## Тексты и ссылки

Все строки вынесены в `lib/content.ts` — там же реальные ссылки на соцсети
(Instagram, Telegram, TikTok), скопированные из оригинала. Меняются в одном месте.

## Перед публикацией

В `lib/site.ts` укажите реальный **домен**, точный **адрес** и **координаты**
винодельни — сейчас они заполнены ориентировочно (город Чадыр-Лунга). От этих
данных зависят метаданные, `sitemap.xml`, canonical-URL и JSON-LD.
