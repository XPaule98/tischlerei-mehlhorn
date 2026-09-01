"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ModelViewerSection from "@/components/sections/ModelViewerSection";
import InquiryDrawer, { DrawerProduct } from "@/components/ui/InquiryDrawer";
import { ShoppingBag, Ruler, TreePine } from "lucide-react";

const allProducts = [
  {
    id: "schneidebrett-xl",
    category: "schneidebretter",
    title: "Schneidebrett Hirnholz XL",
    description:
      "Massives Hirnholz-Schneidebrett aus heimischer Eiche. Messerschonend, antibakteriell durch natürliche Gerbsäuren und extrem formstabil.",
    dimensions: "40 × 30 × 5 cm",
    woodType: "Eiche massiv (Stirnholz)",
    price: 89,
    image: "/images/catalog-schneidebrett.jpg",
    available: true,
    tag: "Werkstatt-Klassiker",
  },
  {
    id: "wandregal-eiche",
    category: "regale",
    title: "Schwebendes Wandregal Eiche",
    description:
      "Massives Eichenholzregal mit natürlicher Baumkante und unsichtbarer Schwerlast-Wandverankerung. Samtig matt geölt.",
    dimensions: "80 × 20 × 4 cm",
    woodType: "Massiveiche natur",
    price: 129,
    image: "/images/catalog-regal.jpg",
    available: true,
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
    tag: "Zweifarbig",
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
    tag: "Naturholz",
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
    tag: "Unikat",
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
    tag: "Edelholz",
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
              Unverbindliche Anfrage mit Wunschoption: Versand oder Abholung in der Werkstatt.
            </p>
          </div>
        </section>

        {/* Benefits Bar */}
        <section className="bg-[#F3ECE2] py-6 border-b border-[#E6DED4]">
          <div className="container-site grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="text-xs font-semibold text-[#1E1A17] uppercase tracking-wider">
              100% Echtholz & Handarbeit
            </div>
            <div className="text-xs font-semibold text-[#1E1A17] uppercase tracking-wider">
              Abholung in der Werkstatt möglich
            </div>
            <div className="text-xs font-semibold text-[#1E1A17] uppercase tracking-wider">
              Sicherer & versicherter Versand
            </div>
          </div>
        </section>

        {/* 3D Model Viewer */}
        <ModelViewerSection />

        {/* Product Catalog */}
        <section className="section-pad bg-[#FAF8F5]">
          <div className="container-site">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-craft-label block mb-2">Werkstücke zum Festpreis</span>
              <h2 className="font-serif-heading text-3xl md:text-5xl text-[#1E1A17] font-normal mb-4">
                Unsere aktuellen Dekoartikel
              </h2>
              <p className="text-[#5E564E] text-base">
                Wählen Sie ein Werkstück aus und senden Sie uns eine unverbindliche Bestellanfrage.
              </p>
            </div>

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
                  className={`px-5 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
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
                  className="craft-card rounded-lg p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-60 rounded overflow-hidden mb-5 bg-[#F3ECE2]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 bg-[#1E1A17]/85 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded font-medium">
                        {product.tag}
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-[#8C6D4F] uppercase tracking-wider block mb-1">
                      {product.woodType}
                    </span>
                    <h3 className="font-serif-heading text-2xl text-[#1E1A17] font-medium mb-2">
                      {product.title}
                    </h3>
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
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-serif-heading text-2xl font-semibold text-[#1E1A17]">
                          {product.price.toFixed(2).replace(".", ",")} €
                        </div>
                        <span className="text-[11px] text-[#8C8277] block">
                          inkl. MwSt., zzgl. Versand/Abholung
                        </span>
                      </div>

                      <button
                        onClick={() => handleInquiry({ name: product.title, price: product.price })}
                        className="btn btn-wood text-xs py-2.5 px-4 flex items-center gap-1.5"
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
            <div className="mt-16 bg-white border border-[#E6DED4] rounded-lg p-8 max-w-xl mx-auto text-center shadow-sm">
              <h4 className="font-serif-heading text-xl text-[#1E1A17] font-medium mb-2">
                Individuelles Wunschmaß?
              </h4>
              <p className="text-[#5E564E] text-sm leading-relaxed mb-5">
                Sie wünschen ein Schneidebrett oder Regal in ganz bestimmten Maßen oder aus einer speziellen Holzart? Sprechen Sie uns gerne an.
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

      <InquiryDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        product={selectedProduct}
      />

      <Footer />
    </>
  );
}
