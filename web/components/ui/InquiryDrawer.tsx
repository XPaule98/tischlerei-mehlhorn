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
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E8E6]">
          <div>
            <span className="text-craft-label block mb-0.5">Unverbindliche Anfrage</span>
            <h2 className="text-lg font-bold text-[#181818]">
              {product ? "Bestellanfrage" : "Kontakt aufnehmen"}
            </h2>
          </div>
          <button
            onClick={onClose}
            id="drawer-close-btn"
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#F2F2F0] transition-colors text-[#555555]"
            aria-label="Schließen"
          >
            <X size={18} />
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
            className="flex-1 overflow-y-auto"
          >
            <div className="px-6 py-5 space-y-4">
              {/* Error state */}
              {!state.success && state.message && (
                <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                  <AlertCircle size={15} className="text-red-500 mt-0.5 flex-shrink-0" />
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
                <div className="p-3.5 bg-[#F9F9F8] rounded border border-[#E8E8E6]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D4F] flex items-center gap-1">
                      <Lock size={10} /> Fest hinterlegtes Werkstück
                    </span>
                    {product.price && (
                      <span className="text-base font-bold text-[#181818]">
                        {product.price.toFixed(2).replace(".", ",")} €
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3 items-center">
                    {product.image && (
                      <div className="w-14 h-14 rounded overflow-hidden bg-white flex-shrink-0 border border-[#E8E8E6]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-[#181818] leading-tight">
                        {product.name}
                      </h4>
                      {product.dimensions && (
                        <p className="text-[11px] text-[#666666] mt-0.5">
                          Maße: {product.dimensions}
                        </p>
                      )}
                      {product.woodType && (
                        <p className="text-[11px] text-[#666666]">
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
                  <div className="grid grid-cols-2 gap-2.5 mt-1">
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
                        className={`p-3 rounded border text-left transition-all cursor-pointer ${
                          deliveryOption === opt.value
                            ? "border-[#181818] bg-[#181818] text-white"
                            : "border-[#E8E8E6] bg-white hover:border-[#CCCCCC]"
                        }`}
                      >
                        <opt.icon
                          size={14}
                          className={`mb-1 ${
                            deliveryOption === opt.value
                              ? "text-white"
                              : "text-[#8C6D4F]"
                          }`}
                        />
                        <div className="font-bold text-xs">{opt.label}</div>
                        <div
                          className={`text-[10px] mt-0.5 ${
                            deliveryOption === opt.value
                              ? "text-white/70"
                              : "text-[#777777]"
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
                <div className="p-3.5 bg-[#F9F9F8] rounded border border-[#E8E8E6] space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#181818] block">Lieferanschrift</span>
                  <div>
                    <label htmlFor="street" className="form-label text-[10px]">Straße & Hausnummer</label>
                    <input id="street" type="text" name="street" className="form-input text-xs py-1.5" placeholder="Musterstraße 1" autoComplete="street-address" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="zip" className="form-label text-[10px]">PLZ</label>
                      <input id="zip" type="text" name="zip" className="form-input text-xs py-1.5" placeholder="12345" autoComplete="postal-code" maxLength={5} />
                    </div>
                    <div>
                      <label htmlFor="city" className="form-label text-[10px]">Ort</label>
                      <input id="city" type="text" name="city" className="form-input text-xs py-1.5" placeholder="Musterstadt" autoComplete="address-level2" />
                    </div>
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <label htmlFor="drawer-message" className="form-label">
                  Ihre Anmerkungen (optional)
                </label>
                <textarea
                  id="drawer-message"
                  name="message"
                  className="form-input resize-none"
                  rows={2}
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
              <div className="flex items-start gap-2.5">
                <input
                  id="drawer-dsgvo"
                  type="checkbox"
                  name="dsgvo"
                  className="mt-0.5 w-4 h-4 accent-[#181818] cursor-pointer"
                  required
                />
                <label htmlFor="drawer-dsgvo" className="text-[11px] text-[#666666] leading-relaxed cursor-pointer">
                  Ich willige ein, dass meine Daten zur Bearbeitung der Anfrage verarbeitet werden.{" "}
                  <span className="text-[#8C6D4F]">*</span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <div className="px-6 py-4 border-t border-[#E8E8E6] bg-white sticky bottom-0">
              <button
                type="submit"
                id="drawer-submit-btn"
                disabled={isPending}
                className="btn btn-primary w-full text-xs font-semibold py-3 cursor-pointer"
              >
                {isPending ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
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
