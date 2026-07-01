import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

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
    const audioBase64: string = String(body?.audio ?? '');
    const mimeType: string = String(body?.mimeType ?? 'audio/webm');

    if (!audioBase64) {
      return new Response(JSON.stringify({ error: 'Keine Audio-Daten' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // base64 -> bytes
    const binary = atob(audioBase64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

    if (bytes.length < 1024) {
      return new Response(JSON.stringify({ error: 'Aufnahme ist zu kurz – bitte nochmal aufnehmen.' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (bytes.length > 24 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: 'Aufnahme zu groß (max. 24 MB).' }), {
        status: 413, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const extMap: Record<string, string> = {
      'audio/webm': 'webm', 'audio/mp4': 'mp4', 'audio/mpeg': 'mp3', 'audio/wav': 'wav', 'audio/ogg': 'ogg',
    };
    const ext = extMap[mimeType.split(';')[0]] ?? 'webm';

    const form = new FormData();
    form.append('model', 'openai/gpt-4o-mini-transcribe');
    form.append('file', new Blob([bytes], { type: mimeType }), `recording.${ext}`);
    form.append('language', 'de');

    const aiRes = await fetch('https://ai.gateway.lovable.dev/v1/audio/transcriptions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}` },
      body: form,
    });

    if (!aiRes.ok) {
      const text = await aiRes.text();
      const status = aiRes.status === 429 || aiRes.status === 402 ? aiRes.status : 500;
      return new Response(JSON.stringify({ error: `Transkription fehlgeschlagen: ${text.slice(0, 200)}` }), {
        status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await aiRes.json();
    return new Response(JSON.stringify({ text: data?.text ?? '' }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unbekannter Fehler' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
