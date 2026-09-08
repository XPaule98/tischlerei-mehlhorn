"use client";

interface FullwidthVideoProps {
  videoDesktopUrl?: string;
  videoMobileUrl?: string;
  posterImageUrl?: string;
  badge?: string;
  headline?: string;
  subheadline?: string;
}

function parseVideoSource(url?: string): {
  type: "streamable" | "youtube" | "vimeo" | "native" | "none";
  embedUrl?: string;
  nativeUrl?: string;
} {
  // If no URL or empty, default to the downloaded high-performance local video
  if (!url || !url.trim()) {
    return {
      type: "native",
      nativeUrl: "/videos/werkstatt.mp4",
    };
  }
  const trimmed = url.trim();

  // If the user pasted the 5n1th0 streamable link, use the optimized local native MP4 directly
  // This completely eliminates any black borders / letterboxing and plays at full resolution!
  if (trimmed.includes("5n1th0")) {
    return {
      type: "native",
      nativeUrl: "/videos/werkstatt.mp4",
    };
  }

  // Streamable: https://streamable.com/5n1th0 or https://streamable.com/e/5n1th0
  const streamableMatch = trimmed.match(/streamable\.com\/(?:e\/)?([a-zA-Z0-9]+)/);
  if (streamableMatch) {
    return {
      type: "streamable",
      embedUrl: `https://streamable.com/e/${streamableMatch[1]}?autoplay=1&muted=1&loop=1&controls=0`,
    };
  }

  // YouTube: youtube.com/watch?v=ID or youtu.be/ID
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) {
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&mute=1&loop=1&playlist=${ytMatch[1]}&controls=0&showinfo=0&modestbranding=1`,
    };
  }

  // Vimeo: vimeo.com/ID
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch) {
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&muted=1&loop=1&background=1`,
    };
  }

  // Native video file (.mp4, .webm, or any direct URL)
  return {
    type: "native",
    nativeUrl: trimmed,
  };
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

  const parsedDesktop = parseVideoSource(desktopSrc);
  const parsedMobile = videoMobileUrl ? parseVideoSource(mobileSrc) : null;

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
            {/* Desktop Video Player / Iframe */}
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

            {/* Mobile Video Player / Iframe (if distinct mobile URL provided) */}
            {parsedMobile && parsedMobile.type !== "none" && (
              <div className="w-full h-full block md:hidden">
                {parsedMobile.type === "native" ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={posterImageUrl}
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
