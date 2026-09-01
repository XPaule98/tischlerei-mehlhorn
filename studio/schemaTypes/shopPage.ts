import { defineType, defineField } from "sanity";

export const shopPage = defineType({
  name: "shopPage",
  title: "Shop & Deko Seite",
  type: "document",
  fields: [
    defineField({
      name: "badge",
      title: "Badge / Dachzeile",
      type: "string",
      initialValue: "Aus unserer Meisterwerkstatt in Schönheide",
    }),
    defineField({
      name: "title",
      title: "Hauptüberschrift",
      type: "string",
      initialValue: "Dekoartikel & handgefertigte Unikate.",
    }),
    defineField({
      name: "subtitle",
      title: "Untertitel / Beschreibung",
      type: "text",
      rows: 2,
      initialValue:
        "Jedes Stück wird in traditioneller Handarbeit aus ausgewähltem Massivholz gefertigt. Unverbindliche Anfrage mit Postversand oder Abholung.",
    }),
    defineField({
      name: "headerImage",
      title: "Header-Hintergrundbild",
      type: "image",
      options: { hotspot: true },
      description: "Hintergrundbild für den Kopfbereich der Shop-Seite.",
    }),
  ],
});
