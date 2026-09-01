import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Tischlerei Mehlhorn CMS")
    .items([
      // 1. Startseite
      S.listItem()
        .title("🖼️ Startseite (Hero-Slides & Intro)")
        .child(
          S.document()
            .schemaType("heroSettings")
            .documentId("heroSettings")
            .title("Hero-Bereich Startseite")
        ),

      // 2. Leistungen
      S.listItem()
        .title("🪵 Leistungen (Kopfbereich & Gewerke)")
        .child(
          S.list()
            .title("Leistungen verwalten")
            .items([
              S.listItem()
                .title("📄 Seiten-Kopfbereich (Titel & Bild)")
                .child(
                  S.document()
                    .schemaType("servicesPage")
                    .documentId("servicesPage")
                    .title("Leistungen Kopfbereich")
                ),
              S.documentTypeListItem("serviceItem").title("🛠️ Gewerke-Liste"),
            ])
        ),

      // 3. Über uns
      S.listItem()
        .title("📖 Über uns & Historie")
        .child(
          S.document()
            .schemaType("aboutPage")
            .documentId("aboutPage")
            .title("Über uns Seite")
        ),

      // 4. Galerie
      S.listItem()
        .title("📸 Galerie & Referenzen")
        .child(
          S.list()
            .title("Galerie verwalten")
            .items([
              S.listItem()
                .title("📄 Seiten-Kopfbereich (Titel & Bild)")
                .child(
                  S.document()
                    .schemaType("galleryPage")
                    .documentId("galleryPage")
                    .title("Galerie Kopfbereich")
                ),
              S.documentTypeListItem("portfolioProject").title("🖼️ Referenz-Projekte"),
            ])
        ),

      // 5. Shop & Deko
      S.listItem()
        .title("🛍️ Shop & Deko")
        .child(
          S.list()
            .title("Shop verwalten")
            .items([
              S.listItem()
                .title("📄 Seiten-Kopfbereich (Titel & Bild)")
                .child(
                  S.document()
                    .schemaType("shopPage")
                    .documentId("shopPage")
                    .title("Shop Kopfbereich")
                ),
              S.documentTypeListItem("catalogProduct").title("🪵 Werkstücke & Produkte"),
            ])
        ),

      // 6. Kontakt & Firmendaten
      S.listItem()
        .title("✉️ Kontaktseite & Firmendaten")
        .child(
          S.list()
            .title("Kontakt verwalten")
            .items([
              S.listItem()
                .title("📄 Seiten-Kopfbereich (Titel & Bild)")
                .child(
                  S.document()
                    .schemaType("contactPage")
                    .documentId("contactPage")
                    .title("Kontakt Kopfbereich")
                ),
              S.listItem()
                .title("🏢 Firmendaten, Telefon & Zeiten")
                .child(
                  S.document()
                    .schemaType("companyInfo")
                    .documentId("companyInfo")
                    .title("Firmendaten")
                ),
            ])
        ),
    ]);
