"use client";

import { parseVideoSource } from "@/lib/video";

interface FullwidthVideoProps {
  videoDesktopUrl?: string;
  videoMobileUrl?: string;
  posterImageUrl?: string;
  posterMobileImageUrl?: string;
  badge?: string;
  headline?: string;
  subheadline?: string;
}

export default function FullwidthVideoSection({
  videoDesktopUrl,
  videoMobileUrl,
  posterImageUrl = "/images/real/werkstatt-2.jpg",
  posterMobileImageUrl,
  badge,
  headline,
  subheadline,
}: FullwidthVideoProps) {
  const desktopSrc = videoDesktopUrl || videoMobileUrl;
  const mobileSrc = videoMobileUrl || videoDesktopUrl;

  const parsedDesktop = parseVideoSource(desktopSrc, {
    defaultNativeUrl: videoDesktopUrl ? "/videos/werkstatt.mp4" : undefined,
  });
  const parsedMobile = videoMobileUrl
    ? parseVideoSource(mobileSrc, {
        isMobile: true,
        defaultNativeUrl: "/videos/werkstatt-mobile.mp4",
      })
    : null;

  const hasVideo = parsedDesktop.type !== "none";
  const hasText = Boolean(badge || headline || subheadline);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#141414] text-white border-y border-[#2A2A28]"
      aria-label="Handwerk & Fertigung Video"
    >
      {/* Fullwidth Video Container */}
      <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[80vh] bg-[#141414] overflow-hidden">
        {hasVideo ? (
          <>
            {/* Desktop Video Player */}
            <div className={`w-full h-full ${parsedMobile ? "hidden md:block" : "block"}`}>
              {parsedDesktop.type === "native" ? (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={posterImageUrl}
                  className="w-full h-full object-cover object-center"
                >
                  <source src={parsedDesktop.nativeUrl} type="video/mp4" />
                </video>
              ) : (
                <div className="relative w-full h-full overflow-hidden pointer-events-none">
                  <iframe
                    src={parsedDesktop.embedUrl}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[178vh] min-w-[130%] h-[56.25vw] min-h-[130%] border-0 pointer-events-none scale-125"
                    allow="autoplay; fullscreen; encrypted-media"
                    title="Hintergrundvideo Desktop"
                  />
                </div>
              )}
            </div>

            {/* Mobile Video Player */}
            {parsedMobile && parsedMobile.type !== "none" && (
              <div className="w-full h-full block md:hidden">
                {parsedMobile.type === "native" ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={posterMobileImageUrl || posterImageUrl}
                    className="w-full h-full object-cover object-center"
                  >
                    <source src={parsedMobile.nativeUrl} type="video/mp4" />
                  </video>
                ) : (
                  <div className="relative w-full h-full overflow-hidden pointer-events-none">
                    <iframe
                      src={parsedMobile.embedUrl}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[178vh] min-w-[140%] h-[56.25vw] min-h-[140%] border-0 pointer-events-none scale-125"
                      allow="autoplay; fullscreen; encrypted-media"
                      title="Hintergrundvideo Mobile"
                    />
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          /* Fallback Poster when no video URL is configured */
          <div className="relative w-full h-full overflow-hidden">
            {/* Desktop / Standard Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posterImageUrl}
              alt="Meisterwerkstatt Tischlerei Mehlhorn"
              className={`w-full h-full object-cover object-center ${
                posterMobileImageUrl ? "hidden md:block" : "block"
              } ${hasText ? "opacity-70" : "opacity-100"}`}
            />

            {/* Mobile Specific Image if provided */}
            {posterMobileImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={posterMobileImageUrl}
                alt="Meisterwerkstatt Tischlerei Mehlhorn"
                className={`w-full h-full object-cover object-center block md:hidden ${
                  hasText ? "opacity-70" : "opacity-100"
                }`}
              />
            )}
          </div>
        )}

        {/* Cinematic Vignette Overlay – strong when text exists, subtle when pure media */}
        {hasText ? (
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-black/20 to-[#141414]/60 pointer-events-none" />
        ) : (
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        )}

        {/* Optional Overlay Text */}
        {hasText && (
          <div className="absolute inset-0 flex items-center justify-center text-center p-6 pointer-events-none z-10">
            <div className="max-w-2xl">
              {badge && (
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90 border-b border-white/40 pb-0.5 mb-3 inline-block drop-shadow-sm">
                  {badge}
                </span>
              )}
              {headline && (
                <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 drop-shadow-md leading-tight">
                  {headline}
                </h3>
              )}
              {subheadline && (
                <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed drop-shadow-xs max-w-xl mx-auto">
                  {subheadline}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
