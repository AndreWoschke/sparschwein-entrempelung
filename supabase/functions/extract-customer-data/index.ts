import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const SYSTEM_PROMPT = `Du bist ein präziser Datenextraktor für ein deutsches Entrümpelungsunternehmen.
Aus den hochgeladenen Bildern (Personalausweis, Briefkopf, Visitenkarte, Notizzettel, WhatsApp-Screenshot, etc.) extrahierst du Kontaktdaten eines Kunden.

Antworte AUSSCHLIESSLICH mit einem JSON-Objekt nach folgendem Schema, ohne Markdown, ohne Erklärung:
{
  "salutation": "Herr" | "Frau" | "Firma" | "",
  "firstName": string,
  "lastName": string,
  "street": string,
  "postalCode": string,
  "city": string,
  "phone": string,
  "email": string
}

Regeln:
- Bei Firmen: "salutation" = "Firma", "lastName" = Firmenname, "firstName" leer lassen.
- "street" enthält Straße + Hausnummer in einem Feld.
- "postalCode" = 5-stellige deutsche PLZ.
- TELEFON: Erkenne JEDE Ziffernfolge, die wie eine deutsche Telefonnummer aussieht, auch ohne Beschriftung ("Tel", "☎", "📞"). Typische Muster:
  * Mobil: beginnt mit 015x/016x/017x (10-12 Ziffern), z. B. "0157 92639408", "01579 2639408", "+49 157 92639408"
  * Festnetz: beginnt mit 0 + Vorwahl (3-5 Stellen) + Rufnummer, z. B. "030 12345678", "03322 123456"
  * Auch wenn Leerzeichen, Bindestriche, Schrägstriche oder Klammern enthalten sind – übernehmen und normalisieren.
  * Ziffernfolgen oben links/rechts auf Notizen, Visitenkarten oder Screenshots sind fast immer Telefonnummern.
  * Im Ausgabefeld als deutsches Format mit Vorwahl normalisieren (z. B. "01579 2639408" oder "+49 30 12345678").
- Wenn ein Feld nicht erkennbar ist, leeren String "" verwenden – niemals erfinden.
- Werden mehrere Personen erkannt, nimm die plausibelste (Kunde, nicht Absender / nicht eigene Firma).
- Wenn ein Feld nicht erkennbar ist, leeren String "" verwenden – niemals erfinden.
- Werden mehrere Personen erkannt, nimm die plausibelste (Kunde, nicht Absender / nicht eigene Firma).`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Missing LOVABLE_API_KEY' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const images: string[] = Array.isArray(body?.images) ? body.images : [];

    if (images.length === 0) {
      return new Response(JSON.stringify({ error: 'Keine Bilder übergeben' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (images.length > 10) {
      return new Response(JSON.stringify({ error: 'Maximal 10 Bilder' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userContent: any[] = [
      { type: 'text', text: 'Extrahiere die Kundendaten aus diesen Bildern und gib NUR das JSON-Objekt zurück.' },
      ...images.map((url) => ({ type: 'image_url', image_url: { url } })),
    ];

    const aiRes = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userContent },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!aiRes.ok) {
      const text = await aiRes.text();
      if (aiRes.status === 429) {
        return new Response(JSON.stringify({ error: 'Zu viele Anfragen. Bitte kurz warten und erneut versuchen.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (aiRes.status === 402) {
        return new Response(JSON.stringify({ error: 'KI-Guthaben aufgebraucht. Bitte im Lovable Workspace nachladen.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ error: `KI-Fehler: ${text.slice(0, 200)}` }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await aiRes.json();
    const raw = data?.choices?.[0]?.message?.content ?? '{}';
    let parsed: Record<string, string> = {};
    try {
      parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch {
      const m = String(raw).match(/\{[\s\S]*\}/);
      if (m) parsed = JSON.parse(m[0]);
    }

    const result = {
      salutation: ['Herr', 'Frau', 'Firma'].includes(parsed.salutation) ? parsed.salutation : '',
      firstName: String(parsed.firstName ?? '').trim(),
      lastName: String(parsed.lastName ?? '').trim(),
      street: String(parsed.street ?? '').trim(),
      postalCode: String(parsed.postalCode ?? '').trim(),
      city: String(parsed.city ?? '').trim(),
      phone: String(parsed.phone ?? '').trim(),
      email: String(parsed.email ?? '').trim(),
    };

    // Zweiter KI-Schritt: fehlende Felder (insb. PLZ/Ort) ergänzen, wenn genug Kontext da ist
    const needsEnrichment =
      (!result.postalCode && (result.street || result.city)) ||
      (!result.city && result.postalCode) ||
      (!result.salutation && (result.firstName || result.lastName));

    if (needsEnrichment) {
      try {
        const enrichPrompt = `Du ergänzt fehlende deutsche Adress- und Anredendaten auf Basis deines Wissens über deutsche Postleitzahlen, Städte und Vornamen.

Bekannte Daten:
${JSON.stringify(result, null, 2)}

Aufgaben:
- Falls "postalCode" leer ist und Straße + Ort plausibel zu einer einzigen PLZ führen, ergänze die korrekte 5-stellige PLZ. Sonst leer lassen.
- Falls "city" leer ist und die PLZ eindeutig zu einem Ort gehört, ergänze den Ort.
- Falls "salutation" leer ist und der Vorname eindeutig männlich/weiblich ist, setze "Herr" oder "Frau". Sonst leer lassen.
- Erfinde NIEMALS Daten. Im Zweifel leer lassen.

Antworte ausschließlich mit JSON im selben Schema (alle Felder), Werte unverändert übernehmen, nur die fehlenden ergänzen.`;

        const enrichRes = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              { role: 'system', content: 'Du bist ein präziser deutscher Adress- und Namensexperte. Antworte nur mit JSON.' },
              { role: 'user', content: enrichPrompt },
            ],
            response_format: { type: 'json_object' },
          }),
        });

        if (enrichRes.ok) {
          const enrichData = await enrichRes.json();
          const enrichRaw = enrichData?.choices?.[0]?.message?.content ?? '{}';
          let enriched: Record<string, string> = {};
          try {
            enriched = typeof enrichRaw === 'string' ? JSON.parse(enrichRaw) : enrichRaw;
          } catch {
            const m = String(enrichRaw).match(/\{[\s\S]*\}/);
            if (m) enriched = JSON.parse(m[0]);
          }

          // Nur leere Felder überschreiben
          for (const k of Object.keys(result) as (keyof typeof result)[]) {
            if (!result[k] && typeof enriched[k] === 'string' && enriched[k].trim()) {
              const val = enriched[k].trim();
              if (k === 'salutation' && !['Herr', 'Frau', 'Firma'].includes(val)) continue;
              if (k === 'postalCode' && !/^\d{5}$/.test(val)) continue;
              result[k] = val;
            }
          }
        }
      } catch (_) {
        // Enrichment ist optional – Fehler ignorieren
      }
    }

    return new Response(JSON.stringify({ customer: result }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unbekannter Fehler' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
