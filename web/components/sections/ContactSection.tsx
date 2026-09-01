"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, ChevronRight, Loader2, CheckCircle, AlertCircle, Smartphone, Printer } from "lucide-react";
import { sendInquiryAction, type ActionResult } from "@/actions/sendInquiryAction";
import { useActionState } from "react";

const initialState: ActionResult = { success: false, message: "", errors: undefined };

const gewerkeOptions = [
  "Allgemeine Anfrage",
  "Holzfenster (Eigene Fertigung / Denkmalschutz)",
  "Holz-Aluminium-Fenster (Gutmann Mira)",
  "Massivholz-Haustüren nach Maß",
  "Wintergärten & Glasbauten",
  "Kunststofffenster (VEKA / Gealan)",
  "Innentüren & Zargen",
  "Garagentore & Antriebe",
  "Rollladen- & Klappläden",
  "Dekoartikel / Werkstücke (Shop)",
  "Reparatur & Wartung",
];

function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedGewerk = searchParams.get("gewerk") || "Allgemeine Anfrage";

  const [selectedGewerk, setSelectedGewerk] = useState(preselectedGewerk);
  const [state, formAction, isPending] = useActionState(
    sendInquiryAction,
    initialState
  );

  useEffect(() => {
    const g = searchParams.get("gewerk");
    if (g) {
      const match = gewerkeOptions.find((opt) => opt.toLowerCase().includes(g.toLowerCase()));
      setSelectedGewerk(match || g);
    }
  }, [searchParams]);

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
        <div className="w-12 h-12 bg-[#F2F2F0] rounded-full flex items-center justify-center">
          <CheckCircle size={26} className="text-[#8C6D4F]" />
        </div>
        <h3 className="text-xl font-bold text-[#181818]">
          Anfrage erfolgreich gesendet!
        </h3>
        <p className="text-[#555555] text-sm max-w-sm leading-relaxed">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* Error Banner */}
      {!state.success && state.message && (
        <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded text-xs text-red-700">
          <AlertCircle size={15} className="text-red-500 mt-0.5 flex-shrink-0" />
          <p>{state.message}</p>
        </div>
      )}

      {/* Honeypot */}
      <div className="absolute left-[-9999px] top-[-9999px] opacity-0" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="deliveryOption" value="abholung" />

      {/* Gewerk Auswahl */}
      <div>
        <label htmlFor="contact-gewerk" className="form-label">
          Bereich / Gewerk
        </label>
        <select
          id="contact-gewerk"
          name="productName"
          value={selectedGewerk}
          onChange={(e) => setSelectedGewerk(e.target.value)}
          className="form-input bg-white cursor-pointer"
        >
          {gewerkeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="form-label">
            Name <span className="text-[#8C6D4F]">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            className="form-input"
            placeholder="Max Mustermann"
            required
            autoComplete="name"
          />
          {state.errors?.name && (
            <p className="form-error">{state.errors.name[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="contact-phone" className="form-label">Telefonnummer</label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            className="form-input"
            placeholder="+49 (0) ..."
            autoComplete="tel"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="form-label">
          E-Mail-Adresse <span className="text-[#8C6D4F]">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          className="form-input"
          placeholder="ihre@email.de"
          required
          autoComplete="email"
        />
        {state.errors?.email && (
          <p className="form-error">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="form-label">
          Ihre Nachricht / Projektbeschreibung <span className="text-[#8C6D4F]">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="form-input resize-none"
          rows={4}
          placeholder="Beschreiben Sie Ihr Bauvorhaben, Maße oder Terminwünsche…"
          required
        />
        {state.errors?.message && (
          <p className="form-error">{state.errors.message[0]}</p>
        )}
      </div>

      {/* DSGVO */}
      <div className="flex items-start gap-2.5">
        <input
          id="contact-dsgvo"
          type="checkbox"
          name="dsgvo"
          className="mt-0.5 w-4 h-4 accent-[#181818] cursor-pointer"
          required
        />
        <label htmlFor="contact-dsgvo" className="text-xs text-[#555555] leading-relaxed cursor-pointer">
          Ich willige ein, dass meine Daten zur Bearbeitung der Anfrage verarbeitet werden.{" "}
          <span className="text-[#8C6D4F]">*</span>
        </label>
      </div>

      <button
        id="contact-submit-btn"
        type="submit"
        disabled={isPending}
        className="btn btn-primary w-full py-3 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
      >
        {isPending ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Wird gesendet…
          </>
        ) : (
          <>
            Anfrage absenden
            <ChevronRight size={15} />
          </>
        )}
      </button>
    </form>
  );
}

export default function ContactSection() {
  const [mapVisible, setMapVisible] = useState(false);

  return (
    <section
      id="kontakt"
      className="py-12 md:py-16 bg-[#FFFFFF]"
      aria-labelledby="contact-heading"
    >
      <div className="container-site">
        <div className="mb-10 max-w-xl">
          <span className="text-craft-label block mb-1">Meisterbetrieb in Schönheide</span>
          <h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-bold text-[#181818] tracking-tight mb-2"
          >
            Kontakt & Beratung
          </h2>
          <p className="text-[#555555] text-sm sm:text-base">
            Besuchen Sie uns in Schönheide oder fordern Sie ein kostenloses Angebot für Ihr Projekt an.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Adresse */}
            <div className="p-5 bg-[#F9F9F8] rounded-lg border border-[#E8E8E6] flex items-start gap-3.5">
              <div className="w-9 h-9 bg-white rounded flex items-center justify-center flex-shrink-0 text-[#181818] border border-[#E8E8E6]">
                <MapPin size={18} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D4F] block mb-0.5">Werkstatt & Büro</span>
                <p className="font-bold text-[#181818] text-sm">Tischlerei Ronny Mehlhorn</p>
                <p className="text-xs text-[#555555]">Neuheider Straße 64 b</p>
                <p className="text-xs text-[#555555]">08304 Schönheide (Erzgebirge)</p>
              </div>
            </div>

            {/* Telefon & Mobil */}
            <div className="p-5 bg-[#F9F9F8] rounded-lg border border-[#E8E8E6] flex items-start gap-3.5">
              <div className="w-9 h-9 bg-white rounded flex items-center justify-center flex-shrink-0 text-[#181818] border border-[#E8E8E6]">
                <Phone size={18} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D4F] block mb-0.5">Direktkontakt</span>
                <div className="space-y-0.5 text-xs text-[#181818]">
                  <p>
                    <strong>Telefon:</strong>{" "}
                    <a href="tel:+49377552346" className="hover:underline font-semibold">
                      037755 / 2346
                    </a>
                  </p>
                  <p>
                    <strong>Mobil:</strong>{" "}
                    <a href="tel:+4915123304776" className="hover:underline font-semibold">
                      0151 / 23304776
                    </a>
                  </p>
                  <p className="text-[#777777]">
                    <strong>Fax:</strong> 037755 / 3240
                  </p>
                </div>
              </div>
            </div>

            {/* E-Mail */}
            <div className="p-5 bg-[#F9F9F8] rounded-lg border border-[#E8E8E6] flex items-start gap-3.5">
              <div className="w-9 h-9 bg-white rounded flex items-center justify-center flex-shrink-0 text-[#181818] border border-[#E8E8E6]">
                <Mail size={18} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D4F] block mb-0.5">E-Mail</span>
                <a
                  href="mailto:tischlerei.mehlhorn@t-online.de"
                  className="text-[#181818] font-semibold text-xs hover:underline block"
                >
                  tischlerei.mehlhorn@t-online.de
                </a>
              </div>
            </div>

            {/* Map Embed */}
            <div className="rounded-lg overflow-hidden border border-[#E8E8E6] bg-[#F9F9F8]">
              {!mapVisible ? (
                <div className="flex flex-col items-center justify-center h-40 gap-2.5 text-center px-6">
                  <MapPin size={22} className="text-[#8C6D4F]" />
                  <p className="text-xs text-[#666666]">
                    Standort Neuheider Str. 64 b, Schönheide:
                  </p>
                  <button
                    onClick={() => setMapVisible(true)}
                    className="btn btn-outline-dark text-xs py-1.5 px-3"
                  >
                    Karte laden
                  </button>
                </div>
              ) : (
                <iframe
                  src="https://maps.google.com/maps?q=Neuheider%20Stra%C3%9Fe%2064b,%2008304%20Sch%C3%B6nheide&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="180"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Standort Tischlerei Mehlhorn in Schönheide"
                />
              )}
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="lg:col-span-7 bg-[#F9F9F8] border border-[#E8E8E6] rounded-lg p-6 sm:p-8">
            <span className="text-craft-label block mb-1">Unverbindlich anfragen</span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#181818] mb-5">
              Projektbeschreibung senden
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
