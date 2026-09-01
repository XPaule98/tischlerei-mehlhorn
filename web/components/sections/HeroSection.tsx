"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

export interface HeroSlide {
  imageUrl?: string;
  craftBadge?: string;
  title: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  durationSeconds?: number;
}

export interface HeroData {
  slides?: HeroSlide[];
  backgroundVideoUrl?: string;
}

const defaultSlides: HeroSlide[] = [
  {
    imageUrl: "/images/real/gebaeude-1.jpg",
    craftBadge: "Meisterbetrieb seit 1977 · Schönheide (Erzgebirge)",
    title: "Präzision in Holz. Beständigkeit für Generationen.",
    subtitle:
      "Eigene Fertigung von Holzfenstern, Holz-Aluminium-Systemen (Gutmann Mira), Haustüren und Wintergärten in Schönheide.",
    primaryButtonText: "Leistungen entdecken",
    primaryButtonLink: "/leistungen",
    secondaryButtonText: "Unverbindlich anfragen",
    secondaryButtonLink: "/kontakt",
    durationSeconds: 7,
  },
  {
    imageUrl: "/images/real/fenster-holzalu-buendig.jpg",
    craftBadge: "Eigene Fertigung · System Gutmann Mira",
    title: "Holz-Aluminium-Fenster der Premiumklasse.",
    subtitle:
      "Innen behagliches Naturholz, außen unverwüstliches Aluminium – meisterhaft verarbeitet in unserer Werkstatt.",
    primaryButtonText: "Fenster entdecken",
    primaryButtonLink: "/leistungen#eigenfertigung",
    secondaryButtonText: "Angebot anfordern",
    secondaryButtonLink: "/kontakt?gewerk=Holz-Alu-Fenster",
    durationSeconds: 7,
  },
  {
    imageUrl: "/images/real/tuer-5.jpg",
    craftBadge: "Handgefertigte Unikate nach Maß",
    title: "Massivholz-Haustüren für höchste Ansprüche.",
    subtitle:
      "Individuelle Fräsungen, geprüfter Einbruchschutz (RC2/RC3) und exzellente Wärmedämmung für Ihren Eingang.",
    primaryButtonText: "Haustüren ansehen",
    primaryButtonLink: "/leistungen#eigenfertigung",
    secondaryButtonText: "Beratung anfragen",
    secondaryButtonLink: "/kontakt?gewerk=Hauseingangstüren",
    durationSeconds: 7,
  },
  {
    imageUrl: "/images/real/wintergarten-1.jpg",
    craftBadge: "Wohnkomfort im Grünen zu jeder Jahreszeit",
    title: "Wintergärten & Glasbauten aus Meisterhand.",
    subtitle:
      "Tragende Holz- und Holz-Alu-Konstruktionen inklusive statischer Berechnung und schlüsselfertiger Montage.",
    primaryButtonText: "Wintergärten entdecken",
    primaryButtonLink: "/leistungen#eigenfertigung",
    secondaryButtonText: "Projekt anfragen",
    secondaryButtonLink: "/kontakt?gewerk=Wintergärten",
    durationSeconds: 7,
  },
];

export default function HeroSection({ data }: { data?: HeroData | null }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides: HeroSlide[] =
    data?.slides && data.slides.length > 0 ? data.slides : defaultSlides;

  const videoUrl = data?.backgroundVideoUrl;
  const currentSlide = slides[currentSlideIndex] || slides[0];
  const slideDuration = (currentSlide.durationSeconds || 7) * 1000;

  const goToNextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [slides.length]);

  const goToPrevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    if (index === currentSlideIndex) return;
    setIsTransitioning(true);
    setCurrentSlideIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Timer for automatic slide progression
  useEffect(() => {
    if (videoUrl || slides.length <= 1) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      goToNextSlide();
    }, slideDuration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSlideIndex, slideDuration, slides.length, videoUrl, goToNextSlide]);

  return (
    <section
      className="relative min-h-screen min-h-[100dvh] flex items-center overflow-hidden bg-[#141414] text-white"
      aria-label="Tischlerei Mehlhorn Startseite"
    >
      {/* Background Media Cross-Fade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          slides.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <div
                key={slide.imageUrl || index}
                className={`absolute inset-0 transition-opacity duration-1200 ease-in-out ${
                  isActive ? "opacity-45 scale-100" : "opacity-0 scale-105 pointer-events-none"
                } transition-transform duration-[8000ms]`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.imageUrl || "/images/real/gebaeude-1.jpg"}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            );
          })
        )}

        {/* Natural Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/55 to-[#141414]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/80 via-transparent to-[#141414]/30" />
      </div>

      {/* Hero Slide Content – Smooth Fade & Transition */}
      <div className="container-site relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-2xl relative min-h-[280px] sm:min-h-[300px] flex flex-col justify-center">
          {slides.map((slide, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <div
                key={index}
                className={`transition-all duration-700 ease-out ${
                  isActive
                    ? "opacity-100 translate-y-0 relative z-10"
                    : "opacity-0 translate-y-3 absolute inset-0 pointer-events-none z-0"
                }`}
              >
                {/* Badge */}
                {slide.craftBadge && (
                  <div className="inline-block mb-3 sm:mb-4">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80 border-b border-white/30 pb-0.5">
                      {slide.craftBadge}
                    </span>
                  </div>
                )}

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                {slide.subtitle && (
                  <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-xl font-normal">
                    {slide.subtitle}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  {slide.primaryButtonText && (
                    <Link
                      href={slide.primaryButtonLink || "/leistungen"}
                      className="btn bg-white text-[#181818] hover:bg-[#F0EFEB] font-semibold text-xs sm:text-sm py-3 px-6 rounded flex items-center justify-center gap-1.5"
                    >
                      {slide.primaryButtonText}
                      <ChevronRight size={15} />
                    </Link>
                  )}
                  {slide.secondaryButtonText && (
                    <Link
                      href={slide.secondaryButtonLink || "/kontakt"}
                      className="btn btn-outline text-xs sm:text-sm py-3 px-6 rounded flex items-center justify-center"
                    >
                      {slide.secondaryButtonText}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide Navigation Controls & Progress Dots */}
      {!videoUrl && slides.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="container-site flex items-center justify-between">
            {/* Interactive Progress Indicators */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Zu Folie ${i + 1} wechseln`}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    i === currentSlideIndex
                      ? "w-8 sm:w-10 bg-white"
                      : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={goToPrevSlide}
                aria-label="Vorherige Folie"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={goToNextSlide}
                aria-label="Nächste Folie"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
