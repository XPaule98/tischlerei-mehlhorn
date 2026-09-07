"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Maximize2, X, Hammer, Layers, Sparkles, ArrowDownRight, Compass } from "lucide-react";

export interface ServiceItemData {
  _id: string;
  title: string;
  subtitle?: string;
  category: "eigenfertigung" | "bauelemente" | string;
  description?: string;
  features?: string[];
  imageUrl?: string;
  galleryUrls?: string[];
  order?: number;
}

interface Props {
  services: ServiceItemData[];
}

type FilterCategory = "alle" | "eigenfertigung" | "bauelemente";

export default function LeistungenClient({ services }: Props) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("alle");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Track selected active image for items with multiple gallery images
  const [activeImages, setActiveImages] = useState<Record<string, string>>({});

  // Lightbox Modal state
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  // Split into categories
  const eigenfertigung = services.filter(
    (s) => s.category === "eigenfertigung" || !s.category
  );
  const bauelemente = services.filter((s) => s.category === "bauelemente");

  const selectImage = (serviceId: string, url: string) => {
    setActiveImages((prev) => ({
      ...prev,
      [serviceId]: url,
    }));
  };

  const showEigenfertigung = activeCategory === "alle" || activeCategory === "eigenfertigung";
  const showBauelemente = activeCategory === "alle" || activeCategory === "bauelemente";

  const handleFilter = (cat: FilterCategory) => {
    setActiveCategory(cat);
    setTimeout(() => {
      const targetId = cat === "bauelemente" ? "bauelemente" : "eigenfertigung";
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
  };

  // Jump smoothly to a specific service and highlight it
  const scrollToService = (service: ServiceItemData) => {
    const isEigen = service.category === "eigenfertigung" || !service.category;
    
    // Ensure the category is active in the filter
    if (isEigen && activeCategory === "bauelemente") {
      setActiveCategory("alle");
    } else if (!isEigen && activeCategory === "eigenfertigung") {
      setActiveCategory("alle");
    }

    setTimeout(() => {
      const el = document.getElementById(`service-${service._id}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        setHighlightedId(service._id);
        setTimeout(() => setHighlightedId(null), 2500);
      }
    }, 80);
  };

  return (
    <>
      {/* =========================================================================
          0. SCHNELLÜBERSICHT (Kompakte Kacheln ohne Ballast – Klick springt zu Details)
         ========================================================================= */}
      <section className="bg-white border-b border-[#E8E8E6] py-10 sm:py-12">
        <div className="container-site">
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Compass size={16} className="text-[#8C6D4F]" />
              <span className="text-craft-label">Schnellübersicht</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#181818] tracking-tight mb-2">
              Unsere Gewerke & Leistungen im Überblick
            </h2>
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
              Wählen Sie ein Gewerk aus, um direkt zu den ausführlichen Informationen, Ausstattungsmerkmalen und Fotos zu springen.
            </p>
          </div>

          {/* Compact Overview Grid (2 columns on mobile, 4 on tablet/desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {services.map((service) => {
              const isEigen = service.category === "eigenfertigung" || !service.category;
              return (
                <button
                  key={`quick-${service._id}`}
                  onClick={() => scrollToService(service)}
                  className="text-left p-4 rounded-lg border border-[#E8E8E6] bg-[#FAFAFA] hover:bg-white hover:border-[#181818] hover:shadow-sm transition-all duration-200 group cursor-pointer flex flex-col justify-between"
                >
                  <div className="w-full mb-3 flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isEigen 
                        ? "bg-[#181818] text-white" 
                        : "bg-[#EFEFEA] text-[#555555]"
                    }`}>
                      {isEigen ? "Eigene Fertigung" : "Montage & Handel"}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white border border-[#E8E8E6] flex items-center justify-center text-[#777777] group-hover:bg-[#181818] group-hover:text-white group-hover:border-[#181818] transition-all flex-shrink-0">
                      <ArrowDownRight size={13} />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#181818] group-hover:text-[#8C6D4F] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    {service.subtitle && (
                      <p className="text-[11px] text-[#777777] mt-1 line-clamp-1">
                        {service.subtitle}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Navigation Bar (Sticky Filter Tabs) */}
      <section className="bg-[#F9F9F8] border-b border-[#E8E8E6] sticky top-[60px] md:top-[72px] z-30 shadow-xs">
        <div className="container-site py-3 sm:py-4">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              onClick={() => handleFilter("alle")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === "alle"
                  ? "bg-[#181818] text-white shadow-sm"
                  : "bg-white text-[#555555] hover:text-[#181818] border border-[#E8E8E6] hover:bg-gray-50"
              }`}
            >
              Alle Leistungen ({services.length})
            </button>

            <button
              onClick={() => handleFilter("eigenfertigung")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                activeCategory === "eigenfertigung"
                  ? "bg-[#181818] text-white shadow-sm"
                  : "bg-white text-[#555555] hover:text-[#181818] border border-[#E8E8E6] hover:bg-gray-50"
              }`}
            >
              <Hammer size={14} className={activeCategory === "eigenfertigung" ? "text-white" : "text-[#8C6D4F]"} />
              Eigene Herstellung ({eigenfertigung.length})
            </button>

            <button
              onClick={() => handleFilter("bauelemente")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                activeCategory === "bauelemente"
                  ? "bg-[#181818] text-white shadow-sm"
                  : "bg-white text-[#555555] hover:text-[#181818] border border-[#E8E8E6] hover:bg-gray-50"
              }`}
            >
              <Layers size={14} className={activeCategory === "bauelemente" ? "text-white" : "text-[#8C6D4F]"} />
              Bauelemente & Montage ({bauelemente.length})
            </button>
          </div>
        </div>
      </section>

      <div className="space-y-20 md:space-y-28 py-12 md:py-20">
        {/* =========================================================================
            1. EIGENE HERSTELLUNG (Offene, großzügige Visual Showcase Blöcke)
           ========================================================================= */}
        {showEigenfertigung && eigenfertigung.length > 0 && (
          <section id="eigenfertigung" className="container-site scroll-mt-36 sm:scroll-mt-40">
            {/* Section Header */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold text-[#181818] tracking-tight mb-3">
                1. Eigene Herstellung & Meisterfertigung
              </h2>
              <p className="text-[#555555] text-sm sm:text-base leading-relaxed">
                In unserer Meisterwerkstatt in Schönheide fertigen wir individuelle Holzelemente nach Maß.
                Jedes Stück entsteht aus erlesenem Massivholz mit modernster CNC-Präzision und traditioneller Handwerkskunst.
              </p>
            </div>

            {/* Showcase Items (Alternating Layout) */}
            <div className="space-y-16 sm:space-y-24">
              {eigenfertigung.map((item, index) => {
                // Collect all available photos for this item (main image + gallery)
                const allPhotos = Array.from(
                  new Set([item.imageUrl, ...(item.galleryUrls || [])].filter(Boolean))
                ) as string[];

                const currentImage = activeImages[item._id] || allPhotos[0] || item.imageUrl || "/images/real/werkstatt-2.jpg";
                const hasMultiplePhotos = allPhotos.length > 1;
                const isReversed = index % 2 === 1;
                const isHighlighted = highlightedId === item._id;

                return (
                  <div
                    key={item._id}
                    id={`service-${item._id}`}
                    className={`scroll-mt-36 sm:scroll-mt-44 p-4 sm:p-6 rounded-2xl transition-all duration-500 ${
                      isHighlighted 
                        ? "bg-[#FAF7F2] ring-2 ring-[#8C6D4F] shadow-md" 
                        : "bg-transparent"
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                      {/* Image Column */}
                      <div className={`lg:col-span-6 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                        <div className="space-y-3">
                          {/* Main High-Res Photo */}
                          <div
                            onClick={() => setLightboxImage({ src: currentImage, title: item.title })}
                            className="relative rounded-xl overflow-hidden bg-[#F2F2F0] border border-[#E8E8E6] shadow-sm cursor-pointer group"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={currentImage}
                              alt={item.title}
                              className="w-full h-[280px] sm:h-[380px] object-cover transition-transform duration-700 group-hover:scale-102"
                            />

                            {/* Subtle zoom indicator */}
                            <div className="absolute bottom-3 right-3 w-8 h-8 rounded bg-[#181818]/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                              <Maximize2 size={14} />
                            </div>

                            {/* Authentic Workshop Badge */}
                            <div className="absolute top-3 left-3 bg-[#181818]/85 text-white text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded shadow-sm flex items-center gap-1.5">
                              <Sparkles size={12} className="text-[#E5DECE]" />
                              Eigene Werkstattfertigung
                            </div>
                          </div>

                          {/* Gallery Thumbnails (if multiple exist) */}
                          {hasMultiplePhotos && (
                            <div className="flex items-center gap-2 overflow-x-auto pb-1">
                              {allPhotos.map((photoUrl, pIdx) => {
                                const isSelected = photoUrl === currentImage;
                                return (
                                  <button
                                    key={pIdx}
                                    type="button"
                                    onClick={() => selectImage(item._id, photoUrl)}
                                    aria-label={`Foto ${pIdx + 1} von ${item.title} anzeigen`}
                                    className={`relative h-16 w-20 sm:h-20 sm:w-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                                      isSelected
                                        ? "border-[#181818] shadow-sm scale-102"
                                        : "border-transparent opacity-60 hover:opacity-100 hover:border-[#CCCCCC]"
                                    }`}
                                  >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={photoUrl}
                                      alt={`${item.title} Detail ${pIdx + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content Column */}
                      <div className={`lg:col-span-6 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                        {/* Clean H3 Title */}
                        <h3 className="text-2xl sm:text-3xl font-bold text-[#181818] leading-tight mb-2">
                          {item.title}
                        </h3>

                        {/* Optional Subtitle / Tagline below title */}
                        {item.subtitle && (
                          <p className="text-sm font-semibold text-[#8C6D4F] mb-4">
                            {item.subtitle}
                          </p>
                        )}

                        {/* Detailed Description */}
                        {item.description && (
                          <p className="text-[#555555] text-sm sm:text-base leading-relaxed mb-6">
                            {item.description}
                          </p>
                        )}

                        {/* Feature Bullet Points */}
                        {item.features && item.features.length > 0 && (
                          <div className="space-y-2.5 mb-8 p-4 sm:p-5 bg-white rounded-xl border border-[#E8E8E6] shadow-xs">
                            <span className="text-xs font-bold uppercase tracking-wider text-[#181818] block mb-2">
                              Qualitätsmerkmale:
                            </span>
                            <div className="space-y-2">
                              {item.features.map((feat, fIdx) => (
                                <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#444444]">
                                  <Check size={15} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                                  <span>{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Direct CTA */}
                        <Link
                          href={`/kontakt?gewerk=${encodeURIComponent(item.title)}`}
                          className="btn btn-primary text-xs sm:text-sm inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                          Angebot für {item.title.split(" ")[0]} anfordern
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* =========================================================================
            2. BAUELEMENTE & MONTAGESERVICE (Strukturierte, übersichtliche Karten)
           ========================================================================= */}
        {showBauelemente && bauelemente.length > 0 && (
          <section id="bauelemente" className="container-site scroll-mt-36 sm:scroll-mt-40">
            {/* Section Header */}
            <div className="max-w-3xl mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl font-bold text-[#181818] tracking-tight mb-3">
                2. Bauelemente, Handel & Fachmontage
              </h2>
              <p className="text-[#555555] text-sm sm:text-base leading-relaxed">
                Kompletter Vor-Ort-Service führender Markenhersteller: Beratung, exaktes Aufmaß, Lieferung
                und RAL-zertifizierter Einbau aller Bauelemente durch unser erfahrenes Montageteam.
              </p>
            </div>

            {/* Structured Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {bauelemente.map((item) => {
                const cardImage = item.imageUrl || "/images/service-fenster.jpg";
                const isHighlighted = highlightedId === item._id;

                return (
                  <div
                    key={item._id}
                    id={`service-${item._id}`}
                    className={`craft-card bg-white flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group scroll-mt-36 sm:scroll-mt-44 ${
                      isHighlighted 
                        ? "ring-2 ring-[#8C6D4F] shadow-lg scale-[1.02]" 
                        : ""
                    }`}
                  >
                    <div>
                      {/* Card Preview Image */}
                      <div className="relative h-44 sm:h-48 overflow-hidden bg-[#F2F2F0]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cardImage}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-[#181818]/85 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                          Handel & Montage
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-5 sm:p-6">
                        {/* Clean Title */}
                        <h3 className="text-lg sm:text-xl font-bold text-[#181818] leading-snug mb-1.5">
                          {item.title}
                        </h3>

                        {/* Optional Subtitle below title */}
                        {item.subtitle && (
                          <p className="text-xs font-semibold text-[#8C6D4F] mb-3">
                            {item.subtitle}
                          </p>
                        )}

                        {/* Description */}
                        {item.description && (
                          <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-5">
                            {item.description}
                          </p>
                        )}

                        {/* Features */}
                        {item.features && item.features.length > 0 && (
                          <div className="space-y-2 mb-6 pt-4 border-t border-[#F2F2F0]">
                            {item.features.map((feat, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-[#555555]">
                                <Check size={13} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom CTA Row */}
                    <div className="p-5 sm:p-6 pt-0 mt-auto">
                      <Link
                        href={`/kontakt?gewerk=${encodeURIComponent(item.title)}`}
                        className="btn btn-outline-dark text-xs py-2.5 px-4 w-full flex items-center justify-center gap-1.5"
                      >
                        Angebot anfragen
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox Modal for Services */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white flex items-center gap-1 text-xs uppercase tracking-wider cursor-pointer"
            >
              <X size={18} /> Schließen
            </button>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="max-h-[80vh] w-auto object-contain rounded shadow-2xl border border-white/10"
            />
            <p className="text-white text-sm font-semibold mt-3 text-center">
              {lightboxImage.title}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
