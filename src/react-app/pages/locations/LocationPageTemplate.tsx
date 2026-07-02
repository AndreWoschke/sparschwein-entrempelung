import {
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Clock,
  Truck,
  Users,
  Shield,
  Home,
  Building2,
  Warehouse,
  Package,
  Star,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  COMPANY_INFO,
  SERVICES,
  REGIONS,
  REVIEWS,
  LOCATION_DATA,
  generateBreadcrumbSchema,
  generateLocationSchema,
  generateLocalBusinessSchema,
  generateFAQSchema,
  generateReviewSchema,
} from "@/lib/seo";
import brieselangVorherNachher from "@/assets/entruempelung-brieselang-vorher-nachher.webp";
import brieselangTeam from "@/assets/sparschwein-team-brieselang-moebelabtransport.webp";
import falkenseeKellerTeam from "@/assets/entruempelung-falkensee-keller-team.webp";
import falkenseeVorherNachher from "@/assets/haushaltsaufloesung-falkensee-vorher-nachher.webp";
import dallgowTeamTransporter from "@/assets/haushaltsaufloesung-dallgow-team-transporter.webp";
import dallgowGarageVorherNachher from "@/assets/entruempelung-dallgow-garage-vorher-nachher.webp";
import nauenGarageVorherNachher from "@/assets/wohnungsaufloesung-nauen-garage-vorher-nachher.webp";
import nauenTeamKeller from "@/assets/entruempelung-nauen-team-keller.webp";
import wustermarkKlaviertransport from "@/assets/haushaltsaufloesung-wustermark-klaviertransport.webp";
import wustermarkDachbodenVorherNachher from "@/assets/entruempelung-wustermark-dachboden-vorher-nachher.webp";
import rathenowVorherNachher from "@/assets/haushaltsaufloesung-rathenow-vorher-nachher.webp";
import rathenowTeamTransporter from "@/assets/entruempelung-rathenow-team-transporter.webp";
import premnitzTeamMoebel from "@/assets/wohnungsaufloesung-premnitz-team-moebelabtransport.webp";
import premnitzKellerVorherNachher from "@/assets/entruempelung-premnitz-keller-vorher-nachher.webp";
import friesackKellerVorherNachher from "@/assets/entruempelung-friesack-keller-vorher-nachher.webp";
import friesackTeamHaushalt from "@/assets/kellerentruempelung-friesack-team-haushaltsaufloesung.webp";
import schoenwaldeVorherNachher from "@/assets/haushaltsaufloesung-schoenwalde-glien-vorher-nachher.webp";
import schoenwaldeTeamTransporter from "@/assets/entruempelung-schoenwalde-glien-team-transporter.webp";
import ketzinVorherNachher from "@/assets/haushaltsaufloesung-ketzin-vorher-nachher.webp";
import ketzinTeamMoebel from "@/assets/entruempelung-ketzin-team-moebeltransport.webp";
import paulinenaueVorherNachher from "@/assets/haushaltsaufloesung-paulinenaue-vorher-nachher.webp";
import paulinenaueTeamTransporter from "@/assets/entruempelung-paulinenaue-team-transporter.webp";
import havellandTeamRaeumung from "@/assets/entruempelung-havelland-team-raeumungsservice.webp";
import oranienburgMoebelabtransport from "@/assets/entruempelung-oranienburg-moebelabtransport.webp";
import werderVorherNachher from "@/assets/entruempelung-werder-havel-vorher-nachher.webp";
import hennigsdorfTeamTransporter from "@/assets/entruempelung-hennigsdorf-team-transporter.webp";
import veltenKellerTeam from "@/assets/entruempelung-velten-keller-team.webp";
import veltenHaushaltVorherNachher from "@/assets/haushaltsaufloesung-velten-vorher-nachher.webp";

// Region-spezifische Bildergalerien (authentische Einsätze vor Ort)
const REGION_GALLERIES: Record<
  string,
  { src: string; alt: string; caption: string }[]
> = {
  brieselang: [
    {
      src: brieselangVorherNachher,
      alt: "Vorher-Nachher: Wohnungsentrümpelung in Brieselang mit besenreiner Übergabe",
      caption: "Vorher / Nachher – Wohnungsauflösung in Brieselang, besenrein übergeben.",
    },
    {
      src: brieselangTeam,
      alt: "Sparschwein Entrümpelung Team aus Brieselang beim Möbelabtransport",
      caption: "Unser eigenes Team beim Möbelabtransport – keine Vermittlung, keine Subunternehmer.",
    },
  ],
  falkensee: [
    {
      src: falkenseeVorherNachher,
      alt: "Vorher-Nachher: Kellerentrümpelung in Falkensee mit fachgerechter Entsorgung",
      caption: "Vorher / Nachher – Kellerräumung in Falkensee, vollständig entrümpelt.",
    },
    {
      src: falkenseeKellerTeam,
      alt: "Sparschwein Entrümpelung Team bei Haushaltsauflösung in Falkensee",
      caption: "Unser Team bei einer Haushaltsauflösung in Falkensee – zuverlässig und persönlich.",
    },
  ],
  "dallgow-doeberitz": [
    {
      src: dallgowGarageVorherNachher,
      alt: "Vorher-Nachher: Garagenentrümpelung in Dallgow-Döberitz mit Festpreis",
      caption: "Vorher / Nachher – Garagen- und Kellerräumung in Dallgow-Döberitz.",
    },
    {
      src: dallgowTeamTransporter,
      alt: "Sparschwein Entrümpelung Team beim Verladen in Dallgow-Döberitz",
      caption: "Unser Team beim sicheren Verladen – eigene Fahrzeuge, eigene Mitarbeiter.",
    },
  ],
  nauen: [
    {
      src: nauenGarageVorherNachher,
      alt: "Vorher-Nachher: Wohnungsauflösung in Nauen mit Möbeltransport und Entsorgung",
      caption: "Vorher / Nachher – Garagen- und Wohnungsauflösung in Nauen, vollständig geräumt.",
    },
    {
      src: nauenTeamKeller,
      alt: "Sparschwein Entrümpelung Team bei professioneller Entrümpelung in Nauen",
      caption: "Unser Team bei einer Entrümpelung in Nauen – kostenlose Besichtigung vor Ort.",
    },
  ],
  rathenow: [
    {
      src: rathenowVorherNachher,
      alt: "Vorher-Nachher: Haushaltsauflösung in Rathenow mit besenreiner Übergabe",
      caption: "Vorher / Nachher – Haushaltsauflösung in Rathenow, vollständig geräumt und besenrein übergeben.",
    },
    {
      src: rathenowTeamTransporter,
      alt: "Sparschwein Entrümpelung Team beim Möbelabtransport in Rathenow",
      caption: "Unser Team beim Abtransport alter Möbel in Rathenow – eigene Fahrzeuge, eigene Mitarbeiter.",
    },
  ],
  premnitz: [
    {
      src: premnitzKellerVorherNachher,
      alt: "Vorher-Nachher: Kellerentrümpelung in Premnitz mit fachgerechter Entsorgung",
      caption: "Vorher / Nachher – Kellerentrümpelung in Premnitz, vollständig geräumt und besenrein übergeben.",
    },
    {
      src: premnitzTeamMoebel,
      alt: "Sparschwein Entrümpelung Team bei Wohnungsauflösung in Premnitz mit Möbelabtransport",
      caption: "Unser Team bei einer Wohnungsauflösung in Premnitz – inklusive Entsorgung und Möbeltransport.",
    },
  ],
  friesack: [
    {
      src: friesackKellerVorherNachher,
      alt: "Vorher-Nachher: Kellerentrümpelung in Friesack mit schneller Räumung",
      caption: "Vorher / Nachher – Keller- und Hauswirtschaftsraum in Friesack, sauber geräumt.",
    },
    {
      src: friesackTeamHaushalt,
      alt: "Sparschwein Entrümpelung Team bei Haushaltsauflösung in Friesack",
      caption: "Unser Team bei einer Haushaltsauflösung in Friesack – sorgfältig und persönlich vor Ort.",
    },
  ],
  wustermark: [
    {
      src: wustermarkDachbodenVorherNachher,
      alt: "Vorher-Nachher: Dachbodenentrümpelung in Wustermark mit schneller Durchführung",
      caption: "Vorher / Nachher – Dachbodenentrümpelung in Wustermark, sauber geräumt.",
    },
    {
      src: wustermarkKlaviertransport,
      alt: "Sparschwein Entrümpelung Team bei Haushaltsauflösung in Wustermark",
      caption: "Unser Team bei einer Haushaltsauflösung in Wustermark – sicherer Möbeltransport inklusive.",
    },
  ],
  "schoenwalde-glien": [
    {
      src: schoenwaldeVorherNachher,
      alt: "Vorher-Nachher: Haushaltsauflösung in Schönwalde-Glien mit zuverlässigem Räumungsteam",
      caption: "Vorher / Nachher – Haushaltsauflösung in Schönwalde-Glien, vollständig geräumt und besenrein übergeben.",
    },
    {
      src: schoenwaldeTeamTransporter,
      alt: "Sparschwein Entrümpelung Team mit Transporter bei Entrümpelung in Schönwalde-Glien",
      caption: "Unser Team in Schönwalde-Glien – Festpreis nach kostenloser Besichtigung, eigene Fahrzeuge.",
    },
  ],
  ketzin: [
    {
      src: ketzinVorherNachher,
      alt: "Vorher-Nachher: Haushaltsauflösung in Ketzin/Havel mit sauberer und schneller Räumung",
      caption: "Vorher / Nachher – Haushaltsauflösung in Ketzin/Havel, sauber und vollständig geräumt.",
    },
    {
      src: ketzinTeamMoebel,
      alt: "Sparschwein Entrümpelung Team beim Möbeltransport in Ketzin/Havel",
      caption: "Unser Team beim sicheren Möbelabtransport in Ketzin/Havel – inklusive Entsorgung.",
    },
  ],
  paulinenaue: [
    {
      src: paulinenaueVorherNachher,
      alt: "Vorher-Nachher: Haushaltsauflösung in Paulinenaue mit Abtransport und Festpreis",
      caption: "Vorher / Nachher – Haushaltsauflösung in Paulinenaue, vollständig geräumt zum Festpreis.",
    },
    {
      src: paulinenaueTeamTransporter,
      alt: "Sparschwein Entrümpelung Team beim Verladen in Paulinenaue",
      caption: "Unser Team in Paulinenaue – Entrümpelung für Wohnung, Haus, Keller und Garage.",
    },
  ],
  hennigsdorf: [
    {
      src: hennigsdorfTeamTransporter,
      alt: "Entrümpelung in Hennigsdorf mit professionellem Team und Transporter",
      caption: "Unser Team bei einer Wohnungsauflösung in Hennigsdorf – sicherer Möbeltransport im Treppenhaus.",
    },
  ],
  oranienburg: [
    {
      src: oranienburgMoebelabtransport,
      alt: "Entrümpelung in Oranienburg mit Möbelabtransport und besenreiner Übergabe",
      caption: "Unser Team in Oranienburg beim Möbelabtransport – inklusive Entsorgung und besenreiner Übergabe.",
    },
  ],
  werder: [
    {
      src: werderVorherNachher,
      alt: "Vorher-Nachher: Entrümpelung in Werder (Havel) mit schneller Räumung und Entsorgung",
      caption: "Vorher / Nachher – Hof- und Garagenräumung in Werder (Havel), vollständig geräumt und entsorgt.",
    },
  ],
  havelland: [
    {
      src: havellandTeamRaeumung,
      alt: "Entrümpelung im Landkreis Havelland mit zuverlässigem Räumungsservice",
      caption: "Unser Team im Landkreis Havelland – zuverlässiger Räumungsservice mit eigenen Mitarbeitern.",
    },
  ],
  velten: [
    {
      src: veltenHaushaltVorherNachher,
      alt: "Vorher-Nachher: Haushaltsauflösung in Velten mit kostenloser Besichtigung und Festpreis",
      caption: "Vorher / Nachher – Haushaltsauflösung in Velten, vollständig geräumt zum Festpreis.",
    },
    {
      src: veltenKellerTeam,
      alt: "Entrümpelung in Velten für Keller, Wohnung, Garage und Dachboden",
      caption: "Unser Team bei einer Kellerentrümpelung in Velten – persönlich vor Ort, eigene Fahrzeuge.",
    },
  ],
};

// Nachbar-Orte für interne Verlinkung (geografische Cluster)
const NEIGHBOURS: Record<string, string[]> = {
  brieselang: ["dallgow-doeberitz", "falkensee", "wustermark", "schoenwalde-glien"],
  falkensee: ["brieselang", "dallgow-doeberitz", "schoenwalde-glien", "wustermark"],
  "dallgow-doeberitz": ["falkensee", "brieselang", "wustermark", "staaken"],
  staaken: ["dallgow-doeberitz", "falkensee", "brieselang", "wustermark"],
  nauen: ["wustermark", "brieselang", "paulinenaue", "friesack"],
  wustermark: ["brieselang", "nauen", "dallgow-doeberitz", "ketzin"],
  "schoenwalde-glien": ["brieselang", "falkensee", "hennigsdorf", "velten"],
  rathenow: ["premnitz", "friesack", "paulinenaue"],
  premnitz: ["rathenow", "paulinenaue"],
  friesack: ["paulinenaue", "nauen", "rathenow"],
  ketzin: ["wustermark", "werder", "brieselang"],
  paulinenaue: ["nauen", "friesack", "rathenow"],
  hennigsdorf: ["velten", "oranienburg", "schoenwalde-glien"],
  velten: ["hennigsdorf", "oranienburg", "schoenwalde-glien"],
  oranienburg: ["velten", "hennigsdorf"],
  werder: ["ketzin", "wustermark", "potsdam"],
  potsdam: ["werder", "ketzin", "wustermark", "brieselang"],
  havelland: ["brieselang", "falkensee", "nauen", "rathenow"],
};

interface LocationPageProps {
  region: {
    id: string;
    name: string;
    slug: string;
    isHeadquarters: boolean;
    description: string;
    longDescription: string;
    metaTitle: string;
    metaDescription: string;
    distance: string;
  };
}

export function LocationPageTemplate({ region }: LocationPageProps) {
  const locationSchema = generateLocationSchema(region as any);
  const localBusinessSchema = generateLocalBusinessSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Startseite", url: "/" },
    { name: `Entrümpelung ${region.name}`, url: region.slug },
  ]);
  const localFaqs = LOCATION_DATA[region.id]?.faqs || [];
  const faqSchema = localFaqs.length > 0 ? generateFAQSchema(localFaqs) : null;
  const localReviews = REVIEWS.filter((r) => r.location === region.name);
  const reviewSchema = generateReviewSchema(localReviews.length > 0 ? localReviews : REVIEWS);

  const situations = [
    { icon: Home, title: "Wohnungsentrümpelung", desc: "Mietwohnung, Eigentumswohnung, Altbau" },
    { icon: Building2, title: "Hausentrümpelung", desc: "Einfamilienhaus, Reihenhaus, Doppelhaus" },
    { icon: Warehouse, title: "Kellerentrümpelung", desc: "Privatkeller, Mieterkeller" },
    { icon: Package, title: "Haushaltsauflösung", desc: "Bei Todesfall, Umzug, Pflegeheim" },
  ];

  // Unique service area content per location to avoid duplicate content
  const serviceAreaContent: Record<string, JSX.Element> = {
    "falkensee": (
      <>
        <p className="mb-4">
          Falkensee ist mit über 45.000 Einwohnern die größte Stadt im Havelland und liegt nur wenige 
          Kilometer von unserem Standort in Brieselang entfernt. Die dichte Wohnbebauung – von 
          Mehrfamilienhäusern in der Innenstadt bis zu den Einfamilienhausgebieten in Falkenhöh, 
          Seegefeld und Finkenkrug – führt zu einem kontinuierlich hohen Bedarf an professionellen 
          Entrümpelungen. Unsere Fahrzeuge sind hier nahezu täglich im Einsatz.
        </p>
        <p className="mb-4">
          Die Nähe zu Berlin-Spandau prägt Falkensee als beliebten Wohnort für Pendler. Viele 
          Wohnungen und Häuser wechseln regelmäßig die Besitzer, was Haushaltsauflösungen und 
          Wohnungsentrümpelungen zu unseren häufigsten Aufträgen hier macht. Auch Kellerabteile 
          in den zahlreichen Mietshäusern räumen wir routiniert.
        </p>
        <p className="mb-4">
          Für Kunden in Falkensee bedeutet die kurze Distanz nach Brieselang: Besichtigungstermine 
          oft am selben Tag, flexible Einsatzplanung und persönliche Absprachen vor Ort. Wir kennen 
          die Gegebenheiten der Falkenseer Wohngebiete und arbeiten ausschließlich mit eigenem Team.
        </p>
        <p>
          Von Falkensee aus betreuen wir ebenso die angrenzenden Bereiche Richtung Schönwalde-Glien, 
          Dallgow-Döberitz und das westliche Spandau. Die regionale Verwurzelung seit 2015 sichert 
          effiziente Abläufe bei jeder Entrümpelung im Raum Falkensee.
        </p>
      </>
    ),
    "brieselang": (
      <>
        <p className="mb-4">
          Brieselang ist unser Heimatstandort. Hier sind wir seit 2015 ansässig und kennen jeden 
          Ortsteil – von Zeestow über Bredow bis zur Siedlung am Havelkanal. Als lokaler Betrieb 
          mit eigenen Fahrzeugen und festem Team sind wir innerhalb kürzester Zeit vor Ort, oft 
          noch am Tag der Anfrage für eine Besichtigung verfügbar.
        </p>
        <p className="mb-4">
          Die Gemeinde Brieselang zeichnet sich durch eine Mischung aus älteren Einfamilienhäusern, 
          Neubaugebieten und gewachsenen Ortskernen aus. Entrümpelungen betreffen hier häufig 
          Dachböden, Garagen und Gartenhäuser – typisch für die Grundstücksstrukturen im Ort. 
          Auch Haushaltsauflösungen nach Erbfällen gehören zu unseren regelmäßigen Aufträgen.
        </p>
        <p className="mb-4">
          Als Brieselanger Unternehmen profitieren unsere Nachbarn von minimalen Anfahrtswegen, 
          direkter Erreichbarkeit und persönlicher Betreuung. Viele Kunden kennen uns bereits 
          durch Empfehlungen aus der Gemeinde – ein Vertrauen, das wir durch zuverlässige Arbeit 
          täglich bestätigen.
        </p>
        <p>
          Von Brieselang aus erreichen wir das gesamte Havelland in kurzer Zeit: Falkensee, Nauen, 
          Wustermark und Dallgow-Döberitz liegen alle im direkten Einzugsgebiet unserer täglichen 
          Einsatzrouten.
        </p>
      </>
    ),
    "dallgow-doeberitz": (
      <>
        <p className="mb-4">
          Dallgow-Döberitz grenzt unmittelbar an unseren Standort Brieselang und gehört zu den 
          Gemeinden, die wir am schnellsten erreichen. Die Lage direkt an der B5 und die Nähe 
          zum Berliner Ring machen den Ort logistisch ideal für unsere Einsatzplanung. Unsere 
          Transporter passieren Dallgow-Döberitz täglich auf dem Weg zu Aufträgen im westlichen 
          Berliner Umland.
        </p>
        <p className="mb-4">
          Die Bebauung in Dallgow-Döberitz ist geprägt von Einfamilienhäusern mit großzügigen 
          Grundstücken, Garagen und Nebengebäuden. Entsprechend häufig führen wir hier 
          Entrümpelungen von Kellern, Dachböden und Gartenlauben durch. Auch die Räumung 
          von Gewerbeflächen im Gewerbegebiet Elstal übernehmen wir regelmäßig.
        </p>
        <p className="mb-4">
          Kunden in Dallgow-Döberitz schätzen die unkomplizierte Zusammenarbeit: kurze Wege für 
          Besichtigungen, schnelle Terminvergabe und ein fester Ansprechpartner, der die örtlichen 
          Gegebenheiten kennt. Wir arbeiten ohne Subunternehmer und garantieren verlässliche Abläufe.
        </p>
        <p>
          Neben dem Ortskern betreuen wir auch die angrenzenden Bereiche Richtung Seeburg, 
          Rohrbeck und das Havelpark-Areal. Die Entrümpelung im Raum Dallgow-Döberitz profitiert 
          von unserer jahrelangen Präsenz in der Region.
        </p>
      </>
    ),
    "nauen": (
      <>
        <p className="mb-4">
          Nauen ist als Kreisstadt des Havellandes ein wichtiges Zentrum der Region und liegt 
          etwa 15 Kilometer nordwestlich von unserem Standort Brieselang. Die historische 
          Altstadt mit ihren Mehrfamilienhäusern, die umliegenden Wohngebiete und die 
          eingemeindeten Ortsteile wie Ribbeck, Wachow und Markee bilden ein vielfältiges 
          Einsatzgebiet für Entrümpelungen aller Art.
        </p>
        <p className="mb-4">
          In Nauen übernehmen wir besonders häufig Haushaltsauflösungen in älteren Wohngebäuden 
          sowie Kellerentrümpelungen in Mietshäusern. Die ländlich geprägten Ortsteile bringen 
          zusätzlich Aufträge wie die Räumung von Scheunen, Stallungen und landwirtschaftlichen 
          Nebengebäuden mit sich – Arbeiten, für die wir entsprechend ausgerüstet sind.
        </p>
        <p className="mb-4">
          Trotz der etwas größeren Entfernung sind wir in Nauen regelmäßig im Einsatz. Die gute 
          Anbindung über die B5 ermöglicht eine effiziente Routenplanung. Für Kunden bedeutet 
          das: zuverlässige Termine, transparente Festpreise und die Gewissheit, einen regionalen 
          Anbieter mit Ortskenntnis zu beauftragen.
        </p>
        <p>
          Von Nauen aus betreuen wir auch die Nachbargemeinden Richtung Ketzin, Friesack und 
          das nördliche Havelland. Jede Entrümpelung im Raum Nauen wird von unserem eigenen 
          Team durchgeführt.
        </p>
      </>
    ),
    "wustermark": (
      <>
        <p className="mb-4">
          Wustermark liegt südlich von Brieselang und ist über die B5 in wenigen Minuten 
          erreichbar. Die Gemeinde umfasst neben dem Hauptort auch Elstal mit dem Designer 
          Outlet und dem ehemaligen Olympischen Dorf sowie Priort, Buchow-Karpzow und Hoppenrade. 
          Diese Struktur aus gewachsenen Dörfern und neueren Wohngebieten prägt unsere Einsätze hier.
        </p>
        <p className="mb-4">
          Typisch für Wustermark sind Entrümpelungen von Einfamilienhäusern mit Garten, Garagen 
          und Kellerräumen. In den dörflichen Ortsteilen kommen häufig auch Scheunen, Schuppen 
          und größere Grundstücksräumungen hinzu. Die Mischung aus ländlicher Bebauung und 
          modernen Neubaugebieten erfordert flexible Lösungen, die wir routiniert umsetzen.
        </p>
        <p className="mb-4">
          Die unmittelbare Nähe zu Brieselang ermöglicht spontane Besichtigungstermine und eine 
          besonders flexible Einsatzplanung. Kunden in Wustermark profitieren von kurzen 
          Kommunikationswegen und einem Ansprechpartner, der die Gemeinde aus täglicher 
          Erfahrung kennt.
        </p>
        <p>
          Von Wustermark aus sind wir ebenso in Richtung Dallgow-Döberitz, Nauen und dem 
          westlichen Berlin tätig. Unsere regionale Verankerung im Havelland garantiert 
          effiziente Entrümpelungen ohne lange Wartezeiten.
        </p>
      </>
    ),
    "staaken": (
      <>
        <p className="mb-4">
          Staaken liegt am westlichen Rand von Berlin-Spandau und grenzt unmittelbar an
          Dallgow-Döberitz – und damit direkt an unser Kerngebiet. Aus Brieselang sind wir
          in rund 15 Minuten vor Ort. Die Besonderheit: Staaken ist historisch zwischen
          Berlin und Brandenburg geteilt, weshalb wir hier sowohl im Berliner als auch im
          brandenburgischen Teil regelmäßig im Einsatz sind.
        </p>
        <p className="mb-4">
          Die Bebauung reicht von den großen Wohnsiedlungen rund um die Heerstraße Nord und
          den Brunsbütteler Damm bis zu Einfamilienhäusern und Reihenhäusern im
          brandenburgischen Teil. Entsprechend häufig übernehmen wir hier
          Wohnungsentrümpelungen und Kellerräumungen in Mehrfamilienhäusern sowie
          Haushaltsauflösungen in den ruhigeren Wohnstraßen.
        </p>
        <p className="mb-4">
          Für Kunden in Staaken bedeutet die kurze Distanz nach Brieselang: schnelle
          Besichtigungstermine, keine Anfahrtskosten und ein fester Ansprechpartner statt
          anonymer Vermittlung. Wir kennen die Zufahrten und Parksituationen der
          Großsiedlungen und planen den Abtransport entsprechend.
        </p>
        <p>
          Von Staaken aus betreuen wir ebenso die angrenzenden Bereiche in Dallgow-Döberitz,
          Falkensee und dem westlichen Spandau. Jede Entrümpelung in Staaken führen wir mit
          eigenem Team und eigenen Fahrzeugen durch.
        </p>
      </>
    ),
    "havelland": (
      <>
        <p className="mb-4">
          Das Havelland als Landkreis westlich von Berlin bildet unser gesamtes Kerngebiet.
          Von Brieselang aus erreichen wir alle Gemeinden des Havellandes – von Falkensee im 
          Osten bis Rathenow im Westen, von Nauen im Norden bis Ketzin im Süden. Diese 
          flächendeckende Präsenz unterscheidet uns von überregionalen Anbietern ohne lokale 
          Verankerung.
        </p>
        <p className="mb-4">
          Die Vielfalt des Havellandes spiegelt sich in unseren Aufträgen: städtische 
          Wohnungsentrümpelungen in Falkensee und Nauen, Haushaltsauflösungen in den 
          Einfamilienhausgebieten um Brieselang und Dallgow, Räumungen von Höfen und 
          landwirtschaftlichen Gebäuden in den ländlichen Gemeinden. Für jede Situation 
          bringen wir die passende Ausstattung und Erfahrung mit.
        </p>
        <p className="mb-4">
          Unsere täglichen Routen führen durch das gesamte Havelland. Das bedeutet für Kunden: 
          Wir sind ohnehin in der Nähe, können Termine effizient kombinieren und Anfahrtskosten 
          minimieren. Die Ortskenntnis aus über acht Jahren Tätigkeit im Landkreis ermöglicht 
          realistische Einschätzungen und verbindliche Zusagen.
        </p>
        <p>
          Als im Havelland ansässiger Betrieb arbeiten wir ausschließlich mit eigenem Personal. 
          Keine Vermittlung, keine wechselnden Teams – stattdessen verlässliche Partner für 
          jede Entrümpelung im Havelland.
        </p>
      </>
    ),
    "rathenow": (
      <>
        <p className="mb-4">
          Rathenow ist mit rund 24.000 Einwohnern die zweitgrößte Stadt im Havelland und liegt
          etwa 35 Minuten westlich von unserem Standort Brieselang. Die Stadt mit ihrer
          historischen Altstadt, den Plattenbauquartieren aus DDR-Zeiten und den umliegenden
          Einfamilienhausgebieten bietet ein vielfältiges Bild – und entsprechend
          unterschiedliche Anforderungen an Entrümpelungen.
        </p>
        <p className="mb-4">
          Häufig übernehmen wir in Rathenow Wohnungsentrümpelungen in den großen
          Mehrfamilienhäusern sowie Haushaltsauflösungen nach Erbfällen in den älteren
          Einfamilienhäusern. Auch die Räumung von Kellern und Dachböden in den Gründerzeitbauten
          der Innenstadt gehört zu unseren regelmäßigen Aufträgen.
        </p>
        <p className="mb-4">
          Trotz der etwas größeren Entfernung sind wir in Rathenow regelmäßig im Einsatz.
          Termine planen wir effizient mit anderen Aufträgen im westlichen Havelland, sodass
          die Anfahrt für unsere Kunden keinen Aufpreis bedeutet. Die gute Anbindung über die
          B188 sorgt für planbare Fahrzeiten.
        </p>
        <p>
          Von Rathenow aus betreuen wir auch die umliegenden Gemeinden wie Premnitz, Milower
          Land und Stechow-Ferchesar. Jede Entrümpelung im Raum Rathenow wird von unserem
          eigenen Team mit eigener Ausrüstung durchgeführt.
        </p>
      </>
    ),
    "premnitz": (
      <>
        <p className="mb-4">
          Premnitz liegt direkt an der Havel im westlichen Havelland und ist über Rathenow
          gut zu erreichen. Die Stadt mit ihrer industriellen Vergangenheit und den
          Wohnquartieren aus den 1960er und 1970er Jahren bringt einen kontinuierlichen
          Bedarf an Wohnungs- und Kellerentrümpelungen mit sich.
        </p>
        <p className="mb-4">
          Typisch für Premnitz sind Haushaltsauflösungen in den Mehrfamilienhäusern entlang
          der Hauptverkehrsachsen sowie Kellerentrümpelungen in den großen Wohnblöcken.
          Daneben übernehmen wir regelmäßig Räumungen in den Einfamilienhausgebieten am
          Stadtrand sowie in den dörflichen Ortsteilen.
        </p>
        <p className="mb-4">
          Wir kombinieren Aufträge in Premnitz häufig mit Einsätzen in Rathenow, sodass
          unsere Fahrzeuge effizient ausgelastet sind und Kunden faire Preise erhalten.
          Die direkte Anbindung über die L96 ermöglicht zuverlässige Terminzusagen.
        </p>
        <p>
          Von Premnitz aus erreichen wir auch die umliegenden Gemeinden Milower Land,
          Mögelin und das nördliche Brandenburg an der Havel. Persönliche Betreuung und
          eigene Mitarbeiter sind hier selbstverständlich.
        </p>
      </>
    ),
    "friesack": (
      <>
        <p className="mb-4">
          Friesack liegt im nördlichen Havelland und ist von Brieselang aus in etwa 30
          Minuten über die B5 erreichbar. Die kleine Stadt mit ihrer ländlich geprägten
          Umgebung bringt charakteristische Aufträge mit sich: Räumungen von Hofstellen,
          Scheunen, Stallungen und großzügigen Grundstücken stehen hier oft im Vordergrund.
        </p>
        <p className="mb-4">
          Neben den klassischen Wohnungs- und Hausentrümpelungen übernehmen wir in Friesack
          auch die Auflösung landwirtschaftlich genutzter Gebäude. Für solche Aufträge
          bringen wir entsprechend dimensionierte Fahrzeuge und Erfahrung im Umgang mit
          alten Maschinen, Werkstattbeständen und Sperrigem mit.
        </p>
        <p className="mb-4">
          Die ländliche Lage erfordert flexible Planung – wir richten uns nach den
          Gegebenheiten vor Ort und kommen auch zu Anwesen abseits der Hauptstraßen. Kunden
          in Friesack schätzen die persönliche Beratung und die Verlässlichkeit eines
          regionalen Anbieters.
        </p>
        <p>
          Von Friesack aus betreuen wir auch die umliegenden Gemeinden wie Wiesenaue,
          Mühlenberge und Paulinenaue. Jede Entrümpelung im Raum Friesack erfolgt mit
          eigenem Team – ohne Vermittlung, ohne Subunternehmer.
        </p>
      </>
    ),
    "schoenwalde-glien": (
      <>
        <p className="mb-4">
          Schönwalde-Glien grenzt nördlich an unser Kerngebiet und gehört zu den Gemeinden,
          die wir am schnellsten erreichen. Die Großgemeinde mit den Ortsteilen
          Schönwalde-Dorf, Schönwalde-Siedlung, Pausin, Paaren im Glien und Wansdorf bietet
          ein breites Spektrum an Wohnformen – von Einfamilienhäusern mit Garten bis zu
          dörflichen Höfen.
        </p>
        <p className="mb-4">
          Typisch für Schönwalde-Glien sind Entrümpelungen von Einfamilienhäusern,
          Kellerräumen und großzügigen Garagen. In den dörflichen Ortsteilen kommen häufig
          Scheunen- und Schuppenräumungen hinzu. Auch Haushaltsauflösungen nach Erbfällen
          oder Pflegeumzügen gehören zu unseren regelmäßigen Aufträgen hier.
        </p>
        <p className="mb-4">
          Die kurze Anfahrt von Brieselang ermöglicht spontane Besichtigungstermine,
          oft noch am selben Tag. Kunden in Schönwalde-Glien profitieren von minimalen
          Wegen, persönlicher Betreuung und einem festen Ansprechpartner mit Ortskenntnis.
        </p>
        <p>
          Von Schönwalde-Glien aus betreuen wir ebenso die angrenzenden Bereiche Richtung
          Hennigsdorf, Velten und das nördliche Berliner Umland. Unsere Präsenz in der
          Region seit 2015 garantiert verlässliche Abläufe.
        </p>
      </>
    ),
    "ketzin": (
      <>
        <p className="mb-4">
          Ketzin/Havel liegt malerisch an einer Halbinsel in der Havel im südlichen
          Havelland. Mit den Ortsteilen Etzin, Falkenrehde, Tremmen und Zachow ist die
          Stadt vielfältig: alte Fischerhäuser im Zentrum, Einfamilienhausgebiete am
          Stadtrand und ländliche Höfe in den Ortsteilen prägen das Bild.
        </p>
        <p className="mb-4">
          Wir übernehmen in Ketzin regelmäßig Wohnungs- und Hausentrümpelungen,
          Haushaltsauflösungen nach Erbfällen sowie Räumungen von Kellern, Dachböden
          und Nebengebäuden. Die Anfahrt aus Brieselang über die L92 dauert rund 25
          Minuten – planbar und ohne Aufpreis für unsere Kunden.
        </p>
        <p className="mb-4">
          Termine in Ketzin koordinieren wir effizient mit Aufträgen in Wustermark
          und Nauen. So sind unsere Fahrzeuge optimal ausgelastet und Sie profitieren
          von fairen Festpreisen.
        </p>
        <p>
          Von Ketzin aus betreuen wir auch die angrenzenden Bereiche bis Werder
          (Havel) und Potsdam-Mittelmark. Persönliche Besichtigung und eigenes Team –
          ohne Vermittlung, ohne Subunternehmer.
        </p>
      </>
    ),
    "paulinenaue": (
      <>
        <p className="mb-4">
          Paulinenaue liegt im Westhavelland an der B5 und ist von Brieselang aus in
          rund 20 Minuten erreichbar. Die kleine Gemeinde mit ihren Einfamilienhäusern,
          Hofstellen und landwirtschaftlich geprägten Anwesen bringt charakteristische
          Aufträge mit sich.
        </p>
        <p className="mb-4">
          Typisch für Paulinenaue sind Räumungen von Wohnhäusern, Scheunen und
          Werkstätten. Auch Haushaltsauflösungen nach Erbfällen oder Pflegeumzügen
          gehören zu unseren regelmäßigen Aufträgen. Für sperrige Hofentrümpelungen
          bringen wir entsprechend dimensionierte Fahrzeuge mit.
        </p>
        <p className="mb-4">
          Die direkte Anbindung über die B5 macht Termine planbar. Aufträge in
          Paulinenaue verbinden wir oft mit Einsätzen in Friesack oder Nauen, sodass
          Anfahrtswege effizient gebündelt werden.
        </p>
        <p>
          Kunden in Paulinenaue schätzen die persönliche Beratung vor Ort und die
          Verlässlichkeit eines regionalen Anbieters mit eigenem Team.
        </p>
      </>
    ),
    "hennigsdorf": (
      <>
        <p className="mb-4">
          Hennigsdorf im Landkreis Oberhavel zählt rund 26.000 Einwohner und ist von
          Brieselang aus in etwa 25 Minuten erreichbar. Die Stadt mit ihrer
          industriellen Geschichte, den Plattenbauquartieren und den
          Einfamilienhausgebieten bietet ein breites Spektrum an Aufträgen.
        </p>
        <p className="mb-4">
          Wir übernehmen in Hennigsdorf regelmäßig Wohnungsentrümpelungen in
          Mehrfamilienhäusern, Haushaltsauflösungen in Reihenhäusern sowie
          Kellerräumungen in den großen Wohnblöcken. Auch Dachboden- und
          Garagenräumungen gehören zu unseren häufigen Einsätzen.
        </p>
        <p className="mb-4">
          Die Anfahrt erfolgt über die L17 und ist gut planbar. Aufträge in
          Hennigsdorf verbinden wir effizient mit Einsätzen in Velten und
          Schönwalde-Glien. Die Anfahrt bedeutet für unsere Kunden keinen Aufpreis.
        </p>
        <p>
          Persönliche Besichtigung, transparente Festpreise und eigenes Team –
          das zeichnet jede Entrümpelung in Hennigsdorf aus. Keine Vermittlung,
          keine Subunternehmer.
        </p>
      </>
    ),
    "velten": (
      <>
        <p className="mb-4">
          Velten – die historische Ofenstadt im Landkreis Oberhavel – erreichen wir
          aus Brieselang in rund 28 Minuten. Die Stadt mit ihren Gründerzeitbauten,
          den Plattenbauquartieren und den Wohnsiedlungen am Stadtrand bringt
          vielfältige Anforderungen an Entrümpelungen mit sich.
        </p>
        <p className="mb-4">
          Häufige Aufträge in Velten sind Wohnungs- und Hausentrümpelungen,
          Haushaltsauflösungen sowie Keller- und Dachbodenräumungen in den
          historischen Gebäuden. Auch die Räumung alter Werkstätten und Schuppen
          gehört zu unseren regelmäßigen Einsätzen.
        </p>
        <p className="mb-4">
          Termine in Velten kombinieren wir oft mit Aufträgen in Hennigsdorf und
          Oranienburg. So bleibt die Anfahrt für unsere Kunden ohne Aufpreis und
          Termine sind kurzfristig planbar.
        </p>
        <p>
          Wir arbeiten in Velten ausschließlich mit eigenen Mitarbeitern und
          Fahrzeugen. Festpreis, besenreine Übergabe und persönlicher
          Ansprechpartner sind selbstverständlich.
        </p>
      </>
    ),
    "oranienburg": (
      <>
        <p className="mb-4">
          Oranienburg ist mit rund 45.000 Einwohnern Kreisstadt des Landkreises
          Oberhavel. Aus Brieselang erreichen wir die Stadt über die A10/B96 in etwa
          30 Minuten. Die Mischung aus Altstadt, Plattenbauquartieren und
          weitläufigen Einfamilienhausgebieten macht Oranienburg zu einem unserer
          regelmäßigen Einsatzorte.
        </p>
        <p className="mb-4">
          Typische Aufträge in Oranienburg sind Wohnungsentrümpelungen in
          Mehrfamilienhäusern, Haushaltsauflösungen nach Erbfällen sowie Räumungen
          von Kellern und Dachböden. Auch Gewerbeentrümpelungen kleinerer Betriebe
          übernehmen wir hier regelmäßig.
        </p>
        <p className="mb-4">
          Trotz der etwas größeren Entfernung berechnen wir keinen Anfahrtsaufschlag.
          Termine in Oranienburg planen wir effizient mit Einsätzen in Velten und
          Hennigsdorf. So bleibt der Service zuverlässig und fair kalkuliert.
        </p>
        <p>
          Eigenes Team, transparente Festpreise und besenreine Übergabe – darauf
          können sich Kunden in Oranienburg verlassen. Keine Vermittlung, keine
          versteckten Kosten.
        </p>
      </>
    ),
    "potsdam": (
      <>
        <p className="mb-4">
          Potsdam ist als Landeshauptstadt Brandenburgs mit rund 185.000 Einwohnern die
          größte Stadt in unserem erweiterten Einsatzgebiet. Aus Brieselang erreichen wir
          Potsdam über die B273 und die A10 in etwa 30 Minuten. Die Stadt an der Havel
          verbindet historische Altbauten, Villengebiete und große Wohnquartiere – ein
          entsprechend vielfältiges Feld für Entrümpelungen aller Art.
        </p>
        <p className="mb-4">
          Besonders häufig übernehmen wir in Potsdam Wohnungsauflösungen in den
          Gründerzeitbauten der Innenstadt und im Holländischen Viertel, Haushaltsauflösungen
          in den Villen von Babelsberg und am Griebnitzsee sowie Keller- und
          Wohnungsentrümpelungen in den Plattenbauquartieren am Schlaatz und in Drewitz.
          Enge Treppenhäuser und Halteverbotszonen kennen wir – wir planen Anfahrt und
          Abtransport entsprechend.
        </p>
        <p className="mb-4">
          Trotz der Stadtgröße bleiben wir der persönliche Direktanbieter: kostenlose
          Besichtigung, verbindlicher Festpreis und ein fester Ansprechpartner statt anonymer
          Vermittlung. Termine in Potsdam kombinieren wir effizient mit Aufträgen in Werder
          und Ketzin, sodass für unsere Kunden keine Anfahrtspauschale anfällt.
        </p>
        <p>
          Von Potsdam aus betreuen wir ebenso die angrenzenden Bereiche in Potsdam-Mittelmark
          und Richtung Werder (Havel). Jede Entrümpelung in Potsdam führen wir mit eigenem
          Team und eigenen Fahrzeugen durch – seit 2015 im Havelland verwurzelt.
        </p>
      </>
    ),
    "werder": (
      <>
        <p className="mb-4">
          Werder (Havel) – die Blütenstadt im Landkreis Potsdam-Mittelmark –
          erreichen wir aus Brieselang in rund 25 Minuten. Die Stadt auf der
          Werderaner Insel und in den umliegenden Ortsteilen ist geprägt von
          Einfamilienhäusern, Villen am Wasser und dörflichen Strukturen in
          Glindow, Töplitz und Plötzin.
        </p>
        <p className="mb-4">
          Haushaltsauflösungen in Einfamilienhäusern sind in Werder unser häufigster
          Auftrag. Daneben übernehmen wir Wohnungsentrümpelungen, Keller- und
          Dachbodenräumungen sowie die Räumung von Gartenhäusern und Lauben in den
          Wochenendsiedlungen rund um die Havel.
        </p>
        <p className="mb-4">
          Die Anfahrt über die L86 ist planbar und bedeutet für unsere Kunden keinen
          Aufpreis. Aufträge in Werder kombinieren wir mit Einsätzen in Ketzin und
          Potsdam-Mittelmark, sodass unsere Fahrzeuge effizient ausgelastet sind.
        </p>
        <p>
          Persönliche Besichtigung, Festpreis und besenreine Übergabe – das ist
          unser Standard auch in Werder (Havel). Eigenes Team, eigene Fahrzeuge,
          keine Vermittlung.
        </p>
      </>
    ),
  };


  const currentServiceAreaContent = serviceAreaContent[region.id] || serviceAreaContent["havelland"];

  return (
    <>
      {/* JSON-LD im Body (fuer Google gueltig); <head>-Meta liefert das Astro-Layout */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 py-16 text-primary-foreground lg:py-24">
        <div className="section-container relative">
          <div className="mx-auto max-w-3xl text-center">
            <nav className="mb-6 text-sm text-primary-foreground/90">
              <a href="/" className="hover:text-primary-foreground">Startseite</a>
              <span className="mx-2">/</span>
              <span>Entrümpelung {region.name}</span>
            </nav>

            <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold">{region.distance} von Brieselang</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-accent-foreground">
                <Truck className="h-5 w-5" />
                <span className="font-semibold">Kostenlose Anfahrt in {region.name}</span>
              </div>
            </div>

            <h1 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Entrümpelung in {region.name}
            </h1>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
              {region.longDescription} Kostenlose Besichtigung, <strong>kostenlose Anfahrt</strong>, verbindlicher Festpreis, besenreine Übergabe – ohne versteckte Kosten.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={`tel:${COMPANY_INFO.phoneLink}`}>
                <Button size="lg" className="btn-cta text-lg">
                  <Phone className="h-5 w-5" />
                  {COMPANY_INFO.phone}
                </Button>
              </a>
              <a href={COMPANY_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2 bg-[#25D366] text-white hover:bg-[#20BD5A]">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Warum wir */}
      <section className="section-container">
        <SectionHeader
          badge={region.name}
          title={`Warum Sparschwein Entrümpelung in ${region.name}?`}
          description="Regionale Nähe, schnelle Termine, faire Preise – ohne Anfahrtskosten."
        />
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          <Card className="card-hover border-accent/40 bg-accent/5 text-center">
            <CardContent className="p-6">
              <Truck className="mx-auto mb-3 h-10 w-10 text-accent" />
              <h3 className="mb-2 font-semibold">Kostenlose Anfahrt</h3>
              <p className="text-sm text-muted-foreground">
                Keine Anfahrtskosten in {region.name} – weder zur Besichtigung noch zur Durchführung.
              </p>
            </CardContent>
          </Card>
          <Card className="card-hover text-center">
            <CardContent className="p-6">
              <Clock className="mx-auto mb-3 h-10 w-10 text-primary" />
              <h3 className="mb-2 font-semibold">Schnell vor Ort</h3>
              <p className="text-sm text-muted-foreground">{region.distance} Anfahrt aus Brieselang</p>
            </CardContent>
          </Card>
          <Card className="card-hover text-center">
            <CardContent className="p-6">
              <Truck className="mx-auto mb-3 h-10 w-10 text-primary" />
              <h3 className="mb-2 font-semibold">Eigene Fahrzeuge</h3>
              <p className="text-sm text-muted-foreground">2-3 Transporter täglich im Einsatz</p>
            </CardContent>
          </Card>
          <Card className="card-hover text-center">
            <CardContent className="p-6">
              <Users className="mx-auto mb-3 h-10 w-10 text-primary" />
              <h3 className="mb-2 font-semibold">Eigenes Team</h3>
              <p className="text-sm text-muted-foreground">Keine Subunternehmer, keine Vermittlung</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bildergalerie – authentische Einsätze vor Ort (region-spezifisch) */}
      {REGION_GALLERIES[region.id] && (
        <section className="section-container">
          <SectionHeader
            badge="Echte Einsätze"
            title={`Unsere Arbeit in ${region.name}`}
            description="Authentische Eindrücke von unserem Team und abgeschlossenen Aufträgen vor Ort."
          />
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
            {REGION_GALLERIES[region.id].map((img, i) => (
              <figure key={i} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="p-4 text-sm text-muted-foreground">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Typische Situationen */}
      <section className="bg-secondary">
        <div className="section-container">
          <SectionHeader
            badge="Typische Einsätze"
            title={`Entrümpelung in ${region.name} – Wann brauchen Sie uns?`}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {situations.map((sit, i) => (
              <Card key={i} className="card-hover">
                <CardContent className="p-6 text-center">
                  <sit.icon className="mx-auto mb-3 h-10 w-10 text-primary" />
                  <h3 className="mb-1 font-semibold">{sit.title}</h3>
                  <p className="text-sm text-muted-foreground">{sit.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leistungen verlinken */}
      <section className="section-container">
        <SectionHeader
          badge="Unsere Leistungen"
          title={`Alle Leistungen in ${region.name}`}
          description="Wählen Sie die passende Leistung für Ihr Anliegen."
        />
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <a key={service.id} href={service.slug}>
              <Card className="card-hover">
                <CardContent className="flex items-center gap-4 p-4">
                  <CheckCircle2 className="h-6 w-6 text-success" />
                  <div>
                    <h3 className="font-semibold">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <ArrowRight className="ml-auto h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* Einzugsgebiete */}
      <section className="bg-secondary">
        <div className="section-container">
          <SectionHeader
            badge="Einzugsgebiete"
            title={`Entrümpelung im Raum ${region.name}`}
            description="Regionale Nähe, kurze Wege, persönliche Betreuung."
          />
          <div className="mx-auto max-w-3xl">
            <Card>
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    {currentServiceAreaContent}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nachbar-Orte / interne Verlinkung */}
      {(() => {
        const neighbourIds = NEIGHBOURS[region.id] || [];
        const neighbours = neighbourIds
          .map((id) => REGIONS.find((r) => r.id === id))
          .filter((r): r is typeof REGIONS[0] => Boolean(r));
        if (neighbours.length === 0) return null;
        return (
          <section className="section-container">
            <SectionHeader
              badge="Auch in der Nähe"
              title={`Entrümpelung rund um ${region.name}`}
              description="Wir sind in der gesamten Region für Sie im Einsatz."
            />
            <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
              {neighbours.map((n) => (
                <a key={n.id} href={n.slug}>
                  <Button variant="outline" size="sm" className="gap-2">
                    <MapPin className="h-4 w-4" />
                    Entrümpelung {n.name}
                  </Button>
                </a>
              ))}
            </div>
          </section>
        );
      })()}

      {/* Lokalisierte FAQs (Local SEO 2026) */}
      {localFaqs.length > 0 && (
        <section className="bg-secondary">
          <div className="section-container">
            <SectionHeader
              badge="Häufige Fragen"
              title={`FAQ – Entrümpelung ${region.name}`}
              description={`Antworten auf die wichtigsten Fragen rund um Entrümpelungen in ${region.name}.`}
            />
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {localFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Deep-Links: Schnellzugriff aus dem lokalen FAQ */}
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <a
                  href="/preise#rechner"
                  className="group flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Sofortpreis berechnen</p>
                    <p className="text-xs text-muted-foreground">Kostenrechner für {region.name}</p>
                  </div>
                </a>
                <a
                  href="/preise"
                  className="group flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Alle Festpreise</p>
                    <p className="text-xs text-muted-foreground">Volumen-Tarife & Garantie</p>
                  </div>
                </a>
                <a
                  href={SERVICES[0].slug}
                  className="group flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Beliebte Leistung</p>
                    <p className="text-xs text-muted-foreground">{SERVICES[0].title}</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bewertungs-CTA (Local SEO Booster) */}
      <section className="section-container">
        <div className="mx-auto max-w-3xl">
          <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10">
            <CardContent className="p-8 text-center">
              <div className="mb-4 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-7 w-7 fill-accent text-accent" />
                ))}
              </div>
              <h2 className="mb-3 text-2xl font-bold">
                Waren Sie zufrieden mit unserer Entrümpelung in {region.name}?
              </h2>
              <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
                Ihre Google-Bewertung hilft anderen Menschen in {region.name} und Umgebung,
                einen vertrauenswürdigen Direktanbieter zu finden. Vielen Dank für Ihre Unterstützung!
              </p>
              <a
                href={COMPANY_INFO.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Auf Google bewerten – öffnet in neuem Tab"
              >
                <Button size="lg" className="btn-cta gap-2">
                  <Star className="h-5 w-5 fill-current" />
                  Jetzt auf Google bewerten
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      <CTASection
        title={`Jetzt Entrümpelung in ${region.name} anfragen`}
        description="Kostenlose Besichtigung, verbindlicher Festpreis, besenreine Übergabe."
      />
    </>
  );
}
