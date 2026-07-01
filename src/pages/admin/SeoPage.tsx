import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, RefreshCw, ExternalLink, Loader2, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface GscRow { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number; }
interface Overview {
  totals: { rows?: GscRow[] };
  queries: { rows?: GscRow[] };
  pages: { rows?: GscRow[] };
  sitemaps: { sitemap?: Array<{ path: string; lastSubmitted?: string; isPending?: boolean; warnings?: string; errors?: string; contents?: Array<{ type: string; submitted: string; indexed: string }> }> };
  range: { startDate: string; endDate: string };
}

const num = (n: number) => n.toLocaleString("de-DE");
const pct = (n: number) => `${(n * 100).toFixed(1)}%`;
const pos = (n: number) => n.toFixed(1);

export default function SeoPage() {
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(28);
  const [inspectUrl, setInspectUrl] = useState("https://sparschwein-entruempelung.de/");
  const [inspectResult, setInspectResult] = useState<any>(null);
  const [inspecting, setInspecting] = useState(false);

  const load = async (d = days) => {
    setLoading(true);
    const { data: res, error } = await supabase.functions.invoke("gsc-data", {
      body: { action: "overview", days: d },
    });
    setLoading(false);
    if (error || res?.error) {
      toast.error(res?.error || error?.message || "Fehler beim Laden");
      return;
    }
    setData(res);
  };

  useEffect(() => { load(days); }, [days]);

  const inspect = async () => {
    setInspecting(true);
    setInspectResult(null);
    const { data: res, error } = await supabase.functions.invoke("gsc-data", {
      body: { action: "inspect", url: inspectUrl },
    });
    setInspecting(false);
    if (error || res?.error) {
      toast.error(res?.error || error?.message || "Inspektion fehlgeschlagen");
      return;
    }
    setInspectResult(res);
  };

  const total = data?.totals.rows?.[0];

  return (
    <div className="space-y-6">
      <Helmet><title>SEO & Search Console | Admin</title></Helmet>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">SEO & Search Console</h1>
          <p className="text-sm text-muted-foreground">
            Daten aus Google Search Console für <code>sparschwein-entruempelung.de</code>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {[7, 28, 90].map((d) => (
            <Button key={d} size="sm" variant={days === d ? "default" : "outline"} onClick={() => setDays(d)}>
              {d} Tage
            </Button>
          ))}
          <Button size="sm" variant="ghost" onClick={() => load()} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Klicks" value={total ? num(total.clicks) : "–"} />
        <Kpi label="Impressionen" value={total ? num(total.impressions) : "–"} />
        <Kpi label="CTR" value={total ? pct(total.ctr) : "–"} />
        <Kpi label="Ø Position" value={total ? pos(total.position) : "–"} />
      </div>

      <Tabs defaultValue="queries">
        <TabsList>
          <TabsTrigger value="queries">Top Suchanfragen</TabsTrigger>
          <TabsTrigger value="pages">Top Seiten</TabsTrigger>
          <TabsTrigger value="sitemaps">Sitemaps</TabsTrigger>
          <TabsTrigger value="inspect">URL-Prüfung</TabsTrigger>
        </TabsList>

        <TabsContent value="queries">
          <RowsTable rows={data?.queries.rows} keyLabel="Suchanfrage" loading={loading} />
        </TabsContent>

        <TabsContent value="pages">
          <PagesTable rows={data?.pages.rows} loading={loading} days={days} />
        </TabsContent>

        <TabsContent value="sitemaps">
          <Card>
            <CardContent className="pt-6">
              {!data?.sitemaps.sitemap?.length ? (
                <p className="text-sm text-muted-foreground">Keine Sitemaps in der Search Console eingereicht.</p>
              ) : (
                <div className="space-y-3">
                  {data.sitemaps.sitemap.map((s) => {
                    const c = s.contents?.[0];
                    return (
                      <div key={s.path} className="flex flex-wrap items-center justify-between gap-2 rounded border p-3">
                        <div className="min-w-0">
                          <a href={s.path} target="_blank" rel="noreferrer" className="text-sm font-medium hover:underline">
                            {s.path}
                          </a>
                          <p className="text-xs text-muted-foreground">
                            Zuletzt gesendet: {s.lastSubmitted ? new Date(s.lastSubmitted).toLocaleDateString("de-DE") : "–"}
                            {c && ` · ${c.submitted} URLs gesendet · ${c.indexed} indexiert`}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {Number(s.errors || 0) > 0 && <Badge variant="destructive">{s.errors} Fehler</Badge>}
                          {Number(s.warnings || 0) > 0 && <Badge variant="secondary">{s.warnings} Warnungen</Badge>}
                          {s.isPending && <Badge variant="outline">Wird verarbeitet</Badge>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inspect">
          <Card>
            <CardHeader><CardTitle className="text-base">URL-Indexierung prüfen</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input value={inspectUrl} onChange={(e) => setInspectUrl(e.target.value)} placeholder="https://..." />
                <Button onClick={inspect} disabled={inspecting}>
                  {inspecting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  <span className="ml-2">Prüfen</span>
                </Button>
              </div>
              {inspectResult?.inspectionResult && (
                <InspectionResult result={inspectResult.inspectionResult} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="mt-1 text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

function PagesTable({ rows, loading, days }: { rows?: GscRow[]; loading: boolean; days: number }) {
  const [open, setOpen] = useState<string | null>(null);
  const [qLoading, setQLoading] = useState(false);
  const [queries, setQueries] = useState<GscRow[]>([]);

  const toggle = async (url: string) => {
    if (open === url) { setOpen(null); return; }
    setOpen(url);
    setQueries([]);
    setQLoading(true);
    const { data: res, error } = await supabase.functions.invoke("gsc-data", {
      body: { action: "page-queries", url, days },
    });
    setQLoading(false);
    if (error || res?.error) { toast.error(res?.error || error?.message || "Fehler"); return; }
    setQueries(res?.rows || []);
  };

  if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  if (!rows?.length) return <Card><CardContent className="pt-6 text-sm text-muted-foreground">Keine Daten im gewählten Zeitraum.</CardContent></Card>;

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="w-8 px-2 py-2"></th>
                <th className="px-4 py-2 text-left">Seite</th>
                <th className="px-4 py-2 text-right">Klicks</th>
                <th className="px-4 py-2 text-right">Impr.</th>
                <th className="px-4 py-2 text-right">CTR</th>
                <th className="px-4 py-2 text-right">Position</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const url = r.keys?.[0] || "";
                const isOpen = open === url;
                return (
                  <Fragment key={i}>
                    <tr className="cursor-pointer border-b hover:bg-muted/30" onClick={() => toggle(url)}>
                      <td className="px-2 py-2 text-muted-foreground">
                        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </td>
                      <td className="max-w-[320px] truncate px-4 py-2">
                        <span className="inline-flex items-center gap-1">
                          {url.replace(/^https?:\/\/[^/]+/, "") || "/"}
                          <a href={url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                            <ExternalLink className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                          </a>
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums">{num(r.clicks)}</td>
                      <td className="px-4 py-2 text-right tabular-nums">{num(r.impressions)}</td>
                      <td className="px-4 py-2 text-right tabular-nums">{pct(r.ctr)}</td>
                      <td className="px-4 py-2 text-right tabular-nums">{pos(r.position)}</td>
                    </tr>
                    {isOpen && (
                      <tr className="border-b bg-muted/20">
                        <td></td>
                        <td colSpan={5} className="px-4 py-3">
                          {qLoading ? (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Loader2 className="h-4 w-4 animate-spin" /> Lade Suchanfragen…
                            </div>
                          ) : queries.length === 0 ? (
                            <p className="text-sm text-muted-foreground">Keine Suchanfragen für diese Seite im Zeitraum.</p>
                          ) : (
                            <table className="w-full text-xs">
                              <thead className="text-muted-foreground">
                                <tr>
                                  <th className="py-1 text-left font-medium">Suchanfrage</th>
                                  <th className="py-1 text-right font-medium">Klicks</th>
                                  <th className="py-1 text-right font-medium">Impr.</th>
                                  <th className="py-1 text-right font-medium">CTR</th>
                                  <th className="py-1 text-right font-medium">Position</th>
                                </tr>
                              </thead>
                              <tbody>
                                {queries.map((q, qi) => (
                                  <tr key={qi} className="border-t border-border/50">
                                    <td className="py-1">{q.keys?.[0]}</td>
                                    <td className="py-1 text-right tabular-nums">{num(q.clicks)}</td>
                                    <td className="py-1 text-right tabular-nums">{num(q.impressions)}</td>
                                    <td className="py-1 text-right tabular-nums">{pct(q.ctr)}</td>
                                    <td className="py-1 text-right tabular-nums">{pos(q.position)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}


function RowsTable({ rows, keyLabel, loading, isUrl }: { rows?: GscRow[]; keyLabel: string; loading: boolean; isUrl?: boolean }) {
  if (loading) return <div className="flex justify-center p-8"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  if (!rows?.length) return <Card><CardContent className="pt-6 text-sm text-muted-foreground">Keine Daten im gewählten Zeitraum.</CardContent></Card>;
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-2 text-left">{keyLabel}</th>
                <th className="px-4 py-2 text-right">Klicks</th>
                <th className="px-4 py-2 text-right">Impr.</th>
                <th className="px-4 py-2 text-right">CTR</th>
                <th className="px-4 py-2 text-right">Position</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => {
                const k = r.keys?.[0] || "";
                return (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="max-w-[300px] truncate px-4 py-2">
                      {isUrl ? (
                        <a href={k} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
                          {k.replace(/^https?:\/\/[^/]+/, "")} <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : k}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums">{num(r.clicks)}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{num(r.impressions)}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{pct(r.ctr)}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{pos(r.position)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function InspectionResult({ result }: { result: any }) {
  const v = result.indexStatusResult || {};
  const verdict = v.verdict || "UNKNOWN";
  const color = verdict === "PASS" ? "default" : verdict === "NEUTRAL" ? "secondary" : "destructive";
  return (
    <div className="space-y-2 rounded border p-4">
      <div className="flex items-center gap-2">
        <Badge variant={color as any}>{verdict}</Badge>
        <span className="text-sm font-medium">{v.coverageState || "Status unbekannt"}</span>
      </div>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
        <Row k="Indexierungsstatus" v={v.indexingState} />
        <Row k="Letzte Crawls" v={v.lastCrawlTime ? new Date(v.lastCrawlTime).toLocaleString("de-DE") : undefined} />
        <Row k="Robots.txt" v={v.robotsTxtState} />
        <Row k="Crawling erlaubt" v={v.pageFetchState} />
        <Row k="Kanonische URL (deklariert)" v={v.userCanonical} />
        <Row k="Kanonische URL (Google)" v={v.googleCanonical} />
        <Row k="Sitemap" v={v.sitemap?.join(", ")} />
      </dl>
      {result.inspectionResultLink && (
        <a href={result.inspectionResultLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-primary hover:underline">
          In Search Console öffnen <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v?: string }) {
  if (!v) return null;
  return (<><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{v}</dd></>);
}
