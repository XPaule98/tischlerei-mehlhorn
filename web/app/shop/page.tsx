import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import { client } from "@/sanity/lib/client";
import { SHOP_PAGE_QUERY } from "@/sanity/lib/queries";
import ShopClient from "./ShopClient";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Shop & Deko-Katalog | Tischlerei Ronny Mehlhorn",
  description:
    "Handgefertigte Massivholz-Schneidebretter und schwebende Wandregale aus heimischer Eiche aus der Meisterwerkstatt Tischlerei Mehlhorn in Schönheide.",
};

export default async function ShopPage() {
  let cmsData = null;
  try {
    cmsData = await client.fetch(SHOP_PAGE_QUERY, {}, { next: { revalidate: 30 } });
  } catch (e) {
    // Fallback
  }

  const badge = cmsData?.badge || "Aus unserer Meisterwerkstatt in Schönheide";
  const title = cmsData?.title || "Dekoartikel & handgefertigte Unikate.";
  const subtitle =
    cmsData?.subtitle ||
    "Jedes Stück wird in traditioneller Handarbeit aus ausgewähltem Massivholz gefertigt. Unverbindliche Anfrage mit Postversand oder Abholung.";
  const headerImageUrl = cmsData?.headerImageUrl || "/images/catalog-schneidebrett.jpg";

  return (
    <>
      <Header />
      <main>
        {/* Dynamic PageHeader with Image Background */}
        <PageHeader
          breadcrumb="Shop & Deko-Katalog"
          badge={badge}
          title={title}
          subtitle={subtitle}
          headerImageUrl={headerImageUrl}
        />

        {/* Interactive Shop Catalog */}
        <ShopClient />
      </main>
      <Footer />
    </>
  );
}
