"use client";

interface FullwidthVideoProps {
  videoDesktopUrl?: string;
  videoMobileUrl?: string;
  posterImageUrl?: string;
  badge?: string;
  headline?: string;
  subheadline?: string;
}

export default function FullwidthVideoSection({
  videoDesktopUrl,
  videoMobileUrl,
  posterImageUrl = "/images/real/werkstatt-2.jpg",
  badge,
  headline,
  subheadline,
}: FullwidthVideoProps) {
  const desktopSrc = videoDesktopUrl || videoMobileUrl;
  const mobileSrc = videoMobileUrl || videoDesktopUrl;

  const hasVideo = Boolean(desktopSrc || mobileSrc);
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
            {/* Desktop Video */}
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={posterImageUrl}
              className={`w-full h-full object-cover object-center ${
                videoMobileUrl ? "hidden md:block" : "block"
              }`}
            >
              {desktopSrc && <source src={desktopSrc} type="video/mp4" />}
            </video>

            {/* Mobile Video (if distinct mobile URL provided) */}
            {videoMobileUrl && (
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={posterImageUrl}
                className="w-full h-full object-cover object-center block md:hidden"
              >
                <source src={videoMobileUrl} type="video/mp4" />
              </video>
            )}
          </>
        ) : (
          /* Fallback Poster when no video URL is configured in CMS */
          <div className="relative w-full h-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={posterImageUrl}
              alt="Meisterwerkstatt Tischlerei Mehlhorn"
              className="w-full h-full object-cover object-center opacity-70"
            />
          </div>
        )}

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-black/20 to-[#141414]/60 pointer-events-none" />

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
