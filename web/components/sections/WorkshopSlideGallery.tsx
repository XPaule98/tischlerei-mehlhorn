"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

export interface WorkshopSlide {
  imageUrl: string;
  caption?: string;
}

const defaultWorkshopSlides: WorkshopSlide[] = [
  {
    imageUrl: "/images/real/gebaeude-1.jpg",
    caption: "Firmengebäude & Werkstatt in der Neuheider Straße 64 b in Schönheide",
  },
  {
    imageUrl: "/images/real/werkstatt-2.jpg",
    caption: "Traditionelle Holzverarbeitung & Hobelbank – Handwerkskunst seit 1977",
  },
  {
    imageUrl: "/images/real/werkstatt-1.jpg",
    caption: "Moderner Maschinenpark für millimetergenaue Maßfertigung",
  },
  {
    imageUrl: "/images/real/werkstatt-3.jpg",
    caption: "Montagelinie für Holzfenster & Holz-Alu-Systeme (Gutmann Mira)",
  },
  {
    imageUrl: "/images/real/fenster-holzalu-buendig.jpg",
    caption: "Präzisionsfertigung flächenbündiger Holz-Aluminium-Elemente",
  },
];

export default function WorkshopSlideGallery({
  slides,
}: {
  slides?: WorkshopSlide[] | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const galleryItems =
    slides && slides.length > 0 ? slides : defaultWorkshopSlides;

  const updateScrollState = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
      updateScrollState();
    }
  }, [updateScrollState]);

  // Slow continuous drift that pauses on interaction
  useEffect(() => {
    const el = containerRef.current;
    if (!el || galleryItems.length <= 1) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const scrollStep = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused && el) {
        const distance = (delta / 1000) * 16;
        el.scrollLeft += distance;

        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
          el.scrollLeft = 0;
        }
        updateScrollState();
      }

      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, galleryItems.length, updateScrollState]);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const amount = direction === "left" ? -400 : 400;
    containerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    setTimeout(updateScrollState, 350);
  };

  return (
    <section className="py-16 md:py-20 bg-white border-t border-[#E8E8E6] overflow-hidden">
      <div className="container-site mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-craft-label block mb-1">
              Bilder aus der Firma
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#181818] tracking-tight">
              Einblicke in Werkstatt & Betrieb
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollByAmount("left")}
              disabled={!canScrollLeft}
              className={`w-9 h-9 rounded-full border border-[#E8E8E6] bg-white flex items-center justify-center text-[#181818] transition-all cursor-pointer ${
                canScrollLeft
                  ? "hover:bg-[#181818] hover:text-white"
                  : "opacity-40 cursor-not-allowed"
              }`}
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollByAmount("right")}
              disabled={!canScrollRight}
              className={`w-9 h-9 rounded-full border border-[#E8E8E6] bg-white flex items-center justify-center text-[#181818] transition-all cursor-pointer ${
                canScrollRight
                  ? "hover:bg-[#181818] hover:text-white"
                  : "opacity-40 cursor-not-allowed"
              }`}
              aria-label="Nächstes Bild"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Relative Track with Fade-Out Masks */}
      <div
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left Fade-Out Mask */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Right Fade-Out Mask */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Slide Carousel Track */}
        <div
          ref={containerRef}
          onScroll={updateScrollState}
          className="flex gap-6 overflow-x-auto scrollbar-none py-2 px-6 sm:px-12 md:px-16"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {galleryItems.map((slide, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[300px] sm:w-[380px] md:w-[460px] rounded-lg overflow-hidden border border-[#E8E8E6] bg-[#F9F9F8] group"
            >
              <div className="relative h-60 sm:h-72 overflow-hidden bg-[#F2F2F0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.imageUrl}
                  alt={slide.caption || "Tischlerei Mehlhorn Schönheide"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {slide.caption && (
                <div className="p-4 bg-white border-t border-[#E8E8E6] flex items-start gap-2 text-xs text-[#555555]">
                  <ImageIcon size={14} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                  <span className="leading-snug">{slide.caption}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
