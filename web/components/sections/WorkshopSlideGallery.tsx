"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

export interface WorkshopSlide {
  imageUrl: string;
  caption?: string;
}

const defaultWorkshopSlides: WorkshopSlide[] = [
  {
    imageUrl: "/images/real/gebaeude-1.jpg",
    caption: "Firmengebäude & Meisterwerkstatt in der Neuheider Straße 64 b in Schönheide (Erzgebirge)",
  },
  {
    imageUrl: "/images/real/werkstatt-2.jpg",
    caption: "Traditionelle Handwerkskunst & Hobelbank – Erfahrung und Leidenschaft für Holz seit 1977",
  },
  {
    imageUrl: "/images/real/werkstatt-1.jpg",
    caption: "Moderner Maschinenpark für millimetergenaue Profilierung und maßgefertigte Holzbauteile",
  },
  {
    imageUrl: "/images/real/werkstatt-3.jpg",
    caption: "Montagelinie für maßgefertigte Holzfenster und Holz-Aluminium-Systeme (System Gutmann Mira)",
  },
  {
    imageUrl: "/images/real/fenster-holzalu-buendig.jpg",
    caption: "Präzisionsfertigung flächenbündiger Holz-Aluminium-Fensterelemente",
  },
  {
    imageUrl: "/images/real/wintergarten-1.jpg",
    caption: "Tragwerksfertigung für Wintergärten und großflächige Hebeschiebetür-Anlagen",
  },
];

export default function WorkshopSlideGallery({
  slides,
}: {
  slides?: WorkshopSlide[] | null;
}) {
  const galleryItems =
    slides && slides.length > 0 ? slides : defaultWorkshopSlides;

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  }, [galleryItems.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, [galleryItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  const currentItem = galleryItems[currentIndex] || galleryItems[0];

  return (
    <section className="py-16 md:py-24 bg-[#F9F9F8] border-t border-[#E8E8E6]">
      <div className="container-site">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-craft-label block mb-1">
              Bilder aus der Firma
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181818] tracking-tight">
              Einblicke in Werkstatt & Betrieb
            </h2>
          </div>

          {/* Top Counter & Arrows */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[#777777] uppercase tracking-wider">
              Bild <strong className="text-[#181818]">{currentIndex + 1}</strong> von {galleryItems.length}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={goToPrev}
                aria-label="Vorheriges Foto"
                className="w-10 h-10 rounded-full border border-[#E8E8E6] bg-white hover:bg-[#181818] hover:text-white flex items-center justify-center text-[#181818] transition-all cursor-pointer shadow-xs"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={goToNext}
                aria-label="Nächstes Foto"
                className="w-10 h-10 rounded-full border border-[#E8E8E6] bg-white hover:bg-[#181818] hover:text-white flex items-center justify-center text-[#181818] transition-all cursor-pointer shadow-xs"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Large Main Image Viewer */}
        <div className="relative w-full h-[360px] sm:h-[480px] md:h-[580px] rounded-xl overflow-hidden bg-[#141414] border border-[#E8E8E6] shadow-sm group">
          {/* Images Stack with Smooth Cross-Fade */}
          {galleryItems.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.caption || `Werkstattfoto ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            );
          })}

          {/* Gradient Overlay for Caption readability */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Floating Big Navigation Click Areas (Left / Right) */}
          <button
            onClick={goToPrev}
            aria-label="Vorheriges Foto"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border border-white/20 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={goToNext}
            aria-label="Nächstes Foto"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border border-white/20 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={22} />
          </button>

          {/* Bottom Caption Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4B28C] block mb-1">
                Tischlerei Ronny Mehlhorn · Schönheide
              </span>
              <p className="text-white text-sm sm:text-base md:text-lg font-medium leading-snug drop-shadow-xs">
                {currentItem.caption}
              </p>
            </div>

            {/* Quick Indicators */}
            <div className="flex items-center gap-1.5">
              {galleryItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Zu Foto ${i + 1} wechseln`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    i === currentIndex ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail Preview Strip */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 mt-4">
          {galleryItems.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative h-20 sm:h-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  isActive
                    ? "border-[#181818] ring-2 ring-[#8C6D4F]/30 scale-[1.02]"
                    : "border-[#E8E8E6] opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={`Vorschau ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
