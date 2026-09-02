import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import LeistungenClient, { ServiceItemData } from "./LeistungenClient";
import { client } from "@/sanity/lib/client";
import { SERVICES_PAGE_QUERY, SERVICES_QUERY } from "@/sanity/lib/queries";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Leistungen & Gewerke | Tischlerei Ronny Mehlhorn",
  description:
    "Eigene Herstellung von Holzfenstern, Holz-Aluminium-Fenstern (Gutmann Mira), Massivholz-Haustüren und Wintergärten sowie Fachmontage von Kunststofffenstern (VEKA, Gealan) in Schönheide.",
};

const fallbackServices: ServiceItemData[] = [
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
    imageUrl: "/images/service-fenster.jpg",
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
    imageUrl: "/images/real/tuer-4.jpg",
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
    imageUrl: "/images/real/gebaeude-1.jpg",
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
    imageUrl: "/images/real/fenster-holz-2.jpg",
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
  let cmsServices: ServiceItemData[] | null = null;

  try {
    [cmsHeaderData, cmsServices] = await Promise.all([
      client.fetch(SERVICES_PAGE_QUERY, {}, { next: { revalidate: 30 } }),
      client.fetch(SERVICES_QUERY, {}, { next: { revalidate: 30 } }),
    ]);
  } catch (e) {
    // Fallback
  }

  const title = cmsHeaderData?.title || "Leistungen & Gewerke";
  const subtitle =
    cmsHeaderData?.subtitle ||
    "Eigene Herstellung im Erzgebirge kombiniert mit Fachmontage führender Bauelemente-Marken.";
  const headerImageUrl = cmsHeaderData?.headerImageUrl || "/images/real/fenster-holzalu-buendig.jpg";

  const allServices =
    cmsServices && cmsServices.length > 0 ? cmsServices : fallbackServices;

  return (
    <>
      <Header />
      <main className="bg-[#FFFFFF]">
        {/* Standardized Minimalist PageHeader */}
        <PageHeader
          title={title}
          subtitle={subtitle}
          headerImageUrl={headerImageUrl}
        />

        {/* Expandable Accordion View for maximum overview and clarity */}
        <LeistungenClient services={allServices} />

        {/* Beratungsbanner */}
        <section className="bg-[#F9F9F8] py-16 border-t border-[#E8E8E6]">
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
