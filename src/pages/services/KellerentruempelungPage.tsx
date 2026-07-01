import { SERVICES, FAQ_ITEMS } from "@/lib/seo";
import { ServicePageTemplate } from "./ServicePageTemplate";

import kellerentruempelungImage from "@/assets/kellerentruempelung.webp";

const service = SERVICES.find((s) => s.id === "kellerentruempelung")!;

const introParagraphs = [
  "Wir räumen Keller von 5 bis 60 m² in 2–4 Stunden – Möbel, Kartons, Elektrogeräte, Werkzeug, Fahrräder.",
  "Auch enge Wendeltreppen, niedrige Decken oder mehrere Verschläge sind kein Hindernis. Wir tragen alles nach oben.",
  "Sondermüll wie Farben, Lacke oder alte Heizöl-Reste werden separat fachgerecht entsorgt.",
];

const detailedDescription = `Eine Kellerentrümpelung umfasst das vollständige Leerräumen aller Kellerräume inklusive Verschlägen und Abstellflächen. Typische Volumina liegen bei 3–15 m³.

Die meisten Keller räumen wir mit zwei Helfern in 2–4 Stunden. Treppen, enge Türen und verwinkelte Gänge planen wir in der Kalkulation vorab ein – kein Aufschlag im Nachgang.

Schwere Einzelstücke wie Gefriertruhen, Werkbänke oder gusseiserne Heizkörper transportieren wir mit Sackkarre und Tragegurten. Wenn nötig, werden Möbel vor Ort zerlegt, um durch die Tür zu passen.

Sondermüll (Farben, Lacke, Altöl, Lösungsmittel) trennen wir direkt und entsorgen ihn über zertifizierte Annahmestellen.`;

const timeInfo = `Termine in der Regel innerhalb 24–48 Stunden. Räumdauer 2–4 Stunden, bei sehr großen Kellern bis zu einem halben Tag.`;

const disposalInfo = `Im Keller findet sich oft ein gemischtes Spektrum:

• Möbel: Regale, Schränke, ausgediente Couch
• Elektrogeräte: Kühlschrank, Waschmaschine, Gefriertruhe, Trockner
• Werkzeug & Gartengeräte: Rasenmäher, Werkbank, Heckenscheren
• Fahrräder, Sportgeräte, Kinderwagen
• Sondermüll: Farben, Lacke, Altöl, Batterien, Leuchtmittel
• Kartons und Kisten: Wir sortieren auf Wunsch vor Ort

Alles wird über zugelassene Betriebe entsorgt, Elektroschrott geht ins zertifizierte Recycling.`;

const situations = [
  { title: "Jahrelang angesammelter Hausrat", description: "Wir räumen, sortieren und schaffen wieder Stellfläche." },
  { title: "Vor dem Umzug", description: "Keller leer vor dem Packen – spart Volumen und Umzugskosten." },
  { title: "Nach Wasserschaden oder Schimmel", description: "Wir tragen Möbel und Hausrat heraus, damit Trocknung und Sanierung starten können." },
  { title: "Kellerumbau geplant", description: "Komplett leerer Keller für Hobbyraum, Werkstatt oder Sauna." },
  { title: "Mieterkeller räumen", description: "Hinterlassener Hausrat für die Neuvermietung beseitigt." },
  { title: "Nachlass im Keller", description: "Auch Jahre nach dem Erbfall – wir sortieren und übergeben Fundstücke." },
];

const processSteps = [
  { step: 1, title: "Anfrage", description: "Anruf oder WhatsApp mit kurzer Beschreibung." },
  { step: 2, title: "Besichtigung", description: "Kostenloser Vor-Ort-Termin, oft am selben oder nächsten Tag." },
  { step: 3, title: "Festpreis", description: "Schriftliches Angebot vor Auftragsstart." },
  { step: 4, title: "Räumung", description: "2–4 Stunden, besenrein übergeben." },
];

const priceFactors = [
  "Kellergröße in m²",
  "Volumen in m³",
  "Treppenführung und Türbreite",
  "Schwere Einzelstücke (Werkbank, Gefriertruhe)",
  "Sondermüll (Farben, Altöl)",
  "Mehrere Verschläge oder Räume",
];

const targetGroups = [
  { title: "Eigenheimbesitzer", description: "Mehr Stellfläche für Fahrräder, Vorräte oder Hobbyraum." },
  { title: "Vermieter", description: "Schnelle Räumung zwischen Mieterwechseln." },
  { title: "Hausverkäufer", description: "Besenreine Übergabe inkl. Keller vor Notartermin." },
  { title: "Erben", description: "Sortierung und Räumung auch lange nach dem Erbfall." },
];

const whyUsPoints = [
  "Erfahrung mit engen Treppen und verwinkelten Kellern",
  "Schwere Geräte wie Waschmaschinen oder Werkbänke kein Problem",
  "Sondermüll inklusive – Farben, Lacke, Altöl getrennt entsorgt",
  "Festpreis vor Beginn, schriftlich",
  "Termine in der Regel innerhalb 24–48 Stunden",
];

const faqs = [
  {
    question: "Was kostet eine Kellerentrümpelung?",
    answer: "Ab 149 €. Ein durchschnittlicher Keller (10–20 m²) liegt typischerweise bei 200–500 €, je nach Füllstand und Zugang. Festpreis nach Besichtigung.",
  },
  {
    question: "Tragen Sie schwere Sachen die Treppe hoch?",
    answer: "Ja. Waschmaschinen, Gefriertruhen, Werkbänke und gusseiserne Heizkörper transportieren wir mit Sackkarre und Tragegurten – auch bei engen Wendeltreppen.",
  },
  {
    question: "Können Sie nur einen Teil mitnehmen?",
    answer: "Ja. Teilentrümpelungen sind möglich. Markieren Sie vorab, was bleiben soll, oder zeigen Sie es uns beim Termin.",
  },
  {
    question: "Was passiert mit Elektrogeräten?",
    answer: "Kühlschränke, Waschmaschinen, Gefriertruhen und Kleingeräte gehen ins zertifizierte Recycling – nichts landet im Sperrmüll.",
  },
  {
    question: "Wie schnell ist ein Termin möglich?",
    answer: "Termine in der Regel innerhalb 24–48 Stunden. Die Räumung selbst dauert meist 2–4 Stunden.",
  },
  {
    question: "Entsorgen Sie Farben, Lacke und Altöl?",
    answer: "Ja. Sondermüll wird vor Ort getrennt und über zertifizierte Annahmestellen entsorgt. Bitte bei der Anfrage kurz erwähnen.",
  },
  ...FAQ_ITEMS.slice(0, 2),
];

export default function KellerentruempelungPage() {
  return (
    <ServicePageTemplate
      service={service}
      faqs={faqs}
      situations={situations}
      processSteps={processSteps}
      priceFactors={priceFactors}
      detailedDescription={detailedDescription}
      disposalInfo={disposalInfo}
      targetGroups={targetGroups}
      whyUsPoints={whyUsPoints}
      timeInfo={timeInfo}
      introImage={kellerentruempelungImage}
      introImageAlt="Entrümpelungshelfer trägt gerollten Teppich bei einer Kellerräumung"
      introParagraphs={introParagraphs}
    />
  );
}
