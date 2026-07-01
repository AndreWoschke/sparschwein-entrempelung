import { SERVICES, FAQ_ITEMS } from "@/lib/seo";
import { ServicePageTemplate } from "./ServicePageTemplate";

import schrottabholungImage from "@/assets/schrottabholung.webp";

const service = SERVICES.find((s) => s.id === "schrottabholung")!;

const introParagraphs = [
  "Wir holen Altmetall direkt bei Ihnen ab: Eisen, Stahl, Kupfer, Aluminium, Messing, Elektroschrott und Haushaltsgeräte.",
  "Ab einer größeren Menge (Faustregel: mehr als ein Transporter halb voll) ist die Abholung kostenlos. Bei Kleinstmengen fällt eine Anfahrtspauschale von 20 € an.",
  "Alles geht ins zertifizierte Recycling – Sie sparen sich die Fahrt zum Wertstoffhof.",
];

const detailedDescription = `Eine Schrottabholung umfasst das Abholen und fachgerechte Recycling von Altmetallen aller Art. Bei größeren Mengen Eisen, Stahl, Kupfer oder Aluminium ist die Abholung für Sie kostenlos – wir verwerten den Schrott.

Typische Anlässe: Heizungstausch (alte Heizkörper und Rohre), Renovierung, Garagenauflösung, Fahrradkeller, alte Haushaltsgeräte (Waschmaschine, Trockner, Gefriertruhe). Auch im Rahmen einer Entrümpelung nehmen wir den anfallenden Schrott direkt mit – das kann den Gesamtpreis der Entrümpelung reduzieren.

Bei sehr kleinen Mengen (z. B. ein einzelner Heizkörper) fällt eine Anfahrtspauschale von 20 € an. Sortenreines Kupfer, Messing oder Aluminium kann angerechnet werden.

Aller Schrott wird über zugelassene Recyclingbetriebe verwertet. Elektroschrott geht in die zertifizierte Demontage nach ElektroG.`;

const timeInfo = `Termine meist innerhalb 24–48 Stunden. Bei größeren Mengen koordinieren wir kurzfristig einen passenden Transporter.`;

const disposalInfo = `Aller Schrott wird umweltgerecht verwertet:

• Eisen & Stahl: Einschmelzen und Wiederverwertung
• Kupfer, Aluminium, Messing: hochwertiges Recycling mit Anrechnung möglich
• Elektroschrott: zertifizierte Demontage nach ElektroG
• Weiße Ware: Kühlschrank, Waschmaschine, Trockner, Gefriertruhe
• Heizkörper, Rohre, Boiler, Fahrräder, Metallregale

Recycling von Metall spart bis zu 95 % der Energie gegenüber Neuproduktion.`;

const situations = [
  { title: "Altmetall im Keller oder Garten", description: "Heizkörper, Rohre, Zäune, Werkzeug – kostenlos bei größeren Mengen." },
  { title: "Elektrogroßgeräte", description: "Waschmaschine, Kühlschrank, Trockner – zertifiziertes Recycling." },
  { title: "Fahrräder und Metallmöbel", description: "Auch rostige Räder und alte Metallregale werden mitgenommen." },
  { title: "Nach Entrümpelung", description: "Schrott aus einer Räumung wird separat abgeholt." },
  { title: "Heizungstausch oder Renovierung", description: "Alte Heizkörper, Kupferrohre und Boiler – Abholung im Anschluss." },
  { title: "Gewerblicher Schrott", description: "Produktionsreste, Maschinenteile, Büromöbel aus Metall." },
];

const processSteps = [
  { step: 1, title: "Anfrage", description: "Anruf oder WhatsApp mit kurzer Beschreibung und Foto." },
  { step: 2, title: "Termin", description: "Abholtermin meist innerhalb 24–48 Stunden." },
  { step: 3, title: "Abholung", description: "Bei größeren Mengen kostenlos, bei Kleinstmengen 20 € Pauschale." },
  { step: 4, title: "Recycling", description: "Umweltgerechte Verwertung über zertifizierte Betriebe." },
];

const priceFactors = [
  "Art des Schrotts (Eisen, Kupfer, Alu, Messing)",
  "Menge und Gewicht",
  "Sortenrein oder gemischt",
  "Zugänglichkeit (Erdgeschoss, Keller, Garten)",
  "Kleinstmenge: 20 € Anfahrtspauschale",
  "Größere Menge: kostenlos",
];

const targetGroups = [
  { title: "Privatpersonen", description: "Schrott im Keller oder Garten – kostenlose Abholung ab größerer Menge." },
  { title: "Handwerker und Baustellen", description: "Metallreste aus Renovierung oder Heizungstausch – kurzfristige Abholung." },
  { title: "Unternehmen", description: "Produktionsreste, Maschinenteile, regelmäßige Touren möglich." },
];

const whyUsPoints = [
  "Kostenlose Abholung bei größeren Mengen Altmetall",
  "Kein eigener Weg zum Wertstoffhof nötig",
  "Zertifiziertes Recycling nach ElektroG",
  "Auch Elektrogroßgeräte und Heizkörper",
  "Termine in der Regel innerhalb 24–48 Stunden",
];

const faqs = [
  {
    question: "Was kostet die Schrottabholung?",
    answer: "Bei größeren Mengen Altmetall kostenlos. Bei Kleinstmengen oder stark gemischtem Schrott fällt eine Anfahrtspauschale von 20 € an.",
  },
  {
    question: "Welchen Schrott holen Sie ab?",
    answer: "Eisen, Stahl, Kupfer, Aluminium, Messing, Elektroschrott, Haushaltsgeräte, Heizkörper, Rohre, Fahrräder, Metallmöbel. Bei Unsicherheit einfach Foto per WhatsApp schicken.",
  },
  {
    question: "Muss der Schrott vorsortiert sein?",
    answer: "Nein. Wir übernehmen die Sortierung. Sortenreines Kupfer oder Messing kann allerdings angerechnet werden.",
  },
  {
    question: "Holen Sie auch Elektrogroßgeräte ab?",
    answer: "Ja. Waschmaschinen, Kühlschränke, Trockner und Gefriertruhen werden nach ElektroG zertifiziert recycelt.",
  },
  {
    question: "Wie schnell ist eine Abholung möglich?",
    answer: "Termine meist innerhalb 24–48 Stunden. Bei festen Bauterminen koordinieren wir auch konkrete Uhrzeiten.",
  },
  ...FAQ_ITEMS.slice(4, 6),
];

export default function SchrottabholungPage() {
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
      introImage={schrottabholungImage}
      introImageAlt="Team von Sparschwein Entrümpelung bei der Schrottabholung mit altem Fahrrad"
      introParagraphs={introParagraphs}
    />
  );
}
