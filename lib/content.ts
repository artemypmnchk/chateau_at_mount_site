export type Locale = "ru" | "en" | "ro";

export const locales: Locale[] = ["ru", "en", "ro"];

export interface Wine {
  /** URL-сегмент страницы вина: /wines/<slug> */
  slug: string;
  name: string;
  image: string;
  /** Акцент страницы вина — приглушённый тон из иллюстрации этикетки. */
  accent: string;
  /** Тёмный вариант акцента — для текста на светлом фоне. */
  accentDark: string;
  /** Основной цвет сорта — полотно блока вин на главной (кремовый текст
   *  должен держать контраст ≥4.5:1). */
  band: string;
  /** Награды вина: уровень медали + подпись (конкурс, год, урожай).
   *  art — официальная графика медали конкурса (использование в промо
   *  разрешено призёрам бесплатно, перерисовка запрещена),
   *  proofUrl — запись вина в открытой базе результатов конкурса. */
  awards?: {
    level: "gold" | "silver";
    text: Record<Locale, string>;
    art?: string;
    proofUrl?: string;
  }[];
  desc: Record<Locale, string>;
  /** Тип вина для плашки и характеристик: «Сухое красное» и т.п. */
  type: Record<Locale, string>;
  vintage: string;
  alcohol: Record<Locale, string>;
  servingTemp: string;
  pairings: Record<Locale, string[]>;
  story: Record<Locale, string>;
  /** Русские title/description для метаданных и JSON-LD страницы вина. */
  seo: { title: string; description: string };
}

// Порядок бутылок — как в оригинальном слайдере.
// ⚠️ Год урожая и крепость заполнены ориентировочно — уточните у винодельни.
export const wines: Wine[] = [
  {
    slug: "merlot",
    name: "Merlot",
    image: "/images/wine-merlot.png",
    accent: "#d09a83", // терракота заката с этикетки
    accentDark: "#a25a41",
    band: "#5b090e", // глубокий гранатовый

    awards: [
      {
        level: "gold",
        text: {
          ru: "Золото · Asia Wine Trophy 2023 · урожай 2020",
          en: "Gold · Asia Wine Trophy 2023 · 2020 vintage",
          ro: "Aur · Asia Wine Trophy 2023 · recolta 2020",
        },
        art: "/images/medals/asia-wine-trophy-gold.png",
        proofUrl:
          "https://results.wine-trophy.com/en/wine/awt-23/chateau_at_mount_merlot_red_dry_wine_2020",
      },
    ],
    desc: {
      ru: "Сухое красное вино. Богатый аромат спелой вишни и ежевики, дополненный нотами дуба",
      en: "Dry red wine. A rich aroma of ripe cherry and blackberry, rounded out with oak notes",
      ro: "Vin roșu sec. Aromă bogată de cireșe coapte și mure, completată de note de stejar",
    },
    type: { ru: "Сухое красное", en: "Dry red", ro: "Roșu sec" },
    vintage: "2023",
    alcohol: { ru: "13,5 % об.", en: "13.5% ABV", ro: "13,5% vol." },
    servingTemp: "16–18 °C",
    pairings: {
      ru: [
        "Стейки и мясо на гриле",
        "Паста с томатным соусом",
        "Выдержанные сыры",
        "Утка с ягодным соусом",
      ],
      en: [
        "Steaks and grilled meat",
        "Pasta with tomato sauce",
        "Aged cheeses",
        "Duck with berry sauce",
      ],
      ro: [
        "Fripturi și carne la grătar",
        "Paste cu sos de roșii",
        "Brânzeturi maturate",
        "Rață cu sos de fructe de pădure",
      ],
    },
    story: {
      ru: "Мерло родом из Бордо — сегодня это один из самых распространённых красных сортов мира. Название связывают с французским «merle» — чёрным дроздом, любителем сладких тёмных ягод. Сорт ценят за мягкие танины и щедрый фруктовый вкус. На тёплых склонах Гагаузии мерло вызревает полностью и даёт округлое вино с ароматом спелой вишни, ежевики и нотами дуба.",
      en: "Merlot comes from Bordeaux and is now one of the most widely planted red varieties in the world. Its name is linked to the French “merle” — the blackbird, fond of sweet dark berries. The variety is loved for its soft tannins and generous fruit. On the warm slopes of Gagauzia, Merlot ripens fully, giving a rounded wine with aromas of ripe cherry, blackberry and oak.",
      ro: "Merlot provine din Bordeaux și este astăzi unul dintre cele mai răspândite soiuri roșii din lume. Numele îi este legat de „merle” — mierla, pasărea iubitoare de fructe dulci și închise la culoare. Soiul este apreciat pentru taninurile moi și fructul generos. Pe pantele calde ale Găgăuziei, Merlot se coace deplin și dă un vin rotund, cu arome de cireșe coapte, mure și note de stejar.",
    },
    seo: {
      title: "Вино Мерло (Merlot) из Молдовы — сухое красное",
      description:
        "Сухое красное вино Merlot от семейной винодельни Chateau At Mount (Гагаузия, Молдова): год урожая, крепость, температура подачи, гастрономические пары и история сорта.",
    },
  },
  {
    slug: "cabernet-rose",
    name: "Cabernet Rose",
    image: "/images/wine-cabernet-rose.png",
    accent: "#d5a2b4", // пыльная роза с этикетки
    accentDark: "#a05673",
    band: "#ac4c6b", // роза этикетки, углублённая до контраста с кремовым

    desc: {
      ru: "Сухое розовое вино. Аромат клубники с нотками малины, черники и сбалансированной кислотностью",
      en: "Dry rosé wine. A strawberry aroma with hints of raspberry, blueberry and balanced acidity",
      ro: "Vin rozé sec. Aromă de căpșuni cu nuanțe de zmeură, afine și aciditate echilibrată",
    },
    type: { ru: "Сухое розовое", en: "Dry rosé", ro: "Rozé sec" },
    vintage: "2023",
    alcohol: { ru: "12,5 % об.", en: "12.5% ABV", ro: "12,5% vol." },
    servingTemp: "8–10 °C",
    pairings: {
      ru: [
        "Лёгкие салаты и закуски",
        "Морепродукты и рыба на гриле",
        "Козий сыр",
        "Фруктовые десерты",
      ],
      en: [
        "Light salads and starters",
        "Seafood and grilled fish",
        "Goat cheese",
        "Fruit desserts",
      ],
      ro: [
        "Salate ușoare și aperitive",
        "Fructe de mare și pește la grătar",
        "Brânză de capră",
        "Deserturi cu fructe",
      ],
    },
    story: {
      ru: "Розе из каберне совиньон делают по «короткой» технологии: сок остаётся на кожице всего несколько часов, забирая нежный цвет и ягодный аромат, но не танины. Так строгий бордоский сорт раскрывается с неожиданной стороны — свежей и летней. Наше розе сохраняет фирменную кислотность вин Chateau At Mount и аромат клубники с нотками малины и черники.",
      en: "Rosé from Cabernet Sauvignon is made the “short” way: the juice spends only a few hours on the skins, taking on a delicate colour and berry aromas, but not the tannins. The stern Bordeaux variety shows an unexpected side of itself — fresh and summery. Our rosé keeps the signature acidity of Chateau At Mount wines, with strawberry aromas and hints of raspberry and blueberry.",
      ro: "Rozéul din Cabernet Sauvignon se face prin metoda „scurtă”: mustul stă doar câteva ore pe pielițe, preluând culoarea delicată și aromele de fructe, dar nu și taninurile. Astfel, severul soi de Bordeaux își arată o latură neașteptată — proaspătă și estivală. Rozéul nostru păstrează aciditatea caracteristică vinurilor Chateau At Mount și aroma de căpșuni cu nuanțe de zmeură și afine.",
    },
    seo: {
      title: "Розовое вино Cabernet Rose из Молдовы — сухое розе",
      description:
        "Сухое розовое вино Cabernet Rose от семейной винодельни Chateau At Mount (Гагаузия, Молдова): крепость, температура подачи, гастрономические пары и история вина.",
    },
  },
  {
    slug: "viorica",
    name: "Viorica",
    image: "/images/wine-viorica.png",
    accent: "#9ec4b5", // морская зелень волос с этикетки
    accentDark: "#47705f",
    band: "#0f4c45", // глубокая морская зелень

    awards: [
      {
        level: "gold",
        text: {
          ru: "Золото · Berliner Wine Trophy 2025 · урожай 2023",
          en: "Gold · Berliner Wine Trophy 2025 · 2023 vintage",
          ro: "Aur · Berliner Wine Trophy 2025 · recolta 2023",
        },
        art: "/images/medals/berliner-wine-trophy-gold.png",
        proofUrl:
          "https://results.wine-trophy.com/en/wine/bwt-w-25/viorica_2023",
      },
      {
        level: "silver",
        text: {
          ru: "Серебро · Mundus Vini 2025 · урожай 2023",
          en: "Silver · Mundus Vini 2025 · 2023 vintage",
          ro: "Argint · Mundus Vini 2025 · recolta 2023",
        },
      },
    ],
    desc: {
      ru: "Сухое белое вино. Аромат полевых цветов, базилика, пряные ноты груши и цитрусовых",
      en: "Dry white wine. An aroma of wildflowers and basil with spicy pear and citrus notes",
      ro: "Vin alb sec. Aromă de flori de câmp și busuioc, cu note picante de pară și citrice",
    },
    type: { ru: "Сухое белое", en: "Dry white", ro: "Alb sec" },
    vintage: "2023",
    alcohol: { ru: "12,5 % об.", en: "12.5% ABV", ro: "12,5% vol." },
    servingTemp: "10–12 °C",
    pairings: {
      ru: [
        "Белая рыба и морепродукты",
        "Салаты с цитрусовой заправкой",
        "Молодые сыры",
        "Аперитив без закуски",
      ],
      en: [
        "White fish and seafood",
        "Salads with citrus dressing",
        "Young cheeses",
        "An aperitif on its own",
      ],
      ro: [
        "Pește alb și fructe de mare",
        "Salate cu dressing de citrice",
        "Brânzeturi tinere",
        "Ca aperitiv, fără gustări",
      ],
    },
    story: {
      ru: "Виорика — редкий ароматный сорт, созданный молдавскими селекционерами в середине XX века и названный женским именем. За пределами Молдовы его почти не выращивают, поэтому каждая бутылка — возможность попробовать вкус, которого нет больше нигде. Сорт даёт лёгкие вина с ароматом полевых цветов, базилика и цитрусовых — визитная карточка современного молдавского виноделия.",
      en: "Viorica is a rare aromatic variety created by Moldovan vine breeders in the mid-20th century and given a woman's name. It is hardly grown anywhere outside Moldova, so every bottle is a chance to taste something that exists nowhere else. The variety gives light wines with aromas of wildflowers, basil and citrus — a calling card of modern Moldovan winemaking.",
      ro: "Viorica este un soi aromat rar, creat de selecționerii moldoveni la mijlocul secolului XX și botezat cu un nume de femeie. În afara Moldovei aproape că nu se cultivă, așa că fiecare sticlă este o ocazie de a gusta ceva ce nu există nicăieri altundeva. Soiul dă vinuri ușoare, cu arome de flori de câmp, busuioc și citrice — o carte de vizită a vinificației moldovenești moderne.",
    },
    seo: {
      title: "Вино Виорика (Viorica) — редкое молдавское белое вино",
      description:
        "Viorica (Виорика) — сухое белое вино из редкого ароматного сорта, который выращивают почти только в Молдове. Год урожая, крепость, температура подачи, гастрономические пары и история сорта. Винодельня Chateau At Mount, Гагаузия.",
    },
  },
  {
    slug: "feteasca-neagra",
    name: "Fetească neagră",
    image: "/images/wine-feteasca-neagra.png",
    accent: "#d8a778", // охра холмов с этикетки
    accentDark: "#a5633a",
    band: "#90191c", // винно-красный заката

    desc: {
      ru: "Сухое красное вино. Вино гранатового цвета с ароматом лесных ягод, нотами малины и инжира",
      en: "Dry red wine. A garnet-coloured wine with wild-berry aromas and notes of raspberry and fig",
      ro: "Vin roșu sec. Vin de culoarea granatului, cu aromă de fructe de pădure, note de zmeură și smochine",
    },
    type: { ru: "Сухое красное", en: "Dry red", ro: "Roșu sec" },
    vintage: "2023",
    alcohol: { ru: "13,5 % об.", en: "13.5% ABV", ro: "13,5% vol." },
    servingTemp: "16–18 °C",
    pairings: {
      ru: [
        "Блюда на углях и дичь",
        "Баранина с пряными травами",
        "Мититеи и домашние колбаски",
        "Твёрдые выдержанные сыры",
      ],
      en: [
        "Charcoal-grilled dishes and game",
        "Lamb with herbs",
        "Mititei and homemade sausages",
        "Hard aged cheeses",
      ],
      ro: [
        "Preparate la jar și vânat",
        "Miel cu ierburi aromate",
        "Mititei și cârnăciori de casă",
        "Brânzeturi tari, maturate",
      ],
    },
    story: {
      ru: "Фетяска нягрэ — «чёрная девичья ягода» — один из древнейших сортов этих мест: его выращивали на землях между Прутом и Днестром задолго до того, как сюда пришли международные сорта. В XX веке он почти исчез и лишь недавно вернулся на виноградники Молдовы и Румынии. Сорт даёт глубокие гранатовые вина с ароматом лесных ягод, малины и инжира — вкус, в котором слышна история края.",
      en: "Fetească Neagră — the “black maiden grape” — is one of the oldest varieties of this land: it was grown between the Prut and the Dniester long before international varieties arrived. In the 20th century it nearly disappeared, returning to the vineyards of Moldova and Romania only recently. The variety gives deep garnet wines with aromas of wild berries, raspberry and fig — a taste that carries the history of the region.",
      ro: "Fetească Neagră este unul dintre cele mai vechi soiuri ale acestor locuri: era cultivat între Prut și Nistru cu mult înainte de sosirea soiurilor internaționale. În secolul XX aproape a dispărut și abia recent a revenit în podgoriile Moldovei și României. Soiul dă vinuri profunde, de culoarea granatului, cu arome de fructe de pădure, zmeură și smochine — un gust în care se aude istoria ținutului.",
    },
    seo: {
      title: "Вино Фетяска Нягрэ (Fetească Neagră) — красное вино из Молдовы",
      description:
        "Fetească Neagră (Фетяска Нягрэ) — сухое красное вино из древнего молдавского сорта. Год урожая, крепость, температура подачи, гастрономические пары и история сорта. Семейная винодельня Chateau At Mount, Гагаузия, Молдова.",
    },
  },
  {
    slug: "cabernet-sauvignon",
    name: "Cabernet Sauvignon",
    image: "/images/wine-cabernet-sauvignon.png",
    accent: "#cbaa7e", // янтарь камней с этикетки
    accentDark: "#8d6a3f",
    band: "#180f0a", // почти чёрный кофейный

    awards: [
      {
        level: "gold",
        text: {
          ru: "Золото · Berliner Wine Trophy 2024 · урожай 2020",
          en: "Gold · Berliner Wine Trophy 2024 · 2020 vintage",
          ro: "Aur · Berliner Wine Trophy 2024 · recolta 2020",
        },
        art: "/images/medals/berliner-wine-trophy-gold.png",
      },
    ],
    desc: {
      ru: "Сухое красное вино. Аромат черной вишни, спелых слив, тонко дополненный нотами специй",
      en: "Dry red wine. An aroma of black cherry and ripe plum, delicately finished with spice notes",
      ro: "Vin roșu sec. Aromă de vișine negre și prune coapte, completată delicat de note de condimente",
    },
    type: { ru: "Сухое красное", en: "Dry red", ro: "Roșu sec" },
    vintage: "2023",
    alcohol: { ru: "14 % об.", en: "14% ABV", ro: "14% vol." },
    servingTemp: "16–18 °C",
    pairings: {
      ru: [
        "Стейки и красное мясо",
        "Рагу и тушёное мясо",
        "Блюда на гриле",
        "Твёрдые выдержанные сыры",
      ],
      en: [
        "Steaks and red meat",
        "Stews and braised dishes",
        "Grilled dishes",
        "Hard aged cheeses",
      ],
      ro: [
        "Fripturi și carne roșie",
        "Tocănițe și mâncăruri înăbușite",
        "Preparate la grătar",
        "Brânzeturi tari, maturate",
      ],
    },
    story: {
      ru: "Каберне совиньон называют королём красных сортов. Он появился в Бордо в XVII веке как природное скрещивание каберне фран и совиньон блан — и с тех пор покорил все винодельческие регионы мира. Сорт ценят за плотную структуру, благородные танины и способность к выдержке. На юге Молдовы каберне совиньон набирает полную спелость и даёт вино с ароматом чёрной вишни, спелых слив и специй.",
      en: "Cabernet Sauvignon is called the king of red varieties. It appeared in 17th-century Bordeaux as a natural cross between Cabernet Franc and Sauvignon Blanc — and has since conquered every wine region in the world. The variety is prized for its firm structure, noble tannins and ageing potential. In southern Moldova, Cabernet Sauvignon ripens fully, giving a wine with aromas of black cherry, ripe plum and spice.",
      ro: "Cabernet Sauvignon este numit regele soiurilor roșii. A apărut în Bordeaux în secolul XVII ca o încrucișare naturală între Cabernet Franc și Sauvignon Blanc — și de atunci a cucerit toate regiunile viticole ale lumii. Soiul este prețuit pentru structura fermă, taninurile nobile și potențialul de învechire. În sudul Moldovei, Cabernet Sauvignon se coace deplin și dă un vin cu arome de vișine negre, prune coapte și condimente.",
    },
    seo: {
      title: "Вино Каберне Совиньон (Cabernet Sauvignon) из Молдовы",
      description:
        "Сухое красное вино Cabernet Sauvignon от семейной винодельни Chateau At Mount (Гагаузия, Молдова): год урожая, крепость, температура подачи, гастрономические пары и история сорта.",
    },
  },
  {
    slug: "feteasca-alba",
    name: "Fetească albă",
    image: "/images/wine-feteasca-alba.png",
    accent: "#dcaaa0", // коралл рук с этикетки
    accentDark: "#a55d50",
    band: "#bc4052", // малиновый коралл, углублён до контраста с кремовым

    desc: {
      ru: "Сухое белое вино. Тонкий аромат полевых цветов с нотами зеленого яблока и цитрусовых",
      en: "Dry white wine. A delicate aroma of wildflowers with green-apple and citrus notes",
      ro: "Vin alb sec. Aromă fină de flori de câmp cu note de măr verde și citrice",
    },
    type: { ru: "Сухое белое", en: "Dry white", ro: "Alb sec" },
    vintage: "2023",
    alcohol: { ru: "12 % об.", en: "12% ABV", ro: "12% vol." },
    servingTemp: "8–10 °C",
    pairings: {
      ru: [
        "Речная и морская рыба",
        "Птица в сливочном соусе",
        "Лёгкие овощные закуски",
        "Мягкие молодые сыры",
      ],
      en: [
        "River and sea fish",
        "Poultry in cream sauce",
        "Light vegetable starters",
        "Soft young cheeses",
      ],
      ro: [
        "Pește de râu și de mare",
        "Pasăre în sos de smântână",
        "Aperitive ușoare din legume",
        "Brânzeturi moi, tinere",
      ],
    },
    story: {
      ru: "Фетяска албэ — один из старейших белых сортов Молдовы и Румынии, его выращивают здесь не одну сотню лет. Как и «сестра» фетяска нягрэ, он относится к семье «девичьих» сортов — лёгких, изящных и тонких. Вина из фетяски албэ узнают по деликатному аромату полевых цветов с нотами зелёного яблока и цитрусовых — это классика молдавского белого виноделия.",
      en: "Fetească Albă is one of the oldest white varieties of Moldova and Romania, grown here for many centuries. Like its “sister” Fetească Neagră, it belongs to the family of “maiden” varieties — light, elegant and delicate. Fetească Albă wines are recognised by their gentle aroma of wildflowers with notes of green apple and citrus — a classic of Moldovan white winemaking.",
      ro: "Fetească Albă este unul dintre cele mai vechi soiuri albe ale Moldovei și României, cultivat aici de sute de ani. La fel ca „sora” sa Fetească Neagră, face parte din familia soiurilor „fete” — ușoare, elegante și fine. Vinurile de Fetească Albă se recunosc după aroma delicată de flori de câmp, cu note de măr verde și citrice — o clasică a vinificației albe moldovenești.",
    },
    seo: {
      title: "Вино Фетяска Албэ (Fetească Albă) — белое вино из Молдовы",
      description:
        "Fetească Albă (Фетяска Албэ) — сухое белое вино из старинного молдавского сорта. Год урожая, крепость, температура подачи, гастрономические пары и история сорта. Винодельня Chateau At Mount, Гагаузия.",
    },
  },
  {
    slug: "shiraz",
    name: "Shiraz",
    image: "/images/wine-shiraz.png",
    accent: "#a3b4cf", // дымчатая синева бокала с этикетки
    accentDark: "#4d6284",
    band: "#1d173b", // глубокий индиго ночи

    awards: [
      {
        level: "silver",
        text: {
          ru: "Серебро · Asia Wine Trophy 2024 · урожай 2021",
          en: "Silver · Asia Wine Trophy 2024 · 2021 vintage",
          ro: "Argint · Asia Wine Trophy 2024 · recolta 2021",
        },
      },
    ],
    desc: {
      ru: "Сухое красное вино. Интенсивный аромат черной вишни, спелой сливы с нотками граната. Сбалансированный фруктовый вкус",
      en: "Dry red wine. An intense aroma of black cherry and ripe plum with hints of pomegranate. A balanced fruity taste",
      ro: "Vin roșu sec. Aromă intensă de vișine negre și prune coapte cu nuanțe de rodie. Gust fructat echilibrat",
    },
    type: { ru: "Сухое красное", en: "Dry red", ro: "Roșu sec" },
    vintage: "2023",
    alcohol: { ru: "14 % об.", en: "14% ABV", ro: "14% vol." },
    servingTemp: "16–18 °C",
    pairings: {
      ru: [
        "Мясо на гриле и барбекю",
        "Пряные блюда с перцем",
        "Плов и блюда с восточными специями",
        "Выдержанные сыры",
      ],
      en: [
        "Grilled meat and barbecue",
        "Peppery, spicy dishes",
        "Pilaf and dishes with oriental spices",
        "Aged cheeses",
      ],
      ro: [
        "Carne la grătar și barbecue",
        "Preparate picante, cu piper",
        "Pilaf și mâncăruri cu mirodenii orientale",
        "Brânzeturi maturate",
      ],
    },
    story: {
      ru: "Шираз (он же сира) — сорт из долины Роны во Франции. Долго считалось, что его привезли из персидского города Шираз, но анализ ДНК доказал французское происхождение — а красивая легенда осталась. Сорт любит солнце и тепло, поэтому в Гагаузии чувствует себя как дома: даёт насыщенные вина с ароматом чёрной вишни, спелой сливы и граната.",
      en: "Shiraz (also known as Syrah) is a variety from the Rhône Valley in France. For a long time it was believed to have come from the Persian city of Shiraz, but DNA analysis proved its French origin — though the beautiful legend remains. The variety loves sun and warmth, so it feels at home in Gagauzia, giving rich wines with aromas of black cherry, ripe plum and pomegranate.",
      ro: "Shiraz (cunoscut și ca Syrah) este un soi din Valea Rhônului, Franța. Multă vreme s-a crezut că a fost adus din orașul persan Shiraz, însă analiza ADN i-a dovedit originea franceză — dar legenda frumoasă a rămas. Soiul iubește soarele și căldura, așa că în Găgăuzia se simte ca acasă: dă vinuri intense, cu arome de vișine negre, prune coapte și rodie.",
    },
    seo: {
      title: "Вино Шираз (Shiraz) из Молдовы — сухое красное",
      description:
        "Сухое красное вино Shiraz от семейной винодельни Chateau At Mount (Гагаузия, Молдова): год урожая, крепость, температура подачи, гастрономические пары и история сорта.",
    },
  },
];

/**
 * Отзывы гостей для блока «Что говорят гости» на главной.
 * Пока массив пуст — блок не показывается. Вставьте реальные отзывы
 * с Google Maps (текст можно сократить, имя — как в отзыве):
 *
 * {
 *   name: "Имя Гостя",
 *   text: {
 *     ru: "Текст отзыва…",
 *     en: "Review text…",
 *     ro: "Textul recenziei…",
 *   },
 * },
 */
export const reviews: {
  name: string;
  text: Record<Locale, string>;
}[] = [];

export const links = {
  instagram:
    "https://www.instagram.com/at_mount_chateau.md?igsh=MXM5MTVnem83c2luOQ==",
  telegram: "https://t.me/nelliviktorovna",
  tiktok: "https://www.tiktok.com/@at_mount_chateau?_t=ZM-8yHuqHVsAGG&_r=1",
};

export const t = {
  nav: {
    about: { ru: "О винодельне", en: "About", ro: "Despre cramă" },
    wines: { ru: "Вина", en: "Wines", ro: "Vinuri" },
    visit: { ru: "Дегустации", en: "Tastings", ro: "Degustări" },
    events: { ru: "Мероприятия", en: "Events", ro: "Evenimente" },
    contacts: { ru: "Контакты", en: "Contacts", ro: "Contacte" },
  },
  hero: {
    brand: "Chateau At Mount",
    location: {
      ru: "Семейная винодельня · Гагаузия · Молдова",
      en: "Family winery · Gagauzia · Moldova",
      ro: "Cramă de familie · Găgăuzia · Moldova",
    },
    tagline: {
      ru: "Винные традиции юга Молдовы",
      en: "Wine traditions of southern Moldova",
      ro: "Tradițiile vinicole din sudul Moldovei",
    },
  },
  cta: {
    learn: {
      ru: "Узнать больше о вине",
      en: "Discover the wine",
      ro: "Descoperă vinurile",
    },
    book: {
      ru: "Забронировать мероприятие",
      en: "Book an event",
      ro: "Rezervă un eveniment",
    },
    request: {
      ru: "Оставить заявку",
      en: "Leave a request",
      ro: "Lasă o cerere",
    },
    wines: {
      ru: "Наши вина",
      en: "Our wines",
      ro: "Vinurile noastre",
    },
  },
  about: {
    // Используется в футере как строка-описание.
    line1: {
      ru: "Семейная винодельня на холме при въезде в Чадыр‑Лунгу",
      en: "A family winery on the hill at the entrance to Ceadîr-Lunga",
      ro: "O cramă de familie pe dealul de la intrarea în Ceadîr-Lunga",
    },
    // Фраза-манифест под хиро (docs/spec-manifesto-block.md). Слова в
    // *звёздочках* — акцентные: курсив + пыльная роза при подсветке
    // (components/HighlightOnScroll.tsx). При переписывании текста
    // разметку звёздочками сохранять. Текущий текст — плейсхолдер.
    manifesto: {
      ru: "Мы делаем вино там же, где оно растёт: один *холм*, одна *семья* — весь путь от лозы до бутылки",
      en: "We make wine where it grows: one *hill*, one *family* — the whole journey from vine to bottle",
      ro: "Facem vinul acolo unde crește: un *deal*, o *familie* — întregul drum de la viță la sticlă",
    },
    cta: {
      ru: "Приехать в гости",
      en: "Come visit us",
      ro: "Vino în vizită",
    },
  },
  features: {
    vineyard: {
      title: {
        ru: "Свои виноградники",
        en: "Our own vineyards",
        ro: "Podgorii proprii",
      },
      text: {
        ru: "15 га виноградников и 7 сортов винограда. Выпуск до 150 000 бутылок в год",
        en: "15 hectares of vineyards and 7 grape varieties. Up to 150,000 bottles a year",
        ro: "15 ha de podgorii și 7 soiuri de struguri. Până la 150 000 de sticle pe an",
      },
    },
    taste: {
      title: { ru: "Уникальный вкус", en: "A unique taste", ro: "Gust unic" },
      text: {
        ru: "Вина с выразительной кислотностью и свежими фруктовыми нотками. Даже красные.",
        en: "Wines with expressive acidity and fresh fruity notes. Even the reds.",
        ro: "Vinuri cu aciditate expresivă și note proaspete de fructe. Chiar și cele roșii.",
      },
    },
  },
  winesSection: {
    eyebrow: { ru: "Наши вина", en: "Our wines", ro: "Vinurile noastre" },
    title: {
      ru: "Вина с характером",
      en: "Wines with character",
      ro: "Vinuri cu caracter",
    },
    more: { ru: "Подробнее", en: "Learn more", ro: "Detalii" },
    all: {
      ru: "Смотреть все вина",
      en: "See all wines",
      ro: "Vezi toate vinurile",
    },
    medals: {
      ru: "Пять медалей международных конкурсов · 2023–2025",
      en: "Five international competition medals · 2023–2025",
      ro: "Cinci medalii la concursuri internaționale · 2023–2025",
    },
  },
  winesPage: {
    intro: {
      ru: "Семь сортов, выращенных на 15 гектарах собственных виноградников в Гагаузии: от древней фетяски нягрэ до редкой ароматной виорики. Все вина — сухие, с выразительной кислотностью и свежими фруктовыми нотами.",
      en: "Seven varieties grown on 15 hectares of our own vineyards in Gagauzia — from the ancient Fetească Neagră to the rare aromatic Viorica. All our wines are dry, with expressive acidity and fresh fruity notes.",
      ro: "Șapte soiuri cultivate pe 15 hectare de podgorii proprii în Găgăuzia — de la străvechiul Fetească Neagră până la rarul și aromatul Viorica. Toate vinurile sunt seci, cu aciditate expresivă și note proaspete de fructe.",
    },
  },
  winePage: {
    facts: {
      vintage: { ru: "Год урожая", en: "Vintage", ro: "Anul recoltei" },
      alcohol: { ru: "Крепость", en: "Alcohol", ro: "Alcool" },
      serving: {
        ru: "Температура подачи",
        en: "Serving temperature",
        ro: "Temperatura de servire",
      },
    },
    pairingsTitle: {
      ru: "Гастрономические пары",
      en: "Food pairings",
      ro: "Asocieri gastronomice",
    },
    storyTitle: {
      ru: "История сорта",
      en: "The story of the variety",
      ro: "Povestea soiului",
    },
    awardProof: {
      ru: "Запись в базе конкурса",
      en: "Official results entry",
      ro: "Înregistrare în baza concursului",
    },
    otherTitle: { ru: "Другие вина", en: "More wines", ro: "Alte vinuri" },
    allWines: { ru: "Все вина", en: "All wines", ro: "Toate vinurile" },
    tasteTitle: {
      ru: "Попробуйте это вино на дегустации",
      en: "Taste this wine at the winery",
      ro: "Gustați acest vin la o degustare",
    },
    tasteText: {
      ru: "Приезжайте на винодельню — расскажем о сорте, покажем производство и нальём бокал с видом на виноградники.",
      en: "Come to the winery — we'll tell you about the variety, show you the production and pour you a glass overlooking the vineyards.",
      ro: "Veniți la cramă — vă povestim despre soi, vă arătăm producția și vă turnăm un pahar cu vedere spre podgorii.",
    },
  },
  control: {
    title: {
      ru: "Полный контроль процесса",
      en: "Full control of the process",
      ro: "Control deplin al procesului",
    },
    text: {
      ru: "Винодельня в 100м от виноградников позволяет сохранять свежесть винограда, его натуральный вкус и кислотность вин.",
      en: "The winery sits 100 m from the vineyards, preserving the freshness of the grapes, their natural taste and the acidity of the wines.",
      ro: "Crama aflată la 100 m de podgorii păstrează prospețimea strugurilor, gustul lor natural și aciditatea vinurilor.",
    },
  },
  memories: {
    title: {
      ru: "Место для ваших воспоминаний",
      en: "A place for your memories",
      ro: "Un loc pentru amintirile voastre",
    },
    text: {
      ru: "Виноградники, закаты, уют и вино — идеальная атмосфера для праздника, фотосессии или ужина с друзьями.",
      en: "Vineyards, sunsets, comfort and wine — the perfect setting for a celebration, a photoshoot or dinner with friends.",
      ro: "Podgorii, apusuri, confort și vin — atmosfera perfectă pentru o sărbătoare, o ședință foto sau o cină cu prietenii.",
    },
  },
  reviews: {
    eyebrow: { ru: "Отзывы", en: "Reviews", ro: "Recenzii" },
    title: {
      ru: "Что говорят гости",
      en: "What our guests say",
      ro: "Ce spun oaspeții",
    },
    source: {
      ru: "Отзыв из Google",
      en: "Google review",
      ro: "Recenzie Google",
    },
  },
  contact: {
    title: {
      ru: "Мы рядом",
      en: "We're here for you",
      ro: "Suntem aproape",
    },
    text: {
      ru: "Поможем подготовить праздник под ваше событие. Просто оставьте заявку — мы ответим вам в чате в течение 30 минут.",
      en: "We'll help you put together a celebration for your occasion. Just leave a request — we'll reply in chat within 30 minutes.",
      ro: "Vă ajutăm să pregătiți o sărbătoare pentru evenimentul vostru. Lăsați o cerere — vă răspundem în chat în 30 de minute.",
    },
    cards: [
      {
        label: { ru: "Отвечаем", en: "We reply", ro: "Răspundem" },
        value: {
          ru: "В течение 30 минут",
          en: "Within 30 minutes",
          ro: "În 30 de minute",
        },
      },
      {
        label: { ru: "Общаемся", en: "We talk", ro: "Comunicăm" },
        value: { ru: "В чате", en: "In chat", ro: "În chat" },
      },
      {
        label: { ru: "Работаем", en: "We work", ro: "Lucrăm" },
        value: {
          ru: "Без выходных",
          en: "Seven days a week",
          ro: "Șapte zile din șapte",
        },
      },
    ],
  },
  finalCta: {
    title: {
      ru: "Приезжайте на дегустацию — попробуйте все семь сортов",
      en: "Come for a tasting and try all seven varieties",
      ro: "Veniți la o degustare și încercați toate cele șapte soiuri",
    },
  },
  ageGate: {
    title: {
      ru: "Вам уже есть 18 лет?",
      en: "Are you 18 or older?",
      ro: "Aveți 18 ani împliniți?",
    },
    text: {
      ru: "Сайт рассказывает о вине и предназначен для совершеннолетних.",
      en: "This site is about wine and is intended for adults only.",
      ro: "Acest site este despre vin și este destinat doar adulților.",
    },
    yes: {
      ru: "Да, мне есть 18",
      en: "Yes, I'm 18 or older",
      ro: "Da, am peste 18 ani",
    },
    no: { ru: "Нет", en: "No", ro: "Nu" },
    denied: {
      ru: "Извините, сайт доступен только посетителям старше 18 лет.",
      en: "Sorry, this site is only available to visitors over 18.",
      ro: "Ne pare rău, site-ul este disponibil doar vizitatorilor de peste 18 ani.",
    },
  },
  visitPage: {
    eyebrow: {
      ru: "Дегустации и визиты",
      en: "Tastings & visits",
      ro: "Degustări și vizite",
    },
    title: {
      ru: "Приезжайте к нам в гости",
      en: "Come and visit us",
      ro: "Veniți să ne vizitați",
    },
    intro: {
      ru: "Экскурсия по винодельне, прогулка по виноградникам и дегустация вин с видом на Чадыр-Лунгу — всё на самой высокой точке холма.",
      en: "A winery tour, a walk through the vineyards and a wine tasting overlooking Ceadîr-Lunga — all from the highest point of the hill.",
      ro: "Un tur al cramei, o plimbare prin podgorii și o degustare de vinuri cu vedere spre Ceadîr-Lunga — totul de pe cel mai înalt punct al dealului.",
    },
    tableSplit: {
      title: {
        ru: "Стол в виноградниках",
        en: "A table in the vineyards",
        ro: "O masă în podgorii",
      },
      text: {
        ru: "Накрываем стол прямо у лоз — с видом на холмы и закат. К дегустации можно добавить пикник, фотосессию или мастер-класс.",
        en: "We set the table right by the vines, with the hills and the sunset in view. Add a picnic, a photoshoot or a workshop to your tasting.",
        ro: "Punem masa chiar lângă vie, cu dealurile și apusul în fața ochilor. La degustare puteți adăuga un picnic, o ședință foto sau un atelier.",
      },
    },
    gastroSplit: {
      title: {
        ru: "К вину — гагаузская кухня",
        en: "Gagauz cooking with your wine",
        ro: "Bucătăria găgăuză lângă vin",
      },
      text: {
        ru: "Гёзлеме, домашний хлеб с гагаузскими специями, крафтовые сыры и горячее — готовим сами и подбираем к винам дегустации.",
        en: "Gözleme, homemade bread with Gagauz spices, craft cheeses and a hot dish — we cook everything ourselves and pair it with the wines you taste.",
        ro: "Gözleme, pâine de casă cu mirodenii găgăuze, brânzeturi artizanale și un fel cald — gătim totul noi și îl potrivim cu vinurile degustate.",
      },
    },
    packagesTitle: {
      ru: "Форматы дегустаций",
      en: "Tasting formats",
      ro: "Formate de degustare",
    },
    packagesIntro: {
      ru: "Три формата — от знакомства с винодельней до гагаузского стола. Все визиты по предварительной записи, меню адаптируем под вашу компанию.",
      en: "Three formats — from a first acquaintance with the winery to the Gagauz table. All visits are by appointment, and we adapt the menu to your group.",
      ro: "Trei formate — de la o primă cunoștință cu crama până la masa găgăuză. Toate vizitele sunt cu programare, iar meniul îl adaptăm grupului vostru.",
    },
    popularTag: {
      ru: "Чаще всего выбирают",
      en: "Most popular",
      ro: "Cel mai ales",
    },
    priceUnit: { ru: "лей / чел", en: "MDL / person", ro: "lei / pers." },
    packages: [
      {
        name: { ru: "Знакомство", en: "Introduction", ro: "Cunoștință" },
        price: "300",
        meta: {
          ru: "4 вина · от 4 гостей · ≈ 1 час",
          en: "4 wines · 4+ guests · ≈ 1 hour",
          ro: "4 vinuri · min. 4 oaspeți · ≈ 1 oră",
        },
        popular: false,
        includes: {
          ru: [
            "Экскурсия по винодельне и рассказ о технологии",
            "Дегустация четырёх вин из бочек",
            "Сыр, орехи, снеки и вода",
          ],
          en: [
            "Winery tour and the story of our winemaking",
            "Tasting of four wines straight from the barrel",
            "Cheese, nuts, snacks and water",
          ],
          ro: [
            "Tur al cramei și povestea tehnologiei",
            "Degustare de patru vinuri direct din butoi",
            "Brânză, nuci, gustări și apă",
          ],
        },
      },
      {
        name: {
          ru: "Классика и выдержка",
          en: "Classics & Reserve",
          ro: "Clasic și maturat",
        },
        price: "450",
        meta: {
          ru: "6 вин · от 4 гостей · ≈ 1,5 часа",
          en: "6 wines · 4+ guests · ≈ 1.5 hours",
          ro: "6 vinuri · min. 4 oaspeți · ≈ 1,5 ore",
        },
        popular: true,
        includes: {
          ru: [
            "Экскурсия по винодельне и виноградникам",
            "Четыре классических и два выдержанных красных вина",
            "Мясная тарелка, сыр, орехи",
            "Фруктовое ассорти",
          ],
          en: [
            "Tour of the winery and vineyards",
            "Four classic wines and two aged reds",
            "Charcuterie board, cheese, nuts",
            "Fruit platter",
          ],
          ro: [
            "Tur al cramei și al podgoriilor",
            "Patru vinuri clasice și două roșii maturate",
            "Platou de mezeluri, brânză, nuci",
            "Platou de fructe",
          ],
        },
      },
      {
        name: {
          ru: "Гагаузский стол",
          en: "The Gagauz Table",
          ro: "Masa găgăuză",
        },
        price: "850",
        meta: {
          ru: "7 вин · от 2 гостей · ≈ 2,5 часа",
          en: "7 wines · 2+ guests · ≈ 2.5 hours",
          ro: "7 vinuri · min. 2 oaspeți · ≈ 2,5 ore",
        },
        popular: false,
        includes: {
          ru: [
            "Вся линейка: четыре классических и три выдержанных вина",
            "Горячее блюдо и гагаузские гёзлеме",
            "Домашний хлеб с гагаузскими специями",
            "Крафтовые сыры, мясная тарелка, орехи",
          ],
          en: [
            "The full range: four classic and three aged wines",
            "A hot dish and Gagauz gözleme",
            "Homemade bread with Gagauz spices",
            "Craft cheeses, charcuterie, nuts",
          ],
          ro: [
            "Toată gama: patru vinuri clasice și trei maturate",
            "Fel cald și gözleme găgăuze",
            "Pâine de casă cu mirodenii găgăuze",
            "Brânzeturi artizanale, mezeluri, nuci",
          ],
        },
      },
    ],
    priceNote: {
      ru: "Можно добавить пикник в виноградниках, мастер-класс или аренду локации. Для групп и партнёров — отдельные условия, напишите нам.",
      en: "You can add a picnic in the vineyards, a workshop or venue hire. For groups and partners we offer special terms — write to us.",
      ro: "Puteți adăuga un picnic în podgorii, un atelier sau închirierea locației. Pentru grupuri și parteneri oferim condiții speciale — scrieți-ne.",
    },
    howTitle: {
      ru: "Как проходит визит",
      en: "How a visit works",
      ro: "Cum decurge vizita",
    },
    steps: [
      {
        title: { ru: "Напишите нам", en: "Write to us", ro: "Scrieți-ne" },
        text: {
          ru: "В Telegram или через форму на сайте — все визиты по предварительной записи.",
          en: "On Telegram or via the form — all visits are by appointment.",
          ro: "Pe Telegram sau prin formular — toate vizitele sunt cu programare.",
        },
      },
      {
        title: {
          ru: "Согласуем дату и формат",
          en: "We agree on a date and format",
          ro: "Stabilim data și formatul",
        },
        text: {
          ru: "Подберём день, время и дегустацию под вашу компанию — от пары до большой группы.",
          en: "We'll pick a day, a time and a tasting to suit your group — from a couple to a big party.",
          ro: "Alegem ziua, ora și degustarea potrivită grupului vostru — de la un cuplu la un grup mare.",
        },
      },
      {
        title: {
          ru: "Приезжайте в гости",
          en: "Come and visit",
          ro: "Veniți în ospeție",
        },
        text: {
          ru: "Встретим вас, покажем винодельню и виноградники и нальём первый бокал.",
          en: "We'll welcome you, show you the winery and vineyards and pour the first glass.",
          ro: "Vă întâmpinăm, vă arătăm crama și podgoriile și vă turnăm primul pahar.",
        },
      },
    ],
    finalTitle: {
      ru: "Ждём вас на вершине холма",
      en: "We'll be waiting at the top of the hill",
      ro: "Vă așteptăm pe vârful dealului",
    },
    gettingTitle: {
      ru: "Как добраться",
      en: "How to get here",
      ro: "Cum ajungeți",
    },
    gettingText: {
      ru: "Винодельня стоит на вершине холма на въезде в Чадыр-Лунгу (Гагаузия, Молдова) — около двух часов на машине от Кишинёва.",
      en: "The winery sits on top of the hill at the entrance to Ceadîr-Lunga (Gagauzia, Moldova) — about a two-hour drive from Chișinău.",
      ro: "Crama se află pe vârful dealului, la intrarea în Ceadîr-Lunga (Găgăuzia, Moldova) — la aproximativ două ore de mers cu mașina de la Chișinău.",
    },
    bookCta: {
      ru: "Забронировать дегустацию",
      en: "Book a tasting",
      ro: "Rezervă o degustare",
    },
    formLink: {
      ru: "Оставить заявку",
      en: "Leave a request",
      ro: "Lasă o cerere",
    },
    showOnMap: {
      ru: "Показать на карте",
      en: "Show on map",
      ro: "Arată pe hartă",
    },
  },
  contactsPage: {
    eyebrow: { ru: "Сотрудничество", en: "Partnership", ro: "Parteneriat" },
    title: {
      ru: "Давайте сотрудничать",
      en: "Let's work together",
      ro: "Hai să colaborăm",
    },
    intro: {
      ru: "Chateau At Mount станет надёжным партнёром для магазина, бара или ресторана, который хочет предложить гостям первоклассные молдавские вина.",
      en: "Chateau At Mount is a reliable partner for any shop, bar or restaurant that wants to offer its guests first-class Moldovan wines.",
      ro: "Chateau At Mount este un partener de încredere pentru orice magazin, bar sau restaurant care vrea să le ofere oaspeților vinuri moldovenești de primă clasă.",
    },
    offerTitle: {
      ru: "Что мы предлагаем",
      en: "What we offer",
      ro: "Ce oferim",
    },
    offer: {
      ru: [
        "Натуральные вина местного производства",
        "Гибкую систему цен и бонусов",
        "Индивидуальные условия сотрудничества",
        "Быструю доставку",
        "Помощь в составлении винной карты",
        "Обучение персонала",
      ],
      en: [
        "Natural, locally made wines",
        "Flexible pricing and bonus system",
        "Tailored partnership terms",
        "Fast delivery",
        "Help building your wine list",
        "Staff training",
      ],
      ro: [
        "Vinuri naturale, produse local",
        "Sistem flexibil de prețuri și bonusuri",
        "Condiții individuale de colaborare",
        "Livrare rapidă",
        "Ajutor la alcătuirea listei de vinuri",
        "Instruirea personalului",
      ],
    },
    togetherTitle: {
      ru: "Что можем сделать вместе",
      en: "What we can do together",
      ro: "Ce putem face împreună",
    },
    together: {
      ru: [
        "Коллаборацию или тематический ужин",
        "Дегустацию для вашей команды и гостей",
        "Съёмку или мероприятие на территории винодельни",
      ],
      en: [
        "A collaboration or themed dinner",
        "A tasting for your team and guests",
        "A photoshoot or event at the winery",
      ],
      ro: [
        "O colaborare sau o cină tematică",
        "O degustare pentru echipa și oaspeții voștri",
        "O ședință foto sau un eveniment la cramă",
      ],
    },
    formTitle: {
      ru: "Оставьте заявку",
      en: "Send a request",
      ro: "Lăsați o cerere",
    },
    formNote: {
      ru: "Заполните форму — и мы свяжемся с вами сами.",
      en: "Fill in the form and we'll get back to you.",
      ro: "Completați formularul și vă contactăm noi.",
    },
    fields: {
      name: { ru: "Имя", en: "Name", ro: "Nume" },
      topic: {
        ru: "Интересующий вас вопрос",
        en: "What are you interested in",
        ro: "Întrebarea care vă interesează",
      },
      contact: {
        ru: "Ваш Telegram или почта",
        en: "Your Telegram or email",
        ro: "Telegram sau e-mail",
      },
      phone: {
        ru: "Ваш номер телефона",
        en: "Your phone number",
        ro: "Numărul de telefon",
      },
    },
    submit: { ru: "Отправить", en: "Send", ro: "Trimite" },
    orTelegram: {
      ru: "или напишите нам в Telegram",
      en: "or message us on Telegram",
      ro: "sau scrieți-ne pe Telegram",
    },
    success: {
      ru: "Спасибо! Откроется письмо с вашей заявкой — отправьте его, и мы ответим в течение 30 минут.",
      en: "Thank you! An email with your request will open — send it and we'll reply within 30 minutes.",
      ro: "Mulțumim! Se va deschide un e-mail cu cererea voastră — trimiteți-l și vă răspundem în 30 de minute.",
    },
    contactsTitle: {
      ru: "Наши контакты",
      en: "Our contacts",
      ro: "Contactele noastre",
    },
    emailLabel: { ru: "Почта", en: "Email", ro: "E-mail" },
    phoneLabel: { ru: "Телефон", en: "Phone", ro: "Telefon" },
    addressLabel: {
      ru: "Адрес винодельни",
      en: "Winery address",
      ro: "Adresa cramei",
    },
    showOnMap: {
      ru: "Показать на карте",
      en: "Show on map",
      ro: "Arată pe hartă",
    },
    backHome: { ru: "На главную", en: "Back home", ro: "Pagina principală" },
  },
  footer: {
    brandCol: { ru: "Винодельня", en: "Winery", ro: "Crama" },
    socialCol: { ru: "Соцсети", en: "Social", ro: "Rețele sociale" },
    extraCol: { ru: "Дополнительно", en: "More", ro: "Mai mult" },
    contactsCol: { ru: "Контакты", en: "Contacts", ro: "Contacte" },
    rights: {
      ru: "© 2025 Chateau At Mount. Гагаузия, Молдова.",
      en: "© 2025 Chateau At Mount. Gagauzia, Moldova.",
      ro: "© 2025 Chateau At Mount. Găgăuzia, Moldova.",
    },
  },
} as const;
