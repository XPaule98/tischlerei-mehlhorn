# Tischlerei Mehlhorn – Webanwendung & Sanity Studio

Monorepo für den Online-Auftritt der **Tischlerei Mehlhorn** (Gegründet 1977, Inh. Ronny Mehlhorn).

---

## 📁 Struktur

```
Mehlhorn/
├── studio/   # Standalone Sanity Studio (Vite, http://localhost:3333)
└── web/      # Next.js 16 App Router Website (http://localhost:3000)
```

---

## 🚀 Lokale Entwicklung

### 1. Webanwendung (Next.js Frontend)
```bash
cd web
npm install
npm run dev
```
👉 Website geöffnet unter: **http://localhost:3000**

### 2. Sanity Studio (CMS)
```bash
cd studio
npm install
npm run dev
```
👉 Studio geöffnet unter: **http://localhost:3333**

---

## 🌐 Live-Bereitstellung (Vercel & Sanity)

### 1. Frontend auf Vercel hosten (Kostenlos & optimal für Next.js)
1. Neues GitHub-Repository erstellen (z.B. `tischlerei-mehlhorn`).
2. Dieses Projekt auf GitHub pushen.
3. Auf [vercel.com](https://vercel.com) einloggen → **"Add New Project"** → Dein GitHub-Repository auswählen.
4. Als **Root Directory** den Ordner `web` angeben.
5. In Vercel unter **Environment Variables** folgende Werte hinterlegen:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: `z3grtien`
   - `NEXT_PUBLIC_SANITY_DATASET`: `production`
   - `SMTP_HOST`: `securesmtp.t-online.de`
   - `SMTP_PORT`: `587`
   - `SMTP_USER`: `deine@t-online.de`
   - `SMTP_PASS`: `dein-t-online-passwort`
   - `SMTP_FROM`: `deine@t-online.de`
   - `SMTP_TO`: `anfragen@tischlerei-mehlhorn.de`
6. Klick auf **"Deploy"** – Deine Live-URL ist in unter 1 Minute erreichbar (z.B. `https://tischlerei-mehlhorn.vercel.app`).

### 2. Sanity Studio hosten
```bash
cd studio
npx sanity deploy
```
👉 Das Studio wird unter `https://mehlhorn.sanity.studio` live geschaltet.
