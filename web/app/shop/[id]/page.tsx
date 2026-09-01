import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { products, getProductByIdOrSlug } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductByIdOrSlug(id);

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
  const product = getProductByIdOrSlug(id);

  if (!product) {
    notFound();
  }

  // Get 2 other products from same or other category as suggestions
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 2);

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
