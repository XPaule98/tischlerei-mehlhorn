import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import { client } from "@/sanity/lib/client";
import { SERVICES_PAGE_QUERY, SERVICES_QUERY } from "@/sanity/lib/queries";
import { Check, ArrowRight } from "lucide-react";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Leistungen & Angebote | Tischlerei Ronny Mehlhorn",
  description:
    "Eigene Herstellung von Holzfenstern, Holz-Aluminium-Fenstern (Gutmann Mira), Massivholz-Haustüren und Wintergärten sowie Fachmontage von Kunststofffenstern (VEKA, Gealan) in Schönheide.",
};

interface ServiceData {
  _id: string;
  title: string;
  subtitle?: string;
  category: "eigenfertigung" | "bauelemente" | string;
  description?: string;
  features?: string[];
  imageUrl?: string;
  order?: number;
}

const fallbackServices: ServiceData[] = [
  {
    _id: "service-holzfenster",
    title: "Holzfenster aus eigener Produktion",
    subtitle: "Maßanfertigung für Neubau, Altbau & Denkmalschutz",
    category: "eigenfertigung",
    imageUrl: "/images/real/fenster-holz-1.jpg",
    description:
      "Unsere handgefertigten Holzfenster entstehen in eigener Werkstatt in Schönheide. Sie verbinden traditionelle Zimmermannskunst mit modernsten Isolierverglasungen und denkmalgerechten Zierprofilen.",
    features: [
      "Auswahl edler Hölzer: Eiche massiv, Lärche, Kiefer",
      "2-fach und 3-fach Wärmeschutz- & Schallschutzverglasung",
      "Langlebige, umweltschonende Mehrschicht-Oberflächenlasuren",
      "Marken-Sicherheitsbeschläge mit Einbruchhemmung",
      "Historische Kämpfer, Sprossen und Zierleisten nach Denkmalschutz",
    ],
  },
  {
    _id: "service-holzalu",
    title: "Holz-Aluminium-Fenster (System Gutmann Mira)",
    subtitle: "Flächenbündige & flächenversetzte Ausführung",
    category: "eigenfertigung",
    imageUrl: "/images/real/fenster-holzalu-buendig.jpg",
    description:
      "Die Premium-Kombination aus eigener Fertigung: Innen natürliche Holzatmosphäre, außen eine witterungsbeständige Aluminium-Vorsatzschale im bewährten System Gutmann Mira. Nie wieder streichen.",
    features: [
      "Flächenbündige und flächenversetzte Ausführungsvarianten",
      "Original Profilsystem GUTMANN MIRA für dauerhaften Wetterschutz",
      "Aluminiumschalen in allen RAL-Farbtönen pulverbeschichtet",
      "Verdeckt liegende Beschläge und schlanke Profilansichten",
      "Maximale Energieeffizienz für Niedrigenergie- und Passivhäuser",
    ],
  },
  {
    _id: "service-haustueren",
    title: "Hauseingangstüren aus eigener Produktion",
    subtitle: "Massivholz & individuelle Unikate nach Kundenwunsch",
    category: "eigenfertigung",
    imageUrl: "/images/real/tuer-5.jpg",
    description:
      "Jede Haustür ist eine maßgefertigte Visitenkarte für Ihr Haus. In unserer Werkstatt fertigen wir individuelle Holztüren mit gefrästen Kassetten, Lichtausschnitten und hochsicherer Mehrfachverriegelung.",
    features: [
      "Massivholzkonstruktion oder formstabile Verbundplatten",
      "Sicherheits-Mehrfachverriegelungen mit Schwenkriegeln (RC2 / RC3)",
      "Elektronische Zutrittskontrollen (Fingerprint, Code, Smart Home)",
      "Thermisch getrennte Bodenschwellen für perfekte Zugluftdämmung",
      "Individuelle Fräsungen, Sprossen und Oberflächen nach Wunsch",
    ],
  },
  {
    _id: "service-wintergaerten",
    title: "Wintergärten & Glasbauten",
    subtitle: "Lichtdurchfluteter Wohnraum zu jeder Jahreszeit",
    category: "eigenfertigung",
    imageUrl: "/images/real/wintergarten-1.jpg",
    description:
      "Individuell geplante Kalt- und Warmwintergärten in tragender Holz- oder Holz-Aluminium-Konstruktion. Wir planen die Statik, fertigen die Tragglieder in Schönheide und montieren Ihre Glasoase schlüsselfertig.",
    features: [
      "Tragwerksplanung und präzise statische Berechnung",
      "Sonnenschutz- und selbstreinigendes Isolierglas im Dachbereich",
      "Großflächige Hebe-Schiebetüren für barrierefreie Öffnung in den Garten",
      "Integrierte Belüftungs- und Beschattungssysteme",
      "Komplette Montage inklusive fachgerechter Bauanschlussabdichtung",
    ],
  },
  {
    _id: "service-kunststoff",
    title: "Kunststofffenster (VEKA & GEALAN)",
    subtitle: "Markenprofile mit hohem Schall- und Wärmeschutz",
    category: "bauelemente",
    description:
      "Modernste Mehrkammer-Kunststofffenster führender Profilsysteme wie VEKA und Gealan. Pflegeleicht, hochisolierend und in vielen Dekorfarben erhältlich.",
    features: [
      "Markenprofile VEKA & Gealan",
      "Schallschutzklassen 1 bis 5",
      "RAL-zertifizierte Fachmontage durch unser Team",
    ],
  },
  {
    _id: "service-innentueren",
    title: "Innentüren & Zargensysteme",
    subtitle: "Echtholz, CPL & Ganzglastüren",
    category: "bauelemente",
    description:
      "Von der klassischen Weißlacktür über hochwertige Echtholzfurniere bis hin zu modernen Ganzglastüren und Schiebetürsystemen.",
    features: [
      "CPL-, Furnier- und Massivholztüren",
      "Ganzglastüren mit Edelstahlbeschlägen",
      "Passgenaue Zargenmontage",
    ],
  },
  {
    _id: "service-tore",
    title: "Garagentore & Antriebe",
    subtitle: "Sektional- und Rolltore mit Funksteuerung",
    category: "bauelemente",
    description:
      "Wärmegedämmte Sektionaltore und Rolltore führender Hersteller inklusive leiser Funk-Elektroantriebe.",
    features: [
      "Sektionaltore & Schwingtore",
      "Sicherheits-Abschaltautomatik",
      "Handsender & Smart-Home-Bedienung",
    ],
  },
  {
    _id: "service-rollladen",
    title: "Beschattungen & Rollladensysteme",
    subtitle: "Sonnen-, Sicht- und Einbruchschutz",
    category: "bauelemente",
    description:
      "Vorbau- und Aufsatzrollladen, Klappläden und Insektenschutzgitter für zuverlässigen Sonnen-, Sicht- und Einbruchschutz.",
    features: [
      "Aluminium- & Kunststofflamellen",
      "Funk- und Zeitschaltuhrmotorisierung",
      "Integrierbare Insektenschutzrollos",
    ],
  },
];

export default async function LeistungenPage() {
  let cmsHeaderData = null;
  let cmsServices: ServiceData[] | null = null;

  try {
    [cmsHeaderData, cmsServices] = await Promise.all([
      client.fetch(SERVICES_PAGE_QUERY, {}, { next: { revalidate: 30 } }),
      client.fetch(SERVICES_QUERY, {}, { next: { revalidate: 30 } }),
    ]);
  } catch (e) {
    // Fallback
  }

  const badge = cmsHeaderData?.badge || "Meisterbetrieb Schönheide · Inh. Ronny Mehlhorn";
  const title = cmsHeaderData?.title || "Leistungen & Gewerke";
  const subtitle =
    cmsHeaderData?.subtitle ||
    "Eigene Herstellung im Erzgebirge kombiniert mit Fachmontage führender Bauelemente-Marken.";
  const headerImageUrl = cmsHeaderData?.headerImageUrl || "/images/real/fenster-holzalu-buendig.jpg";

  const allServices =
    cmsServices && cmsServices.length > 0 ? cmsServices : fallbackServices;

  // Split by category
  const eigenfertigung = allServices.filter(
    (s) => s.category === "eigenfertigung" || !s.category
  );
  const bauelemente = allServices.filter((s) => s.category === "bauelemente");

  return (
    <>
      <Header />
      <main>
        {/* Standardized 100% Consistent PageHeader */}
        <PageHeader
          breadcrumb="Leistungen & Gewerke"
          badge={badge}
          title={title}
          subtitle={subtitle}
          headerImageUrl={headerImageUrl}
        />

        {/* Section 1: Eigene Fertigung */}
        {eigenfertigung.length > 0 && (
          <section className="py-16 md:py-20 bg-[#FFFFFF]">
            <div className="container-site">
              <div className="mb-12 pb-3.5 border-b border-[#E8E8E6]">
                <span className="text-craft-label block mb-1">Tradition & Präzision</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181818] tracking-tight">
                  Eigene Herstellung in Schönheide
                </h2>
              </div>

              <div className="space-y-12 md:space-y-16">
                {eigenfertigung.map((item, index) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-[#F9F9F8] p-6 sm:p-10 rounded-xl border border-[#E8E8E6]"
                  >
                    {/* Image */}
                    {item.imageUrl && (
                      <div className={`lg:col-span-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                        <div className="relative rounded-lg overflow-hidden bg-white border border-[#E8E8E6] shadow-xs">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-[300px] sm:h-[360px] object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-[#181818]/90 text-white text-[11px] px-2.5 py-1 rounded font-medium backdrop-blur-xs">
                            Eigene Meisterfertigung
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className={`${item.imageUrl ? "lg:col-span-6" : "lg:col-span-12"} ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      {item.subtitle && (
                        <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider block mb-1">
                          {item.subtitle}
                        </span>
                      )}
                      <h3 className="text-2xl sm:text-3xl font-bold text-[#181818] mb-3 leading-snug">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-[#555555] text-sm sm:text-base leading-relaxed mb-5">
                          {item.description}
                        </p>
                      )}

                      {item.features && item.features.length > 0 && (
                        <div className="space-y-2 mb-6">
                          {item.features.map((feat, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#444444]">
                              <Check size={14} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <Link
                        href={`/kontakt?gewerk=${encodeURIComponent(item.title)}`}
                        className="btn btn-primary text-xs sm:text-sm inline-flex items-center gap-1.5"
                      >
                        Angebot anfordern
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Section 2: Bauelemente & Montage */}
        {bauelemente.length > 0 && (
          <section className="py-16 md:py-20 bg-[#F9F9F8] border-t border-[#E8E8E6]">
            <div className="container-site">
              <div className="mb-12 pb-3.5 border-b border-[#E8E8E6]">
                <span className="text-craft-label block mb-1">Geprüfte Markenqualität</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181818] tracking-tight">
                  Bauelemente & Montageservice
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {bauelemente.map((item) => (
                  <div
                    key={item._id}
                    className="craft-card p-6 sm:p-8 flex flex-col justify-between bg-white"
                  >
                    <div>
                      {item.subtitle && (
                        <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider block mb-1">
                          {item.subtitle}
                        </span>
                      )}
                      <h3 className="text-xl sm:text-2xl font-bold text-[#181818] mb-2">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-[#555555] text-xs sm:text-sm leading-relaxed mb-4">
                          {item.description}
                        </p>
                      )}
                      {item.features && item.features.length > 0 && (
                        <div className="space-y-1.5 mb-6">
                          {item.features.map((f, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#444444]">
                              <Check size={13} className="text-[#8C6D4F] flex-shrink-0" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/kontakt?gewerk=${encodeURIComponent(item.title)}`}
                      className="btn btn-outline-dark text-xs py-2.5 px-4 w-full flex items-center justify-center gap-1.5 font-medium"
                    >
                      Angebot anfragen
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Beratungsbanner */}
        <section className="bg-white py-16 border-t border-[#E8E8E6]">
          <div className="container-site text-center max-w-2xl">
            <span className="text-craft-label block mb-1">Aufmaß & Beratung</span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#181818] mb-2.5">
              Sonderanfertigung oder Altbausanierung?
            </h3>
            <p className="text-[#555555] text-xs sm:text-sm mb-6 leading-relaxed">
              Wir beraten Sie persönlich in Schönheide und der gesamten Region Erzgebirge / Vogtland.
            </p>
            <Link href="/kontakt" className="btn btn-primary text-xs sm:text-sm py-3 px-6">
              Kostenlose Vor-Ort-Beratung anfragen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
