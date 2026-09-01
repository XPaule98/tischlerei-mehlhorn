"use client";

import { useState } from "react";
import { ShoppingBag, Tag, Ruler, TreePine, Star } from "lucide-react";
import InquiryDrawer, { DrawerProduct } from "@/components/ui/InquiryDrawer";

const catalogProducts = [
  {
    id: "schneidebrett-gross",
    title: "Schneidebrett Hirnholz XL",
    description:
      "Massives Hirnholz-Schneidebrett aus Eiche. Extrem langlebig, messerfreundlich und ein echter Hingucker in jeder Küche.",
    dimensions: "40 × 30 × 5 cm",
    woodType: "Eiche massiv",
    price: 89,
    image: "/images/catalog-schneidebrett.jpg",
    available: true,
    rating: 5,
  },
  {
    id: "wandregal-eiche",
    title: "Wandregal Eiche massiv",
    description:
      "Schwebendes Wandregal aus geölter Massiveiche. Schlichte Eleganz für Wohnzimmer, Küche oder Büro. Inkl. unsichtbarer Befestigung.",
    dimensions: "80 × 20 × 4 cm",
    woodType: "Eiche massiv",
    price: 129,
    image: "/images/catalog-regal.jpg",
    available: true,
    rating: 5,
  },
  {
    id: "schneidebrett-klein",
    title: "Schneidebrett Streifenholz",
    description:
      "Handgefertigtes Schneidebrett mit dekorativem Streifenmuster. Kombination aus Eiche und Buche. Ideal als Käsebrett.",
    dimensions: "30 × 20 × 3 cm",
    woodType: "Eiche & Buche",
    price: 54,
    image: "/images/catalog-schneidebrett.jpg",
    available: true,
    rating: 4,
  },
  {
    id: "wandregal-kiefer",
    title: "Wandregal Kiefer natur",
    description:
      "Rustikales Wandregal aus naturbelassener Kiefer. Leicht und tragfähig. Perfekt für den Landhauslook.",
    dimensions: "100 × 18 × 3 cm",
    woodType: "Kiefer massiv",
    price: 79,
    image: "/images/catalog-regal.jpg",
    available: true,
    rating: 4,
  },
  {
    id: "servierplatte",
    title: "Servierplatte mit Griff",
    description:
      "Handgefertigte Servierplatte aus massiver Eiche mit ergonomischem Griff. Für Käse, Wurst und mehr.",
    dimensions: "45 × 20 × 2 cm",
    woodType: "Eiche massiv",
    price: 69,
    image: "/images/catalog-schneidebrett.jpg",
    available: false,
    rating: 5,
  },
  {
    id: "regal-nussbaum",
    title: "Wandregal Nussbaum",
    description:
      "Exklusives Wandregal aus edlem Nussbaum. Dunkle Maserung, leicht geölt, zeitloser Designklassiker.",
    dimensions: "60 × 22 × 4 cm",
    woodType: "Nussbaum massiv",
    price: 169,
    image: "/images/catalog-regal.jpg",
    available: true,
    rating: 5,
  },
];

function ProductCard({
  product,
  onInquiry,
}: {
  product: (typeof catalogProducts)[0];
  onInquiry: (p: DrawerProduct) => void;
}) {
  return (
    <div className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-[#f9fafb]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
              Momentan nicht verfügbar
            </span>
          </div>
        )}
        {product.available && (
          <div className="absolute top-3 right-3 bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full font-semibold border border-green-200">
            Verfügbar
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Stars */}
        <div className="flex gap-0.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={
                i < product.rating
                  ? "text-amber-400 fill-amber-400"
                  : "text-gray-200 fill-gray-200"
              }
            />
          ))}
        </div>

        <h3
          className="font-bold text-[#121212] text-lg leading-tight mb-2"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {product.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Meta */}
        <div className="flex flex-col gap-2 mb-5">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Ruler size={12} className="flex-shrink-0" />
            <span>{product.dimensions}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <TreePine size={12} className="flex-shrink-0" />
            <span>{product.woodType}</span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#121212]">
                {product.price.toFixed(2).replace(".", ",")} €
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
              <Tag size={10} />
              <span>inkl. MwSt., zzgl. Versand/Abholung</span>
            </div>
          </div>
          <button
            id={`inquire-${product.id}`}
            disabled={!product.available}
            onClick={() =>
              onInquiry({ name: product.title, price: product.price })
            }
            className={`btn text-sm py-2.5 px-4 ${
              product.available
                ? "btn-primary"
                : "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed"
            }`}
          >
            <ShoppingBag size={14} />
            Anfragen
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CatalogSection() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<DrawerProduct | null>(
    null
  );

  const handleInquiry = (product: DrawerProduct) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  return (
    <>
      <section
        id="katalog"
        className="section-pad bg-[#f9fafb]"
        aria-labelledby="catalog-heading"
      >
        <div className="container-site">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-label text-gray-400 mb-3">Handgemacht · Aus der Werkstatt</p>
            <h2
              id="catalog-heading"
              className="text-display text-[#121212] text-3xl md:text-5xl mb-5"
            >
              Deko-Katalog
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto text-lg">
              Individuelle Holzarbeiten zum Festpreis – Schneidebretter, Regale und
              Kleinmöbel. Kein Online-Checkout: wir klären alles persönlich.
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onInquiry={handleInquiry}
              />
            ))}
          </div>

          {/* Note */}
          <div className="mt-12 p-6 bg-[#E5DECE]/30 rounded-2xl border border-[#E5DECE]/60 text-center max-w-2xl mx-auto">
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong className="text-[#121212]">Kein Online-Kauf:</strong>{" "}
              Alle Produkte werden auf Anfrage besprochen. Wir klären Verfügbarkeit,
              Lieferzeit, Versandkosten und Zahlungsmodalitäten direkt mit Ihnen.
            </p>
          </div>
        </div>
      </section>

      {/* Inquiry Drawer */}
      <InquiryDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        product={selectedProduct}
      />
    </>
  );
}
