import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Check, ArrowRight, ShieldCheck, Hammer, Layers, Wrench } from "lucide-react";

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
      "Historische Kämpfer, Sprossen und Zierleisten nach Denkmalschutz",
    ],
    gewerkParam: "Holzfenster",
  },
  {
    id: "holz-alu-fenster",
    title: "Holz-Aluminium-Fenster (System Gutmann Mira)",
    subtitle: "Flächenbündige & flächenversetzte Ausführung",
    image: "/images/real/fenster-holzalu-buendig.jpg",
    description:
      "Die Premium-Kombination aus eigener Fertigung: Innen natürliche Holzatmosphäre, außen eine witterungsbeständige Aluminium-Vorsatzschale im bewährten System Gutmann Mira. Nie wieder streichen.",
    features: [
      "Flächenbündige und flächenversetzte Ausführungsvarianten",
      "Original Profilsystem GUTMANN MIRA für dauerhaften Wetterschutz",
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
      "Jede Haustür ist eine maßgefertigte Visitenkarte für Ihr Haus. In unserer Werkstatt fertigen wir individuelle Holztüren mit gefrästen Kassetten, Lichtausschnitten und hochsicherer Mehrfachverriegelung.",
    features: [
      "Massivholzkonstruktion oder formstabile Verbundplatten",
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
      <main className="pt-20 md:pt-24">
        {/* Compact, High-Impact Header with Quick Anchors */}
        <section className="bg-gradient-to-b from-[#1E1A17] to-[#25201C] text-[#FAF8F5] pt-12 pb-10 border-b border-[#3A332D]">
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-craft-label text-[#D4B28C] block mb-1.5">
                  Meisterbetrieb Schönheide · Inh. Ronny Mehlhorn
                </span>
                <h1 className="font-serif-heading text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
                  Leistungsumfang & Fertigung
                </h1>
                <p className="text-[#D6CCC0] text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
                  Eigene Herstellung im Erzgebirge kombiniert mit Fachmontage führender Bauelemente-Marken.
                </p>
              </div>

              {/* Quick Jump Bar – Starts Content Immediately */}
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="#eigenfertigung"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors border border-white/15 flex items-center gap-1.5"
                >
                  <Hammer size={13} className="text-[#D4B28C]" />
                  Eigene Produktion
                </a>
                <a
                  href="#bauelemente"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors border border-white/15 flex items-center gap-1.5"
                >
                  <Wrench size={13} className="text-[#D4B28C]" />
                  Bauelemente & Montage
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Eigene Fertigung – Starts right away */}
        <section id="eigenfertigung" className="py-12 md:py-16 bg-[#FAF8F5]">
          <div className="container-site">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10 pb-4 border-b border-[#E6DED4]">
              <div>
                <span className="text-craft-label block mb-0.5">Tradition & Präzision</span>
                <h2 className="font-serif-heading text-2xl sm:text-3xl text-[#1E1A17] font-normal">
                  1. Eigene Herstellung in Schönheide
                </h2>
              </div>
              <span className="text-xs text-[#8C6D4F] font-semibold uppercase tracking-wider">
                Neuheider Straße 64 b
              </span>
            </div>

            <div className="space-y-12 md:space-y-16">
              {eigenfertigung.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white p-6 sm:p-10 rounded-lg border border-[#E6DED4] shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative rounded overflow-hidden shadow-sm bg-[#F3ECE2]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[320px] sm:h-[380px] object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#1E1A17]/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded font-medium shadow-sm">
                        Eigene Fertigung Schönheide
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <span className="text-xs font-bold text-[#8C6D4F] uppercase tracking-wider block mb-1.5">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif-heading text-2xl sm:text-3xl text-[#1E1A17] font-medium mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[#5E564E] text-sm sm:text-base leading-relaxed mb-5">
                      {item.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {item.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#4A433D]">
                          <Check size={15} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/kontakt?gewerk=${encodeURIComponent(item.gewerkParam)}`}
                      className="btn btn-wood text-xs sm:text-sm inline-flex items-center gap-2"
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
        <section id="bauelemente" className="py-12 md:py-16 bg-white border-t border-[#E6DED4]">
          <div className="container-site">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-10 pb-4 border-b border-[#E6DED4]">
              <div>
                <span className="text-craft-label block mb-0.5">Geprüfte Markenqualität</span>
                <h2 className="font-serif-heading text-2xl sm:text-3xl text-[#1E1A17] font-normal">
                  2. Bauelemente & Montageservice
                </h2>
              </div>
              <span className="text-xs text-[#8C6D4F] font-semibold uppercase tracking-wider">
                VEKA · Gealan · Gutmann · GU
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {montage.map((item) => (
                <div
                  key={item.id}
                  className="craft-card rounded-lg p-6 sm:p-8 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-serif-heading text-xl sm:text-2xl font-medium text-[#1E1A17] mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-[#5E564E] text-sm leading-relaxed mb-5">
                      {item.description}
                    </p>
                    <div className="space-y-2 mb-6">
                      {item.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs sm:text-sm text-[#4A433D]">
                          <Check size={14} className="text-[#8C6D4F] flex-shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/kontakt?gewerk=${encodeURIComponent(item.gewerkParam)}`}
                    className="btn btn-outline-dark text-xs py-2.5 px-4 w-full flex items-center justify-center gap-2 font-medium"
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
        <section className="bg-[#FAF8F5] py-14 border-t border-[#E6DED4]">
          <div className="container-site text-center max-w-2xl">
            <span className="text-craft-label block mb-1">Aufmaß & Beratung</span>
            <h3 className="font-serif-heading text-2xl sm:text-3xl font-normal text-[#1E1A17] mb-3">
              Sonderanfertigung oder Altbausanierung?
            </h3>
            <p className="text-[#5E564E] text-sm sm:text-base mb-6 leading-relaxed">
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
