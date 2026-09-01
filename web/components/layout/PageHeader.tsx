"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  headerImageUrl?: string;
  headerVideoUrl?: string;
  defaultImage?: string;
  breadcrumb?: string;
  badge?: string;
}

export default function PageHeader({
  title,
  subtitle,
  headerImageUrl,
  headerVideoUrl,
  defaultImage = "/images/real/gebaeude-1.jpg",
  breadcrumb,
}: PageHeaderProps) {
  const bgImage = headerImageUrl || defaultImage;
  const [scrollY, setScrollY] = useState(0);

  // Smooth performant Parallax scroll tracking
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax translation
  const parallaxOffset = scrollY * 0.35;

  return (
    <section className="relative bg-[#141414] text-white pt-28 pb-10 sm:pt-36 sm:pb-12 md:pt-40 md:pb-16 overflow-hidden border-b border-[#2A2A28]">
      {/* Parallax Background Media Layer */}
      <div
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
        style={{
          transform: `translate3d(0, ${parallaxOffset}px, 0)`,
          willChange: "transform",
        }}
      >
        {headerVideoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[120%] -top-[10%] relative object-cover opacity-55 object-center"
          >
            <source src={headerVideoUrl} type="video/mp4" />
          </video>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={bgImage}
            alt={title}
            className="w-full h-[120%] -top-[10%] relative object-cover opacity-55 object-center"
          />
        )}

        {/* Clean Natural Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-[#141414]/45 to-[#141414]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/65 via-transparent to-[#141414]/20" />
      </div>

      {/* Content Container with Generous Mobile Clearance & Crisp Breadcrumb */}
      <div className="container-site relative z-10">
        <div className="max-w-3xl">
          {/* Breadcrumb Navigation – Prevents top clipping on Mobile */}
          <div className="flex items-center gap-1.5 text-xs text-white/70 mb-2 font-medium drop-shadow-xs">
            <Link href="/" className="hover:text-white transition-colors">
              Startseite
            </Link>
            <span>/</span>
            <span className="text-white/95 font-semibold">
              {breadcrumb || title}
            </span>
          </div>

          {/* Title – Bold & prominent */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-2.5 drop-shadow-sm">
            {title}
          </h1>

          {/* Subtitle – Clean 1-2 line description */}
          {subtitle && (
            <p className="text-white/90 text-xs sm:text-base md:text-lg leading-relaxed font-normal drop-shadow-xs max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
