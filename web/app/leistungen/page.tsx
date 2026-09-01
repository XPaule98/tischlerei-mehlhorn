import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Wrench, Hammer, Compass, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Leistungen & Gewerke | Eigene Fertigung & Montage",
  description:
    "Umfassender Leistungsumfang der Tischlerei Mehlhorn: Eigene Herstellung von Holzfenstern, Haustüren & Wintergärten sowie Handel und Fachmontage aller Bauelemente.",
};

const eigenfertigung = [
  {
    id: "holzfenster",
    title: "Holzfenster & Denkmalschutzfenster",
    subtitle: "Natürlichkeit, Wärme und höchste Dämmwerte",
    image: "/images/service-fenster.jpg",
    description:
      "Unsere handgefertigten Holzfenster vereinen traditionelle Handwerkskunst mit modernster Isolierglastechnologie. Ideal für anspruchsvolle Neubauten sowie detailgetreue denkmalgeschützte Sanierungen.",
    features: [
      "Auswahl edler Hölzer: Eiche massiv, Lärche, Kiefer, Meranti",
      "Modernste 2-fach und 3-fach Wärmeschutz- & Schallschutzverglasungen",
      "Spezielle, langlebige 4-fach Oberflächenbeschichtungen",
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
    title: "Hauseingangstüren (Massivholz & Verbund)",
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
    title: "Rollladen- & Klappladensysteme",
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
        <section className="bg-[#121212] text-white py-16 md:py-24 relative overflow-hidden">
          <div className="container-site relative z-10">
            <span className="text-label text-[#E5DECE] block mb-3">Leistungsspektrum</span>
            <h1 className="text-display text-4xl md:text-6xl max-w-3xl mb-6">
              Maßarbeit in Holz & professionelle Montage.
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
              Ob handgefertigte Einzelstücke aus unserer eigenen Werkstatt oder
              geprüfte Marken-Bauelemente – wir liefern Spitzenqualität für Ihr Zuhause.
            </p>
          </div>
        </section>

        {/* Section 1: Eigene Fertigung */}
        <section id="eigenfertigung" className="section-pad bg-white">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-3">
              <Hammer className="text-[#121212]" size={20} />
              <span className="text-label text-gray-500">Kernkompetenz · Meisterbetrieb</span>
            </div>
            <h2 className="text-display text-3xl md:text-5xl text-[#121212] mb-4">
              1. Eigene Herstellung
            </h2>
            <p className="text-gray-500 max-w-2xl text-lg mb-16">
              In unserer modern ausgestatteten Werkstatt fertigen wir individuelle Holzelemente nach Maß. Jedes Stück ein handwerkliches Meisterwerk.
            </p>

            {/* List of custom manufacturing items */}
            <div className="space-y-16">
              {eigenfertigung.map((item, index) => (
                <div
                  key={item.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-[#121212]/80 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
                        Eigene Fertigung
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">
                      {item.subtitle}
                    </span>
                    <h3 className="text-display text-2xl md:text-3xl text-[#121212] mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="space-y-2.5 mb-8">
                      {item.features.map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5 text-sm text-gray-700">
                          <CheckCircle2 size={16} className="text-[#121212] mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/kontakt?gewerk=${encodeURIComponent(item.gewerkParam)}`}
                      className="btn btn-primary text-sm inline-flex items-center gap-2"
                    >
                      Angebot für {item.title.split(" ")[0]} anfordern
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: Bauelemente & Montage */}
        <section id="bauelemente" className="section-pad bg-[#f9fafb] border-t border-gray-100">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-3">
              <Layers className="text-[#121212]" size={20} />
              <span className="text-label text-gray-500">Handel & Service</span>
            </div>
            <h2 className="text-display text-3xl md:text-5xl text-[#121212] mb-4">
              2. Bauelemente, Handel & Fachmontage
            </h2>
            <p className="text-gray-500 max-w-2xl text-lg mb-16">
              Wir arbeiten mit führenden Markenherstellern zusammen und garantieren den fachgerechten, normkonformen Einbau vor Ort.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {montage.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-[#121212] mb-3" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <div className="space-y-2 mb-8">
                      {item.features.map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle2 size={14} className="text-[#121212] flex-shrink-0" />
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
        <section className="bg-[#E5DECE]/40 py-16 border-t border-[#E5DECE]">
          <div className="container-site text-center max-w-3xl">
            <h3 className="text-3xl font-bold text-[#121212] mb-4" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Haben Sie Fragen zu speziellen Sondermaßen?
            </h3>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Jedes Gebäude ist einzigartig. Wir beraten Sie direkt vor Ort, nehmen präzise Aufmaße und erstellen Ihnen ein transparentes, unverbindliches Angebot.
            </p>
            <Link href="/kontakt" className="btn btn-primary">
              Kostenloses Beratungsgespräch vereinbaren
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
