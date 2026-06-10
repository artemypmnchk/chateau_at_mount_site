export type Locale = "ru" | "en";

export interface Wine {
  name: string;
  image: string;
  desc: Record<Locale, string>;
}

// Порядок бутылок — как в оригинальном слайдере.
export const wines: Wine[] = [
  {
    name: "Merlot",
    image: "/images/wine-merlot.png",
    desc: {
      ru: "Сухое красное вино. Богатый аромат спелой вишни и ежевики, дополненный нотами дуба",
      en: "Dry red wine. A rich aroma of ripe cherry and blackberry, rounded out with oak notes",
    },
  },
  {
    name: "Cabernet Rose",
    image: "/images/wine-cabernet-rose.png",
    desc: {
      ru: "Сухое розовое вино. Аромат клубники с нотками малины, черники и сбалансированной кислотностью",
      en: "Dry rosé wine. A strawberry aroma with hints of raspberry, blueberry and balanced acidity",
    },
  },
  {
    name: "Viorica",
    image: "/images/wine-viorica.png",
    desc: {
      ru: "Сухое белое вино. Аромат полевых цветов, базилика, пряные ноты груши и цитрусовых",
      en: "Dry white wine. An aroma of wildflowers and basil with spicy pear and citrus notes",
    },
  },
  {
    name: "Fetească neagră",
    image: "/images/wine-feteasca-neagra.png",
    desc: {
      ru: "Сухое красное вино. Вино гранатового цвета с ароматом лесных ягод, нотами малины и инжира",
      en: "Dry red wine. A garnet-coloured wine with wild-berry aromas and notes of raspberry and fig",
    },
  },
  {
    name: "Cabernet Sauvignon",
    image: "/images/wine-cabernet-sauvignon.png",
    desc: {
      ru: "Сухое красное вино. Аромат черной вишни, спелых слив, тонко дополненный нотами специй",
      en: "Dry red wine. An aroma of black cherry and ripe plum, delicately finished with spice notes",
    },
  },
  {
    name: "Fetească albă",
    image: "/images/wine-feteasca-alba.png",
    desc: {
      ru: "Сухое белое вино. Тонкий аромат полевых цветов с нотами зеленого яблока и цитрусовых",
      en: "Dry white wine. A delicate aroma of wildflowers with green-apple and citrus notes",
    },
  },
  {
    name: "Shiraz",
    image: "/images/wine-shiraz.png",
    desc: {
      ru: "Сухое красное вино. Интенсивный аромат черной вишни, спелой сливы с нотками граната. Сбалансированный фруктовый вкус",
      en: "Dry red wine. An intense aroma of black cherry and ripe plum with hints of pomegranate. A balanced fruity taste",
    },
  },
];

export const links = {
  instagram:
    "https://www.instagram.com/at_mount_chateau.md?igsh=MXM5MTVnem83c2luOQ==",
  telegram: "https://t.me/nelliviktorovna",
  tiktok: "https://www.tiktok.com/@at_mount_chateau?_t=ZM-8yHuqHVsAGG&_r=1",
};

export const t = {
  nav: {
    about: { ru: "О винодельне", en: "About" },
    wines: { ru: "Вина", en: "Wines" },
    events: { ru: "Мероприятия", en: "Events" },
    contacts: { ru: "Контакты", en: "Contacts" },
  },
  hero: {
    brand: "Chateau At Mount",
    tagline: { ru: "Винные традиции юга Молдовы", en: "Wine traditions of southern Moldova" },
  },
  cta: {
    learn: { ru: "Узнать больше о вине", en: "Discover the wine" },
    book: { ru: "Забронировать мероприятие", en: "Book an event" },
  },
  about: {
    line1: {
      ru: "Семейная винодельня на самой высокой точке холма на въезде в Чадыр‑Лунгу.",
      en: "A family winery on the highest point of the hill at the entrance to Ceadîr-Lunga.",
    },
    line2: {
      ru: "Выращиваем виноград с 2019 года для самых аутентичных вин Гагаузии с душой и характером.",
      en: "Growing grapes since 2019 for the most authentic wines of Gagauzia — with soul and character.",
    },
  },
  features: {
    vineyard: {
      title: { ru: "Свои виноградники", en: "Our own vineyards" },
      text: {
        ru: "15 Га виноградников и 7 сортов винограда. Выпуск до 150 тыс. бутылок в год",
        en: "15 hectares of vineyards and 7 grape varieties. Up to 150,000 bottles a year",
      },
    },
    taste: {
      title: { ru: "Уникальный вкус", en: "A unique taste" },
      text: {
        ru: "Вина с выразительной кислотностью и свежими фруктовыми нотками. Даже красные.",
        en: "Wines with expressive acidity and fresh fruity notes. Even the reds.",
      },
    },
  },
  winesSection: {
    eyebrow: { ru: "Наши вина", en: "Our wines" },
    title: {
      ru: "7 сортов с характером",
      en: "7 varieties with character",
    },
  },
  control: {
    title: { ru: "Полный контроль процесса.", en: "Full control of the process." },
    text: {
      ru: "Винодельня в 100м от виноградников позволяет сохранять свежесть винограда, его натуральный вкус и кислотность вин.",
      en: "The winery sits 100 m from the vineyards, preserving the freshness of the grapes, their natural taste and the acidity of the wines.",
    },
  },
  memories: {
    title: { ru: "Место для ваших воспоминаний.", en: "A place for your memories." },
    text: {
      ru: "Виноградники, закаты, уют и вино — идеальная атмосфера для праздника, фотосессии или ужина с друзьями.",
      en: "Vineyards, sunsets, comfort and wine — the perfect setting for a celebration, a photoshoot or dinner with friends.",
    },
  },
  contact: {
    title: { ru: "Мы рядом ♡", en: "We're here for you ♡" },
    text: {
      ru: "Поможем подготовить праздник под ваше событие. Просто оставьте заявку — мы ответим вам в чате в течение 30 минут.",
      en: "We'll help you put together a celebration for your occasion. Just leave a request — we'll reply in chat within 30 minutes.",
    },
    cards: [
      { label: { ru: "Отвечаем", en: "We reply" }, value: { ru: "В течение 30 минут", en: "Within 30 minutes" } },
      { label: { ru: "Общаемся", en: "We talk" }, value: { ru: "В чате", en: "In chat" } },
      { label: { ru: "Работаем", en: "We work" }, value: { ru: "Без выходных", en: "Seven days a week" } },
    ],
  },
  finalCta: {
    title: {
      ru: "Попробуйте наши вина и убедитесь в их уникальности",
      en: "Taste our wines and see for yourself how unique they are",
    },
  },
  footer: {
    brandCol: { ru: "Винодельня", en: "Winery" },
    socialCol: { ru: "Соцсети", en: "Social" },
    extraCol: { ru: "Дополнительно", en: "More" },
    rights: {
      ru: "© 2025 Chateau At Mount. Гагаузия, Молдова.",
      en: "© 2025 Chateau At Mount. Gagauzia, Moldova.",
    },
  },
} as const;
