import { defineType, defineField } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Leistungen Seite",
  type: "document",
  fields: [
    defineField({
      name: "badge",
      title: "Badge / Dachzeile",
      type: "string",
      initialValue: "Meisterbetrieb Schönheide · Inh. Ronny Mehlhorn",
    }),
    defineField({
      name: "title",
      title: "Hauptüberschrift",
      type: "string",
      initialValue: "Leistungsumfang & Fertigung",
    }),
    defineField({
      name: "subtitle",
      title: "Untertitel / Beschreibung",
      type: "text",
      rows: 2,
      initialValue:
        "Eigene Herstellung im Erzgebirge kombiniert mit Fachmontage führender Bauelemente-Marken.",
    }),
    defineField({
      name: "headerImage",
      title: "Header-Hintergrundbild",
      type: "image",
      options: { hotspot: true },
      description: "Atmosphärisches Hintergrundbild für den Kopfbereich der Leistungsseite.",
    }),
    defineField({
      name: "headerVideoUrl",
      title: "Header-Hintergrundvideo URL (optional)",
      type: "url",
      description: "Link zu Streamable, YouTube, Vimeo oder direkter .mp4 Link für einen dezenten Video-Hintergrund im Header.",
    }),
    defineField({
      name: "headerVideoFile",
      title: "ODER: Header-Video Datei hochladen (.mp4 / .webm)",
      type: "file",
      options: { accept: "video/*" },
      description: "Laden Sie hier direkt eine Videodatei für den Kopfbereich der Leistungsseite hoch (überschreibt die URL).",
    }),
  ],
});
