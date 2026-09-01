import { defineType, defineField } from "sanity";

export const galleryPage = defineType({
  name: "galleryPage",
  title: "Galerie & Referenzen Seite",
  type: "document",
  fields: [
    defineField({
      name: "badge",
      title: "Badge / Dachzeile",
      type: "string",
      initialValue: "Originalaufnahmen aus Schönheide",
    }),
    defineField({
      name: "title",
      title: "Hauptüberschrift",
      type: "string",
      initialValue: "Galerie & Referenzen",
    }),
    defineField({
      name: "subtitle",
      title: "Untertitel / Beschreibung",
      type: "text",
      rows: 2,
      initialValue:
        "Einblicke in maßgefertigte Holzfenster, Holz-Alu-Systeme, Haustüren und Wintergärten aus unserer Werkstatt.",
    }),
    defineField({
      name: "headerImage",
      title: "Header-Hintergrundbild",
      type: "image",
      options: { hotspot: true },
      description: "Hintergrundbild für den Kopfbereich der Galerie.",
    }),
  ],
});
