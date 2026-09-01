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
      description: "Direkter Link zu einer .mp4 Datei für einen dezenten Video-Hintergrund im Header.",
    }),
  ],
});
