import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Tischlerei Mehlhorn CMS")
    .items([
      // 1. Startseite
      S.listItem()
        .title("Startseite")
        .child(
          S.list()
            .title("Startseite verwalten")
            .items([
              S.listItem()
                .title("Hero-Bereich & Slideshow")
                .child(
                  S.document()
                    .schemaType("heroSettings")
                    .documentId("heroSettings")
                    .title("Hero-Bereich Startseite")
                ),
              S.listItem()
                .title("Inhalte & Vorschau (Über uns, 3 Zahlen, Leistungen, Shop)")
                .child(
                  S.document()
                    .schemaType("homeSections")
                    .documentId("homeSections")
                    .title("Startseite Inhalte & Vorschau-Abschnitte")
                ),
              S.listItem()
                .title("Fullwidth Video-Sektion")
                .child(
                  S.document()
                    .schemaType("showcaseVideo")
                    .documentId("showcaseVideo")
                    .title("Fullwidth Video-Sektion")
                ),
            ])
        ),

      // 2. Leistungen
      S.listItem()
        .title("Leistungen")
        .child(
          S.list()
            .title("Leistungen verwalten")
            .items([
              S.listItem()
                .title("Seiten-Kopfbereich (Titel & Bild)")
                .child(
                  S.document()
                    .schemaType("servicesPage")
                    .documentId("servicesPage")
                    .title("Leistungen Kopfbereich")
                ),
              S.documentTypeListItem("serviceItem").title("Gewerke-Liste"),
            ])
        ),

      // 3. Über uns & Team
      S.listItem()
        .title("Über uns & Team")
        .child(
          S.list()
            .title("Über uns verwalten")
            .items([
              S.listItem()
                .title("Über uns (Texte & Werkstatt-Galerie)")
                .child(
                  S.document()
                    .schemaType("aboutPage")
                    .documentId("aboutPage")
                    .title("Über uns Seite")
                ),
              S.documentTypeListItem("teamMember").title("Mitarbeiter & Team"),
            ])
        ),

      // 4. Galerie
      S.listItem()
        .title("Galerie & Referenzen")
        .child(
          S.list()
            .title("Galerie verwalten")
            .items([
              S.listItem()
                .title("Seiten-Kopfbereich (Titel & Bild/Video)")
                .child(
                  S.document()
                    .schemaType("galleryPage")
                    .documentId("galleryPage")
                    .title("Galerie Kopfbereich")
                ),
              S.documentTypeListItem("portfolioProject").title("Referenz-Projekte"),
            ])
        ),

      // 5. Shop & Deko
      S.listItem()
        .title("Shop & Deko")
        .child(
          S.list()
            .title("Shop verwalten")
            .items([
              S.listItem()
                .title("Seiten-Kopfbereich (Titel & Bild)")
                .child(
                  S.document()
                    .schemaType("shopPage")
                    .documentId("shopPage")
                    .title("Shop Kopfbereich")
                ),
              S.documentTypeListItem("productCategory").title("Kategorien (Filter verwalten)"),
              S.documentTypeListItem("catalogProduct").title("Werkstücke & Produkte"),
            ])
        ),

      // 6. Kontakt & Firmendaten
      S.listItem()
        .title("Kontaktseite & Firmendaten")
        .child(
          S.list()
            .title("Kontakt verwalten")
            .items([
              S.listItem()
                .title("Seiten-Kopfbereich (Titel & Bild)")
                .child(
                  S.document()
                    .schemaType("contactPage")
                    .documentId("contactPage")
                    .title("Kontakt Kopfbereich")
                ),
              S.listItem()
                .title("Firmendaten, Telefon & Zeiten")
                .child(
                  S.document()
                    .schemaType("companyInfo")
                    .documentId("companyInfo")
                    .title("Firmendaten")
                ),
            ])
        ),
    ]);
