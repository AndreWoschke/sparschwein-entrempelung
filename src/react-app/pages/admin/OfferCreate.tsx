import { useState, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, FileDown, ArrowLeft, ArrowRight } from "lucide-react";
import PropertyDetailsFields from "@/components/admin/PropertyDetailsFields";
import CustomerPhotoExtract from "@/components/admin/CustomerPhotoExtract";
import AIOfferGenerator from "@/components/admin/AIOfferGenerator";
import {
  type CustomerData,
  type OfferLineItem,
  type Offer,
} from "@/types/admin";
import {
  getCatalogAsync,
  getSettingsAsync,
  saveOfferAsync,
  generateOfferNumberAsync,
  formatCurrency,
} from "@/lib/admin-store";
import { generateOfferPDF } from "@/lib/pdf-generator";
import { useAuth } from "@/hooks/useAuth";
import type { ServiceCatalogItem, CompanySettings } from "@/types/admin";

function newLineItem(): OfferLineItem {
  return { id: crypto.randomUUID(), description: "", quantity: 1, unit: "pauschal", unitPrice: 0, note: "" };
}

function normalizeLineItems(items: OfferLineItem[] | undefined): OfferLineItem[] {
  if (!items || items.length === 0) return [newLineItem()];

  const usedIds = new Set<string>();

  return items.map((item) => {
    let id = typeof item.id === "string" && item.id.trim().length > 0 ? item.id : crypto.randomUUID();
    while (usedIds.has(id)) id = crypto.randomUUID();
    usedIds.add(id);

    const quantity = Number(item.quantity);
    const unitPrice = Number(item.unitPrice);

    return {
      id,
      description: item.description ?? "",
      quantity: Number.isFinite(quantity) ? quantity : 1,
      unit: item.unit || "pauschal",
      unitPrice: Number.isFinite(unitPrice) ? unitPrice : 0,
      note: item.note ?? "",
    };
  });
}

const DRAFT_KEY = "se_offer_draft";

function loadDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}

export default function OfferCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [catalog, setCatalog] = useState<ServiceCatalogItem[]>([]);
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  const editOffer: Offer | undefined = (location.state as any)?.edit;
  const duplicateOffer: Offer | undefined = (location.state as any)?.duplicate;
  const sourceOffer = editOffer || duplicateOffer;

  // Load draft from localStorage if no source offer
  const draft = !sourceOffer ? loadDraft() : null;

  const [customer, setCustomer] = useState<CustomerData>(
    sourceOffer?.customer ?? draft?.customer ?? { salutation: "Herr", firstName: "", lastName: "", street: "", postalCode: "", city: "", phone: "", email: "" }
  );
  const [offerDate, setOfferDate] = useState(sourceOffer?.date?.slice(0, 10) ?? draft?.offerDate ?? new Date().toISOString().slice(0, 10));
  const [validityDays, setValidityDays] = useState(sourceOffer?.validityDays ?? draft?.validityDays ?? 14);
  const [customValidity, setCustomValidity] = useState(sourceOffer ? ![7, 14, 30].includes(sourceOffer.validityDays) : (draft?.customValidity ?? false));
  const [items, setItems] = useState<OfferLineItem[]>(normalizeLineItems(sourceOffer?.items ?? draft?.items));
  const [isKleinunternehmer, setIsKleinunternehmer] = useState(sourceOffer?.isKleinunternehmer ?? draft?.isKleinunternehmer ?? true);
  const [notes, setNotes] = useState(sourceOffer?.notes ?? draft?.notes ?? "");
  const [scheduledDate, setScheduledDate] = useState(sourceOffer?.scheduledDate ?? draft?.scheduledDate ?? "");
  const [estimatedDuration, setEstimatedDuration] = useState(sourceOffer?.estimatedDuration ?? draft?.estimatedDuration ?? "");

  // Auto-save draft to localStorage (only for new offers, not edits)
  useEffect(() => {
    if (sourceOffer) return;
    const timeout = setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        customer, offerDate, validityDays, customValidity, items, isKleinunternehmer, notes, scheduledDate, estimatedDuration, step,
      }));
    }, 300);
    return () => clearTimeout(timeout);
  }, [customer, offerDate, validityDays, customValidity, items, isKleinunternehmer, notes, scheduledDate, estimatedDuration, step, sourceOffer]);

  // Restore step from draft
  useEffect(() => {
    if (draft?.step && !sourceOffer) setStep(draft.step);
  }, []);

  useEffect(() => {
    const load = async () => {
      const [cat, set] = await Promise.all([getCatalogAsync(), getSettingsAsync()]);
      setCatalog(cat);
      setSettings(set);
      if (!sourceOffer && !draft) {
        setIsKleinunternehmer(set.isKleinunternehmer);
      }
    };
    load();
  }, []);

  const updateCustomer = (field: keyof CustomerData, value: string) =>
    setCustomer((prev) => ({ ...prev, [field]: value }));

  const addItem = () => setItems((prev) => [...prev, newLineItem()]);
  const removeItem = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const updateItem = (id: string, field: keyof OfferLineItem, value: any) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const addFromCatalog = (catalogId: string) => {
    const c = catalog.find((x) => x.id === catalogId);
    if (!c) return;
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), description: c.name, quantity: 1, unit: c.defaultUnit, unitPrice: c.defaultPrice, note: "" },
    ]);
  };

  const totalNet = items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const totalGross = isKleinunternehmer ? totalNet : totalNet * 1.19;

  const handleSaveAndDownload = async () => {
    if (!user) return;
    setSaving(true);

    const offerNumber = editOffer?.offerNumber ?? await generateOfferNumberAsync();

    const offer: Offer = {
      id: editOffer?.id ?? crypto.randomUUID(),
      offerNumber,
      date: offerDate,
      validityDays,
      customer,
      items: normalizeLineItems(items).filter((i) => i.description),
      notes,
      scheduledDate,
      estimatedDuration,
      isKleinunternehmer,
      status: editOffer?.status ?? "offen",
      totalNet,
      totalGross,
      createdAt: editOffer?.createdAt ?? new Date().toISOString(),
    };

    await saveOfferAsync(offer, user.id);
    await generateOfferPDF(offer);
    clearDraft();
    setSaving(false);
    navigate("/admin/verlauf");
  };

  if (!settings) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
          <ArrowLeft className="mr-1 h-4 w-4" /> Zurück
        </Button>
        <h1 className="text-xl font-bold">{editOffer ? `Angebot ${editOffer.offerNumber} bearbeiten` : "Neues Angebot erstellen"}</h1>
      </div>

      {/* Steps indicator */}
      <div className="flex gap-1">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>

      {/* STEP 1: Kundendaten */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>1. Kundendaten</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <CustomerPhotoExtract
              onExtracted={(d) =>
                setCustomer((prev) => ({
                  salutation: (d.salutation as any) || prev.salutation,
                  firstName: d.firstName || prev.firstName,
                  lastName: d.lastName || prev.lastName,
                  street: d.street || prev.street,
                  postalCode: d.postalCode || prev.postalCode,
                  city: d.city || prev.city,
                  phone: d.phone || prev.phone,
                  email: d.email || prev.email,
                }))
              }
            />
            <div>
              <Label>Anrede *</Label>
              <Select value={customer.salutation} onValueChange={(v) => updateCustomer("salutation", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Herr">Herr</SelectItem>
                  <SelectItem value="Frau">Frau</SelectItem>
                  <SelectItem value="Firma">Firma</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>Vorname *</Label>
                <Input value={customer.firstName} onChange={(e) => updateCustomer("firstName", e.target.value)} />
              </div>
              <div>
                <Label>Nachname *</Label>
                <Input value={customer.lastName} onChange={(e) => updateCustomer("lastName", e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Straße & Hausnummer *</Label>
              <Input value={customer.street} onChange={(e) => updateCustomer("street", e.target.value)} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>PLZ *</Label>
                <Input value={customer.postalCode} onChange={(e) => updateCustomer("postalCode", e.target.value)} />
              </div>
              <div>
                <Label>Ort *</Label>
                <Input value={customer.city} onChange={(e) => updateCustomer("city", e.target.value)} />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>Telefon *</Label>
                <Input value={customer.phone} onChange={(e) => updateCustomer("phone", e.target.value)} />
              </div>
              <div>
                <Label>E-Mail (optional)</Label>
                <Input value={customer.email} onChange={(e) => updateCustomer("email", e.target.value)} />
              </div>
            </div>
            <Separator />
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>Angebotsdatum</Label>
                <Input type="date" value={offerDate} onChange={(e) => setOfferDate(e.target.value)} />
              </div>
              <div>
                <Label>Gültigkeit</Label>
                <Select value={customValidity ? "custom" : String(validityDays)} onValueChange={(v) => { if (v === "custom") { setCustomValidity(true); } else { setCustomValidity(false); setValidityDays(Number(v)); } }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 Tage</SelectItem>
                    <SelectItem value="14">14 Tage</SelectItem>
                    <SelectItem value="30">30 Tage</SelectItem>
                    <SelectItem value="custom">Individuell</SelectItem>
                  </SelectContent>
                </Select>
                {customValidity && (
                  <div className="mt-1 flex items-center gap-2">
                    <Input type="number" min={1} value={validityDays} onChange={(e) => setValidityDays(Number(e.target.value) || 1)} placeholder="Anzahl Tage" />
                    <span className="text-sm text-muted-foreground whitespace-nowrap">Tage</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!customer.firstName || !customer.lastName || !customer.street || !customer.postalCode || !customer.city || !customer.phone}>
                Weiter <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 2: Leistungen */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>2. Leistungen konfigurieren</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AIOfferGenerator
              onGenerated={(generated, aiNotes, aiDuration) => {
                setItems(generated);
                if (aiNotes && !notes) setNotes(aiNotes);
                if (aiDuration && !estimatedDuration) setEstimatedDuration(aiDuration);
              }}
            />

            <Separator />

            <div>
              <Label className="text-xs text-muted-foreground">Aus Leistungskatalog hinzufügen:</Label>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {catalog.map((c) => (
                  <Button key={c.id} variant="outline" size="sm" className="h-7 text-xs" onClick={() => addFromCatalog(c.id)}>
                    + {c.name}
                  </Button>
                ))}
              </div>
            </div>

            <Separator />


            {items.map((item, idx) => (
              <div key={item.id} className="space-y-2 rounded-lg border p-3">
                <div className="flex items-start gap-2">
                  <span className="mt-2 text-xs font-bold text-muted-foreground">{idx + 1}.</span>
                  <div className="flex-1 space-y-2">
                    <Input value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)} placeholder="Bezeichnung" />
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">Menge</Label>
                        <Input type="number" min={0} step={0.5} value={item.quantity} onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))} />
                      </div>
                      <div>
                        <Label className="text-xs">Einheit</Label>
                        <Select value={item.unit} onValueChange={(v) => updateItem(item.id, "unit", v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pauschal">pauschal</SelectItem>
                            <SelectItem value="m³">m³</SelectItem>
                            <SelectItem value="Stück">Stück</SelectItem>
                            <SelectItem value="Stunde">Stunde</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">Einzelpreis €</Label>
                        <Input type="number" min={0} step={1} value={item.unitPrice} onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))} />
                      </div>
                    </div>
                    <Input value={item.note} onChange={(e) => updateItem(item.id, "note", e.target.value)} placeholder="Bemerkung (optional)" className="text-xs" />
                    {/wohnungsentr|hausentr/i.test(item.description) && (
                      <PropertyDetailsFields initialNote={item.note} onNoteChange={(note) => updateItem(item.id, "note", note)} />
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-semibold">{formatCurrency(item.quantity * item.unitPrice)}</span>
                    {items.length > 1 && (
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <Button variant="outline" onClick={addItem} className="w-full">
              <Plus className="mr-1 h-4 w-4" /> Position hinzufügen
            </Button>

            <Separator />

            <div className="flex items-center justify-between">
              <Label>Kleinunternehmer (§19 UStG)</Label>
              <Switch checked={isKleinunternehmer} onCheckedChange={setIsKleinunternehmer} />
            </div>

            <div className="rounded-lg bg-muted p-3 text-sm">
              <div className="flex justify-between">
                <span>Nettobetrag:</span>
                <span>{formatCurrency(totalNet)}</span>
              </div>
              {!isKleinunternehmer && (
                <div className="flex justify-between">
                  <span>MwSt. 19%:</span>
                  <span>{formatCurrency(totalNet * 0.19)}</span>
                </div>
              )}
              <Separator className="my-1" />
              <div className="flex justify-between font-bold">
                <span>Gesamtbetrag:</span>
                <span>{formatCurrency(totalGross)}</span>
              </div>
              {isKleinunternehmer && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Gemäß §19 UStG wird keine Umsatzsteuer berechnet.
                </p>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Zurück
              </Button>
              <Button onClick={() => setStep(3)}>
                Weiter <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* STEP 3: Summary & Download */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>3. Zusammenfassung & Download</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Voraussichtlicher Termin (optional)</Label>
                <Select
                  value={scheduledDate === "" ? "none" : scheduledDate === "Wird noch mit dem Kunden abgestimmt" ? "tbd" : "custom"}
                  onValueChange={(v) => {
                    if (v === "none") setScheduledDate("");
                    else if (v === "tbd") setScheduledDate("Wird noch mit dem Kunden abgestimmt");
                    else setScheduledDate(new Date().toISOString().slice(0, 10));
                  }}
                >
                  <SelectTrigger><SelectValue placeholder="Bitte wählen" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Kein Termin angeben</SelectItem>
                    <SelectItem value="tbd">Wird noch mit dem Kunden abgestimmt</SelectItem>
                    <SelectItem value="custom">Konkretes Datum wählen</SelectItem>
                  </SelectContent>
                </Select>
                {scheduledDate !== "" && scheduledDate !== "Wird noch mit dem Kunden abgestimmt" && (
                  <Input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)} />
                )}
              </div>
              <div>
                <Label>Geschätzte Dauer (optional)</Label>
                <Input value={estimatedDuration} onChange={(e) => setEstimatedDuration(e.target.value)} placeholder="z.B. ca. 3-4 Stunden" />
              </div>
            </div>
            <div>
              <Label>Anmerkungen (optional)</Label>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="z.B. Zugang über Hintereingang, Schlüsselübergabe am Vortag..." rows={3} />
            </div>

            <Separator />

            <div className="rounded-lg border p-4 space-y-2 text-sm">
              <h3 className="font-bold">Vorschau</h3>
              <p><strong>Kunde:</strong> {customer.salutation} {customer.firstName} {customer.lastName}</p>
              <p><strong>Adresse:</strong> {customer.street}, {customer.postalCode} {customer.city}</p>
              <p><strong>Positionen:</strong> {items.filter((i) => i.description).length}</p>
              <p><strong>Gesamtbetrag:</strong> {formatCurrency(totalGross)}</p>
              {scheduledDate && <p><strong>Termin:</strong> {scheduledDate}</p>}
              {estimatedDuration && <p><strong>Dauer:</strong> {estimatedDuration}</p>}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                <ArrowLeft className="mr-1 h-4 w-4" /> Zurück
              </Button>
              <Button onClick={handleSaveAndDownload} disabled={saving}>
                <FileDown className="mr-1 h-4 w-4" />
                {saving ? "Wird gespeichert..." : "Speichern & PDF herunterladen"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
