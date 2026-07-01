import { useState } from "react";
import { Calculator, Phone, MessageCircle, CheckCircle, Info, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMPANY_INFO } from "@/lib/seo";
import { cn } from "@/lib/utils";

type ServiceType = 
  | "wohnung"
  | "haus"
  | "keller"
  | "dachboden"
  | "haushalt"
  | "gewerbe"
  | "schrott";

interface CalculatorResult {
  minPrice: number;
  maxPrice: number;
}

interface SchrottResult {
  price: number;
  isFree: boolean;
}

const SERVICE_OPTIONS = [
  { value: "wohnung", label: "Wohnungsentrümpelung" },
  { value: "haus", label: "Hausentrümpelung" },
  { value: "keller", label: "Kellerentrümpelung" },
  { value: "dachboden", label: "Dachbodenentrümpelung" },
  { value: "haushalt", label: "Haushaltsauflösung" },
  { value: "gewerbe", label: "Gewerbe- & Firmenentrümpelung" },
  { value: "schrott", label: "Schrottabholung" },
];

const MOEBEL_OPTIONS = [
  { value: "wenig", label: "Wenig Möbel", factor: 0.7 },
  { value: "normal", label: "Normal möbliert", factor: 1.0 },
  { value: "viel", label: "Stark möbliert / vollgestellt", factor: 1.4 },
];

const GEWERBE_TYPES = [
  { value: "buero", label: "Büro / Praxis" },
  { value: "lager", label: "Lager / Halle" },
  { value: "laden", label: "Laden / Geschäft" },
  { value: "gastro", label: "Gastronomie" },
];

const SCHROTT_MENGE_OPTIONS = [
  { value: "wenig", label: "Wenig (z.B. 1-2 Kleinteile)", price: 20 },
  { value: "normal", label: "Normal (z.B. Fahrrad, Heizkörper)", price: 0 },
  { value: "viel", label: "Viel (z.B. mehrere Geräte, Metall)", price: 0 },
];

// Pricing logic with volume discounts
function calculatePrice(
  serviceType: ServiceType,
  size: number,
  moebelFactor: number,
  additionalFactor: number = 1
): CalculatorResult {
  // Base prices per m² with volume discounts (reduced for competitive pricing)
  const getBasePrice = (sqm: number): number => {
    if (sqm <= 20) return 18; // Small = higher price per m²
    if (sqm <= 50) return 14;
    if (sqm <= 100) return 11;
    if (sqm <= 200) return 9;
    return 7; // Large = volume discount
  };

  const basePrice = getBasePrice(size);
  
  // Service-specific multipliers (reduced base prices)
  // Mindest-/Startpreise konsistent zur Preisseite ("ab"-Preise)
  const serviceMultipliers: Record<Exclude<ServiceType, "schrott">, { min: number; max: number; base: number }> = {
    wohnung: { min: 0.75, max: 1.0, base: 299 },
    haus: { min: 0.7, max: 1.1, base: 799 },
    keller: { min: 0.65, max: 1.0, base: 149 },
    dachboden: { min: 0.7, max: 1.05, base: 149 },
    haushalt: { min: 0.75, max: 1.1, base: 399 },
    gewerbe: { min: 0.7, max: 1.15, base: 499 },
  };

  if (serviceType === "schrott") {
    return { minPrice: 0, maxPrice: 0 };
  }

  const multiplier = serviceMultipliers[serviceType];
  const calculatedBase = size * basePrice * moebelFactor * additionalFactor;
  
  // Preis-Aufschlag (+20%) für realistischere Marktpreise
  const PRICE_UPLIFT = 1.2;

  // Ensure minimum price
  const minPrice = Math.max(
    multiplier.base,
    Math.round((calculatedBase * multiplier.min * PRICE_UPLIFT) / 10) * 10
  );
  const maxPrice = Math.max(
    multiplier.base * 1.5,
    Math.round((calculatedBase * multiplier.max * PRICE_UPLIFT) / 10) * 10
  );

  return { minPrice, maxPrice };
}

export function EntruempelungsRechner() {
  const [serviceType, setServiceType] = useState<ServiceType>("wohnung");
  const [size, setSize] = useState(50);
  const [moebel, setMoebel] = useState("normal");
  const [gewerbeType, setGewerbeType] = useState("buero");
  const [schrottMenge, setSchrottMenge] = useState("normal");
  const [zugangSchwer, setZugangSchwer] = useState(false);
  const [etagen, setEtagen] = useState(1);
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [schrottResult, setSchrottResult] = useState<SchrottResult | null>(null);

  const moebelFactor = MOEBEL_OPTIONS.find(m => m.value === moebel)?.factor || 1;

  const handleCalculate = () => {
    // Special handling for Schrottabholung
    if (serviceType === "schrott") {
      const schrottOption = SCHROTT_MENGE_OPTIONS.find(s => s.value === schrottMenge);
      const price = schrottOption?.price || 0;
      setSchrottResult({
        price,
        isFree: price === 0,
      });
      setResult(null);
      return;
    }

    // Reset schrott result for other services
    setSchrottResult(null);

    let additionalFactor = 1;
    
    // Access difficulty factor
    if (zugangSchwer) additionalFactor *= 1.2;
    
    // Multi-floor factor for houses
    if (serviceType === "haus" && etagen > 1) {
      additionalFactor *= 1 + (etagen - 1) * 0.15;
    }
    
    // Commercial type factor
    if (serviceType === "gewerbe") {
      const gewerbeFaktors: Record<string, number> = {
        buero: 1.0,
        lager: 0.9,
        laden: 1.1,
        gastro: 1.25,
      };
      additionalFactor *= gewerbeFaktors[gewerbeType] || 1;
    }

    const calculated = calculatePrice(serviceType, size, moebelFactor, additionalFactor);
    setResult(calculated);
  };

  const getSizeLabel = () => {
    switch (serviceType) {
      case "wohnung":
      case "haushalt":
        return "Wohnfläche";
      case "haus":
        return "Gesamtwohnfläche";
      case "keller":
        return "Kellerfläche";
      case "dachboden":
        return "Dachbodenfläche";
      case "gewerbe":
        return "Gewerbefläche";
      default:
        return "Fläche";
    }
  };

  const getSizeRange = (): { min: number; max: number; step: number } => {
    switch (serviceType) {
      case "keller":
      case "dachboden":
        return { min: 5, max: 50, step: 5 };
      case "haus":
        return { min: 60, max: 300, step: 10 };
      case "gewerbe":
        return { min: 20, max: 500, step: 20 };
      default:
        return { min: 20, max: 150, step: 5 };
    }
  };

  const sizeRange = getSizeRange();

  // Reset size when service type changes
  const handleServiceChange = (value: ServiceType) => {
    setServiceType(value);
    setResult(null);
    setSchrottResult(null);
    if (value === "keller" || value === "dachboden") {
      setSize(20);
    } else if (value === "haus") {
      setSize(120);
    } else if (value === "gewerbe") {
      setSize(100);
    } else if (value === "schrott") {
      // No size needed for schrott
    } else {
      setSize(50);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardHeader className="bg-primary/5 border-b">
          <CardTitle className="flex items-center gap-3 text-xl md:text-2xl">
            <Calculator className="h-6 w-6 text-primary" />
            Kostenrechner für Entrümpelung
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Berechnen Sie eine unverbindliche Preisspanne für Ihre Entrümpelung
          </p>
        </CardHeader>
        <CardContent className="p-4 md:p-6 space-y-6">
          {/* Service Type Selection */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Art der Entrümpelung</Label>
            <Select value={serviceType} onValueChange={(v) => handleServiceChange(v as ServiceType)}>
              <SelectTrigger className="w-full h-12 text-base">
                <SelectValue placeholder="Wählen Sie die Leistung" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                {SERVICE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="py-3">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Schrott-Menge Selection (only for Schrott) */}
          {serviceType === "schrott" && (
            <div className="space-y-3">
              <Label className="text-base font-semibold">Schrottmenge</Label>
              <RadioGroup
                value={schrottMenge}
                onValueChange={(v) => {
                  setSchrottMenge(v);
                  setSchrottResult(null);
                }}
                className="grid grid-cols-1 gap-2"
              >
                {SCHROTT_MENGE_OPTIONS.map((option) => (
                  <div key={option.value}>
                    <RadioGroupItem
                      value={option.value}
                      id={`schrott-${option.value}`}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={`schrott-${option.value}`}
                      className={cn(
                        "flex items-center justify-between rounded-lg border-2 p-4 cursor-pointer transition-all",
                        "hover:bg-secondary/50",
                        schrottMenge === option.value
                          ? "border-primary bg-primary/10"
                          : "border-border"
                      )}
                    >
                      <span className={cn(
                        "text-sm",
                        schrottMenge === option.value && "font-semibold text-primary"
                      )}>
                        {option.label}
                      </span>
                      <span className={cn(
                        "text-sm font-bold",
                        option.price === 0 ? "text-success" : "text-primary"
                      )}>
                        {option.price === 0 ? "Kostenlos" : `${option.price} €`}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <p className="text-xs text-muted-foreground">
                Bei größeren Mengen ist die Abholung für Sie kostenlos. Bei Kleinstmengen fällt eine Anfahrtspauschale von 20 € an.
              </p>
            </div>
          )}

          {/* Commercial Type (only for Gewerbe) */}
          {serviceType === "gewerbe" && (
            <div className="space-y-2">
              <Label className="text-base font-semibold">Art des Objekts</Label>
              <Select value={gewerbeType} onValueChange={setGewerbeType}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border shadow-lg z-50">
                  {GEWERBE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="py-3">
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Size Slider (not for Schrott) */}
          {serviceType !== "schrott" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-semibold">{getSizeLabel()}</Label>
                <span className="text-lg font-bold text-primary">{size} m²</span>
              </div>
              <Slider
                value={[size]}
                onValueChange={(v) => {
                  setSize(v[0]);
                  setResult(null);
                }}
                min={sizeRange.min}
                max={sizeRange.max}
                step={sizeRange.step}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{sizeRange.min} m²</span>
                <span>{sizeRange.max} m²</span>
              </div>
            </div>
          )}

          {/* Floors (only for Haus) */}
          {serviceType === "haus" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-semibold">Anzahl Etagen</Label>
                <span className="text-lg font-bold text-primary">{etagen}</span>
              </div>
              <Slider
                value={[etagen]}
                onValueChange={(v) => {
                  setEtagen(v[0]);
                  setResult(null);
                }}
                min={1}
                max={4}
                step={1}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 Etage</span>
                <span>4 Etagen</span>
              </div>
            </div>
          )}

          {/* Möbelmenge (not for Schrott) */}
          {serviceType !== "schrott" && (
            <div className="space-y-3">
              <Label className="text-base font-semibold">Möbelmenge / Füllstand</Label>
              <RadioGroup
                value={moebel}
                onValueChange={(v) => {
                  setMoebel(v);
                  setResult(null);
                }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-2"
              >
                {MOEBEL_OPTIONS.map((option) => (
                  <div key={option.value}>
                    <RadioGroupItem
                      value={option.value}
                      id={option.value}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={option.value}
                      className={cn(
                        "flex items-center justify-center rounded-lg border-2 p-3 cursor-pointer text-center text-sm transition-all",
                        "hover:bg-secondary/50",
                        moebel === option.value
                          ? "border-primary bg-primary/10 text-primary font-semibold"
                          : "border-border"
                      )}
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Access Difficulty (for Keller/Dachboden) */}
          {(serviceType === "keller" || serviceType === "dachboden") && (
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                {serviceType === "dachboden" ? "Zugang zum Dachboden" : "Zugang zum Keller"}
              </Label>
              <RadioGroup
                value={zugangSchwer ? "schwer" : "leicht"}
                onValueChange={(v) => {
                  setZugangSchwer(v === "schwer");
                  setResult(null);
                }}
                className="grid grid-cols-2 gap-2"
              >
                <div>
                  <RadioGroupItem value="leicht" id="leicht" className="peer sr-only" />
                  <Label
                    htmlFor="leicht"
                    className={cn(
                      "flex items-center justify-center rounded-lg border-2 p-3 cursor-pointer text-center text-sm transition-all",
                      "hover:bg-secondary/50",
                      !zugangSchwer
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border"
                    )}
                  >
                    Leicht zugänglich
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="schwer" id="schwer" className="peer sr-only" />
                  <Label
                    htmlFor="schwer"
                    className={cn(
                      "flex items-center justify-center rounded-lg border-2 p-3 cursor-pointer text-center text-sm transition-all",
                      "hover:bg-secondary/50",
                      zugangSchwer
                        ? "border-primary bg-primary/10 text-primary font-semibold"
                        : "border-border"
                    )}
                  >
                    Enge Treppe / Luke
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Calculate Button */}
          <Button
            onClick={handleCalculate}
            size="lg"
            className="w-full text-lg h-14"
          >
            <Calculator className="h-5 w-5 mr-2" />
            {serviceType === "schrott" ? "Preis anzeigen" : "Preis berechnen"}
          </Button>

          {/* Result for regular services */}
          {result && (
            <div className="bg-primary/5 border-2 border-primary/30 rounded-xl p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-1">Geschätzte Preisspanne</p>
                <p className="text-3xl md:text-4xl font-bold text-primary">
                  ca. {result.minPrice.toLocaleString("de-DE")} € – {result.maxPrice.toLocaleString("de-DE")} €
                </p>
              </div>
              
              <div className="flex items-start gap-2 text-sm text-muted-foreground bg-background/50 rounded-lg p-3">
                <Info className="h-4 w-4 mt-0.5 shrink-0" />
                <p>
                  Der finale Preis hängt von der Besichtigung vor Ort und dem tatsächlichen Aufwand ab. 
                  Diese Schätzung ist unverbindlich.
                </p>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a href={`tel:${COMPANY_INFO.phoneLink}`} className="block">
                  <Button variant="default" size="lg" className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    Jetzt anrufen
                  </Button>
                </a>
                <a href={COMPANY_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" size="lg" className="w-full gap-2 border-success text-success hover:bg-success/10 hover:text-success">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                </a>
              </div>

              {/* Trust Elements */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                {[
                  { label: "Kostenlose Besichtigung" },
                  { label: "Festpreis-Garantie" },
                  { label: "Eigenes Team" },
                  { label: "Versichert" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CheckCircle className="h-3.5 w-3.5 text-success shrink-0" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Result for Schrott */}
          {schrottResult && (
            <div className="bg-success/5 border-2 border-success/30 rounded-xl p-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-success/10 mb-3">
                  <Recycle className="h-8 w-8 text-success" />
                </div>
                {schrottResult.isFree ? (
                  <>
                    <p className="text-3xl md:text-4xl font-bold text-success">
                      Kostenlos
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Bei dieser Menge holen wir Ihren Schrott kostenlos ab!
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-3xl md:text-4xl font-bold text-primary">
                      {schrottResult.price} € Pauschale
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Bei Kleinstmengen fällt eine geringe Anfahrtspauschale an.
                    </p>
                  </>
                )}
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a href={`tel:${COMPANY_INFO.phoneLink}`} className="block">
                  <Button variant="default" size="lg" className="w-full gap-2">
                    <Phone className="h-4 w-4" />
                    Jetzt anrufen
                  </Button>
                </a>
                <a href={COMPANY_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="outline" size="lg" className="w-full gap-2 border-success text-success hover:bg-success/10 hover:text-success">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                </a>
              </div>

              {/* Info */}
              <div className="flex items-start gap-2 text-sm text-muted-foreground bg-background/50 rounded-lg p-3">
                <Info className="h-4 w-4 mt-0.5 shrink-0" />
                <p>
                  Wir holen Altmetall, Elektroschrott, Haushaltsgeräte und mehr ab. 
                  Bei größeren Mengen verdienen wir am Schrottwert – daher ist die Abholung für Sie kostenlos.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SEO Text */}
      <div className="bg-muted/30 rounded-lg p-4 md:p-6 space-y-3">
        <h3 className="font-semibold text-lg">Wie funktioniert unser Kostenrechner?</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Unser Entrümpelungs-Rechner gibt Ihnen eine erste Orientierung zu den möglichen Kosten. 
          Die tatsächlichen Preise können variieren, da jede Entrümpelung individuell ist. 
          Faktoren wie Zugänglichkeit, Stockwerk, Sondermüll oder der genaue Füllstand beeinflussen den Endpreis.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Wichtig:</strong> Je größer die Entrümpelung, desto günstiger wird es pro Quadratmeter. 
          Bei kleineren Mengen fällt ein Mindestpreis an. Nach einer kostenlosen Besichtigung vor Ort 
          erhalten Sie von uns einen verbindlichen Festpreis – ohne versteckte Kosten.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>Schrottabholung:</strong> Bei größeren Mengen Altmetall ist die Abholung für Sie kostenlos. 
          Bei Kleinstmengen fällt eine Anfahrtspauschale von 20 € an.
        </p>
      </div>
    </div>
  );
}
