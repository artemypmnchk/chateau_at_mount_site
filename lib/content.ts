export type Locale = "ru" | "en" | "ro";

export const locales: Locale[] = ["ru", "en", "ro"];

export type WineLine = "classic" | "rare" | "experimental";

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
  /** Линейка — главы на /wines и на главной (lib/lines.ts): classic — семь
   *  сортов, rare — красные малым тиражом, experimental — игристое, оранж
   *  и купажи PONI. */
  line: WineLine;
  /** Цвет/жанр — порядок внутри главы: sparkling → white → rose → orange → red. */
  colour: "sparkling" | "white" | "rose" | "orange" | "red";
  /** Состав купажа словами, без долей (в карточке не показывается —
   *  у всех вин одна строка типа; пригодится для страницы вина). */
  blend?: string;
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

// Порядок массива = порядок показа на /wines: главы Classic → Rare → Experimental,
// внутри главы по цвету (игристое → белое → розе → оранж → красное), Viorica первой.
// Крепость — по техфишкам винодельни (сентябрь 2026).
export const wines: Wine[] = [
  {
    slug: "merlot",
    line: "classic",
    colour: "red",
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
      title: "Мерло (Merlot) — сухое красное, Молдова",
      description:
        "Сухое красное вино Merlot от семейной винодельни Chateau At Mount (Гагаузия, Молдова): крепость, температура подачи и история сорта.",
    },
  },
  {
    slug: "cabernet-rose",
    line: "classic",
    colour: "rose",
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
      title: "Cabernet Rosé — сухое розе, Молдова",
      description:
        "Сухое розовое вино Cabernet Rose от семейной винодельни Chateau At Mount (Гагаузия, Молдова): крепость, температура подачи и история вина.",
    },
  },
  {
    slug: "viorica",
    line: "classic",
    colour: "white",
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
      title: "Виорика (Viorica) — редкое белое, Молдова",
      description:
        "Viorica (Виорика) — сухое белое из редкого ароматного сорта, который растёт почти только в Молдове. Крепость, подача, история сорта. Chateau At Mount, Гагаузия.",
    },
  },
  {
    slug: "feteasca-neagra",
    line: "classic",
    colour: "red",
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
    alcohol: { ru: "14,5 % об.", en: "14.5% ABV", ro: "14,5% vol." },
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
      title: "Фетяска Нягрэ — красное вино, Молдова",
      description:
        "Fetească Neagră (Фетяска Нягрэ) — сухое красное из древнего молдавского сорта. Крепость, подача и история сорта. Винодельня Chateau At Mount, Гагаузия.",
    },
  },
  {
    slug: "cabernet-sauvignon",
    line: "classic",
    colour: "red",
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
      title: "Каберне Совиньон — сухое красное, Молдова",
      description:
        "Сухое красное вино Cabernet Sauvignon от семейной винодельни Chateau At Mount (Гагаузия, Молдова): крепость, температура подачи и история сорта.",
    },
  },
  {
    slug: "feteasca-alba",
    line: "classic",
    colour: "white",
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
    alcohol: { ru: "12,5 % об.", en: "12.5% ABV", ro: "12,5% vol." },
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
      title: "Фетяска Албэ — белое вино, Молдова",
      description:
        "Fetească Albă (Фетяска Албэ) — сухое белое из старинного молдавского сорта. Крепость, подача и история сорта. Винодельня Chateau At Mount, Гагаузия.",
    },
  },
  {
    slug: "shiraz",
    line: "classic",
    colour: "red",
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
      title: "Шираз (Shiraz) — сухое красное, Молдова",
      description:
        "Сухое красное вино Shiraz от семейной винодельни Chateau At Mount (Гагаузия, Молдова): крепость, температура подачи и история сорта.",
    },
  },

  /* ===================== RARE — красные малым тиражом ===================== */
  {
    slug: "rare-feteasca-neagra-merlot",
    line: "rare",
    colour: "red",
    name: "Fetească Neagră & Merlot",
    image: "/images/wine-rare-feteasca-neagra-merlot.png",
    accent: "#bfaeb2", // пипетка: капсула #524043 / светлый узор капсулы; полотно — тёмный мов капсулы
    accentDark: "#5e2a33",
    band: "#4a3a3e",
    desc: {
      ru: "Чёрные фрукты и ягоды, специи и травы. Плотное и самобытное",
      en: "Black fruit and berries, spices and herbs. Dense and distinctive",
      ro: "Fructe negre și de pădure, condimente și ierburi. Dens și autentic",
    },
    notes: {
      ru: ["чёрные фрукты", "специи", "травы"],
      en: ["black fruit", "spices", "herbs"],
      ro: ["fructe negre", "condimente", "ierburi"],
    },
    type: { ru: "Сухое красное", en: "Dry red", ro: "Roșu sec" },
    alcohol: { ru: "14,5 % об.", en: "14.5% ABV", ro: "14,5% vol." },
    servingTemp: "16–18 °C",
    pairings: {
      ru: [
        "Ягнёнок и дичь",
        "Мясо на углях",
        "Выдержанные твёрдые сыры",
        "Тушёные блюда с травами",
      ],
      en: [
        "Lamb and game",
        "Charcoal-grilled meat",
        "Aged hard cheeses",
        "Herb-braised dishes",
      ],
      ro: [
        "Miel și vânat",
        "Carne la jar",
        "Brânzeturi tari maturate",
        "Tocănițe cu ierburi",
      ],
    },
    story: {
      ru: "Линейка Rare — красные вина малым тиражом и с минимумом сульфитов, в тёмном стекле под восковой печатью. Этот купаж соединяет автохтонную Fetească Neagră с Merlot: первая даёт характер и специи, второй — плотность и мягкость.",
      en: "The Rare line is small-batch reds with minimal sulfites, in dark glass under a wax seal. This blend joins the native Fetească Neagră with Merlot: the first brings character and spice, the second density and softness.",
      ro: "Linia Rare înseamnă vinuri roșii în serii mici, cu minimum de sulfiți, în sticlă închisă sub sigiliu de ceară. Acest cupaj unește Fetească Neagră autohtonă cu Merlot: prima dă caracter și condimente, al doilea densitate și rotunjime.",
    },
    seo: {
      title: "Fetească Neagră & Merlot Rare — купаж",
      description:
        "Купаж Fetească Neagră и Merlot из линейки Rare винодельни Chateau At Mount (Гагаузия, Молдова): малый тираж, минимум сульфитов, крепость и подача.",
    },
  },
  {
    slug: "rare-cabernet-merlot",
    line: "rare",
    colour: "red",
    name: "Cabernet Sauvignon & Merlot",
    image: "/images/wine-rare-cabernet-merlot.png",
    accent: "#d4b46a", // золотая капсула (по снимку из чата; пересэмплировать с файла) — полотно тёмная бронза
    accentDark: "#7a5c1e",
    band: "#5f4a22",
    desc: {
      ru: "Вишня и ежевика, шоколад, чёрный перец и дымные ноты",
      en: "Cherry and blackberry, chocolate, black pepper and smoky notes",
      ro: "Cireșe și mure, ciocolată, piper negru și note afumate",
    },
    notes: {
      ru: ["вишня", "шоколад", "чёрный перец"],
      en: ["cherry", "chocolate", "black pepper"],
      ro: ["cireșe", "ciocolată", "piper negru"],
    },
    type: { ru: "Сухое красное", en: "Dry red", ro: "Roșu sec" },
    alcohol: { ru: "14 % об.", en: "14% ABV", ro: "14% vol." },
    servingTemp: "16–18 °C",
    pairings: {
      ru: ["Стейк", "Ростбиф", "Выдержанные сыры", "Тёмный шоколад"],
      en: ["Steak", "Roast beef", "Aged cheeses", "Dark chocolate"],
      ro: ["Friptură", "Roast beef", "Brânzeturi maturate", "Ciocolată neagră"],
    },
    story: {
      ru: "Классическая бордоская пара в линейке Rare: Cabernet Sauvignon даёт структуру и чёрную смородину, Merlot — округлость и вишню. Малый тираж, минимум сульфитов, тёмное стекло и восковая печать.",
      en: "The classic Bordeaux pair in the Rare line: Cabernet Sauvignon brings structure and blackcurrant, Merlot roundness and cherry. Small batch, minimal sulfites, dark glass and a wax seal.",
      ro: "Perechea clasică bordeleză în linia Rare: Cabernet Sauvignon dă structură și coacăze negre, Merlot rotunjime și cireșe. Serie mică, minimum de sulfiți, sticlă închisă și sigiliu de ceară.",
    },
    seo: {
      title: "Cabernet Sauvignon & Merlot Rare — купаж",
      description:
        "Купаж Cabernet Sauvignon и Merlot из линейки Rare винодельни Chateau At Mount (Гагаузия, Молдова): малый тираж, минимум сульфитов, крепость и подача.",
    },
  },
  {
    slug: "rare-merlot",
    line: "rare",
    colour: "red",
    name: "Merlot",
    image: "/images/wine-rare-merlot.png",
    accent: "#d09a83", // как у классического Merlot (решение владельца): терракота этикетки, гранатовое полотно
    accentDark: "#a25a41",
    band: "#5b090e",
    desc: {
      ru: "Плотный аромат чёрной сливы с оттенками вишни и табака",
      en: "A dense aroma of black plum with hints of cherry and tobacco",
      ro: "Aromă densă de prune negre cu nuanțe de cireșe și tutun",
    },
    notes: {
      ru: ["чёрная слива", "вишня", "табак"],
      en: ["black plum", "cherry", "tobacco"],
      ro: ["prune negre", "cireșe", "tutun"],
    },
    type: { ru: "Сухое красное", en: "Dry red", ro: "Roșu sec" },
    alcohol: { ru: "14 % об.", en: "14% ABV", ro: "14% vol." },
    servingTemp: "16–18 °C",
    pairings: {
      ru: ["Утка и дичь", "Мясо на гриле", "Грибные блюда", "Выдержанные сыры"],
      en: ["Duck and game", "Grilled meat", "Mushroom dishes", "Aged cheeses"],
      ro: [
        "Rață și vânat",
        "Carne la grătar",
        "Preparate cu ciuperci",
        "Brânzeturi maturate",
      ],
    },
    story: {
      ru: "Merlot из линейки Rare — тот же сорт, что и в классике, но малым тиражом и с минимумом сульфитов. Больше плотности и тёмных фруктов, табачная нота, тёмное стекло и восковая печать.",
      en: "The Rare-line Merlot is the same variety as in the Classic line, but in a small batch with minimal sulfites. More density and dark fruit, a tobacco note, dark glass and a wax seal.",
      ro: "Merlot din linia Rare este același soi ca în linia clasică, dar în serie mică și cu minimum de sulfiți. Mai multă densitate și fructe închise, o notă de tutun, sticlă închisă și sigiliu de ceară.",
    },
    seo: {
      title: "Merlot Rare — красное малым тиражом",
      description:
        "Merlot из линейки Rare винодельни Chateau At Mount (Гагаузия, Молдова): малый тираж, минимум сульфитов, крепость, подача и история сорта.",
    },
  },
  {
    slug: "rare-cabernet-sauvignon",
    line: "rare",
    colour: "red",
    name: "Cabernet Sauvignon",
    image: "/images/wine-rare-cabernet-sauvignon.png",
    accent: "#cbaa7e", // как у классического Cabernet: янтарный акцент; полотно — его кофейный тон, чуть поднят, чтобы чёрная бутылка не тонула
    accentDark: "#8d6a3f",
    band: "#2b1b13",
    desc: {
      ru: "Насыщенная чёрная смородина с нотами ежевики, кожи и специй",
      en: "Rich blackcurrant with notes of blackberry, leather and spice",
      ro: "Coacăze negre intense cu note de mure, piele și condimente",
    },
    notes: {
      ru: ["чёрная смородина", "кожа", "специи"],
      en: ["blackcurrant", "leather", "spice"],
      ro: ["coacăze negre", "piele", "condimente"],
    },
    type: { ru: "Сухое красное", en: "Dry red", ro: "Roșu sec" },
    alcohol: { ru: "14 % об.", en: "14% ABV", ro: "14% vol." },
    servingTemp: "16–18 °C",
    pairings: {
      ru: [
        "Стейк и ягнёнок",
        "Мясо на углях",
        "Твёрдые выдержанные сыры",
        "Блюда с розмарином",
      ],
      en: [
        "Steak and lamb",
        "Charcoal-grilled meat",
        "Hard aged cheeses",
        "Rosemary dishes",
      ],
      ro: [
        "Friptură și miel",
        "Carne la jar",
        "Brânzeturi tari maturate",
        "Preparate cu rozmarin",
      ],
    },
    story: {
      ru: "Cabernet Sauvignon из линейки Rare — малый тираж и минимум сульфитов. Сорт с плотными танинами здесь раскрывается чёрной смородиной, кожей и специями. Тёмное стекло, восковая печать.",
      en: "The Rare-line Cabernet Sauvignon: a small batch with minimal sulfites. A firmly tannic variety that here opens with blackcurrant, leather and spice. Dark glass, a wax seal.",
      ro: "Cabernet Sauvignon din linia Rare: serie mică și minimum de sulfiți. Un soi cu taninuri ferme, care aici se deschide cu coacăze negre, piele și condimente. Sticlă închisă, sigiliu de ceară.",
    },
    seo: {
      title: "Cabernet Sauvignon Rare — малый тираж",
      description:
        "Cabernet Sauvignon из линейки Rare винодельни Chateau At Mount (Гагаузия, Молдова): малый тираж, минимум сульфитов, крепость, подача и история сорта.",
    },
  },
  /* ============ EXPERIMENTAL — игристое, оранж, купажи PONI ============ */
  {
    slug: "extra-brut-alb",
    line: "experimental",
    colour: "sparkling",
    name: "Extra Brut Alb",
    image: "/images/wine-extra-brut-alb.png",
    accent: "#c9c6bb", // пипетка: серебро мазка; полотно — графит этикетки #242b31
    accentDark: "#5f5b53",
    band: "#2a3034",
    desc: {
      ru: "Яркое и свежее, с ароматом цветов и белых фруктов",
      en: "Bright and fresh, with aromas of flowers and white fruit",
      ro: "Luminos și proaspăt, cu arome de flori și fructe albe",
    },
    notes: {
      ru: ["цветы", "белые фрукты"],
      en: ["flowers", "white fruit"],
      ro: ["flori", "fructe albe"],
    },
    type: {
      ru: "Игристое белое, экстра брют",
      en: "Sparkling white, extra brut",
      ro: "Spumant alb, extra brut",
    },
    alcohol: { ru: "12,5 % об.", en: "12.5% ABV", ro: "12,5% vol." },
    servingTemp: "6–8 °C",
    pairings: {
      ru: ["Аперитив", "Устрицы и морепродукты", "Лёгкие закуски", "Козий сыр"],
      en: ["Aperitif", "Oysters and seafood", "Light starters", "Goat cheese"],
      ro: [
        "Aperitiv",
        "Stridii și fructe de mare",
        "Gustări ușoare",
        "Brânză de capră",
      ],
    },
    story: {
      ru: "Игристое из Fetească Albă. Экстра брют — самая сухая категория: сахара почти нет, и вино остаётся прямым и свежим, с цветочным ароматом сорта и тонким перляжем.",
      en: "A sparkling wine from Fetească Albă. Extra brut is the driest category: almost no sugar, so the wine stays direct and fresh, with the variety's floral aroma and a fine bead.",
      ro: "Un spumant din Fetească Albă. Extra brut este cea mai seacă categorie: aproape fără zahăr, vinul rămâne direct și proaspăt, cu aroma florală a soiului și un perlaj fin.",
    },
    seo: {
      title: "Extra Brut Alb — белое игристое, Молдова",
      description:
        "Белое игристое экстра брют из Fetească Albă от винодельни Chateau At Mount (Гагаузия, Молдова): крепость, температура подачи и гастрономические пары.",
    },
  },
  {
    slug: "extra-brut-rose",
    line: "experimental",
    colour: "sparkling",
    name: "Extra Brut Rosé",
    image: "/images/wine-extra-brut-rose.png",
    accent: "#dfc165", // пипетка: золото мазка #dfc165; полотно — маджента логотипа, затемнена
    accentDark: "#8a6a2e",
    band: "#6e2f4a",
    desc: {
      ru: "Свежее и яркое, с нотами красных ягод и бриоши",
      en: "Fresh and bright, with notes of red berries and brioche",
      ro: "Proaspăt și luminos, cu note de fructe roșii și brioșă",
    },
    notes: {
      ru: ["красные ягоды", "бриошь"],
      en: ["red berries", "brioche"],
      ro: ["fructe roșii", "brioșă"],
    },
    type: {
      ru: "Игристое розовое, экстра брют",
      en: "Sparkling rosé, extra brut",
      ro: "Spumant rosé, extra brut",
    },
    alcohol: { ru: "12,6 % об.", en: "12.6% ABV", ro: "12,6% vol." },
    servingTemp: "6–8 °C",
    pairings: {
      ru: [
        "Аперитив",
        "Рыба и морепродукты на гриле",
        "Мягкие сыры",
        "Ягодные десерты",
      ],
      en: [
        "Aperitif",
        "Grilled fish and seafood",
        "Soft cheeses",
        "Berry desserts",
      ],
      ro: [
        "Aperitiv",
        "Pește și fructe de mare la grătar",
        "Brânzeturi moi",
        "Deserturi cu fructe de pădure",
      ],
    },
    story: {
      ru: "Розовое игристое из Shiraz. Сорт, который в классике даёт плотное красное, здесь снят рано и коротко настоян на кожице: отсюда цвет и ягодность, а выдержка на осадке добавляет бриошь.",
      en: "A rosé sparkling from Shiraz. The variety that gives a dense red in the Classic line is picked early here and briefly macerated on the skins: hence the colour and berry fruit, while ageing on the lees adds brioche.",
      ro: "Un spumant rosé din Shiraz. Soiul care în linia clasică dă un roșu dens este cules aici devreme și macerat scurt pe pielițe: de aici culoarea și fructul, iar maturarea pe drojdii adaugă brioșa.",
    },
    seo: {
      title: "Extra Brut Rosé — розовое игристое",
      description:
        "Розовое игристое экстра брют из Shiraz от винодельни Chateau At Mount (Гагаузия, Молдова): крепость, температура подачи и гастрономические пары.",
    },
  },
  {
    slug: "poni-white",
    line: "experimental",
    colour: "white",
    name: "PONI White",
    image: "/images/wine-poni-white.png",
    accent: "#e8cbb7", // пипетка: кремово-розовая этикетка; полотно — тёплая терракота этикетки #997b6b
    accentDark: "#9b5b49",
    band: "#7d5f50",
    heroTone: "#7d5f50",
    blend: "Viorica · Fetească Albă",
    desc: {
      ru: "Купаж двух автохтонов: цветочная Viorica и хрустящая Fetească Albă",
      en: "A blend of two native varieties: floral Viorica and crisp Fetească Albă",
      ro: "Un cupaj din două soiuri autohtone: Viorica florală și Fetească Albă crocantă",
    },
    notes: {
      ru: ["полевые цветы", "зелёное яблоко", "цитрус"],
      en: ["wildflowers", "green apple", "citrus"],
      ro: ["flori de câmp", "măr verde", "citrice"],
    },
    type: { ru: "Сухое белое", en: "Dry white", ro: "Alb sec" },
    alcohol: { ru: "12,5 % об.", en: "12.5% ABV", ro: "12,5% vol." },
    servingTemp: "8–10 °C",
    pairings: {
      ru: ["Салаты и зелень", "Рыба на пару", "Молодые сыры", "Летние закуски"],
      en: [
        "Salads and greens",
        "Steamed fish",
        "Young cheeses",
        "Summer starters",
      ],
      ro: [
        "Salate și verdețuri",
        "Pește la abur",
        "Brânzeturi tinere",
        "Gustări de vară",
      ],
    },
    story: {
      ru: "PONI — наши купажи с рисованными этикетками, вино без строгих правил. Белый PONI собран из двух молдавских автохтонов: Viorica даёт цветы и пряность, Fetească Albă — яблоко и свежесть.",
      en: "PONI is our line of blends with illustrated labels, wine without strict rules. The white PONI is made from two Moldovan natives: Viorica brings flowers and spice, Fetească Albă apple and freshness.",
      ro: "PONI sunt cupajele noastre cu etichete desenate, vin fără reguli stricte. PONI alb este făcut din două soiuri autohtone moldovenești: Viorica dă flori și condiment, Fetească Albă măr și prospețime.",
    },
    seo: {
      title: "PONI White — Viorica и Fetească Albă",
      description:
        "PONI White — сухой белый купаж автохтонных сортов Viorica и Fetească Albă от винодельни Chateau At Mount (Гагаузия, Молдова): крепость, подача и пары.",
    },
  },
  {
    slug: "amber",
    line: "experimental",
    colour: "orange",
    name: "Amber at Mount",
    image: "/images/wine-amber.png",
    accent: "#d3b69c", // пипетка: светлая медь этикетки; полотно — медь капсулы #945f33
    accentDark: "#7b421c",
    band: "#84552f",
    heroTone: "#84552f",
    desc: {
      ru: "Viorica на кожице: сухофрукты, специи, цитрус и мёд",
      en: "Viorica on the skins: dried fruit, spices, citrus and honey",
      ro: "Viorica pe pielițe: fructe uscate, condimente, citrice și miere",
    },
    notes: {
      ru: ["сухофрукты", "специи", "мёд"],
      en: ["dried fruit", "spices", "honey"],
      ro: ["fructe uscate", "condimente", "miere"],
    },
    type: { ru: "Сухое оранжевое", en: "Dry orange", ro: "Oranj sec" },
    alcohol: { ru: "12,5 % об.", en: "12.5% ABV", ro: "12,5% vol." },
    servingTemp: "10–12 °C",
    pairings: {
      ru: [
        "Пряная и восточная кухня",
        "Птица с специями",
        "Грибы",
        "Выдержанные сыры",
      ],
      en: [
        "Spicy and Eastern dishes",
        "Spiced poultry",
        "Mushrooms",
        "Aged cheeses",
      ],
      ro: [
        "Bucătărie condimentată și orientală",
        "Pasăre cu mirodenii",
        "Ciuperci",
        "Brânzeturi maturate",
      ],
    },
    story: {
      ru: "Оранжевое вино делают из белого винограда по красной технологии: сок бродит вместе с кожицей. Amber — это Viorica, настоянная на кожице: янтарный цвет, лёгкие танины и аромат сухофруктов, специй и мёда.",
      en: "Orange wine is made from white grapes the way reds are: the juice ferments with the skins. Amber is Viorica macerated on its skins: amber colour, light tannins and aromas of dried fruit, spices and honey.",
      ro: "Vinul oranj se face din struguri albi după tehnologia roșiilor: mustul fermentează împreună cu pielițele. Amber este Viorica macerată pe pielițe: culoare de chihlimbar, taninuri ușoare și arome de fructe uscate, condimente și miere.",
    },
    seo: {
      title: "Amber — оранжевое вино из Viorica",
      description:
        "Оранжевое сухое вино Amber из Viorica на кожице от винодельни Chateau At Mount (Гагаузия, Молдова): крепость, температура подачи и гастрономические пары.",
    },
  },
  {
    slug: "poni-red",
    line: "experimental",
    colour: "red",
    name: "PONI Red",
    image: "/images/wine-poni-red.png",
    accent: "#e39a6b", // пипетка: огонь этикетки; полотно — тёмный кармин сургуча #7e1719
    accentDark: "#9a4a2a",
    band: "#7a2a26",
    blend: "Fetească Neagră · Merlot · Pinot Noir",
    desc: {
      ru: "Три сорта в одном купаже: сочный, прямой, с мягкими танинами",
      en: "Three varieties in one blend: juicy, direct, with soft tannins",
      ro: "Trei soiuri într-un cupaj: suculent, direct, cu taninuri moi",
    },
    notes: {
      ru: ["вишня", "красные ягоды", "специи"],
      en: ["cherry", "red berries", "spice"],
      ro: ["cireșe", "fructe roșii", "condimente"],
    },
    type: { ru: "Сухое красное", en: "Dry red", ro: "Roșu sec" },
    alcohol: { ru: "13,5 % об.", en: "13.5% ABV", ro: "13,5% vol." },
    servingTemp: "14–16 °C",
    pairings: {
      ru: ["Пицца и паста", "Бургеры", "Мясо на гриле", "Полутвёрдые сыры"],
      en: ["Pizza and pasta", "Burgers", "Grilled meat", "Semi-hard cheeses"],
      ro: [
        "Pizza și paste",
        "Burgeri",
        "Carne la grătar",
        "Brânzeturi semitari",
      ],
    },
    story: {
      ru: "Красный PONI — купаж Fetească Neagră, Merlot и Pinot Noir. Автохтон даёт характер, Merlot — тело, Pinot Noir — лёгкость и ягодность. Вино на каждый день, без строгих правил.",
      en: "The red PONI is a blend of Fetească Neagră, Merlot and Pinot Noir. The native variety brings character, Merlot the body, Pinot Noir lightness and berry fruit. An everyday wine without strict rules.",
      ro: "PONI roșu este un cupaj de Fetească Neagră, Merlot și Pinot Noir. Soiul autohton dă caracter, Merlot corp, Pinot Noir lejeritate și fruct. Un vin de zi cu zi, fără reguli stricte.",
    },
    seo: {
      title: "PONI Red — купаж Fetească Neagră и Merlot",
      description:
        "PONI Red — сухой красный купаж Fetească Neagră, Merlot и Pinot Noir от винодельни Chateau At Mount (Гагаузия, Молдова): крепость, подача и пары.",
    },
  },
];

/** Классическая линейка — лента вин на главной и «7 сортов» в текстах. */

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
  instagram: "https://www.instagram.com/at_mount_chateau.md",
  telegram: "https://t.me/nelliviktorovna",
  tiktok: "https://www.tiktok.com/@at_mount_chateau",
  vivino: "https://www.vivino.com/en/wineries/chateau-at-mount",
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
    // разметку звёздочками сохранять. Русский текст согласован владельцем
    // 03.09.2026 (docs/brief-manifesto-copy.md): без брендов и без чисел,
    // которые меняются (сорта, вина, медали). en/ro — черновики к вычитке.
    manifesto: {
      ru: "Семейная винодельня в Чадыр-Лунге, на юге Молдовы. С 2019 года выращиваем *свой* виноград и делаем из него сухие вина, которые получают *медали* международных конкурсов",
      en: "A family winery in Ceadîr-Lunga, southern Moldova. Since 2019 we've been growing *our own* grapes and making dry wines that win *medals* at international competitions",
      ro: "O cramă de familie din Ceadîr-Lunga, în sudul Moldovei. Din 2019 cultivăm *propriii* noștri struguri și facem din ei vinuri seci care câștigă *medalii* la concursuri internaționale",
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
    /* Главы страницы /wines: только названия линеек, по-английски (решение
       владельца). Подписи-описания сняты — разницу показывают сами вина. */
    chapters: {
      classic: { title: "Classic" },
      rare: { title: "Rare" },
      experimental: { title: "Experimental" },
    },
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
    /* Секция на главной осталась под якорем #events (на него ведут старые
       ссылки), но теперь это анонс — ведёт на отдельную страницу. */
    ctaEvents: {
      ru: "Что мы устраиваем",
      en: "What we host",
      ro: "Ce organizăm",
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
      ru: "Дегустации на винодельне в Чадыр-Лунге",
      en: "Tastings at the winery in Ceadîr-Lunga",
      ro: "Degustări la crama din Ceadîr-Lunga",
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
    /* FAQ: открытый Q&A-список (не аккордеон) — редакционный разворот и полный
       текст в DOM для поисковиков/AI. Те же строки уходят в FAQPage JSON-LD
       (app/visit/page.tsx) — тексты на странице и в разметке обязаны совпадать. */
    faqTitle: {
      ru: "Вопросы перед визитом",
      en: "Questions before your visit",
      ro: "Întrebări înainte de vizită",
    },
    faq: [
      {
        q: {
          ru: "Сколько стоит дегустация?",
          en: "How much does a tasting cost?",
          ro: "Cât costă o degustare?",
        },
        a: {
          ru: "Три формата: «Знакомство» — 300 лей с человека (4 вина, около часа), «Классика и выдержка» — 450 лей (6 вин, примерно полтора часа), «Гагаузский стол» — 850 лей (7 вин, около двух с половиной часов).",
          en: "Three formats: Introduction — 300 MDL per person (4 wines, about an hour), Classics and Reserve — 450 MDL (6 wines, about an hour and a half), the Gagauz Table — 850 MDL (7 wines, around two and a half hours).",
          ro: "Trei formate: Cunoștință — 300 de lei de persoană (4 vinuri, circa o oră), Clasică și maturate — 450 de lei (6 vinuri, circa o oră și jumătate), Masa găgăuză — 850 de lei (7 vinuri, aproximativ două ore și jumătate).",
        },
      },
      {
        q: {
          ru: "Нужно ли записываться заранее?",
          en: "Do I need to book in advance?",
          ro: "Trebuie să mă programez din timp?",
        },
        a: {
          ru: "Да, мы принимаем гостей по предварительной записи. Написать можно в Telegram, через форму на сайте или позвонить по телефону.",
          en: "Yes, visits are by prior appointment. You can write to us on Telegram, use the form on the site or call us.",
          ro: "Da, primim oaspeți pe bază de programare. Ne puteți scrie pe Telegram, folosi formularul de pe site sau suna.",
        },
      },
      {
        q: {
          ru: "Какая минимальная компания?",
          en: "What is the minimum group size?",
          ro: "Care este grupul minim?",
        },
        a: {
          ru: "«Знакомство» и «Классика и выдержка» — от четырёх гостей, «Гагаузский стол» — от двух. Большие группы и пикники обсуждаем отдельно.",
          en: "Introduction and Classics and Reserve start from four guests, the Gagauz Table from two. Larger groups and picnics are arranged individually.",
          ro: "Cunoștință și Clasică și maturate — de la patru oaspeți, Masa găgăuză — de la doi. Grupurile mari și picnicurile le discutăm separat.",
        },
      },
      {
        q: {
          ru: "Как добраться до винодельни?",
          en: "How do I get to the winery?",
          ro: "Cum ajung la cramă?",
        },
        a: {
          ru: "Винодельня стоит на вершине холма на въезде в Чадыр-Лунгу (Гагаузия, Молдова) — около двух часов на машине от Кишинёва. Точка на карте — внизу страницы.",
          en: "The winery sits on top of the hill at the entrance to Ceadîr-Lunga (Gagauzia, Moldova) — about a two-hour drive from Chișinău. The map link is at the bottom of the page.",
          ro: "Crama se află pe vârful dealului, la intrarea în Ceadîr-Lunga (Găgăuzia, Moldova) — la circa două ore de mers cu mașina de la Chișinău. Punctul pe hartă e în josul paginii.",
        },
      },
      {
        q: {
          ru: "Можно ли приехать с детьми?",
          en: "Can we come with children?",
          ro: "Putem veni cu copii?",
        },
        a: {
          ru: "Да, с детьми приезжать можно: прогулка по виноградникам и вид с холма интересны и без бокала. Само вино — только для гостей старше 18 лет.",
          en: "Yes, children are welcome: the vineyard walk and the hilltop view are worth the trip even without a glass. The wine itself is for guests over 18 only.",
          ro: "Da, copiii sunt bineveniți: plimbarea prin podgorii și priveliștea de pe deal merită și fără un pahar. Vinul în sine este doar pentru oaspeții de peste 18 ani.",
        },
      },
      {
        q: {
          ru: "Можно ли купить вино с собой?",
          en: "Can I buy wine to take home?",
          ro: "Pot cumpăra vin la pachet?",
        },
        a: {
          ru: "Да. Всё, что понравилось на дегустации, продаётся прямо на винодельне — заберёте бутылки с собой.",
          en: "Yes. Everything you enjoyed at the tasting is sold right at the winery — take your bottles home with you.",
          ro: "Da. Tot ce v-a plăcut la degustare se vinde direct la cramă — luați sticlele cu voi acasă.",
        },
      },
    ],
  },
  /**
   * Страница «Мероприятия». Порядок предложений — от дневных к вечерним: он
   * задаёт световую дугу страницы (день → золотой час → вечер), фон
   * светлеет и темнеет вслед за ним. Менять порядок — значит ломать дугу.
   * `href` есть только у дегустаций: они живут отдельной страницей.
   */
  eventsPage: {
    eyebrow: { ru: "Мероприятия", en: "Events", ro: "Evenimente" },
    /* Заголовок разрезан надвое намеренно: половины встают по сторонам кадра,
       и фраза буквально обнимает место, о котором говорит. Тире на конце
       первой половины показывает на кадр. */
    titleA: {
      ru: "Ваш повод",
      en: "Your occasion",
      ro: "Motivul vostru",
    },
    titleB: {
      ru: "наше место",
      en: "our place",
      ro: "locul nostru",
    },
    intro: {
      ru: "Дегустации, пикники среди лоз, кино под открытым небом и территория, на которой можно организовать свой праздник.",
      en: "Tastings, picnics among the vines, open-air cinema and an estate where you can host a celebration of your own.",
      ro: "Degustări, picnicuri printre vii, cinema sub cerul liber și un domeniu unde vă puteți organiza propria sărbătoare.",
    },
    /* Верхняя кнопка ведёт в телеграм, нижняя пара — телеграм + форма */
    heroCta: {
      ru: "Забронировать мероприятие",
      en: "Book an event",
      ro: "Rezervați un eveniment",
    },
    offersEyebrow: {
      ru: "Что мы предлагаем",
      en: "What we offer",
      ro: "Ce oferim",
    },
    offersTitle: {
      ru: "Восемь способов провести у нас время",
      en: "Eight ways to spend time with us",
      ro: "Opt feluri de a petrece timpul la noi",
    },
    offerMore: { ru: "Подробнее", en: "Learn more", ro: "Detalii" },
    offerCta: {
      ru: "Забронировать мероприятие",
      en: "Book an event",
      ro: "Rezervați un eveniment",
    },
    offers: [
      {
        name: {
          ru: "Дегустация и экскурсия",
          en: "Tasting and tour",
          ro: "Degustare și tur",
        },
        blurb: {
          ru: "Три пакета на выбор — от лёгкого знакомства до полноценного винного путешествия.",
          en: "Three packages to choose from — from a light introduction to a full wine journey.",
          ro: "Trei pachete la alegere — de la o cunoștință ușoară până la o adevărată călătorie a vinului.",
        },
        media: {
          ru: "Дегустация вин на винодельне",
          en: "A wine tasting at the winery",
          ro: "O degustare de vinuri la cramă",
        },
        href: "/visit",
      },
      {
        name: {
          ru: "Творческие мастер-классы",
          en: "Creative workshops",
          ro: "Ateliere creative",
        },
        /* Роспись и живопись вином — не одно и то же, поэтому идут
           отдельными строками, а не через запятую в одном предложении.
           Подводки нет намеренно: строки говорят сами за себя. */
        items: [
          {
            ru: "Роспись винных бутылок",
            en: "Painting wine bottles",
            ro: "Pictură pe sticle de vin",
          },
          {
            ru: "Написание картины вином",
            en: "Painting a picture with wine",
            ro: "Pictarea unui tablou cu vin",
          },
        ],
        media: {
          ru: "Мастер-класс по росписи бутылок",
          en: "A bottle-painting workshop",
          ro: "Un atelier de pictură pe sticle",
        },
        price: {
          ru: "450 лей с человека",
          en: "450 MDL per person",
          ro: "450 MDL de persoană",
        },
      },
      {
        name: {
          ru: "Пикники в виноградниках",
          en: "Picnics in the vineyards",
          ro: "Picnicuri în podgorii",
        },
        blurb: {
          ru: "Уютный отдых среди лоз с бутылкой вина, красивой сервировкой и приятной атмосферой полного спокойствия.",
          en: "A cosy break among the vines with a bottle of wine, a beautifully laid table and complete calm.",
          ro: "O pauză tihnită printre vii, cu o sticlă de vin, o masă frumos aranjată și liniște deplină.",
        },
        media: {
          ru: "Пикник среди виноградных лоз",
          en: "A picnic among the vines",
          ro: "Un picnic printre vițele de vie",
        },
        price: {
          ru: "200 лей за двоих",
          en: "200 MDL for two",
          ro: "200 MDL pentru doi",
        },
        includes: {
          ru: ["Бутылка вина", "Плед и подушки", "Корзинка для пикника"],
          en: ["A bottle of wine", "A blanket and cushions", "A picnic basket"],
          ro: ["O sticlă de vin", "O pătură și perne", "Un coș de picnic"],
        },
      },
      {
        name: {
          ru: "Фотозоны для съёмок",
          en: "Photo settings",
          ro: "Zone foto",
        },
        blurb: {
          ru: "Лавандовое поле, большие качели и закаты — всё для вашего самого красивого кадра.",
          en: "A lavender field, big swings and sunsets — everything for your most beautiful shot.",
          ro: "Un câmp de lavandă, leagăne mari și apusuri — totul pentru cel mai frumos cadru al vostru.",
        },
        media: {
          ru: "Качели и лавандовое поле",
          en: "Swings and the lavender field",
          ro: "Leagănele și câmpul de lavandă",
        },
        price: {
          ru: "90 лей с человека",
          en: "90 MDL per person",
          ro: "90 MDL de persoană",
        },
      },
      {
        name: {
          ru: "Девичники",
          en: "Hen parties",
          ro: "Petreceri ale burlăcițelor",
        },
        blurb: {
          ru: "Накрытый стол, вино и вечер только для вашей компании.",
          en: "A laid table, wine and an evening just for your group.",
          ro: "O masă pregătită, vin și o seară doar pentru compania voastră.",
        },
        media: {
          ru: "Девичник за длинным столом на закате",
          en: "A hen party at a long table at sunset",
          ro: "O petrecere a burlăcițelor la o masă lungă, la apus",
        },
        price: {
          ru: "550 лей с человека",
          en: "550 MDL per person",
          ro: "550 MDL de persoană",
        },
        includes: {
          ru: ["Декор", "Вино", "Мастер-класс", "Закуски"],
          en: ["Decor", "Wine", "A workshop", "Snacks"],
          ro: ["Decor", "Vin", "Un atelier", "Gustări"],
        },
      },
      {
        name: {
          ru: "Аренда территории",
          en: "Hire of the estate",
          ro: "Închirierea domeniului",
        },
        blurb: {
          ru: "Дни рождения, корпоративы, семейные праздники и любые другие мероприятия по вашему запросу.",
          en: "Birthdays, company days, family celebrations and any other occasion you have in mind.",
          ro: "Zile de naștere, evenimente corporative, sărbători de familie și orice altă ocazie doriți.",
        },
        media: {
          ru: "Накрытый стол для праздника",
          en: "A table laid for a celebration",
          ro: "O masă pregătită pentru sărbătoare",
        },
        price: {
          ru: "Цена индивидуальная",
          en: "Priced individually",
          ro: "Preț individual",
        },
      },
      {
        name: {
          ru: "Кинотеатр под открытым небом",
          en: "Open-air cinema",
          ro: "Cinema sub cerul liber",
        },
        blurb: {
          ru: "Просмотр фильмов среди виноградников, в уютном мягком кресле, с бокалом вина и любимыми закусками.",
          en: "Films among the vineyards, in a soft armchair, with a glass of wine and your favourite snacks.",
          ro: "Filme printre podgorii, într-un fotoliu moale, cu un pahar de vin și gustările preferate.",
        },
        media: {
          ru: "Экран и кресла среди виноградников",
          en: "A screen and armchairs among the vineyards",
          ro: "Un ecran și fotolii printre podgorii",
        },
        /* Две ступени в одной строке: отдельного поля под детский тариф
           заводить не стали — он есть только здесь. */
        price: {
          ru: "Взрослый 90 лей, детский 50 лей",
          en: "Adults 90 MDL, children 50 MDL",
          ro: "Adulți 90 MDL, copii 50 MDL",
        },
      },
      {
        name: {
          ru: "Романтические свидания",
          en: "Romantic evenings",
          ro: "Seri romantice",
        },
        blurb: {
          ru: "Организуем предложение руки и сердца, годовщину или просто особенный вечер. Берём на себя всё — от декора до фотографа и музыкантов.",
          en: "We arrange a proposal, an anniversary or simply a special evening. We take care of everything — from the decor to the photographer and the musicians.",
          ro: "Organizăm o cerere în căsătorie, o aniversare sau pur și simplu o seară deosebită. Ne ocupăm de tot — de la decor până la fotograf și muzicanți.",
        },
        media: {
          ru: "Свечи и накрытый стол на двоих",
          en: "Candles and a table for two",
          ro: "Lumânări și o masă pentru doi",
        },
        price: {
          ru: "900 лей за двоих",
          en: "900 MDL for two",
          ro: "900 MDL pentru doi",
        },
        includes: {
          ru: ["Бутылка вина", "Декор", "Сырное плато"],
          en: ["A bottle of wine", "Decor", "A cheese board"],
          ro: ["O sticlă de vin", "Decor", "Un platou de brânzeturi"],
        },
      },
    ],
    finalTitle: {
      ru: "Задайте интересующий вас вопрос или оставьте свои контакты — мы обязательно свяжемся с вами",
      en: "Ask us anything you need to know, or leave your contacts — we will get back to you",
      ro: "Puneți-ne orice întrebare sau lăsați-vă datele de contact — vă vom răspunde negreșit",
    },
    finalForm: {
      ru: "Оставить заявку",
      en: "Make a request",
      ro: "Lăsați o cerere",
    },
    finalTg: {
      ru: "Связаться с нами",
      en: "Get in touch",
      ro: "Contactați-ne",
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
  /* Страница «О винодельне» (components/AboutPage.tsx).
     Вступление разбито на три части: винное «пятно» лежит только на названии
     города, одной строкой его не удержать. Манифест — с разметкой звёздочками
     (акцентные слова), при переводе её сохранять. */
  aboutPage: {
    tagline: {
      ru: "Семейная гагаузская винодельня",
      en: "A Gagauz family winery",
      ro: "Cramă de familie găgăuză",
    },
    statement: {
      before: {
        ru: "Наша винодельня находится на юге Молдовы, у въезда в солнечную ",
        en: "Our winery stands in southern Moldova, at the entrance to sunny ",
        ro: "Crama noastră se află în sudul Moldovei, la intrarea în însoritul ",
      },
      ink: {
        ru: "Чадыр-Лунгу",
        en: "Ceadîr-Lunga",
        ro: "Ceadîr-Lunga",
      },
      after: {
        ru: ", на самой высокой точке холма.",
        en: ", on the highest point of the hill.",
        ro: ", pe cel mai înalt punct al dealului.",
      },
    },
    chapters: {
      story: {
        eyebrow: { ru: "История", en: "Story", ro: "Istorie" },
        /* Заголовка у главы намеренно нет (решение владельца 17.08.2026):
           блок открывается микролейблом «История» и сразу текстом. Chapter
           умеет обходиться без title — см. components/AboutPage.tsx. */
        media: {
          ru: "Николай, основатель винодельни, открывает бутылку в поле у виноградников",
          en: "Nikolai, the winery's founder, opening a bottle in the field by the vineyards",
          ro: "Nicolae, fondatorul cramei, deschide o sticlă pe câmp, lângă vii",
        },
        caption: {
          ru: "Николай — основатель винодельни",
          en: "Nikolai — founder of the winery",
          ro: "Nicolae — fondatorul cramei",
        },
        p1: {
          ru: "Мы — семейный проект, выросший из зова предков. Chateau At Mount — детище гагаузской семьи, и её традиции слышны в характере и вкусе вина.",
          en: "We are a family project that grew out of the call of our ancestors. Chateau At Mount is the work of a Gagauz family, and its traditions can be heard in the character and taste of the wine.",
          ro: "Suntem un proiect de familie născut din chemarea strămoșilor. Chateau At Mount este opera unei familii găgăuze, iar tradițiile ei se aud în caracterul și gustul vinului.",
        },
        p2: {
          ru: "Вино здесь делали задолго до нас — по-домашнему, для себя и для гостей. Основатель вырос на этом вкусе и, повзрослев, вернулся на землю родителей: из уважения к тем, кто был до него, и ради тех, кто будет после. Вкус из детства он повторил в своих винах — и рад разделить его с каждым гостем.",
          en: "Wine was made here long before us — at home, for the family and for guests. The founder grew up on that taste and, once grown, returned to his parents' land: out of respect for those who came before him, and for the sake of those who will come after. He recreated the taste of his childhood in his own wines — and is glad to share it with every guest.",
          ro: "Vinul se făcea aici cu mult înaintea noastră — în casă, pentru familie și pentru oaspeți. Fondatorul a crescut cu acest gust și, la maturitate, s-a întors pe pământul părinților: din respect pentru cei dinaintea lui și de dragul celor care vor veni după. Gustul copilăriei l-a repetat în vinurile sale — și se bucură să îl împartă cu fiecare oaspete.",
        },
      },
      vineyards: {
        eyebrow: { ru: "Виноградники", en: "Vineyards", ro: "Podgorii" },
        title: {
          ru: "От первой лозы до бутылки",
          en: "From the first vine to the bottle",
          ro: "De la prima viță la sticlă",
        },
        media: {
          ru: "Грозди белого винограда и бутылки вина на столе в день урожая",
          en: "Bunches of white grapes and bottles of wine on a table on harvest day",
          ro: "Ciorchini de struguri albi și sticle de vin pe masă în ziua recoltei",
        },
        p1: {
          ru: "Первые лозы посадили в 2019-м, а уже в 2020-м собрали первый урожай. Сегодня семья развивает 15 га виноградников — Cabernet Sauvignon, Merlot, Fetească Neagră, Fetească Albă, Viorica, Shiraz и другие сорта. В будущем — расширение ещё на 3–5 га и выпуск до 150 000 бутылок в год.",
          en: "The first vines were planted in 2019, and the first harvest came in 2020. Today the family tends 15 hectares of vineyards — Cabernet Sauvignon, Merlot, Fetească Neagră, Fetească Albă, Viorica, Shiraz and other varieties. Ahead lie another 3–5 hectares and an output of up to 150,000 bottles a year.",
          ro: "Primele vițe au fost plantate în 2019, iar prima recoltă a venit în 2020. Astăzi familia îngrijește 15 ha de vie — Cabernet Sauvignon, Merlot, Fetească Neagră, Fetească Albă, Viorica, Shiraz și alte soiuri. Urmează încă 3–5 ha și o producție de până la 150 000 de sticle pe an.",
        },
      },
      terroir: {
        eyebrow: { ru: "Терруар", en: "Terroir", ro: "Teroir" },
        title: {
          ru: "Терруар Гагаузии: солнце, ветер и виноград",
          en: "Gagauzia terroir: sun, wind and vines",
          ro: "Teroirul Găgăuziei: soare, vânt și viță de vie",
        },
        media: {
          ru: "Ряды лозы на склоне и степной горизонт до самого края",
          en: "Rows of vines on the slope and the steppe horizon stretching to the edge",
          ro: "Rânduri de viță pe pantă și orizontul de stepă până departe",
        },
        p1: {
          ru: "Участок — в 100 метрах от шато: виноград доставляется максимально свежим, а контролируемая ферментация и минимум сульфитов сохраняют натуральный вкус и кислотность.",
          en: "The plot lies 100 metres from the château: the grapes arrive as fresh as they can be, while controlled fermentation and minimal sulphites preserve the natural taste and acidity.",
          ro: "Parcela se află la 100 de metri de cramă: strugurii ajung cât se poate de proaspeți, iar fermentația controlată și sulfiții minimi păstrează gustul natural și aciditatea.",
        },
        p2: {
          ru: "Континентальный климат юга — жаркие сухие лета, много солнца и заметные перепады дневных и ночных температур к концу сезона — даёт ягоде и сахар, и живую кислотность.",
          en: "The continental climate of the south — hot dry summers, abundant sun and marked day-to-night temperature swings towards the end of the season — gives the berry both sugar and lively acidity.",
          ro: "Clima continentală a sudului — veri calde și uscate, soare din belșug și diferențe însemnate între temperaturile de zi și de noapte spre finalul sezonului — dă boabei și zahăr, și o aciditate vie.",
        },
      },
      making: {
        eyebrow: { ru: "Виноделие", en: "Winemaking", ro: "Vinificație" },
        title: {
          ru: "Три дуба, три характера",
          en: "Three oaks, three characters",
          ro: "Trei stejari, trei caractere",
        },
        media: {
          ru: "Ряд ёмкостей из нержавеющей стали в цехе винодельни",
          en: "A row of stainless steel tanks in the winery hall",
          ro: "Un șir de cisterne de inox în hala cramei",
        },
        p1: {
          ru: "За вином стоит простая философия: как можно меньше вмешательства. Виноград приходит свежим, ферментация под контролем, сульфитов — минимум.",
          en: "A simple philosophy stands behind the wine: as little intervention as possible. The grapes arrive fresh, fermentation is controlled, sulphites are kept to a minimum.",
          ro: "În spatele vinului stă o filosofie simplă: cât mai puțină intervenție. Strugurii ajung proaspeți, fermentația este controlată, sulfiții — la minimum.",
        },
        p2: {
          ru: "Дальше выдержка: где-то в нержавеющей стали, чтобы сберечь фрукт, где-то в барриках из молдавского, карпатского и французского дуба, чтобы добавить глубины. Три дуба, три характера — бочку подбираем под каждое вино.",
          en: "Then comes ageing: some wines in stainless steel to keep the fruit, others in barriques of Moldovan, Carpathian and French oak to add depth. Three oaks, three characters — we choose the barrel to suit each wine.",
          ro: "Urmează maturarea: unele vinuri în inox, pentru a păstra fructul, altele în baricuri de stejar moldovenesc, carpatin și francez, pentru a adăuga profunzime. Trei stejari, trei caractere — alegem butoiul potrivit fiecărui vin.",
        },
      },
    },
    manifesto: {
      ru: "Мы работаем, чтобы дать вам ощутить *многолетнюю историю* и традиции нашего народа — в каждом *бокале* нашего вина",
      en: "We work to let you feel the *long history* and traditions of our people — in every *glass* of our wine",
      ro: "Lucrăm pentru a vă face să simțiți *istoria de veacuri* și tradițiile poporului nostru — în fiecare *pahar* de vin al nostru",
    },
    winesCta: {
      ru: "Наши вина",
      en: "Our wines",
      ro: "Vinurile noastre",
    },
    invite: {
      title: {
        ru: "Рады вам в любой день",
        en: "We're glad to see you any day",
        ro: "Vă așteptăm cu drag în orice zi",
      },
      lead: {
        ru: "Купите вино прямо у шато, приезжайте на дегустацию или отметьте у нас событие — с видом на Чадыр-Лунгу, за столом прямо у лоз.",
        en: "Buy wine right at the château, come for a tasting or celebrate an occasion with us — overlooking Ceadîr-Lunga, at a table set among the vines.",
        ro: "Cumpărați vin chiar la cramă, veniți la o degustare sau sărbătoriți un eveniment la noi — cu vedere spre Ceadîr-Lunga, la o masă chiar lângă vie.",
      },
      /* Фраза намеренно не закончена — её договаривает кнопка ниже
         (about.cta). При переводе многоточие сохранять. */
      finale: {
        ru: "Бокал уже налит, осталось только…",
        en: "The glass is poured — all that's left is to…",
        ro: "Paharul e turnat, mai rămâne doar să…",
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
