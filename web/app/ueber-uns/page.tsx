import type { Metadata } from "next";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "next-sanity";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/layout/PageHeader";
import WorkshopSlideGallery, { WorkshopSlide } from "@/components/sections/WorkshopSlideGallery";
import { client } from "@/sanity/lib/client";
import { ABOUT_PAGE_QUERY, TEAM_MEMBERS_QUERY } from "@/sanity/lib/queries";
import { ArrowRight, UserCheck, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";

const storyPortableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base text-[#555555] leading-relaxed mb-4">{children}</p>
    ),
    lead: ({ children }) => (
      <p className="text-base sm:text-lg font-medium text-[#181818] leading-relaxed mb-5">{children}</p>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl sm:text-2xl font-bold text-[#181818] mt-6 mb-3 tracking-tight">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-bold text-[#181818] mt-4 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="p-4 sm:p-5 my-4 bg-[#F9F9F8] border-l-4 border-[#8C6D4F] rounded-r-xl italic text-[#181818] text-sm sm:text-base leading-relaxed">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-[#181818]">{children}</strong>,
    em: ({ children }) => <em className="italic text-[#8C6D4F]">{children}</em>,
    underline: ({ children }) => <span className="underline underline-offset-4 decoration-[#8C6D4F]">{children}</span>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#8C6D4F] underline hover:text-[#181818] font-semibold transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="space-y-2 mb-5 pl-5 list-disc text-[#555555]">{children}</ul>,
    number: ({ children }) => <ol className="space-y-2 mb-5 pl-5 list-decimal text-[#555555]">{children}</ol>,
  },
};

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Über uns & Team | Tischlerei Ronny Mehlhorn Schönheide",
  description:
    "Lernen Sie die Tischlerei Ronny Mehlhorn kennen: Gegründet 1977 durch Roland Mehlhorn, 1992 Neubau in der Neuheider Straße 64 b, heute geführt von Tischlermeister Ronny Mehlhorn. Unser Team, unsere Werkstatt und unsere Philosophie.",
};

interface TeamMemberData {
  _id: string;
  name: string;
  role: string;
  imageUrl?: string;
  bio?: string;
  since?: string;
}

const fallbackTeam: TeamMemberData[] = [
  {
    _id: "ronny",
    name: "Ronny Mehlhorn",
    role: "Inhaber & Tischlermeister",
    imageUrl: "/images/real/werkstatt-2.jpg",
    bio: "Übernahme der Meisterwerkstatt 2012 in 2. Generation. Verantwortlich für Kundenberatung, Arbeitsvorbereitung, Statikplanung und Fertigung.",
    since: "Im Betrieb seit 1995 · Meisterbrief 2005",
  },
  {
    _id: "roland",
    name: "Roland Mehlhorn",
    role: "Firmengründer & Senior",
    imageUrl: "/images/real/werkstatt-1.jpg",
    bio: "Gründete den Betrieb 1977 mit traditionellem Gestellbau und baute 1992 das heutige Werkstattgebäude in der Neuheider Straße auf.",
    since: "Gründer 1977",
  },
  {
    _id: "geselle",
    name: "Werkstatt-Team & Gesellen",
    role: "Tischlergesellen & Fachmonteure",
    imageUrl: "/images/real/werkstatt-3.jpg",
    bio: "Erfahrene Fachkräfte für den präzisen Zuschnitt, die Profilbearbeitung, Oberflächenveredelung und saubere RAL-Montage vor Ort.",
    since: "Langjährige Handwerkserfahrung",
  },
  {
    _id: "hund",
    name: "Balou",
    role: "Werkstatthund",
    imageUrl: "/images/real/gebaeude-1.jpg",
    bio: "Sorgt stets für gute Laune im Betrieb, begrüßt treue Kunden und überwacht zuverlässig die wohlverdienten Kaffeepausen.",
    since: "Im Dienst für gute Stimmung",
  },
];

export default async function UeberUnsPage() {
  let cmsData = null;
  let teamMembers: TeamMemberData[] | null = null;

  try {
    [cmsData, teamMembers] = await Promise.all([
      client.fetch(ABOUT_PAGE_QUERY, {}, { next: { revalidate: 30 } }),
      client.fetch(TEAM_MEMBERS_QUERY, {}, { next: { revalidate: 30 } }),
    ]);
  } catch (e) {
    // Fallback
  }

  const badge = cmsData?.badge || "Familienbetrieb im Erzgebirge seit 1977";
  const title = cmsData?.headline || "Über uns & Werkstatt";
  const subtitle =
    cmsData?.introText ||
    "Tradition, Meisterhandwerk & moderner Bauelementebau in der Neuheider Straße 64 b in Schönheide.";
  const headerImageUrl = cmsData?.headerImageUrl || "/images/real/werkstatt-2.jpg";
  const headerVideoUrl = cmsData?.headerVideoUrl || undefined;

  const storyHeadline =
    cmsData?.storyHeadline || "Vom traditionellen Gestellbau zum modernen Meisterbetrieb";
  const storyContent = cmsData?.storyContent;
  const p1 =
    cmsData?.storyParagraph1 ||
    "Die Geschichte unserer Tischlerei begann im Januar 1977, als Roland Mehlhorn den Schritt in die Selbstständigkeit wagte. Was mit traditionellem Gestellbau und solider Handarbeit seinen Anfang nahm, wuchs über die Jahrzehnte durch kontinuierliche Weiterentwicklung und kompromisslose Qualitätsorientierung zu einem festen Begriff im Westerzgebirge heran.";
  const p2 =
    cmsData?.storyParagraph2 ||
    "1992 folgte der Neubau des heutigen Firmengebäudes in der Neuheider Straße 64 b – mit großzügigen Werkstatträumen und modernem Maschinenpark. Seit Juli 2012 führt Tischlermeister Ronny Mehlhorn die Geschicke des Familienunternehmens in zweiter Generation. Dabei verbinden wir überlieferte Handwerkstradition mit modernster Profiltechnik (wie dem System Gutmann Mira) und zukunftssicherer Isoliertechnologie.";
  const p3 =
    cmsData?.storyParagraph3 ||
    "Für uns ist Holz nicht bloß ein Werkstoff, sondern lebendige Natur. Wir verarbeiten vorrangig hochwertige heimische Hölzer wie Eiche, Kiefer und Lärche. Jedes Fenster, jede Haustür und jeder Wintergarten verlässt unsere Werkstatt erst, wenn Passgenauigkeit, Oberflächenveredelung und Funktionalität höchsten meisterlichen Ansprüchen genügen.";

  const workshopSlides: WorkshopSlide[] | undefined = cmsData?.workshopGallery?.map(
    (item: { imageUrl: string; caption?: string }) => ({
      imageUrl: item.imageUrl,
      caption: item.caption,
    })
  );

  const teamList =
    teamMembers && teamMembers.length > 0 ? teamMembers : fallbackTeam;

  return (
    <>
      <Header />
      <main>
        {/* Standardized 100% Consistent PageHeader (with optional background video) */}
        <PageHeader
          breadcrumb="Über uns & Werkstatt"
          badge={badge}
          title={title}
          subtitle={subtitle}
          headerImageUrl={headerImageUrl}
          headerVideoUrl={headerVideoUrl}
        />

        {/* 1. Ausführliche Geschichte & Philosophie (Editorial Fließtext) */}
        <section className="py-16 md:py-24 bg-[#FFFFFF]">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Column: Authentic Craft Story */}
              <div className="lg:col-span-7">
                <span className="text-craft-label block mb-2">
                  Meisterhandwerk aus Schönheide
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#181818] mb-6 leading-tight">
                  {storyHeadline}
                </h2>

                {/* Rich-Text from Sanity CMS or Formatted Highlighted Editorial Fallback */}
                {storyContent && storyContent.length > 0 ? (
                  <div className="space-y-4">
                    <PortableText value={storyContent} components={storyPortableTextComponents} />
                  </div>
                ) : (
                  <div className="space-y-5 text-[#555555] text-base leading-relaxed">
                    {/* Paragraph 1: Die Gründung 1977 */}
                    <p className="text-base sm:text-lg text-[#333333] leading-relaxed font-normal">
                      Die Geschichte unserer Tischlerei begann im <strong className="text-[#181818] font-bold">Januar 1977</strong>, als <strong className="text-[#181818] font-bold">Roland Mehlhorn</strong> den Schritt in die Selbstständigkeit wagte. Was mit traditionellem Gestellbau und solider Handarbeit seinen Anfang nahm, wuchs über die Jahrzehnte durch kontinuierliche Weiterentwicklung und kompromisslose Qualitätsorientierung zu einem festen Qualitätsbegriff im Westerzgebirge heran.
                    </p>

                    {/* Mobile-only In-Between Image – breaks up reading flow on smartphones */}
                    <div className="lg:hidden my-6 rounded-xl overflow-hidden border border-[#E8E8E6] shadow-sm bg-[#F9F9F8]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/real/gebaeude-1.jpg"
                        alt="Tischlerei Mehlhorn Firmengebäude in Schönheide"
                        className="w-full h-52 sm:h-64 object-cover"
                      />
                      <div className="p-3 bg-white text-[11px] text-[#555555] flex items-center justify-between border-t border-[#E8E8E6]">
                        <span><strong className="text-[#181818]">Firmensitz:</strong> Neuheider Straße 64 b, Schönheide</span>
                        <span className="text-[#8C6D4F] font-semibold">Seit 1992</span>
                      </div>
                    </div>

                    {/* Paragraph 2: Neubau 1992 & Meisterübernahme 2012 */}
                    <p className="leading-relaxed">
                      <strong className="text-[#181818] font-bold">1992</strong> folgte der Neubau des heutigen Firmengebäudes in der <strong className="text-[#181818] font-bold">Neuheider Straße 64 b</strong> – mit großzügigen Werkstatträumen und modernem Maschinenpark. Seit <strong className="text-[#181818] font-bold">Juli 2012</strong> führt Tischlermeister <strong className="text-[#181818] font-bold">Ronny Mehlhorn</strong> die Geschicke des Familienunternehmens in zweiter Generation. Dabei verbinden wir überlieferte Handwerkstradition mit modernster Profiltechnik (wie dem langlebigen <em className="text-[#8C6D4F] font-semibold not-italic">System Gutmann Mira</em>) und zukunftssicherer Isoliertechnologie.
                    </p>

                    {/* Highlighted Quote / Core Milestone */}
                    <div className="p-4 sm:p-5 my-3 bg-[#F9F9F8] border-l-4 border-[#8C6D4F] rounded-r-xl">
                      <p className="text-sm sm:text-base font-semibold text-[#181818] italic leading-relaxed">
                        „Für uns ist Holz nicht bloß ein Werkstoff, sondern lebendige Natur. Jedes Werkstück verlässt unsere Werkstatt erst, wenn Passgenauigkeit, Oberflächen und Funktion höchsten meisterlichen Ansprüchen genügen.“
                      </p>
                      <span className="text-xs text-[#777777] block mt-1.5 font-medium">
                        — Tischlermeister Ronny Mehlhorn
                      </span>
                    </div>

                    {/* Paragraph 3: Werkstoff & Regionale Verbundenheit */}
                    <p className="leading-relaxed">
                      Wir verarbeiten vorrangig hochwertige heimische Hölzer wie <strong className="text-[#181818] font-bold">Eiche, Kiefer und Lärche</strong>. Jedes Fenster, jede Haustür und jeder Wintergarten wird auf Maß gefertigt – für qualitätsbewusste Bauherren und Architekten in der gesamten Region Erzgebirge und Vogtland.
                    </p>
                  </div>
                )}

                {/* Handwerks-Qualitätsmerkmale */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-[#E8E8E6]">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck size={18} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-xs text-[#181818]">100% Meisterqualität</h4>
                      <p className="text-[11px] text-[#777777] mt-0.5">Eigene Fertigung in Schönheide</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <HeartHandshake size={18} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-xs text-[#181818]">Persönliche Betreuung</h4>
                      <p className="text-[11px] text-[#777777] mt-0.5">Von Aufmaß bis Montage</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Sparkles size={18} className="text-[#8C6D4F] mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-xs text-[#181818]">Heimische Hölzer</h4>
                      <p className="text-[11px] text-[#777777] mt-0.5">Eiche, Kiefer & Lärche</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Large Authentic Workshop Images */}
              <div className="lg:col-span-5 space-y-4">
                {/* Building Image (Hidden on mobile because it's shown in the middle of text flow) */}
                <div className="relative rounded-xl overflow-hidden border border-[#E8E8E6] bg-[#F9F9F8] shadow-xs hidden lg:block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/real/gebaeude-1.jpg"
                    alt="Firmengebäude Tischlerei Mehlhorn in Schönheide"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                  <div className="p-3.5 bg-white border-t border-[#E8E8E6] text-xs text-[#555555]">
                    <strong className="text-[#181818] block">Neuheider Straße 64 b, Schönheide</strong>
                    <span>1992 neu erbautes Firmengebäude mit Meisterwerkstatt</span>
                  </div>
                </div>

                {/* Workshop Production Image */}
                <div className="relative rounded-xl overflow-hidden border border-[#E8E8E6] bg-[#F9F9F8] shadow-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/real/werkstatt-2.jpg"
                    alt="Werkstatt & Holzverarbeitung Tischlerei Mehlhorn"
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                  <div className="p-3 bg-white border-t border-[#E8E8E6] text-xs text-[#555555] flex items-center justify-between">
                    <div>
                      <strong className="text-[#181818] block">Eigene Meisterfertigung</strong>
                      <span>Traditionelle Hobelbänke & moderne CNC-Präzision</span>
                    </div>
                    <span className="text-[#8C6D4F] font-bold text-xs uppercase tracking-wider">Seit 1977</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Team & Mitarbeiter Vorstellung (im Backend pflegbar) */}
        <section className="py-16 md:py-24 bg-[#F9F9F8] border-t border-[#E8E8E6]">
          <div className="container-site">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-craft-label block mb-1">
                Die Gesichter hinter dem Handwerk
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#181818] tracking-tight mb-3">
                Unser Team
              </h2>
              <p className="text-[#555555] text-sm sm:text-base leading-relaxed">
                Mit Leidenschaft, handwerklichem Können und einem geschulten Auge für Details arbeiten wir täglich für zufriedene Bauherren.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10 sm:gap-y-12 max-w-5xl mx-auto">
              {teamList.map((member) => (
                <div
                  key={member._id}
                  className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 sm:gap-6 group"
                >
                  {/* Round Avatar Circle */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden flex-shrink-0 ring-4 ring-white shadow-md bg-[#E8E8E6]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={member.imageUrl || "/images/real/werkstatt-2.jpg"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Free Unboxed Text Content */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-[#8C6D4F] uppercase tracking-wider block mb-1">
                      {member.role}
                    </span>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#181818] mb-2 leading-snug">
                      {member.name}
                    </h3>

                    {member.bio && (
                      <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mb-3">
                        {member.bio}
                      </p>
                    )}

                    {member.since && (
                      <div className="text-[11px] sm:text-xs text-[#777777] flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                        <UserCheck size={14} className="text-[#8C6D4F] flex-shrink-0" />
                        <span>{member.since}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Slide-Galerie der Firma & Werkstatt */}
        <WorkshopSlideGallery slides={workshopSlides} />

        {/* 4. Bottom CTA Section */}
        <section className="bg-[#181818] text-white py-16">
          <div className="container-site text-center max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-white/60 block mb-1.5">
              Persönliche Beratung in Schönheide
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Möchten Sie Ihr Projekt persönlich besprechen?
            </h2>
            <p className="text-white/70 text-sm sm:text-base mb-8 leading-relaxed">
              Tischlermeister Ronny Mehlhorn berät Sie gerne vor Ort oder direkt bei uns in der Werkstatt.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/kontakt" className="btn bg-white text-[#181818] hover:bg-white/90 text-xs sm:text-sm py-3 px-6">
                Kontakt aufnehmen
              </Link>
              <Link href="/leistungen" className="btn btn-outline text-xs sm:text-sm py-3 px-6">
                Leistungen entdecken
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
