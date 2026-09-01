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
  ShieldCheck,
  Sparkles,
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
      <div className="bg-[#F3ECE2] py-3.5 border-b border-[#E6DED4]">
        <div className="container-site flex items-center gap-2 text-xs text-[#6B635B]">
          <Link href="/" className="hover:text-[#1E1A17] transition-colors">
            Startseite
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#1E1A17] transition-colors">
            Shop & Deko
          </Link>
          <span>/</span>
          <span className="text-[#1E1A17] font-semibold">{product.title}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="section-pad bg-[#FAF8F5]">
        <div className="container-site">
          {/* Back button */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B635B] hover:text-[#1E1A17] mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Zurück zur Shop-Übersicht
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Product Image Showcase */}
            <div className="lg:col-span-7">
              <div className="relative rounded-lg overflow-hidden bg-[#F3ECE2] border border-[#E6DED4] shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[450px] md:h-[550px] object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#1E1A17]/85 backdrop-blur-sm text-white text-xs px-3 py-1 rounded font-medium">
                  {product.tag}
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-[#1E1A17] text-xs px-3 py-1 rounded font-medium border border-[#E6DED4]">
                  Handgefertigtes Werkstück
                </div>
              </div>
            </div>

            {/* Right: Product Info & Inquiry Form Action */}
            <div className="lg:col-span-5 bg-white p-8 rounded-lg border border-[#E6DED4] shadow-sm">
              <span className="text-craft-label text-[#8C6D4F] block mb-2">
                {product.subtitle}
              </span>

              <h1 className="font-serif-heading text-3xl sm:text-4xl text-[#1E1A17] font-normal mb-3">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-2 py-4 border-y border-[#E6DED4] my-5">
                <span className="font-serif-heading text-3xl md:text-4xl font-bold text-[#1E1A17]">
                  {product.price.toFixed(2).replace(".", ",")} €
                </span>
                <span className="text-xs text-[#8C8277]">
                  inkl. 19% MwSt., zzgl. Versand oder Abholung
                </span>
              </div>

              {/* Specs Box */}
              <div className="space-y-3 py-3 border-b border-[#E6DED4] mb-6 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B635B] flex items-center gap-2">
                    <Ruler size={15} className="text-[#8C6D4F]" /> Maße:
                  </span>
                  <span className="font-semibold text-[#1E1A17]">{product.dimensions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B635B] flex items-center gap-2">
                    <TreePine size={15} className="text-[#8C6D4F]" /> Holzart:
                  </span>
                  <span className="font-semibold text-[#1E1A17]">{product.woodType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B635B] flex items-center gap-2">
                    <ShieldCheck size={15} className="text-[#8C6D4F]" /> Fertigung:
                  </span>
                  <span className="font-semibold text-[#1E1A17]">Meisterwerkstatt Mehlhorn</span>
                </div>
              </div>

              {/* Action Button: Opens Locked Inquiry Template */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="btn btn-wood w-full text-base py-4 mb-4 flex items-center justify-center gap-2.5 shadow-md"
              >
                <ShoppingBag size={18} />
                Jetzt für dieses Werkstück anfragen
              </button>

              <div className="flex items-center justify-center gap-1.5 text-xs text-[#6B635B] mb-6">
                <Lock size={12} className="text-[#8C6D4F]" />
                <span>Werkstück wird automatisch im Formular fixiert</span>
              </div>

              {/* Delivery / Pickup options */}
              <div className="p-4 bg-[#FAF8F5] rounded border border-[#E6DED4] space-y-2.5 text-xs text-[#5E564E]">
                <div className="flex items-start gap-2.5">
                  <Store size={15} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Selbstabholung:</strong> Kostenlos in unserer Werkstatt nach Vereinbarung.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Truck size={15} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>Postversand:</strong> Sicher und versichert verpackt per Paketdienst.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Features Section */}
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-8 md:p-12 rounded-lg border border-[#E6DED4]">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-craft-label block mb-2">Beschreibung</span>
                <h3 className="font-serif-heading text-2xl text-[#1E1A17] font-medium mb-4">
                  Handwerkliche Details & Besonderheiten
                </h3>
                <p className="text-[#5E564E] text-base leading-relaxed">
                  {product.longDescription}
                </p>
              </div>

              {product.careInstructions && (
                <div className="p-5 bg-[#FAF8F5] rounded border border-[#E6DED4]">
                  <h4 className="font-serif-heading text-lg font-medium text-[#1E1A17] mb-2 flex items-center gap-2">
                    <Info size={16} className="text-[#8C6D4F]" /> Pflegehinweise
                  </h4>
                  <p className="text-xs text-[#6B635B] leading-relaxed">
                    {product.careInstructions}
                  </p>
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              <span className="text-craft-label block mb-2">Highlights</span>
              <h3 className="font-serif-heading text-2xl text-[#1E1A17] font-medium mb-4">
                Produktmerkmale
              </h3>
              <ul className="space-y-3">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#4A433D]">
                    <Check size={16} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="text-craft-label block mb-1">Weitere Werkstücke</span>
                  <h3 className="font-serif-heading text-2xl md:text-3xl text-[#1E1A17] font-normal">
                    Das könnte Sie auch interessieren
                  </h3>
                </div>
                <Link href="/shop" className="btn btn-outline-dark text-xs">
                  Alle ansehen
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    className="craft-card rounded-lg p-6 flex flex-col sm:flex-row gap-6 items-center justify-between"
                  >
                    <div className="w-full sm:w-40 h-36 rounded overflow-hidden bg-[#F3ECE2] flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-[#8C6D4F] uppercase tracking-wider block">
                        {rel.woodType}
                      </span>
                      <h4 className="font-serif-heading text-xl text-[#1E1A17] font-medium mb-1">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-[#6B635B] mb-3">{rel.dimensions}</p>
                      <div className="font-serif-heading text-xl font-bold text-[#1E1A17] mb-3">
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

      {/* Inquiry Drawer with fixed product */}
      <InquiryDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        product={drawerProduct}
      />
    </>
  );
}
