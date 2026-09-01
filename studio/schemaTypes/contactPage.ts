import { defineType, defineField } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Kontakt Seite",
  type: "document",
  fields: [
    defineField({
      name: "badge",
      title: "Badge / Dachzeile",
      type: "string",
      initialValue: "Meisterbetrieb in Schönheide",
    }),
    defineField({
      name: "title",
      title: "Hauptüberschrift",
      type: "string",
      initialValue: "Kontakt & Vor-Ort-Beratung",
    }),
    defineField({
      name: "subtitle",
      title: "Untertitel / Beschreibung",
      type: "text",
      rows: 2,
      initialValue:
        "Besuchen Sie uns in der Neuheider Straße 64 b oder fordern Sie ein kostenloses Angebot für Ihr Projekt an.",
    }),
    defineField({
      name: "headerImage",
      title: "Header-Hintergrundbild",
      type: "image",
      options: { hotspot: true },
      description: "Hintergrundbild für den Kopfbereich der Kontaktseite.",
    }),
  ],
});
