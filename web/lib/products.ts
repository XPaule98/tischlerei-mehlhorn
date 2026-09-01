export interface Product {
  id: string;
  slug: string;
  category: "schneidebretter" | "regale" | "deko";
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  dimensions: string;
  woodType: string;
  price: number;
  image: string;
  galleryImages?: string[];
  available: boolean;
  tag: string;
  features: string[];
  careInstructions?: string;
}

export const products: Product[] = [
  {
    id: "schneidebrett-xl",
    slug: "schneidebrett-hirnholz-xl",
    category: "schneidebretter",
    title: "Schneidebrett Hirnholz XL",
    subtitle: "Massive Eiche · Stirnholz geölt",
    description:
      "Massives Hirnholz-Schneidebrett aus heimischer Eiche. Messerschonend, antibakteriell durch natürliche Gerbsäuren und extrem formstabil.",
    longDescription:
      "Unser Hirnholz-Schneidebrett XL ist der König unter den Küchenbrettern. Die Holzfasern stehen aufrecht (Stirnholz), wodurch die Messerklinge zwischen die Fasern gleitet, anstatt sie zu zerschneiden – das Messer bleibt deutlich länger scharf. Das Holz regeneriert sich durch Feuchtigkeit von selbst. Zweifach mit lebensmittelechtem Bio-Leinöl veredelt.",
    dimensions: "40 × 30 × 5 cm",
    woodType: "Eiche massiv (Stirnholz)",
    price: 89,
    image: "/images/catalog-schneidebrett.jpg",
    available: true,
    tag: "Werkstatt-Klassiker",
    features: [
      "Stehende Holzfasern (Stirnholz) für maximale Schnittfestigkeit",
      "Natürliche antibakterielle Tannine der Eiche",
      "Ergonomische Grifffräsungen an den Stirnseiten",
      "Rutschfeste Gummifüße auf der Unterseite",
      "Zweifach geölt mit reinem Leinöl",
    ],
    careInstructions:
      "Nach Gebrauch einfach mit warmem Wasser und mildem Spülmittel feucht abwischen. Nicht spülmaschinengeeignet. Alle paar Monate mit etwas Leinöl oder Holzbalsam nachölen.",
  },
  {
    id: "wandregal-eiche",
    slug: "schwebendes-wandregal-eiche",
    category: "regale",
    title: "Schwebendes Wandregal Eiche",
    subtitle: "Massiveiche mit natürlicher Baumkante",
    description:
      "Massives Eichenholzregal mit natürlicher Baumkante und unsichtbarer Schwerlast-Wandverankerung. Samtig matt geölt.",
    longDescription:
      "Jedes dieser schwebenden Wandregale ist ein handgefertigtes Einzelstück. Die Vorderkante folgt dem organischen Wuchs des Eichenbaums (echte Baumkante), während die Rückseite plan an der Wand anliegt. Durch die mitgelieferte unsichtbare Schwerlast-Verankerung schwebt das Regal förmlich an Ihrer Wand und trägt mühelos bis zu 25 kg.",
    dimensions: "80 × 20 × 4 cm",
    woodType: "Massiveiche natur",
    price: 129,
    image: "/images/catalog-regal.jpg",
    available: true,
    tag: "Handarbeit",
    features: [
      "Echte, von Hand gebürstete Baumkante",
      "Unsichtbare Schwerlast-Stahlbolzen im Lieferumfang enthalten",
      "Tragkraft bis zu 25 kg bei massivem Mauerwerk",
      "Seidenmatte Naturöl-Oberfläche",
      "Individuelle Holzmaserung bei jedem Regal",
    ],
    careInstructions:
      "Zur Pflege genügt ein trockenes oder leicht nebelfeuchtes Tuch. Bei Bedarf nach einigen Jahren mit Hartwachsöl auffrischen.",
  },
  {
    id: "schneidebrett-streifen",
    slug: "schneidebrett-streifendesign",
    category: "schneidebretter",
    title: "Schneidebrett Streifendesign",
    subtitle: "Zweifarbig · Eiche & Buche",
    description:
      "Dekorative Kombination aus massiver Eiche und Buche. Zweifarbig verleimt mit biologischer Leinöl-Versiegelung.",
    longDescription:
      "Ein formschönes und handliches Schneide- und Servierbrett für die tägliche Küche. Durch die abwechselnde Verleimung von heller Buche und warmer Eiche entsteht ein reizvolles Linienspiel. Perfekt als Allround-Küchenbrett oder für Frühstück und Vesper.",
    dimensions: "35 × 22 × 3 cm",
    woodType: "Eiche & Buche massiv",
    price: 54,
    image: "/images/catalog-schneidebrett.jpg",
    available: true,
    tag: "Zweifarbig",
    features: [
      "Kontrastreiche Streifenoptik aus Eiche und Buche",
      "Lebensmittelechte, wasserfeste D4-Verleimung",
      "Allseitig gefaste Kanten für angenehme Haptik",
      "Beidseitig nutzbar",
    ],
    careInstructions:
      "Per Hand spülen und stehend trocknen lassen. Vor direkter Hitze und Spülmaschinen schützen.",
  },
  {
    id: "wandregal-kiefer",
    slug: "wandregal-kiefer-natur",
    category: "regale",
    title: "Wandregal Kiefer Natur",
    subtitle: "Astfreie Gebirgskiefer",
    description:
      "Rustikales Wandregal aus astfreier Gebirgskiefer. Feingeschliffen und unbehandelt oder mit Bio-Hartwachsöl veredelt.",
    longDescription:
      "Leichtes, warmes Nadelholz mit charismatischem Duft und heller Ausstrahlung. Ausgesuchte Gebirgskiefer sorgt für hohe Stabilität bei geringem Eigengewicht. Ideal für Bücher, Pflanzen und Gewürzregale.",
    dimensions: "100 × 18 × 3 cm",
    woodType: "Kiefer massiv",
    price: 79,
    image: "/images/catalog-regal.jpg",
    available: true,
    tag: "Naturholz",
    features: [
      "Ausgesuchtes, harzarmes Gebirgskiefernholz",
      "Feinstschliff (Korn 240) für samtige Oberfläche",
      "Inklusive robuster Wandhalterungen",
      "Warmes, helles Holzbild",
    ],
    careInstructions:
      "Trocken abstauben. Das Holz dunkelt mit den Jahren auf natürliche Weise zu einem warmen Honigton nach.",
  },
  {
    id: "servierplatte-griff",
    slug: "servier-kaeseplatte-mit-griff",
    category: "schneidebretter",
    title: "Servier- & Käseplatte mit Griff",
    subtitle: "Massive Eiche mit Saftrille",
    description:
      "Edles Servierbrett mit gefräster Saftrille und ergonomischem Tragegriff aus massiver Eiche.",
    longDescription:
      "Präsentieren Sie Käse, Schinken, Antipasti oder Grillfleisch stilvoll. Die umlaufende Saftrille fängt Flüssigkeiten sicher auf, während der integrierte Griff das Servieren am Tisch zum Kinderspiel macht. Mit praktischem Lederband zum Aufhängen.",
    dimensions: "48 × 22 × 2.5 cm",
    woodType: "Eiche massiv",
    price: 69,
    image: "/images/catalog-schneidebrett.jpg",
    available: true,
    tag: "Unikat",
    features: [
      "Aus einem durchgehenden Eichenholzstück gefertigt",
      "Präzise eingefräste Saftrille",
      "Ergonomischer Handgriff mit Aufhängebohrung",
      "Echtes Lederband zum Aufhängen in der Küche",
    ],
    careInstructions:
      "Nach der Benutzung feucht abwischen. Regelmäßig mit Walnuss- oder Leinöl einreiben.",
  },
  {
    id: "wandregal-nussbaum",
    slug: "exklusives-wandregal-nussbaum",
    category: "regale",
    title: "Exklusives Wandregal Nussbaum",
    subtitle: "Edles amerikanisches Nussholz",
    description:
      "Tiefdunkles Edelholz für anspruchsvolle Wohnbereiche mit ausdrucksstarker Maserung.",
    longDescription:
      "Amerikanischer Nussbaum besticht durch seine schokoladenbraune Farbe und lebendige, samtige Maserung. Dieses schwebende Wandregal setzt hochwertige Akzente in Wohnzimmer, Arbeitszimmer oder Flur. Ein absolutes Luxusstück handwerklicher Holzbearbeitung.",
    dimensions: "60 × 22 × 4 cm",
    woodType: "Nussbaum massiv",
    price: 169,
    image: "/images/catalog-regal.jpg",
    available: true,
    tag: "Edelholz",
    features: [
      "Premium-Nussholz mit tiefem, warmem Farbton",
      "Unsichtbare, verdeckte Wandbefestigung inklusive",
      "Zweifach geölt für seidenmatten Tiefenglanz",
      "Hohe Dichte und Wertbeständigkeit",
    ],
    careInstructions:
      "Mit weichem Baumwolltuch trocken oder leicht feucht reinigen. Keine aggressiven Reiniger verwenden.",
  },
];

export function getProductByIdOrSlug(idOrSlug: string): Product | undefined {
  return products.find((p) => p.id === idOrSlug || p.slug === idOrSlug);
}
