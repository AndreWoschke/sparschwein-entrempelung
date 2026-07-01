import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ALLOWED_METRICS = new Set(["LCP", "INP", "CLS", "FCP", "TTFB"]);
const ALLOWED_DEVICES = new Set(["mobile", "desktop"]);

// naive in-memory rate limit (per warm instance)
const ipHits = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 120; // per minute per IP
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || entry.reset < now) {
    ipHits.set(ip, { count: 1, reset: now + 60_000 });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (rateLimited(ip)) {
    return new Response(JSON.stringify({ error: "rate_limited" }), {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { metric, value, rating, navigationType, device, route, userAgent } = payload ?? {};

  if (
    typeof metric !== "string" ||
    !ALLOWED_METRICS.has(metric) ||
    typeof value !== "number" ||
    !isFinite(value) ||
    value < 0 ||
    value > 1_000_000 ||
    typeof device !== "string" ||
    !ALLOWED_DEVICES.has(device) ||
    typeof route !== "string" ||
    route.length > 500
  ) {
    return new Response(JSON.stringify({ error: "invalid_payload" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // exclude /admin routes server-side too
  if (route.startsWith("/admin")) {
    return new Response(JSON.stringify({ ok: true, skipped: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { error } = await supabase.from("performance_metrics").insert({
    source: "rum",
    device,
    route: route.slice(0, 500),
    metric,
    value,
    rating: typeof rating === "string" ? rating : null,
    navigation_type: typeof navigationType === "string" ? navigationType.slice(0, 50) : null,
    user_agent: typeof userAgent === "string" ? userAgent.slice(0, 200) : null,
  });

  if (error) {
    console.error("insert error", error);
    return new Response(JSON.stringify({ error: "insert_failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
