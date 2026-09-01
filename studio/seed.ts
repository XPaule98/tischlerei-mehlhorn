import { createClient } from "@sanity/client";

// Read token from environment or run via sanity exec --with-user-token
const client = createClient({
  projectId: "z3grtien",
  dataset: "production",
  apiVersion: "2026-09-01",
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN || process.env.SANITY_API_TOKEN,
});

const heroData = {
  _id: "heroSettings",
  _type: "heroSettings",
  craftBadge: "Meisterbetrieb seit 1977 · Inh. Ronny Mehlhorn",
  title: "Präzision in Holz. Beständigkeit für Generationen.",
  subtitle:
    "Eigene Herstellung von Fenstern, Haustüren und Wintergärten sowie fachgerechte Montage geprüfter Marken-Bauelemente.",
  experienceYears: "45+",
  foundationYear: "1977",
  qualityStatement: "100%",
};

const companyInfoData = {
  _id: "companyInfo",
  _type: "companyInfo",
  companyName: "Tischlerei Mehlhorn",
  owner: "Ronny Mehlhorn, Tischlermeister",
  phone: "+49 (0) 00 00 00 00",
  email: "info@tischlerei-mehlhorn.de",
  street: "Musterstraße 1",
  zipCity: "00000 Musterstadt",
  hoursWeekdays: "07:00 – 17:00 Uhr",
  hoursSaturday: "08:00 – 12:00 Uhr",
};

const aboutPageData = {
  _id: "aboutPage",
  _type: "aboutPage",
  headline: "Holzhandwerk mit Leidenschaft – seit über 45 Jahren.",
  introText:
    "Gegründet 1977 durch Roland Mehlhorn, heute mit meisterhafter Präzision geführt durch Tischlermeister Ronny Mehlhorn.",
  milestones: [
    {
      _key: "1977",
      year: "1977",
      tagline: "Die Gründung",
      title: "Der Ursprung im Handwerk",
      description:
        "Roland Mehlhorn gründet im Januar 1977 die Tischlerei. Mit traditionellem Gestellbau und kompromisslosem Qualitätsanspruch entsteht das Fundament.",
    },
    {
      _key: "1992",
      year: "1992",
      tagline: "Expansion & Neubau",
      title: "Umzug in das neue Firmengebäude",
      description:
        "Mit dem Neubau des heutigen Firmengebäudes wird die Werkstatt modernisiert. Die Produktion wird gezielt auf hochwertige Holzfenster und Haustüren ausgeweitet.",
    },
    {
      _key: "2012",
      year: "2012",
      tagline: "Generationswechsel",
      title: "Meisterübergabe an Ronny Mehlhorn",
      description:
        "Am 1. Juli 2012 übernimmt Sohn und Tischlermeister Ronny Mehlhorn die Betriebsführung. Die bewährte Familientradition wird mit modernen Fertigungsmethoden fortgeführt.",
    },
    {
      _key: "heute",
      year: "Heute",
      tagline: "Zukunft & Beständigkeit",
      title: "Präzision aus Meisterhand",
      description:
        "Über 45 Jahre Erfahrung im Tischlerhandwerk. Eigene Maßfertigung und Montage geprüfter Marken-Bauelemente.",
    },
  ],
};

const services = [
  {
    _id: "service-holzfenster",
    _type: "serviceItem",
    title: "Holzfenster & Denkmalschutzfenster",
    category: "eigenfertigung",
    description:
      "Unsere handgefertigten Holzfenster vereinen traditionelle Handwerkskunst mit modernster Isolierglastechnologie.",
    features: [
      "Eiche massiv, Lärche, Kiefer",
      "2-fach und 3-fach Isolierverglasung",
      "Langlebige 4-fach Oberflächenbeschichtung",
      "Denkmalschutzgerechte Profile",
    ],
    order: 1,
  },
  {
    _id: "service-holz-alu",
    _type: "serviceItem",
    title: "Holz-Aluminium-Fenster",
    category: "eigenfertigung",
    description:
      "Innen wohnliche Holzatmosphäre, außen eine witterungsbeständige Aluminium-Vorsatzschale, die nie wieder gestrichen werden muss.",
    features: [
      "Wartungsfreie Aluminium-Außenseite",
      "Passivhaus-Dämmstandard möglich",
      "Alle RAL-Farben pulverbeschichtet",
    ],
    order: 2,
  },
  {
    _id: "service-haustueren",
    _type: "serviceItem",
    title: "Massivholz-Hauseingangstüren",
    category: "eigenfertigung",
    description:
      "Repräsentative Eingangstüren nach Maß mit höchstem Einbruchschutz (RC2/RC3) und exzellenter Wärmedämmung.",
    features: [
      "Massivholz & formstabiler Verbund",
      "RC2 / RC3 Sicherheitsverriegelungen",
      "Biometrie & Smart-Home Zutritt",
    ],
    order: 3,
  },
  {
    _id: "service-wintergaerten",
    _type: "serviceItem",
    title: "Wintergärten & Glasbauten",
    category: "eigenfertigung",
    description:
      "Tragende Holz- und Holz-Aluminium-Konstruktionen für lichtdurchfluteten Wohnraum das ganze Jahr.",
    features: [
      "Individuelle Statik- & Tragwerksplanung",
      "Sonnenschutz- & selbstreinigendes Glas",
      "Großflächige Hebeschiebetüren",
    ],
    order: 4,
  },
  {
    _id: "service-kunststoff-alu",
    _type: "serviceItem",
    title: "Kunststoff- & Aluminiumfenster",
    category: "bauelemente",
    description:
      "Moderne Fenster führender Markenhersteller inklusive fachgerechter Montage.",
    features: [
      "Mehrkammer-Profilsysteme",
      "Schallschutzklassen 1-5",
      "RAL-zertifizierte Fachmontage",
    ],
    order: 5,
  },
  {
    _id: "service-innentueren",
    _type: "serviceItem",
    title: "Innentüren & Zargen",
    category: "bauelemente",
    description:
      "Von der klassischen Normtür über Echtholzfurniere bis zu Ganzglastüren.",
    features: ["CPL-, Furnier- & Weißlack", "Glastüren & Schiebetürbeschläge"],
    order: 6,
  },
  {
    _id: "service-garagentore",
    _type: "serviceItem",
    title: "Garagentore & Antriebe",
    category: "bauelemente",
    description: "Sektionaltore und Rolltore mit Funkfernbedienung und Smart-Home-Anbindung.",
    features: ["Wärmegedämmte Lamellen", "Flüsterleise Elektroantriebe"],
    order: 7,
  },
  {
    _id: "service-rollladen",
    _type: "serviceItem",
    title: "Rollladen- & Klappläden",
    category: "bauelemente",
    description: "Effektiver Sonnen-, Sicht- und Einbruchschutz mit Motorisierung.",
    features: ["Aluminium- & Kunststofflamellen", "Funkmotorisierung & Zeitschaltuhr"],
    order: 8,
  },
];

const products = [
  {
    _id: "prod-schneidebrett-xl",
    _type: "catalogProduct",
    title: "Schneidebrett Hirnholz XL",
    description:
      "Massives Hirnholz-Schneidebrett aus heimischer Eiche. Messerschonend, antibakteriell und extrem formstabil.",
    dimensions: "40 × 30 × 5 cm",
    woodType: "eiche-massiv",
    price: 89,
    available: true,
  },
  {
    _id: "prod-wandregal-eiche",
    _type: "catalogProduct",
    title: "Schwebendes Wandregal Eiche",
    description:
      "Massives Eichenholzregal mit natürlicher Baumkante und unsichtbarer Schwerlast-Wandverankerung.",
    dimensions: "80 × 20 × 4 cm",
    woodType: "eiche-massiv",
    price: 129,
    available: true,
  },
  {
    _id: "prod-schneidebrett-streifen",
    _type: "catalogProduct",
    title: "Schneidebrett Streifendesign",
    description:
      "Dekorative Kombination aus massiver Eiche und Buche. Zweifarbig verleimt mit biologischer Leinöl-Versiegelung.",
    dimensions: "35 × 22 × 3 cm",
    woodType: "diverse",
    price: 54,
    available: true,
  },
  {
    _id: "prod-wandregal-kiefer",
    _type: "catalogProduct",
    title: "Wandregal Kiefer Natur",
    description:
      "Rustikales Wandregal aus astfreier Gebirgskiefer. Feingeschliffen und unbehandelt.",
    dimensions: "100 × 18 × 3 cm",
    woodType: "kiefer-massiv",
    price: 79,
    available: true,
  },
  {
    _id: "prod-servierplatte-griff",
    _type: "catalogProduct",
    title: "Servier- & Käseplatte mit Griff",
    description:
      "Edles Servierbrett mit gefräster Saftrille und ergonomischem Tragegriff aus massiver Eiche.",
    dimensions: "48 × 22 × 2.5 cm",
    woodType: "eiche-massiv",
    price: 69,
    available: true,
  },
  {
    _id: "prod-wandregal-nussbaum",
    _type: "catalogProduct",
    title: "Exklusives Wandregal Nussbaum",
    description:
      "Tiefdunkles Edelholz für anspruchsvolle Wohnbereiche mit ausdrucksstarker Maserung.",
    dimensions: "60 × 22 × 4 cm",
    woodType: "nussbaum-massiv",
    price: 169,
    available: true,
  },
];

async function seed() {
  console.log("🌱 Starte Sanity-Import...");

  // 1. Hero
  console.log("- Importiere Hero-Bereich...");
  await client.createOrReplace(heroData);

  // 2. Company Info
  console.log("- Importiere Firmendaten & Öffnungszeiten...");
  await client.createOrReplace(companyInfoData);

  // 3. About Page
  console.log("- Importiere Über uns & Historie...");
  await client.createOrReplace(aboutPageData);

  // 4. Services
  console.log("- Importiere Leistungen & Gewerke...");
  for (const s of services) {
    await client.createOrReplace(s);
  }

  // 5. Products
  console.log("- Importiere Katalog-Produkte...");
  for (const p of products) {
    await client.createOrReplace(p);
  }

  console.log("✅ Sanity Studio erfolgreich mit allen Inhalten befüllt!");
}

seed().catch((err) => {
  console.error("❌ Fehler beim Seed:", err);
  process.exit(1);
});
