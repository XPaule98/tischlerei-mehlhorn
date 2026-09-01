import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import { client } from "@/sanity/lib/client";
import { SHOP_PAGE_QUERY, PRODUCTS_QUERY, PRODUCT_CATEGORIES_QUERY } from "@/sanity/lib/queries";
import ShopClient, { ShopProduct, ShopCategory } from "./ShopClient";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Shop & Deko-Katalog | Tischlerei Ronny Mehlhorn",
  description:
    "Handgefertigte Massivholz-Schneidebretter und schwebende Wandregale aus heimischer Eiche aus der Meisterwerkstatt Tischlerei Mehlhorn in Schönheide.",
};

export default async function ShopPage() {
  let cmsHeaderData = null;
  let cmsProducts: ShopProduct[] | null = null;
  let cmsCategories: ShopCategory[] | null = null;

  try {
    [cmsHeaderData, cmsProducts, cmsCategories] = await Promise.all([
      client.fetch(SHOP_PAGE_QUERY, {}, { next: { revalidate: 30 } }),
      client.fetch(PRODUCTS_QUERY, {}, { next: { revalidate: 30 } }),
      client.fetch(PRODUCT_CATEGORIES_QUERY, {}, { next: { revalidate: 30 } }),
    ]);
  } catch (e) {
    // Fallback
  }

  const title = cmsHeaderData?.title || "Dekoartikel & handgefertigte Unikate.";
  const subtitle =
    cmsHeaderData?.subtitle ||
    "Jedes Stück wird in traditioneller Handarbeit aus ausgewähltem Massivholz gefertigt. Unverbindliche Anfrage mit Postversand oder Abholung.";
  const headerImageUrl = cmsHeaderData?.headerImageUrl || "/images/catalog-schneidebrett.jpg";

  return (
    <>
      <Header />
      <main>
        {/* Minimalist PageHeader with Breadcrumb */}
        <PageHeader
          breadcrumb="Shop & Deko-Katalog"
          title={title}
          subtitle={subtitle}
          headerImageUrl={headerImageUrl}
        />

        {/* Interactive Shop Catalog with live CMS products & categories */}
        <ShopClient
          initialProducts={cmsProducts && cmsProducts.length > 0 ? cmsProducts : undefined}
          categories={cmsCategories && cmsCategories.length > 0 ? cmsCategories : undefined}
        />
      </main>
      <Footer />
    </>
  );
}
