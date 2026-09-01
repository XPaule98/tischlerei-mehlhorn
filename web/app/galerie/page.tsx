import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import { client } from "@/sanity/lib/client";
import { GALLERY_PAGE_QUERY, GALLERY_ITEMS_QUERY } from "@/sanity/lib/queries";
import GalerieClient from "./GalerieClient";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Galerie & Referenzen | Tischlerei Ronny Mehlhorn",
  description:
    "Echte Fotos handgefertigter Fenster, Massivholz-Haustüren, Baustellen und Wintergärten aus der Meisterwerkstatt Tischlerei Mehlhorn in Schönheide.",
};

export default async function GaleriePage() {
  let cmsData = null;
  let galleryProjects = null;

  try {
    [cmsData, galleryProjects] = await Promise.all([
      client.fetch(GALLERY_PAGE_QUERY, {}, { next: { revalidate: 30 } }),
      client.fetch(GALLERY_ITEMS_QUERY, {}, { next: { revalidate: 30 } }),
    ]);
  } catch (e) {
    // Fallback gracefully
  }

  const badge = cmsData?.badge || "Meisterbetrieb Schönheide · Inh. Ronny Mehlhorn";
  const title = cmsData?.title || "Galerie & Referenzen";
  const subtitle =
    cmsData?.subtitle ||
    "Einblicke in unsere Meisterwerkstatt, Fertigung und Baustellen im Erzgebirge.";
  const headerImageUrl = cmsData?.headerImageUrl || "/images/real/wintergarten-1.jpg";

  return (
    <>
      <Header />
      <main>
        {/* Standardized 100% Consistent PageHeader */}
        <PageHeader
          breadcrumb="Galerie & Referenzen"
          badge={badge}
          title={title}
          subtitle={subtitle}
          headerImageUrl={headerImageUrl}
        />

        {/* Categorized Projects Grid & Lightbox */}
        <GalerieClient initialProjects={galleryProjects} />
      </main>
      <Footer />
    </>
  );
}
