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
      initialValue: "Meisterbetrieb Schönheide · Inh. Ronny Mehlhorn",
    }),
    defineField({
      name: "title",
      title: "Hauptüberschrift Header",
      type: "string",
      initialValue: "Galerie & Referenzen",
    }),
    defineField({
      name: "subtitle",
      title: "Untertitel Header",
      type: "text",
      rows: 2,
      initialValue:
        "Einblicke in unsere Meisterwerkstatt, Fertigung und Baustellen im Erzgebirge.",
    }),
    defineField({
      name: "headerImage",
      title: "Header-Hintergrundbild",
      type: "image",
      options: { hotspot: true },
      description: "Hintergrundbild für den Kopfbereich der Galerie.",
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
      description: "Laden Sie hier direkt eine Videodatei für den Kopfbereich der Galerie hoch (überschreibt die URL).",
    }),
  ],
});
