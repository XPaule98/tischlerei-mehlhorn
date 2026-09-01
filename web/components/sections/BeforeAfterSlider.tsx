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
  afterLabel = "Fertige Montage",
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
      id="referenzen"
      className="section-pad bg-[#121212]"
      aria-labelledby="beforeafter-heading"
    >
      <div className="container-site">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-label text-[#E5DECE]/60 mb-3">Qualität sehen</p>
          <h2
            id="beforeafter-heading"
            className="text-display text-white text-3xl md:text-5xl mb-5"
          >
            Vorher / Nachher
          </h2>
          <p className="text-white/50 max-w-md mx-auto">
            Ziehen Sie den Regler, um Werkstattfertigung und fertige Montage zu
            vergleichen.
          </p>
        </div>

        {/* Slider Container */}
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="before-after-container rounded-2xl overflow-hidden shadow-2xl"
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
            {/* Before Image (full width) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={beforeSrc}
              alt={`Vorher: ${beforeLabel}`}
              className="absolute inset-0 w-full h-full object-cover select-none"
              draggable={false}
            />

            {/* After Image (clipped) */}
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
              {/* Vertical line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white -translate-x-px" />

              {/* Circle */}
              <div className="before-after-handle-circle z-10">
                <MoveHorizontal size={20} className="text-[#121212]" />
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full font-semibold tracking-wide select-none">
              {afterLabel}
            </div>
            <div className="absolute top-4 right-4 bg-white/90 text-[#121212] text-xs px-3 py-1.5 rounded-full font-semibold tracking-wide select-none">
              {beforeLabel}
            </div>
          </div>

          {/* Hint */}
          <p className="text-center text-white/30 text-sm mt-4">
            ← Regler ziehen zum Vergleichen →
          </p>
        </div>
      </div>
    </section>
  );
}
