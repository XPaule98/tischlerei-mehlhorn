"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

// --- Validation Helpers ---
const validatePostalCode = (zip: string, country: string) => {
  const clean = zip.trim();
  if (country === "Deutschland") {
    return /^\d{5}$/.test(clean);
  }
  if (country === "Österreich" || country === "Schweiz") {
    return /^\d{4}$/.test(clean);
  }
  return /^[A-Za-z0-9\s-]{3,10}$/.test(clean);
};

export interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function sendInquiryAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const website = (formData.get("website") as string) ?? "";
  // Honeypot check for bots
  if (website.length > 0) {
    return { success: false, message: "Spam erkannt." };
  }

  const isShopOrder = !!formData.get("productName");

  // Common contact / billing fields
  const name = ((formData.get("name") as string) ?? "").trim();
  const email = ((formData.get("email") as string) ?? "").trim();
  const phone = ((formData.get("phone") as string) ?? "").trim();
  const message = ((formData.get("message") as string) ?? "").trim();
  const deliveryOption = ((formData.get("deliveryOption") as string) ?? "abholung") as "versand" | "abholung";

  // Product fields
  const productName = ((formData.get("productName") as string) ?? "").trim();
  const productPrice = ((formData.get("productPrice") as string) ?? "").trim();
  const quantity = ((formData.get("quantity") as string) ?? "1").trim();

  // Billing address fields (always required for shop orders)
  const street = ((formData.get("street") as string) ?? "").trim();
  const zip = ((formData.get("zip") as string) ?? "").trim();
  const city = ((formData.get("city") as string) ?? "").trim();
  const rawCountry = (formData.get("country") as string) ?? "Deutschland";
  const customCountry = ((formData.get("customCountry") as string) ?? "").trim();
  const country = rawCountry === "Anderes Land" && customCountry ? customCountry : rawCountry;

  // Separate shipping address fields (optional checkbox for Versand)
  const hasDifferentShipping = formData.get("hasDifferentShipping") === "on";
  const shippingName = ((formData.get("shippingName") as string) ?? "").trim();
  const shippingStreet = ((formData.get("shippingStreet") as string) ?? "").trim();
  const shippingZip = ((formData.get("shippingZip") as string) ?? "").trim();
  const shippingCity = ((formData.get("shippingCity") as string) ?? "").trim();
  const rawShippingCountry = (formData.get("shippingCountry") as string) ?? "Deutschland";
  const customShippingCountry = ((formData.get("customShippingCountry") as string) ?? "").trim();
  const shippingCountry =
    rawShippingCountry === "Anderes Land" && customShippingCountry
      ? customShippingCountry
      : rawShippingCountry;

  const errors: Record<string, string[]> = {};

  // Validate Name & Email
  if (!name || name.length < 2) {
    errors.name = ["Bitte Ihren vollständigen Namen (Vor- und Nachname) eingeben."];
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = ["Bitte eine gültige E-Mail-Adresse eingeben."];
  }

  // Shop Orders: Full Billing Address is Mandatory
  if (isShopOrder) {
    if (!street || street.length < 3) {
      errors.street = ["Bitte Straße und Hausnummer für die Rechnung angeben."];
    }
    if (!zip) {
      errors.zip = ["Bitte Postleitzahl eingeben."];
    } else if (!validatePostalCode(zip, country)) {
      errors.zip = [
        country === "Deutschland"
          ? "Bitte eine gültige 5-stellige deutsche Postleitzahl eingeben."
          : `Bitte eine gültige Postleitzahl für ${country} eingeben.`,
      ];
    }
    if (!city || city.length < 2) {
      errors.city = ["Bitte den Wohnort / Stadt eingeben."];
    }

    // Separate Shipping Address Validation
    if (deliveryOption === "versand" && hasDifferentShipping) {
      if (!shippingName || shippingName.length < 2) {
        errors.shippingName = ["Bitte den Empfängernamen für die Lieferung eingeben."];
      }
      if (!shippingStreet || shippingStreet.length < 3) {
        errors.shippingStreet = ["Bitte Straße und Hausnummer der Lieferanschrift angeben."];
      }
      if (!shippingZip) {
        errors.shippingZip = ["Bitte Postleitzahl der Lieferanschrift eingeben."];
      } else if (!validatePostalCode(shippingZip, shippingCountry)) {
        errors.shippingZip = [
          shippingCountry === "Deutschland"
            ? "Bitte eine gültige 5-stellige Postleitzahl eingeben."
            : `Bitte eine gültige Postleitzahl für ${shippingCountry} eingeben.`,
        ];
      }
      if (!shippingCity || shippingCity.length < 2) {
        errors.shippingCity = ["Bitte den Ort der Lieferanschrift eingeben."];
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "Bitte korrigieren Sie die markierten Felder.",
      errors,
    };
  }

  // SMTP Transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "securesmtp.t-online.de",
    port: parseInt(process.env.SMTP_PORT ?? "587"),
    secure: false, // STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  // Calculate total if price exists
  const parsedPrice = parseFloat(productPrice);
  const parsedQty = parseInt(quantity) || 1;
  const totalPrice = !isNaN(parsedPrice) ? (parsedPrice * parsedQty).toFixed(2).replace(".", ",") : null;

  // Build HTML Email
  const htmlBody = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; color: #181818; background: #f9fafb; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border: 1px solid #e5e7eb; }
    .header { background: #141414; color: white; padding: 24px 32px; }
    .header h1 { margin: 0; font-size: 20px; letter-spacing: 2px; }
    .header p { margin: 4px 0 0; font-size: 13px; color: #E5DECE; }
    .body { padding: 32px; }
    .section { margin-bottom: 24px; }
    .section h2 { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #8C6D4F; margin: 0 0 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; font-weight: bold; }
    .row { display: flex; gap: 8px; margin-bottom: 8px; }
    .label { font-size: 13px; color: #6b7280; min-width: 140px; }
    .value { font-size: 14px; font-weight: 600; color: #181818; }
    .message-box { background: #f9fafb; border-left: 3px solid #8C6D4F; padding: 14px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #333; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
    .badge-versand { background: #dbeafe; color: #1d4ed8; }
    .badge-abholung { background: #dcfce7; color: #166534; }
    .footer { background: #f9fafb; padding: 16px 32px; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
    .highlight-box { background: #FAF9F7; border: 1px solid #E8E8E6; padding: 14px; border-radius: 6px; margin-bottom: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>TISCHLEREI MEHLHORN</h1>
      <p>Neue ${isShopOrder ? "Bestellanfrage aus dem Online-Shop" : "Kontaktanfrage"} eingegangen</p>
    </div>
    <div class="body">
      ${
        isShopOrder
          ? `
      <div class="section">
        <h2>Bestelltes Werkstück</h2>
        <div class="highlight-box">
          <div class="row"><span class="label">Artikel:</span><span class="value" style="font-size: 15px;">${productName}</span></div>
          <div class="row"><span class="label">Einzelpreis:</span><span class="value">${productPrice ? `${productPrice} €` : "Auf Anfrage"}</span></div>
          <div class="row"><span class="label">Menge:</span><span class="value">${parsedQty} Stück</span></div>
          ${totalPrice ? `<div class="row"><span class="label">Gesamtbetrag (ca.):</span><span class="value" style="color: #8C6D4F;">${totalPrice} €</span></div>` : ""}
          <div class="row" style="margin-top: 8px;"><span class="label">Übergabe-Option:</span><span class="value"><span class="badge badge-${deliveryOption}">${deliveryOption === "versand" ? "📦 Postversand" : "🏭 Selbstabholung in der Werkstatt"}</span></span></div>
        </div>
      </div>
      `
          : ""
      }

      <div class="section">
        <h2>${isShopOrder ? "Rechnungsempfänger & Rechnungsadresse" : "Kontaktdaten"}</h2>
        <div class="row"><span class="label">Name:</span><span class="value">${name}</span></div>
        <div class="row"><span class="label">E-Mail:</span><span class="value"><a href="mailto:${email}">${email}</a></span></div>
        ${phone ? `<div class="row"><span class="label">Telefon:</span><span class="value">${phone}</span></div>` : ""}
        ${
          street
            ? `
        <div class="row"><span class="label">Rechnungsstraße:</span><span class="value">${street}</span></div>
        <div class="row"><span class="label">PLZ / Ort:</span><span class="value">${zip} ${city}</span></div>
        <div class="row"><span class="label">Land:</span><span class="value">${country}</span></div>
        `
            : ""
        }
      </div>

      ${
        isShopOrder
          ? `
      <div class="section">
        <h2>Lieferadresse</h2>
        ${
          deliveryOption === "abholung"
            ? `<div class="row"><span class="label">Status:</span><span class="value">Selbstabholung in Schönheide (keine Lieferung erforderlich)</span></div>`
            : hasDifferentShipping
            ? `
          <div class="row"><span class="label">Empfänger:</span><span class="value">${shippingName}</span></div>
          <div class="row"><span class="label">Lieferstraße:</span><span class="value">${shippingStreet}</span></div>
          <div class="row"><span class="label">PLZ / Ort:</span><span class="value">${shippingZip} ${shippingCity}</span></div>
          <div class="row"><span class="label">Land:</span><span class="value">${shippingCountry}</span></div>
          <div class="row"><span class="label">Hinweis:</span><span class="value" style="color: #8C6D4F;">Abweichende Lieferadresse vom Kunden gewünscht</span></div>
        `
            : `
          <div class="row"><span class="label">Status:</span><span class="value">Identisch mit Rechnungsadresse</span></div>
        `
        }
      </div>
      `
          : ""
      }

      ${
        message
          ? `
      <div class="section">
        <h2>Anmerkungen des Kunden</h2>
        <div class="message-box">${message.replace(/\n/g, "<br>")}</div>
      </div>
      `
          : ""
      }
    </div>
    <div class="footer">
      Diese Anfrage wurde automatisch über den Online-Shop der Tischlerei Ronny Mehlhorn übermittelt.<br>
      Eingegangen am: ${new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    await transporter.sendMail({
      from: `"Tischlerei Mehlhorn Online-Shop" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      replyTo: email,
      subject: isShopOrder
        ? `Bestellanfrage: ${productName} (${parsedQty}x) – ${name}`
        : `Kontaktanfrage von ${name}`,
      html: htmlBody,
    });

    return {
      success: true,
      message:
        "Vielen Dank! Ihre Bestellanfrage wurde erfolgreich an uns übermittelt. Wir prüfen die Verfügbarkeit und senden Ihnen umgehend die Auftragsbestätigung und Rechnung per E-Mail zu.",
    };
  } catch (error) {
    console.error("SMTP Error:", error);
    return {
      success: false,
      message:
        "Beim Senden ist ein Fehler aufgetreten. Bitte kontaktieren Sie uns direkt per Telefon (037755 / 2346) oder per E-Mail.",
    };
  }
}
