"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterSliderProps {
  beforeSrc?: string;
  afterSrc?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export default function BeforeAfterSlider({
  beforeSrc = "/images/hero-bg.jpg",
  afterSrc = "/images/service-wintergarten.jpg",
  beforeLabel = "Werkstattfertigung",
  afterLabel = "Montage beim Kunden",
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      calculatePosition(e.clientX);
    },
    [isDragging, calculatePosition]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      calculatePosition(e.touches[0].clientX);
    },
    [isDragging, calculatePosition]
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <section
      id="vergleich"
      className="section-pad bg-[#1C1815] text-[#FAF8F5]"
      aria-labelledby="beforeafter-heading"
    >
      <div className="container-site">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-craft-label text-[#CBB295] block mb-2">
            Vorher & Nachher
          </span>
          <h2
            id="beforeafter-heading"
            className="font-serif-heading text-3xl md:text-5xl font-normal text-[#FAF8F5] mb-4"
          >
            Vom Rohelement zum fertigen Bauwerk
          </h2>
          <p className="text-[#A89F95] text-base">
            Verschieben Sie den Regler, um den Übergang von der Werkstattfertigung zur fertigen Montage beim Kunden zu erleben.
          </p>
        </div>

        {/* Slider Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="before-after-container rounded-xl overflow-hidden shadow-2xl border border-white/10"
            style={{ aspectRatio: "16/9" }}
            onMouseDown={(e) => {
              setIsDragging(true);
              calculatePosition(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              calculatePosition(e.touches[0].clientX);
            }}
            role="slider"
            aria-label="Vorher-Nachher Vergleich"
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            {/* Before Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={beforeSrc}
              alt={`Vorher: ${beforeLabel}`}
              className="absolute inset-0 w-full h-full object-cover select-none"
              draggable={false}
            />

            {/* After Image */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${position}%` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={afterSrc}
                alt={`Nachher: ${afterLabel}`}
                className="absolute inset-0 h-full object-cover select-none"
                style={{ width: `${100 / (position / 100)}%` }}
                draggable={false}
              />
            </div>

            {/* Handle */}
            <div
              className="before-after-handle"
              style={{ left: `${position}%` }}
            >
              <div className="before-after-handle-circle">
                <MoveHorizontal size={18} className="text-[#1E1A17]" />
              </div>
            </div>

            {/* Subtle Minimal Labels */}
            <div className="absolute top-4 left-4 bg-[#1E1A17]/85 backdrop-blur-sm text-white text-xs px-3.5 py-1.5 rounded font-medium select-none border border-white/10">
              {afterLabel}
            </div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#1E1A17] text-xs px-3.5 py-1.5 rounded font-medium select-none border border-[#E6DED4]">
              {beforeLabel}
            </div>
          </div>

          <p className="text-center text-[#8C8277] text-xs mt-4">
            ← Regler mit Maus oder Finger ziehen →
          </p>
        </div>
      </div>
    </section>
  );
}
