import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import FullwidthVideoSection from "@/components/sections/FullwidthVideoSection";
import { client } from "@/sanity/lib/client";
import { HERO_QUERY, SHOWCASE_VIDEO_QUERY, HOME_SECTIONS_QUERY, SERVICES_QUERY } from "@/sanity/lib/queries";
import { ArrowRight } from "lucide-react";

export const revalidate = 30;

export default async function HomePage() {
  let heroData = null;
  let videoData = null;
  let homeData = null;
  let cmsServices = null;

  try {
    [heroData, videoData, homeData, cmsServices] = await Promise.all([
      client.fetch(HERO_QUERY),
      client.fetch(SHOWCASE_VIDEO_QUERY),
      client.fetch(HOME_SECTIONS_QUERY),
      client.fetch(SERVICES_QUERY),
    ]);
  } catch (e) {
    // Fallback gracefully
  }


  // Story section data
  const storyEyebrow = homeData?.storyEyebrow || "Handwerk aus Schönheide seit 1977";
  const storyHeadline = homeData?.storyHeadline || "Präzision aus Erfahrung. Leidenschaft für Holz.";
  const storyParagraph1 =
    homeData?.storyParagraph1 ||
    "Was 1977 durch Roland Mehlhorn als traditioneller Gestellbau begann, hat sich über Jahrzehnte zu einem geschätzten Meisterbetrieb für anspruchsvolle Architektenhäuser und private Bauherren entwickelt.";
  const storyParagraph2 =
    homeData?.storyParagraph2 ||
    "Seit 2012 führt Tischlermeister Ronny Mehlhorn die Tischlerei in der Neuheider Straße 64 b mit moderner Fertigungstechnik, fundiertem Fachwissen und dem Anspruch, langlebige Werte aus Holz zu schaffen.";
  const stat1Value = homeData?.stat1Value || "45+";
  const stat1Label = homeData?.stat1Label || "Jahre Erfahrung";
  const stat2Value = homeData?.stat2Value || "1992";
  const stat2Label = homeData?.stat2Label || "Neubau Werkstatt";
  const stat3Value = homeData?.stat3Value || "100%";
  const stat3Label = homeData?.stat3Label || "Eigene Fertigung";
  const storyImageUrl = homeData?.storyImageUrl || "/images/real/gebaeude-1.jpg";
  const storyImageCaption =
    homeData?.storyImageCaption ||
    "Werkstatt Schönheide (Erzgebirge) · Eigene Herstellung in der Neuheider Straße 64 b";
  const storyButtonText = homeData?.storyButtonText || "Werkstatt & Geschichte";

  // Services section data
  const servicesEyebrow = homeData?.servicesEyebrow || "Leistungsspektrum";
  const servicesHeadline = homeData?.servicesHeadline || "Handwerkliche Kernkompetenzen";

interface FeaturedGewerk {
  id: string;
  title: string;
  tag: string;
  image: string;
  description: string;
  href: string;
}

  const defaultFeaturedGewerke: FeaturedGewerk[] = [
    {
      id: "holzfenster",
      title: "Holz- & Holz-Alu-Fenster",
      tag: "Eigene Fertigung",
      image: "/images/real/fenster-holzalu-buendig.jpg",
      description: "Maßgefertigte Holzfenster und witterungsbeständige Aluminium-Vorsatzschalen (Gutmann Mira).",
      href: "/leistungen#service-holzfenster",
    },
    {
      id: "haustueren",
      title: "Massivholz-Haustüren",
      tag: "Eigene Fertigung",
      image: "/images/real/tuer-5.jpg",
      description: "Individuelle Eingangstüren nach Maß mit hoher Einbruchhemmung und meisterhaften Kassettenprofilen.",
      href: "/leistungen#service-haustueren",
    },
    {
      id: "wintergaerten",
      title: "Wintergärten & Glasbauten",
      tag: "Eigene Fertigung",
      image: "/images/real/wintergarten-1.jpg",
      description: "Lichtdurchfluteter Wohnraum in tragender Holz- und Holz-Alu-Konstruktion für ganzjährigen Komfort.",
      href: "/leistungen#service-wintergaerten",
    },
    {
      id: "bauelemente",
      title: "Bauelemente & Montage",
      tag: "Fachhandel & Montage",
      image: "/images/service-fenster.jpg",
      description: "Zertifizierter Einbau geprüfter Kunststofffenster (VEKA/Gealan), Innentüren und Rollladensysteme.",
      href: "/leistungen#service-kunststoff",
    },
  ];

  const coreGewerke: FeaturedGewerk[] =
    cmsServices && cmsServices.length > 0
      ? cmsServices.slice(0, 4).map((s: any): FeaturedGewerk => ({
          id: s._id,
          title: s.title,
          tag: s.category === "bauelemente" ? "Handel & Montage" : "Eigene Fertigung",
          image: s.imageUrl || "/images/real/werkstatt-2.jpg",
          description:
            s.subtitle ||
            (s.description
              ? s.description.length > 95
                ? s.description.slice(0, 95) + "..."
                : s.description
              : "Individuelle Maßanfertigung aus Meisterhand."),
          href: `/leistungen#service-${s._id}`,
        }))
      : defaultFeaturedGewerke;

  // Shop section data
  const shopEyebrow = homeData?.shopEyebrow || "Aus unserer Werkstatt";
  const shopHeadline = homeData?.shopHeadline || "Handgefertigte Werkstücke & Deko";
  const shopSubtitle =
    homeData?.shopSubtitle ||
    "Massivholz-Schneidebretter und schwebende Wandregale aus heimischer Eiche.";
  const featuredProducts = homeData?.featuredProducts;

  return (
    <>
      <Header />
      <main id="main-content">
        {/* 1. Fullscreen Hero Section with Calm Permanent Text */}
        <HeroSection data={heroData} />

        {/* 2. Story Section – Clean & Natural (im CMS anpassbar) */}
        <section className="section-pad bg-[#FFFFFF]">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-6">
                <span className="text-craft-label block mb-2">{storyEyebrow}</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181818] mb-6 leading-tight">
                  {storyHeadline}
                </h2>
                <div className="space-y-4 text-[#555555] text-base leading-relaxed mb-8">
                  <p>{storyParagraph1}</p>
                  <p>{storyParagraph2}</p>
                </div>

                {/* Key Facts Minimalist Row (im CMS anpassbar) */}
                <div className="grid grid-cols-3 gap-4 py-6 border-y border-[#E8E8E6] mb-8">
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-[#181818]">{stat1Value}</div>
                    <div className="text-[11px] text-[#777777] font-medium uppercase tracking-wider mt-0.5">
                      {stat1Label}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-[#181818]">{stat2Value}</div>
                    <div className="text-[11px] text-[#777777] font-medium uppercase tracking-wider mt-0.5">
                      {stat2Label}
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-[#181818]">{stat3Value}</div>
                    <div className="text-[11px] text-[#777777] font-medium uppercase tracking-wider mt-0.5">
                      {stat3Label}
                    </div>
                  </div>
                </div>

                <Link
                  href="/ueber-uns"
                  className="btn btn-outline-dark text-xs inline-flex items-center gap-2"
                >
                  {storyButtonText}
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="lg:col-span-6">
                <div className="relative rounded-lg overflow-hidden border border-[#E8E8E6] bg-[#F9F9F8]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={storyImageUrl}
                    alt={storyHeadline}
                    className="w-full h-[400px] sm:h-[460px] object-cover"
                  />
                  {storyImageCaption && (
                    <div className="absolute bottom-4 left-4 right-4 bg-[#181818]/85 backdrop-blur-sm text-white p-4 rounded text-xs">
                      <span className="font-semibold block">
                        {storyImageCaption.includes("·")
                          ? storyImageCaption.split("·")[0]?.trim()
                          : storyImageCaption}
                      </span>
                      {storyImageCaption.includes("·") && (
                        <span className="text-white/70">
                          {storyImageCaption.split("·")[1]?.trim()}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Kernkompetenzen / Leistungen */}
        <section className="section-pad bg-white border-t border-[#E8E8E6]">
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
              <div>
                <span className="text-craft-label block mb-1.5">{servicesEyebrow}</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#181818] tracking-tight">
                  {servicesHeadline}
                </h2>
              </div>
              <Link
                href="/leistungen"
                className="btn btn-outline-dark text-xs self-start md:self-auto flex items-center gap-1.5 flex-shrink-0"
              >
                Alle Leistungen im Detail
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* 4 Focused Highlights: Compact, visual, no endless scrolling */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 scrollbar-none md:grid md:grid-cols-2 lg:grid-cols-4">
              {coreGewerke.map((item: FeaturedGewerk) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="group flex flex-col justify-between flex-shrink-0 w-[74vw] sm:w-[280px] md:w-auto snap-center"
                >
                  <div>
                    {/* Complete uncropped photo with ambient backdrop */}
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F6F5F2] mb-3 flex items-center justify-center border border-[#EBEBE6]">
                      {/* Ambient blur for color cohesion */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover scale-115 blur-lg opacity-25 pointer-events-none"
                      />
                      {/* Sharp, complete uncropped image */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="relative z-10 max-h-full max-w-full object-contain p-2.5 group-hover:scale-105 transition-transform duration-500 drop-shadow-xs"
                      />
                      <span className="absolute top-2.5 left-2.5 z-20 bg-[#181818]/85 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#181818] group-hover:text-[#8C6D4F] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#666666] leading-relaxed mt-1.5 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2.5 mt-2 flex items-center gap-1 text-xs font-semibold text-[#181818] group-hover:text-[#8C6D4F] transition-colors">
                    <span>Details ansehen</span>
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile swipe hint */}
            <div className="flex md:hidden items-center justify-center gap-1.5 mt-2 text-[11px] text-[#888888]">
              <span>← Wischen für weitere Gewerke →</span>
            </div>
          </div>
        </section>

        {/* 4. Fullwidth Continuous Video Banner */}
        <FullwidthVideoSection
          videoDesktopUrl={videoData?.videoDesktopUrl}
          videoMobileUrl={videoData?.videoMobileUrl}
          posterImageUrl={videoData?.posterImageUrl || "/images/real/werkstatt-2.jpg"}
          badge={videoData?.badge}
          headline={videoData?.headline}
          subheadline={videoData?.subheadline}
        />

        {/* 5. Shop Highlights (im CMS anpassbar) */}
        <section className="section-pad bg-white border-t border-[#E8E8E6]">
          <div className="container-site">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-craft-label block mb-1.5">{shopEyebrow}</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#181818] tracking-tight">
                  {shopHeadline}
                </h2>
                <p className="text-[#555555] text-sm sm:text-base mt-1">{shopSubtitle}</p>
              </div>
              <Link
                href="/shop"
                className="btn btn-primary text-xs flex items-center gap-1.5 self-start md:self-auto"
              >
                Gesamten Katalog ansehen
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* If custom featured products are chosen in CMS */}
            {featuredProducts && featuredProducts.length > 0 ? (
              <>
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 scrollbar-none md:grid md:grid-cols-3 md:gap-6 lg:gap-8">
                  {featuredProducts.slice(0, 3).map((prod: any) => {
                    const targetId = prod.slug || prod._id;
                    return (
                      <div
                        key={prod._id}
                        className="craft-card p-5 sm:p-6 flex flex-col justify-between h-full bg-white shadow-xs hover:shadow-md transition-shadow group flex-shrink-0 w-[80vw] sm:w-[300px] md:w-auto snap-center"
                      >
                        <div>
                          {prod.imageUrl ? (
                            <Link
                              href={`/shop/${targetId}`}
                              className="block relative h-52 sm:h-56 rounded overflow-hidden mb-4 bg-[#F9F9F8]"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={prod.imageUrl}
                                alt={prod.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </Link>
                          ) : (
                            <div className="h-52 rounded bg-[#F9F9F8] mb-4 flex items-center justify-center text-xs text-[#777777]">
                              Handgefertigtes Werkstück
                            </div>
                          )}
                          {prod.woodType && (
                            <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider block mb-1">
                              {prod.woodType}
                            </span>
                          )}
                          <Link href={`/shop/${targetId}`}>
                            <h3 className="text-lg font-bold text-[#181818] mb-1 hover:text-[#8C6D4F] transition-colors">
                              {prod.title}
                            </h3>
                          </Link>
                          {prod.dimensions && (
                            <p className="text-xs text-[#666666] mb-4">{prod.dimensions}</p>
                          )}
                        </div>
                        <div className="pt-4 border-t border-[#F2F2F0] mt-auto">
                          <div className="flex items-baseline justify-between gap-2 mb-3">
                            <span className="text-xl font-bold text-[#181818] whitespace-nowrap">
                              {prod.price !== undefined && prod.price > 0
                                ? `${Number(prod.price).toFixed(2).replace(".", ",")} €`
                                : "Preis auf Anfrage"}
                            </span>
                            {prod.price !== undefined && prod.price > 0 && (
                              <span className="text-[11px] text-[#777777] whitespace-nowrap">
                                inkl. 19% MwSt.
                              </span>
                            )}
                          </div>
                          <Link
                            href={`/shop/${targetId}`}
                            className="btn btn-primary text-xs py-2.5 w-full flex items-center justify-center gap-1.5"
                          >
                            <ShoppingBag size={13} />
                            Details & Bestellen
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Mobile Swipe Hint */}
                <div className="flex md:hidden items-center justify-center gap-1.5 mt-2 text-[11px] text-[#777777]">
                  <span>← Wischen für weitere Werkstücke →</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 scrollbar-none md:grid md:grid-cols-3 md:gap-6 lg:gap-8">
                  {/* Product 1 */}
                  <div className="craft-card p-5 sm:p-6 flex flex-col justify-between h-full bg-white shadow-xs hover:shadow-md transition-shadow group flex-shrink-0 w-[80vw] sm:w-[300px] md:w-auto snap-center">
                    <div>
                      <Link
                        href="/shop/schneidebrett-xl"
                        className="block relative h-52 sm:h-56 rounded overflow-hidden mb-4 bg-[#F9F9F8]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/catalog-schneidebrett.jpg"
                          alt="Schneidebrett Hirnholz XL"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider block mb-1">
                        Eiche massiv
                      </span>
                      <Link href="/shop/schneidebrett-xl">
                        <h3 className="text-lg font-bold text-[#181818] mb-1 hover:text-[#8C6D4F] transition-colors">
                          Schneidebrett Hirnholz XL
                        </h3>
                      </Link>
                      <p className="text-xs text-[#666666] mb-4">40 × 30 × 5 cm · Stirnholz geölt</p>
                    </div>
                    <div className="pt-4 border-t border-[#F2F2F0] mt-auto">
                      <div className="flex items-baseline justify-between gap-2 mb-3">
                        <span className="text-xl font-bold text-[#181818] whitespace-nowrap">89,00 €</span>
                        <span className="text-[11px] text-[#777777] whitespace-nowrap">
                          inkl. 19% MwSt.
                        </span>
                      </div>
                      <Link
                        href="/shop/schneidebrett-xl"
                        className="btn btn-primary text-xs py-2.5 w-full flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag size={13} />
                        Details & Bestellen
                      </Link>
                    </div>
                  </div>

                  {/* Product 2 */}
                  <div className="craft-card p-5 sm:p-6 flex flex-col justify-between h-full bg-white shadow-xs hover:shadow-md transition-shadow group flex-shrink-0 w-[80vw] sm:w-[300px] md:w-auto snap-center">
                    <div>
                      <Link
                        href="/shop/wandregal-eiche"
                        className="block relative h-52 sm:h-56 rounded overflow-hidden mb-4 bg-[#F9F9F8]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/catalog-regal.jpg"
                          alt="Wandregal Eiche massiv"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider block mb-1">
                        Massiveiche
                      </span>
                      <Link href="/shop/wandregal-eiche">
                        <h3 className="text-lg font-bold text-[#181818] mb-1 hover:text-[#8C6D4F] transition-colors">
                          Schwebendes Wandregal Eiche
                        </h3>
                      </Link>
                      <p className="text-xs text-[#666666] mb-4">80 × 20 × 4 cm · Baumkante</p>
                    </div>
                    <div className="pt-4 border-t border-[#F2F2F0] mt-auto">
                      <div className="flex items-baseline justify-between gap-2 mb-3">
                        <span className="text-xl font-bold text-[#181818] whitespace-nowrap">129,00 €</span>
                        <span className="text-[11px] text-[#777777] whitespace-nowrap">
                          inkl. 19% MwSt.
                        </span>
                      </div>
                      <Link
                        href="/shop/wandregal-eiche"
                        className="btn btn-primary text-xs py-2.5 w-full flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag size={13} />
                        Details & Bestellen
                      </Link>
                    </div>
                  </div>

                  {/* Product 3 */}
                  <div className="craft-card p-5 sm:p-6 flex flex-col justify-between h-full bg-white shadow-xs hover:shadow-md transition-shadow group flex-shrink-0 w-[80vw] sm:w-[300px] md:w-auto snap-center">
                    <div>
                      <Link
                        href="/shop/schneidebrett-streifen"
                        className="block relative h-52 sm:h-56 rounded overflow-hidden mb-4 bg-[#F9F9F8]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/catalog-schneidebrett.jpg"
                          alt="Schneidebrett Streifendesign"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider block mb-1">
                        Eiche & Buche
                      </span>
                      <Link href="/shop/schneidebrett-streifen">
                        <h3 className="text-lg font-bold text-[#181818] mb-1 hover:text-[#8C6D4F] transition-colors">
                          Schneidebrett Streifendesign
                        </h3>
                      </Link>
                      <p className="text-xs text-[#666666] mb-4">35 × 22 × 3 cm · Zweifarbig verleimt</p>
                    </div>
                    <div className="pt-4 border-t border-[#F2F2F0] mt-auto">
                      <div className="flex items-baseline justify-between gap-2 mb-3">
                        <span className="text-xl font-bold text-[#181818] whitespace-nowrap">54,00 €</span>
                        <span className="text-[11px] text-[#777777] whitespace-nowrap">
                          inkl. 19% MwSt.
                        </span>
                      </div>
                      <Link
                        href="/shop/schneidebrett-streifen"
                        className="btn btn-primary text-xs py-2.5 w-full flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag size={13} />
                        Details & Bestellen
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Mobile Swipe Hint */}
                <div className="flex md:hidden items-center justify-center gap-1.5 mt-2 text-[11px] text-[#777777]">
                  <span>← Wischen für weitere Werkstücke →</span>
                </div>
              </>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
