export interface ParsedVideo {
  type: "native" | "youtube" | "vimeo" | "none";
  nativeUrl?: string;
  embedUrl?: string;
}

/**
 * Universal video parser supporting:
 * - Direct Sanity CDN video file uploads (https://cdn.sanity.io/files/...)
 * - Direct MP4 / WebM URLs
 * - Local static video files (/videos/...)
 * - Streamable (IDs, direct links, embed links) -> routed via /api/streamable/[id] or local high-res MP4s
 * - YouTube (standard URLs, short youtu.be, embed, shorts) -> clean background iframe
 * - Vimeo (standard URLs, player URLs) -> clean background iframe
 */
export function parseVideoSource(
  url?: string | null,
  options?: { isMobile?: boolean; defaultNativeUrl?: string }
): ParsedVideo {
  if (!url || !url.trim()) {
    if (options?.defaultNativeUrl) {
      return {
        type: "native",
        nativeUrl: options.defaultNativeUrl,
      };
    }
    return { type: "none" };
  }

  const trimmed = url.trim();

  // 1. Streamable known high-res local overrides
  if (trimmed.includes("5n1th0")) {
    return {
      type: "native",
      nativeUrl: "/videos/werkstatt.mp4",
    };
  }

  if (trimmed.includes("zk32r9")) {
    return {
      type: "native",
      nativeUrl: "/videos/werkstatt-mobile.mp4",
    };
  }

  // 2. Any other Streamable link: Resolve directly to MP4 via our API route
  // Eliminates iframes, black borders, and watermarks
  const streamableMatch = trimmed.match(/streamable\.com\/(?:e\/)?([a-zA-Z0-9]+)/);
  if (streamableMatch) {
    return {
      type: "native",
      nativeUrl: `/api/streamable/${streamableMatch[1]}`,
    };
  }

  // 3. YouTube: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, shorts/ID
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  if (ytMatch) {
    const ytId = ytMatch[1];
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1`,
    };
  }

  // 4. Vimeo: vimeo.com/ID
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:video\/)?([0-9]+)/);
  if (vimeoMatch) {
    const vimeoId = vimeoMatch[1];
    return {
      type: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&loop=1&background=1&autopause=0&playsinline=1`,
    };
  }

  // 5. Direct native file (.mp4, .webm, Sanity CDN file upload URL, or any direct media URL)
  return {
    type: "native",
    nativeUrl: trimmed,
  };
}
