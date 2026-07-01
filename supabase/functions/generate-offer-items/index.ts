import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const SYSTEM_PROMPT = `Du bist Kalkulator für ein deutsches Entrümpelungsunternehmen ("Sparschwein Entrümpelung").
Aus einer kurzen Beschreibung des Auftrags und einem optional vorgegebenen Gesamtpreis (netto) erstellst du eine plausible Liste von Angebotspositionen.

Antworte AUSSCHLIESSLICH mit JSON nach diesem Schema, ohne Markdown, ohne Erklärung:
{
  "items": [
    {
      "description": string,           // klare Bezeichnung der Leistung
      "quantity": number,              // Menge (Standard 1)
      "unit": "pauschal" | "m³" | "Stück" | "Stunde",
      "unitPrice": number,             // Einzelpreis NETTO in Euro
      "note": string                   // kurze Bemerkung, optional ""
    }
  ],
  "notes": string,                      // interne Notiz/Anmerkungen für den Kunden, z. B. "Zugang über Hintereingang", leer wenn nichts Besonderes
  "estimatedDuration": string           // realistische Dauer-Schätzung, z. B. "ca. 3-4 Stunden", "ca. 1 Tag", "ca. 2 Tage"
}

Regeln:
- Nutze typische Leistungsnamen: "Wohnungsentrümpelung", "Hausentrümpelung", "Kellerentrümpelung", "Dachbodenentrümpelung", "Haushaltsauflösung", "Gewerbeentrümpelung", "Garagenentrümpelung", "Gartenräumung", "Demontage Küche", "Demontage Möbel", "Besenreine Übergabe", "Sperrmüllentsorgung", "Elektrogeräte-Entsorgung", "Sondermüllentsorgung", "Trageweg-Zuschlag (ab 3. OG ohne Aufzug)", "Anfahrtspauschale".
- Wenn ein Gesamtpreis (netto) vorgegeben ist: Die Summe (quantity × unitPrice) ALLER Positionen MUSS exakt diesem Preis entsprechen. Verteile sinnvoll (Hauptleistung als großer Pauschalposten, Zusatzleistungen als kleinere Posten).
- Ohne Gesamtpreis: Schätze marktübliche Preise (z. B. 1-Zi 600-900 €, 2-Zi 900-1500 €, 3-Zi 1500-2500 €, 4-Zi+ 2500-4500 €). Trageweg-Zuschlag ab 3. OG ohne Aufzug ca. 50-150 €.
- Erkenne aus dem Text: Objekttyp (Wohnung/Haus/Keller/Gewerbe), Größe (Zimmeranzahl/m²), Etage/Aufzug, Demontage, besenrein, Sondermüll, Schrott. Erfinde keine Zusatzleistungen, die nicht erwähnt wurden.
- Pauschal-Posten verwenden quantity=1 und unit="pauschal". Volumenbezogenes ("Sperrmüll") in m³. Elektrogeräte in Stück.
- "description" ist eine kurze, professionelle Bezeichnung – KEIN Marketing.
- "estimatedDuration": Schätze realistisch nach Umfang. Faustregel: 1-Zi ca. 2-3 Std, 2-Zi ca. 3-5 Std, 3-Zi ca. 5-7 Std / halber Tag, 4-Zi+ / EFH ca. 1-2 Tage, Keller/Garage ca. 2-4 Std. Mit Demontage/Sondermüll entsprechend mehr.
- "notes": Falls aus der Beschreibung organisatorische Hinweise hervorgehen (Zugang, Schlüssel, Etage, Parkmöglichkeit, Tiere, Termin-Wünsche), kurz festhalten. Sonst leer lassen.
- Mindestens 1, maximal 8 Positionen.`;


Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Missing LOVABLE_API_KEY' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const description: string = String(body?.description ?? '').slice(0, 2000).trim();
    const totalPrice: number | null = Number.isFinite(Number(body?.totalPrice)) && Number(body?.totalPrice) > 0
      ? Number(body.totalPrice) : null;

    if (!description) {
      return new Response(JSON.stringify({ error: 'Bitte eine Beschreibung angeben.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const userPrompt = `Beschreibung des Auftrags:
"""
${description}
"""

${totalPrice ? `Vorgegebener Gesamtpreis (netto): ${totalPrice.toFixed(2)} €. Die Summe aller Positionen muss EXAKT diesem Betrag entsprechen.` : 'Kein Gesamtpreis vorgegeben – bitte marktüblich schätzen.'}

Gib die Angebotspositionen als JSON zurück.`;

    const aiRes = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!aiRes.ok) {
      const text = await aiRes.text();
      if (aiRes.status === 429) {
        return new Response(JSON.stringify({ error: 'Zu viele Anfragen. Bitte kurz warten.' }), {
          status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (aiRes.status === 402) {
        return new Response(JSON.stringify({ error: 'KI-Guthaben aufgebraucht.' }), {
          status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      return new Response(JSON.stringify({ error: `KI-Fehler: ${text.slice(0, 200)}` }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await aiRes.json();
    const raw = data?.choices?.[0]?.message?.content ?? '{}';
    let parsed: any = {};
    try {
      parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch {
      const m = String(raw).match(/\{[\s\S]*\}/);
      if (m) parsed = JSON.parse(m[0]);
    }

    const allowedUnits = ['pauschal', 'm³', 'Stück', 'Stunde'];
    const rawItems: any[] = Array.isArray(parsed?.items) ? parsed.items : [];

    let items = rawItems.slice(0, 8).map((it) => {
      const qty = Number(it?.quantity);
      const price = Number(it?.unitPrice);
      const unit = allowedUnits.includes(it?.unit) ? it.unit : 'pauschal';
      return {
        description: String(it?.description ?? '').trim().slice(0, 200),
        quantity: Number.isFinite(qty) && qty > 0 ? qty : 1,
        unit,
        unitPrice: Number.isFinite(price) && price >= 0 ? Math.round(price * 100) / 100 : 0,
        note: String(it?.note ?? '').trim().slice(0, 300),
      };
    }).filter((i) => i.description);

    // Sicherheits-Korrektur: wenn Gesamtpreis vorgegeben, Summe exakt anpassen
    if (totalPrice && items.length > 0) {
      const sum = items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
      const diff = totalPrice - sum;
      if (Math.abs(diff) > 0.01) {
        // Differenz auf größte Pauschal-Position aufschlagen
        const idx = items.reduce((best, it, i, arr) => {
          const v = it.quantity * it.unitPrice;
          const bv = arr[best].quantity * arr[best].unitPrice;
          return v > bv ? i : best;
        }, 0);
        const it = items[idx];
        const newTotal = it.quantity * it.unitPrice + diff;
        items[idx] = { ...it, unitPrice: Math.round((newTotal / it.quantity) * 100) / 100 };
      }
    }

    return new Response(JSON.stringify({
      items,
      notes: String(parsed?.notes ?? '').trim().slice(0, 500),
      estimatedDuration: String(parsed?.estimatedDuration ?? '').trim().slice(0, 100),
    }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unbekannter Fehler' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
