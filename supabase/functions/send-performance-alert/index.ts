import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Violation {
  metric: string;
  device: string;
  value: number;
  threshold: number;
}

function formatValue(metric: string, value: number): string {
  if (metric === "CLS") return value.toFixed(3);
  return `${Math.round(value)} ms`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  let payload: { violations?: Violation[] };
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid_json" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const violations = payload.violations ?? [];
  if (violations.length === 0) {
    return new Response(JSON.stringify({ ok: true, skipped: "no violations" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const resendKey = Deno.env.get("RESEND_API_KEY");
  const brevoKey = Deno.env.get("BREVO_API_KEY");
  const lovableKey = Deno.env.get("LOVABLE_API_KEY");

  const rows = violations
    .map(
      (v) =>
        `<tr><td style="padding:8px;border:1px solid #eee">${v.metric}</td>` +
        `<td style="padding:8px;border:1px solid #eee">${v.device}</td>` +
        `<td style="padding:8px;border:1px solid #eee;color:#dc2626;font-weight:600">${formatValue(v.metric, v.value)}</td>` +
        `<td style="padding:8px;border:1px solid #eee;color:#16a34a">${formatValue(v.metric, v.threshold)}</td></tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <h2 style="color:#1E3A5F">⚠️ Core Web Vitals Budget überschritten</h2>
      <p>Folgende Schwellwerte wurden bei der täglichen Messung von <strong>sparschwein-entruempelung.de</strong> überschritten:</p>
      <table style="border-collapse:collapse;width:100%;margin:16px 0">
        <thead>
          <tr style="background:#1E3A5F;color:white">
            <th style="padding:8px;text-align:left">Metrik</th>
            <th style="padding:8px;text-align:left">Gerät</th>
            <th style="padding:8px;text-align:left">Gemessen</th>
            <th style="padding:8px;text-align:left">Budget</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="margin-top:24px">
        <a href="https://sparschwein-entruempelung.de/admin/performance"
           style="background:#F97316;color:white;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block">
          Dashboard öffnen
        </a>
      </p>
      <p style="color:#666;font-size:12px;margin-top:24px">
        Quelle: Google PageSpeed Insights · Tägliche automatische Messung
      </p>
    </div>
  `;

  const to = "info@sparschwein-entruempelung.de";
  const subject = `⚠️ ${violations.length} CWV-Verstoß${violations.length > 1 ? "stöße" : ""} – sparschwein-entruempelung.de`;

  let sent = false;
  let sentVia = "none";

  // 1. Try Resend connector
  if (!sent && resendKey && lovableKey) {
    try {
      const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": resendKey,
        },
        body: JSON.stringify({
          from: "Performance Monitor <onboarding@resend.dev>",
          to: [to],
          subject,
          html,
        }),
      });
      if (res.ok) {
        sent = true;
        sentVia = "resend";
      } else {
        console.error("Resend failed:", res.status, await res.text());
      }
    } catch (e) {
      console.error("Resend error", e);
    }
  }

  // 2. Try Brevo connector
  if (!sent && brevoKey && lovableKey) {
    try {
      const res = await fetch("https://connector-gateway.lovable.dev/brevo/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": brevoKey,
        },
        body: JSON.stringify({
          sender: { name: "Performance Monitor", email: "noreply@sparschwein-entruempelung.de" },
          to: [{ email: to }],
          subject,
          htmlContent: html,
        }),
      });
      if (res.ok) {
        sent = true;
        sentVia = "brevo";
      } else {
        console.error("Brevo failed:", res.status, await res.text());
      }
    } catch (e) {
      console.error("Brevo error", e);
    }
  }

  // Mark alerts as emailed
  if (sent) {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
    await supabase
      .from("performance_alerts")
      .update({ emailed: true })
      .eq("emailed", false)
      .gte("created_at", new Date(Date.now() - 5 * 60 * 1000).toISOString());
  }

  return new Response(
    JSON.stringify({ ok: sent, sentVia, note: sent ? undefined : "No email provider configured (set RESEND_API_KEY or BREVO_API_KEY)." }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
});
