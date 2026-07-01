/**
 * Web Vitals Reporter — sendet Real-User-Metriken an die Edge Function.
 * Läuft nur auf öffentlichen Routen, nicht im Admin-Bereich.
 */

const ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ingest-web-vitals`;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

function detectDevice(): "mobile" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  return window.matchMedia("(max-width: 768px)").matches ? "mobile" : "desktop";
}

function send(metric: {
  name: string;
  value: number;
  rating?: string;
  navigationType?: string;
}) {
  // Skip admin routes
  if (typeof window === "undefined") return;
  if (window.location.pathname.startsWith("/admin")) return;

  const payload = JSON.stringify({
    metric: metric.name,
    value: metric.value,
    rating: metric.rating,
    navigationType: metric.navigationType,
    device: detectDevice(),
    route: window.location.pathname,
    userAgent: navigator.userAgent.slice(0, 200),
  });

  const headers = {
    type: "application/json",
  };

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], headers);
      navigator.sendBeacon(`${ENDPOINT}?apikey=${ANON_KEY}`, blob);
      return;
    }
    void fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: ANON_KEY },
      body: payload,
      keepalive: true,
    });
  } catch {
    // ignore — analytics must never break the app
  }
}

export async function initWebVitals() {
  if (typeof window === "undefined") return;
  if (window.location.pathname.startsWith("/admin")) return;

  try {
    const { onLCP, onINP, onCLS, onFCP, onTTFB } = await import("web-vitals");
    onLCP(send);
    onINP(send);
    onCLS(send);
    onFCP(send);
    onTTFB(send);
  } catch {
    // web-vitals failed to load — fail silent
  }
}
