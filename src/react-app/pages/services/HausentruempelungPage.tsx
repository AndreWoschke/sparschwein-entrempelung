import { SERVICES, FAQ_ITEMS } from "@/lib/seo";
import { ServicePageTemplate } from "./ServicePageTemplate";
import hausentruempelungImage from "@/assets/hausentruempelung.webp?url";

const service = SERVICES.find((s) => s.id === "hausentruempelung")!;

const introParagraphs = [
  "Ein Haus zu räumen heißt mehrere Etagen, Keller, Dachboden und Garage – schnell mehrere Container Volumen. Wir planen das in 1–3 Arbeitstagen mit 3–5 Helfern und 2–3 Transportern pro Tag.",
  "Vor Hausverkauf oder Notartermin übergeben wir besenrein – inkl. Garage und Schuppen. Garten und Nebengebäude auf Wunsch.",
  "Ein Festpreis nach Besichtigung, ein Ansprechpartner, eine Crew – auch bei großen Häusern.",
];

const detailedDescription = `Eine Hausentrümpelung umfasst Wohnräume, Keller, Dachboden, Garage und auf Wunsch Garten oder Nebengebäude. Typische Volumina liegen zwischen 25 m³ (kleines Reihenhaus, leer geräumt) und 80 m³ (vollgestelltes Einfamilienhaus über drei Generationen).

Wir planen Häuser meistens in 1–3 Tagen: Tag 1 obere Etagen und Dachboden, Tag 2 Erdgeschoss, Tag 3 Keller, Garage und Außenbereich. Bei sehr großen Häusern fahren wir 2–3 Transporter parallel.

Vor Hausverkauf erwarten Käufer in der Regel besenreine Übergabe inklusive Keller und Dachboden. Wir richten uns nach Ihrem Notartermin – auch wenn nur 5–7 Tage Vorlauf bleiben.

Bei Erbschaft sortieren wir Etage für Etage, dokumentieren auf Wunsch Fundstücke und übergeben Wertsachen, Dokumente und Fotos gesondert.`;

const timeInfo = `Termin innerhalb 3–7 Tagen, bei Notar- oder Übergabefristen schneller. Räumdauer 1–3 Arbeitstage je nach Hausgröße und Füllstand.`;

const disposalInfo = `Bei einer Hausentrümpelung fällt ein breites Spektrum an Entsorgungsgut an:

• Wohnräume: Möbel, Hausrat, Teppiche, Vorhänge
• Keller: Werkzeug, Farben, Vorräte, Heizöl-Reste
• Dachboden: Kartons, Dämmreste, alte Koffer
• Garage und Schuppen: Reifen, Werkbank, Rasenmäher, Benzinkanister
• Garten (optional): Spielgeräte, Pflanzgefäße, Zaunreste
• Sondermüll: Altöl, Lacke, Chemikalien – fachgerecht getrennt

Alles wird über zugelassene Betriebe entsorgt. Entsorgungsnachweis auf Wunsch.`;

const situations = [
  { title: "Hausverkauf", description: "Übergabe nach Notartermin – besenrein, inkl. Keller und Garage." },
  { title: "Erbschaft", description: "Etagenweise Räumung mit Übergabe von Dokumenten und Wertsachen." },
  { title: "Umzug ins Kleinere", description: "Was nicht mitkommt, geht direkt in den Container." },
  { title: "Vor Sanierung oder Abriss", description: "Komplett leeres Haus für Handwerker oder Abrissunternehmen." },
  { title: "Elternhaus auflösen", description: "Wir sortieren behutsam, persönliche Stücke werden Ihnen übergeben." },
  { title: "Mieterwechsel im Einfamilienhaus", description: "Räumung für die schnelle Neuvermietung – inkl. Garten auf Wunsch." },
];

const processSteps = [
  { step: 1, title: "Anfrage", description: "Anruf oder WhatsApp – Rückmeldung meist unter 30 Minuten." },
  { step: 2, title: "Besichtigung", description: "Alle Etagen, Keller, Dachboden, Garage – kostenlos vor Ort." },
  { step: 3, title: "Festpreis", description: "Schriftliches Angebot für das gesamte Haus." },
  { step: 4, title: "Räumung", description: "1–3 Tage. Übergabe besenrein, Schlüsselrückgabe möglich." },
];

const priceFactors = [
  "Wohnfläche und Anzahl Etagen",
  "Keller, Dachboden, Garage, Nebengebäude",
  "Volumen in m³",
  "Demontage von Einbauten oder Heizung",
  "Sondermüll (Heizöl, Altöl, Chemie)",
  "Garten- oder Außenbereich",
];

const targetGroups = [
  { title: "Hausverkäufer", description: "Besenreine Übergabe vor Notartermin – auch kurzfristig." },
  { title: "Erben", description: "Klare Abwicklung, Wertsachen und Dokumente werden gesondert übergeben." },
  { title: "Vermieter", description: "Räumung zwischen Mieterwechseln, auch bei zurückgelassenem Hausrat." },
  { title: "Bauherren & Abrissfirmen", description: "Vor Sanierung oder Abriss komplett leeres Gebäude." },
];

const whyUsPoints = [
  "2–3 Transporter parallel für große Häuser",
  "Festpreis schriftlich vor Beginn",
  "Besenreine Übergabe inkl. Keller, Dachboden, Garage",
  "Entsorgungsnachweis auf Wunsch",
  "Schlüsselübergabe direkt an Hausverwaltung oder Käufer möglich",
];

const faqs = [
  {
    question: "Was kostet eine Hausentrümpelung?",
    answer: "Ab 799 €. Ein durchschnittliches Einfamilienhaus liegt bei 1.500–4.000 €, je nach Volumen und Sondermüll. Der Festpreis wird vor Auftrag schriftlich vereinbart.",
  },
  {
    question: "Sind Keller, Dachboden und Garage im Preis enthalten?",
    answer: "Ja. Standardmäßig umfasst eine Hausentrümpelung Wohnräume, Keller, Dachboden und Garage. Garten und Nebengebäude auf Wunsch.",
  },
  {
    question: "Wie lange dauert die Räumung eines Hauses?",
    answer: "Einfamilienhaus: 1–2 Tage mit 3–4 Helfern. Sehr volle Häuser oder mehrere Etagen: bis zu 3 Tagen mit 2–3 Transportern parallel.",
  },
  {
    question: "Geht es auch kurzfristig zum Notartermin?",
    answer: "Ja. Mit 5–7 Tagen Vorlauf ist eine besenreine Übergabe in der Regel möglich. Bei akuten Fällen sprechen Sie uns direkt an.",
  },
  {
    question: "Wie wird der Sperrmüll entsorgt?",
    answer: "Über zugelassene Entsorgungsbetriebe, getrennt nach Sperrmüll, Elektroschrott und Sondermüll. Entsorgungsnachweis auf Wunsch.",
  },
  {
    question: "Räumen Sie auch Garten und Nebengebäude?",
    answer: "Ja. Gartenmöbel, Spielgeräte, Schuppen-Inventar, Pflanzgefäße – einfach bei der Besichtigung mit aufnehmen lassen.",
  },
  ...FAQ_ITEMS.slice(3, 5),
];

export default function HausentruempelungPage() {
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
      introImage={hausentruempelungImage}
      introImageAlt="Mitarbeiter von Sparschwein Entrümpelung lädt Möbel in den Transporter"
      introParagraphs={introParagraphs}
    />
  );
}
