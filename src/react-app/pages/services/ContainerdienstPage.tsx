import { SERVICES, FAQ_ITEMS } from "@/lib/seo";
import { ServicePageTemplate } from "./ServicePageTemplate";

const service = SERVICES.find((s) => s.id === "containerdienst")!;

const introParagraphs = [
  "Sie brauchen einen Container in Brieselang, Falkensee, Nauen, Wustermark oder im weiteren Havelland? Wir liefern – mit eigenen Fahrzeugen, ohne Vermittlung.",
  "Bauschutt, Sperrmüll, Altholz, Erdaushub oder Bodenaushub: gängige Größen von 3 m³ bis 10 m³, Lieferung meist innerhalb von 24 Stunden.",
  "Festpreis inkl. Stellung, Standzeit und fachgerechter Entsorgung – kein versteckter Tonnen-Preis im Nachhinein.",
];

const detailedDescription = `Unser Containerdienst deckt das gesamte Havelland ab. Sie buchen einen Container für eine konkrete Abfallart – Bauschutt, Sperrmüll, Altholz (A I–A III), Erdaushub oder Bodenaushub – und bekommen einen Festpreis, der Anlieferung, übliche Standzeit (in der Regel 7 Tage) und Entsorgung enthält.

Die häufigsten Größen sind der 3-m³-Absetzcontainer für Bauschutt im Privatbereich, der 5-m³-Container für Sperrmüll bei Wohnungsauflösungen und der 7-/10-m³-Container für größere Sanierungen. Standfläche: ein normaler Pkw-Stellplatz reicht – der Container wird auf Wunsch direkt auf dem Grundstück abgesetzt, sonst auf öffentlichem Grund mit von uns organisierter Genehmigung.

Wichtig ist die saubere Trennung: gemischter Bauschutt ist deutlich teurer als reiner Bauschutt; Altholz darf keine Tapete oder Folie enthalten. Wir beraten vor der Bestellung kostenlos, damit Sie nicht für die falsche Containerart zahlen.`;

const timeInfo = `Container in der Regel innerhalb 24 Stunden geliefert. Bei kurzfristigem Bedarf (Wochenende, Sanierungsende) auch am gleichen Tag möglich. Standzeit standardmäßig 7 Tage – auf Wunsch verlängerbar.`;

const disposalInfo = `Alle Container werden über zertifizierte Entsorgungsbetriebe verwertet:

• Bauschutt: Beton, Ziegel, Mörtel, Fliesen (mineralisch, unbelastet)
• Gemischter Bauschutt: Bauschutt mit Tapete, Gips, Holz, Metall
• Sperrmüll: Möbel, Matratzen, Teppiche, Kunststoffe
• Altholz (A I–A III): unbehandeltes bis verleimtes Holz, OSB, Spanplatten
• Erdaushub: unbelasteter Mutterboden, Lehm, Sand
• Bodenaushub: belasteter oder verfestigter Aushub (eigene Klassifizierung)

Auf Wunsch erhalten Sie Entsorgungsnachweise – wichtig für Bauherren und Architekten.`;

const situations = [
  {
    title: "Sanierung oder Renovierung",
    description: "Bauschutt-Container für Bad, Küche oder Dach – wir liefern morgens, holen nach Abschluss ab.",
  },
  {
    title: "Garten- und Hofarbeiten",
    description: "Erdaushub und Bodenaushub aus Baugrube, Teichbau oder Pflasterarbeiten.",
  },
  {
    title: "Wohnungs- oder Hausauflösung",
    description: "Sperrmüll-Container ergänzend zur Entrümpelung – ideal bei viel Volumen.",
  },
  {
    title: "Dach- oder Bodensanierung",
    description: "Altholz-Container für Dachstuhl, Dielen, alte Lattung.",
  },
  {
    title: "Bauherren & Handwerker",
    description: "Kurzfristige Containerlieferung mit Entsorgungsnachweis für die Baustellendokumentation.",
  },
  {
    title: "Gewerbe & Hausverwaltung",
    description: "Wiederkehrende Containergestellung bei Mieterwechseln oder Sanierungsphasen.",
  },
];

const processSteps = [
  { step: 1, title: "Anfrage", description: "Anruf oder WhatsApp mit Containerart, Größe, Standort und Wunschtermin." },
  { step: 2, title: "Festpreis", description: "Verbindlicher Festpreis inkl. Lieferung, Standzeit und Entsorgung – schriftlich." },
  { step: 3, title: "Lieferung", description: "Containerlieferung in der Regel innerhalb 24 Stunden auf Ihr Grundstück oder den Stellplatz." },
  { step: 4, title: "Abholung & Entsorgung", description: "Termingerechte Abholung, fachgerechte Verwertung, auf Wunsch mit Nachweis." },
];

const priceFactors = [
  "Containergröße (3, 5, 7 oder 10 m³)",
  "Abfallart (reiner Bauschutt günstiger als gemischter)",
  "Standzeit über 7 Tage hinaus",
  "Genehmigung für öffentlichen Grund",
  "Entfernung im Havelland",
  "Wochenend- oder Express-Lieferung",
];

const targetGroups = [
  { title: "Privatpersonen", description: "Renovierung, Gartenarbeit, Entrümpelung – ein Container, ein Festpreis." },
  { title: "Bauherren", description: "Kurzfristige Lieferung mit Entsorgungsnachweis – wir halten Ihren Bauzeitplan." },
  { title: "Handwerker", description: "Containerwechsel auf der Baustelle ohne Wartezeit, faire Konditionen für Stammkunden." },
  { title: "Hausverwaltungen", description: "Wiederkehrende Container nach Mieterwechseln oder bei Sanierungen." },
];

const whyUsPoints = [
  "Festpreis inkl. Stellung, Standzeit & Entsorgung",
  "Eigene Fahrzeuge – keine Vermittlung",
  "Lieferung in der Regel binnen 24 h",
  "Beratung zur richtigen Containerart vorab",
  "Entsorgungsnachweis auf Wunsch",
];

const faqs = [
  {
    question: "Was kostet ein Container in Brieselang und im Havelland?",
    answer: "Bauschutt-Container ab 149 € (3 m³, reiner Bauschutt). Sperrmüll-Container 5 m³ ab ca. 269 €, Altholz 7 m³ ab ca. 299 €. Der Festpreis enthält Lieferung, 7 Tage Standzeit und fachgerechte Entsorgung.",
  },
  {
    question: "Welche Containergrößen liefern Sie?",
    answer: "Standardgrößen 3, 5, 7 und 10 m³. Welche Größe für Ihr Projekt passt, klären wir kurz am Telefon – damit Sie nicht für ungenutztes Volumen zahlen.",
  },
  {
    question: "Wie schnell wird der Container geliefert?",
    answer: "In der Regel innerhalb 24 Stunden. Bei Sanierungs- oder Bauschluss-Druck liefern wir auf Wunsch auch am gleichen Tag oder samstags.",
  },
  {
    question: "Brauche ich eine Genehmigung für den Container?",
    answer: "Auf privatem Grund: nein. Auf öffentlichem Grund (Straße, Gehweg) ist eine Stellgenehmigung nötig – die organisieren wir auf Wunsch für Sie.",
  },
  {
    question: "Was darf in welchen Container?",
    answer: "Bauschutt ist nur für mineralisches Material (Beton, Ziegel, Fliesen). Tapeten, Gips, Holz oder Metall machen ihn zu gemischtem Bauschutt – das ist teurer. Altholz darf keine Folie oder Bauschutt enthalten. Wir beraten vor der Bestellung.",
  },
  {
    question: "In welchen Orten liefern Sie Container?",
    answer: "Brieselang, Falkensee, Dallgow-Döberitz, Wustermark, Nauen, Schönwalde-Glien, Ketzin, Rathenow, Premnitz, Friesack, Hennigsdorf, Velten, Oranienburg, Werder und das gesamte Havelland.",
  },
  ...FAQ_ITEMS.slice(0, 2),
];

const containerVariants = [
  {
    title: "Bauschutt-Container Brieselang",
    description: "Reiner Bauschutt – Beton, Ziegel, Mörtel, Fliesen. Ideal für Bad-, Küchen- oder Dachsanierung. Ab 149 € inkl. Lieferung, Standzeit und Entsorgung.",
  },
  {
    title: "Baumischabfall-Container",
    description: "Gemischter Bauschutt mit Tapete, Gips, Holz oder Metall – wenn eine saubere Trennung vor Ort nicht möglich ist. Fairer Festpreis nach Abfallart.",
  },
  {
    title: "Altholz-Container (A I–A III) im Havelland",
    description: "Dachlatten, Dielen, OSB und Spanplatten – unbehandeltes bis verleimtes Holz aus Dach- und Bodensanierungen.",
  },
  {
    title: "Bodenaushub- & Erdaushub-Container Brieselang",
    description: "Mutterboden, Lehm und Sand aus Baugrube, Teichbau oder Pflasterarbeiten – mit korrekter Klassifizierung und Nachweis.",
  },
  {
    title: "Sperrmüll-Container",
    description: "Möbel, Matratzen, Teppiche und Hausrat – ideal ergänzend zur Wohnungs- oder Hausentrümpelung bei großem Volumen.",
  },
  {
    title: "Container mieten in Falkensee, Nauen & Wustermark",
    description: "Denselben Festpreis-Service bieten wir im gesamten Havelland – Lieferung meist innerhalb von 24 Stunden, ohne Anfahrtszuschlag.",
  },
];

export default function ContainerdienstPage() {
  return (
    <ServicePageTemplate
      service={service}
      faqs={faqs}
      situations={situations}
      processSteps={processSteps}
      priceFactors={priceFactors}
      variantsBadge="Container-Arten"
      variantsTitle="Container für jede Abfallart in Brieselang & Havelland"
      variantsDescription="Wählen Sie den passenden Container – wir beraten vor der Bestellung, damit Sie nicht für die falsche Abfallart zahlen."
      variants={containerVariants}
      detailedDescription={detailedDescription}
      disposalInfo={disposalInfo}
      targetGroups={targetGroups}
      whyUsPoints={whyUsPoints}
      timeInfo={timeInfo}
      introParagraphs={introParagraphs}
    />
  );
}
