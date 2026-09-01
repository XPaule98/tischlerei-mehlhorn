import { defineType, defineField } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Über uns & Werkstatt",
  type: "document",
  fields: [
    defineField({
      name: "badge",
      title: "Badge / Dachzeile",
      type: "string",
      initialValue: "Familienbetrieb im Erzgebirge seit 1977",
    }),
    defineField({
      name: "headline",
      title: "Hauptüberschrift Header",
      type: "string",
      initialValue: "Über uns & Werkstatt",
    }),
    defineField({
      name: "introText",
      title: "Untertitel Header",
      type: "text",
      rows: 2,
      initialValue:
        "Tradition, Meisterhandwerk & moderner Bauelementebau in der Neuheider Straße 64 b in Schönheide.",
    }),
    defineField({
      name: "headerImage",
      title: "Header-Hintergrundbild",
      type: "image",
      options: { hotspot: true },
      description: "Hintergrundbild für den Kopfbereich der Über-uns-Seite.",
    }),
    defineField({
      name: "headerVideoUrl",
      title: "Header-Hintergrundvideo URL (optional)",
      type: "url",
      description: "Direkter Link zu einer .mp4 Datei für einen dezenten Video-Hintergrund im Header.",
    }),
    defineField({
      name: "storyHeadline",
      title: "Überschrift der Firmen-Geschichte",
      type: "string",
      initialValue: "Vom traditionellen Gestellbau zum modernen Meisterbetrieb",
    }),
    defineField({
      name: "storyParagraph1",
      title: "Fließtext Teil 1 (Historie & Ursprung)",
      type: "text",
      rows: 4,
      initialValue:
        "Die Geschichte unserer Tischlerei begann im Januar 1977, als Roland Mehlhorn den Schritt in die Selbstständigkeit wagte. Was mit traditionellem Gestellbau und solider Handarbeit seinen Anfang nahm, wuchs über die Jahrzehnte durch kontinuierliche Weiterentwicklung und kompromisslose Qualitätsorientierung zu einem festen Begriff im Westerzgebirge heran.",
    }),
    defineField({
      name: "storyParagraph2",
      title: "Fließtext Teil 2 (Neubau & Generationswechsel)",
      type: "text",
      rows: 4,
      initialValue:
        "1992 folgte der Neubau des heutigen Firmengebäudes in der Neuheider Straße 64 b – mit großzügigen Werkstatträumen und modernem Maschinenpark. Seit Juli 2012 führt Tischlermeister Ronny Mehlhorn die Geschicke des Familienunternehmens in zweiter Generation. Dabei verbinden wir überlieferte Handwerkstradition mit modernster Profiltechnik (wie dem System Gutmann Mira) und zukunftssicherer Isoliertechnologie.",
    }),
    defineField({
      name: "storyParagraph3",
      title: "Fließtext Teil 3 (Philosophie & Material)",
      type: "text",
      rows: 4,
      initialValue:
        "Für uns ist Holz nicht bloß ein Werkstoff, sondern lebendige Natur. Wir verarbeiten vorrangig hochwertige heimische Hölzer wie Eiche, Kiefer und Lärche. Jedes Fenster, jede Haustür und jeder Wintergarten verlässt unsere Werkstatt erst, wenn Passgenauigkeit, Oberflächenveredelung und Funktionalität höchsten meisterlichen Ansprüchen genügen.",
    }),
    defineField({
      name: "workshopGallery",
      title: "Slide-Galerie: Einblicke in Werkstatt & Betrieb",
      type: "array",
      description: "Laden Sie hier Bilder aus der Werkstatt, der Fertigung und dem Firmenalltag hoch.",
      of: [
        {
          type: "object",
          name: "slideImage",
          title: "Werkstatt-Bild",
          fields: [
            defineField({
              name: "image",
              title: "Foto",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Bildunterschrift / Bereich",
              type: "string",
              description: "z. B. 'Zuschnitt & Hobelmaschine' oder 'Endmontage Holz-Alu-Elemente'",
            }),
          ],
          preview: {
            select: {
              title: "caption",
              media: "image",
            },
          },
        },
      ],
    }),
  ],
});
