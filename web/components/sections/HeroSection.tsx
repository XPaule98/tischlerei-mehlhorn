"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface HeroData {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  imageUrls?: string[];
  legacySlideUrls?: string[];
  backgroundVideoUrl?: string;
}

const defaultImages = [
  "/images/hero-bg.jpg",
  "/images/service-fenster.jpg",
  "/images/service-tuer.jpg",
  "/images/service-wintergarten.jpg",
];

const SLIDE_DURATION = 6500;

export default function HeroSection({ data }: { data?: HeroData | null }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Extract high-resolution landscape images
  const images: string[] =
    data?.imageUrls && data.imageUrls.length > 0
      ? data.imageUrls
      : data?.legacySlideUrls && data.legacySlideUrls.length > 0
      ? data.legacySlideUrls
      : defaultImages;

  const videoUrl = data?.backgroundVideoUrl;

  // Static calm permanent texts (no dynamic switching tool)
  const title = data?.title || "Präzision in Holz. Beständigkeit für Generationen.";
  const subtitle =
    data?.subtitle ||
    "Eigene Fertigung von Holzfenstern, Holz-Aluminium-Systemen (Gutmann Mira), Haustüren und Wintergärten in Schönheide.";

  // Optional Buttons
  const primaryText = data?.primaryButtonText !== undefined ? data.primaryButtonText : "Leistungen entdecken";
  const primaryLink = data?.primaryButtonLink || "/leistungen";
  const secondaryText = data?.secondaryButtonText !== undefined ? data.secondaryButtonText : "Unverbindlich anfragen";
  const secondaryLink = data?.secondaryButtonLink || "/kontakt";

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  // Fixed harmonic timer for calm image cross-fade
  useEffect(() => {
    if (videoUrl || images.length <= 1) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      goToNextSlide();
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentSlideIndex, images.length, videoUrl, goToNextSlide]);

  return (
    <section
      className="relative min-h-screen min-h-[100dvh] flex items-center overflow-hidden bg-[#141414] text-white"
      aria-label="Tischlerei Mehlhorn Startseite"
    >
      {/* Background Slideshow Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 object-center"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          images.map((src, index) => {
            const isActive = index === currentSlideIndex;
            return (
              <div
                key={src || index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-60 z-10" : "opacity-0 z-0"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt="Tischlerei Mehlhorn Meisterbetrieb"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            );
          })
        )}

        {/* High-contrast gradient backdrop on the left for crisp text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#141414]/95 via-[#141414]/75 to-transparent w-full md:w-[70%]" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
      </div>

      {/* Hero Content Area – Permanently Calm & Static Text */}
      <div className="container-site relative z-20 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight drop-shadow-md">
            {title}
          </h1>

          {subtitle && (
            <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-xl font-normal drop-shadow-sm">
              {subtitle}
            </p>
          )}

          {/* CTA Buttons */}
          {(Boolean(primaryText) || Boolean(secondaryText)) && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {primaryText && (
                <Link
                  href={primaryLink}
                  className="btn bg-white text-[#181818] hover:bg-[#F0EFEB] font-semibold text-xs sm:text-sm py-3 px-6 rounded flex items-center justify-center gap-1.5 shadow-md"
                >
                  {primaryText}
                  <ChevronRight size={15} />
                </Link>
              )}
              {secondaryText && (
                <Link
                  href={secondaryLink}
                  className="btn btn-outline text-xs sm:text-sm py-3 px-6 rounded flex items-center justify-center backdrop-blur-xs"
                >
                  {secondaryText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Subtle Slide Indicators */}
      {!videoUrl && images.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="container-site flex items-center justify-between">
            <div className="flex items-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Zu Bild ${i + 1} wechseln`}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    i === currentSlideIndex
                      ? "w-8 bg-white shadow-xs"
                      : "w-2 bg-white/40 hover:bg-white/70"
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
