import Link from "next/link";

interface PageHeaderProps {
  breadcrumb: string;
  badge?: string;
  title: string;
  subtitle: string;
  headerImageUrl?: string;
  headerVideoUrl?: string;
  defaultImage?: string;
}

export default function PageHeader({
  breadcrumb,
  badge = "Meisterbetrieb seit 1977 · Schönheide",
  title,
  subtitle,
  headerImageUrl,
  headerVideoUrl,
  defaultImage = "/images/real/gebaeude-1.jpg",
}: PageHeaderProps) {
  const bgImage = headerImageUrl || defaultImage;

  return (
    <section className="relative bg-[#141414] text-white pt-28 pb-10 md:pt-36 md:pb-14 overflow-hidden border-b border-[#2A2A28]">
      {/* Background Media with Unified Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {headerVideoUrl ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-35 object-center"
          >
            <source src={headerVideoUrl} type="video/mp4" />
          </video>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={bgImage}
            alt={title}
            className="w-full h-full object-cover opacity-35 object-center"
          />
        )}
        {/* Clean Vignette & Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-[#141414]/30" />
      </div>

      {/* Content Container – Exactly Identical on Every Page */}
      <div className="container-site relative z-10">
        <div className="max-w-3xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-white/50 mb-2.5">
            <Link href="/" className="hover:text-white transition-colors">
              Startseite
            </Link>
            <span>/</span>
            <span className="text-white/80 font-medium">{breadcrumb}</span>
          </div>

          {/* Badge */}
          <div className="inline-block mb-2.5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70 border-b border-white/20 pb-0.5">
              {badge}
            </span>
          </div>

          {/* Title – 1-line bold & crisp */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-2">
            {title}
          </h1>

          {/* Subtitle – Clean 1-2 line description */}
          <p className="text-white/75 text-sm sm:text-base leading-relaxed font-normal">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
