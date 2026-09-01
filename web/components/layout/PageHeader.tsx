import { ReactNode } from "react";
import Link from "next/link";

interface PageHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  breadcrumb?: string;
  headerImageUrl?: string;
  defaultImage?: string;
  children?: ReactNode;
}

export default function PageHeader({
  badge,
  title,
  subtitle,
  breadcrumb,
  headerImageUrl,
  defaultImage = "/images/real/gebaeude-1.jpg",
  children,
}: PageHeaderProps) {
  const bgImage = headerImageUrl || defaultImage;

  return (
    <section className="relative bg-[#141414] text-white pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden border-b border-[#2A2A28]">
      {/* Background Image with Unified Scandinavian Overlay */}
      {bgImage && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgImage}
            alt={title}
            className="w-full h-full object-cover opacity-30 object-center scale-105"
          />
          {/* Clean Vignette & Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-[#141414]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/90 via-[#141414]/50 to-transparent" />
        </div>
      )}

      {/* Content Container – Uniform on all pages */}
      <div className="container-site relative z-10">
        {/* Unified Breadcrumbs */}
        {breadcrumb && (
          <div className="flex items-center gap-1.5 text-xs text-white/50 mb-3">
            <Link href="/" className="hover:text-white transition-colors">
              Startseite
            </Link>
            <span>/</span>
            <span className="text-white/80 font-medium">{breadcrumb}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            {badge && (
              <div className="inline-block mb-3">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80 border-b border-white/30 pb-0.5">
                  {badge}
                </span>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              {title}
            </h1>

            {subtitle && (
              <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed mt-2.5 max-w-xl font-normal">
                {subtitle}
              </p>
            )}
          </div>

          {/* Optional Action / Filter slot */}
          {children && <div className="flex-shrink-0">{children}</div>}
        </div>
      </div>
    </section>
  );
}
