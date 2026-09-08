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

import { fallbackServices } from "./fallbackServices";

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
        <section className="py-10 sm:py-14 bg-white">
          <div className="container-site max-w-5xl">
            <LeistungenClient services={allServices} />
          </div>
        </section>

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
