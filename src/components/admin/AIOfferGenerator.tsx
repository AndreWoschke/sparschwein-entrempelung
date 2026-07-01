import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, Mic, Square } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { OfferLineItem } from "@/types/admin";

interface Props {
  onGenerated: (items: OfferLineItem[], notes: string, estimatedDuration: string) => void;
}

const EXAMPLES = [
  "2-Zi-Wohnung 55 m², 2. OG mit Aufzug, besenrein",
  "3-Zi-Wohnung 75 m², 4. OG ohne Aufzug, Küchendemontage",
  "Komplette Haushaltsauflösung EFH, ca. 140 m², inkl. Keller und Garage",
  "Kellerentrümpelung Mehrfamilienhaus, ca. 20 m³ Sperrmüll",
];

export default function AIOfferGenerator({ onGenerated }: Props) {
  const [description, setDescription] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = ["audio/webm", "audio/mp4"].find((t) => MediaRecorder.isTypeSupported(t)) ?? "";
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => e.data.size > 0 && chunksRef.current.push(e.data);
      recorder.onstop = async () => {
        streamRef.current?.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        if (blob.size < 1024) {
          toast({ title: "Aufnahme zu kurz", description: "Bitte länger sprechen.", variant: "destructive" });
          return;
        }
        await transcribe(blob);
      };
      recorder.start();
      recorderRef.current = recorder;
      setRecording(true);
    } catch {
      toast({ title: "Mikrofon nicht verfügbar", description: "Bitte Mikrofon-Zugriff erlauben.", variant: "destructive" });
    }
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    setRecording(false);
  };

  const transcribe = async (blob: Blob) => {
    setTranscribing(true);
    try {
      const buf = await blob.arrayBuffer();
      // base64 in Chunks (vermeidet Stack-Overflow bei großen Buffern)
      const bytes = new Uint8Array(buf);
      let binary = "";
      const chunk = 0x8000;
      for (let i = 0; i < bytes.length; i += chunk) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
      }
      const base64 = btoa(binary);
      const { data, error } = await supabase.functions.invoke("transcribe-audio", {
        body: { audio: base64, mimeType: blob.type },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      const text = String((data as any)?.text ?? "").trim();
      if (!text) throw new Error("Keine Sprache erkannt.");
      setDescription((prev) => (prev ? prev + " " + text : text));
    } catch (e) {
      toast({
        title: "Transkription fehlgeschlagen",
        description: e instanceof Error ? e.message : "Unbekannter Fehler",
        variant: "destructive",
      });
    } finally {
      setTranscribing(false);
    }
  };


  const handleGenerate = async () => {
    if (!description.trim()) {
      toast({ title: "Beschreibung fehlt", description: "Bitte kurz beschreiben, was zu tun ist.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-offer-items", {
        body: { description: description.trim(), totalPrice: totalPrice ? Number(totalPrice) : null },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);

      const items = ((data as any)?.items ?? []) as Array<Omit<OfferLineItem, "id">>;
      if (items.length === 0) throw new Error("Keine Positionen erhalten.");

      const withIds: OfferLineItem[] = items.map((i) => ({ ...i, id: crypto.randomUUID() }));
      onGenerated(withIds, (data as any)?.notes ?? "", (data as any)?.estimatedDuration ?? "");
      toast({ title: "Positionen erstellt", description: `${withIds.length} Position(en) übernommen – bitte prüfen.` });
      setDescription("");
      setTotalPrice("");
    } catch (e) {
      toast({
        title: "Fehler",
        description: e instanceof Error ? e.message : "Unbekannter Fehler",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-dashed border-primary/40 bg-primary/5 p-3 space-y-3">
      <div className="flex items-start gap-2">
        <Sparkles className="h-5 w-5 mt-0.5 text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">Angebot per KI erstellen</p>
          <p className="text-xs text-muted-foreground">
            Beschreibe kurz den Auftrag und optional den Gesamtpreis (netto). Die KI erstellt die Positionen automatisch.
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <Label className="text-xs">Kurzbeschreibung des Auftrags</Label>
          <Button
            type="button"
            size="sm"
            variant={recording ? "destructive" : "outline"}
            className="h-7 text-xs"
            onClick={recording ? stopRecording : startRecording}
            disabled={transcribing}
          >
            {transcribing ? (
              <><Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> Transkribiere…</>
            ) : recording ? (
              <><Square className="mr-1 h-3.5 w-3.5" /> Stopp</>
            ) : (
              <><Mic className="mr-1 h-3.5 w-3.5" /> Diktieren</>
            )}
          </Button>
        </div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="z. B. 3-Zi-Wohnung 75 m², 3. OG ohne Aufzug, mit Küchendemontage, besenrein – oder auf 🎤 Diktieren tippen"
          maxLength={1000}
        />
        <div className="mt-1 flex flex-wrap gap-1">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setDescription(ex)}
              className="text-[10px] px-1.5 py-0.5 rounded bg-background border hover:bg-muted"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>


      <div className="grid grid-cols-[1fr_auto] gap-2 items-end">
        <div>
          <Label className="text-xs">Gesamtpreis netto € (optional)</Label>
          <Input
            type="number"
            min={0}
            step={50}
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            placeholder="z. B. 1800"
          />
        </div>
        <Button type="button" onClick={handleGenerate} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-1 h-4 w-4 animate-spin" /> Erstelle…
            </>
          ) : (
            <>
              <Sparkles className="mr-1 h-4 w-4" /> Positionen erstellen
            </>
          )}
        </Button>
      </div>
      <p className="text-[10px] text-muted-foreground">
        Hinweis: Bestehende Positionen werden überschrieben.
      </p>
    </div>
  );
}
