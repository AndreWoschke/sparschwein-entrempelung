import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Activity, AlertTriangle, RefreshCw, Smartphone, Monitor } from "lucide-react";

type Metric = "LCP" | "INP" | "CLS";
type Device = "mobile" | "desktop";

interface Budget {
  id: string;
  metric: Metric;
  device: Device;
  good_threshold: number;
  poor_threshold: number;
  alert_enabled: boolean;
}

interface MetricRow {
  metric: string;
  device: string;
  value: number;
  source: string;
  created_at: string;
  rating: string | null;
}

interface AlertRow {
  id: number;
  metric: string;
  device: string;
  value: number;
  threshold: number;
  source: string;
  emailed: boolean;
  created_at: string;
}

function p75(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.ceil(sorted.length * 0.75) - 1;
  return sorted[Math.max(0, idx)];
}

function fmt(metric: string, value: number | null): string {
  if (value === null) return "—";
  if (metric === "CLS") return value.toFixed(3);
  if (value >= 1000) return `${(value / 1000).toFixed(2)} s`;
  return `${Math.round(value)} ms`;
}

function rateBadge(
  metric: string,
  value: number | null,
  budget?: Budget
): "good" | "needs-improvement" | "poor" | "none" {
  if (value === null || !budget) return "none";
  if (value <= budget.good_threshold) return "good";
  if (value <= budget.poor_threshold) return "needs-improvement";
  return "poor";
}

const RATING_STYLES: Record<string, string> = {
  good: "bg-green-100 text-green-800 border-green-300",
  "needs-improvement": "bg-yellow-100 text-yellow-800 border-yellow-300",
  poor: "bg-red-100 text-red-800 border-red-300",
  none: "bg-gray-100 text-gray-600 border-gray-300",
};

const RATING_LABELS: Record<string, string> = {
  good: "Gut",
  "needs-improvement": "Verbesserungsbedürftig",
  poor: "Schlecht",
  none: "Keine Daten",
};

export default function PerformancePage() {
  const [metrics, setMetrics] = useState<MetricRow[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [alerts, setAlerts] = useState<AlertRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  const load = async () => {
    setLoading(true);
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const [m, b, a] = await Promise.all([
      supabase
        .from("performance_metrics")
        .select("metric, device, value, source, created_at, rating")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(2000),
      supabase.from("performance_budgets").select("*").order("metric").order("device"),
      supabase
        .from("performance_alerts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);
    if (m.data) setMetrics(m.data as MetricRow[]);
    if (b.data) setBudgets(b.data as Budget[]);
    if (a.data) setAlerts(a.data as AlertRow[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const triggerScan = async () => {
    setScanning(true);
    try {
      const { error } = await supabase.functions.invoke("run-psi-scan", { body: {} });
      if (error) throw error;
      toast.success("PageSpeed-Scan gestartet – Werte erscheinen in ~30 Sekunden");
      setTimeout(load, 30_000);
    } catch (e: any) {
      toast.error(`Scan fehlgeschlagen: ${e.message}`);
    } finally {
      setScanning(false);
    }
  };

  const updateBudget = async (id: string, patch: Partial<Budget>) => {
    const { error } = await supabase.from("performance_budgets").update(patch).eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setBudgets((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
    toast.success("Budget aktualisiert");
  };

  const getP75 = (metric: Metric, device: Device, source: "rum" | "psi"): number | null => {
    const values = metrics
      .filter((m) => m.metric === metric && m.device === device && m.source === source)
      .map((m) => m.value);
    return p75(values);
  };

  const getBudget = (metric: Metric, device: Device): Budget | undefined =>
    budgets.find((b) => b.metric === metric && b.device === device);

  const METRICS_CONFIG: { metric: Metric; label: string; desc: string }[] = [
    { metric: "LCP", label: "Largest Contentful Paint", desc: "Wann erscheint der größte sichtbare Inhalt?" },
    { metric: "INP", label: "Interaction to Next Paint", desc: "Wie schnell reagiert die Seite auf Klicks?" },
    { metric: "CLS", label: "Cumulative Layout Shift", desc: "Springt das Layout beim Laden?" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <Activity className="h-6 w-6" /> Performance-Monitoring
          </h1>
          <p className="text-sm text-muted-foreground">
            Core Web Vitals der letzten 24 h · p75-Werte aus echten Besuchern (RUM) + PageSpeed Insights (PSI)
          </p>
        </div>
        <Button onClick={triggerScan} disabled={scanning}>
          <RefreshCw className={`mr-2 h-4 w-4 ${scanning ? "animate-spin" : ""}`} />
          PSI-Scan jetzt ausführen
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          {(["mobile", "desktop"] as Device[]).map((device) => (
            <Card key={device}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {device === "mobile" ? <Smartphone className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
                  {device === "mobile" ? "Mobile" : "Desktop"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {METRICS_CONFIG.map(({ metric, label, desc }) => {
                    const budget = getBudget(metric, device);
                    const rumValue = getP75(metric, device, "rum");
                    const psiValue = getP75(metric, device, "psi");
                    const primary = rumValue ?? psiValue;
                    const rating = rateBadge(metric, primary, budget);

                    return (
                      <div key={metric} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">{label}</p>
                            <p className="text-lg font-bold">{metric}</p>
                          </div>
                          <Badge variant="outline" className={RATING_STYLES[rating]}>
                            {RATING_LABELS[rating]}
                          </Badge>
                        </div>
                        <p className="mt-2 text-2xl font-bold tabular-nums">{fmt(metric, primary)}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                          <div className="rounded bg-muted/50 p-2">
                            <p className="text-muted-foreground">RUM (p75)</p>
                            <p className="font-medium">{fmt(metric, rumValue)}</p>
                          </div>
                          <div className="rounded bg-muted/50 p-2">
                            <p className="text-muted-foreground">PSI</p>
                            <p className="font-medium">{fmt(metric, psiValue)}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" /> Letzte Budget-Verstöße
              </CardTitle>
            </CardHeader>
            <CardContent>
              {alerts.length === 0 ? (
                <p className="text-sm text-muted-foreground">Keine Verstöße – alle Werte im grünen Bereich. ✅</p>
              ) : (
                <div className="space-y-2">
                  {alerts.map((a) => (
                    <div
                      key={a.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded border border-red-200 bg-red-50 p-3"
                    >
                      <div>
                        <p className="font-medium">
                          {a.metric} · {a.device}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(a.created_at).toLocaleString("de-DE")} · {a.source.toUpperCase()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-700">{fmt(a.metric, a.value)}</p>
                        <p className="text-xs text-muted-foreground">Budget: {fmt(a.metric, a.threshold)}</p>
                      </div>
                      <Badge variant={a.emailed ? "default" : "outline"}>
                        {a.emailed ? "E-Mail gesendet" : "Nur Dashboard"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Budget Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Budget-Schwellwerte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {budgets.map((b) => (
                  <div
                    key={b.id}
                    className="grid grid-cols-1 items-center gap-3 rounded border p-3 sm:grid-cols-[120px_1fr_1fr_120px]"
                  >
                    <div>
                      <p className="font-bold">{b.metric}</p>
                      <p className="text-xs text-muted-foreground capitalize">{b.device}</p>
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Gut bis</label>
                      <Input
                        type="number"
                        step={b.metric === "CLS" ? "0.01" : "10"}
                        defaultValue={b.good_threshold}
                        onBlur={(e) =>
                          updateBudget(b.id, { good_threshold: parseFloat(e.target.value) })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Schlecht ab</label>
                      <Input
                        type="number"
                        step={b.metric === "CLS" ? "0.01" : "10"}
                        defaultValue={b.poor_threshold}
                        onBlur={(e) =>
                          updateBudget(b.id, { poor_threshold: parseFloat(e.target.value) })
                        }
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={b.alert_enabled}
                        onCheckedChange={(v) => updateBudget(b.id, { alert_enabled: v })}
                      />
                      <span className="text-xs">Alert</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Einheit: ms für LCP/INP, Score für CLS. Alerts feuern, wenn der p75-Wert über „Schlecht ab" liegt.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
