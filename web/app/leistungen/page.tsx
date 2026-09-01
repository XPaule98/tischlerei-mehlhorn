import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Check, ArrowRight, ShieldCheck, Sparkles, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Leistungen & Gewerke | Tischlerei Ronny Mehlhorn",
  description:
    "Eigene Herstellung von Holzfenstern, Holz-Aluminium-Fenstern (Gutmann Mira), Massivholz-Haustüren und Wintergärten sowie Fachmontage von Kunststofffenstern (VEKA, Gealan) in Schönheide.",
};

const eigenfertigung = [
  {
    id: "holzfenster",
    title: "Holzfenster aus eigener Produktion",
    subtitle: "Maßanfertigung für Neubau, Altbau & Denkmalschutz",
    image: "/images/real/fenster-holz-1.jpg",
    description:
      "Unsere handgefertigten Holzfenster entstehen in eigener Werkstatt in Schönheide. Sie verbinden traditionelle Zimmermannskunst mit modernsten Isolierverglasungen und denkmalgerechten Zierprofilen.",
    features: [
      "Auswahl edler Hölzer: Eiche massiv, Lärche, Kiefer",
      "2-fach und 3-fach Wärmeschutz- & Schallschutzverglasung",
      "Langlebige, umweltschonende Mehrschicht-Oberflächenlasuren",
      "Marken-Sicherheitsbeschläge mit Einbruchhemmung",
      "Historische Kämpfer, Sprossen und Zierleisten nach Denkmalschutzvorgaben",
    ],
    gewerkParam: "Holzfenster",
  },
  {
    id: "holz-alu-fenster",
    title: "Holz-Aluminium-Fenster (System Gutmann Mira)",
    subtitle: "Flächenbündige & flächenversetzte Ausführung",
    image: "/images/real/fenster-holzalu-buendig.jpg",
    description:
      "Die Premium-Kombination aus eigener Fertigung: Innen natürliche Holzatmosphäre, außen eine witterungsbeständige Aluminium-Vorsatzschale im bewährten System Gutmann Mira. Höchste Formstabilität, die nie wieder gestrichen werden muss.",
    features: [
      "Flächenbündige und flächenversetzte Ausführungsvarianten",
      "Original Profilsystem GUTMANN MIRA für lebenslangen Wetterschutz",
      "Aluminiumschalen in allen RAL-Farbtönen pulverbeschichtet",
      "Verdeckt liegende Beschläge und schlanke Profilansichten",
      "Maximale Energieeffizienz für Niedrigenergie- und Passivhäuser",
    ],
    gewerkParam: "Holz-Alu-Fenster",
  },
  {
    id: "haustueren",
    title: "Hauseingangstüren aus eigener Produktion",
    subtitle: "Massivholz & individuelle Unikate nach Kundenwunsch",
    image: "/images/real/tuer-5.jpg",
    description:
      "Jede Haustür ist eine maßgefertigte Visitenkarte für Ihr Haus. In unserer Werkstatt fertigen wir individuelle Holztüren mit gefrästen Kassetten, sandgestrahlten Lichtausschnitten und hochsicherer Mehrfachverriegelung.",
    features: [
      "Massivholzkonstruktion oder formstabile Sandwich-Verbundplatten",
      "Sicherheits-Mehrfachverriegelungen mit Schwenkriegeln (RC2 / RC3)",
      "Elektronische Zutrittskontrollen (Fingerprint, Code, Smart Home)",
      "Thermisch getrennte Bodenschwellen für perfekte Zugluftdämmung",
      "Individuelle Fräsungen, Sprossen und Oberflächen nach Wunsch",
    ],
    gewerkParam: "Hauseingangstüren",
  },
  {
    id: "wintergaerten",
    title: "Wintergärten & Glasbauten",
    subtitle: "Lichtdurchfluteter Wohnraum zu jeder Jahreszeit",
    image: "/images/real/wintergarten-1.jpg",
    description:
      "Individuell geplante Kalt- und Warmwintergärten in tragender Holz- oder Holz-Aluminium-Konstruktion. Wir planen die Statik, fertigen die Tragglieder in Schönheide und montieren Ihre Glasoase schlüsselfertig.",
    features: [
      "Tragwerksplanung und präzise statische Berechnung",
      "Sonnenschutz- und selbstreinigendes Isolierglas im Dachbereich",
      "Großflächige Hebe-Schiebetüren für barrierefreie Öffnung in den Garten",
      "Integrierte Belüftungs- und Beschattungssysteme",
      "Komplette Montage inklusive fachgerechter Bauanschlussabdichtung",
    ],
    gewerkParam: "Wintergärten",
  },
];

const montage = [
  {
    id: "kunststoff-fenster",
    title: "Kunststofffenster (VEKA & GEALAN)",
    description:
      "Modernste Mehrkammer-Kunststofffenster führender Profilsysteme wie VEKA und Gealan. Pflegeleicht, hochisolierend und in vielen Dekorfarben erhältlich.",
    features: [
      "Markenprofile VEKA & Gealan",
      "Schallschutzklassen 1 bis 5",
      "RAL-zertifizierte Fachmontage durch unser Team",
    ],
    gewerkParam: "Kunststofffenster",
  },
  {
    id: "innentueren",
    title: "Innentüren & Zargensysteme",
    description:
      "Von der klassischen Weißlacktür über hochwertige Echtholzfurniere bis hin zu modernen Ganzglastüren und Schiebetürsystemen.",
    features: [
      "CPL-, Furnier- und Massivholztüren",
      "Ganzglastüren mit Edelstahlbeschlägen",
      "Passgenaue Zargenmontage",
    ],
    gewerkParam: "Innentüren",
  },
  {
    id: "garagentore",
    title: "Garagentore & Antriebe",
    description:
      "Wärmegedämmte Sektionaltore und Rolltore führender Hersteller inklusive leiser Funk-Elektroantriebe.",
    features: [
      "Sektionaltore & Schwingtore",
      "Sicherheits-Abschaltautomatik",
      "Handsender & Smart-Home-Bedienung",
    ],
    gewerkParam: "Garagentore",
  },
  {
    id: "beschattungen",
    title: "Beschattungen & Rollladensysteme",
    description:
      "Vorbau- und Aufsatzrollladen, Klappläden und Insektenschutzgitter für zuverlässigen Sonnen-, Sicht- und Einbruchschutz.",
    features: [
      "Aluminium- & Kunststofflamellen",
      "Funk- und Zeitschaltuhrmotorisierung",
      "Integrierbare Insektenschutzrollos",
    ],
    gewerkParam: "Beschattungssysteme",
  },
];

export default function LeistungenPage() {
  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Header Hero */}
        <section className="bg-[#1C1815] text-[#FAF8F5] py-20 md:py-28 relative overflow-hidden">
          <div className="container-site relative z-10">
            <span className="text-craft-label text-[#D4B28C] block mb-3">
              Leistungsumfang der Tischlerei Mehlhorn
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl max-w-3xl mb-6 font-normal leading-tight">
              Eigene Herstellung in Schönheide & fachgerechte Montage.
            </h1>
            <p className="text-[#D6CCC0] text-lg md:text-xl max-w-2xl leading-relaxed">
              Vom handgefertigten Holzfenster und exklusiven Holz-Alu-Systemen über maßgeschneiderte Haustüren bis hin zu geprüften Kunststoff-Bauelementen.
            </p>
          </div>
        </section>

        {/* Section 1: Eigene Fertigung */}
        <section id="eigenfertigung" className="section-pad bg-[#FAF8F5]">
          <div className="container-site">
            <span className="text-craft-label block mb-2">Meisterbetrieb Schönheide</span>
            <h2 className="font-serif-heading text-3xl md:text-5xl text-[#1E1A17] font-normal mb-4">
              1. Eigene Produktion
            </h2>
            <p className="text-[#5E564E] max-w-2xl text-base md:text-lg mb-16">
              In unserer modern ausgestatteten Werkstatt in der Neuheider Straße 64 b fertigen wir individuelle Holzelemente nach Maß.
            </p>

            <div className="space-y-20">
              {eigenfertigung.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-white p-8 md:p-12 rounded-lg border border-[#E6DED4] shadow-sm"
                >
                  {/* Image */}
                  <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative rounded overflow-hidden shadow-sm">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[380px] object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#1E1A17]/85 backdrop-blur-sm text-white text-xs px-3 py-1 rounded font-medium">
                        Eigene Herstellung Schönheide
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <span className="text-xs font-semibold text-[#8C6D4F] uppercase tracking-wider block mb-2">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif-heading text-2xl md:text-3xl text-[#1E1A17] font-medium mb-4">
                      {item.title}
                    </h3>
                    <p className="text-[#5E564E] text-sm md:text-base leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="space-y-2 mb-8">
                      {item.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5 text-xs md:text-sm text-[#4A433D]">
                          <Check size={15} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/kontakt?gewerk=${encodeURIComponent(item.gewerkParam)}`}
                      className="btn btn-primary text-xs md:text-sm inline-flex items-center gap-2"
                    >
                      Angebot für {item.title.split(" ")[0]} anfordern
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Bauelemente & Montage */}
        <section id="bauelemente" className="section-pad bg-white border-t border-[#E6DED4]">
          <div className="container-site">
            <span className="text-craft-label block mb-2">Handel & Fachmontage</span>
            <h2 className="font-serif-heading text-3xl md:text-5xl text-[#1E1A17] font-normal mb-4">
              2. Bauelemente & Montageservice
            </h2>
            <p className="text-[#5E564E] max-w-2xl text-base md:text-lg mb-16">
              Wir arbeiten mit führenden Markenherstellern (wie VEKA, Gealan, Gutmann, GU, Roto) zusammen und garantieren die fachgerechte Montage vor Ort.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {montage.map((item) => (
                <div
                  key={item.id}
                  className="craft-card rounded-lg p-8 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-serif-heading text-2xl font-medium text-[#1E1A17] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#5E564E] text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <div className="space-y-2 mb-8">
                      {item.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs md:text-sm text-[#4A433D]">
                          <Check size={14} className="text-[#8C6D4F] flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/kontakt?gewerk=${encodeURIComponent(item.gewerkParam)}`}
                    className="btn btn-outline-dark text-xs py-2.5 px-4 w-full flex items-center justify-center gap-2"
                  >
                    Angebot anfragen
                    <ArrowRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Beratungsbanner */}
        <section className="bg-[#FAF8F5] py-20 border-t border-[#E6DED4]">
          <div className="container-site text-center max-w-2xl">
            <span className="text-craft-label block mb-2">Aufmaß & Beratung</span>
            <h3 className="font-serif-heading text-3xl font-normal text-[#1E1A17] mb-4">
              Sonderanfertigung oder Altbausanierung?
            </h3>
            <p className="text-[#5E564E] text-sm md:text-base mb-8 leading-relaxed">
              Wir beraten Sie persönlich in Schönheide und der gesamten Region Erzgebirge / Vogtland. Wir nehmen präzise Aufmaße und erstellen Ihnen ein transparentes Angebot.
            </p>
            <Link href="/kontakt" className="btn btn-wood">
              Kostenlose Vor-Ort-Beratung anfragen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
