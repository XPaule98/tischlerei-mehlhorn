"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, ChevronDown, Maximize2, X } from "lucide-react";

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

export default function LeistungenClient({ services }: Props) {
  // Split into categories
  const eigenfertigung = services.filter(
    (s) => s.category === "eigenfertigung" || !s.category
  );
  const bauelemente = services.filter((s) => s.category === "bauelemente");

  // Track open state for each item (first item open by default)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    [eigenfertigung[0]?._id || ""]: true,
  });

  // Track selected active image for items with multiple gallery images
  const [activeImages, setActiveImages] = useState<Record<string, string>>({});

  // Lightbox Modal state
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAll = (items: ServiceItemData[], open: boolean) => {
    const next: Record<string, boolean> = { ...openItems };
    items.forEach((item) => {
      next[item._id] = open;
    });
    setOpenItems(next);
  };

  const selectImage = (serviceId: string, url: string) => {
    setActiveImages((prev) => ({
      ...prev,
      [serviceId]: url,
    }));
  };

  const renderServiceCard = (item: ServiceItemData) => {
    const isOpen = Boolean(openItems[item._id]);
    
    // Collect all available photos for this item (main image + gallery)
    const allPhotos = Array.from(
      new Set([item.imageUrl, ...(item.galleryUrls || [])].filter(Boolean))
    ) as string[];

    const currentImage = activeImages[item._id] || allPhotos[0] || item.imageUrl;
    const hasImage = Boolean(currentImage);
    const hasMultiplePhotos = allPhotos.length > 1;

    return (
      <div
        key={item._id}
        className={`craft-card overflow-hidden transition-all duration-300 ${
          isOpen ? "border-[#CFCFCB] shadow-sm bg-white" : "hover:border-[#CFCFCB] bg-[#FAFAFA]"
        }`}
      >
        {/* Collapsed / Expand Header Bar */}
        <button
          onClick={() => toggleItem(item._id)}
          aria-expanded={isOpen}
          className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-black/[0.015] transition-colors"
        >
          <div className="flex-1 pr-2">
            {item.subtitle && (
              <span className="text-[11px] sm:text-xs font-bold text-[#8C6D4F] uppercase tracking-wider block mb-1">
                {item.subtitle}
              </span>
            )}
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#181818] leading-snug">
              {item.title}
            </h3>
          </div>

          {/* Toggle Button & Icon */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="hidden sm:inline-block text-xs font-semibold text-[#777777]">
              {isOpen ? "Einklappen" : "Details ansehen"}
            </span>
            <div
              className={`w-9 h-9 rounded-full bg-white border border-[#E8E8E6] flex items-center justify-center text-[#181818] transition-transform duration-300 ${
                isOpen ? "rotate-180 bg-[#181818] text-white border-[#181818]" : ""
              }`}
            >
              <ChevronDown size={18} />
            </div>
          </div>
        </button>

        {/* Expanded Details Body */}
        {isOpen && (
          <div className="px-5 pb-6 sm:px-8 sm:pb-8 pt-2 border-t border-[#F2F2F0] bg-white animate-in fade-in-50 duration-300">
            <div className={`grid grid-cols-1 ${hasImage ? "lg:grid-cols-12 gap-8 lg:gap-10" : ""} items-start mt-3`}>
              {/* Image & Interactive Thumbnail Switcher */}
              {hasImage && (
                <div className="lg:col-span-6 space-y-3">
                  {/* Large Main Photo */}
                  <div
                    onClick={() => {
                      if (currentImage) {
                        setLightboxImage({ src: currentImage, title: item.title });
                      }
                    }}
                    className="relative rounded-lg overflow-hidden bg-[#F9F9F8] border border-[#E8E8E6] shadow-xs cursor-pointer group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentImage}
                      alt={item.title}
                      className="w-full h-[280px] sm:h-[350px] object-cover transition-transform duration-500 group-hover:scale-102"
                    />
                    <div className="absolute bottom-3 right-3 w-8 h-8 rounded bg-[#181818]/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                      <Maximize2 size={14} />
                    </div>
                  </div>

                  {/* Interactive Thumbnail Gallery – Click to Switch Main Photo */}
                  {hasMultiplePhotos && (
                    <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                      {allPhotos.map((photoUrl, pIdx) => {
                        const isSelected = photoUrl === currentImage;
                        return (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => selectImage(item._id, photoUrl)}
                            aria-label={`Foto ${pIdx + 1} von ${item.title} anzeigen`}
                            className={`relative h-18 w-24 sm:h-20 sm:w-28 rounded-md overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                              isSelected
                                ? "border-[#181818] shadow-sm scale-102"
                                : "border-transparent opacity-65 hover:opacity-100 hover:border-[#CCCCCC]"
                            }`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={photoUrl}
                              alt={`${item.title} Vorschau ${pIdx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Text, Bullet Points & CTA */}
              <div className={hasImage ? "lg:col-span-6" : "w-full max-w-3xl"}>
                {item.description && (
                  <p className="text-[#555555] text-sm sm:text-base leading-relaxed mb-5">
                    {item.description}
                  </p>
                )}

                {item.features && item.features.length > 0 && (
                  <div className="space-y-2 mb-6 p-4 bg-[#F9F9F8] rounded-lg border border-[#E8E8E6]">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#181818] mb-2.5">
                      Ausstattungsmerkmale & Vorteile:
                    </h4>
                    {item.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#444444]">
                        <Check size={14} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}

                <Link
                  href={`/kontakt?gewerk=${encodeURIComponent(item.title)}`}
                  className="btn btn-primary text-xs sm:text-sm inline-flex items-center gap-1.5"
                >
                  Angebot für {item.title} anfordern
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="space-y-16 md:space-y-20 py-12 md:py-16">
        {/* 1. Eigene Herstellung */}
        {eigenfertigung.length > 0 && (
          <section className="container-site">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-3 border-b border-[#E8E8E6]">
              <div>
                <span className="text-craft-label block mb-1">Tradition & Präzision</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181818] tracking-tight">
                  Eigene Herstellung in Schönheide
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleAll(eigenfertigung, true)}
                  className="text-xs font-semibold text-[#555555] hover:text-[#181818] px-3 py-1.5 rounded border border-[#E8E8E6] bg-white transition-colors cursor-pointer"
                >
                  Alle aufklappen
                </button>
                <button
                  onClick={() => toggleAll(eigenfertigung, false)}
                  className="text-xs font-semibold text-[#555555] hover:text-[#181818] px-3 py-1.5 rounded border border-[#E8E8E6] bg-white transition-colors cursor-pointer"
                >
                  Alle einklappen
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {eigenfertigung.map(renderServiceCard)}
            </div>
          </section>
        )}

        {/* 2. Bauelemente & Montageservice */}
        {bauelemente.length > 0 && (
          <section className="container-site pt-8 border-t border-[#E8E8E6]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-3 border-b border-[#E8E8E6]">
              <div>
                <span className="text-craft-label block mb-1">Geprüfte Markenqualität</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181818] tracking-tight">
                  Bauelemente & Montageservice
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleAll(bauelemente, true)}
                  className="text-xs font-semibold text-[#555555] hover:text-[#181818] px-3 py-1.5 rounded border border-[#E8E8E6] bg-white transition-colors cursor-pointer"
                >
                  Alle aufklappen
                </button>
                <button
                  onClick={() => toggleAll(bauelemente, false)}
                  className="text-xs font-semibold text-[#555555] hover:text-[#181818] px-3 py-1.5 rounded border border-[#E8E8E6] bg-white transition-colors cursor-pointer"
                >
                  Alle einklappen
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {bauelemente.map(renderServiceCard)}
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
