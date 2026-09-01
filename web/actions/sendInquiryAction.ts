"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

// --- Zod Validation Schema ---
const InquirySchema = z.object({
  // Honeypot field – must be empty (bots fill this in)
  website: z.string().max(0, "Spam erkannt"),

  // Contact fields
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein.").max(100),
  email: z.string().email("Bitte eine gültige E-Mail-Adresse eingeben."),
  phone: z.string().optional(),
  message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen lang sein.").max(2000),

  // Delivery option
  deliveryOption: z.enum(["versand", "abholung"]),

  // Product-specific (optional)
  productName: z.string().optional(),
  productPrice: z.string().optional(),
  quantity: z.string().optional(),

  // Address (required for Versand)
  street: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
});

export type InquiryFormData = z.infer<typeof InquirySchema>;

export interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function sendInquiryAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  // Parse raw form data
  const rawData = {
    website: formData.get("website") as string ?? "",
    name: formData.get("name") as string ?? "",
    email: formData.get("email") as string ?? "",
    phone: formData.get("phone") as string ?? "",
    message: formData.get("message") as string ?? "",
    deliveryOption: formData.get("deliveryOption") as string ?? "abholung",
    productName: formData.get("productName") as string ?? "",
    productPrice: formData.get("productPrice") as string ?? "",
    quantity: formData.get("quantity") as string ?? "",
    street: formData.get("street") as string ?? "",
    city: formData.get("city") as string ?? "",
    zip: formData.get("zip") as string ?? "",
  };

  // Validate
  const result = InquirySchema.safeParse(rawData);
  if (!result.success) {
    return {
      success: false,
      message: "Bitte prüfen Sie Ihre Eingaben.",
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = result.data;

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

  // Build HTML Email
  const isProductInquiry = !!data.productName;
  const htmlBody = `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; color: #121212; background: #f9fafb; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: #121212; color: white; padding: 24px 32px; }
    .header h1 { margin: 0; font-size: 20px; letter-spacing: 2px; }
    .header p { margin: 4px 0 0; font-size: 12px; color: #E5DECE; }
    .body { padding: 32px; }
    .section { margin-bottom: 24px; }
    .section h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; margin: 0 0 12px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; }
    .row { display: flex; gap: 8px; margin-bottom: 8px; }
    .label { font-size: 13px; color: #6b7280; min-width: 120px; }
    .value { font-size: 14px; font-weight: 600; }
    .message-box { background: #f9fafb; border-left: 3px solid #121212; padding: 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; }
    .footer { background: #f9fafb; padding: 16px 32px; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
    .badge-versand { background: #dbeafe; color: #1d4ed8; }
    .badge-abholung { background: #dcfce7; color: #166534; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>TISCHLEREI MEHLHORN</h1>
      <p>Neue ${isProductInquiry ? "Produktanfrage" : "Kontaktanfrage"} eingegangen</p>
    </div>
    <div class="body">
      ${isProductInquiry ? `
      <div class="section">
        <h2>Produkt</h2>
        <div class="row"><span class="label">Artikel:</span><span class="value">${data.productName}</span></div>
        <div class="row"><span class="label">Preis:</span><span class="value">${data.productPrice ? `${data.productPrice} €` : "Auf Anfrage"}</span></div>
        <div class="row"><span class="label">Menge:</span><span class="value">${data.quantity || "1"} Stück</span></div>
        <div class="row"><span class="label">Lieferoption:</span><span class="value"><span class="badge badge-${data.deliveryOption}">${data.deliveryOption === "versand" ? "📦 Versand" : "🏭 Selbstabholung"}</span></span></div>
      </div>
      ` : ""}

      <div class="section">
        <h2>Kontaktdaten</h2>
        <div class="row"><span class="label">Name:</span><span class="value">${data.name}</span></div>
        <div class="row"><span class="label">E-Mail:</span><span class="value"><a href="mailto:${data.email}">${data.email}</a></span></div>
        ${data.phone ? `<div class="row"><span class="label">Telefon:</span><span class="value">${data.phone}</span></div>` : ""}
      </div>

      ${data.deliveryOption === "versand" && data.street ? `
      <div class="section">
        <h2>Lieferadresse</h2>
        <div class="row"><span class="label">Straße:</span><span class="value">${data.street}</span></div>
        <div class="row"><span class="label">PLZ / Ort:</span><span class="value">${data.zip} ${data.city}</span></div>
      </div>
      ` : ""}

      <div class="section">
        <h2>Nachricht</h2>
        <div class="message-box">${data.message.replace(/\n/g, "<br>")}</div>
      </div>
    </div>
    <div class="footer">
      Diese E-Mail wurde automatisch über das Kontaktformular auf der Website der Tischlerei Mehlhorn generiert.<br>
      Zeitstempel: ${new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin" })}
    </div>
  </div>
</body>
</html>
  `.trim();

  try {
    await transporter.sendMail({
      from: `"Tischlerei Mehlhorn Webseite" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      replyTo: data.email,
      subject: isProductInquiry
        ? `Produktanfrage: ${data.productName} – ${data.name}`
        : `Kontaktanfrage von ${data.name}`,
      html: htmlBody,
    });

    return {
      success: true,
      message:
        "Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Wir melden uns schnellstmöglich bei Ihnen.",
    };
  } catch (error) {
    console.error("SMTP Error:", error);
    return {
      success: false,
      message:
        "Beim Senden ist ein Fehler aufgetreten. Bitte kontaktieren Sie uns direkt per Telefon oder E-Mail.",
    };
  }
}
