import { SERVICES, FAQ_ITEMS } from "@/lib/seo";
import { ServicePageTemplate } from "./ServicePageTemplate";

import dachbodenentruempelungImage from "@/assets/dachbodenentruempelung.webp";

const service = SERVICES.find((s) => s.id === "dachbodenentruempelung")!;

const introParagraphs = [
  "Wir räumen Dachböden und Speicher in 2–4 Stunden – Koffer, Möbel, Kartons, Weihnachtsdeko, alte Spielsachen.",
  "Enge Bodenluken, steile Treppen, niedrige Decken oder fehlende Beleuchtung gehören für uns zum Standardfall.",
  "Auf Wunsch nehmen wir Dämmreste und Glaswolle direkt mit – fachgerecht verpackt und entsorgt.",
];

const detailedDescription = `Eine Dachbodenentrümpelung umfasst das vollständige Leerräumen von Speicher, Spitzboden oder ausgebautem Dachgeschoss. Typische Volumina liegen bei 3–20 m³.

Die meisten Dachböden räumen wir mit zwei Helfern in 2–4 Stunden. Bei sehr vollen Dachböden oder schmaler Bodenluke planen wir einen halben Arbeitstag. Schwere Möbel werden bei Bedarf vor Ort zerlegt, um durch die Luke zu passen.

Vor Dachausbau oder Dämmsanierung muss der Dachboden komplett leer sein – einschließlich alter Dämmwolle und Pappdämmung. Wir tragen das in geschlossenen Säcken nach unten und liefern auf Wunsch einen Entsorgungsnachweis.

Bei Erbschaft oder Hausverkauf sortieren wir Fundstücke (alte Fotos, Dokumente, Schmuck) heraus und übergeben sie Ihnen separat.`;

const timeInfo = `Termine meist innerhalb 24–48 Stunden. Räumdauer 2–4 Stunden, bei sehr vollen Dachböden oder schwierigem Zugang bis zu einem halben Tag.`;

const disposalInfo = `Auf Dachböden lagert oft ein bunter Mix:

• Möbel: alte Schränke, Sessel, Tische
• Koffer und Reisetaschen
• Kartons: Bücher, Kleidung, Geschirr, Erinnerungsstücke
• Saisonware: Weihnachtsdeko, Christbaumschmuck, Spielzeug
• Dämmmaterial: Glaswolle, Steinwolle, Pappdämmung (fachgerecht verpackt)
• Elektroschrott: alte Fernseher, Radios, Kleingeräte

Verwertbares wird gespendet oder verkauft – das kann den Preis senken.`;

const situations = [
  { title: "Dachboden überfüllt", description: "Mehrere Generationen Hausrat – wir sortieren und schaffen Platz." },
  { title: "Dachausbau geplant", description: "Komplette Räumung inkl. alter Dämmung vor dem Handwerker." },
  { title: "Hausverkauf oder Übergabe", description: "Käufer erwarten einen leeren Dachboden – besenrein zum Notartermin." },
  { title: "Enge Treppe oder Luke", description: "Möbel werden bei Bedarf zerlegt – nichts bleibt liegen." },
  { title: "Nachlass sortieren", description: "Wir suchen Dokumente und Erinnerungsstücke heraus und übergeben sie Ihnen." },
  { title: "Vor Dämmung oder Sanierung", description: "Alte Glaswolle und Pappdämmung werden fachgerecht entsorgt." },
];

const processSteps = [
  { step: 1, title: "Anfrage", description: "Anruf oder WhatsApp – Rückmeldung meist unter 30 Minuten." },
  { step: 2, title: "Vor-Ort-Check", description: "Zugang, Bodenluke, Stehhöhe und Menge prüfen – kostenlos." },
  { step: 3, title: "Festpreis", description: "Schriftliches Angebot vor Auftragsstart." },
  { step: 4, title: "Räumung", description: "Abtransport und fachgerechte Entsorgung an einem Termin." },
];

const priceFactors = [
  "Dachbodenfläche in m²",
  "Füllstand und Volumen in m³",
  "Zugang über Treppe oder Bodenluke",
  "Stehhöhe und Begehbarkeit",
  "Schwere Möbel oder Demontage nötig",
  "Dämmmaterial wie Glaswolle",
];

const targetGroups = [
  { title: "Eigenheimbesitzer", description: "Mehr Platz oder Vorbereitung für Dachausbau." },
  { title: "Hausverkäufer", description: "Besenreine Übergabe vor Notartermin." },
  { title: "Erben", description: "Sortierung von Dokumenten und Wertsachen vor der Räumung." },
];

const whyUsPoints = [
  "Erfahrung mit engen Bodenluken und steilen Treppen",
  "Demontage von Möbeln vor Ort, wenn nötig",
  "Dämmreste und Glaswolle fachgerecht verpackt und entsorgt",
  "Festpreis vor Beginn, schriftlich",
  "Termine in der Regel innerhalb 24–48 Stunden",
];

const faqs = [
  {
    question: "Schaffen Sie den Transport durch enge Luken?",
    answer: "Ja. Bei Bedarf zerlegen wir Möbel vor Ort, damit sie durch die Bodenluke passen. Auch steile Treppen und niedrige Decken sind kein Hindernis.",
  },
  {
    question: "Was kostet eine Dachbodenentrümpelung?",
    answer: "Ab 99 €. Ein durchschnittlicher Dachboden liegt typischerweise bei 200–600 €, je nach Volumen und Zugang. Festpreis nach Besichtigung.",
  },
  {
    question: "Wie lange dauert eine Dachbodenentrümpelung?",
    answer: "2–4 Stunden mit zwei Helfern. Bei sehr vollen Dachböden oder schwieriger Bodenluke bis zu einem halben Tag.",
  },
  {
    question: "Entsorgen Sie Glaswolle und Dämmmaterial?",
    answer: "Ja. Alte Glas- und Steinwolle wird in geschlossenen Säcken transportiert und über zertifizierte Annahmestellen entsorgt. Entsorgungsnachweis auf Wunsch.",
  },
  ...FAQ_ITEMS.slice(4, 6),
];

export default function DachbodenentruempelungPage() {
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
      introImage={dachbodenentruempelungImage}
      introImageAlt="Mitarbeiter trägt verpackte Möbel durch enge Tür bei einer Dachbodenräumung"
      introParagraphs={introParagraphs}
    />
  );
}
