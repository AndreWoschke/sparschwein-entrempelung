import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-cron-secret",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Domain-Property in der Search Console
const SITE = "sc-domain:sparschwein-entruempelung.de";
const GSC_BASE = "https://searchconsole.googleapis.com";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

// ---- base64url helpers ----
function b64url(data: ArrayBuffer | string): string {
  const bytes =
    typeof data === "string" ? new TextEncoder().encode(data) : new Uint8Array(data);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function pemToDer(pem: string): ArrayBuffer {
  const body = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const bin = atob(body);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return buf.buffer;
}

// ---- Google Service-Account: JWT-Bearer -> Access-Token (mit Instanz-Cache) ----
let cachedToken: { token: string; exp: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.exp > now + 60) return cachedToken.token;

  const raw = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON");
  if (!raw) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON ist nicht gesetzt");
  const sa = JSON.parse(raw);
  const clientEmail: string = sa.client_email;
  const privateKey: string = sa.private_key;
  if (!clientEmail || !privateKey) {
    throw new Error("Service-Account-JSON fehlt client_email oder private_key");
  }

  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: clientEmail,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };
  const unsigned = `${b64url(JSON.stringify(header))}.${b64url(JSON.stringify(claim))}`;

  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToDer(privateKey),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsigned),
  );
  const jwt = `${unsigned}.${b64url(sig)}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const tok = await res.json();
  if (!res.ok) {
    throw new Error(`Token-Austausch fehlgeschlagen: ${res.status} ${JSON.stringify(tok)}`);
  }
  cachedToken = { token: tok.access_token, exp: now + (tok.expires_in ?? 3600) };
  return cachedToken.token;
}

async function gsc(path: string, init?: RequestInit) {
  const token = await getAccessToken();
  const res = await fetch(`${GSC_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  const text = await res.text();
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  if (!res.ok) {
    throw new Error(
      `GSC ${res.status}: ${typeof body === "string" ? body : JSON.stringify(body)}`,
    );
  }
  // deno-lint-ignore no-explicit-any
  return body as any;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  // Zugriffsschutz: entweder x-cron-secret == CRON_SECRET, oder Service-Role-Bearer.
  // (Kein User-Login mehr, seit der Admin-Bereich entfernt wurde.)
  const cronSecret = Deno.env.get("CRON_SECRET");
  const providedSecret = req.headers.get("x-cron-secret");
  const bearer = req.headers.get("Authorization")?.replace("Bearer ", "");
  const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const authorized =
    (!!cronSecret && providedSecret === cronSecret) ||
    (!!serviceRole && !!bearer && bearer === serviceRole);
  if (!authorized) return json({ error: "Nicht autorisiert" }, 401);

  try {
    const { action = "overview", days = 28, url, persist = true } = await req
      .json()
      .catch(() => ({ action: "overview" }));

    const siteEnc = encodeURIComponent(SITE);
    const endDate = new Date().toISOString().slice(0, 10);
    const startDate = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);

    if (action === "overview") {
      const [totals, queries, pages, sitemaps] = await Promise.all([
        gsc(`/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`, {
          method: "POST",
          body: JSON.stringify({ startDate, endDate, dimensions: [] }),
        }),
        gsc(`/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`, {
          method: "POST",
          body: JSON.stringify({ startDate, endDate, dimensions: ["query"], rowLimit: 25 }),
        }),
        gsc(`/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`, {
          method: "POST",
          body: JSON.stringify({ startDate, endDate, dimensions: ["page"], rowLimit: 25 }),
        }),
        gsc(`/webmasters/v3/sites/${siteEnc}/sitemaps`).catch(() => ({ sitemap: [] })),
      ]);

      const agg = totals?.rows?.[0] ?? {};
      const snapshot = {
        start_date: startDate,
        end_date: endDate,
        clicks: Math.round(agg.clicks ?? 0),
        impressions: Math.round(agg.impressions ?? 0),
        ctr: agg.ctr ?? 0,
        position: agg.position ?? 0,
        top_queries: queries?.rows ?? [],
        top_pages: pages?.rows ?? [],
      };

      if (persist) {
        const supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
        );
        const { error } = await supabase.from("gsc_snapshots").insert(snapshot);
        if (error) console.error("gsc_snapshots insert error", error);
      }

      return json({ ok: true, snapshot, sitemaps, range: { startDate, endDate } });
    }

    if (action === "inspect" && url) {
      const result = await gsc(`/v1/urlInspection/index:inspect`, {
        method: "POST",
        body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE }),
      });
      return json(result);
    }

    if (action === "page-queries" && url) {
      const result = await gsc(`/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`, {
        method: "POST",
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: ["query"],
          rowLimit: 25,
          dimensionFilterGroups: [
            { filters: [{ dimension: "page", operator: "equals", expression: url }] },
          ],
        }),
      });
      return json(result);
    }

    return json({ error: "Unbekannte Aktion" }, 400);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});
