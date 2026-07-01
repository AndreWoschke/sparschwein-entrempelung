import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, Plus, Trash2, Users } from "lucide-react";
import { type CompanySettings, type ServiceCatalogItem } from "@/types/admin";
import { getSettingsAsync, saveSettingsAsync, getCatalogAsync, saveCatalogAsync } from "@/lib/admin-store";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function AdminSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAuth();
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [catalog, setCatalog] = useState<ServiceCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [s, c] = await Promise.all([getSettingsAsync(), getCatalogAsync()]);
      setSettings(s);
      setCatalog(c);
      setLoading(false);
    };
    load();
  }, []);

  if (!isAdmin) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Kein Zugriff – nur für Admins.
      </div>
    );
  }

  if (loading || !settings) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const updateSettings = (field: keyof CompanySettings, value: any) =>
    setSettings((prev) => prev ? { ...prev, [field]: value } : prev);

  const handleSaveSettings = async () => {
    if (!settings) return;
    await saveSettingsAsync(settings);
    toast({ title: "✅ Einstellungen gespeichert" });
  };

  const handleSaveCatalog = async () => {
    await saveCatalogAsync(catalog);
    toast({ title: "✅ Leistungskatalog gespeichert" });
  };

  const addCatalogItem = () => {
    setCatalog((prev) => [
      ...prev,
      { id: crypto.randomUUID(), category: "zusatz", name: "", defaultPrice: 0, defaultUnit: "pauschal" },
    ]);
  };

  const removeCatalogItem = (id: string) => {
    setCatalog((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCatalogItem = (id: string, field: keyof ServiceCatalogItem, value: any) => {
    setCatalog((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
          <ArrowLeft className="mr-1 h-4 w-4" /> Zurück
        </Button>
        <h1 className="text-xl font-bold">⚙️ Einstellungen</h1>
      </div>

      {/* Team Management Link */}
      <Link to="/admin/team">
        <Card className="cursor-pointer transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Team verwalten</p>
              <p className="text-xs text-muted-foreground">Mitarbeiter anlegen & löschen</p>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Company Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Firmendaten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>Firmenname</Label>
              <Input value={settings.name} onChange={(e) => updateSettings("name", e.target.value)} />
            </div>
            <div>
              <Label>Inhaber</Label>
              <Input value={settings.owner} onChange={(e) => updateSettings("owner", e.target.value)} />
            </div>
          </div>
          <div>
            <Label>Straße</Label>
            <Input value={settings.street} onChange={(e) => updateSettings("street", e.target.value)} />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>PLZ</Label>
              <Input value={settings.postalCode} onChange={(e) => updateSettings("postalCode", e.target.value)} />
            </div>
            <div>
              <Label>Ort</Label>
              <Input value={settings.city} onChange={(e) => updateSettings("city", e.target.value)} />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>Telefon</Label>
              <Input value={settings.phone} onChange={(e) => updateSettings("phone", e.target.value)} />
            </div>
            <div>
              <Label>E-Mail</Label>
              <Input value={settings.email} onChange={(e) => updateSettings("email", e.target.value)} />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>Website</Label>
              <Input value={settings.website} onChange={(e) => updateSettings("website", e.target.value)} />
            </div>
            <div>
              <Label>Steuernummer / USt-IdNr.</Label>
              <Input value={settings.taxNumber} onChange={(e) => updateSettings("taxNumber", e.target.value)} placeholder="Optional" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label>Kleinunternehmer (§19 UStG)</Label>
            <Switch checked={settings.isKleinunternehmer} onCheckedChange={(v) => updateSettings("isKleinunternehmer", v)} />
          </div>
          <Separator />
          <p className="text-sm font-semibold">Bankverbindung (für Rechnungen)</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>Kontoinhaber</Label>
              <Input value={settings.bankAccountHolder} onChange={(e) => updateSettings("bankAccountHolder", e.target.value)} />
            </div>
            <div>
              <Label>Bank</Label>
              <Input value={settings.bankName} onChange={(e) => updateSettings("bankName", e.target.value)} />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>IBAN</Label>
              <Input value={settings.iban} onChange={(e) => updateSettings("iban", e.target.value)} />
            </div>
            <div>
              <Label>BIC</Label>
              <Input value={settings.bic} onChange={(e) => updateSettings("bic", e.target.value)} />
            </div>
          </div>
          <Separator />
          <div>
            <Label>Angebotsnummer-Zähler</Label>
            <p className="text-xs text-muted-foreground mb-1">Nächste Nummer: SE-{settings.offerYear}-{String(settings.nextOfferNumber).padStart(4, "0")}</p>
            <Input
              type="number"
              value={settings.nextOfferNumber}
              onChange={(e) => updateSettings("nextOfferNumber", Number(e.target.value))}
              className="w-32"
            />
          </div>
          <div>
            <Label>Rechnungsnummer-Zähler</Label>
            <p className="text-xs text-muted-foreground mb-1">Nächste Nummer: RE-{settings.invoiceYear}-{String(settings.nextInvoiceNumber).padStart(4, "0")}</p>
            <Input
              type="number"
              value={settings.nextInvoiceNumber}
              onChange={(e) => updateSettings("nextInvoiceNumber", Number(e.target.value))}
              className="w-32"
            />
          </div>
          <Button onClick={handleSaveSettings}>
            <Save className="mr-1 h-4 w-4" /> Firmendaten speichern
          </Button>
        </CardContent>
      </Card>

      {/* AGB */}
      <Card>
        <CardHeader>
          <CardTitle>AGB-Text</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={settings.agbText}
            onChange={(e) => updateSettings("agbText", e.target.value)}
            rows={12}
            className="font-mono text-xs"
          />
          <Button onClick={handleSaveSettings}>
            <Save className="mr-1 h-4 w-4" /> AGB speichern
          </Button>
        </CardContent>
      </Card>

      {/* Service Catalog */}
      <Card>
        <CardHeader>
          <CardTitle>Leistungskatalog</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {catalog.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <Input
                value={item.name}
                onChange={(e) => updateCatalogItem(item.id, "name", e.target.value)}
                placeholder="Bezeichnung"
                className="flex-1"
              />
              <Input
                type="number"
                value={item.defaultPrice}
                onChange={(e) => updateCatalogItem(item.id, "defaultPrice", Number(e.target.value))}
                className="w-20"
                placeholder="€"
              />
              <Button variant="ghost" size="icon" onClick={() => removeCatalogItem(item.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          <Button variant="outline" onClick={addCatalogItem} className="w-full">
            <Plus className="mr-1 h-4 w-4" /> Position hinzufügen
          </Button>
          <Button onClick={handleSaveCatalog}>
            <Save className="mr-1 h-4 w-4" /> Katalog speichern
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
