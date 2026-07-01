import { SERVICES, FAQ_ITEMS } from "@/lib/seo";
import { ServicePageTemplate } from "./ServicePageTemplate";

import haushaltsaufloesungImage from "@/assets/haushaltsaufloesung.webp";

const service = SERVICES.find((s) => s.id === "haushaltsaufloesung")!;

const introParagraphs = [
  "Eine Haushaltsauflösung geht über die reine Entrümpelung hinaus: Wir bewerten Möbel, Antiquitäten und Wertsachen und rechnen sie auf den Festpreis an.",
  "Bei Todesfall, Pflegeheim-Umzug oder Auswanderung sortieren wir vor Ort. Dokumente, Fotos und Wertgegenstände bekommen Sie gesondert übergeben.",
  "Eigene Crew (2–4 Personen), eigene Fahrzeuge, ein Festpreis nach Besichtigung.",
];

const detailedDescription = `Eine Haushaltsauflösung umfasst die vollständige Auflösung eines Haushalts inklusive Bewertung verwertbarer Gegenstände. Sie ist die richtige Wahl nach Todesfall, Umzug ins Pflegeheim, Scheidung oder Auswanderung.

Der Unterschied zur reinen Entrümpelung: Wir prüfen vor Ort, was sich verkaufen, anrechnen oder spenden lässt. Antiquitäten, hochwertige Möbel, Schmuck, Münzen oder Sammlerstücke können den Endpreis spürbar reduzieren – in Einzelfällen komplett ausgleichen.

Bei sensiblen Anlässen wie einem Todesfall sortieren wir behutsam. Persönliche Dokumente, Fotoalben, Briefe und Wertsachen werden separat verpackt und Ihnen oder dem Nachlassverwalter übergeben.

Die typische Auflösung dauert 1–3 Tage. Eine 3-Zimmer-Wohnung räumen wir in der Regel an einem Tag, ein Einfamilienhaus mit Keller und Dachboden in 2–3 Tagen.`;

const timeInfo = `Termin meist innerhalb 2–5 Tagen. Bei dringenden Mietverträgen, Notarterminen oder Erbschaftsfristen reagieren wir kurzfristig. Die Auflösung selbst dauert 1–3 Tage je nach Umfang.`;

const disposalInfo = `Wir bewerten und trennen vor Ort:

• Antiquitäten und Wertsachen: Ankauf oder Anrechnung
• Hochwertige Möbel: Wiederverkauf oder Spende an gemeinnützige Einrichtungen
• Persönliche Dokumente: Fotos, Briefe, Ausweise – gesonderte Übergabe an Sie
• Hausrat & Dekoration: Sortierung und fachgerechte Entsorgung
• Elektrogeräte: zertifiziertes Recycling
• Sondermüll: getrennt und über zugelassene Annahmestellen

Was verwertbar ist, wird verwertet – das senkt Ihre Kosten und ist ökologisch sinnvoll.`;

const situations = [
  { title: "Todesfall in der Familie", description: "Sortierung vor Ort, Dokumente und Wertsachen werden gesondert übergeben." },
  { title: "Umzug ins Pflegeheim", description: "Vollständige Auflösung des bisherigen Haushalts inkl. besenreiner Übergabe." },
  { title: "Scheidung oder Trennung", description: "Neutrale Abwicklung mit klarer Dokumentation." },
  { title: "Auswanderung", description: "Komplette Auflösung des deutschen Haushalts – auch mit kurzem Vorlauf." },
  { title: "Downsizing im Alter", description: "Wir verkleinern: was mitkommt, was verkauft wird, was entsorgt wird." },
  { title: "Zwangsräumung oder Mietrückstand", description: "Kurzfristige Räumung, Abrechnung auf Wunsch über Hausverwaltung." },
];

const processSteps = [
  { step: 1, title: "Erstgespräch", description: "Situation und Zeitrahmen am Telefon oder per WhatsApp klären." },
  { step: 2, title: "Besichtigung", description: "Vor-Ort-Termin innerhalb 24–48 Stunden, kostenlos und unverbindlich." },
  { step: 3, title: "Festpreis mit Anrechnung", description: "Schriftliches Angebot mit Anrechnung verwertbarer Gegenstände." },
  { step: 4, title: "Komplettauflösung", description: "Sortierung, Räumung, Entsorgung, besenreine Übergabe." },
];

const priceFactors = [
  "Wohnungs- oder Hausgröße",
  "Volumen in m³",
  "Anteil verwertbarer Gegenstände",
  "Etage und Aufzug",
  "Sondermüll",
  "Zeitdruck oder fester Übergabetermin",
];

const targetGroups = [
  { title: "Hinterbliebene", description: "Behutsame Auflösung nach Todesfall mit Übergabe persönlicher Dinge." },
  { title: "Angehörige von Pflegeheimbewohnern", description: "Auflösung des bisherigen Haushalts inkl. Schlüsselrückgabe." },
  { title: "Erbengemeinschaften", description: "Neutrale Abwicklung, auf Wunsch mit Fotodokumentation." },
  { title: "Auswanderer", description: "Komplette Auflösung mit kurzem Vorlauf – auch Containerverladung möglich." },
];

const whyUsPoints = [
  "Anrechnung von Antiquitäten und Wertsachen auf den Festpreis",
  "Persönliche Dokumente und Fotos werden gesondert übergeben",
  "Eigene Crew, eigene Fahrzeuge – keine Vermittlung",
  "Festpreis schriftlich vor Auftragsstart",
  "Behutsamer Umgang bei Todesfall und sensiblen Anlässen",
];

const faqs = [
  {
    question: "Was unterscheidet Haushaltsauflösung von Entrümpelung?",
    answer: "Bei einer Haushaltsauflösung bewerten wir Möbel, Antiquitäten und Wertsachen und rechnen sie auf den Festpreis an. Eine reine Entrümpelung konzentriert sich auf Räumung und Entsorgung.",
  },
  {
    question: "Kaufen Sie Möbel oder Antiquitäten an?",
    answer: "Ja. Gut erhaltene Möbel, Antiquitäten, Schmuck und Sammlerstücke werden angekauft oder auf den Festpreis angerechnet – das senkt Ihre Kosten.",
  },
  {
    question: "Wie gehen Sie mit persönlichen Gegenständen um?",
    answer: "Dokumente, Fotos und Briefe werden separat verpackt und Ihnen übergeben. Im Zweifel fragen wir nach, bevor etwas entsorgt wird.",
  },
  {
    question: "Was kostet eine Haushaltsauflösung?",
    answer: "Ab 399 €. Eine 3-Zimmer-Wohnung liegt typischerweise bei 800–1.800 €, ein Einfamilienhaus bei 1.500–4.000 €. Verwertbare Gegenstände können den Preis reduzieren.",
  },
  {
    question: "Können Sie bei Erbstreitigkeiten neutral abwickeln?",
    answer: "Ja. Wir dokumentieren auf Wunsch alle Gegenstände per Fotoliste. Bei Streitigkeiten sollten alle Parteien anwesend sein oder sich vorab schriftlich einigen.",
  },
  {
    question: "Wie lange dauert eine Haushaltsauflösung?",
    answer: "Wohnung: 1–2 Tage. Einfamilienhaus mit Keller und Dachboden: 2–3 Tage. Genaue Dauer nach Besichtigung.",
  },
  ...FAQ_ITEMS.slice(0, 2),
];

export default function HaushaltsaufloesungPage() {
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
      introImage={haushaltsaufloesungImage}
      introImageAlt="Fachmann trägt Säcke bei einer Haushaltsauflösung aus der Wohnung"
      introParagraphs={introParagraphs}
    />
  );
}
