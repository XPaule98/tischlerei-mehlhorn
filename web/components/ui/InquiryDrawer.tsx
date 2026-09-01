"use client";

import { useRef, useState, useEffect, useActionState } from "react";
import { X, Package, MapPin, Loader2, CheckCircle, AlertCircle, Lock, ShieldCheck } from "lucide-react";
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
        className={`fixed inset-0 z-50 bg-[#1E1A17]/60 backdrop-blur-sm transition-opacity duration-300 ${
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
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg bg-[#FAF8F5] shadow-2xl flex flex-col transform transition-transform duration-350 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-[#E6DED4] bg-white">
          <div>
            <span className="text-craft-label block mb-0.5">Unverbindliche Werkstatt-Anfrage</span>
            <h2 className="font-serif-heading text-2xl text-[#1E1A17] font-medium">
              {product ? "Bestellanfrage" : "Kontakt aufnehmen"}
            </h2>
          </div>
          <button
            onClick={onClose}
            id="drawer-close-btn"
            className="w-9 h-9 flex items-center justify-center rounded hover:bg-[#F3ECE2] transition-colors text-[#5E564E]"
            aria-label="Anfrage schließen"
          >
            <X size={20} />
          </button>
        </div>

        {/* Success State */}
        {state.success ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4 bg-white">
            <div className="w-14 h-14 bg-[#F3ECE2] rounded-full flex items-center justify-center">
              <CheckCircle size={28} className="text-[#8C6D4F]" />
            </div>
            <h3 className="font-serif-heading text-2xl text-[#1E1A17] font-medium">Anfrage übermittelt</h3>
            <p className="text-[#5E564E] text-sm leading-relaxed max-w-xs">{state.message}</p>
            <button onClick={onClose} className="btn btn-wood mt-4 text-xs">
              Fenster schließen
            </button>
          </div>
        ) : (
          /* Form */
          <form
            ref={formRef}
            action={formAction}
            className="flex-1 overflow-y-auto"
          >
            <div className="px-7 py-6 space-y-5">
              {/* Error state */}
              {!state.success && state.message && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded text-sm text-red-700">
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

              {/* Locked Product Summary Card (Vorlage – fest vorgegeben) */}
              {product && (
                <div className="p-4 bg-white rounded-lg border border-[#E6DED4] shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D4F] flex items-center gap-1">
                      <Lock size={11} /> Fest ausgewähltes Werkstück
                    </span>
                    {product.price && (
                      <span className="font-serif-heading text-lg font-bold text-[#1E1A17]">
                        {product.price.toFixed(2).replace(".", ",")} €
                      </span>
                    )}
                  </div>
                  <div className="flex gap-4 items-center">
                    {product.image && (
                      <div className="w-16 h-16 rounded overflow-hidden bg-[#F3ECE2] flex-shrink-0 border border-[#E6DED4]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-serif-heading text-base font-semibold text-[#1E1A17] leading-tight">
                        {product.name}
                      </h4>
                      {product.dimensions && (
                        <p className="text-xs text-[#6B635B] mt-0.5">
                          Maße: {product.dimensions}
                        </p>
                      )}
                      {product.woodType && (
                        <p className="text-xs text-[#6B635B]">
                          Holz: {product.woodType}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* Hidden inputs to send locked product info */}
                  <input type="hidden" name="productName" value={product.name} />
                  {product.price && (
                    <input type="hidden" name="productPrice" value={product.price.toString()} />
                  )}
                </div>
              )}

              {/* Delivery Option Selection */}
              {product && (
                <div>
                  <label className="form-label">Übergabe-Wunsch</label>
                  <div className="grid grid-cols-2 gap-3 mt-1">
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
                        desc: "Versichert nach Hause",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setDeliveryOption(opt.value as "versand" | "abholung")
                        }
                        className={`p-3.5 rounded border text-left transition-all ${
                          deliveryOption === opt.value
                            ? "border-[#1E1A17] bg-[#1E1A17] text-white"
                            : "border-[#E6DED4] bg-white hover:border-[#CBB295]"
                        }`}
                      >
                        <opt.icon
                          size={16}
                          className={`mb-1.5 ${
                            deliveryOption === opt.value
                              ? "text-[#D4B28C]"
                              : "text-[#8C6D4F]"
                          }`}
                        />
                        <div className="font-semibold text-xs md:text-sm">{opt.label}</div>
                        <div
                          className={`text-[11px] mt-0.5 ${
                            deliveryOption === opt.value
                              ? "text-white/70"
                              : "text-[#6B635B]"
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
                  <label htmlFor="quantity" className="form-label">Gewünschte Stückzahl</label>
                  <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    className="form-input"
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
                  Telefonnummer (optional für Rückfragen)
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
                <div className="p-4 bg-white rounded border border-[#E6DED4] space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1E1A17] block">Lieferanschrift</span>
                  <div>
                    <label htmlFor="street" className="form-label text-[11px]">Straße & Hausnummer</label>
                    <input id="street" type="text" name="street" className="form-input text-sm py-2" placeholder="Musterstraße 1" autoComplete="street-address" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="zip" className="form-label text-[11px]">PLZ</label>
                      <input id="zip" type="text" name="zip" className="form-input text-sm py-2" placeholder="12345" autoComplete="postal-code" maxLength={5} />
                    </div>
                    <div>
                      <label htmlFor="city" className="form-label text-[11px]">Ort</label>
                      <input id="city" type="text" name="city" className="form-input text-sm py-2" placeholder="Musterstadt" autoComplete="address-level2" />
                    </div>
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <label htmlFor="drawer-message" className="form-label">
                  Ihre Anmerkungen / Wünsche (optional)
                </label>
                <textarea
                  id="drawer-message"
                  name="message"
                  className="form-input resize-none"
                  rows={3}
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
              <div className="flex items-start gap-3">
                <input
                  id="drawer-dsgvo"
                  type="checkbox"
                  name="dsgvo"
                  className="mt-1 w-4 h-4 accent-[#1E1A17] cursor-pointer"
                  required
                />
                <label htmlFor="drawer-dsgvo" className="text-xs text-[#5E564E] leading-relaxed cursor-pointer">
                  Ich willige ein, dass meine Angaben zur Bearbeitung der Anfrage gespeichert und verarbeitet werden.{" "}
                  <span className="text-[#8C6D4F]">*</span>
                </label>
              </div>
            </div>

            {/* Footer with Submit */}
            <div className="px-7 py-5 border-t border-[#E6DED4] bg-white sticky bottom-0">
              <button
                type="submit"
                id="drawer-submit-btn"
                disabled={isPending}
                className="btn btn-wood w-full font-medium"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Wird übermittelt…
                  </>
                ) : (
                  "Unverbindliche Bestellanfrage absenden"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
