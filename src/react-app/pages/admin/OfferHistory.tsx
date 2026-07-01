import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileDown, Copy, Trash2, ArrowLeft, Pencil, Receipt } from "lucide-react";
import { type Offer, type OfferStatus } from "@/types/admin";
import { getOffersAsync, updateOfferStatusAsync, deleteOfferAsync, formatCurrency, formatDate, getSettingsAsync, saveSettingsAsync } from "@/lib/admin-store";
import { generateOfferPDF } from "@/lib/pdf-generator";
import { generateInvoicePDF } from "@/lib/invoice-generator";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const STATUS_COLORS: Record<OfferStatus, string> = {
  offen: "bg-yellow-100 text-yellow-800",
  angenommen: "bg-green-100 text-green-800",
  abgelehnt: "bg-red-100 text-red-800",
};

export default function OfferHistory() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [profiles, setProfiles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const fetchOffers = async () => {
    setLoading(true);
    const data = await getOffersAsync();
    setOffers(data);

    // Fetch creator names
    const { data: profs } = await supabase.from("profiles").select("user_id, first_name, last_name");
    if (profs) {
      const map: Record<string, string> = {};
      profs.forEach((p: any) => {
        map[p.user_id] = `${p.first_name} ${p.last_name.charAt(0)}.`;
      });
      setProfiles(map);
    }
    setLoading(false);
  };

  useEffect(() => { fetchOffers(); }, []);

  const canEditOffer = (offer: Offer) => {
    return isAdmin || (offer as any).createdBy === user?.id;
  };

  const handleStatusChange = async (id: string, status: OfferStatus) => {
    await updateOfferStatusAsync(id, status);
    fetchOffers();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Angebot wirklich löschen?")) return;
    await deleteOfferAsync(id);
    fetchOffers();
  };

  const handleDuplicate = (offer: Offer) => {
    navigate("/admin/angebot", { state: { duplicate: offer } });
  };

  const handleEdit = (offer: Offer) => {
    navigate("/admin/angebot", { state: { edit: offer } });
  };

  const handleDownload = async (offer: Offer) => {
    await generateOfferPDF(offer);
  };

  const handleInvoice = async (offer: Offer) => {
    const settings = await getSettingsAsync();
    const year = new Date().getFullYear();
    let num = settings.nextInvoiceNumber || 1;
    if ((settings.invoiceYear || year) !== year) num = 1;
    const invoiceNumber = `RE-${year}-${String(num).padStart(4, "0")}`;
    await generateInvoicePDF(offer, invoiceNumber, settings);
    // Increment counter
    await saveSettingsAsync({ ...settings, nextInvoiceNumber: num + 1, invoiceYear: year });
  };

  if (loading) {
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
        <h1 className="text-xl font-bold">Angebotsverlauf</h1>
        <Badge variant="secondary" className="ml-auto">{offers.length} Angebote</Badge>
      </div>

      {offers.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Noch keine Angebote erstellt.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {offers.map((offer) => {
            const editable = canEditOffer(offer);
            const creatorName = (offer as any).createdBy
              ? profiles[(offer as any).createdBy] || "Unbekannt"
              : "–";

            return (
              <Card key={offer.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold">{offer.offerNumber}</span>
                        <Badge className={STATUS_COLORS[offer.status]}>{offer.status}</Badge>
                      </div>
                      <p className="text-sm">
                        {offer.customer.firstName} {offer.customer.lastName} – {offer.customer.city}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(offer.date)} | {formatCurrency(offer.totalGross)} | Erstellt von: {creatorName}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {editable && (
                        <Select
                          value={offer.status}
                          onValueChange={(v) => handleStatusChange(offer.id, v as OfferStatus)}
                        >
                          <SelectTrigger className="h-8 w-32 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="offen">Offen</SelectItem>
                            <SelectItem value="angenommen">Angenommen</SelectItem>
                            <SelectItem value="abgelehnt">Abgelehnt</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                      <Button variant="outline" size="sm" onClick={() => handleDownload(offer)}>
                        <FileDown className="mr-1 h-3.5 w-3.5" /> PDF
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleInvoice(offer)}>
                        <Receipt className="mr-1 h-3.5 w-3.5" /> Rechnung
                      </Button>
                      {editable && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(offer)}>
                            <Pencil className="mr-1 h-3.5 w-3.5" /> Bearbeiten
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDuplicate(offer)}>
                            <Copy className="mr-1 h-3.5 w-3.5" /> Duplizieren
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(offer.id)}>
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
