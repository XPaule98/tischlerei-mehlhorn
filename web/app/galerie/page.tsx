import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import { client } from "@/sanity/lib/client";
import { GALLERY_PAGE_QUERY } from "@/sanity/lib/queries";
import GalerieClient from "./GalerieClient";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Galerie & Referenzen | Tischlerei Ronny Mehlhorn",
  description:
    "Echte Fotos handgefertigter Fenster, Massivholz-Haustüren und Wintergärten aus der Meisterwerkstatt Tischlerei Mehlhorn in Schönheide.",
};

export default async function GaleriePage() {
  let cmsData = null;
  try {
    cmsData = await client.fetch(GALLERY_PAGE_QUERY, {}, { next: { revalidate: 30 } });
  } catch (e) {
    // Fallback
  }

  const badge = cmsData?.badge || "Originalaufnahmen aus Schönheide";
  const title = cmsData?.title || "Galerie & Referenzen";
  const subtitle =
    cmsData?.subtitle ||
    "Einblicke in maßgefertigte Holzfenster, Holz-Alu-Systeme, Haustüren und Wintergärten aus unserer Werkstatt.";
  const headerImageUrl = cmsData?.headerImageUrl || "/images/real/wintergarten-1.jpg";

  return (
    <>
      <Header />
      <main>
        {/* Dynamic PageHeader with Image Background */}
        <PageHeader
          breadcrumb="Galerie & Referenzen"
          badge={badge}
          title={title}
          subtitle={subtitle}
          headerImageUrl={headerImageUrl}
        />

        {/* Interactive Before / After Slider */}
        <BeforeAfterSlider
          beforeSrc="/images/real/werkstatt-2.jpg"
          afterSrc="/images/real/wintergarten-1.jpg"
          beforeLabel="Werkstattfertigung Schönheide"
          afterLabel="Montage beim Kunden"
        />

        {/* Interactive Filterable Gallery */}
        <GalerieClient />
      </main>
      <Footer />
    </>
  );
}
