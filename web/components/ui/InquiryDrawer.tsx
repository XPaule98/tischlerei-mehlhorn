"use client";

import { useRef, useState, useEffect, useActionState } from "react";
import { X, Package, MapPin, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { sendInquiryAction, type ActionResult } from "@/actions/sendInquiryAction";

export interface DrawerProduct {
  name: string;
  price?: number;
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
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
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
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg bg-white shadow-2xl flex flex-col transform transition-transform duration-350 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2
              className="text-lg font-bold text-[#121212]"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {product ? "Produkt anfragen" : "Kontakt aufnehmen"}
            </h2>
            {product && (
              <p className="text-sm text-gray-400 mt-0.5">{product.name}</p>
            )}
          </div>
          <button
            onClick={onClose}
            id="drawer-close-btn"
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Anfrage schließen"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Success State */}
        {state.success ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-4">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-[#121212]">Anfrage gesendet!</h3>
            <p className="text-gray-500 max-w-xs">{state.message}</p>
            <button onClick={onClose} className="btn btn-primary mt-4">
              Schließen
            </button>
          </div>
        ) : (
          /* Form */
          <form
            ref={formRef}
            action={formAction}
            className="flex-1 overflow-y-auto"
          >
            <div className="px-6 py-6 space-y-5">
              {/* Error state */}
              {!state.success && state.message && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">{state.message}</p>
                </div>
              )}

              {/* Honeypot (hidden from humans, visible to bots) */}
              <div className="absolute left-[-9999px] top-[-9999px] opacity-0" aria-hidden="true">
                <label htmlFor="drawer-website">Website (nicht ausfüllen)</label>
                <input
                  type="text"
                  id="drawer-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Pre-filled product info */}
              {product && (
                <input type="hidden" name="productName" value={product.name} />
              )}
              {product?.price && (
                <input type="hidden" name="productPrice" value={product.price.toString()} />
              )}

              {/* Delivery Option */}
              {product && (
                <div>
                  <label className="form-label">Lieferoption</label>
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
                        label: "Versand",
                        icon: Package,
                        desc: "Lieferung nach Hause",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setDeliveryOption(opt.value as "versand" | "abholung")
                        }
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          deliveryOption === opt.value
                            ? "border-[#121212] bg-[#121212] text-white"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <opt.icon
                          size={20}
                          className={`mb-2 ${
                            deliveryOption === opt.value
                              ? "text-[#E5DECE]"
                              : "text-gray-400"
                          }`}
                        />
                        <div className="font-semibold text-sm">{opt.label}</div>
                        <div
                          className={`text-xs mt-0.5 ${
                            deliveryOption === opt.value
                              ? "text-white/60"
                              : "text-gray-400"
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
                  <label htmlFor="quantity" className="form-label">Menge</label>
                  <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    className="form-input"
                    min="1"
                    defaultValue="1"
                    placeholder="1"
                  />
                </div>
              )}

              {/* Name */}
              <div>
                <label htmlFor="drawer-name" className="form-label">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="drawer-name"
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

              {/* Email */}
              <div>
                <label htmlFor="drawer-email" className="form-label">
                  E-Mail <span className="text-red-400">*</span>
                </label>
                <input
                  id="drawer-email"
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

              {/* Phone */}
              <div>
                <label htmlFor="drawer-phone" className="form-label">
                  Telefon (optional)
                </label>
                <input
                  id="drawer-phone"
                  type="tel"
                  name="phone"
                  className="form-input"
                  placeholder="+49 (0) 123 456 789"
                  autoComplete="tel"
                />
              </div>

              {/* Address (only for Versand) */}
              {product && deliveryOption === "versand" && (
                <div className="p-4 bg-[#f9fafb] rounded-xl space-y-4 border border-gray-100">
                  <p className="text-sm font-semibold text-gray-700">Lieferadresse</p>
                  <div>
                    <label htmlFor="street" className="form-label">Straße & Hausnummer</label>
                    <input id="street" type="text" name="street" className="form-input" placeholder="Musterstraße 1" autoComplete="street-address" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="zip" className="form-label">PLZ</label>
                      <input id="zip" type="text" name="zip" className="form-input" placeholder="12345" autoComplete="postal-code" maxLength={5} />
                    </div>
                    <div>
                      <label htmlFor="city" className="form-label">Ort</label>
                      <input id="city" type="text" name="city" className="form-input" placeholder="Musterstadt" autoComplete="address-level2" />
                    </div>
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <label htmlFor="drawer-message" className="form-label">
                  Ihre Nachricht <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="drawer-message"
                  name="message"
                  className="form-input resize-none"
                  rows={4}
                  placeholder={
                    product
                      ? `Ich interessiere mich für ${product.name}. Bitte kontaktieren Sie mich bezüglich Verfügbarkeit und weiterer Details.`
                      : "Ihre Nachricht an die Tischlerei Mehlhorn…"
                  }
                  required
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
                  className="mt-1 w-4 h-4 accent-[#121212]"
                  required
                />
                <label htmlFor="drawer-dsgvo" className="text-xs text-gray-500 leading-relaxed">
                  Ich habe die{" "}
                  <a href="/datenschutz" className="underline hover:text-[#121212]" target="_blank" rel="noopener">
                    Datenschutzerklärung
                  </a>{" "}
                  gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung
                  meiner Anfrage zu.{" "}
                  <span className="text-red-400">*</span>
                </label>
              </div>
            </div>

            {/* Footer with Submit */}
            <div className="px-6 py-5 border-t border-gray-100 bg-white sticky bottom-0">
              {product && (
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">
                    {product.name}
                    {deliveryOption === "versand" ? " + Versand" : " · Abholung"}
                  </span>
                  {product.price && (
                    <span className="font-bold text-[#121212]">
                      ab {product.price.toFixed(2).replace(".", ",")} €
                    </span>
                  )}
                </div>
              )}
              <button
                type="submit"
                id="drawer-submit-btn"
                disabled={isPending}
                className="btn btn-primary w-full"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Wird gesendet…
                  </>
                ) : (
                  "Anfrage absenden"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
