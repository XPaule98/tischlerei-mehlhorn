"use client";

import { useState } from "react";
import Link from "next/link";
import InquiryDrawer, { DrawerProduct } from "@/components/ui/InquiryDrawer";
import { products, type Product } from "@/lib/products";
import { ShoppingBag, Ruler, TreePine, Sparkles, Store, Truck } from "lucide-react";

export default function ShopClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("alle");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DrawerProduct | null>(null);

  const filtered =
    selectedCategory === "alle"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleInquiry = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedProduct({
      name: product.title,
      price: product.price,
      woodType: product.woodType,
      dimensions: product.dimensions,
      image: product.image,
    });
    setDrawerOpen(true);
  };

  return (
    <>
      {/* Benefits Bar */}
      <section className="bg-[#F9F9F8] py-3.5 border-b border-[#E8E8E6]">
        <div className="container-site grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#181818]">
            <Sparkles size={13} className="text-[#8C6D4F]" />
            100% Massivholz & Handarbeit
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#181818]">
            <Store size={13} className="text-[#8C6D4F]" />
            Abholung in der Werkstatt Schönheide
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-[#181818]">
            <Truck size={13} className="text-[#8C6D4F]" />
            Versicherter Postversand
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="py-12 md:py-16 bg-[#FFFFFF]">
        <div className="container-site">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 md:mb-12">
            {[
              { value: "alle", label: "Alle Werkstücke" },
              { value: "schneidebretter", label: "Schneidebretter" },
              { value: "regale", label: "Wandregale & Borde" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedCategory(tab.value)}
                className={`px-4 sm:px-5 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === tab.value
                    ? "bg-[#181818] text-white shadow-xs"
                    : "bg-white text-[#555555] border border-[#E8E8E6] hover:bg-[#F9F9F8]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="craft-card p-5 sm:p-6 flex flex-col justify-between group h-full bg-white shadow-xs hover:shadow-sm"
              >
                <div>
                  <Link
                    href={`/shop/${product.id}`}
                    className="block relative h-56 sm:h-64 rounded overflow-hidden mb-4 bg-[#F9F9F8]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#181818]/90 text-white text-[11px] px-2.5 py-1 rounded font-medium">
                      {product.tag}
                    </div>
                  </Link>

                  <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider block mb-1">
                    {product.woodType}
                  </span>

                  <Link href={`/shop/${product.id}`} className="block hover:underline">
                    <h2 className="text-xl font-bold text-[#181818] mb-2 leading-snug">
                      {product.title}
                    </h2>
                  </Link>

                  <p className="text-[#555555] text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="space-y-1 border-t border-[#F2F2F0] pt-3 mb-4 text-xs text-[#666666]">
                    <div className="flex items-center gap-1.5">
                      <Ruler size={13} className="text-[#8C6D4F] flex-shrink-0" />
                      <span>Maße: <strong className="text-[#181818]">{product.dimensions}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TreePine size={13} className="text-[#8C6D4F] flex-shrink-0" />
                      <span>Holz: <strong className="text-[#181818]">{product.woodType}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-3.5 border-t border-[#F2F2F0] mt-auto">
                  <div className="flex items-baseline justify-between gap-2 mb-3">
                    <span className="text-2xl font-bold text-[#181818] whitespace-nowrap">
                      {product.price.toFixed(2).replace(".", ",")} €
                    </span>
                    <span className="text-[11px] text-[#777777] whitespace-nowrap">
                      inkl. 19% MwSt.
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/shop/${product.id}`}
                      className="btn btn-outline-dark text-xs py-2 px-2 w-full text-center flex items-center justify-center font-medium"
                    >
                      Details
                    </Link>
                    <button
                      onClick={(e) => handleInquiry(product, e)}
                      className="btn btn-primary text-xs py-2 px-2 w-full flex items-center justify-center gap-1 font-medium cursor-pointer"
                    >
                      <ShoppingBag size={13} />
                      Anfragen
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom order notice */}
          <div className="mt-14 bg-[#F9F9F8] border border-[#E8E8E6] rounded-lg p-6 sm:p-8 max-w-xl mx-auto text-center">
            <h3 className="text-lg sm:text-xl font-bold text-[#181818] mb-1.5">
              Individuelles Wunschmaß?
            </h3>
            <p className="text-[#555555] text-xs sm:text-sm leading-relaxed mb-4">
              Sie wünschen ein Schneidebrett oder Regal in ganz bestimmten Maßen oder aus einer speziellen Holzart?
            </p>
            <button
              onClick={() => {
                setSelectedProduct({
                  name: "Sonderanfertigung nach Maß",
                });
                setDrawerOpen(true);
              }}
              className="btn btn-outline-dark text-xs py-2 px-4 font-medium cursor-pointer"
            >
              Sondermaß anfragen
            </button>
          </div>
        </div>
      </section>

      {/* SEO Section */}
      <section className="py-12 md:py-16 bg-[#F9F9F8] border-t border-[#E8E8E6]">
        <div className="container-site max-w-4xl">
          <span className="text-craft-label block mb-1">Werkstattwissen & Holzkunde</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#181818] mb-6">
            Massivholz-Dekoartikel aus Meisterhand
          </h2>

          <div className="space-y-5 text-[#555555] text-xs sm:text-sm leading-relaxed">
            <p>
              In unserer Tischlerei in Schönheide entstehen nicht nur Fenster, Türen und Wintergärten, sondern auch hochwertige 
              <strong> handgefertigte Wohnaccessoires und Küchenwerkstücke</strong>. Jedes Schneidebrett und jedes 
              schwebende Wandregal wird aus ausgesuchten Hölzern gefertigt.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-5 border-y border-[#E8E8E6]">
              <div>
                <h3 className="text-base font-bold text-[#181818] mb-1.5">
                  Warum Hirnholz für Schneidebretter?
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Bei Hirnholz-Schneidebrettern stehen die Holzfasern vertikal. Das schont Ihre wertvollen Küchenmesser, minimiert Schnittspuren und verleiht dem Brett eine unvergleichlich lange Lebensdauer.
                </p>
              </div>
              <div>
                <h3 className="text-base font-bold text-[#181818] mb-1.5">
                  Schwebende Wandregale mit Baumkante
                </h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  Unsere Eichenwandborde behalten die natürliche Außenkontur des Stammes. Die mitgelieferte unsichtbare Verankerung sorgt für eine tragfeste Wandbefestigung.
                </p>
              </div>
            </div>

            <p>
              <strong>Natürliche Oberflächen:</strong> Alle Küchenbretter werden ausschließlich mit lebensmittelechtem Leinöl behandelt.
            </p>
          </div>
        </div>
      </section>

      <InquiryDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        product={selectedProduct}
      />
    </>
  );
}
