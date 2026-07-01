# Performance-Monitoring mit Core Web Vitals

Automatisches Tracking von LCP, INP und CLS – kombiniert aus echten Besucherdaten (RUM) und täglichen PageSpeed-Insights-Messungen für Mobile & Desktop, mit Budget-Alerts per E-Mail und einem Admin-Dashboard.

## Was entsteht

**1. Datenbank** (2 neue Tabellen)
- `performance_metrics` – speichert RUM-Events (LCP/INP/CLS/FCP/TTFB) und synthetische PSI-Messungen
- `performance_budgets` – konfigurierbare Schwellwerte je Metrik & Device (mit Defaults: LCP 2500ms, INP 200ms, CLS 0.1)

**2. Edge Functions**
- `ingest-web-vitals` (öffentlich) – nimmt Beacons aus dem Browser entgegen, validiert, schreibt in DB. Admin-Routen werden ausgeschlossen.
- `run-psi-scan` (geplant, täglich 06:00) – ruft PageSpeed Insights für Mobile + Desktop ab, speichert Werte, prüft Budget-Verstöße und triggert Alert
- `send-performance-alert` – sendet zusammengefasste E-Mail an `info@sparschwein-entruempelung.de` bei Verstößen

**3. Frontend**
- `web-vitals` Library wird in `src/main.tsx` initialisiert, sendet Werte per `navigator.sendBeacon` an `ingest-web-vitals`
- Tracking nur auf öffentlichen Routen (nicht `/admin/*`)
- Session-bezogene Deduplizierung (max. 1 Event pro Metrik & Pageview)

**4. Admin-Dashboard** unter `/admin/performance`
- KPI-Karten: aktuelle p75-Werte für LCP/INP/CLS, getrennt nach Mobile & Desktop
- 30-Tage-Verlaufsgraph (RUM vs. PSI)
- Tabelle der letzten Budget-Verstöße mit Ampel-Status
- Editierbare Budget-Schwellwerte
- Link in Admin-Sidebar

## Voraussetzungen & offene Punkte

**PageSpeed Insights API-Key** (empfohlen, sonst nur ~25 Calls/Tag aus dem Lovable-IP-Pool, was bei 2 Calls täglich aber reicht):
- Ohne Key starten – funktioniert für tägliche Messungen
- Bei Bedarf später `PAGESPEED_API_KEY` als Secret hinzufügen

**E-Mail-Versand**: Dein Projekt hat aktuell kein Resend/Brevo/Lovable-Email-Domain verbunden. Drei Optionen:
1. **Lovable Emails einrichten** (empfohlen, kein externer Account) – braucht kurze Domain-Verifikation
2. **Resend-Connector** verbinden
3. **Erstmal nur Dashboard** – Alerts werden im Dashboard mit rotem Badge markiert, E-Mail kommt später dazu

Ich frage dich nach der Plan-Bestätigung, welchen Weg du nimmst – und baue solange alles andere fertig, damit der E-Mail-Teil nur noch angehängt werden muss.

## Schwellwerte (Google-Empfehlung, editierbar)

| Metrik | Gut | Verbesserungsbedürftig | Schlecht |
|---|---|---|---|
| LCP | ≤ 2,5 s | ≤ 4 s | > 4 s |
| INP | ≤ 200 ms | ≤ 500 ms | > 500 ms |
| CLS | ≤ 0,1 | ≤ 0,25 | > 0,25 |

Alert feuert ab Status „schlecht" auf p75 der letzten 24 h.

## Technische Details

- DB-Tabellen mit RLS: nur `admin`-Rolle liest, Edge Functions schreiben via `service_role`
- `ingest-web-vitals` mit `verify_jwt = false`, Rate-Limit per IP (in-memory, 60 req/min)
- Cron-Job via `pg_cron` + `pg_net` ruft `run-psi-scan` täglich
- web-vitals Library v4 (~2 KB gzipped), via dynamic import nur auf Public-Routes geladen → kein Impact auf LCP
- Aggregation der p75-Werte im Dashboard via SQL (kein Client-seitiges Crunching)

## Was bewusst NICHT gebaut wird

- Kein Session-Replay (DSGVO-Aufwand zu hoch)
- Keine User-ID-Verknüpfung (anonyme Metriken reichen für CWV)
- Kein Histogramm-Speicher (Roh-Events reichen für p75)

---

**Bestätigst du den Plan?** Sag „los" und ich baue Schritt 1-4 in einem Rutsch. Beim Email-Teil unterbreche ich kurz für deine Wahl.