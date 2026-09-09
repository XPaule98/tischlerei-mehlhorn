"use client";

import { useRef, useState, useEffect, useActionState } from "react";
import { X, Package, MapPin, Loader2, CheckCircle, AlertCircle, Lock, FileText, Truck, Building } from "lucide-react";
import { sendInquiryAction, type ActionResult } from "@/actions/sendInquiryAction";

export interface DrawerProduct {
  name: string;
  price?: number;
  woodType?: string;
  dimensions?: string;
  image?: string;
}

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  product?: DrawerProduct | null;
}

const initialState: ActionResult = { success: false, message: "", errors: undefined };

export default function InquiryDrawer({
  isOpen,
  onClose,
  product,
}: InquiryDrawerProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [deliveryOption, setDeliveryOption] = useState<"versand" | "abholung">("abholung");
  const [country, setCountry] = useState<string>("Deutschland");
  const [hasDifferentShipping, setHasDifferentShipping] = useState<boolean>(false);
  const [shippingCountry, setShippingCountry] = useState<string>("Deutschland");

  const [state, formAction, isPending] = useActionState(
    sendInquiryAction,
    initialState
  );

  // Reset form state when drawer opens
  useEffect(() => {
    if (isOpen) {
      formRef.current?.reset();
      setDeliveryOption("abholung");
      setCountry("Deutschland");
      setHasDifferentShipping(false);
      setShippingCountry("Deutschland");
    }
  }, [isOpen, product]);

  // Trap focus & close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const countriesList = [
    "Deutschland",
    "Österreich",
    "Schweiz",
    "Liechtenstein",
    "Luxemburg",
    "Belgien",
    "Niederlande",
    "Frankreich",
    "Italien",
    "Tschechien",
    "Polen",
    "Anderes Land",
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={product ? `Bestellanfrage: ${product.name}` : "Kontaktanfrage"}
        className={`fixed right-0 top-0 bottom-0 z-50 w-full sm:max-w-xl bg-white shadow-2xl flex flex-col h-[100dvh] max-h-[100dvh] transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-[#E8E8E6] flex-shrink-0 bg-white">
          <div>
            <span className="text-craft-label block mb-0.5">
              {product ? "Handwerkliches Unikat bestellen" : "Unverbindliche Anfrage"}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-[#181818]">
              {product ? "Bestellanfrage & Rechnungsdaten" : "Kontakt aufnehmen"}
            </h2>
          </div>
          <button
            onClick={onClose}
            id="drawer-close-btn"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#F2F2F0] transition-colors text-[#555555] cursor-pointer"
            aria-label="Schließen"
          >
            <X size={19} />
          </button>
        </div>

        {/* Success View */}
        {state.success ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-3 bg-white">
            <div className="w-14 h-14 bg-[#F2F2F0] rounded-full flex items-center justify-center mb-1">
              <CheckCircle size={28} className="text-[#8C6D4F]" />
            </div>
            <h3 className="text-xl font-bold text-[#181818]">Bestellanfrage übermittelt</h3>
            <p className="text-[#555555] text-xs sm:text-sm leading-relaxed max-w-sm">
              {state.message}
            </p>
            <p className="text-xs text-[#777777] max-w-xs mt-1">
              Wir prüfen das Werkstück in der Werkstatt und senden Ihnen die Rechnung und Zahlungsdetails per E-Mail zu.
            </p>
            <button onClick={onClose} className="btn btn-primary mt-4 text-xs py-2.5 px-6">
              Fertigstellen &amp; Schließen
            </button>
          </div>
        ) : (
          /* Main Order Form */
          <form
            ref={formRef}
            action={formAction}
            className="flex-1 overflow-y-auto overscroll-contain flex flex-col"
          >
            <div className="px-5 sm:px-7 py-5 sm:py-6 space-y-5 flex-1">
              {/* General Error Banner */}
              {!state.success && state.message && (
                <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                  <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p>{state.message}</p>
                </div>
              )}

              {/* Honeypot Spam Protection */}
              <div className="absolute left-[-9999px] top-[-9999px] opacity-0" aria-hidden="true">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              {/* 1. Locked Product Summary Card */}
              {product && (
                <div className="p-4 bg-[#F9F9F8] rounded-xl border border-[#E8E8E6]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D4F] flex items-center gap-1">
                      <Lock size={11} /> Ausgewähltes Werkstück
                    </span>
                    {product.price && (
                      <span className="text-base font-bold text-[#181818]">
                        {product.price.toFixed(2).replace(".", ",")} €
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3.5 items-center">
                    {product.image && (
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-white flex-shrink-0 border border-[#E8E8E6]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm sm:text-base font-bold text-[#181818] leading-tight truncate">
                        {product.name}
                      </h4>
                      {product.dimensions && (
                        <p className="text-xs text-[#666666] mt-0.5">
                          Maße: {product.dimensions}
                        </p>
                      )}
                      {product.woodType && (
                        <p className="text-xs text-[#666666]">
                          Holz: {product.woodType}
                        </p>
                      )}
                    </div>
                  </div>
                  <input type="hidden" name="productName" value={product.name} />
                  {product.price && (
                    <input type="hidden" name="productPrice" value={product.price.toString()} />
                  )}
                </div>
              )}

              {/* 2. Übergabe-Option: Abholung oder Versand */}
              {product && (
                <div>
                  <label className="form-label font-bold text-[#181818] flex items-center justify-between">
                    <span>Übergabe-Option</span>
                    <span className="text-[11px] font-normal text-[#777777]">Bitte wählen</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3 mt-1.5">
                    {[
                      {
                        value: "abholung",
                        label: "Selbstabholung",
                        icon: MapPin,
                        desc: "Kostenlos in Schönheide",
                      },
                      {
                        value: "versand",
                        label: "Postversand",
                        icon: Package,
                        desc: "Sicher verpackt",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setDeliveryOption(opt.value as "versand" | "abholung")}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          deliveryOption === opt.value
                            ? "border-[#181818] bg-[#181818] text-white shadow-xs"
                            : "border-[#DCDCD8] bg-white hover:border-[#181818]"
                        }`}
                      >
                        <opt.icon
                          size={16}
                          className={`mb-1.5 ${
                            deliveryOption === opt.value ? "text-white" : "text-[#8C6D4F]"
                          }`}
                        />
                        <div className="font-bold text-xs sm:text-sm">{opt.label}</div>
                        <div
                          className={`text-[11px] mt-0.5 ${
                            deliveryOption === opt.value ? "text-white/80" : "text-[#666666]"
                          }`}
                        >
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                  <input type="hidden" name="deliveryOption" value={deliveryOption} />
                </div>
              )}

              {/* Quantity */}
              {product && (
                <div>
                  <label htmlFor="quantity" className="form-label text-xs">Stückzahl</label>
                  <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    className="form-input max-w-[120px] py-2 text-sm"
                    min="1"
                    max="50"
                    defaultValue="1"
                  />
                </div>
              )}

              {/* 3. Rechnungsdaten (Immer Pflicht für die ordnungsgemäße Rechnungserstellung) */}
              <div className="p-4 sm:p-5 bg-[#FAF9F7] rounded-xl border border-[#E8E8E6] space-y-3.5">
                <div className="flex items-center gap-2 border-b border-[#E8E8E6] pb-2.5">
                  <FileText size={16} className="text-[#8C6D4F]" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#181818]">
                      Rechnungsanschrift
                    </h3>
                    <p className="text-[11px] text-[#777777]">
                      Für die Ausstellung der Handwerksrechnung &amp; Auftragsbestätigung
                    </p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="drawer-name" className="form-label text-xs">
                    Rechnungsempfänger (Vor- und Nachname oder Firma) <span className="text-[#8C6D4F]">*</span>
                  </label>
                  <input
                    id="drawer-name"
                    type="text"
                    name="name"
                    className="form-input text-sm py-2"
                    placeholder="Max Mustermann / Musterfirma GmbH"
                    required
                    autoComplete="name"
                  />
                  {state.errors?.name && (
                    <p className="form-error text-[11px]">{state.errors.name[0]}</p>
                  )}
                </div>

                {/* E-Mail */}
                <div>
                  <label htmlFor="drawer-email" className="form-label text-xs">
                    E-Mail-Adresse für die Rechnung <span className="text-[#8C6D4F]">*</span>
                  </label>
                  <input
                    id="drawer-email"
                    type="email"
                    name="email"
                    className="form-input text-sm py-2"
                    placeholder="rechnung@beispiel.de"
                    required
                    autoComplete="email"
                  />
                  {state.errors?.email && (
                    <p className="form-error text-[11px]">{state.errors.email[0]}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="drawer-phone" className="form-label text-xs">
                    Telefonnummer (für Rückfragen zu Maßen oder Abholung)
                  </label>
                  <input
                    id="drawer-phone"
                    type="tel"
                    name="phone"
                    className="form-input text-sm py-2"
                    placeholder="z. B. 037755 / 12345"
                    autoComplete="tel"
                  />
                </div>

                {/* Straße & Hausnummer */}
                <div>
                  <label htmlFor="street" className="form-label text-xs">
                    Straße &amp; Hausnummer <span className="text-[#8C6D4F]">*</span>
                  </label>
                  <input
                    id="street"
                    type="text"
                    name="street"
                    className="form-input text-sm py-2"
                    placeholder="Musterstraße 12 a"
                    required={Boolean(product)}
                    autoComplete="street-address"
                  />
                  {state.errors?.street && (
                    <p className="form-error text-[11px]">{state.errors.street[0]}</p>
                  )}
                </div>

                {/* PLZ & Ort */}
                <div className="grid grid-cols-5 gap-2.5">
                  <div className="col-span-2">
                    <label htmlFor="zip" className="form-label text-xs">
                      PLZ <span className="text-[#8C6D4F]">*</span>
                    </label>
                    <input
                      id="zip"
                      type="text"
                      name="zip"
                      className="form-input text-sm py-2"
                      placeholder={country === "Deutschland" ? "08304" : "1234"}
                      required={Boolean(product)}
                      maxLength={10}
                      autoComplete="postal-code"
                    />
                    {state.errors?.zip && (
                      <p className="form-error text-[11px]">{state.errors.zip[0]}</p>
                    )}
                  </div>
                  <div className="col-span-3">
                    <label htmlFor="city" className="form-label text-xs">
                      Ort / Stadt <span className="text-[#8C6D4F]">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      name="city"
                      className="form-input text-sm py-2"
                      placeholder="Schönheide"
                      required={Boolean(product)}
                      autoComplete="address-level2"
                    />
                    {state.errors?.city && (
                      <p className="form-error text-[11px]">{state.errors.city[0]}</p>
                    )}
                  </div>
                </div>

                {/* Land */}
                <div>
                  <label htmlFor="country" className="form-label text-xs">
                    Land <span className="text-[#8C6D4F]">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="form-input text-sm py-2 bg-white cursor-pointer"
                    autoComplete="country-name"
                  >
                    {countriesList.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {country === "Anderes Land" && (
                    <input
                      type="text"
                      name="customCountry"
                      className="form-input text-sm py-2 mt-2"
                      placeholder="Land bitte hier eingeben"
                      required
                    />
                  )}
                </div>
              </div>

              {/* 4. Versand-Option & Abweichende Lieferadresse */}
              {product && deliveryOption === "versand" && (
                <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E8E8E6] shadow-xs space-y-4">
                  <div className="flex items-center gap-2">
                    <Truck size={16} className="text-[#8C6D4F]" />
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#181818]">
                      Lieferung &amp; Versand
                    </h3>
                  </div>

                  {/* Checkbox: Abweichende Lieferadresse? */}
                  <div className="flex items-start gap-3 p-3 bg-[#FBFBFA] rounded-lg border border-[#EFEFEA]">
                    <input
                      id="hasDifferentShipping"
                      type="checkbox"
                      name="hasDifferentShipping"
                      checked={hasDifferentShipping}
                      onChange={(e) => setHasDifferentShipping(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-[#CCCCCC] accent-[#181818] cursor-pointer flex-shrink-0"
                    />
                    <label
                      htmlFor="hasDifferentShipping"
                      className="text-xs sm:text-[13px] font-semibold text-[#181818] leading-snug cursor-pointer select-none"
                    >
                      Abweichende Lieferadresse angeben?
                      <span className="block font-normal text-xs text-[#777777] mt-0.5">
                        {hasDifferentShipping
                          ? "Die Ware soll an eine andere Person oder Adresse geliefert werden."
                          : "Falls nicht ausgewählt, erfolgt die Lieferung an Ihre Rechnungsadresse."}
                      </span>
                    </label>
                  </div>

                  {/* Default hint when same as billing */}
                  {!hasDifferentShipping && (
                    <div className="p-3 bg-[#F5F8F5] rounded-lg border border-[#E0ECE0] text-xs text-[#2B602B] flex items-center gap-2">
                      <CheckCircle size={15} className="flex-shrink-0" />
                      <span>Lieferung erfolgt direkt an die oben angegebene Rechnungsadresse.</span>
                    </div>
                  )}

                  {/* Expanded Separate Shipping Address Form */}
                  {hasDifferentShipping && (
                    <div className="pt-2 border-t border-[#F0F0EE] space-y-3.5 animate-in fade-in duration-200">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D4F] block">
                        Separate Lieferanschrift
                      </span>

                      {/* Shipping Name */}
                      <div>
                        <label htmlFor="shippingName" className="form-label text-xs">
                          Empfänger (Name oder Firma) <span className="text-[#8C6D4F]">*</span>
                        </label>
                        <input
                          id="shippingName"
                          type="text"
                          name="shippingName"
                          className="form-input text-sm py-2"
                          placeholder="z. B. Sabine Musterfrau / c/o Büro"
                          required={hasDifferentShipping}
                        />
                        {state.errors?.shippingName && (
                          <p className="form-error text-[11px]">{state.errors.shippingName[0]}</p>
                        )}
                      </div>

                      {/* Shipping Street */}
                      <div>
                        <label htmlFor="shippingStreet" className="form-label text-xs">
                          Straße &amp; Hausnummer <span className="text-[#8C6D4F]">*</span>
                        </label>
                        <input
                          id="shippingStreet"
                          type="text"
                          name="shippingStreet"
                          className="form-input text-sm py-2"
                          placeholder="Lieferstraße 45 b"
                          required={hasDifferentShipping}
                        />
                        {state.errors?.shippingStreet && (
                          <p className="form-error text-[11px]">{state.errors.shippingStreet[0]}</p>
                        )}
                      </div>

                      {/* Shipping Zip & City */}
                      <div className="grid grid-cols-5 gap-2.5">
                        <div className="col-span-2">
                          <label htmlFor="shippingZip" className="form-label text-xs">
                            PLZ <span className="text-[#8C6D4F]">*</span>
                          </label>
                          <input
                            id="shippingZip"
                            type="text"
                            name="shippingZip"
                            className="form-input text-sm py-2"
                            placeholder={shippingCountry === "Deutschland" ? "08304" : "1234"}
                            required={hasDifferentShipping}
                            maxLength={10}
                          />
                          {state.errors?.shippingZip && (
                            <p className="form-error text-[11px]">{state.errors.shippingZip[0]}</p>
                          )}
                        </div>
                        <div className="col-span-3">
                          <label htmlFor="shippingCity" className="form-label text-xs">
                            Ort / Stadt <span className="text-[#8C6D4F]">*</span>
                          </label>
                          <input
                            id="shippingCity"
                            type="text"
                            name="shippingCity"
                            className="form-input text-sm py-2"
                            placeholder="Musterort"
                            required={hasDifferentShipping}
                          />
                          {state.errors?.shippingCity && (
                            <p className="form-error text-[11px]">{state.errors.shippingCity[0]}</p>
                          )}
                        </div>
                      </div>

                      {/* Shipping Country */}
                      <div>
                        <label htmlFor="shippingCountry" className="form-label text-xs">
                          Land der Lieferung <span className="text-[#8C6D4F]">*</span>
                        </label>
                        <select
                          id="shippingCountry"
                          name="shippingCountry"
                          value={shippingCountry}
                          onChange={(e) => setShippingCountry(e.target.value)}
                          className="form-input text-sm py-2 bg-white cursor-pointer"
                        >
                          {countriesList.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        {shippingCountry === "Anderes Land" && (
                          <input
                            type="text"
                            name="customShippingCountry"
                            className="form-input text-sm py-2 mt-2"
                            placeholder="Lieferland bitte hier eingeben"
                            required={hasDifferentShipping}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Notice for Selbstabholung */}
              {product && deliveryOption === "abholung" && (
                <div className="p-3.5 bg-[#FAF9F7] rounded-xl border border-[#E8E8E6] text-xs text-[#555555] flex items-start gap-2.5">
                  <Building size={16} className="text-[#8C6D4F] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#181818] block font-semibold">Abholung in der Werkstatt</strong>
                    <span>
                      Tischlerei Ronny Mehlhorn · Neuheider Straße 64 b, 08304 Schönheide. Wir informieren Sie per E-Mail, sobald Ihr Werkstück abholbereit ist.
                    </span>
                  </div>
                </div>
              )}

              {/* 5. Message / Anmerkungen */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="drawer-message" className="form-label mb-0 text-xs">
                    Ihre Anmerkungen oder Wünsche (optional)
                  </label>
                  <span className="text-[11px] text-[#777777]">Freitext</span>
                </div>
                <textarea
                  id="drawer-message"
                  name="message"
                  className="form-input resize-y min-h-[100px] leading-relaxed text-sm text-[#181818]"
                  rows={3}
                  placeholder="Besondere Wünsche bezüglich Maserung, Gravur, Liefertermin oder Geschenknachricht?"
                  defaultValue={
                    product
                      ? `Ich interessiere mich für das Werkstück "${product.name}". Bitte senden Sie mir die Auftragsbestätigung und Rechnung zu.`
                      : ""
                  }
                />
              </div>

              {/* 6. DSGVO */}
              <div className="flex items-start gap-3 p-3.5 bg-[#FBFBFA] rounded-lg border border-[#EFEFEA]">
                <input
                  id="drawer-dsgvo"
                  type="checkbox"
                  name="dsgvo"
                  className="mt-0.5 w-4 h-4 rounded border-[#CCCCCC] accent-[#181818] cursor-pointer flex-shrink-0"
                  required
                />
                <label htmlFor="drawer-dsgvo" className="text-xs text-[#444444] leading-relaxed cursor-pointer select-none">
                  Ich willige ein, dass meine Daten zur Rechnungsstellung und Bearbeitung der Bestellanfrage verarbeitet werden.{" "}
                  <span className="text-[#8C6D4F] font-bold">*</span>
                </label>
              </div>
            </div>

            {/* 7. Bottom Submit Bar */}
            <div className="px-5 sm:px-7 py-4 border-t border-[#E8E8E6] bg-white sticky bottom-0 flex-shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button
                type="submit"
                id="drawer-submit-btn"
                disabled={isPending}
                className="btn btn-primary w-full text-sm font-semibold py-3.5 rounded-lg cursor-pointer flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Wird übermittelt…</span>
                  </>
                ) : (
                  <span>Unverbindliche Bestellanfrage absenden</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
