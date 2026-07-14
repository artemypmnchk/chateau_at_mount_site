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
  /** Опциональный ручной тон полотна хиро на странице вина. Нужен, когда
   *  band не подходит для полотна во всю высоту (напр. у белой Fetească
   *  albă band малиновый — «как красное»). Берётся базой градиента. */
  heroTone?: string;
  /** Награды вина: уровень медали + подпись (конкурс, год, урожай).
   *  art — официальная графика медали конкурса (использование в промо
   *  разрешено призёрам бесплатно, перерисовка запрещена),
   *  proofUrl — запись вина в открытой базе результатов конкурса. */
  awards?: {
    level: "gold" | "silver";
    text: Record<Locale, string>;
    /** Короткое имя конкурса — компактная подпись-кредит в ленте вин на
     *  главной (без «золото/год», без капса). Полный текст — на странице вина. */
    competition?: string;
    art?: string;
    proofUrl?: string;
  }[];
  desc: Record<Locale, string>;
  /** 2–3 слова-ноты для карточки ленты (выводятся курсивом): «вишня ·
   *  ежевика · дуб». Короткий сканируемый слой, не дубль desc. */
  notes: Record<Locale, string[]>;
  /** Тип вина для плашки и характеристик: «Сухое красное» и т.п. */
  type: Record<Locale, string>;
  alcohol: Record<Locale, string>;
  servingTemp: string;
  pairings: Record<Locale, string[]>;
  /** Верифицированное винодельней описание конкретного вина (по этикетке):
   *  способ производства + дегустация. Есть не у всех сортов; где есть —
   *  идёт первым абзацем «О вине», за ним нейтральная история сорта (story). */
  about?: Record<Locale, string>;
  story: Record<Locale, string>;
  /** Русские title/description для метаданных и JSON-LD страницы вина. */
  seo: { title: string; description: string };
}

// Порядок бутылок — как в оригинальном слайдере.
// ⚠️ Крепость заполнена ориентировочно — уточните у винодельни.
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
        competition: "Asia Wine Trophy",
        art: "/images/medals/asia-wine-trophy-gold.png",
        proofUrl:
          "https://results.wine-trophy.com/en/wine/awt-23/chateau_at_mount_merlot_red_dry_wine_2020",
      },
    ],
    desc: {
      ru: "Богатый аромат спелой вишни и ежевики, дополненный нотами дуба",
      en: "A rich aroma of ripe cherry and blackberry, rounded out with oak notes",
      ro: "Aromă bogată de cireșe coapte și mure, completată de note de stejar",
    },
    notes: {
      ru: ["вишня", "ежевика", "дуб"],
      en: ["cherry", "blackberry", "oak"],
      ro: ["cireșe", "mure", "stejar"],
    },
    type: { ru: "Сухое красное", en: "Dry red", ro: "Roșu sec" },
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
    about: {
      ru: "Сухое красное вино. Произведено из винограда сорта Мерло, собранного и отобранного вручную в южной части Республики Молдова с собственных виноградников, по традиционной технологии. Обладает насыщенным рубиновым цветом и богатым ароматом спелых вишен и ежевики, тонко дополненным нотами дуба. Мягкие танины подчёркивают полноту и округлость вкуса.",
      en: "Dry red wine. Made from Merlot grapes, hand-picked and selected in southern Moldova from our own vineyards, by the traditional method. An intense ruby wine with a rich aroma of ripe cherry and blackberry, subtly layered with oak notes. Soft tannins underline its fullness and rounded taste.",
      ro: "Vin roșu sec. Produs din struguri de Merlot, culeși și selectați manual în sudul Republicii Moldova, din viile proprii, prin metoda tradițională. Are o culoare rubinie intensă și o aromă bogată de cireșe coapte și mure, completată subtil de note de stejar. Taninurile moi îi subliniază plinătatea și rotunjimea gustului.",
    },
    story: {
      ru: "Мерло родом из Бордо — сегодня это один из самых распространённых красных сортов мира. Название связывают с французским «merle» — чёрным дроздом, любителем сладких тёмных ягод. Сорт ценят за мягкие танины и щедрый фруктовый вкус. На тёплых склонах Гагаузии мерло вызревает полностью и даёт округлое вино с ароматом спелой вишни, ежевики и нотами дуба.",
      en: "Merlot comes from Bordeaux and is now one of the most widely planted red varieties in the world. Its name is linked to the French “merle” — the blackbird, fond of sweet dark berries. The variety is loved for its soft tannins and generous fruit. On the warm slopes of Gagauzia, Merlot ripens fully, giving a rounded wine with aromas of ripe cherry, blackberry and oak.",
      ro: "Merlot provine din Bordeaux și este astăzi unul dintre cele mai răspândite soiuri roșii din lume. Numele îi este legat de „merle” — mierla, pasărea iubitoare de fructe dulci și închise la culoare. Soiul este apreciat pentru taninurile moi și fructul generos. Pe pantele calde ale Găgăuziei, Merlot se coace deplin și dă un vin rotund, cu arome de cireșe coapte, mure și note de stejar.",
    },
    seo: {
      title: "Вино Мерло (Merlot) из Молдовы — сухое красное",
      description:
        "Сухое красное вино Merlot от семейной винодельни Chateau At Mount (Гагаузия, Молдова): крепость, температура подачи и история сорта.",
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
      ru: "Аромат клубники с нотками малины, черники и сбалансированной кислотностью",
      en: "A strawberry aroma with hints of raspberry, blueberry and balanced acidity",
      ro: "Aromă de căpșuni cu nuanțe de zmeură, afine și aciditate echilibrată",
    },
    notes: {
      ru: ["клубника", "малина", "черника"],
      en: ["strawberry", "raspberry", "blueberry"],
      ro: ["căpșuni", "zmeură", "afine"],
    },
    type: { ru: "Сухое розовое", en: "Dry rosé", ro: "Rozé sec" },
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
    about: {
      ru: "Сухое розовое вино. Произведено из винограда, собранного и отобранного вручную в южной части Республики Молдова. Обладает нежным розовым цветом, раскрывающим ароматы дикой клубники, приятно дополненные нотами малины и черники. Вкус хрустящий, фруктовый, с хорошо сбалансированной кислотностью.",
      en: "Dry rosé wine. Made from grapes hand-picked and selected in southern Moldova. A delicate pink wine that opens with aromas of wild strawberry, pleasantly layered with notes of raspberry and blueberry. Crisp and fruity, with well-balanced acidity.",
      ro: "Vin rozé sec. Produs din struguri culeși și selectați manual în sudul Republicii Moldova. Are o culoare roz delicată, ce dezvăluie arome de căpșune sălbatice, completate plăcut de note de zmeură și afine. Gust crocant, fructat, cu o aciditate bine echilibrată.",
    },
    story: {
      ru: "Розе из каберне совиньон делают по «короткой» технологии: сок остаётся на кожице всего несколько часов, забирая нежный цвет и ягодный аромат, но не танины. Так строгий бордоский сорт раскрывается с неожиданной стороны — свежей и летней. Наше розе сохраняет фирменную кислотность вин Chateau At Mount и аромат клубники с нотками малины и черники.",
      en: "Rosé from Cabernet Sauvignon is made the “short” way: the juice spends only a few hours on the skins, taking on a delicate colour and berry aromas, but not the tannins. The stern Bordeaux variety shows an unexpected side of itself — fresh and summery. Our rosé keeps the signature acidity of Chateau At Mount wines, with strawberry aromas and hints of raspberry and blueberry.",
      ro: "Rozéul din Cabernet Sauvignon se face prin metoda „scurtă”: mustul stă doar câteva ore pe pielițe, preluând culoarea delicată și aromele de fructe, dar nu și taninurile. Astfel, severul soi de Bordeaux își arată o latură neașteptată — proaspătă și estivală. Rozéul nostru păstrează aciditatea caracteristică vinurilor Chateau At Mount și aroma de căpșuni cu nuanțe de zmeură și afine.",
    },
    seo: {
      title: "Розовое вино Cabernet Rose из Молдовы — сухое розе",
      description:
        "Сухое розовое вино Cabernet Rose от семейной винодельни Chateau At Mount (Гагаузия, Молдова): крепость, температура подачи и история вина.",
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
        competition: "Berliner Wine Trophy",
        art: "/images/medals/berliner-wine-trophy-gold.png",
        proofUrl:
          "https://results.wine-trophy.com/en/wine/bwt-w-25/viorica_2023",
      },
      {
        level: "gold",
        text: {
          ru: "Золото · Asia Wine Trophy 2025 · урожай 2023",
          en: "Gold · Asia Wine Trophy 2025 · 2023 vintage",
          ro: "Aur · Asia Wine Trophy 2025 · recolta 2023",
        },
        competition: "Asia Wine Trophy",
        art: "/images/medals/asia-wine-trophy-gold.png",
        proofUrl: "https://results.wine-trophy.com/en/wine/awt-25/viorica_2023",
      },
      {
        level: "silver",
        text: {
          ru: "Серебро · Mundus Vini 2025 · урожай 2023",
          en: "Silver · Mundus Vini 2025 · 2023 vintage",
          ro: "Argint · Mundus Vini 2025 · recolta 2023",
        },
        competition: "Mundus Vini",
        // Официальный буклет результатов Spring Tasting 2025, стр. 68:
        // «2023 Chateau at MOUNT Viorica — Silber» (подано через Divus Winery)
        proofUrl:
          "https://www.meininger.de/en/verkostungen/mundus-vini/ergebnisheft",
      },
    ],
    desc: {
      ru: "Аромат полевых цветов, базилика, пряные ноты груши и цитрусовых",
      en: "An aroma of wildflowers and basil with spicy pear and citrus notes",
      ro: "Aromă de flori de câmp și busuioc, cu note picante de pară și citrice",
    },
    notes: {
      ru: ["полевые цветы", "базилик", "цитрус"],
      en: ["wildflowers", "basil", "citrus"],
      ro: ["flori de câmp", "busuioc", "citrice"],
    },
    type: { ru: "Сухое белое", en: "Dry white", ro: "Alb sec" },
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
    about: {
      ru: "Сухое белое вино. Произведено из винограда сорта Виорика, собранного и отобранного вручную в южной части Республики Молдова с собственных виноградников. Используются современные технологии, которые позволяют получить вино с интенсивным ароматом и особой свежестью. Обладает ярким соломенно-жёлтым цветом и раскрывает тонкие ароматы полевых цветов и базилика, дополненные приятными нотами груши и цитрусовых. Вкус свежий и освежающий, с хорошо сбалансированной кислотностью, обеспечивающей приятную свежесть и ощущение прохлады.",
      en: "Dry white wine. Made from Viorica grapes, hand-picked and selected in southern Moldova from our own vineyards. Modern methods bring out an intense aroma and a special freshness. A bright straw-yellow wine that reveals delicate aromas of wildflowers and basil, layered with pleasant notes of pear and citrus. Fresh and refreshing, with well-balanced acidity that gives a pleasant freshness and a sense of coolness.",
      ro: "Vin alb sec. Produs din struguri de Viorica, culeși și selectați manual în sudul Republicii Moldova, din viile proprii. Se folosesc tehnologii moderne care permit obținerea unui vin cu aromă intensă și o prospețime aparte. Are o culoare galben-pai strălucitoare și dezvăluie arome fine de flori de câmp și busuioc, completate de note plăcute de pară și citrice. Gust proaspăt și răcoritor, cu o aciditate bine echilibrată, care oferă o prospețime plăcută și o senzație de răcoare.",
    },
    story: {
      ru: "Виорика — редкий ароматный сорт, созданный молдавскими селекционерами в середине XX века и названный женским именем. За пределами Молдовы его почти не выращивают, поэтому каждая бутылка — возможность попробовать вкус, которого нет больше нигде. Сорт даёт лёгкие вина с ароматом полевых цветов, базилика и цитрусовых — визитная карточка современного молдавского виноделия.",
      en: "Viorica is a rare aromatic variety created by Moldovan vine breeders in the mid-20th century and given a woman's name. It is hardly grown anywhere outside Moldova, so every bottle is a chance to taste something that exists nowhere else. The variety gives light wines with aromas of wildflowers, basil and citrus — a calling card of modern Moldovan winemaking.",
      ro: "Viorica este un soi aromat rar, creat de selecționerii moldoveni la mijlocul secolului XX și botezat cu un nume de femeie. În afara Moldovei aproape că nu se cultivă, așa că fiecare sticlă este o ocazie de a gusta ceva ce nu există nicăieri altundeva. Soiul dă vinuri ușoare, cu arome de flori de câmp, busuioc și citrice — o carte de vizită a vinificației moldovenești moderne.",
    },
    seo: {
      title: "Вино Виорика (Viorica) — редкое молдавское белое вино",
      description:
        "Viorica (Виорика) — сухое белое вино из редкого ароматного сорта, который выращивают почти только в Молдове. Крепость, температура подачи и история сорта. Винодельня Chateau At Mount, Гагаузия.",
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
      ru: "Вино гранатового цвета с ароматом лесных ягод, нотами малины и инжира",
      en: "A garnet-coloured wine with wild-berry aromas and notes of raspberry and fig",
      ro: "Vin de culoarea granatului, cu aromă de fructe de pădure, note de zmeură și smochine",
    },
    notes: {
      ru: ["лесные ягоды", "малина", "инжир"],
      en: ["wild berries", "raspberry", "fig"],
      ro: ["fructe de pădure", "zmeură", "smochine"],
    },
    type: { ru: "Сухое красное", en: "Dry red", ro: "Roșu sec" },
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
    about: {
      ru: "Сухое красное вино. Произведено из винограда сорта Fetească Neagră, собранного и отобранного вручную в южной части Республики Молдова на наших собственных виноградниках, с использованием современных технологий для достижения высокого качества. Обладает гранатовым цветом и раскрывает ароматы лесных ягод, приятно дополненные нотами малины и инжира. Вкус насыщенный, с бархатистой текстурой и долгим послевкусием.",
      en: "Dry red wine. Made from Fetească Neagră grapes, hand-picked and selected in southern Moldova at our own vineyards, using modern methods to achieve high quality. A garnet-coloured wine that opens with aromas of wild berries, pleasantly layered with notes of raspberry and fig. Rich in taste, with a velvety texture and a long finish.",
      ro: "Vin roșu sec. Produs din struguri de Fetească Neagră, culeși și selectați manual în sudul Republicii Moldova, în viile proprii, folosind tehnologii moderne pentru a atinge o calitate înaltă. Are o culoare de granat și dezvăluie arome de fructe de pădure, completate plăcut de note de zmeură și smochine. Gust bogat, cu o textură catifelată și un final lung.",
    },
    story: {
      ru: "Фетяска нягрэ — «чёрная девичья ягода» — один из древнейших сортов этих мест: его выращивали на землях между Прутом и Днестром задолго до того, как сюда пришли международные сорта. В XX веке он почти исчез и лишь недавно вернулся на виноградники Молдовы и Румынии. Сорт даёт глубокие гранатовые вина с ароматом лесных ягод, малины и инжира — вкус, в котором слышна история края.",
      en: "Fetească Neagră — the “black maiden grape” — is one of the oldest varieties of this land: it was grown between the Prut and the Dniester long before international varieties arrived. In the 20th century it nearly disappeared, returning to the vineyards of Moldova and Romania only recently. The variety gives deep garnet wines with aromas of wild berries, raspberry and fig — a taste that carries the history of the region.",
      ro: "Fetească Neagră este unul dintre cele mai vechi soiuri ale acestor locuri: era cultivat între Prut și Nistru cu mult înainte de sosirea soiurilor internaționale. În secolul XX aproape a dispărut și abia recent a revenit în podgoriile Moldovei și României. Soiul dă vinuri profunde, de culoarea granatului, cu arome de fructe de pădure, zmeură și smochine — un gust în care se aude istoria ținutului.",
    },
    seo: {
      title: "Вино Фетяска Нягрэ (Fetească Neagră) — красное вино из Молдовы",
      description:
        "Fetească Neagră (Фетяска Нягрэ) — сухое красное вино из древнего молдавского сорта. Крепость, температура подачи и история сорта. Семейная винодельня Chateau At Mount, Гагаузия, Молдова.",
    },
  },
  {
    slug: "cabernet-sauvignon",
    name: "Cabernet Sauvignon",
    image: "/images/wine-cabernet-sauvignon.png",
    accent: "#cbaa7e", // янтарь камней с этикетки
    accentDark: "#8d6a3f",
    band: "#180f0a", // почти чёрный кофейный — осознанно тёмный, владельцу так нравится

    awards: [
      {
        level: "gold",
        text: {
          ru: "Золото · Berliner Wine Trophy 2024 · урожай 2020",
          en: "Gold · Berliner Wine Trophy 2024 · 2020 vintage",
          ro: "Aur · Berliner Wine Trophy 2024 · recolta 2020",
        },
        competition: "Berliner Wine Trophy",
        art: "/images/medals/berliner-wine-trophy-gold.png",
      },
    ],
    desc: {
      ru: "Аромат черной вишни, спелых слив, тонко дополненный нотами специй",
      en: "An aroma of black cherry and ripe plum, delicately finished with spice notes",
      ro: "Aromă de vișine negre și prune coapte, completată delicat de note de condimente",
    },
    notes: {
      ru: ["чёрная вишня", "слива", "специи"],
      en: ["black cherry", "plum", "spice"],
      ro: ["vișine negre", "prune", "condimente"],
    },
    type: { ru: "Сухое красное", en: "Dry red", ro: "Roșu sec" },
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
    about: {
      ru: "Сухое красное вино. Произведено из винограда сорта Каберне Совиньон, собранного и отобранного вручную в южной части Республики Молдова на наших собственных виноградниках, по традиционной технологии. Обладает насыщенным рубиновым цветом и богатым ароматом, в котором доминируют чёрные вишни и спелые сливы, тонко дополненный нотами специй.",
      en: "Dry red wine. Made from Cabernet Sauvignon grapes, hand-picked and selected in southern Moldova at our own vineyards, by the traditional method. An intense ruby wine with a rich aroma dominated by black cherry and ripe plum, subtly layered with notes of spice.",
      ro: "Vin roșu sec. Produs din struguri de Cabernet Sauvignon, culeși și selectați manual în sudul Republicii Moldova, în viile proprii, prin metoda tradițională. Are o culoare rubinie intensă și o aromă bogată, dominată de vișine negre și prune coapte, completată subtil de note de condimente.",
    },
    story: {
      ru: "Каберне совиньон называют королём красных сортов. Он появился в Бордо в XVII веке как природное скрещивание каберне фран и совиньон блан — и с тех пор покорил все винодельческие регионы мира. Сорт ценят за плотную структуру, благородные танины и способность к выдержке. На юге Молдовы каберне совиньон набирает полную спелость и даёт вино с ароматом чёрной вишни, спелых слив и специй.",
      en: "Cabernet Sauvignon is called the king of red varieties. It appeared in 17th-century Bordeaux as a natural cross between Cabernet Franc and Sauvignon Blanc — and has since conquered every wine region in the world. The variety is prized for its firm structure, noble tannins and ageing potential. In southern Moldova, Cabernet Sauvignon ripens fully, giving a wine with aromas of black cherry, ripe plum and spice.",
      ro: "Cabernet Sauvignon este numit regele soiurilor roșii. A apărut în Bordeaux în secolul XVII ca o încrucișare naturală între Cabernet Franc și Sauvignon Blanc — și de atunci a cucerit toate regiunile viticole ale lumii. Soiul este prețuit pentru structura fermă, taninurile nobile și potențialul de învechire. În sudul Moldovei, Cabernet Sauvignon se coace deplin și dă un vin cu arome de vișine negre, prune coapte și condimente.",
    },
    seo: {
      title: "Вино Каберне Совиньон (Cabernet Sauvignon) из Молдовы",
      description:
        "Сухое красное вино Cabernet Sauvignon от семейной винодельни Chateau At Mount (Гагаузия, Молдова): крепость, температура подачи и история сорта.",
    },
  },
  {
    slug: "feteasca-alba",
    name: "Fetească albă",
    image: "/images/wine-feteasca-alba.png",
    accent: "#dcaaa0", // коралл рук с этикетки
    accentDark: "#a55d50",
    band: "#bc4052", // малиновый коралл, углублён до контраста с кремовым
    heroTone: "#b0685e", // пыльный коралл-лосось с этикетки — полотно хиро

    desc: {
      ru: "Тонкий аромат полевых цветов с нотами зеленого яблока и цитрусовых",
      en: "A delicate aroma of wildflowers with green-apple and citrus notes",
      ro: "Aromă fină de flori de câmp cu note de măr verde și citrice",
    },
    notes: {
      ru: ["полевые цветы", "зелёное яблоко", "цитрус"],
      en: ["wildflowers", "green apple", "citrus"],
      ro: ["flori de câmp", "măr verde", "citrice"],
    },
    type: { ru: "Сухое белое", en: "Dry white", ro: "Alb sec" },
    alcohol: { ru: "12 % об.", en: "12% ABV", ro: "12% vol." },
    servingTemp: "8–12 °C",
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
    about: {
      ru: "Сухое белое вино. Произведено из винограда сорта Fetească Albă, собранного и отобранного вручную в южной части Республики Молдова с собственных виноградников. Используются современные технологии, которые позволяют получить вино с интенсивным ароматом и особой свежестью. Обладает ярким соломенно-жёлтым цветом и раскрывает тонкие ароматы полевых цветов, приятно дополненные нотами зелёного яблока и цитрусовых. Вкус свежий, хрустящий, с лёгкими оттенками мёда и цитрусовых.",
      en: "Dry white wine. Made from Fetească Albă grapes, hand-picked and selected in southern Moldova from our own vineyards. Modern methods bring out an intense aroma and a special freshness. A bright straw-yellow wine that reveals delicate aromas of wildflowers, pleasantly layered with notes of green apple and citrus. Fresh and crisp, with light hints of honey and citrus.",
      ro: "Vin alb sec. Produs din struguri de Fetească Albă, culeși și selectați manual în sudul Republicii Moldova, din viile proprii. Se folosesc tehnologii moderne care permit obținerea unui vin cu aromă intensă și o prospețime aparte. Are o culoare galben-pai strălucitoare și dezvăluie arome fine de flori de câmp, completate plăcut de note de măr verde și citrice. Gust proaspăt, crocant, cu ușoare nuanțe de miere și citrice.",
    },
    story: {
      ru: "Фетяска албэ — один из старейших белых сортов Молдовы и Румынии, его выращивают здесь не одну сотню лет. Как и «сестра» фетяска нягрэ, он относится к семье «девичьих» сортов — лёгких, изящных и тонких. Вина из фетяски албэ узнают по деликатному аромату полевых цветов с нотами зелёного яблока и цитрусовых — это классика молдавского белого виноделия.",
      en: "Fetească Albă is one of the oldest white varieties of Moldova and Romania, grown here for many centuries. Like its “sister” Fetească Neagră, it belongs to the family of “maiden” varieties — light, elegant and delicate. Fetească Albă wines are recognised by their gentle aroma of wildflowers with notes of green apple and citrus — a classic of Moldovan white winemaking.",
      ro: "Fetească Albă este unul dintre cele mai vechi soiuri albe ale Moldovei și României, cultivat aici de sute de ani. La fel ca „sora” sa Fetească Neagră, face parte din familia soiurilor „fete” — ușoare, elegante și fine. Vinurile de Fetească Albă se recunosc după aroma delicată de flori de câmp, cu note de măr verde și citrice — o clasică a vinificației albe moldovenești.",
    },
    seo: {
      title: "Вино Фетяска Албэ (Fetească Albă) — белое вино из Молдовы",
      description:
        "Fetească Albă (Фетяска Албэ) — сухое белое вино из старинного молдавского сорта. Крепость, температура подачи и история сорта. Винодельня Chateau At Mount, Гагаузия.",
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
        competition: "Asia Wine Trophy",
      },
    ],
    desc: {
      ru: "Интенсивный аромат черной вишни, спелой сливы с нотками граната. Сбалансированный фруктовый вкус",
      en: "An intense aroma of black cherry and ripe plum with hints of pomegranate. A balanced fruity taste",
      ro: "Aromă intensă de vișine negre și prune coapte cu nuanțe de rodie. Gust fructat echilibrat",
    },
    notes: {
      ru: ["чёрная вишня", "слива", "гранат"],
      en: ["black cherry", "plum", "pomegranate"],
      ro: ["vișine negre", "prune", "rodie"],
    },
    type: { ru: "Сухое красное", en: "Dry red", ro: "Roșu sec" },
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
    about: {
      ru: "Сухое красное вино. Произведено из винограда сорта Шираз, собранного и отобранного вручную в южной части Республики Молдова на наших собственных виноградниках, с использованием современных технологий для получения интенсивного вкуса. Обладает насыщенным рубиново-фиолетовым цветом и раскрывает интенсивные ароматы чёрных вишен и спелых слив, приятно дополненные нотами граната. Вкус бархатистый, фруктовый и сбалансированный, с мягкими танинами и живой кислотностью.",
      en: "Dry red wine. Made from Shiraz grapes, hand-picked and selected in southern Moldova at our own vineyards, using modern methods for an intense taste. A deep ruby-violet wine that opens with intense aromas of black cherry and ripe plum, pleasantly layered with notes of pomegranate. Velvety, fruity and balanced, with soft tannins and lively acidity.",
      ro: "Vin roșu sec. Produs din struguri de Shiraz, culeși și selectați manual în sudul Republicii Moldova, în viile proprii, folosind tehnologii moderne pentru un gust intens. Are o culoare rubinie-violetă intensă și dezvăluie arome intense de vișine negre și prune coapte, completate plăcut de note de rodie. Gust catifelat, fructat și echilibrat, cu taninuri moi și o aciditate vie.",
    },
    story: {
      ru: "Шираз (он же сира) — сорт из долины Роны во Франции. Долго считалось, что его привезли из персидского города Шираз, но анализ ДНК доказал французское происхождение — а красивая легенда осталась. Сорт любит солнце и тепло, поэтому в Гагаузии чувствует себя как дома: даёт насыщенные вина с ароматом чёрной вишни, спелой сливы и граната.",
      en: "Shiraz (also known as Syrah) is a variety from the Rhône Valley in France. For a long time it was believed to have come from the Persian city of Shiraz, but DNA analysis proved its French origin — though the beautiful legend remains. The variety loves sun and warmth, so it feels at home in Gagauzia, giving rich wines with aromas of black cherry, ripe plum and pomegranate.",
      ro: "Shiraz (cunoscut și ca Syrah) este un soi din Valea Rhônului, Franța. Multă vreme s-a crezut că a fost adus din orașul persan Shiraz, însă analiza ADN i-a dovedit originea franceză — dar legenda frumoasă a rămas. Soiul iubește soarele și căldura, așa că în Găgăuzia se simte ca acasă: dă vinuri intense, cu arome de vișine negre, prune coapte și rodie.",
    },
    seo: {
      title: "Вино Шираз (Shiraz) из Молдовы — сухое красное",
      description:
        "Сухое красное вино Shiraz от семейной винодельни Chateau At Mount (Гагаузия, Молдова): крепость, температура подачи и история сорта.",
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
      ro: "Descoperiți vinurile",
    },
    book: {
      ru: "Забронировать мероприятие",
      en: "Book an event",
      ro: "Rezervați un eveniment",
    },
    request: {
      ru: "Оставить заявку",
      en: "Leave a request",
      ro: "Lăsați o cerere",
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
      ru: "Семейная винодельня при въезде в Чадыр‑Лунгу",
      en: "A family winery at the entrance to Ceadîr-Lunga",
      ro: "O cramă de familie la intrarea în Ceadîr-Lunga",
    },
    // Фраза-манифест под хиро (docs/spec-manifesto-block.md). Слова в
    // *звёздочках* — акцентные: курсив + пыльная роза при подсветке
    // (components/HighlightOnScroll.tsx). При переписывании текста
    // разметку звёздочками сохранять. Текущий текст — плейсхолдер.
    manifesto: {
      ru: "Лучшее вино получается там же, где *вырос* виноград. На этом *стоит* наша винодельня",
      en: "The best wine is made where the grapes *grew*. Our winery is *built* on that",
      ro: "Cel mai bun vin se face acolo unde au *crescut* strugurii. Pe asta e *construită* crama noastră",
    },
    cta: {
      ru: "Приехать в гости",
      en: "Come visit us",
      ro: "Veniți în vizită",
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
  /* Блок «Пруф» — светлая глава между манифестом и винами:
     развеска двух кадров + цифры (спека: docs/spec-features-block.md).
     Тексты можно переписывать прямо здесь, код не трогая. */
  proof: {
    kicker: { ru: "Наше хозяйство", en: "Our estate", ro: "Domeniul nostru" },
    captions: {
      harvest: {
        label: { ru: "Сбор урожая", en: "Harvest", ro: "Culesul" },
        text: {
          ru: "Сентябрь на наших виноградниках",
          en: "September in our vineyards",
          ro: "Septembrie în podgoriile noastre",
        },
      },
      taste: {
        label: { ru: "Стиль вин", en: "The style", ro: "Stilul vinurilor" },
        text: {
          ru: "С выразительной кислотностью и свежими фруктовыми нотками. Даже красные.",
          en: "Expressive acidity and fresh fruity notes. Even the reds.",
          ro: "Aciditate expresivă și note proaspete de fructe. Chiar și cele roșii.",
        },
      },
    },
    /* value — строкой, с неразрывными пробелами; prefix — мелкий текст
       на базовой линии перед цифрой («до 150 000») */
    figures: [
      {
        value: { ru: "15", en: "15", ro: "15" },
        label: {
          ru: "гектаров виноградников",
          en: "hectares of vineyards",
          ro: "hectare de podgorii",
        },
      },
      {
        prefix: { ru: "до", en: "up to", ro: "până la" },
        value: { ru: "150 000", en: "150,000", ro: "150 000" },
        label: {
          ru: "бутылок в год",
          en: "bottles a year",
          ro: "sticle pe an",
        },
      },
      {
        value: { ru: "2019", en: "2019", ro: "2019" },
        label: {
          ru: "год основания",
          en: "founded",
          ro: "anul fondării",
        },
      },
    ],
    alts: {
      harvest: {
        ru: "Сбор урожая на виноградниках Chateau At Mount",
        en: "Harvest at the Chateau At Mount vineyards",
        ro: "Culesul la podgoriile Chateau At Mount",
      },
      taste: {
        ru: "Пикник с бокалами вина среди лоз",
        en: "A picnic with glasses of wine among the vines",
        ro: "Picnic cu pahare de vin printre vițe",
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
      ro: "Vedeți toate vinurile",
    },
    medals: {
      ru: "Шесть медалей международных конкурсов · 2023–2025",
      en: "Six international competition medals · 2023–2025",
      ro: "Șase medalii la concursuri internaționale · 2023–2025",
    },
  },
  winesPage: {
    wholesaleCta: {
      ru: "Запросить оптовый прайс",
      en: "Request wholesale prices",
      ro: "Solicitați prețuri angro",
    },
  },
  winePage: {
    facts: {
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
    aboutTitle: {
      ru: "О вине",
      en: "About the wine",
      ro: "Despre vin",
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
    cta: {
      ru: "Дегустации и визиты",
      en: "Tastings & visits",
      ro: "Degustări și vizite",
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
      ru: "Попробуйте наше вино.",
      en: "Taste our wine.",
      ro: "Gustați vinul nostru.",
    },
    subtitle: {
      ru: "Оставьте заявку — пришлём прайс и презентацию. Или приезжайте на дегустацию.",
      en: "Leave a request — we'll send the price list and presentation. Or come for a tasting.",
      ro: "Lăsați o cerere — trimitem lista de prețuri și prezentarea. Sau veniți la o degustare.",
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
    packagesTitle: {
      ru: "Форматы дегустаций",
      en: "Tasting formats",
      ro: "Formate de degustare",
    },
    packagesIntro: {
      ru: "Три формата — от первого знакомства с винодельней до гагаузского стола. Меню адаптируем под вашу компанию.",
      en: "Three formats — from a first introduction to the winery to the Gagauz table. We adapt the menu to your group.",
      ro: "Trei formate — de la o primă cunoștință cu crama până la masa găgăuză. Meniul îl adaptăm grupului vostru.",
    },
    shelfTitle: {
      ru: "Что будем пробовать",
      en: "What you'll taste",
      ro: "Ce veți degusta",
    },
    allWines: { ru: "Все вина", en: "All wines", ro: "Toate vinurile" },
    noteCta: { ru: "Напишите нам", en: "Write to us", ro: "Scrieți-ne" },
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
        blurb: {
          ru: "Первый визит: гуляем по виноградникам и винодельне и пробуем четыре вина — с рассказом, как они рождаются.",
          en: "A first visit: we walk the vineyards and the winery and taste four wines — with the story of how they are made.",
          ro: "Prima vizită: ne plimbăm prin podgorii și cramă și degustăm patru vinuri — cu povestea felului în care se nasc.",
        },
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
        blurb: {
          ru: "Дальше — по виноградникам к выдержанным красным: шесть вин под мясную тарелку и сыр, не торопясь.",
          en: "Further on — through the vineyards to the aged reds: six wines with charcuterie and cheese, unhurried.",
          ro: "Mai departe — prin podgorii spre roșiile maturate: șase vinuri cu platou de mezeluri și brânză, pe îndelete.",
        },
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
        blurb: {
          ru: "Долгий стол на вершине холма: вся линейка вин, горячее и гагаузские гёзлеме — на неспешный вечер.",
          en: "A long table at the top of the hill: the full range, a hot dish and Gagauz gözleme — for an unhurried evening.",
          ro: "O masă lungă pe vârful dealului: toată gama, un fel cald și gözleme găgăuze — pentru o seară fără grabă.",
        },
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
      ru: "Можно добавить пикник в виноградниках, мастер-класс или аренду локации. Для групп и партнёров — отдельные условия.",
      en: "You can add a picnic in the vineyards, a workshop or venue hire. For groups and partners we offer special terms.",
      ro: "Puteți adăuga un picnic în podgorii, un atelier sau închirierea locației. Pentru grupuri și parteneri oferim condiții speciale.",
    },
    finalTitle: {
      ru: "Будем рады видеть вас",
      en: "We'll be glad to see you",
      ro: "Vom fi bucuroși să vă vedem",
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
      ro: "Rezervați o degustare",
    },
    formLink: {
      ru: "Оставить заявку",
      en: "Leave a request",
      ro: "Lăsați o cerere",
    },
    showOnMap: {
      ru: "Показать на карте",
      en: "Show on map",
      ro: "Arătați pe hartă",
    },
  },
  contactsPage: {
    eyebrow: { ru: "Контакты", en: "Contacts", ro: "Contacte" },
    title: {
      ru: "Давайте знакомиться",
      en: "Let's get acquainted",
      ro: "Să facem cunoștință",
    },
    intro: {
      ru: "Работаем с магазинами, барами и ресторанами — поставляем вино, проводим дегустации, придумываем совместные ужины и события.",
      en: "We work with shops, bars and restaurants — supplying wine, running tastings and creating joint dinners and events.",
      ro: "Lucrăm cu magazine, baruri și restaurante — livrăm vin, organizăm degustări și creăm cine și evenimente comune.",
    },
    offerTitle: {
      ru: "Что мы предлагаем",
      en: "What we offer",
      ro: "Ce oferim",
    },
    offer: {
      ru: [
        "Натуральные вина местного производства",
        "Гибкая система цен и бонусов",
        "Индивидуальные условия сотрудничества",
        "Быстрая доставка",
        "Помощь в составлении винной карты",
        "Помощь в обучении персонала",
      ],
      en: [
        "Natural, locally made wines",
        "Flexible pricing and bonus system",
        "Tailored partnership terms",
        "Fast delivery",
        "Help building your wine list",
        "Help with staff training",
      ],
      ro: [
        "Vinuri naturale, produse local",
        "Sistem flexibil de prețuri și bonusuri",
        "Condiții individuale de colaborare",
        "Livrare rapidă",
        "Ajutor la alcătuirea listei de vinuri",
        "Ajutor la instruirea personalului",
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
        "O cină tematică sau o colaborare",
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
      ru: "Заполните форму — и мы свяжемся с вами.",
      en: "Fill in the form and we'll get in touch.",
      ro: "Completați formularul și vă contactăm.",
    },
    // Форма — два обязательных поля (кто и куда ответить) и один
    // необязательный вопрос. Телефон и телеграм не разводим по разным
    // полям: человеку достаточно оставить один удобный ему контакт.
    fields: {
      name: { ru: "Имя", en: "Name", ro: "Nume" },
      topic: {
        ru: "Вопрос",
        en: "Question",
        ro: "Întrebare",
      },
      topicHint: {
        ru: "Прайс, дегустация, доставка…",
        en: "Price list, tasting, delivery…",
        ro: "Listă de prețuri, degustare, livrare…",
      },
      contact: {
        ru: "Телефон или Telegram",
        en: "Phone or Telegram",
        ro: "Telefon sau Telegram",
      },
      contactHint: {
        ru: "+373 … или @username",
        en: "+373 … or @username",
        ro: "+373 … sau @username",
      },
      optional: { ru: "необязательно", en: "optional", ro: "opțional" },
    },
    submit: { ru: "Отправить", en: "Send", ro: "Trimiteți" },
    sending: { ru: "Отправляем…", en: "Sending…", ro: "Se trimite…" },
    orTelegram: {
      ru: "или напишите нам в Telegram",
      en: "or message us on Telegram",
      ro: "sau scrieți-ne pe Telegram",
    },
    success: {
      ru: "Спасибо! Заявка у нас — ответим в ближайшее время.",
      en: "Thank you! We've got your request and will reply shortly.",
      ro: "Mulțumim! Am primit cererea și revenim în curând.",
    },
    error: {
      ru: "Не получилось отправить заявку. Напишите нам в Telegram — так даже быстрее.",
      en: "Something went wrong. Message us on Telegram instead — it's even faster.",
      ro: "Nu s-a putut trimite cererea. Scrieți-ne pe Telegram — e chiar mai rapid.",
    },
    errorMail: {
      ru: "или отправьте письмом",
      en: "or send it by email",
      ro: "sau trimiteți pe e-mail",
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
      ro: "Arătați pe hartă",
    },
    backHome: { ru: "На главную", en: "Back home", ro: "Pagina principală" },
  },
  aboutPage: {
    hero: {
      eyebrow: {
        ru: "О винодельне",
        en: "About the winery",
        ro: "Despre cramă",
      },
      // Единственная надпись в хиро-сцене (слева сверху)
      growing: {
        ru: "Растём с 2019 года",
        en: "Growing since 2019",
        ro: "Creștem din 2019",
      },
      title: {
        ru: "На самой высокой точке холма над Чадыр-Лунгой",
        en: "On the highest point of the hill above Ceadîr-Lunga",
        ro: "Pe cel mai înalt punct al dealului de deasupra Ceadîr-Lunga",
      },
      subtitle: {
        ru: "Гагаузская семейная винодельня · Чадыр-Лунга · Гагаузия",
        en: "A Gagauz family winery · Ceadîr-Lunga · Gagauzia",
        ro: "Cramă de familie găgăuză · Ceadîr-Lunga · Găgăuzia",
      },
    },
    // Фраза-манифест страницы. *звёздочки* — акцентные слова (курсив +
    // пыльная роза при подсветке), см. components/HighlightOnScroll.tsx.
    manifesto: {
      ru: "Дать каждому почувствовать *великую историю* нашего народа — в каждом *бокале*",
      en: "To let everyone feel the *great history* of our people — in every *glass*",
      ro: "Să dăruim fiecăruia *marea istorie* a poporului nostru — în fiecare *pahar*",
    },
    name: {
      title: {
        ru: "Имя и зов предков",
        en: "The name and the call of our ancestors",
        ro: "Numele și chemarea strămoșilor",
      },
      text: {
        ru: "«Chateau At Mount» соединяет идею шато с образом Mount — древнего кургана, возвышенности, что хранит тысячелетнюю историю этих мест. Наша винодельня — семейный проект гагаузской семьи, выросший из зова предков: желания вернуть земле то, что она веками дарила нашему народу.",
        en: "“Chateau At Mount” brings together the idea of a château and the image of the Mount — an ancient burial mound, a rise that holds the millennia-old history of this land. Our winery is a family project born of the call of our ancestors — the wish to give back to the land what it has given our people for centuries.",
        ro: "„Chateau At Mount” îmbină ideea de château cu imaginea de Mount — o movilă străveche, o înălțime care păstrează istoria milenară a acestor locuri. Crama noastră este proiectul unei familii găgăuze, născut din chemarea strămoșilor — dorința de a reda pământului ceea ce el a dăruit poporului nostru timp de secole.",
      },
    },
    facts: [
      {
        num: { ru: "2019", en: "2019", ro: "2019" },
        label: { ru: "первые лозы", en: "first vines", ro: "primele vițe" },
      },
      {
        num: { ru: "2020", en: "2020", ro: "2020" },
        label: {
          ru: "первый урожай",
          en: "first harvest",
          ro: "prima recoltă",
        },
      },
      {
        num: { ru: "15 га", en: "15 ha", ro: "15 ha" },
        label: {
          ru: "своих виноградников",
          en: "of our own vineyards",
          ro: "de podgorii proprii",
        },
      },
      {
        num: { ru: "7", en: "7", ro: "7" },
        label: {
          ru: "сортов винограда",
          en: "grape varieties",
          ro: "soiuri de struguri",
        },
      },
      {
        num: { ru: "100 м", en: "100 m", ro: "100 m" },
        label: {
          ru: "от лоз до шато",
          en: "from vines to the château",
          ro: "de la viță la cramă",
        },
      },
      {
        num: { ru: "100 кВт", en: "100 kW", ro: "100 kW" },
        label: {
          ru: "солнечной энергии",
          en: "of solar power",
          ro: "de energie solară",
        },
      },
      {
        num: { ru: "150 000", en: "150,000", ro: "150 000" },
        label: {
          ru: "бутылок в год",
          en: "bottles a year",
          ro: "sticle pe an",
        },
      },
    ],
    place: {
      title: {
        ru: "Холм и солнце",
        en: "The hill and the sun",
        ro: "Dealul și soarele",
      },
      text: {
        ru: "На юге Молдовы, у въезда в Чадыр-Лунгу — самый солнечный город страны — на самой высокой точке холма стоит наша винодельня. Отсюда открываются 15 гектаров виноградников; южный ветер приносит на склоны прохладу и оставляет в вине солоноватую ноту бриза рядом с черносливом и черешней.",
        en: "In the south of Moldova, at the entrance to Ceadîr-Lunga — the sunniest town in the country — our winery stands on the highest point of the hill. From here, 15 hectares of vineyards open out; a southern wind brings coolness to the slopes and leaves in the wine a faintly saline note of the breeze, alongside prune and cherry.",
        ro: "În sudul Moldovei, la intrarea în Ceadîr-Lunga — cel mai însorit oraș al țării — crama noastră se află pe cel mai înalt punct al dealului. De aici se deschid 15 hectare de podgorii; un vânt dinspre sud aduce răcoare pe pante și lasă în vin o notă ușor sărată de briză, alături de prune uscate și cireșe.",
      },
    },
    process: {
      title: {
        ru: "От первой лозы до бутылки",
        en: "From the first vine to the bottle",
        ro: "De la prima viță la sticlă",
      },
      text: {
        ru: "Первые лозы мы посадили в 2019-м, а уже в 2020-м собрали первый урожай. Сегодня семья развивает 15 гектаров — каберне-совиньон, мерло, фетяска-нягрэ, фетяска-албэ, виорика, шираз и другие сорта — и планирует расширение ещё на 3–5 га. Участок в 100 метрах от шато: виноград идёт в работу максимально свежим. Контролируемая ферментация и минимум сульфитов сохраняют натуральный вкус и живую кислотность. Камеры выдержки — нержавеющие ёмкости и баррики из молдавского, карпатского и французского дуба.",
        en: "We planted the first vines in 2019 and gathered the first harvest in 2020. Today the family tends 15 hectares — Cabernet Sauvignon, Merlot, Fetească Neagră, Fetească Albă, Viorica, Shiraz and other varieties — with plans to expand by a further 3–5 hectares. The plot lies 100 metres from the château, so the grapes reach the cellar at their freshest. Controlled fermentation and minimal sulphites preserve their natural taste and lively acidity. Our ageing rooms hold stainless-steel tanks and barriques of Moldovan, Carpathian and French oak.",
        ro: "Am plantat primele vițe în 2019, iar în 2020 am cules prima recoltă. Astăzi familia îngrijește 15 hectare — Cabernet Sauvignon, Merlot, Fetească Neagră, Fetească Albă, Viorica, Shiraz și alte soiuri — și plănuiește o extindere cu încă 3–5 hectare. Parcela se află la 100 de metri de cramă, așa că strugurii ajung la lucru cât mai proaspeți. Fermentația controlată și un minim de sulfiți le păstrează gustul natural și aciditatea vie. Camerele de maturare adăpostesc cisterne din inox și baricuri din stejar moldovenesc, carpatin și franțuzesc.",
      },
    },
    sustain: {
      title: {
        ru: "С заботой о природе",
        en: "With care for nature",
        ro: "Cu grijă pentru natură",
      },
      text: {
        ru: "Мы бережём землю так же, как берегли её предки. Накопительное озеро питает орошение, а собственная солнечная электростанция на 100 кВт обеспечивает энергией всю винодельню — излишки мы отдаём в общую сеть.",
        en: "We look after the land the way our ancestors did. A reservoir lake feeds the irrigation, while our own 100 kW solar power plant supplies the entire winery — and we feed the surplus back into the grid.",
        ro: "Avem grijă de pământ așa cum aveau și strămoșii noștri. Un lac de acumulare alimentează irigația, iar propria centrală solară de 100 kW asigură energia întregii crame — iar surplusul îl dăm înapoi în rețea.",
      },
    },
    varieties: {
      title: { ru: "Наши сорта", en: "Our varieties", ro: "Soiurile noastre" },
      text: {
        ru: "Семь сортов, среди них редкая виорика, которую почти не встретишь за пределами Молдовы. У каждого — своя история и свой характер.",
        en: "Seven varieties, among them the rare Viorica, hardly grown anywhere outside Moldova. Each has its own story and character.",
        ro: "Șapte soiuri, printre care rarul Viorica, aproape necultivat în afara Moldovei. Fiecare cu povestea și caracterul său.",
      },
    },
    awards: {
      eyebrow: { ru: "Награды", en: "Awards", ro: "Premii" },
      title: {
        ru: "Вина, отмеченные международным жюри",
        en: "Wines recognised by international juries",
        ro: "Vinuri premiate de jurii internaționale",
      },
    },
    cta: {
      title: {
        ru: "Приезжайте на вершину холма",
        en: "Come to the top of the hill",
        ro: "Veniți pe vârful dealului",
      },
      visit: {
        ru: "Приехать на дегустацию",
        en: "Come for a tasting",
        ro: "Veniți la o degustare",
      },
      wines: {
        ru: "Выбрать вино",
        en: "Choose a wine",
        ro: "Alegeți un vin",
      },
    },
  },
  footer: {
    brandCol: { ru: "Винодельня", en: "Winery", ro: "Crama" },
    socialCol: { ru: "Соцсети", en: "Social", ro: "Rețele sociale" },
    extraCol: { ru: "Дополнительно", en: "More", ro: "Mai mult" },
    contactsCol: { ru: "Контакты", en: "Contacts", ro: "Contacte" },
    // Год подставляется в Footer.tsx из текущей даты
    rights: {
      ru: "Chateau At Mount. Гагаузия, Молдова.",
      en: "Chateau At Mount. Gagauzia, Moldova.",
      ro: "Chateau At Mount. Găgăuzia, Moldova.",
    },
  },
} as const;
