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
      description: "Link zu Streamable (z. B. https://streamable.com/5n1th0), YouTube, Vimeo oder direkter .mp4 / .webm Link.",
    }),
    defineField({
      name: "videoDesktopFile",
      title: "ODER: Video-Datei Desktop hochladen (.mp4 / .webm)",
      type: "file",
      options: { accept: "video/*" },
      description: "Laden Sie hier eine Videodatei direkt von Ihrem Rechner hoch (überschreibt die URL).",
    }),
    defineField({
      name: "videoMobileUrl",
      title: "Video URL Mobile (9:16 / Hochformat oder quadratisch, optional)",
      type: "url",
      description: "Optimiertes Video für Smartphones (Streamable, YouTube, Vimeo oder .mp4). Falls leer, wird Desktop verwendet.",
    }),
    defineField({
      name: "videoMobileFile",
      title: "ODER: Video-Datei Mobile hochladen (.mp4 / .webm, optional)",
      type: "file",
      options: { accept: "video/*" },
      description: "Laden Sie hier optional eine hochkante Smartphone-Videodatei direkt hoch.",
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
