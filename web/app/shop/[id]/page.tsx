import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { products, getProductByIdOrSlug, Product } from "@/lib/products";
import { client } from "@/sanity/lib/client";
import ProductDetailClient from "./ProductDetailClient";

export const revalidate = 30;
export const dynamicParams = true;

interface Props {
  params: Promise<{ id: string }>;
}

async function fetchProduct(idOrSlug: string): Promise<Product | null> {
  const cleanId = idOrSlug.replace(/^prod-/, "");
  const withProd = idOrSlug.startsWith("prod-") ? idOrSlug : `prod-${idOrSlug}`;

  // 1. ALWAYS query Sanity CMS FIRST so studio changes immediately reflect!
  try {
    const cms = await client.fetch(
      `*[_type == "catalogProduct" && (_id == $id || slug.current == $id || _id == $cleanId || _id == $withProd || slug.current == $cleanId)][0] {
        _id,
        title,
        "slug": coalesce(slug.current, _id),
        "category": coalesce(categoryRef->title, categoryRef->slug.current, category),
        woodType,
        dimensions,
        price,
        available,
        description,
        "image": images[0].asset->url,
        "galleryImages": images[].asset->url
      }`,
      { id: idOrSlug, cleanId, withProd }
    );

    if (cms) {
      const mainImg = cms.image || "/images/catalog-schneidebrett.jpg";
      const galleries = cms.galleryImages && cms.galleryImages.length > 0 ? cms.galleryImages : [mainImg];

      return {
        id: cms._id,
        slug: cms.slug || cms._id,
        category: (cms.category as any) || "deko",
        title: cms.title,
        subtitle: cms.woodType || "Massivholz Unikat",
        description: cms.description || "Handgefertigtes Werkstück aus unserer Meisterwerkstatt in Schönheide.",
        longDescription:
          cms.description ||
          "Jedes unserer handgefertigten Werkstücke entsteht aus erlesenem Massivholz mit viel Liebe zum Detail und meisterhafter Präzision.",
        dimensions: cms.dimensions || "Individuelle Maße",
        woodType: cms.woodType || "Massivholz",
        price: Number(cms.price) || 0,
        image: mainImg,
        galleryImages: galleries,
        available: cms.available !== false,
        tag: "Meisterwerkstatt",
        features: [
          "100% Handarbeit aus Meisterwerkstatt in Schönheide",
          "Ausgewähltes, formstabiles Massivholz",
          "Biologische, lebensmittelechte Oberflächenveredelung",
          "Nachhaltig, langlebig und jedes Stück ein Unikat",
        ],
      };
    }
  } catch (e) {
    // Sanity query failed, fallback below
  }

  // 2. Only if not found in Sanity CMS, fallback to local static data
  const local = getProductByIdOrSlug(idOrSlug);
  if (local) return local;

  const localClean = getProductByIdOrSlug(cleanId);
  if (localClean) return localClean;

  const matchByTitle = products.find(
    (p) =>
      p.id.toLowerCase() === idOrSlug.toLowerCase() ||
      p.slug.toLowerCase() === idOrSlug.toLowerCase() ||
      p.title.toLowerCase().replace(/\s+/g, "-") === idOrSlug.toLowerCase()
  );
  if (matchByTitle) return matchByTitle;

  return null;
}

export async function generateStaticParams() {
  try {
    const cmsIds = await client.fetch<string[]>(
      `*[_type == "catalogProduct"]._id`
    );
    if (cmsIds && cmsIds.length > 0) {
      return cmsIds.map((id) => ({ id }));
    }
  } catch {}

  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) {
    return {
      title: "Produkt nicht gefunden | Tischlerei Mehlhorn",
    };
  }

  return {
    title: `${product.title} | Shop & Deko | Tischlerei Mehlhorn`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) {
    notFound();
  }

  // Get other products from Sanity or local fallback as suggestions
  let relatedProducts: any[] = [];
  try {
    const cmsOthers = await client.fetch(
      `*[_type == "catalogProduct" && _id != $id && _id != $prodId][0..1] {
        _id,
        title,
        "slug": coalesce(slug.current, _id),
        price,
        woodType,
        dimensions,
        description,
        "image": images[0].asset->url
      }`,
      { id: product.id, prodId: `prod-${product.id}` }
    );
    if (cmsOthers && cmsOthers.length > 0) {
      relatedProducts = cmsOthers.map((o: any) => ({
        id: o._id,
        slug: o.slug,
        title: o.title,
        price: o.price,
        woodType: o.woodType,
        dimensions: o.dimensions,
        description: o.description,
        image: o.image || "/images/catalog-schneidebrett.jpg",
      }));
    }
  } catch {}

  if (relatedProducts.length === 0) {
    relatedProducts = products
      .filter((p) => p.id !== product.id && p.slug !== product.slug)
      .slice(0, 2);
  }

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28">
        <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      </main>
      <Footer />
    </>
  );
}
