"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, Clock, ChevronRight, Loader2, CheckCircle, AlertCircle, Smartphone, Printer } from "lucide-react";
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
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-14 h-14 bg-[#F3ECE2] rounded-full flex items-center justify-center">
          <CheckCircle size={30} className="text-[#8C6D4F]" />
        </div>
        <h3 className="font-serif-heading text-2xl font-medium text-[#1E1A17]">
          Anfrage erfolgreich gesendet!
        </h3>
        <p className="text-[#5E564E] text-sm max-w-sm leading-relaxed">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {/* Error Banner */}
      {!state.success && state.message && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
          <p>{state.message}</p>
        </div>
      )}

      {/* Honeypot Spam Protection */}
      <div className="absolute left-[-9999px] top-[-9999px] opacity-0" aria-hidden="true">
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
          rows={5}
          placeholder="Beschreiben Sie Ihr Bauvorhaben, Maße, Vor-Ort-Terminwünsche oder Fragen…"
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
          className="mt-1 w-4 h-4 accent-[#1E1A17] cursor-pointer"
          required
        />
        <label htmlFor="contact-dsgvo" className="text-xs text-[#5E564E] leading-relaxed cursor-pointer">
          Ich habe die{" "}
          <a href="/datenschutz" className="underline hover:text-[#1E1A17]">Datenschutzerklärung</a>
          {" "}gelesen und willige ein, dass meine Daten zur Bearbeitung meiner Anfrage verarbeitet werden.{" "}
          <span className="text-[#8C6D4F]">*</span>
        </label>
      </div>

      <button
        id="contact-submit-btn"
        type="submit"
        disabled={isPending}
        className="btn btn-wood w-full font-medium"
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
      className="section-pad bg-[#FAF8F5]"
      aria-labelledby="contact-heading"
    >
      <div className="container-site">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-craft-label block mb-2">Ihr Meisterbetrieb im Erzgebirge</span>
          <h2
            id="contact-heading"
            className="font-serif-heading text-3xl md:text-5xl text-[#1E1A17] font-normal mb-4"
          >
            Kontakt & Vor-Ort-Beratung
          </h2>
          <p className="text-[#5E564E] text-base md:text-lg">
            Haben Sie ein konkretes Bauvorhaben oder möchten Sie sich in unserer Werkstatt in Schönheide beraten lassen?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              {/* Adresse */}
              <div className="p-6 bg-white rounded-lg border border-[#E6DED4] shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F3ECE2] rounded flex items-center justify-center flex-shrink-0 text-[#8C6D4F]">
                  <MapPin size={20} />
                </div>
                <div>
                  <span className="text-craft-label block mb-1">Werkstatt & Büro</span>
                  <p className="font-semibold text-[#1E1A17] text-base">Tischlerei Ronny Mehlhorn</p>
                  <p className="text-sm text-[#5E564E]">Neuheider Straße 64 b</p>
                  <p className="text-sm text-[#5E564E]">08304 Schönheide (Erzgebirge)</p>
                </div>
              </div>

              {/* Telefon & Mobil */}
              <div className="p-6 bg-white rounded-lg border border-[#E6DED4] shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F3ECE2] rounded flex items-center justify-center flex-shrink-0 text-[#8C6D4F]">
                  <Phone size={20} />
                </div>
                <div>
                  <span className="text-craft-label block mb-1">Direktkontakt</span>
                  <div className="space-y-1 text-sm text-[#1E1A17]">
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
                    <p className="text-[#6B635B]">
                      <strong>Telefax:</strong> 037755 / 3240
                    </p>
                  </div>
                </div>
              </div>

              {/* E-Mail */}
              <div className="p-6 bg-white rounded-lg border border-[#E6DED4] shadow-sm flex items-start gap-4">
                <div className="w-10 h-10 bg-[#F3ECE2] rounded flex items-center justify-center flex-shrink-0 text-[#8C6D4F]">
                  <Mail size={20} />
                </div>
                <div>
                  <span className="text-craft-label block mb-1">E-Mail-Anfragen</span>
                  <a
                    href="mailto:tischlerei.mehlhorn@t-online.de"
                    className="text-[#1E1A17] font-semibold text-sm hover:underline block"
                  >
                    tischlerei.mehlhorn@t-online.de
                  </a>
                  <p className="text-xs text-[#8C8277] mt-0.5">
                    Wir antworten zeitnah auf alle schriftlichen Anfragen.
                  </p>
                </div>
              </div>
            </div>

            {/* DSGVO-konformer Map Embed für Schönheide */}
            <div className="rounded-lg overflow-hidden border border-[#E6DED4] bg-white shadow-sm">
              {!mapVisible ? (
                <div className="flex flex-col items-center justify-center h-48 gap-3 text-center px-6 bg-[#F3ECE2]/40">
                  <MapPin size={28} className="text-[#8C6D4F]" />
                  <p className="text-xs text-[#6B635B] max-w-xs">
                    Standort Neuheider Str. 64 b, 08304 Schönheide auf Google Maps laden:
                  </p>
                  <button
                    onClick={() => setMapVisible(true)}
                    className="btn btn-outline-dark text-xs py-2 px-4"
                  >
                    Karte aktivieren
                  </button>
                </div>
              ) : (
                <iframe
                  src="https://maps.google.com/maps?q=Neuheider%20Stra%C3%9Fe%2064b,%2008304%20Sch%C3%B6nheide&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Standort Tischlerei Mehlhorn in Schönheide"
                />
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E6DED4] rounded-lg p-8 md:p-10 shadow-sm">
              <span className="text-craft-label block mb-1">Unverbindlich & Kostenlos</span>
              <h3 className="font-serif-heading text-2xl md:text-3xl font-medium text-[#1E1A17] mb-6">
                Angebot oder Vor-Ort-Termin anfragen
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
