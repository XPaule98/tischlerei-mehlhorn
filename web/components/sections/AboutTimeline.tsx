"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, History } from "lucide-react";

interface TimelineEvent {
  year: string;
  tagline: string;
  title: string;
  description: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "1977",
    tagline: "Die Gründung",
    title: "Ursprung & traditioneller Gestellbau",
    description:
      "Roland Mehlhorn gründet im Januar 1977 die Tischlerei in Schönheide. Mit Qualitätsarbeit und Leidenschaft für Holz entsteht das Fundament.",
  },
  {
    year: "1992",
    tagline: "Expansion & Neubau",
    title: "Umzug in die Neuheider Straße 64 b",
    description:
      "Neubau des heutigen Firmengebäudes mit modernem Maschinenpark. Spezialisierung auf maßgefertigte Holzfenster, Haustüren und Wintergärten.",
  },
  {
    year: "2012",
    tagline: "Generationswechsel",
    title: "Meisterübergabe an Ronny Mehlhorn",
    description:
      "Tischlermeister Ronny Mehlhorn übernimmt am 1. Juli 2012 die Führung. Verbindung von Familientradition mit modernen Profilsystemen (Gutmann Mira).",
  },
  {
    year: "Heute",
    tagline: "Meisterbetrieb im Erzgebirge",
    title: "Präzision & Fachmontage nach Maß",
    description:
      "Über 45 Jahre Erfahrung. Eigene Herstellung im Erzgebirge ergänzt um Fachmontage geprüfter Qualitäts-Bauelemente für Neubau und Denkmalschutz.",
  },
];

export default function AboutTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll bounds
  const updateScrollState = useCallback(() => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  // Always reset to the beginning (1977) on mount
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
      updateScrollState();
    }
  }, [updateScrollState]);

  // Gentle auto-scroll motion that pauses on hover/touch
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const scrollStep = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isPaused && el) {
        // Slow, gentle continuous drift (approx 18px per second)
        const distance = (delta / 1000) * 18;
        el.scrollLeft += distance;

        // Loop back smoothly to the beginning if end is reached
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) {
          el.scrollLeft = 0;
        }
        updateScrollState();
      }

      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, updateScrollState]);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const amount = direction === "left" ? -340 : 340;
    containerRef.current.scrollBy({ left: amount, behavior: "smooth" });
    setTimeout(updateScrollState, 350);
  };

  return (
    <section
      id="historie"
      className="py-16 md:py-20 bg-[#F9F9F8] border-t border-[#E8E8E6] overflow-hidden"
      aria-labelledby="timeline-heading"
    >
      <div className="container-site mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-craft-label block mb-1">Über 45 Jahre Erfahrung</span>
            <h2
              id="timeline-heading"
              className="text-2xl sm:text-3xl font-bold text-[#181818] tracking-tight"
            >
              Historie & Meilensteine
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollByAmount("left")}
              disabled={!canScrollLeft}
              className={`w-9 h-9 rounded-full border border-[#E8E8E6] bg-white flex items-center justify-center text-[#181818] transition-all cursor-pointer ${
                canScrollLeft ? "hover:bg-[#181818] hover:text-white" : "opacity-40 cursor-not-allowed"
              }`}
              aria-label="Zurück scrollen"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollByAmount("right")}
              disabled={!canScrollRight}
              className={`w-9 h-9 rounded-full border border-[#E8E8E6] bg-white flex items-center justify-center text-[#181818] transition-all cursor-pointer ${
                canScrollRight ? "hover:bg-[#181818] hover:text-white" : "opacity-40 cursor-not-allowed"
              }`}
              aria-label="Weiter scrollen"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Relative Track Wrapper with Soft Gradient Fade-Out on Edges */}
      <div
        className="relative w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Left Fade-Out Mask */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#F9F9F8] via-[#F9F9F8]/80 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Right Fade-Out Mask */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#F9F9F8] via-[#F9F9F8]/80 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Horizontal Scroll Track */}
        <div
          ref={containerRef}
          onScroll={updateScrollState}
          className="flex gap-6 overflow-x-auto scrollbar-none py-4 px-6 sm:px-12 md:px-16"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {timelineEvents.map((event, index) => (
            <div
              key={event.year}
              className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] bg-white p-6 rounded-lg border border-[#E8E8E6] shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Year Badge & Tagline */}
                <div className="flex items-center justify-between gap-2 mb-3 pb-3 border-b border-[#F2F2F0]">
                  <span className="text-2xl sm:text-3xl font-bold text-[#181818]">
                    {event.year}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D4F] bg-[#F9F9F8] px-2.5 py-1 rounded border border-[#E8E8E6]">
                    {event.tagline}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#181818] mb-2 leading-snug">
                  {event.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Progress Step Indicator */}
              <div className="pt-4 mt-4 border-t border-[#F2F2F0] flex items-center justify-between text-[11px] text-[#777777]">
                <span>Station {index + 1} von {timelineEvents.length}</span>
                <History size={13} className="text-[#8C6D4F]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
