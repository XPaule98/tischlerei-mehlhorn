"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/products";
import InquiryDrawer, { DrawerProduct } from "@/components/ui/InquiryDrawer";
import {
  ShoppingBag,
  Ruler,
  TreePine,
  Check,
  ArrowLeft,
  Truck,
  Store,
  Shield,
  Info,
  Lock,
} from "lucide-react";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const drawerProduct: DrawerProduct = {
    name: product.title,
    price: product.price,
    woodType: product.woodType,
    dimensions: product.dimensions,
    image: product.image,
  };

  return (
    <>
      {/* Breadcrumb Bar */}
      <div className="bg-[#F9F9F8] py-3 border-b border-[#E8E8E6]">
        <div className="container-site flex items-center gap-2 text-xs text-[#777777]">
          <Link href="/" className="hover:text-[#181818] transition-colors">
            Startseite
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#181818] transition-colors">
            Shop & Deko
          </Link>
          <span>/</span>
          <span className="text-[#181818] font-semibold">{product.title}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="py-10 md:py-16 bg-[#FFFFFF]">
        <div className="container-site">
          {/* Back button */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#777777] hover:text-[#181818] mb-8 transition-colors"
          >
            <ArrowLeft size={13} /> Zurück zum Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Product Image Showcase */}
            <div className="lg:col-span-7">
              <div className="relative rounded-lg overflow-hidden bg-[#F9F9F8] border border-[#E8E8E6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#181818]/90 text-white text-[11px] px-2.5 py-1 rounded font-medium">
                  {product.tag}
                </div>
              </div>
            </div>

            {/* Right: Product Info & Action */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-lg border border-[#E8E8E6]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D4F] block mb-1">
                {product.subtitle}
              </span>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#181818] mb-3 leading-snug">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-2 py-4 border-y border-[#E8E8E6] my-4">
                <span className="text-3xl sm:text-4xl font-bold text-[#181818]">
                  {product.price.toFixed(2).replace(".", ",")} €
                </span>
                <span className="text-xs text-[#777777]">
                  inkl. 19% MwSt.
                </span>
              </div>

              {/* Specs Box */}
              <div className="space-y-2.5 py-2 border-b border-[#E8E8E6] mb-6 text-xs sm:text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#666666] flex items-center gap-1.5">
                    <Ruler size={14} className="text-[#8C6D4F]" /> Maße:
                  </span>
                  <span className="font-semibold text-[#181818]">{product.dimensions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#666666] flex items-center gap-1.5">
                    <TreePine size={14} className="text-[#8C6D4F]" /> Holzart:
                  </span>
                  <span className="font-semibold text-[#181818]">{product.woodType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#666666] flex items-center gap-1.5">
                    <Shield size={14} className="text-[#8C6D4F]" /> Fertigung:
                  </span>
                  <span className="font-semibold text-[#181818]">Meisterwerkstatt Schönheide</span>
                </div>
              </div>

              {/* Action Button: Opens Locked Inquiry Template */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="btn btn-primary w-full text-sm py-3.5 mb-3 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag size={16} />
                Jetzt für dieses Werkstück anfragen
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-[#777777] mb-6">
                <Lock size={12} className="text-[#8C6D4F]" />
                <span>Werkstück ist fest im Anfrageformular hinterlegt</span>
              </div>

              {/* Delivery / Pickup options */}
              <div className="p-3.5 bg-[#F9F9F8] rounded border border-[#E8E8E6] space-y-2 text-xs text-[#555555]">
                <div className="flex items-start gap-2">
                  <Store size={14} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                  <span><strong>Selbstabholung:</strong> Kostenlos in der Werkstatt Schönheide.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Truck size={14} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                  <span><strong>Postversand:</strong> Sicher und versichert per Paketdienst.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Features Section */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#F9F9F8] p-6 sm:p-10 rounded-lg border border-[#E8E8E6]">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-craft-label block mb-1">Beschreibung</span>
                <h3 className="text-xl font-bold text-[#181818] mb-3">
                  Handwerkliche Details & Besonderheiten
                </h3>
                <p className="text-[#555555] text-sm leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              {product.careInstructions && (
                <div className="p-4 bg-white rounded border border-[#E8E8E6]">
                  <h4 className="text-sm font-bold text-[#181818] mb-1.5 flex items-center gap-1.5">
                    <Info size={14} className="text-[#8C6D4F]" /> Pflegehinweise
                  </h4>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {product.careInstructions}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <span className="text-craft-label block mb-1">Highlights</span>
              <h3 className="text-xl font-bold text-[#181818] mb-3">
                Produktmerkmale
              </h3>
              <ul className="space-y-2.5">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#444444]">
                    <Check size={14} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-craft-label block mb-1">Weitere Werkstücke</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#181818]">
                    Das könnte Sie auch interessieren
                  </h3>
                </div>
                <Link href="/shop" className="btn btn-outline-dark text-xs py-2 px-3">
                  Alle ansehen
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    className="craft-card p-5 flex flex-col sm:flex-row gap-5 items-center justify-between bg-white"
                  >
                    <div className="w-full sm:w-36 h-32 rounded overflow-hidden bg-[#F9F9F8] flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider block">
                        {rel.woodType}
                      </span>
                      <h4 className="text-base font-bold text-[#181818] mb-1">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-[#666666] mb-2">{rel.dimensions}</p>
                      <div className="text-lg font-bold text-[#181818] mb-2.5">
                        {rel.price.toFixed(2).replace(".", ",")} €
                      </div>
                      <Link
                        href={`/shop/${rel.id}`}
                        className="btn btn-outline-dark text-xs py-1.5 px-3"
                      >
                        Details ansehen
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Inquiry Drawer */}
      <InquiryDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        product={drawerProduct}
      />
    </>
  );
}
