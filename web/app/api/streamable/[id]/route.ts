import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (id === "5n1th0") {
    return NextResponse.redirect(new URL("/videos/werkstatt.mp4", _req.url));
  }
  if (id === "zk32r9") {
    return NextResponse.redirect(new URL("/videos/werkstatt-mobile.mp4", _req.url));
  }

  try {
    const res = await fetch(`https://api.streamable.com/videos/${id}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (res.ok) {
      const data = await res.json();
      const mp4Url = data?.files?.mp4?.url;
      if (mp4Url) {
        return NextResponse.redirect(mp4Url);
      }
    }
  } catch (e) {
    // fallback
  }

  return NextResponse.redirect(new URL("/videos/werkstatt.mp4", _req.url));
}
