import { defineType, defineField } from "sanity";

export const showcaseVideo = defineType({
  name: "showcaseVideo",
  title: "Video-Sektion (Startseite)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Interne Bezeichnung",
      type: "string",
      initialValue: "Fullwidth Video Startseite",
    }),
    defineField({
      name: "videoDesktopUrl",
      title: "Video URL Desktop (16:9 / Querformat)",
      type: "url",
      description: "Direkter Link zu einer .mp4 oder .webm Datei (z. B. auf CDN, Hosting oder Cloud Storage).",
    }),
    defineField({
      name: "videoMobileUrl",
      title: "Video URL Mobile (9:16 / Hochformat oder quadratisch, optional)",
      type: "url",
      description: "Optimiertes Video für Smartphones. Falls leer, wird das Desktop-Video verwendet.",
    }),
    defineField({
      name: "posterImage",
      title: "Fallback / Poster-Bild (wird angezeigt während das Video lädt)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "badge",
      title: "Badge / Dachzeile (optional)",
      type: "string",
      description: "z. B. 'Werkstatt & Fertigung in Aktion'",
    }),
    defineField({
      name: "headline",
      title: "Überschrift über dem Video (optional)",
      type: "string",
      description: "z. B. 'Präzision in jedem Handgriff'",
    }),
    defineField({
      name: "subheadline",
      title: "Beschreibungstext (optional)",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "posterImage",
    },
  },
});
