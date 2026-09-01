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
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Background Slideshow
  useEffect(() => {
    if (videoUrl || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images, videoUrl]);

  const badge = data?.craftBadge || "Meisterbetrieb seit 1977 · Schönheide (Erzgebirge)";
  const title = data?.title || "Präzision in Holz. Beständigkeit für Generationen.";
  const subtitle =
    data?.subtitle ||
    "Eigene Fertigung von Holzfenstern, Holz-Aluminium-Systemen (Gutmann Mira), Haustüren und Wintergärten in Schönheide.";

  return (
    <section
      className="relative min-h-screen min-h-[100dvh] flex items-center overflow-hidden bg-[#141414] text-white"
      aria-label="Tischlerei Mehlhorn Startseite"
    >
      {/* Background Media */}
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
          images.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? "opacity-40 scale-100" : "opacity-0 scale-105"
              } transition-transform duration-[8000ms]`}
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

        {/* Clean Natural Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-[#141414]/30" />

        {/* Minimalist image indicator dots */}
        {!videoUrl && images.length > 1 && (
          <div className="absolute bottom-8 right-8 z-20 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                aria-label={`Bild ${i + 1}`}
                className={`h-1 transition-all duration-300 rounded-full cursor-pointer ${
                  i === currentImageIndex ? "w-7 bg-white" : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Hero Content */}
      <div className="container-site relative z-10 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-2xl">
          {/* Badge */}
          <div
            className={`inline-block mb-4 transition-all duration-500 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80 border-b border-white/30 pb-1">
              {badge}
            </span>
          </div>

          {/* Clean Sans Headline */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5 text-white transition-all duration-500 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            className={`text-white/80 text-base sm:text-lg md:text-xl leading-relaxed mb-8 font-normal transition-all duration-500 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {subtitle}
          </p>

          {/* Clean Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3 transition-all duration-500 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <Link
              href="/leistungen"
              className="btn bg-white text-[#181818] hover:bg-[#F0EFEB] font-semibold text-sm py-3 px-6 rounded flex items-center justify-center gap-2"
            >
              Leistungen entdecken
              <ChevronRight size={15} />
            </Link>
            <Link
              href="/kontakt"
              className="btn btn-outline text-sm py-3 px-6 rounded flex items-center justify-center"
            >
              Unverbindlich anfragen
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
