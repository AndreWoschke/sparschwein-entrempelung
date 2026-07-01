import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";
const SITE = "sc-domain:sparschwein-entruempelung.de";

async function gscFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${GATEWAY}${path}`, {
    ...init,
    headers: {
      "Authorization": `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
      "X-Connection-Api-Key": Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY")!,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  const text = await res.text();
  let body: unknown;
  try { body = JSON.parse(text); } catch { body = text; }
  if (!res.ok) throw new Error(`GSC ${res.status}: ${typeof body === "string" ? body : JSON.stringify(body)}`);
  return body;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Nicht authentifiziert" }, 401);

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await createClient(
      supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!
    ).auth.getUser(token);
    if (authError || !user) return json({ error: "Nicht authentifiziert" }, 401);

    const admin = createClient(supabaseUrl, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data: roleData } = await admin
      .from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    if (!roleData) return json({ error: "Keine Admin-Berechtigung" }, 403);

    const { action, days = 28, url } = await req.json().catch(() => ({ action: "overview" }));
    const siteEnc = encodeURIComponent(SITE);
    const endDate = new Date().toISOString().slice(0, 10);
    const startDate = new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);

    if (action === "overview") {
      const [totals, queries, pages, sitemaps] = await Promise.all([
        gscFetch(`/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`, {
          method: "POST",
          body: JSON.stringify({ startDate, endDate, dimensions: [] }),
        }),
        gscFetch(`/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`, {
          method: "POST",
          body: JSON.stringify({ startDate, endDate, dimensions: ["query"], rowLimit: 25 }),
        }),
        gscFetch(`/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`, {
          method: "POST",
          body: JSON.stringify({ startDate, endDate, dimensions: ["page"], rowLimit: 25 }),
        }),
        gscFetch(`/webmasters/v3/sites/${siteEnc}/sitemaps`).catch(() => ({ sitemap: [] })),
      ]);
      return json({ totals, queries, pages, sitemaps, range: { startDate, endDate } });
    }

    if (action === "inspect" && url) {
      const result = await gscFetch(`/v1/urlInspection/index:inspect`, {
        method: "POST",
        body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE }),
      });
      return json(result);
    }

    if (action === "page-queries" && url) {
      const result = await gscFetch(`/webmasters/v3/sites/${siteEnc}/searchAnalytics/query`, {
        method: "POST",
        body: JSON.stringify({
          startDate, endDate,
          dimensions: ["query"],
          rowLimit: 25,
          dimensionFilterGroups: [{ filters: [{ dimension: "page", operator: "equals", expression: url }] }],
        }),
      });
      return json(result);
    }

    return json({ error: "Unbekannte Aktion" }, 400);

  } catch (e) {
    return json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
