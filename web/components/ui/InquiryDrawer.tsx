"use client";

import { useRef, useState, useEffect, useActionState } from "react";
import { X, Package, MapPin, Loader2, CheckCircle, AlertCircle, Lock } from "lucide-react";
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
  const [deliveryOption, setDeliveryOption] = useState<"versand" | "abholung">(
    "abholung"
  );
  const [state, formAction, isPending] = useActionState(
    sendInquiryAction,
    initialState
  );

  // Reset form when drawer opens
  useEffect(() => {
    if (isOpen) {
      formRef.current?.reset();
      setDeliveryOption("abholung");
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
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={product ? `Anfrage: ${product.name}` : "Kontaktanfrage"}
        className={`fixed right-0 top-0 bottom-0 z-50 w-full sm:max-w-lg bg-white shadow-2xl flex flex-col h-[100dvh] max-h-[100dvh] transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-[#E8E8E6] flex-shrink-0 bg-white">
          <div>
            <span className="text-craft-label block mb-0.5">Unverbindliche Anfrage</span>
            <h2 className="text-lg sm:text-xl font-bold text-[#181818]">
              {product ? "Bestellanfrage" : "Kontakt aufnehmen"}
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

        {/* Success State */}
        {state.success ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-3 bg-white">
            <div className="w-12 h-12 bg-[#F2F2F0] rounded-full flex items-center justify-center">
              <CheckCircle size={24} className="text-[#8C6D4F]" />
            </div>
            <h3 className="text-xl font-bold text-[#181818]">Anfrage übermittelt</h3>
            <p className="text-[#555555] text-xs leading-relaxed max-w-xs">{state.message}</p>
            <button onClick={onClose} className="btn btn-primary mt-3 text-xs">
              Schließen
            </button>
          </div>
        ) : (
          /* Form */
          <form
            ref={formRef}
            action={formAction}
            className="flex-1 overflow-y-auto overscroll-contain flex flex-col"
          >
            <div className="px-5 sm:px-7 py-5 sm:py-6 space-y-4 sm:space-y-5 flex-1">
              {/* Error state */}
              {!state.success && state.message && (
                <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                  <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p>{state.message}</p>
                </div>
              )}

              {/* Honeypot */}
              <div className="absolute left-[-9999px] top-[-9999px] opacity-0" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Locked Product Summary Card */}
              {product && (
                <div className="p-4 bg-[#F9F9F8] rounded-lg border border-[#E8E8E6]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D4F] flex items-center gap-1">
                      <Lock size={11} /> Fest hinterlegtes Werkstück
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
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#181818] leading-tight">
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

              {/* Delivery Option Selection */}
              {product && (
                <div>
                  <label className="form-label">Übergabe-Option</label>
                  <div className="grid grid-cols-2 gap-3 mt-1.5">
                    {[
                      {
                        value: "abholung",
                        label: "Selbstabholung",
                        icon: MapPin,
                        desc: "In der Werkstatt",
                      },
                      {
                        value: "versand",
                        label: "Postversand",
                        icon: Package,
                        desc: "Versichert verpackt",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setDeliveryOption(opt.value as "versand" | "abholung")
                        }
                        className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                          deliveryOption === opt.value
                            ? "border-[#181818] bg-[#181818] text-white shadow-xs"
                            : "border-[#DCDCD8] bg-white hover:border-[#181818]"
                        }`}
                      >
                        <opt.icon
                          size={16}
                          className={`mb-1.5 ${
                            deliveryOption === opt.value
                              ? "text-white"
                              : "text-[#8C6D4F]"
                          }`}
                        />
                        <div className="font-bold text-xs sm:text-sm">{opt.label}</div>
                        <div
                          className={`text-[11px] mt-0.5 ${
                            deliveryOption === opt.value
                              ? "text-white/80"
                              : "text-[#666666]"
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

              {!product && (
                <input type="hidden" name="deliveryOption" value="abholung" />
              )}

              {/* Quantity */}
              {product && (
                <div>
                  <label htmlFor="quantity" className="form-label">Stückzahl</label>
                  <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    className="form-input max-w-[120px]"
                    min="1"
                    defaultValue="1"
                  />
                </div>
              )}

              {/* Name */}
              <div>
                <label htmlFor="drawer-name" className="form-label">
                  Ihr Name <span className="text-[#8C6D4F]">*</span>
                </label>
                <input
                  id="drawer-name"
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Vor- und Nachname"
                  required
                  autoComplete="name"
                />
                {state.errors?.name && (
                  <p className="form-error">{state.errors.name[0]}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="drawer-email" className="form-label">
                  E-Mail-Adresse <span className="text-[#8C6D4F]">*</span>
                </label>
                <input
                  id="drawer-email"
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

              {/* Phone */}
              <div>
                <label htmlFor="drawer-phone" className="form-label">
                  Telefonnummer (optional)
                </label>
                <input
                  id="drawer-phone"
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="+49 (0) ..."
                  autoComplete="tel"
                />
              </div>

              {/* Address (for Versand) */}
              {product && deliveryOption === "versand" && (
                <div className="p-4 bg-[#F9F9F8] rounded-lg border border-[#E8E8E6] space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#181818] block">Lieferanschrift</span>
                  <div>
                    <label htmlFor="street" className="form-label text-xs">Straße & Hausnummer</label>
                    <input id="street" type="text" name="street" className="form-input text-sm py-2" placeholder="Musterstraße 1" autoComplete="street-address" />
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label htmlFor="zip" className="form-label text-xs">PLZ</label>
                      <input id="zip" type="text" name="zip" className="form-input text-sm py-2" placeholder="12345" autoComplete="postal-code" maxLength={5} />
                    </div>
                    <div>
                      <label htmlFor="city" className="form-label text-xs">Ort</label>
                      <input id="city" type="text" name="city" className="form-input text-sm py-2" placeholder="Musterstadt" autoComplete="address-level2" />
                    </div>
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="drawer-message" className="form-label mb-0">
                    Ihre Anmerkungen (optional)
                  </label>
                  <span className="text-[11px] text-[#777777]">Freitext</span>
                </div>
                <textarea
                  id="drawer-message"
                  name="message"
                  className="form-input resize-y min-h-[120px] leading-relaxed text-sm sm:text-base text-[#181818]"
                  rows={4}
                  placeholder="Haben Sie besondere Wünsche bezüglich Holzart, Gravur oder Abholtermin?"
                  defaultValue={
                    product
                      ? `Ich interessiere mich für das Werkstück "${product.name}". Bitte geben Sie mir Bescheid bezüglich Verfügbarkeit und Abwicklung.`
                      : ""
                  }
                />
                {state.errors?.message && (
                  <p className="form-error">{state.errors.message[0]}</p>
                )}
              </div>

              {/* DSGVO */}
              <div className="flex items-start gap-3 p-3.5 bg-[#FBFBFA] rounded-lg border border-[#EFEFEA]">
                <input
                  id="drawer-dsgvo"
                  type="checkbox"
                  name="dsgvo"
                  className="mt-0.5 w-4 h-4 rounded border-[#CCCCCC] accent-[#181818] cursor-pointer flex-shrink-0"
                  required
                />
                <label htmlFor="drawer-dsgvo" className="text-xs sm:text-[13px] text-[#444444] leading-relaxed cursor-pointer select-none">
                  Ich willige ein, dass meine Daten zur Bearbeitung der Anfrage verarbeitet werden.{" "}
                  <span className="text-[#8C6D4F] font-bold">*</span>
                </label>
              </div>
            </div>

            {/* Submit */}
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
