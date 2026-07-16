// Centrální obsah webu – texty, ceník, kroky, FAQ. Úpravy obsahu dělejte zde.

export const CONTACT = {
  phone: "+420 377 385 154",
  phoneHref: "tel:+420377385154",
  addressLine1: "Nade Mží 1108/15",
  addressLine2: "318 00 Plzeň-Skvrňany",
  mapsUrl: "https://maps.google.com/?q=Nade+Mzi+1108/15,+Plzen",
  mapsEmbed:
    "https://maps.google.com/maps?q=Nade+M%C5%BE%C3%AD+1108%2F15%2C+318+00+Plze%C5%88&z=16&output=embed",
  firmyUrl:
    "https://www.firmy.cz/detail/256850-autoservis-richard-topinka-plzen-skvrnany.html",
  hours: [
    { day: "Pondělí – Pátek", time: "7:30 – 16:00", open: true },
    { day: "Sobota", time: "Zavřeno", open: false },
    { day: "Neděle", time: "Zavřeno", open: false },
  ],
};

export const ROTATING_WORDS = [
  "osobní vozidla",
  "motocykly",
  "dodávky do 3,5 t",
  "přívěsy",
];

export const HERO_STATS = [
  { value: 30, suffix: "–45 min", label: "obvyklá délka kontroly", decimals: 0 },
  { value: 2, suffix: " roky", label: "platnost STK osobního vozu", decimals: 0 },
  { value: 4.9, suffix: "/5", label: "hodnocení na Firmy.cz", decimals: 1 },
  { value: 113, suffix: "+", label: "recenzí od řidičů", decimals: 0 },
];

export const MARQUEE_ITEMS = [
  "Osobní vozidla",
  "Motocykly",
  "Přívěsy",
  "Dodávky do 3,5 t",
  "Měření emisí",
  "Evidenční kontrola",
  "Opakovaná kontrola",
];

export const SERVICES = [
  {
    icon: "car",
    title: "STK pro osobní vozidla",
    tag: "Kategorie M1 · N1",
    desc: "Kompletní pravidelná technická kontrola osobních aut a dodávek do 3,5 tuny. Brzdy, podvozek, řízení, osvětlení i karoserie.",
    points: ["Pravidelná i opakovaná kontrola", "Výsledek a protokol na počkání"],
  },
  {
    icon: "smoke",
    title: "Měření emisí",
    tag: "Benzín · Diesel · LPG / CNG",
    desc: "Měření emisí provedeme společně s technickou kontrolou – vše vyřídíte na jednom místě při jediné návštěvě.",
    points: ["Zážehové i vznětové motory", "Vozidla s pohonem LPG a CNG"],
  },
  {
    icon: "moto",
    title: "STK pro motocykly",
    tag: "Kategorie L",
    desc: "Technická kontrola motocyklů, skútrů a mopedů. Rozumíme jednostopým strojům a víme, na co se zaměřit.",
    points: ["Motocykly všech objemů", "Rychlé odbavení v sezóně"],
  },
  {
    icon: "trailer",
    title: "STK pro přívěsy",
    tag: "Kategorie O1 · O2",
    desc: "Kontrola přívěsných vozíků za osobní automobily – nebrzděných i brzděných, včetně obytných přívěsů.",
    points: ["Vozíky do 750 kg i nad 750 kg", "Kontrola osvětlení a spojovacího zařízení"],
  },
  {
    icon: "doc",
    title: "Evidenční kontrola",
    tag: "Při prodeji či přepisu vozidla",
    desc: "Porovnáme skutečný stav vozidla s doklady – využijete ji při prodeji nebo změně vlastníka. Hotovo za pár minut, protokol ihned.",
    points: ["Hodí se při prodeji a přepisu vozidla", "Termín obratem po telefonické domluvě"],
  },
  {
    icon: "redo",
    title: "Opakovaná kontrola",
    tag: "Do 30 dnů od STK",
    desc: "Neprošli jste napoprvé? Po odstranění závad zkontrolujeme jen vytčené položky – rychle a za zvýhodněnou cenu.",
    points: ["Kontrola pouze zjištěných závad", "Poradíme, jak závady odstranit"],
  },
];

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Objednejte se",
    desc: "Zavolejte nám a domluvíme termín, který vám sedne. Po domluvě vás vezmeme i bez dlouhého čekání.",
  },
  {
    num: "02",
    title: "Přivezte vůz a doklady",
    desc: "Stačí malý techničák (osvědčení o registraci vozidla). Kompletní seznam dokladů najdete níže.",
  },
  {
    num: "03",
    title: "Provedeme kontrolu",
    desc: "Projdeme brzdy, podvozek, řízení, osvětlení a emise. Obvykle do 30–45 minut, můžete počkat na místě.",
  },
  {
    num: "04",
    title: "Vysvětlíme výsledek",
    desc: "Vše vám srozumitelně vysvětlíme. Pokud se najde závada, poradíme, co s ní a jak postupovat dál.",
  },
  {
    num: "05",
    title: "Protokol a známka",
    desc: "Dostanete protokol, vylepíme známku na registrační značku – a můžete v klidu vyrazit.",
  },
];

export const PRICING_TABS = [
  {
    id: "osobni",
    label: "Osobní vozidla",
    rows: [
      { name: "STK – pravidelná technická kontrola", note: "kategorie M1, N1", price: "1 500 Kč" },
      { name: "Měření emisí – benzín / LPG / CNG", note: "zážehové motory", price: "1 100 Kč" },
      { name: "Měření emisí – diesel", note: "vznětové motory", price: "1 300 Kč" },
      { name: "STK + emise dohromady", note: "zvýhodněná cena", price: "od 2 400 Kč", highlight: true },
      { name: "Evidenční kontrola", note: "při přepisu vozidla", price: "600 Kč" },
      { name: "Opakovaná kontrola", note: "do 30 dnů", price: "od 500 Kč" },
    ],
  },
  {
    id: "moto",
    label: "Motocykly",
    rows: [
      { name: "STK – motocykl", note: "kategorie L", price: "1 100 Kč" },
      { name: "Evidenční kontrola", note: "při přepisu", price: "500 Kč" },
      { name: "Opakovaná kontrola", note: "do 30 dnů", price: "od 400 Kč" },
    ],
  },
  {
    id: "privesy",
    label: "Přívěsy",
    rows: [
      { name: "STK – přívěs do 750 kg", note: "kategorie O1", price: "900 Kč" },
      { name: "STK – přívěs nad 750 kg", note: "kategorie O2", price: "1 100 Kč" },
      { name: "Evidenční kontrola", note: "při přepisu", price: "500 Kč" },
    ],
  },
];

export const PRICING_NOTE =
  "Ceny jsou orientační včetně DPH. Přesnou cenu pro vaše vozidlo vám rádi sdělíme telefonicky.";

export const CHECKLIST = [
  {
    title: "Malý techničák",
    desc: "Osvědčení o registraci vozidla, část I. – povinný doklad ke každé kontrole.",
  },
  {
    title: "Velký technický průkaz",
    desc: "Část II. – pokud byl k vozidlu vydán (u novějších vozidel už se nevydává).",
  },
  {
    title: "Čitelný VIN a registrační značky",
    desc: "VIN i značky musí být čitelné – pomůže, když vůz přijede přiměřeně čistý.",
  },
  {
    title: "Doklady k LPG / CNG",
    desc: "U vozidel s pohonem na plyn revizní knihu a doklady k plynovému zařízení.",
  },
  {
    title: "Doklady k přestavbě",
    desc: "Pokud bylo vozidlo přestavěno (např. na plyn), doklady o schválení přestavby.",
  },
];

export const REVIEWS = [
  {
    name: "Jana S.",
    stars: 5,
    text: "Přišla jsem s přípravou na STK, provedli prohlídku, opravili co bylo třeba a STK jsem projela napoprvé. Moc děkuji!",
  },
  {
    name: "Jiří K.",
    stars: 5,
    text: "Naprosto nevídaný a vstřícný přístup, nic není problém. Auto bylo hotové dřív, než jsem čekal. Určitě se vrátím.",
  },
  {
    name: "Petra M.",
    stars: 5,
    text: "Blesková rychlost – auto bylo hotové do druhého rána. A cena? Naprosto rozumná. Tady budu chodit vždycky.",
  },
  {
    name: "Martin V.",
    stars: 5,
    text: "Skvělá kvalita práce za velmi rozumné ceny. Pan Topinka je profík a paní Gábina na recepci je úžasná – vše zařídí a vysvětlí.",
  },
];

export const RATINGS = [
  { score: "4,9", source: "Firmy.cz" },
  { score: "4,7", source: "Google · 113 recenzí" },
];

export const FAQ = [
  {
    q: "Jak dlouho technická kontrola trvá?",
    a: "Samotná kontrola včetně měření emisí obvykle zabere 30–45 minut. Na výsledek můžete počkat přímo u nás – protokol dostanete na místě.",
  },
  {
    q: "Jak často musím s autem na STK?",
    a: "Osobní automobily a motocykly jedou na první kontrolu 4 roky od registrace, poté každé 2 roky. Lehké přívěsy do 750 kg a mopedy poprvé po 6 letech, dále každé 4 roky. Termín najdete na známce na registrační značce.",
  },
  {
    q: "Co se stane, když vozidlo neprojde?",
    a: "Nic hrozného. Vysvětlíme vám zjištěné závady a poradíme s jejich odstraněním. Na opakovanou kontrolu pak máte 30 dnů – kontrolují se při ní jen dříve vytčené závady, takže je rychlejší i levnější. Po 30 dnech je nutné absolvovat celou kontrolu znovu.",
  },
  {
    q: "Musím se objednávat předem?",
    a: "Doporučujeme předem zavolat – domluvíme přesný čas a vyhnete se čekání. Po telefonické domluvě zvládneme i termín na poslední chvíli.",
  },
  {
    q: "Provádíte i emise, nebo musím jinam?",
    a: "Měření emisí provádíme společně s technickou kontrolou na jednom místě. Přijedete jednou a odjedete s kompletně vyřízenou STK i emisemi.",
  },
  {
    q: "Kontrolujete i vozidla na LPG nebo CNG?",
    a: "Ano. Stačí s sebou přivézt doklady k plynovému zařízení a platnou revizi. Vše ostatní proběhne stejně jako u běžného vozidla.",
  },
];
