import { defineType, defineField } from "sanity";

export const companyInfo = defineType({
  name: "companyInfo",
  title: "Firmendaten & Öffnungszeiten",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Firmenname",
      type: "string",
      initialValue: "Tischlerei Mehlhorn",
    }),
    defineField({
      name: "owner",
      title: "Inhaber / Meister",
      type: "string",
      initialValue: "Ronny Mehlhorn, Tischlermeister",
    }),
    defineField({
      name: "phone",
      title: "Telefonnummer",
      type: "string",
      initialValue: "+49 (0) 00 00 00 00",
    }),
    defineField({
      name: "email",
      title: "E-Mail-Adresse",
      type: "string",
      initialValue: "info@tischlerei-mehlhorn.de",
    }),
    defineField({
      name: "street",
      title: "Straße & Hausnummer",
      type: "string",
      initialValue: "Musterstraße 1",
    }),
    defineField({
      name: "zipCity",
      title: "PLZ & Ort",
      type: "string",
      initialValue: "00000 Musterstadt",
    }),
    defineField({
      name: "hoursWeekdays",
      title: "Öffnungszeiten Mo – Fr",
      type: "string",
      initialValue: "07:00 – 17:00 Uhr",
    }),
    defineField({
      name: "hoursSaturday",
      title: "Öffnungszeiten Samstag",
      type: "string",
      initialValue: "08:00 – 12:00 Uhr",
    }),
  ],
});
