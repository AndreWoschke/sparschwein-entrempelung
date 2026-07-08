# Projekt: Sparschwein Entrümpelung — Kunden- & Technikkontext

Gilt zusätzlich zu den globalen SEO-Regeln in `~/.claude/CLAUDE.md`.
Datenquelle: `src/lib/seo.ts` (`COMPANY_INFO`, `REGIONS`, `SERVICES`) + JSON-LD im Head.
Bei Änderungen: `seo.ts` UND diese Datei gleich halten.

> Server-, Cloudflare- und Deploy-Details (IP, SSH, Zone-ID, Webroot) stehen in
> `CLAUDE.local.md` — die ist per `.gitignore` vom Repo ausgeschlossen und gehört NICHT auf GitHub.

## Firmendaten (NAP — exakt wie im Google Business Profile!)
- **Firmenname:** Sparschwein Entrümpelung
- **Inhaber:** Stefan Wagner und Andre Woschke (Familienunternehmen, seit 2015)
- **Adresse:** Karl-Marx-Straße 9, 14656 Brieselang (Brandenburg)
- **Telefon:** 01579 2639408  (Link: +4915792639408 / formatiert: +49 1579 2639408)
- **E-Mail:** info@sparschwein-entruempelung.de
- **Öffnungszeiten:** Mo–Fr 08:00–18:00 Uhr (Sa/So geschlossen)
- **Website:** https://sparschwein-entruempelung.de  (Schreibweise mit „ue"!)
- **Geo:** 52.5833, 13.0116

## Einzugsgebiet (18 Standortseiten `/entruempelung-<ort>`)
Brieselang (HQ), Falkensee, Dallgow-Döberitz, Nauen, Wustermark, Staaken, Rathenow,
Premnitz, Friesack, Schönwalde-Glien, Ketzin/Havel, Paulinenaue, Hennigsdorf, Velten,
Oranienburg, Werder (Havel), Potsdam — plus Übersichtsseite „Landkreis Havelland".
Kerngebiet: **Havelland**.

## Leistungen (8 Serviceseiten, Titel wörtlich)
- Wohnungsentrümpelung — `/wohnungsentruempelung`
- Hausentrümpelung — `/hausentruempelung`
- Kellerentrümpelung — `/kellerentruempelung`
- Dachbodenentrümpelung — `/dachbodenentruempelung`
- Haushaltsauflösung — `/haushaltsaufloesung`
- Firmen- & Gewerbeentrümpelung — `/firmen-gewerbeentruempelung`
- Schrottabholung — `/schrottabholung`
- Containerdienst Brieselang & Havelland — `/containerdienst-brieselang`

## USPs / Trust
- Seit 2015, **500+** erfolgreiche Entrümpelungen
- **Keine Vermittlung** — eigene Mitarbeiter, eigene Fahrzeuge (2–3 täglich)
- **Festpreisgarantie** nach kostenloser Besichtigung, keine Nachzahlung
- **Besenreine Übergabe** garantiert, versichert
- **5,0 ★** Google (36 Bewertungen), Ø **30 Min.** Rückrufzeit

## Technischer Kontext
- **Stack:** Astro (output static), öffentliche Seiten als `.astro` mit nativem SEO-Head +
  JSON-LD; interaktive Teile als React-Islands unter `src/react-app/`. Admin-Bereich entfernt.
- **Hosting:** eigener VPS (nginx) hinter Cloudflare (SSL Full strict, Let's Encrypt seit
  2026-07-01). Konkrete Zugangs-/Deploy-Details → `CLAUDE.local.md` (nicht im Git).
- **Deploy:** kein CI. Lokaler `npm run build` → `dist/` wird per atomarem Swap (mit Backup)
  auf den VPS gespiegelt. Genaue Befehle/Ziele → `CLAUDE.local.md`.
- **Repo:** github.com/AndreWoschke/sparschwein-entrempelung (Repo-/Ordnername trägt noch den
  Tippfehler „entrempelung" ohne „u" — der Live-Content ist überall korrekt „entruempelung").
- **Bild-Import-Falle:** Bild-Imports in `src/react-app` IMMER mit Vite-Suffix **`?url`**
  (`import x from "@/assets/y.webp?url"`), sonst liefert Astro ein ImageMetadata-Objekt statt
  String-URL → `src="[object Object]"` → 404.

## Branch-Situation
- Aktiver Branch: **`astro-migration`** (letzter Commit `742b612` = Title/H1-SEO-Fix).
- `astro-migration` ist **vor `main`** (SEO-Fix + Bild-Fix noch nicht gemergt).
- Deploy ist davon unabhängig (manuell aus `dist/`). Offen: gelegentlich nach `main` mergen.

## SEO-Status (Semrush, Stand 2026-07-08)
- Authority Score **12**, ~**12** organische Besucher/Mon., **4** rankende Keywords.
- Ranking-Highlight: **#1 für „entrümpelungen falkensee"** → Modell funktioniert, nur jung.
- Technik/On-Page bereits stark (Schema vollständig, Meta/Sitemap/Mobile top).
- Flaschenhals = **Domain-Alter + wenige Backlinks** (17 verweisende Domains, v.a. Branchenbücher).

## Offene SEO-To-dos (nach Priorität)
1. **Backlinks aufbauen** (macht André selbst) — lokale/regionale Links, mehr als Branchenbücher.
2. **Google Search Console + Sitemap** einreichen/prüfen (Indexierung beschleunigen).
3. **Echte lokale Details** je Standortseite ergänzen (siehe unten) — gegen City-Swap.
4. **Ratgeber-Artikel** für Info-Keywords („Was kostet eine Entrümpelung?", „Ablauf",
   „Messiewohnung räumen") — stützt die Money-Seiten intern.
5. **Echte Bilder** (Vorher/Nachher, Team, Fahrzeuge) mit Alt-Texten „…[Ort]".
6. `astro-migration` → `main` mergen (Housekeeping).
7. Optional: Cloudflare **KI-Bot-Sperre** lockern (GPTBot/Google-Extended) für Sichtbarkeit
   in ChatGPT/Perplexity/AI-Overviews.
8. Spam-Anchor-Backlink („sitetosocial…") beobachten, bei Zuwachs disavowen.

## Echte lokale Details (für Standortseiten — KEIN City-Swap!)
> NOCH ZU FÜLLEN von André: echte, ortsspezifische Fakten je Stadt (Stadtteile, typische
> Altbau-/Plattenbau-Viertel, Halteverbotszonen-Regelung der Kommune, Recyclinghöfe,
> Anfahrt-Besonderheiten). Bis diese vorliegen: KEINE erfundenen Lokaldetails generieren.

## Ton & Stil
Seriös, familiär, vertrauenswürdig — Sie-Ansprache. Persönlicher Service eines Familienbetriebs,
kein Konzern-Sprech. Festpreis/„ab 99 €" früh nennen (Vertrauens- & CTR-Hebel).
