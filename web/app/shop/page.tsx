"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ModelViewerSection from "@/components/sections/ModelViewerSection";
import InquiryDrawer, { DrawerProduct } from "@/components/ui/InquiryDrawer";
import { ShoppingBag, Tag, Ruler, TreePine, Star, Sparkles, Truck, Store, ShieldCheck } from "lucide-react";

const allProducts = [
  {
    id: "schneidebrett-xl",
    category: "schneidebretter",
    title: "Schneidebrett Hirnholz XL",
    description:
      "Massives Hirnholz-Schneidebrett aus heimischer Eiche. Messerschonend, antibakteriell durch natürliche Gerbsäuren und extrem formstabil.",
    dimensions: "40 × 30 × 5 cm",
    woodType: "Eiche massiv",
    price: 89,
    image: "/images/catalog-schneidebrett.jpg",
    available: true,
    rating: 5,
    tag: "Bestseller",
  },
  {
    id: "wandregal-eiche",
    category: "regale",
    title: "Schwebendes Wandregal Eiche",
    description:
      "Massives Eichenholzregal mit natürlicher Baumkante und unsichtbarer Schwerlast-Wandverankerung. Samtig matt geölt.",
    dimensions: "80 × 20 × 4 cm",
    woodType: "Eiche massiv",
    price: 129,
    image: "/images/catalog-regal.jpg",
    available: true,
    rating: 5,
    tag: "Handarbeit",
  },
  {
    id: "schneidebrett-streifen",
    category: "schneidebretter",
    title: "Schneidebrett Streifendesign",
    description:
      "Dekorative Kombination aus massiver Eiche und Buche. Handverleimt mit lebensmittelechtem D4-Leim und zweifacher Leinöl-Versiegelung.",
    dimensions: "35 × 22 × 3 cm",
    woodType: "Eiche & Buche",
    price: 54,
    image: "/images/catalog-schneidebrett.jpg",
    available: true,
    rating: 5,
    tag: "Beliebt",
  },
  {
    id: "wandregal-kiefer",
    category: "regale",
    title: "Wandregal Kiefer Natur",
    description:
      "Rustikales Wandregal aus astfreier Gebirgskiefer. Feingeschliffen und unbehandelt oder mit Bio-Hartwachsöl veredelt.",
    dimensions: "100 × 18 × 3 cm",
    woodType: "Kiefer massiv",
    price: 79,
    image: "/images/catalog-regal.jpg",
    available: true,
    rating: 4,
    tag: "Natur pur",
  },
  {
    id: "servierplatte-griff",
    category: "schneidebretter",
    title: "Servier- & Käseplatte mit Griff",
    description:
      "Edles Servierbrett mit gefräster Saftrille und ergonomischem Tragegriff. Perfekt für Grillabende, Käse- und Wurstplatten.",
    dimensions: "48 × 22 × 2.5 cm",
    woodType: "Eiche massiv",
    price: 69,
    image: "/images/catalog-schneidebrett.jpg",
    available: true,
    rating: 5,
    tag: "Neu",
  },
  {
    id: "wandregal-nussbaum",
    category: "regale",
    title: "Exklusives Wandregal Nussbaum",
    description:
      "Tiefdunkles Edelholz für anspruchsvolle Wohnbereiche. Jedes Regal besitzt eine einzigartige, ausdrucksstarke Maserung.",
    dimensions: "60 × 22 × 4 cm",
    woodType: "Nussbaum massiv",
    price: 169,
    image: "/images/catalog-regal.jpg",
    available: true,
    rating: 5,
    tag: "Exklusiv",
  },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("alle");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DrawerProduct | null>(null);

  const filtered =
    selectedCategory === "alle"
      ? allProducts
      : allProducts.filter((p) => p.category === selectedCategory);

  const handleInquiry = (product: DrawerProduct) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="bg-[#121212] text-white py-16 md:py-24 relative overflow-hidden">
          <div className="container-site relative z-10">
            <span className="text-label text-[#E5DECE] block mb-3">Aus unserer Meisterwerkstatt</span>
            <h1 className="text-display text-4xl md:text-6xl max-w-3xl mb-6">
              Dekoartikel & handgefertigte Unikate.
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
              Jedes Stück wird in traditioneller Handarbeit aus ausgewähltem Massivholz gefertigt. 
              Persönliche Anfrage mit Wunschoption: Versand oder Selbstabholung in der Werkstatt.
            </p>
          </div>
        </section>

        {/* Benefits Bar */}
        <section className="bg-[#f3efe5] py-8 border-b border-[#E5DECE]">
          <div className="container-site grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="text-[#121212]" size={20} />
              <span className="text-sm font-bold text-[#121212]">100% Echtholz & Handarbeit</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Store className="text-[#121212]" size={20} />
              <span className="text-sm font-bold text-[#121212]">Abholung in der Werkstatt möglich</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Truck className="text-[#121212]" size={20} />
              <span className="text-sm font-bold text-[#121212]">Sicherer & versicherter Versand</span>
            </div>
          </div>
        </section>

        {/* Interactive 3D Model Section */}
        <ModelViewerSection />

        {/* Catalog Grid Section */}
        <section className="section-pad bg-white">
          <div className="container-site">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-label text-gray-400 block mb-2">Werkstücke zum Festpreis</span>
              <h2 className="text-display text-3xl md:text-5xl text-[#121212] mb-4">
                Unsere aktuellen Dekoartikel
              </h2>
              <p className="text-gray-500">
                Wählen Sie einen Artikel aus und senden Sie uns eine unverbindliche Bestellanfrage.
              </p>
            </div>

            {/* Filter */}
            <div className="flex justify-center gap-2 mb-12">
              {[
                { value: "alle", label: "Alle Artikel" },
                { value: "schneidebretter", label: "Schneidebretter" },
                { value: "regale", label: "Wandregale & Borde" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedCategory(tab.value)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    selectedCategory === tab.value
                      ? "bg-[#121212] text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                  className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-[#f9fafb]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-3 left-3 bg-[#121212] text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                        {product.tag}
                      </div>
                      <div className="absolute top-3 right-3 bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full font-semibold border border-green-200">
                        Sofort anfragbar
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex gap-0.5 mb-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < product.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-200 fill-gray-200"
                            }
                          />
                        ))}
                      </div>

                      <h3 className="font-bold text-[#121212] text-xl mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                        {product.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {product.description}
                      </p>

                      <div className="space-y-1.5 border-t border-gray-100 pt-4 mb-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Ruler size={13} className="text-[#121212]" />
                          <span>Maße: <strong>{product.dimensions}</strong></span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <TreePine size={13} className="text-[#121212]" />
                          <span>Holzart: <strong>{product.woodType}</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="p-6 pt-0 border-t border-gray-50 mt-auto">
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <div className="text-2xl font-black text-[#121212]">
                          {product.price.toFixed(2).replace(".", ",")} €
                        </div>
                        <span className="text-[11px] text-gray-400 block">
                          inkl. MwSt., zzgl. Versand/Abholung
                        </span>
                      </div>

                      <button
                        onClick={() => handleInquiry({ name: product.title, price: product.price })}
                        className="btn btn-primary text-sm py-2.5 px-4 flex items-center gap-2"
                      >
                        <ShoppingBag size={14} />
                        Jetzt anfragen
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Box */}
            <div className="mt-16 bg-[#f9fafb] border border-gray-200/80 rounded-2xl p-8 max-w-2xl mx-auto text-center">
              <h4 className="font-bold text-lg text-[#121212] mb-2" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                Individuelle Sonderanfertigung gewünscht?
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Sie wünschen ein Schneidebrett oder Regal in ganz bestimmten Maßen oder aus einer speziellen Holzart? Sprechen Sie uns gerne an!
              </p>
              <button
                onClick={() => handleInquiry({ name: "Sonderanfertigung Deko / Kleinmöbel" })}
                className="btn btn-outline-dark text-xs py-2 px-4"
              >
                Sondermaß anfragen
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Inquiry Drawer */}
      <InquiryDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        product={selectedProduct}
      />

      <Footer />
    </>
  );
}
