"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, Clock, ChevronRight, Loader2, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { sendInquiryAction, type ActionResult } from "@/actions/sendInquiryAction";
import { useActionState } from "react";

const initialState: ActionResult = { success: false, message: "", errors: undefined };

const gewerkeOptions = [
  "Allgemeine Anfrage",
  "Holzfenster & Holz-Alu-Fenster",
  "Hauseingangstüren (Massivholz)",
  "Wintergärten & Glasbauten",
  "Kunststoff- & Aluminiumfenster",
  "Innentüren & Zargen",
  "Garagentore & Antriebe",
  "Rollladen- & Klappläden",
  "Dekoartikel / Werkstücke",
  "Sonstiges / Reparatur",
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
      // Find closest matching option or set directly
      const match = gewerkeOptions.find((opt) => opt.toLowerCase().includes(g.toLowerCase()));
      setSelectedGewerk(match || g);
    }
  }, [searchParams]);

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#121212]" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Anfrage erfolgreich gesendet!
        </h3>
        <p className="text-gray-600 max-w-sm leading-relaxed">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* Error Banner */}
      {!state.success && state.message && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700">{state.message}</p>
        </div>
      )}

      {/* Honeypot Spam Protection */}
      <div className="absolute left-[-9999px] opacity-0" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="deliveryOption" value="abholung" />

      {/* Gewerk / Bereich Auswahl */}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="form-label">
            Name <span className="text-red-400">*</span>
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
            placeholder="+49 (0) 123 456 789"
            autoComplete="tel"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="form-label">
          E-Mail-Adresse <span className="text-red-400">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          className="form-input"
          placeholder="max@beispiel.de"
          required
          autoComplete="email"
        />
        {state.errors?.email && (
          <p className="form-error">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className="form-label">
          Ihre Nachricht / Projektbeschreibung <span className="text-red-400">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="form-input resize-none"
          rows={5}
          placeholder="Beschreiben Sie Ihr geplantes Vorhaben, Maße, Wünsche oder Termine…"
          required
        />
        {state.errors?.message && (
          <p className="form-error">{state.errors.message[0]}</p>
        )}
      </div>

      {/* DSGVO Einverständnis */}
      <div className="flex items-start gap-3">
        <input
          id="contact-dsgvo"
          type="checkbox"
          name="dsgvo"
          className="mt-1 w-4 h-4 accent-[#121212] cursor-pointer"
          required
        />
        <label htmlFor="contact-dsgvo" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
          Ich habe die{" "}
          <a href="/datenschutz" className="underline hover:text-[#121212]">Datenschutzerklärung</a>
          {" "}gelesen und willige ein, dass meine Daten zur Bearbeitung meiner Anfrage gespeichert und verarbeitet werden.{" "}
          <span className="text-red-400">*</span>
        </label>
      </div>

      <button
        id="contact-submit-btn"
        type="submit"
        disabled={isPending}
        className="btn btn-primary w-full"
      >
        {isPending ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Wird übermittelt…
          </>
        ) : (
          <>
            Anfrage jetzt absenden
            <ChevronRight size={16} />
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
      className="section-pad bg-white"
      aria-labelledby="contact-heading"
    >
      <div className="container-site">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-label text-gray-400 mb-3">Persönliche Beratung</p>
          <h2
            id="contact-heading"
            className="text-display text-[#121212] text-3xl md:text-5xl mb-5"
          >
            Kontakt & Angebotsanfrage
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">
            Haben Sie ein konkretes Projekt oder möchten Sie sich beraten lassen?
            Wir stehen Ihnen mit meisterhafter Kompetenz zur Seite.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <div className="space-y-4 mb-10">
              {[
                {
                  icon: MapPin,
                  title: "Standort & Werkstatt",
                  lines: ["Tischlerei Mehlhorn", "Musterstraße 1", "00000 Musterstadt"],
                },
                {
                  icon: Phone,
                  title: "Telefonischer Kontakt",
                  lines: ["+49 (0) 00 00 00 00"],
                  href: "tel:+490000000000",
                },
                {
                  icon: Mail,
                  title: "E-Mail-Anfragen",
                  lines: ["info@tischlerei-mehlhorn.de"],
                  href: "mailto:info@tischlerei-mehlhorn.de",
                },
                {
                  icon: Clock,
                  title: "Werkstatt-Öffnungszeiten",
                  lines: [
                    "Montag – Freitag: 07:00 – 17:00 Uhr",
                    "Samstag: 08:00 – 12:00 Uhr",
                    "Sonntag & Feiertage: Geschlossen",
                  ],
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-5 bg-[#f9fafb] rounded-xl border border-gray-100"
                >
                  <div className="w-10 h-10 bg-[#121212] rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-label text-gray-400 mb-1">{item.title}</div>
                    {item.lines.map((line, i) =>
                      item.href && i === 0 ? (
                        <a
                          key={i}
                          href={item.href}
                          className="block text-[#121212] font-semibold hover:underline"
                        >
                          {line}
                        </a>
                      ) : (
                        <p key={i} className="text-[#121212] text-sm font-medium">
                          {line}
                        </p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* DSGVO-konformer Map Embed */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 bg-[#f9fafb]">
              {!mapVisible ? (
                <div className="flex flex-col items-center justify-center h-48 gap-3 text-center px-6">
                  <MapPin size={32} className="text-gray-300" />
                  <p className="text-xs text-gray-400 max-w-xs">
                    Zum Schutz Ihrer Privatsphäre wird die interaktive Google Maps Karte erst nach Klick geladen.
                  </p>
                  <button
                    onClick={() => setMapVisible(true)}
                    className="btn btn-outline-dark text-xs py-2 px-4"
                  >
                    Karte anzeigen (Google Maps)
                  </button>
                </div>
              ) : (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.654!2d13.404954!3d52.520008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDMxJzEyLjAiTiAxM8KwMjQnMTcuOCJF!5e0!3m2!1sde!2sde!4v1600000000000!5m2!1sde!2sde"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Standort Tischlerei Mehlhorn"
                />
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-10 shadow-lg">
              <h3
                className="text-2xl font-bold text-[#121212] mb-6"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                Unverbindliche Anfrage senden
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
