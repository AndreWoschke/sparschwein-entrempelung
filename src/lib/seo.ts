// SEO Configuration and Utilities for Sparschwein Entrümpelung
// Stand: Januar 2026

export const COMPANY_INFO = {
  name: "Sparschwein Entrümpelung",
  legalName: "Sparschwein Entrümpelung – Stefan Wagner und Andre Woschke",
  owner: {
    name: "Stefan Wagner und Andre Woschke",
    role: "Inhaber",
    since: 2015,
  },
  phone: "01579 2639408",
  phoneLink: "+4915792639408",
  phoneFormatted: "+49 1579 2639408",
  email: "info@sparschwein-entruempelung.de",
  address: {
    street: "Karl-Marx-Straße 9",
    city: "Brieselang",
    postalCode: "14656",
    country: "Deutschland",
    region: "Brandenburg",
  },
  geo: {
    latitude: 52.5833,
    longitude: 13.0116,
  },
  whatsapp: "https://wa.me/4915792639408",
  website: "https://sparschwein-entruempelung.de",
  googleMapsUrl: "https://www.google.com/maps/place/Sparschwein-Entr%C3%BCmpelung",
  googleReviewUrl: "https://maps.app.goo.gl/dHbNrc4tNroC8pwS7",
  foundedYear: 2015,
  experience: "Seit 2015",
  totalJobs: "500+",
  responseTime: "Ø 30 Min.",
  vehicles: "2-3",
  googleRating: 5.0,
  googleReviewCount: 6,
  isInsured: true,
  isDirectProvider: true,
  hasOwnStaff: true,
  hasOwnVehicles: true,
  noIntermediaries: true,
  openingHours: {
    monday: { open: "08:00", close: "18:00" },
    tuesday: { open: "08:00", close: "18:00" },
    wednesday: { open: "08:00", close: "18:00" },
    thursday: { open: "08:00", close: "18:00" },
    friday: { open: "08:00", close: "18:00" },
    saturday: null,
    sunday: null,
  },
  openingHoursText: "Mo–Fr: 08:00–18:00 Uhr",
  lastUpdated: "2026-01-24",
  pricesValidUntil: "2026-03-31",
};

// SEO 2026: Leistungsseiten OHNE Ort im Slug
export const SERVICES = [
  {
    id: "wohnungsentruempelung",
    title: "Wohnungsentrümpelung",
    shortTitle: "Wohnung",
    description: "Professionelle Wohnungsentrümpelung mit Festpreis. Besenreine Übergabe garantiert.",
    longDescription: "Komplette Wohnungsentrümpelung von der 1-Zimmer-Wohnung bis zur großen Altbauwohnung. Wir übernehmen alles: Möbel abbauen, Hausrat entsorgen, besenrein übergeben.",
    icon: "Home",
    slug: "/wohnungsentruempelung",
    metaTitle: "Wohnungsentrümpelung Havelland ab 299 € | Festpreis & besenrein",
    metaDescription: "Wohnungsentrümpelung im Havelland zum Festpreis ab 299 €: 1–4-Zimmer-Wohnung inkl. Möbel, Hausrat & Elektro – besenreine Übergabe, Termin in 24–48 h. ☎ 01579 2639408",
  },
  {
    id: "hausentruempelung",
    title: "Hausentrümpelung",
    shortTitle: "Haus",
    description: "Komplette Hausentrümpelung inkl. aller Räume, Keller und Dachboden.",
    longDescription: "Hausentrümpelung komplett: Alle Etagen, Keller, Dachboden, Garage. Perfekt bei Hausverkauf, Erbschaft oder Umzug. Wir kümmern uns um alles.",
    icon: "Building2",
    slug: "/hausentruempelung",
    metaTitle: "Hausentrümpelung | Komplett-Service inkl. Keller & Dachboden",
    metaDescription: "Hausentrümpelung zum Festpreis. Komplettes Haus inkl. Keller, Dachboden, Garage. Besenreine Übergabe garantiert. ☎ 01579 2639408",
  },
  {
    id: "kellerentruempelung",
    title: "Kellerentrümpelung",
    shortTitle: "Keller",
    description: "Keller entrümpeln lassen – schnell, sauber und zu fairen Preisen.",
    longDescription: "Kellerentrümpelung schnell und unkompliziert. Alte Möbel, Kartons, Sperrmüll – wir räumen alles aus und entsorgen fachgerecht.",
    icon: "Warehouse",
    slug: "/kellerentruempelung",
    metaTitle: "Kellerentrümpelung | Schnell & günstig entrümpeln",
    metaDescription: "Keller entrümpeln lassen zum Festpreis. Schnelle Termine, fachgerechte Entsorgung, faire Preise. ☎ 01579 2639408",
  },
  {
    id: "dachbodenentruempelung",
    title: "Dachbodenentrümpelung",
    shortTitle: "Dachboden",
    description: "Dachboden professionell entrümpeln – auch bei schwierigen Zugängen.",
    longDescription: "Dachbodenentrümpelung auch bei engen Treppen und schwierigen Zugängen. Wir tragen alles runter und entsorgen fachgerecht.",
    icon: "Layers",
    slug: "/dachbodenentruempelung",
    metaTitle: "Dachbodenentrümpelung | Auch bei schwierigen Zugängen",
    metaDescription: "Dachboden entrümpeln lassen – auch enge Treppen. Festpreis nach Besichtigung, besenreine Übergabe. ☎ 01579 2639408",
  },
  {
    id: "haushaltsaufloesung",
    title: "Haushaltsauflösung",
    shortTitle: "Haushalt",
    description: "Komplette Haushaltsauflösung mit Verwertung brauchbarer Gegenstände.",
    longDescription: "Haushaltsauflösung bei Umzug, Todesfall oder Pflegeheim. Wir verwerten Brauchbares, entsorgen den Rest und übergeben besenrein.",
    icon: "Package",
    slug: "/haushaltsaufloesung",
    metaTitle: "Haushaltsauflösung ab 299 € | Festpreis · Termin in 24 h",
    metaDescription: "Haushaltsauflösung zum Festpreis ab 299 €. Verwertung, fachgerechte Entsorgung, besenreine Übergabe – Termin meist in 24 h. ☎ 01579 2639408",
  },
  {
    id: "firmen-gewerbeentruempelung",
    title: "Firmen- & Gewerbeentrümpelung",
    shortTitle: "Gewerbe",
    description: "Büro- und Gewerbeentrümpelung für Unternehmen. Diskret und effizient.",
    longDescription: "Gewerbeentrümpelung für Büros, Lager, Praxen, Geschäfte. Diskret, schnell und außerhalb der Geschäftszeiten möglich.",
    icon: "Building",
    slug: "/firmen-gewerbeentruempelung",
    metaTitle: "Gewerbeentrümpelung | Büro, Lager, Praxis entrümpeln",
    metaDescription: "Firmen- und Gewerbeentrümpelung. Diskret, effizient, auch außerhalb der Geschäftszeiten. ☎ 01579 2639408",
  },
  {
    id: "schrottabholung",
    title: "Schrottabholung",
    shortTitle: "Schrott",
    description: "Kostenlose Schrottabholung für Altmetall, Elektroschrott und mehr.",
    longDescription: "Wir holen Ihren Schrott kostenlos ab: Altmetall, Elektroschrott, Haushaltsgeräte, Fahrräder, Heizkörper und mehr. Schnelle Termine, umweltgerechte Entsorgung.",
    icon: "Recycle",
    slug: "/schrottabholung",
    metaTitle: "Schrottabholung | Kostenlos Altmetall & Elektroschrott abholen",
    metaDescription: "Kostenlose Schrottabholung im Havelland. Altmetall, Elektroschrott, Haushaltsgeräte abholen lassen. Schnelle Termine. ☎ 01579 2639408",
  },
  {
    id: "containerdienst",
    title: "Containerdienst Brieselang & Havelland",
    shortTitle: "Container",
    description: "Container für Bauschutt, Sperrmüll, Altholz, Erdaushub – schnell geliefert.",
    longDescription: "Containerdienst im Havelland: Bauschutt-, Sperrmüll-, Altholz-, Erdaushub- und Bodenaushub-Container in den gängigen Größen. Schnelle Lieferung, faire Festpreise inkl. Entsorgung.",
    icon: "Truck",
    slug: "/containerdienst-brieselang",
    metaTitle: "Containerdienst Brieselang ab 149 € | Bauschutt, Sperrmüll, Altholz",
    metaDescription: "Containerdienst Brieselang & Havelland: Bauschutt-, Sperrmüll-, Altholz- und Erdaushub-Container ab 149 €. Lieferung in 24 h. ☎ 01579 2639408",
  },
];

// SEO 2026: Ortsseiten mit entruempelung- Präfix
export const REGIONS = [
  {
    id: "brieselang",
    name: "Brieselang",
    slug: "/entruempelung-brieselang",
    isHeadquarters: true,
    description: "Unser Hauptstandort – schnelle Verfügbarkeit garantiert.",
    longDescription: "Als Ihr direkter Nachbar in Brieselang sind wir in wenigen Minuten bei Ihnen. Keine langen Anfahrtswege, keine Wartezeiten.",
    metaTitle: "Entrümpelung Brieselang ab 299 € · Festpreis · Termin in 24 h",
    metaDescription: "Entrümpelung Brieselang vom Anbieter vor Ort: Festpreis ab 299 €, eigenes Team, Termin meist in 24 h, besenreine Übergabe. ☎ 01579 2639408",
    distance: "Hauptstandort",
    postalCodes: ["14656"],
  },
  {
    id: "falkensee",
    name: "Falkensee",
    slug: "/entruempelung-falkensee",
    isHeadquarters: false,
    description: "Nur wenige Minuten entfernt – kurze Anfahrtswege.",
    longDescription: "Falkensee ist nur 10 Minuten von unserem Standort entfernt. Regelmäßige Einsätze in allen Ortsteilen.",
    metaTitle: "Entrümpelung Falkensee ab 299 € · Festpreis · Termin in 24 h",
    metaDescription: "Entrümpelung Falkensee zum Festpreis ab 299 €. 10 Min. Anfahrt aus Brieselang, kostenlose Besichtigung, besenreine Übergabe. ☎ 01579 2639408",
    distance: "ca. 10 Min.",
    postalCodes: ["14612"],
  },
  {
    id: "dallgow-doeberitz",
    name: "Dallgow-Döberitz",
    slug: "/entruempelung-dallgow-doeberitz",
    isHeadquarters: false,
    description: "Direkter Nachbar von Brieselang – immer schnell vor Ort.",
    longDescription: "Dallgow-Döberitz grenzt direkt an Brieselang. Wir sind in wenigen Minuten bei Ihnen.",
    metaTitle: "Entrümpelung Dallgow-Döberitz ab 299 € · Termin in 24 h",
    metaDescription: "Entrümpelung Dallgow-Döberitz vom Nachbarn aus Brieselang: Festpreis ab 299 €, 5 Min. Anfahrt, besenreine Übergabe. ☎ 01579 2639408",
    distance: "ca. 5 Min.",
    postalCodes: ["14624"],
  },
  {
    id: "nauen",
    name: "Nauen",
    slug: "/entruempelung-nauen",
    isHeadquarters: false,
    description: "Kreisstadt Havelland – regelmäßige Einsätze.",
    longDescription: "Nauen als Kreisstadt des Havellands gehört zu unseren regelmäßigen Einsatzorten. Schnelle Terminvergabe möglich.",
    metaTitle: "Entrümpelung Nauen ab 299 € · Festpreis · Termin in 24 h",
    metaDescription: "Entrümpelung Nauen zum Festpreis ab 299 €. Kreisstadt Havelland – schnelle Termine, eigenes Team, besenreine Übergabe. ☎ 01579 2639408",
    distance: "ca. 15 Min.",
    postalCodes: ["14641"],
  },
  {
    id: "wustermark",
    name: "Wustermark",
    slug: "/entruempelung-wustermark",
    isHeadquarters: false,
    description: "Inklusive aller Ortsteile wie Elstal und Priort.",
    longDescription: "Wustermark mit allen Ortsteilen (Elstal, Priort, Buchow-Karpzow) liegt direkt in unserem Kerngebiet.",
    metaTitle: "Entrümpelung Wustermark, Elstal & Priort ab 299 € · 24 h Termin",
    metaDescription: "Entrümpelung Wustermark inkl. Elstal, Priort & Buchow-Karpzow: Festpreis ab 299 €, eigenes Team, besenreine Übergabe. ☎ 01579 2639408",
    distance: "ca. 10 Min.",
    postalCodes: ["14641"],
  },
  {
    id: "staaken",
    name: "Staaken",
    slug: "/entruempelung-staaken",
    isHeadquarters: false,
    description: "Berlin-Spandau direkt an unserer Türschwelle – kurze Anfahrt.",
    longDescription: "Staaken grenzt unmittelbar an Dallgow-Döberitz und ist von unserem Standort Brieselang in rund 15 Minuten erreichbar. Wir räumen hier regelmäßig Wohnungen, Keller und Häuser – sowohl im Berliner als auch im Brandenburger Teil.",
    metaTitle: "Entrümpelung Staaken (Berlin-Spandau) ab 299 € · Termin in 24 h",
    metaDescription: "Entrümpelung Staaken vom Anbieter direkt nebenan: Festpreis ab 299 €, 15 Min. Anfahrt aus Brieselang, eigenes Team, besenreine Übergabe. ☎ 01579 2639408",
    distance: "ca. 15 Min.",
    postalCodes: ["13591", "13593"],
  },
  {
    id: "rathenow",
    name: "Rathenow",
    slug: "/entruempelung-rathenow",
    isHeadquarters: false,
    description: "Zweitgrößte Stadt im Havelland – wir sind regelmäßig vor Ort.",
    longDescription: "Rathenow als bedeutende Stadt im westlichen Havelland gehört zu unserem festen Einsatzgebiet. Termine planen wir effizient mit umliegenden Aufträgen.",
    metaTitle: "Entrümpelung Rathenow ab 299 € · Festpreis · Termin in 24 h",
    metaDescription: "Entrümpelung Rathenow zum Festpreis ab 299 €. Wohnung, Haus, Keller – eigenes Team, besenreine Übergabe. ☎ 01579 2639408",
    distance: "ca. 35 Min.",
    postalCodes: ["14712"],
  },
  {
    id: "premnitz",
    name: "Premnitz",
    slug: "/entruempelung-premnitz",
    isHeadquarters: false,
    description: "Industriestandort an der Havel – regelmäßige Einsätze.",
    longDescription: "Premnitz im westlichen Havelland erreichen wir auf direkter Route über Rathenow. Wohnungs- und Haushaltsauflösungen sind hier unsere häufigsten Aufträge.",
    metaTitle: "Entrümpelung Premnitz ab 299 € · Festpreis · Termin in 24 h",
    metaDescription: "Entrümpelung Premnitz zum Festpreis ab 299 €. Schnelle Termine, eigenes Team, fachgerechte Entsorgung, besenreine Übergabe. ☎ 01579 2639408",
    distance: "ca. 40 Min.",
    postalCodes: ["14727"],
  },
  {
    id: "friesack",
    name: "Friesack",
    slug: "/entruempelung-friesack",
    isHeadquarters: false,
    description: "Nördliches Havelland – wir kommen auch ins ländliche Umland.",
    longDescription: "Friesack im nördlichen Havelland gehört zu unserem festen Einsatzgebiet. Höfe, Scheunen und Wohnhäuser räumen wir routiniert.",
    metaTitle: "Entrümpelung Friesack ab 299 € · Festpreis · Termin in 24 h",
    metaDescription: "Entrümpelung Friesack zum Festpreis ab 299 €. Auch Höfe und ländliche Anwesen, eigenes Team, besenreine Übergabe. ☎ 01579 2639408",
    distance: "ca. 30 Min.",
    postalCodes: ["14662"],
  },
  {
    id: "schoenwalde-glien",
    name: "Schönwalde-Glien",
    slug: "/entruempelung-schoenwalde-glien",
    isHeadquarters: false,
    description: "Direkter Nachbar im Norden – kurze Anfahrtswege.",
    longDescription: "Schönwalde-Glien grenzt nördlich an unser Einsatzgebiet rund um Brieselang. Wir sind in wenigen Minuten in allen Ortsteilen vor Ort.",
    metaTitle: "Entrümpelung Schönwalde-Glien ab 299 € · Termin in 24 h",
    metaDescription: "Entrümpelung Schönwalde-Glien vom Nachbarn aus Brieselang: Festpreis ab 299 €, eigenes Team, besenreine Übergabe. ☎ 01579 2639408",
    distance: "ca. 15 Min.",
    postalCodes: ["14621"],
  },
  {
    id: "ketzin",
    name: "Ketzin/Havel",
    slug: "/entruempelung-ketzin",
    isHeadquarters: false,
    description: "Havelstadt im südlichen Havelland – regelmäßige Einsätze.",
    longDescription: "Ketzin/Havel mit seinen Ortsteilen Etzin, Falkenrehde, Tremmen und Zachow erreichen wir aus Brieselang über die L92 in rund 25 Minuten.",
    metaTitle: "Entrümpelung Ketzin/Havel ab 299 € · Festpreis · Termin in 24 h",
    metaDescription: "Entrümpelung Ketzin/Havel inkl. Etzin, Tremmen & Zachow zum Festpreis ab 299 €, besenreine Übergabe. ☎ 01579 2639408",
    distance: "ca. 25 Min.",
    postalCodes: ["14669"],
  },
  {
    id: "paulinenaue",
    name: "Paulinenaue",
    slug: "/entruempelung-paulinenaue",
    isHeadquarters: false,
    description: "Ländliches Havelland – kurze Anfahrt über die B5.",
    longDescription: "Paulinenaue im Westhavelland gehört zu unserem festen Einsatzgebiet. Hofstellen, Wohnhäuser und Nebengebäude räumen wir routiniert.",
    metaTitle: "Entrümpelung Paulinenaue ab 299 € · Festpreis · Termin in 24 h",
    metaDescription: "Entrümpelung Paulinenaue zum Festpreis ab 299 €. Auch Höfe und ländliche Anwesen, besenreine Übergabe. ☎ 01579 2639408",
    distance: "ca. 20 Min.",
    postalCodes: ["14641"],
  },
  {
    id: "hennigsdorf",
    name: "Hennigsdorf",
    slug: "/entruempelung-hennigsdorf",
    isHeadquarters: false,
    description: "Stadt im Landkreis Oberhavel – kurze Anfahrt aus Brieselang.",
    longDescription: "Hennigsdorf mit rund 26.000 Einwohnern erreichen wir aus Brieselang in etwa 25 Minuten. Wohnungs- und Haushaltsauflösungen führen wir hier regelmäßig durch.",
    metaTitle: "Entrümpelung Hennigsdorf ab 299 € · Festpreis · Termin in 24 h",
    metaDescription: "Entrümpelung Hennigsdorf zum Festpreis ab 299 €. Wohnung, Haus, Keller – eigenes Team, besenreine Übergabe. ☎ 01579 2639408",
    distance: "ca. 25 Min.",
    postalCodes: ["16761"],
  },
  {
    id: "velten",
    name: "Velten",
    slug: "/entruempelung-velten",
    isHeadquarters: false,
    description: "Ofenstadt im Oberhavel – regelmäßige Einsätze.",
    longDescription: "Velten im Landkreis Oberhavel erreichen wir aus Brieselang in rund 28 Minuten. Die Stadt mit ihren Gründerzeit- und Plattenbauquartieren bringt vielfältige Aufträge mit sich.",
    metaTitle: "Entrümpelung Velten ab 299 € · Festpreis · Termin in 24 h",
    metaDescription: "Entrümpelung Velten zum Festpreis ab 299 €. Wohnung, Haus, Keller, Dachboden – besenreine Übergabe. ☎ 01579 2639408",
    distance: "ca. 28 Min.",
    postalCodes: ["16727"],
  },
  {
    id: "oranienburg",
    name: "Oranienburg",
    slug: "/entruempelung-oranienburg",
    isHeadquarters: false,
    description: "Kreisstadt Oberhavel – wir sind regelmäßig vor Ort.",
    longDescription: "Oranienburg als Kreisstadt des Landkreises Oberhavel mit rund 45.000 Einwohnern erreichen wir aus Brieselang in etwa 30 Minuten über die A10/B96.",
    metaTitle: "Entrümpelung Oranienburg ab 299 € · Festpreis · Termin in 24 h",
    metaDescription: "Entrümpelung Oranienburg zum Festpreis ab 299 €. Wohnungs- und Haushaltsauflösung, eigenes Team, besenreine Übergabe. ☎ 01579 2639408",
    distance: "ca. 30 Min.",
    postalCodes: ["16515"],
  },
  {
    id: "werder",
    name: "Werder (Havel)",
    slug: "/entruempelung-werder",
    isHeadquarters: false,
    description: "Blütenstadt an der Havel – regelmäßige Einsätze.",
    longDescription: "Werder (Havel) im Landkreis Potsdam-Mittelmark erreichen wir aus Brieselang in rund 25 Minuten. Haushaltsauflösungen in Einfamilienhäusern sind hier unser häufigster Auftrag.",
    metaTitle: "Entrümpelung Werder (Havel) ab 299 € · Festpreis · 24 h Termin",
    metaDescription: "Entrümpelung Werder (Havel) zum Festpreis ab 299 €. Haushaltsauflösung, Hausentrümpelung, besenreine Übergabe. ☎ 01579 2639408",
    distance: "ca. 25 Min.",
    postalCodes: ["14542"],
  },
  {
    id: "havelland",
    name: "Landkreis Havelland",
    slug: "/entruempelung-havelland",
    isHeadquarters: false,
    description: "Der gesamte Landkreis ist unser Einsatzgebiet.",
    longDescription: "Im gesamten Landkreis Havelland sind wir für Sie im Einsatz. Von Rathenow bis Spandau, von Nauen bis Ketzin.",
    metaTitle: "Entrümpelung Havelland ab 299 € · Festpreis · Termin in 24 h",
    metaDescription: "Entrümpelung im Landkreis Havelland zum Festpreis ab 299 €. Eigenes Team, schnelle Termine, besenreine Übergabe. ☎ 01579 2639408",
    distance: "bis 50 km",
    postalCodes: [],
  },
  {
    id: "brandenburg-havel",
    name: "Brandenburg an der Havel",
    slug: "/entruempelung-brandenburg-havel",
    isHeadquarters: false,
    description: "Kreisfreie Stadt an der Havel – regelmäßige Einsätze.",
    longDescription: "Brandenburg an der Havel erreichen wir aus Brieselang in rund 40 Minuten. In der drittgrößten Stadt Brandenburgs führen wir regelmäßig Wohnungs- und Haushaltsauflösungen durch – von Plattenbauwohnungen am Quenz bis zu Altbauten in der Neustadt.",
    metaTitle: "Entrümpelung Brandenburg an der Havel ab 299 € · 24 h Termin",
    metaDescription: "Entrümpelung Brandenburg an der Havel zum Festpreis ab 299 €. Wohnung, Haus, Keller – eigenes Team, besenreine Übergabe. ☎ 01579 2639408",
    distance: "ca. 40 Min.",
    postalCodes: ["14770", "14772", "14774", "14776"],
  },
];


export const PRICING = [
  {
    id: "small",
    name: "Klein",
    volume: "1m³",
    price: 99,
    description: "1–2 Möbelstücke oder 15–20 Kartons",
    features: [
      "1 erfahrener Mitarbeiter",
      "Kleiner Transporter",
      "Fachgerechte Entsorgung",
      "Besenreine Übergabe",
    ],
    popular: false,
  },
  {
    id: "medium",
    name: "Mittel",
    volume: "5m³",
    price: 399,
    description: "1 Zimmer komplett oder größere Kellerbereiche",
    features: [
      "2 erfahrene Mitarbeiter",
      "Mittelgroßer Transporter",
      "Fachgerechte Entsorgung",
      "Besenreine Übergabe",
      "Demontage inklusive",
    ],
    popular: true,
  },
  {
    id: "large",
    name: "Groß",
    volume: "20m³",
    price: 899,
    description: "Komplette Wohnung oder mehrere Räume",
    features: [
      "2+ erfahrene Mitarbeiter",
      "Großer LKW",
      "Fachgerechte Entsorgung",
      "Besenreine Übergabe",
      "Demontage inklusive",
      "Verwertung von Wertsachen",
    ],
    popular: false,
  },
];

export const REVIEWS = [
  {
    id: 1,
    name: "Martin Kraftseil",
    rating: 5,
    text: "Sehr zuverlässig und pünktlich. Die Jungs haben alles schnell und sauber erledigt. Preis war fair und transparent. Kann ich nur empfehlen!",
    date: "November 2025",
    dateISO: "2025-11-15",
    location: "Brieselang",
  },
  {
    id: 2,
    name: "Sanin Nino",
    rating: 5,
    text: "Top Service! Schnelle Terminvergabe und die Entrümpelung wurde professionell durchgeführt. Sehr freundliches Team!",
    date: "Oktober 2025",
    dateISO: "2025-10-20",
    location: "Falkensee",
  },
  {
    id: 3,
    name: "Tina Profft",
    rating: 5,
    text: "Wir waren sehr zufrieden. Die Wohnung wurde besenrein übergeben. Preis-Leistung stimmt absolut!",
    date: "September 2025",
    dateISO: "2025-09-08",
    location: "Dallgow-Döberitz",
  },
  {
    id: 4,
    name: "Frank Marks",
    rating: 5,
    text: "Sehr nettes Team, haben unseren Keller in kürzester Zeit leergeräumt. Alles wurde ordentlich entsorgt. Danke!",
    date: "August 2025",
    dateISO: "2025-08-12",
    location: "Nauen",
  },
  {
    id: 5,
    name: "Alicia Marschall",
    rating: 5,
    text: "Absolut empfehlenswert! Schnell, sauber und günstig. Der Festpreis wurde eingehalten, keine versteckten Kosten.",
    date: "Juli 2025",
    dateISO: "2025-07-25",
    location: "Wustermark",
  },
  {
    id: 6,
    name: "Laura Stein",
    rating: 5,
    text: "Beste Entrümpelung die ich je hatte! Super freundlich und sehr gründlich. Würde jederzeit wieder buchen.",
    date: "Juni 2025",
    dateISO: "2025-06-30",
    location: "Brieselang",
  },
];

// FAQ Items für Leistungsseiten
export const FAQ_ITEMS = [
  {
    question: "Wie setzt sich der Preis für eine Entrümpelung zusammen?",
    answer: "Der Preis richtet sich nach dem Volumen des zu entsorgenden Materials, der Etage, den Laufwegen und eventuell notwendigen Demontagearbeiten. Nach einer kostenlosen Besichtigung erhalten Sie einen verbindlichen Festpreis ohne versteckte Kosten.",
  },
  {
    question: "Muss ich während der Entrümpelung vor Ort sein?",
    answer: "Nein, das ist nicht zwingend erforderlich. Nach der Besichtigung und Auftragserteilung können Sie uns auch einen Schlüssel übergeben. Wir arbeiten zuverlässig und vertrauenswürdig.",
  },
  {
    question: "Wie schnell können Sie einen Termin anbieten?",
    answer: "In der Regel können wir innerhalb von 24-48 Stunden einen Besichtigungstermin anbieten. Bei dringenden Fällen sind auch kurzfristigere Termine möglich.",
  },
  {
    question: "Was passiert mit brauchbaren Gegenständen?",
    answer: "Gut erhaltene Möbel und Gegenstände werden nach Möglichkeit weiterverwertet oder gespendet. Dies kann den Preis der Entrümpelung reduzieren.",
  },
  {
    question: "Sind Sie versichert?",
    answer: "Ja, wir sind vollumfänglich versichert. Im unwahrscheinlichen Fall eines Schadens sind Sie bestens abgesichert.",
  },
  {
    question: "Entsorgen Sie auch Sondermüll?",
    answer: "Ja, wir entsorgen auch Sondermüll wie Farben, Lacke, Elektrogeräte und mehr – alles fachgerecht und umweltfreundlich gemäß den gesetzlichen Vorschriften.",
  },
  {
    question: "Wie groß ist Ihr Einsatzgebiet?",
    answer: "Wir sind im gesamten Landkreis Havelland tätig, inklusive Brieselang, Falkensee, Dallgow-Döberitz, Nauen, Wustermark und umliegenden Gemeinden. Darüber hinaus sind wir im Umkreis von ca. 50 km rund um Brieselang im Einsatz.",
  },
  {
    question: "Bieten Sie auch Entrümpelungen am Wochenende an?",
    answer: "Ja, nach Absprache sind auch Termine am Wochenende möglich. Kontaktieren Sie uns einfach für eine individuelle Terminvereinbarung.",
  },
];

// Einsatzgebiet-Liste für Leistungsseiten (OHNE Ortsnamen im Fließtext)
export const SERVICE_AREAS_SUMMARY = {
  mainAreas: ["Brieselang", "Falkensee", "Dallgow-Döberitz", "Nauen", "Wustermark", "Potsdam", "Berlin-Spandau"],
  radiusText: "Darüber hinaus sind wir im Umkreis von ca. 50 km rund um Brieselang im Einsatz.",
};

// Pro-Ort Daten: Geo-Koordinaten + lokalisierte FAQs (Local SEO 2026)
export const LOCATION_DATA: Record<string, {
  geo: { latitude: number; longitude: number };
  postalCodes: string[];
  faqs: { question: string; answer: string }[];
}> = {
  brieselang: {
    geo: { latitude: 52.5833, longitude: 13.0116 },
    postalCodes: ["14656"],
    faqs: [
      { question: "Wie schnell sind Sie in Brieselang vor Ort?", answer: "Da Brieselang unser Hauptstandort ist, sind wir oft innerhalb weniger Minuten bei Ihnen. Besichtigungstermine bieten wir häufig noch am selben Tag an." },
      { question: "Entrümpeln Sie auch in Bredow, Zeestow und Siedlung Bredower Forst?", answer: "Ja, alle Ortsteile von Brieselang gehören zu unserem Heimatgebiet – Bredow, Zeestow, Siedlung Bredower Forst und der Ortskern werden täglich angefahren." },
      { question: "Was kostet eine Wohnungsentrümpelung in Brieselang?", answer: "Die Preise starten ab 299 €. Den exakten Festpreis nennen wir Ihnen nach einer kostenlosen Besichtigung – ohne versteckte Kosten." },
      { question: "Bekommen Brieselanger einen Lokalbonus?", answer: "Wir berechnen keine Anfahrt im Ort. Da unsere Fahrzeuge in Brieselang stationiert sind, profitieren Sie von minimalen Logistikkosten." },
    ],
  },
  falkensee: {
    geo: { latitude: 52.5614, longitude: 13.0925 },
    postalCodes: ["14612"],
    faqs: [
      { question: "Wie weit ist es von Brieselang nach Falkensee?", answer: "Die Anfahrt dauert nur etwa 10 Minuten. Wir sind in Falkensee nahezu täglich im Einsatz – auch in Falkenhöh, Seegefeld und Finkenkrug." },
      { question: "Entrümpeln Sie auch Mehrfamilienhäuser in der Falkenseer Innenstadt?", answer: "Ja, von der Mietwohnung im Mehrfamilienhaus bis zum Einfamilienhaus mit Keller und Dachboden – wir übernehmen alle Objekttypen in Falkensee." },
      { question: "Können Sie kurzfristige Termine in Falkensee anbieten?", answer: "Aufgrund der kurzen Anfahrt sind kurzfristige Termine in Falkensee fast immer möglich – oft sogar noch in derselben Woche." },
      { question: "Räumen Sie auch Kellerabteile in Falkensee?", answer: "Ja, Kellerentrümpelungen in Mietshäusern gehören zu unseren häufigsten Aufträgen in Falkensee. Auch einzelne Kellerräume übernehmen wir." },
    ],
  },
  "dallgow-doeberitz": {
    geo: { latitude: 52.5333, longitude: 13.0833 },
    postalCodes: ["14624"],
    faqs: [
      { question: "Wie lange dauert die Anfahrt nach Dallgow-Döberitz?", answer: "Dallgow-Döberitz grenzt direkt an Brieselang – wir sind in rund 5 Minuten bei Ihnen vor Ort." },
      { question: "Räumen Sie auch Gewerbeflächen im Havelpark-Areal?", answer: "Ja, Gewerbeentrümpelungen im Bereich Havelpark und in den Gewerbegebieten Dallgow-Döberitz übernehmen wir regelmäßig." },
      { question: "Gibt es Aufpreis für die Anfahrt?", answer: "Nein, da Dallgow-Döberitz unmittelbar zu unserem Kerngebiet gehört, fallen keine Anfahrtskosten an." },
      { question: "Können Sie auch Garagen und Gartenlauben in Dallgow räumen?", answer: "Ja, Garagen-, Gartenlauben- und Schuppenräumungen sind Standard – auch in den großzügigen Grundstücken Richtung Seeburg und Rohrbeck." },
    ],
  },
  nauen: {
    geo: { latitude: 52.6058, longitude: 12.8736 },
    postalCodes: ["14641"],
    faqs: [
      { question: "Wie weit ist Nauen von Brieselang entfernt?", answer: "Die Fahrzeit beträgt rund 15 Minuten über die B5. Wir sind in Nauen regelmäßig im Einsatz – auch in den Ortsteilen Ribbeck, Wachow und Markee." },
      { question: "Entrümpeln Sie auch landwirtschaftliche Gebäude im Raum Nauen?", answer: "Ja, Räumungen von Scheunen, Stallungen und ländlichen Hofstellen gehören in den Nauener Ortsteilen zum Tagesgeschäft." },
      { question: "Was kostet eine Hausentrümpelung in Nauen?", answer: "Hausentrümpelungen starten ab 799 € (Festpreis nach Besichtigung). Die Anfahrt nach Nauen berechnen wir nicht extra." },
      { question: "Wie schnell bekomme ich einen Termin in Nauen?", answer: "Besichtigungstermine in Nauen vergeben wir in der Regel innerhalb von 24–48 Stunden." },
    ],
  },
  wustermark: {
    geo: { latitude: 52.5483, longitude: 12.9700 },
    postalCodes: ["14641"],
    faqs: [
      { question: "Sind Elstal, Priort und Buchow-Karpzow im Einsatzgebiet?", answer: "Ja, alle Ortsteile von Wustermark – Elstal, Priort, Buchow-Karpzow und Hoppenrade – werden ohne Aufpreis angefahren." },
      { question: "Wie lange dauert die Anfahrt nach Wustermark?", answer: "Aus Brieselang erreichen wir Wustermark über die B5 in etwa 10 Minuten." },
      { question: "Entrümpeln Sie auch in der Nähe des Designer Outlet Berlin in Elstal?", answer: "Ja, Wohn- und Gewerberäumungen rund um Elstal und das Olympische Dorf gehören zu unseren regelmäßigen Aufträgen." },
      { question: "Räumen Sie auch Scheunen und Schuppen in Wustermark?", answer: "Ja, in den dörflichen Ortsteilen sind Scheunen-, Schuppen- und Hofentrümpelungen Standard. Wir bringen passende Fahrzeuge mit." },
    ],
  },
  rathenow: {
    geo: { latitude: 52.6047, longitude: 12.3367 },
    postalCodes: ["14712"],
    faqs: [
      { question: "Kommen Sie auch nach Rathenow?", answer: "Ja, Rathenow gehört zu unserem festen Einsatzgebiet im westlichen Havelland – Anfahrt rund 35 Minuten, ohne Aufpreis." },
      { question: "Berechnen Sie für Rathenow eine Anfahrtspauschale?", answer: "Nein. Wir kombinieren Aufträge in Rathenow effizient mit Einsätzen im westlichen Havelland, sodass keine Zusatzkosten entstehen." },
      { question: "Entrümpeln Sie auch Plattenbauwohnungen in Rathenow?", answer: "Ja, Wohnungsentrümpelungen in den großen Mehrfamilienhäusern aus DDR-Zeit gehören zu unseren häufigsten Aufträgen in Rathenow." },
      { question: "Welche Ortsteile bedienen Sie rund um Rathenow?", answer: "Wir betreuen auch die umliegenden Gemeinden Premnitz, Milower Land und Stechow-Ferchesar." },
    ],
  },
  premnitz: {
    geo: { latitude: 52.5333, longitude: 12.3500 },
    postalCodes: ["14727"],
    faqs: [
      { question: "Ist Premnitz im Einsatzgebiet?", answer: "Ja, Premnitz erreichen wir aus Brieselang in rund 40 Minuten über Rathenow. Die Anfahrt berechnen wir nicht extra." },
      { question: "Räumen Sie auch Wohnblöcke in Premnitz?", answer: "Ja, Keller- und Wohnungsentrümpelungen in den Mehrfamilienhäusern entlang der Hauptverkehrsachsen sind hier Standard." },
      { question: "Wie schnell bekomme ich einen Termin in Premnitz?", answer: "Termine in Premnitz koordinieren wir mit Aufträgen in Rathenow – in der Regel innerhalb von 3–7 Tagen." },
      { question: "Können Sie auch Gartenlauben am Havelufer räumen?", answer: "Ja, Räumungen von Gartenhäusern, Lauben und Wochenendgrundstücken am Havelufer übernehmen wir gerne." },
    ],
  },
  friesack: {
    geo: { latitude: 52.7333, longitude: 12.5833 },
    postalCodes: ["14662"],
    faqs: [
      { question: "Bedienen Sie auch das nördliche Havelland?", answer: "Ja, Friesack und Umgebung gehören zu unserem festen Einsatzgebiet – Anfahrt rund 30 Minuten über die B5." },
      { question: "Räumen Sie auch alte Höfe und Scheunen?", answer: "Ja, gerade in Friesack und Umgebung gehören Hof-, Scheunen- und Stallentrümpelungen zum Tagesgeschäft. Wir bringen entsprechend dimensionierte Fahrzeuge mit." },
      { question: "Welche Nachbarorte bedienen Sie von Friesack aus?", answer: "Wiesenaue, Mühlenberge, Paulinenaue und das nördliche Havelland gehören ebenfalls zu unserem Einsatzgebiet." },
      { question: "Können Sie auch landwirtschaftliche Maschinen entsorgen?", answer: "Ja, alte Werkstattbestände, Maschinen und Sperrgut entsorgen wir fachgerecht über zertifizierte Verwertungsbetriebe." },
    ],
  },
  "schoenwalde-glien": {
    geo: { latitude: 52.6333, longitude: 13.1333 },
    postalCodes: ["14621"],
    faqs: [
      { question: "Wie schnell sind Sie in Schönwalde-Glien?", answer: "Schönwalde-Glien grenzt nördlich an unser Kerngebiet – Anfahrt rund 15 Minuten. Spontane Besichtigungen am selben Tag sind oft möglich." },
      { question: "Sind alle Ortsteile im Einsatzgebiet?", answer: "Ja, Schönwalde-Dorf, Schönwalde-Siedlung, Pausin, Paaren im Glien und Wansdorf werden ohne Aufpreis angefahren." },
      { question: "Räumen Sie auch dörfliche Höfe?", answer: "Ja, in den dörflichen Ortsteilen sind Scheunen- und Schuppenräumungen Standard. Auch große Grundstücksräumungen übernehmen wir." },
      { question: "Was kostet eine Haushaltsauflösung in Schönwalde-Glien?", answer: "Haushaltsauflösungen starten je nach Volumen ab 399 € – Festpreis nach kostenloser Besichtigung." },
    ],
  },
  ketzin: {
    geo: { latitude: 52.4814, longitude: 12.8533 },
    postalCodes: ["14669"],
    faqs: [
      { question: "Kommen Sie auch nach Ketzin/Havel?", answer: "Ja, Ketzin/Havel mit den Ortsteilen Etzin, Falkenrehde, Tremmen und Zachow ist Teil unseres Einsatzgebiets – Anfahrt rund 25 Minuten über die L92." },
      { question: "Räumen Sie auch alte Fischerhäuser in der Ketziner Altstadt?", answer: "Ja, gerade in der historischen Altstadt mit ihren engen Zufahrten haben wir Erfahrung mit anspruchsvollen Räumungen." },
      { question: "Berechnen Sie für Ketzin eine Anfahrtspauschale?", answer: "Nein. Termine in Ketzin koordinieren wir mit Wustermark und Werder, sodass keine Zusatzkosten entstehen." },
      { question: "Räumen Sie auch Gartengrundstücke an der Havel?", answer: "Ja, Gartenhäuser, Lauben und Wochenendgrundstücke am Havelufer entrümpeln wir regelmäßig." },
    ],
  },
  paulinenaue: {
    geo: { latitude: 52.6833, longitude: 12.7167 },
    postalCodes: ["14641"],
    faqs: [
      { question: "Ist Paulinenaue im Einsatzgebiet?", answer: "Ja, Paulinenaue erreichen wir aus Brieselang in rund 20 Minuten über die B5 – ohne Anfahrtspauschale." },
      { question: "Räumen Sie auch Hofstellen und Werkstätten?", answer: "Ja, in Paulinenaue sind Hof-, Werkstatt- und Scheunenräumungen häufig. Wir bringen passende Fahrzeuge mit." },
      { question: "Wie schnell ist ein Termin möglich?", answer: "In der Regel innerhalb von 3–5 Tagen. Termine kombinieren wir mit Aufträgen in Friesack und Nauen." },
      { question: "Übernehmen Sie auch Haushaltsauflösungen nach Erbfällen?", answer: "Ja, Haushaltsauflösungen nach Erbschaften oder Pflegeumzügen gehören zu unseren regelmäßigen Aufträgen in Paulinenaue." },
    ],
  },
  hennigsdorf: {
    geo: { latitude: 52.6361, longitude: 13.2008 },
    postalCodes: ["16761"],
    faqs: [
      { question: "Bedienen Sie auch Hennigsdorf im Oberhavel?", answer: "Ja, Hennigsdorf erreichen wir aus Brieselang in etwa 25 Minuten über die L17 – die Anfahrt berechnen wir nicht." },
      { question: "Entrümpeln Sie auch Plattenbauten in Hennigsdorf?", answer: "Ja, Wohnungs- und Kellerentrümpelungen in den großen Wohnblöcken sind Standard. Auch Reihenhäuser und Einfamilienhäuser übernehmen wir." },
      { question: "Wie schnell bekomme ich einen Termin in Hennigsdorf?", answer: "Termine in Hennigsdorf koordinieren wir mit Velten und Schönwalde-Glien – meist innerhalb von 3–5 Tagen." },
      { question: "Räumen Sie auch Garagen und Dachböden?", answer: "Ja, Dachboden- und Garagenräumungen gehören zu unseren häufigen Einsätzen in Hennigsdorf." },
    ],
  },
  velten: {
    geo: { latitude: 52.6833, longitude: 13.1739 },
    postalCodes: ["16727"],
    faqs: [
      { question: "Kommen Sie auch nach Velten?", answer: "Ja, die Ofenstadt Velten erreichen wir aus Brieselang in rund 28 Minuten – ohne Aufpreis für die Anfahrt." },
      { question: "Räumen Sie auch Gründerzeitbauten mit engen Treppen?", answer: "Ja, Räumungen in historischen Gründerzeitbauten und Altbauten gehören in Velten zu unseren typischen Aufträgen." },
      { question: "Entrümpeln Sie auch alte Werkstätten und Schuppen?", answer: "Ja, die Räumung historischer Werkstätten – Velten ist als Ofenstadt bekannt – gehört zu unseren Spezialitäten." },
      { question: "Welche Nachbarorte bedienen Sie von Velten aus?", answer: "Hennigsdorf, Oranienburg und das nördliche Berliner Umland gehören ebenfalls zu unserem Einsatzgebiet." },
    ],
  },
  oranienburg: {
    geo: { latitude: 52.7547, longitude: 13.2425 },
    postalCodes: ["16515"],
    faqs: [
      { question: "Bedienen Sie auch die Kreisstadt Oranienburg?", answer: "Ja, Oranienburg erreichen wir aus Brieselang über die A10/B96 in etwa 30 Minuten – ohne Anfahrtszuschlag." },
      { question: "Entrümpeln Sie auch Gewerbeobjekte in Oranienburg?", answer: "Ja, Gewerbeentrümpelungen kleinerer Betriebe, Praxen und Büros übernehmen wir regelmäßig." },
      { question: "Wie schnell ist ein Termin in Oranienburg möglich?", answer: "In der Regel innerhalb von 3–7 Tagen. Termine kombinieren wir mit Velten und Hennigsdorf." },
      { question: "Räumen Sie auch in den Oranienburger Außenbereichen?", answer: "Ja, auch Sachsenhausen, Lehnitz und die weitläufigen Einfamilienhausgebiete gehören zu unserem Einsatzgebiet." },
    ],
  },
  werder: {
    geo: { latitude: 52.3789, longitude: 12.9342 },
    postalCodes: ["14542"],
    faqs: [
      { question: "Kommen Sie auch nach Werder (Havel)?", answer: "Ja, die Blütenstadt Werder (Havel) erreichen wir aus Brieselang in rund 25 Minuten über die L86 – ohne Aufpreis." },
      { question: "Entrümpeln Sie auch die Ortsteile Glindow, Töplitz und Plötzin?", answer: "Ja, alle Ortsteile von Werder werden ohne Anfahrtspauschale bedient." },
      { question: "Räumen Sie auch Villen und Häuser am Wasser?", answer: "Ja, Haushaltsauflösungen in Einfamilienhäusern und Villen am Havelufer sind unser häufigster Auftrag in Werder." },
      { question: "Übernehmen Sie auch Wochenendgrundstücke und Lauben?", answer: "Ja, Räumungen von Gartenhäusern, Lauben und Wochenendsiedlungen rund um die Havel gehören zum Tagesgeschäft." },
    ],
  },
  havelland: {
    geo: { latitude: 52.6, longitude: 12.9 },
    postalCodes: [],
    faqs: [
      { question: "Sind Sie im gesamten Landkreis Havelland tätig?", answer: "Ja, von Falkensee im Osten bis Rathenow im Westen, von Friesack im Norden bis Ketzin im Süden – das gesamte Havelland ist unser Kerngebiet." },
      { question: "Berechnen Sie Anfahrtskosten innerhalb des Havellands?", answer: "Nein, innerhalb des Landkreises Havelland fallen keine Anfahrtskosten an. Die Festpreise sind verbindlich." },
      { question: "Wie schnell bekomme ich einen Termin im Havelland?", answer: "Besichtigungstermine vergeben wir in der Regel innerhalb von 24–48 Stunden – im Kerngebiet oft am selben Tag." },
      { question: "Welche Leistungen bieten Sie im Havelland an?", answer: "Wohnungs-, Haus-, Keller- und Dachbodenentrümpelung, Haushaltsauflösung, Gewerbeentrümpelung sowie kostenlose Schrottabholung – im gesamten Landkreis." },
    ],
  },
};

// Generate LocalBusiness Schema
export function generateLocalBusinessSchema() {
  const openingHoursSpec = [
    { dayOfWeek: "Monday", opens: "08:00", closes: "18:00" },
    { dayOfWeek: "Tuesday", opens: "08:00", closes: "18:00" },
    { dayOfWeek: "Wednesday", opens: "08:00", closes: "18:00" },
    { dayOfWeek: "Thursday", opens: "08:00", closes: "18:00" },
    { dayOfWeek: "Friday", opens: "08:00", closes: "18:00" },
  ].map((day) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: day.dayOfWeek,
    opens: day.opens,
    closes: day.closes,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${COMPANY_INFO.website}/#localbusiness`,
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.legalName,
    description: "Professionelle Entrümpelung & Haushaltsauflösung im Havelland. Eigene Mitarbeiter, eigene Fahrzeuge, keine Vermittlung. Festpreisgarantie.",
    image: `${COMPANY_INFO.website}/logo.png`,
    logo: `${COMPANY_INFO.website}/logo.png`,
    telephone: COMPANY_INFO.phoneFormatted,
    email: COMPANY_INFO.email,
    url: COMPANY_INFO.website,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address.street,
      addressLocality: COMPANY_INFO.address.city,
      addressRegion: COMPANY_INFO.address.region,
      postalCode: COMPANY_INFO.address.postalCode,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY_INFO.geo.latitude,
      longitude: COMPANY_INFO.geo.longitude,
    },
    founder: {
      "@type": "Person",
      name: COMPANY_INFO.owner.name,
      jobTitle: COMPANY_INFO.owner.role,
    },
    foundingDate: COMPANY_INFO.foundedYear.toString(),
    openingHoursSpecification: openingHoursSpec,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: COMPANY_INFO.googleRating,
      reviewCount: COMPANY_INFO.googleReviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    priceRange: "€€",
    paymentAccepted: "Cash, Bank Transfer",
    currenciesAccepted: "EUR",
    areaServed: REGIONS.map((r) => ({
      "@type": "City",
      name: r.name,
    })),
    sameAs: [COMPANY_INFO.googleMapsUrl],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Entrümpelungs-Dienstleistungen",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
  };
}

// Generate Service Schema for individual service pages
export function generateServiceSchema(service?: typeof SERVICES[0]) {
  if (service) {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${COMPANY_INFO.website}${service.slug}`,
      name: service.title,
      description: service.longDescription,
      provider: {
        "@type": "LocalBusiness",
        name: COMPANY_INFO.name,
        telephone: COMPANY_INFO.phoneFormatted,
        "@id": `${COMPANY_INFO.website}/#localbusiness`,
      },
      areaServed: SERVICE_AREAS_SUMMARY.mainAreas.map((area) => ({
        "@type": "City",
        name: area,
      })),
      serviceType: service.title,
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Entrümpelung & Haushaltsauflösung",
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY_INFO.name,
      telephone: COMPANY_INFO.phoneFormatted,
    },
    areaServed: {
      "@type": "State",
      name: "Brandenburg",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Entrümpelungs-Leistungen",
      itemListElement: SERVICES.map((service, index) => ({
        "@type": "OfferCatalog",
        position: index + 1,
        name: service.title,
        description: service.description,
      })),
    },
  };
}

// Generate FAQ Schema
export function generateFAQSchema(faqs: typeof FAQ_ITEMS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// Generate Review Schema
export function generateReviewSchema(reviews: typeof REVIEWS) {
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / Math.max(reviews.length, 1);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${COMPANY_INFO.website}/#localbusiness`,
    name: COMPANY_INFO.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avg.toFixed(1),
      bestRating: 5,
      worstRating: 1,
      reviewCount: reviews.length,
      itemReviewed: {
        "@type": "LocalBusiness",
        "@id": `${COMPANY_INFO.website}/#localbusiness`,
        name: COMPANY_INFO.name,
      },
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.name,
      },
      datePublished: review.dateISO,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.text,
    })),
  };
}

// Generate Organization Schema
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${COMPANY_INFO.website}/#organization`,
    name: COMPANY_INFO.name,
    legalName: COMPANY_INFO.legalName,
    url: COMPANY_INFO.website,
    logo: `${COMPANY_INFO.website}/logo.png`,
    foundingDate: COMPANY_INFO.foundedYear.toString(),
    founder: {
      "@type": "Person",
      name: COMPANY_INFO.owner.name,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address.street,
      addressLocality: COMPANY_INFO.address.city,
      postalCode: COMPANY_INFO.address.postalCode,
      addressCountry: "DE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY_INFO.phoneFormatted,
      contactType: "customer service",
      availableLanguage: "German",
      areaServed: "DE",
    },
    sameAs: [COMPANY_INFO.googleMapsUrl],
  };
}

// Generate Breadcrumb Schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${COMPANY_INFO.website}${item.url}`,
    })),
  };
}

// Generate LocalBusiness Schema for location pages (mit GeoCoordinates pro Ort)
export function generateLocationSchema(region: typeof REGIONS[0]) {
  const data = LOCATION_DATA[region.id];
  const geo = data?.geo || COMPANY_INFO.geo;
  const postalCode = data?.postalCodes?.[0];

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${COMPANY_INFO.website}${region.slug}#localbusiness`,
    name: `${COMPANY_INFO.name} – ${region.name}`,
    description: region.longDescription,
    telephone: COMPANY_INFO.phoneFormatted,
    email: COMPANY_INFO.email,
    url: `${COMPANY_INFO.website}${region.slug}`,
    image: `${COMPANY_INFO.website}/logo.png`,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_INFO.address.street,
      addressLocality: COMPANY_INFO.address.city,
      addressRegion: COMPANY_INFO.address.region,
      postalCode: COMPANY_INFO.address.postalCode,
      addressCountry: "DE",
    },
    areaServed: {
      "@type": "City",
      name: region.name,
      ...(postalCode ? { postalCode } : {}),
      geo: {
        "@type": "GeoCoordinates",
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
      geoRadius: "15000",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: COMPANY_INFO.googleRating,
      reviewCount: COMPANY_INFO.googleReviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    parentOrganization: {
      "@type": "LocalBusiness",
      "@id": `${COMPANY_INFO.website}/#localbusiness`,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Entrümpelungs-Leistungen in ${region.name}`,
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${service.title} ${region.name}`,
          description: service.description,
          areaServed: { "@type": "City", name: region.name },
        },
      })),
    },
  };
}

// Generate WebSite Schema with Sitelinks Search Box
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${COMPANY_INFO.website}/#website`,
    name: COMPANY_INFO.name,
    url: COMPANY_INFO.website,
    description: "Professionelle Entrümpelung & Haushaltsauflösung im Havelland. Festpreisgarantie seit 2015.",
    publisher: {
      "@type": "Organization",
      "@id": `${COMPANY_INFO.website}/#organization`,
    },
    inLanguage: "de-DE",
    copyrightYear: COMPANY_INFO.foundedYear,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${COMPANY_INFO.website}/?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// Generate AggregateRating Schema (standalone)
export function generateAggregateRatingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${COMPANY_INFO.website}/#localbusiness`,
    name: COMPANY_INFO.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: COMPANY_INFO.googleRating,
      reviewCount: COMPANY_INFO.googleReviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

// Generate WebPage Schema
export function generateWebPageSchema(
  pageTitle: string,
  pageDescription: string,
  pageUrl: string,
  pageType: "WebPage" | "AboutPage" | "ContactPage" | "FAQPage" | "ServicePage" = "WebPage"
) {
  return {
    "@context": "https://schema.org",
    "@type": pageType,
    "@id": `${COMPANY_INFO.website}${pageUrl}#webpage`,
    url: `${COMPANY_INFO.website}${pageUrl}`,
    name: pageTitle,
    description: pageDescription,
    isPartOf: {
      "@id": `${COMPANY_INFO.website}/#website`,
    },
    about: {
      "@id": `${COMPANY_INFO.website}/#organization`,
    },
    inLanguage: "de-DE",
    datePublished: "2015-01-01",
    dateModified: COMPANY_INFO.lastUpdated,
  };
}

// Generate complete structured data for all pages
export function generateCompleteSchema(pageType: "home" | "service" | "location" | "legal", additionalData?: {
  service?: typeof SERVICES[0];
  region?: typeof REGIONS[0];
  faqs?: typeof FAQ_ITEMS;
}) {
  const schemas = [];

  // Always include Organization
  schemas.push(generateOrganizationSchema());

  // Always include WebSite
  schemas.push(generateWebSiteSchema());

  if (pageType === "home") {
    // Homepage: Full LocalBusiness, Services, FAQ, Reviews
    schemas.push(generateLocalBusinessSchema());
    schemas.push(generateServiceSchema());
    if (additionalData?.faqs) {
      schemas.push(generateFAQSchema(additionalData.faqs));
    }
    schemas.push(generateReviewSchema(REVIEWS));
    schemas.push(generateBreadcrumbSchema([{ name: "Startseite", url: "/" }]));
  }

  if (pageType === "service" && additionalData?.service) {
    schemas.push(generateServiceSchema(additionalData.service));
    if (additionalData?.faqs) {
      schemas.push(generateFAQSchema(additionalData.faqs));
    }
    schemas.push(generateBreadcrumbSchema([
      { name: "Startseite", url: "/" },
      { name: additionalData.service.title, url: additionalData.service.slug },
    ]));
  }

  if (pageType === "location" && additionalData?.region) {
    schemas.push(generateLocationSchema(additionalData.region));
    schemas.push(generateBreadcrumbSchema([
      { name: "Startseite", url: "/" },
      { name: `Entrümpelung ${additionalData.region.name}`, url: additionalData.region.slug },
    ]));
  }

  if (pageType === "legal") {
    schemas.push(generateBreadcrumbSchema([
      { name: "Startseite", url: "/" },
      { name: "Rechtliches", url: "" },
    ]));
  }

  return schemas;
}

// SEO Meta Tags Generator
export function generateMetaTags(page: {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
  image?: string;
}) {
  return {
    title: page.title,
    description: page.description,
    canonical: `${COMPANY_INFO.website}${page.url}`,
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${COMPANY_INFO.website}${page.url}`,
      type: page.type || "website",
      locale: "de_DE",
      siteName: COMPANY_INFO.name,
      image: page.image || `${COMPANY_INFO.website}/og-image.jpg`,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
    },
    geo: {
      region: "DE-BB",
      placename: COMPANY_INFO.address.city,
      position: `${COMPANY_INFO.geo.latitude};${COMPANY_INFO.geo.longitude}`,
    },
  };
}

// Internal Linking Strategy Helper
export const INTERNAL_LINKS = {
  // Service -> Location links (max 3 per service)
  serviceToLocations: (serviceSlug: string) => {
    const priorityLocations = REGIONS.filter(r => r.isHeadquarters || ["falkensee", "nauen"].includes(r.id));
    return priorityLocations.slice(0, 3);
  },
  
  // Location -> Service links (all services)
  locationToServices: () => SERVICES,
  
  // Homepage -> Top pages
  homepageLinks: {
    services: SERVICES.slice(0, 4),
    locations: REGIONS.filter(r => r.isHeadquarters || r.id === "falkensee" || r.id === "havelland"),
  },
};

// Core Web Vitals & Technical SEO Checklist
export const TECHNICAL_SEO_REQUIREMENTS = {
  performance: {
    lcp: "< 2.5s (Largest Contentful Paint)",
    cls: "< 0.1 (Cumulative Layout Shift)",
    inp: "< 200ms (Interaction to Next Paint)",
  },
  mobile: {
    viewport: "width=device-width, initial-scale=1.0",
    touchTargets: "min 48x48px",
    fontSize: "min 16px base",
  },
  images: {
    format: "WebP preferred, AVIF for hero",
    lazyLoad: "loading='lazy' für below-fold",
    aspectRatio: "always set width/height",
    alt: "descriptive, keyword-relevant",
  },
  html: {
    lang: "de",
    charset: "UTF-8",
    headingHierarchy: "H1 → H2 → H3 only",
  },
};
