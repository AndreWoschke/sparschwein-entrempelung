import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Loader2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { CustomerData } from "@/types/admin";

interface Props {
  onExtracted: (data: Partial<CustomerData>) => void;
}

async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Downscale large images so the request stays small and fast
async function compressImage(file: File, maxDim = 1600, quality = 0.85): Promise<string> {
  const dataUrl = await fileToDataUrl(file);
  if (file.size < 800_000) return dataUrl;
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(dataUrl);
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

export default function CustomerPhotoExtract({ onExtracted }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []).slice(0, 10);
    if (selected.length === 0) return;
    setFiles(selected);
    const urls = await Promise.all(selected.map(fileToDataUrl));
    setPreviews(urls);
  };

  const removeOne = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
    setPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleExtract = async () => {
    if (files.length === 0) return;
    setLoading(true);
    try {
      const images = await Promise.all(files.map((f) => compressImage(f)));
      const { data, error } = await supabase.functions.invoke("extract-customer-data", {
        body: { images },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      const customer = (data as any)?.customer as Partial<CustomerData>;
      onExtracted(customer);
      toast({ title: "Daten übernommen", description: "Bitte kurz prüfen und ggf. korrigieren." });
      setFiles([]);
      setPreviews([]);
      if (inputRef.current) inputRef.current.value = "";
    } catch (e) {
      toast({
        title: "Fehler beim Auslesen",
        description: e instanceof Error ? e.message : "Unbekannter Fehler",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-3 space-y-2">
      <div className="flex items-start gap-2">
        <Camera className="h-5 w-5 mt-0.5 text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">Kundendaten per Foto übernehmen</p>
          <p className="text-xs text-muted-foreground">
            Lade Fotos hoch (Ausweis, Visitenkarte, Notizzettel, WhatsApp-Screenshot, …). Die KI füllt das Formular aus.
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        capture="environment"
        onChange={handleSelect}
        className="hidden"
      />

      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {previews.map((src, i) => (
            <div key={i} className="relative h-16 w-16 rounded border overflow-hidden bg-background">
              <img src={src} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeOne(i)}
                className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-bl px-1"
                aria-label="Entfernen"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={loading}
        >
          <Camera className="mr-1 h-4 w-4" />
          {previews.length > 0 ? "Weitere Bilder" : "Bilder auswählen"}
        </Button>
        {files.length > 0 && (
          <Button type="button" size="sm" onClick={handleExtract} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Wird gelesen…
              </>
            ) : (
              <>Daten auslesen ({files.length})</>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
