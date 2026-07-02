import { SERVICES, FAQ_ITEMS } from "@/lib/seo";
import { ServicePageTemplate } from "./ServicePageTemplate";

import wohnungsentruempelungImage from "@/assets/wohnungsentruempelung.webp";

const service = SERVICES.find((s) => s.id === "wohnungsentruempelung")!;

const introParagraphs = [
  "Wenn eine Wohnung übergeben werden muss, zählt jede Stunde. Wir räumen 1- bis 4-Zimmer-Wohnungen in 4–8 Stunden komplett – Möbel, Hausrat, Elektrogeräte, Teppiche.",
  "Übergabe an Vermieter oder Käufer: besenrein, ohne Nacharbeiten. Wir kommen mit eigener Crew (2–4 Personen) und eigenem Transporter.",
  "Sie bekommen einen festen Ansprechpartner vom Anruf bis zur Schlüsselübergabe – ohne Vermittlung, ohne Subunternehmer.",
  "Ob in Falkensee, Nauen, Brieselang oder im übrigen Havelland: Ihre Wohnungsentrümpelung führen wir zum Festpreis ab 299 € durch – ohne Anfahrtskosten, mit Termin meist innerhalb 24–48 Stunden.",
];

const detailedDescription = `Eine Wohnungsentrümpelung umfasst das vollständige Leerräumen einer Wohnung inklusive Demontage, Abtransport und Entsorgung. Im Unterschied zum Umzugsunternehmen tragen wir nichts ins neue Zuhause, sondern in den Container – fachgerecht getrennt nach Sperrmüll, Elektroschrott und Sondermüll.

Eine typische 2- bis 3-Zimmer-Wohnung (50–80 m²) räumen wir in 4–6 Stunden mit zwei Personen. Bei 4 Zimmern oder dichter Belegung planen wir einen ganzen Tag und drei Helfer ein. Aufzug verkürzt die Räumzeit deutlich; ohne Aufzug rechnen wir bei höheren Etagen 10–20 % Zuschlag in der Kalkulation ein – nicht im Nachgang.

Bei Mietende, Verkauf oder Erbschaft endet der Auftrag mit der besenreinen Übergabe. Schlüssel direkt an Vermieter oder Hausverwaltung möglich, wenn Sie nicht selbst vor Ort sein können.

Bei Todesfall oder Umzug ins Pflegeheim sortieren wir vor Ort, fragen im Zweifel nach und übergeben Dokumente, Fotos und Wertsachen gesondert.`;

const timeInfo = `Termin meist innerhalb 24–48 Stunden. Bei dringender Mietendübergabe arbeiten wir auch samstags. Die Räumung selbst dauert je nach Wohnungsgröße zwischen 4 Stunden und einem Tag.`;

const disposalInfo = `Wir trennen direkt vor Ort und entsorgen über zugelassene Betriebe – auf Wunsch mit Entsorgungsnachweis:

• Sperrmüll: Sofas, Schränke, Matratzen, Teppiche
• Elektroschrott: Kühlschrank, Waschmaschine, Fernseher, Kleingeräte
• Sondermüll: Farben, Lacke, Batterien, Medikamente, Leuchtstoffröhren
• Verwertbares: Spende an gemeinnützige Einrichtungen oder Wiederverkauf – das kann den Preis senken

Sie kümmern sich um nichts: keine eigene Sperrmüllanmeldung, kein Container vor der Tür, keine Wertstoffhof-Fahrten.`;

const situations = [
  {
    title: "Umzug in kleinere Wohnung",
    description: "Was nicht mitkommt, geht direkt in den Transporter – ohne Zwischenlagerung.",
  },
  {
    title: "Wohnungsauflösung nach Todesfall",
    description: "Sortierung vor Ort, persönliche Gegenstände gesondert. Wir nehmen Rücksicht.",
  },
  {
    title: "Mietwohnung besenrein übergeben",
    description: "Festtermin zur Schlüsselübergabe? Wir richten uns nach Ihrem Notar- oder Mietendtermin.",
  },
  {
    title: "Messie-Wohnung entrümpeln",
    description: "Auch bei starker Vermüllung. Vertraulich, ohne Wertung, mit Schutzkleidung.",
  },
  {
    title: "Vor Renovierung oder Sanierung",
    description: "Wohnung leer vor den Handwerkern – Boden und Wände komplett frei.",
  },
  {
    title: "Umzug ins Pflegeheim",
    description: "Wir lösen die bisherige Wohnung auf, Erinnerungsstücke bekommen Sie übergeben.",
  },
];

const processSteps = [
  { step: 1, title: "Anfrage", description: "Anruf oder WhatsApp. Rückmeldung in der Regel unter 30 Minuten." },
  { step: 2, title: "Besichtigung", description: "Kostenloser Vor-Ort-Termin innerhalb 24–48 Stunden." },
  { step: 3, title: "Festpreis", description: "Verbindliches Angebot vor Auftragsstart – schriftlich." },
  { step: 4, title: "Räumung & Übergabe", description: "Räumung, Entsorgung, besenreine Übergabe an einem Termin." },
];

const priceFactors = [
  "Wohnungsgröße in m² oder Zimmerzahl",
  "Etage und Aufzug",
  "Volumen in m³ (grobe Schätzung beim Termin)",
  "Demontage von Einbauten oder Möbeln",
  "Sondermüll wie Farben, Lacke, Chemikalien",
  "Wertanrechnung verwertbarer Gegenstände",
];

const targetGroups = [
  { title: "Privatpersonen", description: "Umzug, Verkleinerung oder Todesfall – ein Ansprechpartner für alles." },
  { title: "Vermieter & Hausverwaltungen", description: "Schnelle Räumung zwischen Mieterwechseln, auf Wunsch mit Schlüsselübergabe." },
  { title: "Erbengemeinschaften", description: "Neutrale Abwicklung mit klarer Dokumentation – auch bei mehreren Erben." },
  { title: "Sozialdienste & Betreuer", description: "Abrechnung über Rechnung möglich, auch bei Heimumzügen mit kurzer Vorlaufzeit." },
];

const whyUsPoints = [
  "Eigene Crew und Transporter – kein Vermittlerportal",
  "Festpreis vor Beginn, keine Nachforderung",
  "Besenreine Übergabe inklusive",
  "Entsorgungsnachweis auf Wunsch",
  "Termine in der Regel innerhalb 24–48 Stunden",
];

const faqs = [
  {
    question: "Was kostet eine Wohnungsentrümpelung?",
    answer: "Ab 299 € für kleine Wohnungen. Eine 2-Zimmer-Wohnung liegt typischerweise bei 400–800 €, abhängig von Größe, Etage und Volumen. Der Festpreis wird vor Auftrag schriftlich vereinbart.",
  },
  {
    question: "Wie lange dauert eine Wohnungsentrümpelung?",
    answer: "2–3 Zimmer: 4–6 Stunden mit zwei Helfern. 4 Zimmer oder dichte Belegung: bis zu einem Arbeitstag. Den genauen Zeitrahmen nennen wir nach der Besichtigung.",
  },
  {
    question: "Muss ich bei der Räumung anwesend sein?",
    answer: "Nein. Schlüsselübergabe vorab oder über die Hausverwaltung ist möglich. Wir dokumentieren den Zustand bei Beginn und nach der Übergabe.",
  },
  {
    question: "Entsorgen Sie auch Elektrogeräte und Sondermüll?",
    answer: "Ja. Kühlschränke, Waschmaschinen, Fernseher gehen ins zertifizierte Recycling. Farben, Lacke, Batterien und Medikamente werden separat als Sondermüll entsorgt.",
  },
  {
    question: "Was passiert mit verwertbaren Möbeln?",
    answer: "Gut erhaltene Möbel werden gespendet oder weiterverkauft. Wertvolle Stücke rechnen wir an und reduzieren so Ihren Endpreis.",
  },
  {
    question: "Wie schnell ist ein Termin möglich?",
    answer: "In der Regel innerhalb 24–48 Stunden. Bei festem Mietende oder Notartermin arbeiten wir auf Wunsch auch samstags.",
  },
  {
    question: "Räumen Sie auch Messie-Wohnungen?",
    answer: "Ja. Wir arbeiten mit Schutzkleidung und ohne Wertung. Die Anfrage bleibt vertraulich, auf Wunsch mit neutralem Fahrzeug.",
  },
  {
    question: "Was kostet eine Wohnungsentrümpelung pro Quadratmeter?",
    answer: "Wir rechnen nicht pauschal pro m², sondern nach Volumen, Etage und Aufwand – das ist für Sie meist günstiger. Als Orientierung: Eine 60-m²-Wohnung liegt üblicherweise zwischen 400 und 800 €. Den verbindlichen Festpreis nennen wir nach der kostenlosen Besichtigung.",
  },
  {
    question: "Bieten Sie Wohnungsentrümpelung mit Wertanrechnung an?",
    answer: "Ja. Gut erhaltene Möbel, Elektrogeräte oder Sammlerstücke rechnen wir an und ziehen den Wert vom Festpreis ab. So wird Ihre Wohnungsentrümpelung teils deutlich günstiger.",
  },
  {
    question: "Entrümpeln Sie Wohnungen im gesamten Havelland?",
    answer: "Ja – von Brieselang und Falkensee über Nauen und Wustermark bis ins westliche Havelland. Innerhalb unseres Einsatzgebiets berechnen wir keine Anfahrtskosten, weder zur Besichtigung noch zur Räumung.",
  },
  ...FAQ_ITEMS.slice(0, 2),
];

export default function WohnungsentruempelungPage() {
  return (
    <ServicePageTemplate
      service={service}
      h1="Wohnungsentrümpelung im Havelland – Festpreis & besenrein"
      faqs={faqs}
      situations={situations}
      processSteps={processSteps}
      priceFactors={priceFactors}
      detailedDescription={detailedDescription}
      disposalInfo={disposalInfo}
      targetGroups={targetGroups}
      whyUsPoints={whyUsPoints}
      timeInfo={timeInfo}
      introImage={wohnungsentruempelungImage}
      introImageAlt="Entrümpler vor vollbeladenem Transporter bei einer Wohnungsentrümpelung"
      introParagraphs={introParagraphs}
    />
  );
}
