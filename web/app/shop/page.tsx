"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InquiryDrawer, { DrawerProduct } from "@/components/ui/InquiryDrawer";
import { products, type Product } from "@/lib/products";
import { ShoppingBag, Ruler, TreePine, ArrowRight, ShieldCheck, Truck, Store, Sparkles } from "lucide-react";

export default function ShopPage() {
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
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="bg-[#1C1815] text-[#FAF8F5] py-20 md:py-28 relative overflow-hidden">
          <div className="container-site relative z-10">
            <span className="text-craft-label text-[#D4B28C] block mb-3">
              Aus unserer Meisterwerkstatt
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl md:text-6xl max-w-3xl mb-6 font-normal leading-tight">
              Dekoartikel & handgefertigte Unikate.
            </h1>
            <p className="text-[#D6CCC0] text-lg md:text-xl max-w-2xl leading-relaxed">
              Jedes Stück wird in traditioneller Handarbeit aus ausgewähltem Massivholz gefertigt.
              Unverbindliche Anfrage mit Wunschoption: Postversand oder Abholung in der Werkstatt.
            </p>
          </div>
        </section>

        {/* Benefits Bar */}
        <section className="bg-[#F3ECE2] py-5 border-b border-[#E6DED4]">
          <div className="container-site grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#1E1A17] uppercase tracking-wider">
              <Sparkles size={14} className="text-[#8C6D4F]" />
              100% Massivholz & Handarbeit
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#1E1A17] uppercase tracking-wider">
              <Store size={14} className="text-[#8C6D4F]" />
              Abholung in der Werkstatt möglich
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#1E1A17] uppercase tracking-wider">
              <Truck size={14} className="text-[#8C6D4F]" />
              Versicherter Postversand
            </div>
          </div>
        </section>

        {/* Product Catalog – starts directly */}
        <section className="section-pad bg-[#FAF8F5]">
          <div className="container-site">
            {/* Filter Tabs */}
            <div className="flex justify-center gap-2 mb-12">
              {[
                { value: "alle", label: "Alle Werkstücke" },
                { value: "schneidebretter", label: "Schneidebretter" },
                { value: "regale", label: "Wandregale & Borde" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedCategory(tab.value)}
                  className={`px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                    selectedCategory === tab.value
                      ? "bg-[#1E1A17] text-white"
                      : "bg-white text-[#5E564E] border border-[#E6DED4] hover:bg-[#F3ECE2]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="craft-card rounded-lg p-6 flex flex-col justify-between group"
                >
                  <div>
                    {/* Clickable Image Link to Product Detail Page */}
                    <Link
                      href={`/shop/${product.id}`}
                      className="block relative h-64 rounded overflow-hidden mb-5 bg-[#F3ECE2]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-[#1E1A17]/85 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded font-medium">
                        {product.tag}
                      </div>
                    </Link>

                    <span className="text-xs font-semibold text-[#8C6D4F] uppercase tracking-wider block mb-1">
                      {product.woodType}
                    </span>

                    {/* Clickable Title */}
                    <Link href={`/shop/${product.id}`} className="block hover:underline">
                      <h3 className="font-serif-heading text-2xl text-[#1E1A17] font-medium mb-2">
                        {product.title}
                      </h3>
                    </Link>

                    <p className="text-[#5E564E] text-sm leading-relaxed mb-4">
                      {product.description}
                    </p>

                    <div className="space-y-1.5 border-t border-[#F3ECE2] pt-4 mb-4">
                      <div className="flex items-center gap-2 text-xs text-[#6B635B]">
                        <Ruler size={13} className="text-[#8C6D4F]" />
                        <span>Maße: <strong>{product.dimensions}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#6B635B]">
                        <TreePine size={13} className="text-[#8C6D4F]" />
                        <span>Holz: <strong>{product.woodType}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#F3ECE2] mt-auto">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-serif-heading text-2xl font-semibold text-[#1E1A17]">
                          {product.price.toFixed(2).replace(".", ",")} €
                        </div>
                        <span className="text-[11px] text-[#8C8277] block">
                          inkl. MwSt.
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/shop/${product.id}`}
                          className="btn btn-outline-dark text-xs py-2 px-3"
                        >
                          Details
                        </Link>
                        <button
                          onClick={(e) => handleInquiry(product, e)}
                          className="btn btn-wood text-xs py-2 px-3.5 flex items-center gap-1.5"
                        >
                          <ShoppingBag size={13} />
                          Anfragen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom order notice */}
            <div className="mt-16 bg-white border border-[#E6DED4] rounded-lg p-8 max-w-xl mx-auto text-center shadow-sm">
              <h4 className="font-serif-heading text-xl text-[#1E1A17] font-medium mb-2">
                Individuelles Wunschmaß?
              </h4>
              <p className="text-[#5E564E] text-sm leading-relaxed mb-5">
                Sie wünschen ein Schneidebrett oder Regal in ganz bestimmten Maßen oder aus einer speziellen Holzart? Sprechen Sie uns gerne an.
              </p>
              <button
                onClick={() => {
                  setSelectedProduct({
                    name: "Sonderanfertigung nach Maß",
                  });
                  setDrawerOpen(true);
                }}
                className="btn btn-outline-dark text-xs py-2 px-4"
              >
                Sondermaß anfragen
              </button>
            </div>
          </div>
        </section>

        {/* SEO Text Section: Holzkunde, Handwerk & Nachhaltigkeit */}
        <section className="section-pad bg-white border-t border-[#E6DED4]">
          <div className="container-site max-w-4xl">
            <span className="text-craft-label block mb-2">Werkstattwissen & Holzkunde</span>
            <h2 className="font-serif-heading text-3xl md:text-4xl text-[#1E1A17] font-normal mb-8">
              Massivholz-Dekoartikel aus Meisterhand
            </h2>

            <div className="space-y-6 text-[#5E564E] text-base leading-relaxed">
              <p>
                In unserer Tischlerei entstehen nicht nur Fenster, Türen und Wintergärten, sondern auch hochwertige 
                <strong> handgefertigte Wohnaccessoires und Küchenwerkstücke</strong>. Jedes Schneidebrett und jedes 
                schwebende Wandregal wird aus ausgesuchten Hölzern gefertigt, die wir nach Maserung, Wuchs und Feuchtegehalt 
                sorgfältig auswählen.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-y border-[#E6DED4]">
                <div>
                  <h3 className="font-serif-heading text-xl text-[#1E1A17] font-medium mb-2">
                    Warum Hirnholz für Schneidebretter?
                  </h3>
                  <p className="text-sm text-[#6B635B] leading-relaxed">
                    Bei Hirnholz-Schneidebrettern stehen die Holzfasern vertikal. Beim Schneiden drückt das Messer zwischen die Fasern, 
                    ohne sie zu durchtrennen. Das schont Ihre wertvollen Küchenmesser, minimiert Schnittspuren und verleiht dem Brett 
                    eine unvergleichlich lange Lebensdauer.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif-heading text-xl text-[#1E1A17] font-medium mb-2">
                    Schwebende Wandregale mit Baumkante
                  </h3>
                  <p className="text-sm text-[#6B635B] leading-relaxed">
                    Unsere Eichenwandborde behalten die natürliche Außenkontur des Stammes. Jedes Regal ist ein Unikat der Natur. 
                    Die mitgelieferte unsichtbare Schwerlast-Verankerung sorgt für eine tragfeste, elegante Wandbefestigung ohne sichtbare Winkel.
                  </p>
                </div>
              </div>

              <p>
                <strong>Natürliche Oberflächenversiegelung:</strong> Alle Küchenbretter werden ausschließlich mit lebensmittelechtem 
                Kaltpress-Leinöl behandelt, das tief in die Holzporen eindringt und vor Feuchtigkeit schützt.
              </p>
            </div>
          </div>
        </section>
      </main>

      <InquiryDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        product={selectedProduct}
      />

      <Footer />
    </>
  );
}
