import { SERVICES, FAQ_ITEMS } from "@/lib/seo";
import { ServicePageTemplate } from "./ServicePageTemplate";

import gewerbeentruempelungImage from "@/assets/gewerbeentruempelung.webp?url";

const service = SERVICES.find((s) => s.id === "firmen-gewerbeentruempelung")!;

const introParagraphs = [
  "Wir räumen Büros, Ladenlokale, Lager, Praxen und Gastronomie – auf Wunsch außerhalb der Öffnungszeiten, am Wochenende oder nachts.",
  "Bei Betriebsauflösung, Insolvenz, Standortverlagerung oder Umbau: feste Crew, eigene Fahrzeuge, neutrale LKW auf Wunsch.",
  "IT-Equipment wird datenschutzkonform behandelt, Entsorgungsnachweise gibt es auf Anfrage für Buchhaltung und Behörden.",
];

const detailedDescription = `Eine Gewerbeentrümpelung umfasst die vollständige Räumung von Büros, Ladenlokalen, Lagern, Praxen oder Gastronomiebetrieben inkl. Demontage, Entsorgung und besenreiner Übergabe.

Im Unterschied zur privaten Entrümpelung gelten zusätzliche Anforderungen: laufender Geschäftsbetrieb, Termine außerhalb der Öffnungszeiten, datenschutzkonforme Vernichtung von IT-Equipment und Akten, Entsorgungsnachweise für die Buchhaltung.

Wir arbeiten auf Wunsch nachts oder am Wochenende. Eine Standardbüroetage (200–400 m²) räumen wir in 1–2 Arbeitstagen mit 3–5 Helfern. Größere Lager oder Produktionsflächen werden in mehreren Schichten geplant.

Bei Insolvenz oder gerichtlich angeordneter Räumung reagieren wir kurzfristig und rechnen direkt mit Insolvenzverwalter oder Hausverwaltung ab.`;

const timeInfo = `Termin oft kurzfristig möglich, auch außerhalb der Geschäftszeiten. Räumdauer je nach Fläche und Inventar 1 Tag bis 1 Woche.`;

const disposalInfo = `Bei Gewerbeentrümpelungen fallen typischerweise folgende Materialien an:

• Büromöbel: Schreibtische, Schränke, Stühle, Trennwände
• IT-Equipment: Server, Rechner, Drucker (datenschutzkonform vernichtet)
• Akten: Aktenvernichtung nach DIN 66399 auf Wunsch
• Ladeneinrichtung: Regale, Theken, Kassenanlagen
• Gastronomie-Inventar: Kühlung, Spülmaschinen, Tische, Stühle
• Industrie-Reste: Maschinenteile, Verpackungen, Sondermüll

Entsorgungsnachweise nach Kreislaufwirtschaftsgesetz auf Wunsch direkt zur Anlage in der Buchhaltung.`;

const situations = [
  { title: "Büroauflösung oder Umzug", description: "Etagenweise Räumung außerhalb der Geschäftszeiten." },
  { title: "Geschäftsaufgabe", description: "Komplette Räumung von Verkaufsraum, Lager und Büro." },
  { title: "Lager räumen", description: "Auch Großvolumen mit mehreren Containern und LKW." },
  { title: "Praxis- oder Kanzleiauflösung", description: "Behandlungsräume, Aktenlager und Wartebereiche – auf Wunsch mit Aktenvernichtung." },
  { title: "Gastronomie-Auflösung", description: "Kühlung, Geräte, Inventar – inklusive Demontage." },
  { title: "Insolvenz oder Zwangsräumung", description: "Kurzfristig verfügbar, Abrechnung mit Insolvenzverwalter möglich." },
];

const processSteps = [
  { step: 1, title: "Anfrage", description: "Diskreter Erstkontakt per Telefon oder E-Mail." },
  { step: 2, title: "Besichtigung", description: "Auch außerhalb der Geschäftszeiten oder per Foto-/Videocheck." },
  { step: 3, title: "Festpreis", description: "Schriftliches Angebot inkl. Entsorgungs- und Vernichtungsoptionen." },
  { step: 4, title: "Durchführung", description: "Räumung außerhalb der Öffnungszeiten, am Wochenende oder nachts." },
];

const priceFactors = [
  "Fläche in m²",
  "Art der Einrichtung (Büro, Laden, Gastro, Lager)",
  "Volumen und Anzahl Container",
  "Termin (außerhalb der Geschäftszeiten)",
  "Aktenvernichtung oder IT-Entsorgung",
  "Entsorgungsnachweise gewünscht",
];

const targetGroups = [
  { title: "Unternehmen", description: "Büro-, Lager- oder Standortauflösung inkl. Wochenend-Räumung." },
  { title: "Insolvenzverwalter", description: "Dokumentierte Räumung mit Entsorgungsnachweisen und schneller Abrechnung." },
  { title: "Vermieter von Gewerbeflächen", description: "Räumung zurückgelassenen Inventars für die Neuvermietung." },
  { title: "Praxen & Kanzleien", description: "Diskret, inkl. zertifizierter Aktenvernichtung." },
];

const whyUsPoints = [
  "Termine außerhalb der Geschäftszeiten möglich",
  "Datenschutzkonforme IT-Entsorgung und Aktenvernichtung",
  "Entsorgungsnachweise nach KrWG auf Wunsch",
  "Abrechnung direkt mit Insolvenzverwalter oder Hausverwaltung möglich",
  "Neutrale LKW auf Wunsch",
];

const faqs = [
  {
    question: "Können Sie abends oder am Wochenende räumen?",
    answer: "Ja. Räumungen außerhalb der Öffnungszeiten – abends, nachts oder samstags und sonntags – sind nach Absprache Standard.",
  },
  {
    question: "Stellen Sie Entsorgungsnachweise aus?",
    answer: "Ja. Nachweise nach Kreislaufwirtschaftsgesetz für Buchhaltung und Behörden liefern wir auf Wunsch zusammen mit der Rechnung.",
  },
  {
    question: "Wird IT-Equipment datenschutzkonform vernichtet?",
    answer: "Ja. Festplatten und Datenträger werden physisch zerstört oder zertifiziert gelöscht. Aktenvernichtung erfolgt nach DIN 66399.",
  },
  {
    question: "Was kostet eine Gewerbeentrümpelung?",
    answer: "Auf Anfrage, ab ca. 499 €. Eine Standardbüroetage (200–400 m²) liegt typischerweise bei 1.500–4.000 €. Festpreis nach Besichtigung.",
  },
  ...FAQ_ITEMS.slice(2, 4),
];

export default function GewerbeentruempelungPage() {
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
      introImage={gewerbeentruempelungImage}
      introImageAlt="Fahrer vor LKW bei einer gewerblichen Entrümpelung"
      introParagraphs={introParagraphs}
    />
  );
}
