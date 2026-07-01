import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const TARGET_URL = "https://sparschwein-entruempelung.de/";

interface PsiMetric {
  metric: "LCP" | "INP" | "CLS" | "FCP" | "TTFB";
  value: number;
}

async function fetchPsi(
  strategy: "mobile" | "desktop",
  apiKey: string | undefined
): Promise<PsiMetric[]> {
  const url = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  url.searchParams.set("url", TARGET_URL);
  url.searchParams.set("strategy", strategy);
  url.searchParams.append("category", "PERFORMANCE");
  if (apiKey) url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`PSI ${strategy} failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  const audits = data?.lighthouseResult?.audits ?? {};
  const metrics: PsiMetric[] = [];

  // Lab metrics from Lighthouse
  const lcp = audits["largest-contentful-paint"]?.numericValue;
  const cls = audits["cumulative-layout-shift"]?.numericValue;
  const fcp = audits["first-contentful-paint"]?.numericValue;
  const ttfb = audits["server-response-time"]?.numericValue;
  // INP is field-only in PSI (CrUX). Fallback: Total Blocking Time as proxy
  const tbt = audits["total-blocking-time"]?.numericValue;

  if (typeof lcp === "number") metrics.push({ metric: "LCP", value: lcp });
  if (typeof cls === "number") metrics.push({ metric: "CLS", value: cls });
  if (typeof fcp === "number") metrics.push({ metric: "FCP", value: fcp });
  if (typeof ttfb === "number") metrics.push({ metric: "TTFB", value: ttfb });
  if (typeof tbt === "number") metrics.push({ metric: "INP", value: tbt });

  // Try CrUX field data for real INP if available
  const cruxInp =
    data?.loadingExperience?.metrics?.INTERACTION_TO_NEXT_PAINT?.percentile;
  if (typeof cruxInp === "number") {
    const idx = metrics.findIndex((m) => m.metric === "INP");
    if (idx >= 0) metrics[idx].value = cruxInp;
    else metrics.push({ metric: "INP", value: cruxInp });
  }

  return metrics;
}

function rate(metric: string, value: number, good: number, poor: number): string {
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
  const psiKey = Deno.env.get("PAGESPEED_API_KEY");

  const results: Record<string, unknown> = {};
  const violations: Array<{
    metric: string;
    device: string;
    value: number;
    threshold: number;
  }> = [];

  // Load budgets
  const { data: budgets } = await supabase.from("performance_budgets").select("*");
  const budgetMap = new Map<string, any>();
  (budgets ?? []).forEach((b: any) => budgetMap.set(`${b.metric}-${b.device}`, b));

  for (const device of ["mobile", "desktop"] as const) {
    try {
      const metrics = await fetchPsi(device, psiKey);
      const rows = metrics.map((m) => {
        const budget = budgetMap.get(`${m.metric}-${device}`);
        const rating = budget
          ? rate(m.metric, m.value, budget.good_threshold, budget.poor_threshold)
          : null;

        if (
          budget &&
          budget.alert_enabled &&
          rating === "poor" &&
          ["LCP", "INP", "CLS"].includes(m.metric)
        ) {
          violations.push({
            metric: m.metric,
            device,
            value: m.value,
            threshold: budget.poor_threshold,
          });
        }

        return {
          source: "psi",
          device,
          route: "/",
          metric: m.metric,
          value: m.value,
          rating,
        };
      });

      if (rows.length > 0) {
        const { error } = await supabase.from("performance_metrics").insert(rows);
        if (error) console.error("PSI insert error", error);
      }
      results[device] = { ok: true, count: rows.length };
    } catch (e) {
      console.error(`PSI ${device} error`, e);
      results[device] = { ok: false, error: String(e) };
    }
  }

  // Log + trigger alert if violations
  if (violations.length > 0) {
    await supabase.from("performance_alerts").insert(
      violations.map((v) => ({
        metric: v.metric,
        device: v.device,
        value: v.value,
        threshold: v.threshold,
        source: "psi",
      }))
    );

    // Fire-and-forget alert email
    try {
      await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-performance-alert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
        },
        body: JSON.stringify({ violations }),
      });
    } catch (e) {
      console.error("alert trigger failed", e);
    }
  }

  return new Response(
    JSON.stringify({ ok: true, results, violations: violations.length }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
});
