import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Leistungen & Gewerke | Tischlerei Mehlhorn",
  description:
    "Umfassender Leistungsumfang der Tischlerei Mehlhorn: Eigene Herstellung von Holzfenstern, Haustüren & Wintergärten sowie Handel und Fachmontage aller Bauelemente.",
};

const eigenfertigung = [
  {
    id: "holzfenster",
    title: "Holzfenster & Denkmalschutz",
    subtitle: "Natürlichkeit, Wärme und höchste Dämmwerte",
    image: "/images/service-fenster.jpg",
    description:
      "Unsere handgefertigten Holzfenster vereinen traditionelle Handwerkskunst mit modernster Isolierglastechnologie. Ideal für anspruchsvolle Neubauten sowie detailgetreue denkmalgeschützte Sanierungen.",
    features: [
      "Auswahl edler Hölzer: Eiche massiv, Lärche, Kiefer, Meranti",
      "Modernste 2-fach und 3-fach Wärmeschutz- & Schallschutzverglasungen",
      "Spezielle, langlebige 4-fach Oberflächenbeschichtungen mit Bio-Ölen",
      "Hochwertige Markenbeschläge mit integrierter Einbruchhemmung",
      "Historische Zierprofile, Kämpfer & Zierleisten nach Denkmalamtsvorgaben",
    ],
    gewerkParam: "Holzfenster",
  },
  {
    id: "holz-alu-fenster",
    title: "Holz-Aluminium-Fenster",
    subtitle: "Das Premium-System für lebenslange Haltbarkeit",
    image: "/images/service-fenster.jpg",
    description:
      "Die perfekte Verbindung zweier hochwertiger Werkstoffe: Innen wohnliche Holzatmosphäre mit natürlicher Ausstrahlung, außen eine witterungsbeständige Aluminium-Vorsatzschale, die nie wieder gestrichen werden muss.",
    features: [
      "Kein Nachstreichen der Außenseite erforderlich",
      "Extrem hohe Formstabilität und Energieeffizienz (Passivhaus-Standard möglich)",
      "Aluminiumschalen in allen RAL-Farben und Eloxaltönen pulverbeschichtet",
      "Verdeckt liegende Beschläge für minimalistisches Design",
      "Perfekter Schutz gegen Schlagregen, Hagel und UV-Strahlung",
    ],
    gewerkParam: "Holz-Alu-Fenster",
  },
  {
    id: "haustueren",
    title: "Massivholz-Hauseingangstüren",
    subtitle: "Die Visitenkarte Ihres Hauses – sicher und individuell",
    image: "/images/service-tuer.jpg",
    description:
      "Wir fertigen Hauseingangstüren nach Maß, die Ästhetik, höchste Sicherheit und Wärmedämmung vereinen. Ob traditionell im Landhausstil oder geradlinig modern mit Glas- und Edelstahlelementen.",
    features: [
      "Massivholz- oder formstabile Sandwich-Verbundkonstruktion",
      "Mehrfachverriegelungen mit Schwenkriegeln (RC2 / RC3 Sicherheit)",
      "Elektronische Zutrittssysteme (Fingerprint, Code, Smart Home)",
      "Schall- und Wärmeschutz mit thermisch getrennter Bodenschwelle",
      "Unikate in Wunschmaßen und individueller Oberflächenoptik",
    ],
    gewerkParam: "Hauseingangstüren",
  },
  {
    id: "wintergaerten",
    title: "Wintergärten & Glasbauten",
    subtitle: "Lichtdurchflutetes Wohnen im Einklang mit der Natur",
    image: "/images/service-wintergarten.jpg",
    description:
      "Maßgeschneiderte Kalt- und Warmwintergärten in tragender Holz- oder Holz-Aluminium-Konstruktion. Wir planen, fertigen und montieren Ihre Glasoase für ganzjährigen Wohnkomfort.",
    features: [
      "Tragwerksplanung und individuelle Statikberechnung",
      "Sonnenschutz- und selbstreinigendes Isolierglas im Dachbereich",
      "Integrierte Be- und Entlüftungssysteme sowie Beschattungslösungen",
      "Großflächige Hebe-Schiebetüren und Falttüranlagen für maximale Öffnungsweiten",
      "Schlüsselfertige Montage inklusive aller Abdichtungsarbeiten",
    ],
    gewerkParam: "Wintergärten",
  },
];

const montage = [
  {
    id: "kunststoff-alu-fenster",
    title: "Kunststoff- & Aluminiumfenster",
    description:
      "Modernste Fenster führender Markenhersteller. Hohe Energieeffizienz, pflegeleichte Oberflächen und vielfältige Farbvarianten.",
    features: ["Mehrkammer-Profilsysteme", "Schallschutzklassen 1-5", "RAL-zertifizierte Fachmontage"],
    gewerkParam: "Kunststoff- & Alufenster",
  },
  {
    id: "innentueren",
    title: "Innentüren & Zargen",
    description:
      "Von der klassischen Normtür über edle Echtholzfurniere bis hin zu raumhohen Ganzglastüren und Schiebetürsystemen.",
    features: ["CPL-, Furnier- & Weißlacktüren", "Glastüren & Schiebetürbeschläge", "Passgenaue Montage inklusive Zargen"],
    gewerkParam: "Innentüren",
  },
  {
    id: "garagentore",
    title: "Garagentore & Antriebe",
    description:
      "Hochwertige Sektionaltore, Rolltore und Schwingtore mit moderner Funk- und Smart-Home-Antriebstechnik.",
    features: ["Wärmegedämmte Lamellen", "Flüsterleise Elektroantriebe", "Sicherheits-Abschaltautomatik"],
    gewerkParam: "Garagentore",
  },
  {
    id: "rollladen",
    title: "Rollladen- & Klappläden",
    description:
      "Vorbau-, Aufsatzrollladen und Klappläden für effektiven Sonnen-, Sicht- und Einbruchschutz. Manuell oder motorisiert.",
    features: ["Aluminium- & Kunststofflamellen", "Funkmotorisierung & Zeitschaltuhren", "Insektenschutzgitter integrierbar"],
    gewerkParam: "Rollladensysteme",
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
              Leistungsspektrum & Gewerke
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl max-w-3xl mb-6 font-normal leading-tight">
              Maßarbeit in Holz & fachgerechte Montage.
            </h1>
            <p className="text-[#D6CCC0] text-lg md:text-xl max-w-2xl leading-relaxed">
              Ob handgefertigte Einzelstücke aus unserer eigenen Werkstatt oder
              geprüfte Marken-Bauelemente – wir garantieren höchste Qualität für Ihr Zuhause.
            </p>
          </div>
        </section>

        {/* Section 1: Eigene Fertigung */}
        <section id="eigenfertigung" className="section-pad bg-[#FAF8F5]">
          <div className="container-site">
            <span className="text-craft-label block mb-2">Meisterwerkstatt</span>
            <h2 className="font-serif-heading text-3xl md:text-5xl text-[#1E1A17] font-normal mb-4">
              1. Eigene Herstellung
            </h2>
            <p className="text-[#5E564E] max-w-2xl text-base md:text-lg mb-16">
              In unserer modern ausgestatteten Werkstatt fertigen wir individuelle Holzelemente nach Maß. Jedes Stück entsteht mit meisterhafter Präzision.
            </p>

            <div className="space-y-20">
              {eigenfertigung.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-white p-8 md:p-12 rounded-lg border border-[#E6DED4] shadow-sm"
                >
                  {/* Image */}
                  <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative rounded overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[360px] object-cover"
                      />
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
            <span className="text-craft-label block mb-2">Handel & Montageservice</span>
            <h2 className="font-serif-heading text-3xl md:text-5xl text-[#1E1A17] font-normal mb-4">
              2. Bauelemente & Fachmontage
            </h2>
            <p className="text-[#5E564E] max-w-2xl text-base md:text-lg mb-16">
              Wir arbeiten mit führenden Markenherstellern zusammen und garantieren den fachgerechten, sauberen Einbau vor Ort nach aktuellen Gütestandards.
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
            <span className="text-craft-label block mb-2">Persönliche Beratung</span>
            <h3 className="font-serif-heading text-3xl font-normal text-[#1E1A17] mb-4">
              Haben Sie Fragen zu speziellen Sondermaßen?
            </h3>
            <p className="text-[#5E564E] text-sm md:text-base mb-8 leading-relaxed">
              Jedes Bauvorhaben ist einzigartig. Wir beraten Sie persönlich, nehmen präzise Aufmaße vor Ort und erstellen Ihnen ein transparentes Angebot.
            </p>
            <Link href="/kontakt" className="btn btn-wood">
              Kostenlose Beratung anfragen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
