"use client";

import { useState, useEffect, useRef } from "react";
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
  singleExpand?: boolean;
  defaultExpandedFirst?: boolean;
}

export default function LeistungenClient({
  services,
  singleExpand = false,
  defaultExpandedFirst = false,
}: Props) {
  const [expandedIds, setExpandedIds] = useState<string[]>(() => {
    if (defaultExpandedFirst && services.length > 0) {
      return [services[0]._id];
    }
    return [];
  });
  const [activeImages, setActiveImages] = useState<Record<string, string>>({});
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);
  const scrollTargetRef = useRef<string | null>(null);

  // Smoothly scroll to the target service item taking header offset into account
  useEffect(() => {
    if (!scrollTargetRef.current) return;
    const targetId = scrollTargetRef.current;
    scrollTargetRef.current = null;

    // Small delay ensures previous item unmounts and DOM layout settles before measuring
    const timer = setTimeout(() => {
      const el = document.getElementById(`service-${targetId}`);
      if (!el) return;

      const header = document.querySelector("header");
      const headerHeight = header ? header.getBoundingClientRect().height : 70;
      const extraPadding = typeof window !== "undefined" && window.innerWidth < 640 ? 12 : 18;
      const targetOffset = headerHeight + extraPadding;

      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - targetOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      });
    }, 80);

    return () => clearTimeout(timer);
  }, [expandedIds]);

  // Handle URL hash on load (e.g. #service-holzfenster)
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      const found = services.find((s) => s._id === hashId || `service-${s._id}` === hashId);
      if (found) {
        scrollTargetRef.current = found._id;
        setExpandedIds([found._id]);
      }
    } else if (defaultExpandedFirst && services.length > 0 && expandedIds.length === 0) {
      setExpandedIds([services[0]._id]);
    }
  }, [services, defaultExpandedFirst]);

  const toggleItem = (id: string) => {
    const isCurrentlyExpanded = expandedIds.includes(id);

    if (!isCurrentlyExpanded) {
      // Opening item -> schedule smooth scroll to its top
      scrollTargetRef.current = id;
    } else {
      scrollTargetRef.current = null;
    }

    if (singleExpand) {
      setExpandedIds(isCurrentlyExpanded ? [] : [id]);
    } else {
      setExpandedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    }
  };

  const expandAll = () => {
    setExpandedIds(services.map((s) => s._id));
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
    services.length > 0 &&
    services.every((s) => expandedIds.includes(s._id));

  return (
    <>
      <div className="w-full">
        {/* Header Controls: Minimalist "Alle aufklappen / Alle schließen" */}
        <div className="flex items-center justify-between pb-3.5 border-b border-[#E8E8E6] mb-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6D4F]">
            Alle Gewerke ({services.length})
          </span>

          <div className="text-xs text-[#777777]">
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
          {services.map((item, idx) => {
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
                    className="w-full text-left py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-6 group cursor-pointer hover:bg-[#FAF9F7] px-2 -mx-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-start sm:items-center gap-3 sm:gap-5 min-w-0 flex-1">
                      {/* Number */}
                      <span className="text-xs sm:text-sm font-mono font-medium text-[#8C6D4F] flex-shrink-0 pt-0.5 sm:pt-0 w-6">
                        {formattedIndex}
                      </span>

                      {/* Title & Subtitle - fully readable without truncation */}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#181818] group-hover:text-[#8C6D4F] transition-colors leading-snug">
                          {item.title}
                        </h3>
                        {item.subtitle && (
                          <p className="text-xs sm:text-sm text-[#777777] mt-0.5 leading-normal">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right Control: Clean chevron toggle */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all border ${
                        isExpanded
                          ? "bg-[#181818] border-[#181818] text-white rotate-180"
                          : "bg-white border-[#E8E8E6] text-[#666666] group-hover:border-[#181818] group-hover:text-[#181818]"
                      }`}
                    >
                      <ChevronDown size={15} />
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
                            className="relative rounded-xl overflow-hidden bg-[#F6F5F2] cursor-pointer group border border-[#E8E8E4] aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center shadow-xs"
                          >
                            {/* Ambient blurred backdrop so portrait and landscape fit harmoniously without empty gaps */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={currentImage}
                              alt=""
                              aria-hidden="true"
                              className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-30 brightness-95 pointer-events-none"
                            />

                            {/* Full uncropped image: doors, windows, winter gardens remain 100% visible */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={currentImage}
                              alt={item.title}
                              className="relative z-10 max-h-full max-w-full object-contain p-2.5 sm:p-3.5 transition-transform duration-500 group-hover:scale-103 drop-shadow-sm"
                            />

                            {/* Zoom hint overlay */}
                            <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#181818]/80 text-white text-[11px] font-medium backdrop-blur-xs opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shadow-sm">
                              <Maximize2 size={12} />
                              <span>Großansicht</span>
                            </div>

                            {isEigen && (
                              <div className="absolute top-2.5 left-2.5 z-20 bg-[#181818]/85 text-white text-[10px] font-semibold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1 backdrop-blur-xs">
                                <Sparkles size={11} className="text-[#E5DECE]" />
                                Eigene Fertigung
                              </div>
                            )}
                          </div>

                          {/* Gallery Thumbnails (if multiple exist) */}
                          {allPhotos.length > 1 && (
                            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                              {allPhotos.map((pUrl, pIdx) => {
                                const isSelected = pUrl === currentImage;
                                return (
                                  <button
                                    key={pIdx}
                                    type="button"
                                    onClick={() => selectImage(item._id, pUrl)}
                                    className={`relative h-13 w-18 rounded-md overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 bg-[#F5F4F0] ${
                                      isSelected
                                        ? "border-[#181818] scale-102 ring-1 ring-[#8C6D4F]"
                                        : "border-transparent opacity-65 hover:opacity-100"
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
