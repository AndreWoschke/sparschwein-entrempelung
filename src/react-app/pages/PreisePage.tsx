import {
  Phone,
  MessageCircle,
  CheckCircle2,
  Shield,
  Eye,
  Sparkles,
  Home,
  Building2,
  Warehouse,
  Layers,
  Building,
  Package,
  Trash2,
  Recycle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COMPANY_INFO, REVIEWS, FAQ_ITEMS, generateBreadcrumbSchema, generateLocalBusinessSchema, generateFAQSchema, generateReviewSchema } from "@/lib/seo";
import { EntruempelungsRechner } from "@/components/calculator/EntruempelungsRechner";

const services = [
  {
    id: "wohnungsaufloesung",
    title: "Wohnungsentrümpelung",
    icon: Home,
    priceRange: "ab 99 €",
    description: "Komplette Räumung einer Wohnung inkl. aller Möbel, Hausrat und Gegenstände.",
    includes: [
      "Demontage von Möbeln",
      "Abtransport aller Gegenstände",
      "Besenreine Übergabe",
      "Fachgerechte Entsorgung",
    ],
  },
  {
    id: "hausentruempelung",
    title: "Hausentrümpelung",
    icon: Building2,
    priceRange: "ab 799 €",
    description: "Komplette Entrümpelung eines Hauses inkl. aller Räume, Keller und Dachboden.",
    includes: [
      "Alle Etagen & Räume",
      "Keller & Dachboden inklusive",
      "Garten & Nebengebäude optional",
      "Besenreine Übergabe",
    ],
  },
  {
    id: "kellerentruempelung",
    title: "Kellerentrümpelung",
    icon: Warehouse,
    priceRange: "ab 99 €",
    description: "Professionelle Räumung von Kellerräumen – auch bei schwierigen Zugängen.",
    includes: [
      "Räumung aller Kellerräume",
      "Entsorgung von Sperrmüll",
      "Auch bei engen Treppen",
      "Besenreine Übergabe",
    ],
  },
  {
    id: "dachbodenentruempelung",
    title: "Dachbodenentrümpelung",
    icon: Layers,
    priceRange: "ab 99 €",
    description: "Entrümpelung von Dachböden und Speichern – sicher und gründlich.",
    includes: [
      "Räumung des gesamten Dachbodens",
      "Auch bei beengten Verhältnissen",
      "Fachgerechte Entsorgung",
      "Besenreine Übergabe",
    ],
  },
  {
    id: "haushaltsaufloesung",
    title: "Haushaltsauflösung",
    icon: Package,
    priceRange: "ab 399 €",
    description: "Komplette Auflösung eines Haushalts inkl. Verwertung brauchbarer Gegenstände.",
    includes: [
      "Komplette Haushaltsräumung",
      "Verwertung werthaltiger Gegenstände",
      "Preisreduzierung möglich",
      "Besenreine Übergabe",
    ],
  },
  {
    id: "firmenentruempelung",
    title: "Firmen- & Gewerbeentrümpelung",
    icon: Building,
    priceRange: "auf Anfrage",
    description: "Büro- und Gewerbeentrümpelung für Unternehmen. Diskret, schnell und effizient.",
    includes: [
      "Büromöbel & Technik",
      "Aktenvernichtung optional",
      "Flexible Terminplanung",
      "Minimale Betriebsunterbrechung",
    ],
  },
  {
    id: "sperrmuellentsorgung",
    title: "Sperrmüllentsorgung",
    icon: Trash2,
    priceRange: "ab 99 €",
    description: "Schnelle Abholung und Entsorgung von Sperrmüll – auch kurzfristig.",
    includes: [
      "Abholung vor Ort",
      "Auch Einzelstücke",
      "Kurzfristige Termine möglich",
      "Umweltgerechte Entsorgung",
    ],
  },
  {
    id: "schrottabholung",
    title: "Schrottabholung & Entsorgung",
    icon: Recycle,
    priceRange: "kostenlos*",
    description: "Kostenlose Abholung von Altmetall und Schrott bei größeren Mengen.",
    includes: [
      "Kostenlose Abholung",
      "Alle Arten von Metall",
      "Umweltgerechtes Recycling",
      "Auch bei größeren Mengen",
    ],
    note: "*Bei größeren Mengen kostenlos, sonst gegen geringe Gebühr",
  },
];

const trustElements = [
  {
    icon: Eye,
    title: "Kostenlose Besichtigung",
    description: "Wir besichtigen vor Ort und erstellen ein unverbindliches Angebot",
  },
  {
    icon: Shield,
    title: "Festpreisgarantie",
    description: "Der vereinbarte Preis ist verbindlich – keine Nachforderungen",
  },
  {
    icon: Sparkles,
    title: "Besenreine Übergabe",
    description: "Wir hinterlassen die Räume sauber und bezugsfertig",
  },
];

export default function PreisePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Startseite", url: "/" },
    { name: "Preise", url: "/preise" },
  ]);
  const localBusinessSchema = generateLocalBusinessSchema();
  // Preis-relevante FAQs für Featured Snippets
  const pricingFaqs = FAQ_ITEMS.filter((f) =>
    /preis|kost|festpreis|sondermüll|brauchbar/i.test(f.question)
  );
  const faqSchema = generateFAQSchema(pricingFaqs);
  const reviewSchema = generateReviewSchema(REVIEWS);

  return (
    <>
      {/* JSON-LD im Body; <head>-Meta liefert das Astro-Layout (preise.astro) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 py-16 text-primary-foreground lg:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="section-container relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              🐷 Transparent & fair
            </span>
            <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Faire & transparente Preise{" "}
              <span className="text-accent">für Entrümpelungen</span>
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-lg text-primary-foreground/90">
              Festpreise nach kostenloser Besichtigung. Keine versteckten Kosten –
              Sie wissen vorher genau, was es kostet.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="relative -mt-8 z-10" aria-label="Unsere Versprechen">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {trustElements.map((element, index) => (
              <Card key={index} className="border-none bg-card shadow-lg">
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <element.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-semibold">{element.title}</p>
                    <p className="text-sm text-muted-foreground">{element.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Calculator */}
      <section className="section-container" id="rechner" aria-labelledby="rechner-heading">
        <div className="mx-auto max-w-2xl">
          <h2 id="rechner-heading" className="mb-6 text-center text-2xl font-bold sm:text-3xl">
            Kostenrechner Entrümpelung
          </h2>
          <EntruempelungsRechner />
        </div>
      </section>

      {/* Introduction */}
      <section className="section-container pt-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold">Warum variieren die Preise?</h2>
          <p className="text-muted-foreground">
            Jede Entrümpelung ist individuell. Der Endpreis hängt von verschiedenen
            Faktoren ab: dem Volumen des zu entsorgenden Materials, der Etage,
            den Laufwegen und eventuell notwendigen Demontagearbeiten. Deshalb
            bieten wir eine <strong>kostenlose Besichtigung</strong> an, nach der
            Sie ein <strong>verbindliches Festpreisangebot</strong> erhalten –
            ohne versteckte Kosten.
          </p>
        </div>
      </section>

      {/* Services Pricing */}
      <section className="bg-secondary py-16 lg:py-24">
        <div className="section-container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              Unsere Leistungen & Preise
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Alle Preise sind Richtwerte. Nach einer kostenlosen Besichtigung
              erhalten Sie Ihren individuellen Festpreis.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.id} className="card-hover flex flex-col">
                <CardHeader className="pb-4">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <div className="mt-1">
                    <span className="text-2xl font-bold text-accent">
                      {service.priceRange}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="mb-4 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <ul className="mb-4 flex-1 space-y-2">
                    {service.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-success mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {service.note && (
                    <p className="mt-auto text-xs text-muted-foreground italic">
                      {service.note}
                    </p>
                  )}
                  <p className="mt-3 text-xs text-muted-foreground border-t pt-3">
                    Endpreis nach kostenloser Besichtigung
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground lg:py-20">
        <div className="section-container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
              Jetzt kostenlos & unverbindlich anfragen
            </h2>
            <p className="mb-8 text-primary-foreground/90">
              Vereinbaren Sie eine kostenlose Besichtigung und erhalten Sie Ihr
              persönliches Festpreisangebot – ohne versteckte Kosten.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={`tel:${COMPANY_INFO.phoneLink}`}>
                <Button
                  size="lg"
                  className="btn-cta text-lg"
                >
                  <Phone className="h-5 w-5" />
                  Jetzt anrufen
                </Button>
              </a>
              <a
                href={COMPANY_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="gap-2 bg-[#25D366] text-lg text-white hover:bg-[#20BD5A]"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp schreiben
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ-like Trust Section */}
      <section className="section-container">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-2xl font-bold">
            Häufige Fragen zu unseren Preisen
          </h2>
          <div className="space-y-6">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-2 font-semibold">
                Sind die angegebenen Preise verbindlich?
              </h3>
              <p className="text-muted-foreground">
                Die Preise auf dieser Seite sind Richtwerte. Nach einer kostenlosen
                Besichtigung erhalten Sie ein verbindliches Festpreisangebot, das
                garantiert eingehalten wird.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-2 font-semibold">
                Gibt es versteckte Kosten?
              </h3>
              <p className="text-muted-foreground">
                Nein! Der vereinbarte Festpreis ist der Endpreis. Es gibt keine
                Nachforderungen oder versteckten Kosten – das garantieren wir.
              </p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-2 font-semibold">
                Was kann den Preis reduzieren?
              </h3>
              <p className="text-muted-foreground">
                Gut erhaltene Möbel und Wertgegenstände können den Preis reduzieren,
                da wir diese weiter verwerten. Je mehr verwertbare Gegenstände
                vorhanden sind, desto günstiger wird es für Sie.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
