"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Maximize2, X, Sparkles, Check } from "lucide-react";

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
  const [expandedIds, setExpandedIds] = useState<string[]>([]);
  const [activeImages, setActiveImages] = useState<Record<string, string>>({});
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  // Split into categories for counts
  const eigenfertigung = services.filter(
    (s) => s.category === "eigenfertigung" || !s.category
  );
  const bauelemente = services.filter((s) => s.category === "bauelemente");

  // Filtered list
  const filteredServices = services.filter((s) => {
    if (activeCategory === "eigenfertigung") {
      return s.category === "eigenfertigung" || !s.category;
    }
    if (activeCategory === "bauelemente") {
      return s.category === "bauelemente";
    }
    return true;
  });

  // Handle URL hash on load (e.g. #service-holzfenster)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      const found = services.find((s) => s._id === hashId || `service-${s._id}` === hashId);
      if (found) {
        setExpandedIds([found._id]);
        setTimeout(() => {
          const el = document.getElementById(`service-${found._id}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      }
    }
  }, [services]);

  const toggleItem = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setExpandedIds(filteredServices.map((s) => s._id));
  };

  const collapseAll = () => {
    setExpandedIds([]);
  };

  const selectImage = (serviceId: string, url: string) => {
    setActiveImages((prev) => ({
      ...prev,
      [serviceId]: url,
    }));
  };

  const allAreExpanded =
    filteredServices.length > 0 &&
    filteredServices.every((s) => expandedIds.includes(s._id));

  return (
    <>
      <div className="w-full">
          {/* Header Controls: Filter Tabs & Expand/Collapse Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E8E6] mb-2">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory("alle")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === "alle"
                    ? "bg-[#181818] text-white shadow-xs"
                    : "bg-[#F5F5F3] text-[#555555] hover:text-[#181818] hover:bg-[#EBEBE8]"
                }`}
              >
                Alle Gewerke ({services.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("eigenfertigung")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === "eigenfertigung"
                    ? "bg-[#181818] text-white shadow-xs"
                    : "bg-[#F5F5F3] text-[#555555] hover:text-[#181818] hover:bg-[#EBEBE8]"
                }`}
              >
                Eigene Fertigung ({eigenfertigung.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory("bauelemente")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === "bauelemente"
                    ? "bg-[#181818] text-white shadow-xs"
                    : "bg-[#F5F5F3] text-[#555555] hover:text-[#181818] hover:bg-[#EBEBE8]"
                }`}
              >
                Handel &amp; Montage ({bauelemente.length})
              </button>
            </div>

            {/* Quick Toggle All */}
            <div className="flex items-center gap-3 self-end sm:self-auto text-xs text-[#777777]">
              {allAreExpanded ? (
                <button
                  type="button"
                  onClick={collapseAll}
                  className="font-medium hover:text-[#181818] transition-colors cursor-pointer"
                >
                  Alle schließen
                </button>
              ) : (
                <button
                  type="button"
                  onClick={expandAll}
                  className="font-medium hover:text-[#181818] transition-colors cursor-pointer"
                >
                  Alle aufklappen
                </button>
              )}
            </div>
          </div>

          {/* Minimalist Expandable Gewerke List */}
          <div className="divide-y divide-[#E8E8E6]">
            {filteredServices.map((item, idx) => {
              const isExpanded = expandedIds.includes(item._id);
              const isEigen = item.category === "eigenfertigung" || !item.category;

              // Collect photos
              const allPhotos = Array.from(
                new Set([item.imageUrl, ...(item.galleryUrls || [])].filter(Boolean))
              ) as string[];
              const currentImage =
                activeImages[item._id] || allPhotos[0] || item.imageUrl || "/images/real/werkstatt-2.jpg";

              // Clean formatted index (01, 02, ...)
              const formattedIndex = String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={item._id}
                  id={`service-${item._id}`}
                  className="scroll-mt-28 transition-colors"
                >
                  {/* Compact Header Row (Always visible, clean, clickable) */}
                  <button
                    type="button"
                    onClick={() => toggleItem(item._id)}
                    aria-expanded={isExpanded}
                    className="w-full text-left py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-6 group cursor-pointer hover:bg-[#FAF9F7] px-2 -mx-2 rounded-md transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-5 min-w-0">
                      {/* Number */}
                      <span className="text-xs sm:text-sm font-mono font-medium text-[#8C6D4F] flex-shrink-0 w-6">
                        {formattedIndex}
                      </span>

                      {/* Title & Subtitle */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-2.5">
                          <h3 className="text-base sm:text-lg font-bold text-[#181818] group-hover:text-[#8C6D4F] transition-colors truncate">
                            {item.title}
                          </h3>
                          {item.subtitle && (
                            <span className="text-xs text-[#777777] hidden md:inline truncate">
                              – {item.subtitle}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <span className="text-[11px] text-[#777777] block md:hidden truncate mt-0.5">
                            {item.subtitle}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right Controls: Subtle Category Pill + Chevron */}
                    <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
                      <span
                        className={`text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded ${
                          isEigen
                            ? "bg-[#F2ECE4] text-[#725439]"
                            : "bg-[#F0F0EE] text-[#555555]"
                        }`}
                      >
                        {isEigen ? "Eigene Werkstatt" : "Handel & Montage"}
                      </span>

                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isExpanded
                            ? "bg-[#181818] text-white rotate-180"
                            : "bg-transparent text-[#777777] group-hover:text-[#181818] group-hover:bg-[#EBEBE8]"
                        }`}
                      >
                        <ChevronDown size={15} />
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content Area (clean, airy, no heavy boxes) */}
                  {isExpanded && (
                    <div className="pt-2 pb-8 sm:pb-10 pl-2 sm:pl-11 pr-2 animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                        {/* Image Column */}
                        <div className="lg:col-span-5 space-y-2.5">
                          <div
                            onClick={() =>
                              setLightboxImage({ src: currentImage, title: item.title })
                            }
                            className="relative rounded-lg overflow-hidden bg-[#F2F2F0] cursor-pointer group shadow-xs"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={currentImage}
                              alt={item.title}
                              className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-103"
                            />
                            <div className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded bg-[#181818]/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                              <Maximize2 size={13} />
                            </div>
                            {isEigen && (
                              <div className="absolute top-2.5 left-2.5 bg-[#181818]/85 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                                <Sparkles size={11} className="text-[#E5DECE]" />
                                Eigene Fertigung
                              </div>
                            )}
                          </div>

                          {/* Gallery Thumbnails (if multiple exist) */}
                          {allPhotos.length > 1 && (
                            <div className="flex items-center gap-2 overflow-x-auto pb-1">
                              {allPhotos.map((pUrl, pIdx) => {
                                const isSelected = pUrl === currentImage;
                                return (
                                  <button
                                    key={pIdx}
                                    type="button"
                                    onClick={() => selectImage(item._id, pUrl)}
                                    className={`relative h-12 w-16 rounded overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                                      isSelected
                                        ? "border-[#181818] scale-102"
                                        : "border-transparent opacity-60 hover:opacity-100"
                                    }`}
                                  >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={pUrl}
                                      alt=""
                                      className="w-full h-full object-cover"
                                    />
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Text & Features Column */}
                        <div className="lg:col-span-7 flex flex-col justify-between h-full">
                          <div>
                            {item.description && (
                              <p className="text-[#444444] text-xs sm:text-sm leading-relaxed mb-4">
                                {item.description}
                              </p>
                            )}

                            {item.features && item.features.length > 0 && (
                              <div className="mb-6">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D4F] block mb-2">
                                  Ausführung &amp; Besonderheiten
                                </span>
                                <ul className="space-y-1.5 text-xs sm:text-sm text-[#555555]">
                                  {item.features.map((feat, fIdx) => (
                                    <li key={fIdx} className="flex items-start gap-2">
                                      <Check size={13} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                                      <span>{feat}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Direct Inquiry CTA Link */}
                          <div className="pt-3 border-t border-[#F2F2F0]">
                            <Link
                              href={`/kontakt?gewerk=${encodeURIComponent(item.title)}#anfrage-formular`}
                              className="text-xs font-semibold text-[#181818] hover:text-[#8C6D4F] flex items-center gap-1.5 transition-colors"
                            >
                              Projekt für {item.title.split(" ")[0]} anfragen
                              <ArrowRight size={13} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      {/* Lightbox Modal */}
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
