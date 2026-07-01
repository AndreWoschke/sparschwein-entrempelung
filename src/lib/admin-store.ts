// Persistence layer – now backed by Supabase with localStorage fallback for offline
import {
  type Offer,
  type CompanySettings,
  type ServiceCatalogItem,
  type OfferLineItem,
  DEFAULT_COMPANY_SETTINGS,
  DEFAULT_SERVICE_CATALOG,
} from "@/types/admin";
import { supabase } from "@/integrations/supabase/client";

// --- Settings (Supabase) ---
export async function getSettingsAsync(): Promise<CompanySettings> {
  const { data } = await supabase
    .from("company_settings")
    .select("settings, catalog")
    .limit(1)
    .single();
  
  if (data?.settings && Object.keys(data.settings as object).length > 0) {
    return { ...DEFAULT_COMPANY_SETTINGS, ...(data.settings as object) } as CompanySettings;
  }
  return { ...DEFAULT_COMPANY_SETTINGS };
}

export async function saveSettingsAsync(s: CompanySettings): Promise<void> {
  const { data: existing } = await supabase
    .from("company_settings")
    .select("id")
    .limit(1)
    .single();
  
  if (existing) {
    await supabase
      .from("company_settings")
      .update({ settings: s as any })
      .eq("id", existing.id);
  }
}

// --- Catalog (Supabase) ---
export async function getCatalogAsync(): Promise<ServiceCatalogItem[]> {
  const { data } = await supabase
    .from("company_settings")
    .select("catalog")
    .limit(1)
    .single();
  
  if (data?.catalog && Array.isArray(data.catalog) && (data.catalog as any[]).length > 0) {
    return data.catalog as unknown as ServiceCatalogItem[];
  }
  return [...DEFAULT_SERVICE_CATALOG];
}

export async function saveCatalogAsync(c: ServiceCatalogItem[]): Promise<void> {
  const { data: existing } = await supabase
    .from("company_settings")
    .select("id")
    .limit(1)
    .single();
  
  if (existing) {
    await supabase
      .from("company_settings")
      .update({ catalog: c as any })
      .eq("id", existing.id);
  }
}

// --- Offers (Supabase) ---
function normalizeOfferItems(items: unknown): OfferLineItem[] {
  if (!Array.isArray(items)) return [];

  const usedIds = new Set<string>();

  return items.map((raw) => {
    const item = (raw ?? {}) as Partial<OfferLineItem>;
    let id = typeof item.id === "string" && item.id.trim().length > 0 ? item.id : crypto.randomUUID();

    while (usedIds.has(id)) id = crypto.randomUUID();
    usedIds.add(id);

    const quantity = Number(item.quantity);
    const unitPrice = Number(item.unitPrice);

    return {
      id,
      description: typeof item.description === "string" ? item.description : "",
      quantity: Number.isFinite(quantity) ? quantity : 1,
      unit: typeof item.unit === "string" && item.unit.length > 0 ? item.unit : "pauschal",
      unitPrice: Number.isFinite(unitPrice) ? unitPrice : 0,
      note: typeof item.note === "string" ? item.note : "",
    };
  });
}

export async function getOffersAsync(): Promise<Offer[]> {
  const { data } = await supabase
    .from("offers")
    .select("*")
    .order("created_at", { ascending: false });
  
  if (!data) return [];
  
  return data.map((row: any) => ({
    id: row.id,
    offerNumber: row.offer_number,
    date: row.date,
    validityDays: row.validity_days,
    customer: row.customer,
    items: normalizeOfferItems(row.items),
    notes: row.notes,
    scheduledDate: row.scheduled_date,
    estimatedDuration: row.estimated_duration,
    isKleinunternehmer: row.is_kleinunternehmer,
    status: row.status,
    totalNet: Number(row.total_net),
    totalGross: Number(row.total_gross),
    createdAt: row.created_at,
    createdBy: row.created_by,
  }));
}

export async function saveOfferAsync(offer: Offer, userId: string): Promise<void> {
  const row = {
    id: offer.id,
    offer_number: offer.offerNumber,
    date: offer.date,
    validity_days: offer.validityDays,
    customer: offer.customer as any,
    items: normalizeOfferItems(offer.items) as any,
    notes: offer.notes,
    scheduled_date: offer.scheduledDate,
    estimated_duration: offer.estimatedDuration,
    is_kleinunternehmer: offer.isKleinunternehmer,
    status: offer.status,
    total_net: offer.totalNet,
    total_gross: offer.totalGross,
    created_by: userId,
  };
  
  await supabase.from("offers").upsert(row);
}

export async function deleteOfferAsync(id: string): Promise<void> {
  await supabase.from("offers").delete().eq("id", id);
}

export async function updateOfferStatusAsync(id: string, status: string): Promise<void> {
  await supabase.from("offers").update({ status }).eq("id", id);
}

// --- Offer Number (Supabase) ---
export async function generateOfferNumberAsync(): Promise<string> {
  const year = new Date().getFullYear();
  
  const { data } = await supabase
    .from("offer_counter")
    .select("id, next_number, year")
    .limit(1)
    .single();
  
  if (!data) return `SE-${year}-0001`;
  
  let num = data.next_number;
  if (data.year !== year) {
    num = 1;
  }
  
  const offerNumber = `SE-${year}-${String(num).padStart(4, "0")}`;
  
  await supabase
    .from("offer_counter")
    .update({ next_number: num + 1, year })
    .eq("id", data.id);
  
  return offerNumber;
}

// --- Helpers (keep sync) ---
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// Keep old sync functions for backwards compat during migration
const KEYS = {
  offers: "se_offers",
  settings: "se_settings",
  catalog: "se_catalog",
};

export function getSettings(): CompanySettings {
  try {
    const raw = localStorage.getItem(KEYS.settings);
    if (raw) {
      const parsed = { ...DEFAULT_COMPANY_SETTINGS, ...JSON.parse(raw) };
      if (parsed.agbText && parsed.agbText.includes("[PLATZHALTER")) {
        parsed.agbText = DEFAULT_COMPANY_SETTINGS.agbText;
        localStorage.setItem(KEYS.settings, JSON.stringify(parsed));
      }
      return parsed;
    }
  } catch {}
  return { ...DEFAULT_COMPANY_SETTINGS };
}

export function saveSettings(s: CompanySettings) {
  localStorage.setItem(KEYS.settings, JSON.stringify(s));
}

export function getCatalog(): ServiceCatalogItem[] {
  try {
    const raw = localStorage.getItem(KEYS.catalog);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [...DEFAULT_SERVICE_CATALOG];
}

export function saveCatalog(c: ServiceCatalogItem[]) {
  localStorage.setItem(KEYS.catalog, JSON.stringify(c));
}

export function getOffers(): Offer[] {
  try {
    const raw = localStorage.getItem(KEYS.offers);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

export function saveOffer(offer: Offer) {
  const offers = getOffers();
  const idx = offers.findIndex((o) => o.id === offer.id);
  if (idx >= 0) offers[idx] = offer;
  else offers.unshift(offer);
  localStorage.setItem(KEYS.offers, JSON.stringify(offers));
}

export function deleteOffer(id: string) {
  const offers = getOffers().filter((o) => o.id !== id);
  localStorage.setItem(KEYS.offers, JSON.stringify(offers));
}

export function generateOfferNumber(): string {
  const settings = getSettings();
  const year = new Date().getFullYear();
  let num = settings.nextOfferNumber;
  if (settings.offerYear !== year) {
    num = 1;
  }
  const offerNumber = `SE-${year}-${String(num).padStart(4, "0")}`;
  saveSettings({ ...settings, nextOfferNumber: num + 1, offerYear: year });
  return offerNumber;
}
