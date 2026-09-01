"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface HeroData {
  craftBadge?: string;
  title?: string;
  subtitle?: string;
  backgroundImages?: string[];
  backgroundVideoUrl?: string;
}

const defaultImages = [
  "/images/real/gebaeude-1.jpg",
  "/images/real/tuer-5.jpg",
  "/images/real/fenster-holzalu-buendig.jpg",
  "/images/real/wintergarten-1.jpg",
  "/images/real/werkstatt-2.jpg",
];

export default function HeroSection({ data }: { data?: HeroData | null }) {
  const [loaded, setLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images =
    data?.backgroundImages && data.backgroundImages.length > 0
      ? data.backgroundImages
      : defaultImages;

  const videoUrl = data?.backgroundVideoUrl;

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  // Background Slideshow Timer (Changes image every 6 seconds with smooth cross-fade)
  useEffect(() => {
    if (videoUrl || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images, videoUrl]);

  const badge = data?.craftBadge || "Meisterbetrieb seit 1977 · Inh. Ronny Mehlhorn";
  const title = data?.title || "Präzision in Holz. Beständigkeit für Generationen.";
  const subtitle =
    data?.subtitle ||
    "Eigene Herstellung von Fenstern, Haustüren und Wintergärten sowie fachgerechte Montage geprüfter Marken-Bauelemente.";

  return (
    <section
      className="relative min-h-screen min-h-[100dvh] flex items-center overflow-hidden bg-[#161311] text-[#FAF8F5]"
      aria-label="Tischlerei Mehlhorn Einführung"
    >
      {/* Background: Video or Cross-Fading Slideshow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {videoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-45 scale-105"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          images.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                index === currentImageIndex ? "opacity-45 scale-105" : "opacity-0 scale-100"
              } transition-transform duration-[7000ms]`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Tischlerei Mehlhorn Meisterwerkstatt"
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))
        )}

        {/* Warm Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141210]/95 via-[#161311]/70 to-[#161311]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-[#141210]/40" />

        {/* Slideshow indicator dots (subtle) */}
        {!videoUrl && images.length > 1 && (
          <div className="absolute bottom-8 right-8 z-20 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                aria-label={`Hintergrundbild ${i + 1} anzeigen`}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  i === currentImageIndex
                    ? "w-8 bg-[#B48A58]"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Hero Content */}
      <div className="container-site relative z-10 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-3xl">
          {/* Craft Label */}
          <div
            className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="w-8 h-[1px] bg-[#B48A58]" />
            <span className="text-craft-label text-[#D4B28C]">
              {badge}
            </span>
          </div>

          {/* Main Serif Headline */}
          <h1
            className={`font-serif-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.12] mb-7 text-[#FAF8F5] transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            className={`text-[#D6CCC0] text-lg md:text-xl max-w-2xl leading-relaxed mb-10 font-normal transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-all duration-700 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "450ms" }}
          >
            <Link
              href="/leistungen"
              className="btn btn-wood text-sm font-medium py-3.5 px-7 flex items-center justify-center gap-2"
            >
              Leistungen entdecken
              <ChevronRight size={16} />
            </Link>
            <Link
              href="/kontakt"
              className="btn btn-outline text-sm font-medium py-3.5 px-7 flex items-center justify-center"
            >
              Unverbindlich anfragen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
