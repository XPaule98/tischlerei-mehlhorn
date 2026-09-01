"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface HeroSlideItem {
  imageUrl?: string;
  customTitle?: string;
  customSubtitle?: string;
}

export interface HeroData {
  craftBadge?: string;
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  slides?: HeroSlideItem[];
  backgroundVideoUrl?: string;
}

const defaultImages = [
  "/images/real/gebaeude-1.jpg",
  "/images/real/fenster-holzalu-buendig.jpg",
  "/images/real/tuer-5.jpg",
  "/images/real/wintergarten-1.jpg",
  "/images/real/werkstatt-2.jpg",
];

const SLIDE_DURATION = 6500; // Fixed calm slide duration (6.5 seconds)

export default function HeroSection({ data }: { data?: HeroData | null }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Extract images
  const slideItems: HeroSlideItem[] =
    data?.slides && data.slides.length > 0
      ? data.slides
      : defaultImages.map((src) => ({ imageUrl: src }));

  const videoUrl = data?.backgroundVideoUrl;
  const currentSlide = slideItems[currentSlideIndex] || slideItems[0];

  // Default global texts
  const defaultBadge = data?.craftBadge || "Meisterbetrieb seit 1977 · Schönheide (Erzgebirge)";
  const defaultTitle = data?.title || "Präzision in Holz. Beständigkeit für Generationen.";
  const defaultSubtitle =
    data?.subtitle ||
    "Eigene Fertigung von Holzfenstern, Holz-Aluminium-Systemen (Gutmann Mira), Haustüren und Wintergärten in Schönheide.";
  const primaryText = data?.primaryButtonText || "Leistungen entdecken";
  const primaryLink = data?.primaryButtonLink || "/leistungen";
  const secondaryText = data?.secondaryButtonText || "Unverbindlich anfragen";
  const secondaryLink = data?.secondaryButtonLink || "/kontakt";

  // Check if any slide has custom text overrides
  const hasCustomTexts = slideItems.some((s) => Boolean(s.customTitle || s.customSubtitle));

  const activeTitle = currentSlide.customTitle || defaultTitle;
  const activeSubtitle = currentSlide.customSubtitle || defaultSubtitle;

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % slideItems.length);
  }, [slideItems.length]);

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  // Fixed harmonic timer
  useEffect(() => {
    if (videoUrl || slideItems.length <= 1) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      goToNextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSlideIndex, slideItems.length, videoUrl, goToNextSlide]);

  return (
    <section
      className="relative min-h-screen min-h-[100dvh] flex items-center overflow-hidden bg-[#141414] text-white"
      aria-label="Tischlerei Mehlhorn Startseite"
    >
      {/* Background Slideshow with Ultra-Smooth 1.5s Cross-Fade */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-35"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          slideItems.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <div
                key={slide.imageUrl || index}
                className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                  isActive ? "opacity-35" : "opacity-0"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.imageUrl || "/images/real/gebaeude-1.jpg"}
                  alt="Tischlerei Mehlhorn Meisterwerkstatt"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            );
          })
        )}

        {/* Clean Natural Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-[#141414]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/80 via-transparent to-[#141414]/20" />
      </div>

      {/* Hero Content Area */}
      <div className="container-site relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-2xl">
          {/* Badge: Always stays firmly and calmly in place */}
          <div className="inline-block mb-4">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80 border-b border-white/30 pb-0.5">
              {defaultBadge}
            </span>
          </div>

          {/* Headline & Subtitle */}
          {!hasCustomTexts ? (
            /* Case 1: Standard text stays completely STATIC with ZERO jumpiness or flickering */
            <div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
                {defaultTitle}
              </h1>
              <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-xl font-normal">
                {defaultSubtitle}
              </p>
            </div>
          ) : (
            /* Case 2: Custom slide text with ultra-soft 1s cross-fade */
            <div className="relative min-h-[160px] sm:min-h-[180px]">
              {slideItems.map((slide, index) => {
                const isActive = index === currentSlideIndex;
                const title = slide.customTitle || defaultTitle;
                const subtitle = slide.customSubtitle || defaultSubtitle;

                return (
                  <div
                    key={index}
                    className={`transition-opacity duration-1000 ease-in-out ${
                      isActive
                        ? "opacity-100 relative z-10"
                        : "opacity-0 absolute inset-0 pointer-events-none z-0"
                    }`}
                  >
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
                      {title}
                    </h1>
                    <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-xl font-normal">
                      {subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* CTA Buttons: Calm & solid */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href={primaryLink}
              className="btn bg-white text-[#181818] hover:bg-[#F0EFEB] font-semibold text-xs sm:text-sm py-3 px-6 rounded flex items-center justify-center gap-1.5"
            >
              {primaryText}
              <ChevronRight size={15} />
            </Link>
            <Link
              href={secondaryLink}
              className="btn btn-outline text-xs sm:text-sm py-3 px-6 rounded flex items-center justify-center"
            >
              {secondaryText}
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle Slide Indicators */}
      {!videoUrl && slideItems.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="container-site flex items-center justify-between">
            <div className="flex items-center gap-2">
              {slideItems.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Zu Bild ${i + 1} wechseln`}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    i === currentSlideIndex
                      ? "w-8 bg-white"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
