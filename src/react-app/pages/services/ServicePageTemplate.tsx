import {
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Users,
  Truck,
  FileCheck,
  BadgeCheck,
  MapPin,
  Home,
  Building2,
  Warehouse,
  Layers,
  Building,
  Package,
  Recycle,
  Leaf,
  Timer,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";
import { ServiceIntroSection } from "@/components/ui/service-intro-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  COMPANY_INFO,
  REGIONS,
  REVIEWS,
  SERVICES,
  SERVICE_AREAS_SUMMARY,
  generateServiceSchema,
  generateBreadcrumbSchema,
  generateLocalBusinessSchema,
  generateFAQSchema,
  generateReviewSchema,
} from "@/lib/seo";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Building2,
  Warehouse,
  Layers,
  Building,
  Package,
  Recycle,
  Truck,
};

interface ServicePageProps {
  service: {
    id: string;
    title: string;
    shortTitle: string;
    description: string;
    longDescription: string;
    icon: string;
    slug: string;
    metaTitle: string;
    metaDescription: string;
  };
  faqs: { question: string; answer: string }[];
  situations: { title: string; description: string }[];
  processSteps: { step: number; title: string; description: string }[];
  priceFactors: string[];
  // Optionaler H1-Override (SEO): sonst wird service.title verwendet
  h1?: string;
  // NEU: Erweiterte Content-Sektionen
  detailedDescription?: string;
  disposalInfo?: string;
  targetGroups?: { title: string; description: string }[];
  whyUsPoints?: string[];
  timeInfo?: string;
  // NEU: Service-Intro Bild-Text-Modul
  introImage?: string;
  introImageAlt?: string;
  introParagraphs?: string[];
}

export function ServicePageTemplate({
  service,
  faqs,
  situations,
  processSteps,
  priceFactors,
  h1,
  detailedDescription,
  disposalInfo,
  targetGroups,
  whyUsPoints,
  timeInfo,
  introImage,
  introImageAlt,
  introParagraphs,
}: ServicePageProps) {
  const Icon = iconMap[service.icon] || Package;
  const serviceSchema = generateServiceSchema(service as any);
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Startseite", url: "/" },
    { name: service.title, url: service.slug },
  ]);
  const localBusinessSchema = generateLocalBusinessSchema();
  const reviewSchema = generateReviewSchema(REVIEWS);

  const trustBadges = [
    { icon: BadgeCheck, text: "Keine Vermittlung" },
    { icon: Users, text: "Eigenes Team" },
    { icon: Shield, text: "Festpreisgarantie" },
    { icon: FileCheck, text: "Vollversichert" },
  ];

  // Default "Warum wir"-Punkte falls nicht übergeben
  const defaultWhyUsPoints = [
    "Keine Vermittlung – wir arbeiten selbst mit eigenem Team",
    "Festpreisgarantie nach kostenloser Besichtigung",
    "Seit 2015 im Havelland – über 500 erfolgreiche Entrümpelungen",
    "Vollversichert mit Betriebshaftpflicht",
    "5,0 Sterne Google-Bewertung – zufriedene Kunden bestätigen uns",
    "Besenreine Übergabe inklusive",
  ];

  // Default Zielgruppen falls nicht übergeben
  const defaultTargetGroups = [
    { title: "Privatpersonen", description: "Umzug, Todesfall, Verkleinerung – wir helfen diskret und zuverlässig." },
    { title: "Vermieter & Hausverwaltungen", description: "Schnelle Räumung für Neuvermietung oder nach Mieterwechsel." },
    { title: "Erbengemeinschaften", description: "Professionelle Auflösung von Nachlassimmobilien – neutral und respektvoll." },
  ];

  return (
    <>
      {/* JSON-LD im Body (fuer Google gueltig); <head>-Meta liefert das Astro-Layout */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 py-16 text-primary-foreground lg:py-24">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="section-container relative">
          <div className="mx-auto max-w-3xl text-center">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-primary-foreground/90">
              <a href="/" className="hover:text-primary-foreground">Startseite</a>
              <span className="mx-2">/</span>
              <span>{service.title}</span>
            </nav>

            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10">
              <Icon className="h-8 w-8" />
            </div>

            <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {h1 || service.title}
            </h1>

            <p className="mx-auto mb-6 max-w-2xl text-lg text-primary-foreground/90">
              {service.longDescription}
            </p>

            {/* Trust Badge - Single Line */}
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-lg bg-primary-foreground/10 px-4 py-3 text-sm backdrop-blur-sm sm:px-6">
                <BadgeCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="text-primary-foreground/90">
                  Keine Vermittlung – eigene Mitarbeiter, eigene Fahrzeuge, persönlicher Service
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={`tel:${COMPANY_INFO.phoneLink}`}>
                <Button size="lg" className="btn-cta text-lg">
                  <Phone className="h-5 w-5" />
                  {COMPANY_INFO.phone}
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
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ausführliche Erklärung: Was ist diese Leistung? */}
      {introImage && introParagraphs ? (
        <ServiceIntroSection
          title={`Was ist ${service.title}?`}
          imageSrc={introImage}
          imageAlt={introImageAlt || `${service.title} – Professioneller Einsatz`}
          paragraphs={introParagraphs}
        />
      ) : (
        <section className="section-container">
          <SectionHeader
            badge="Kurz erklärt"
            title={`Was ist ${service.title}?`}
            description={service.description}
          />
          <div className="mx-auto max-w-3xl">
            <div className="prose prose-lg text-muted-foreground">
              {detailedDescription ? (
                <div dangerouslySetInnerHTML={{ __html: detailedDescription.replace(/\n/g, '<br/>') }} />
              ) : (
                <p>
                  {service.longDescription} Wir übernehmen die komplette Arbeit: 
                  Von der Demontage über den Transport bis zur fachgerechten Entsorgung. 
                  Am Ende erhalten Sie eine besenreine Übergabe zum vereinbarten Festpreis.
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Ablauf */}
      <section className="bg-secondary">
        <div className="section-container">
          <SectionHeader
            badge="Der Ablauf"
            title="So funktioniert Ihre Entrümpelung"
            description="In wenigen Schritten zum sauberen Ergebnis."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {step.step}
                </div>
                {index < processSteps.length - 1 && (
                  <div className="absolute left-1/2 top-7 hidden h-0.5 w-full bg-border md:block" />
                )}
                <h3 className="mb-2 font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          
          {/* Zeitinfo */}
          {timeInfo && (
            <div className="mx-auto mt-8 max-w-2xl rounded-xl bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <Timer className="h-8 w-8 shrink-0 text-accent" />
                <div>
                  <h3 className="mb-2 font-semibold">Wie schnell können wir starten?</h3>
                  <p className="text-muted-foreground">{timeInfo}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Typische Einsatzfälle */}
      <section className="section-container">
        <SectionHeader
          badge="Typische Situationen"
          title="Wann brauchen Sie uns?"
          description="Praxisnahe Beispiele aus unserem Alltag."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {situations.map((situation, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <CheckCircle2 className="mb-3 h-8 w-8 text-success" />
                <h3 className="mb-2 font-semibold">{situation.title}</h3>
                <p className="text-sm text-muted-foreground">{situation.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Für wen? - Zielgruppen */}
      <section className="bg-secondary">
        <div className="section-container">
          <SectionHeader
            badge="Für wen?"
            title="Wir helfen Privat & Gewerbe"
            description="Unsere Kunden kommen aus allen Lebensbereichen."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {(targetGroups || defaultTargetGroups).map((group, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <Users className="mx-auto mb-4 h-10 w-10 text-primary" />
                  <h3 className="mb-2 text-lg font-semibold">{group.title}</h3>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Preise & Preisfaktoren */}
      <section className="section-container">
        <SectionHeader
          badge="Transparente Preise"
          title="Was kostet eine Entrümpelung?"
          description="Faire Festpreise nach kostenloser Besichtigung."
        />
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 rounded-xl bg-card p-6 shadow-sm">
            <h3 className="mb-4 font-semibold">Diese Faktoren beeinflussen den Preis:</h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {priceFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center">
            <p className="mb-4 text-sm text-muted-foreground">
              <Clock className="mr-1 inline h-4 w-4" />
              Preise gültig bis März 2026 | Letzte Aktualisierung: Januar 2026
            </p>
            <a href="/preise">
              <Button size="lg" className="gap-2">
                Alle Preise ansehen
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Fachgerechte Entsorgung */}
      <section className="bg-secondary">
        <div className="section-container">
          <SectionHeader
            badge="Umweltbewusst"
            title="Fachgerechte Entsorgung & Recycling"
            description="Was passiert mit Ihrem Entrümpelungsgut?"
          />
          <div className="mx-auto max-w-3xl">
            <div className="rounded-xl bg-card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <Leaf className="h-10 w-10 shrink-0 text-success" />
                <div>
                  {disposalInfo ? (
                    <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: disposalInfo.replace(/\n/g, '<br/>') }} />
                  ) : (
                    <div className="space-y-3 text-muted-foreground">
                      <p>
                        Wir arbeiten ausschließlich mit zertifizierten Entsorgungsbetrieben zusammen und achten auf maximale 
                        Wiederverwertung. Gut erhaltene Möbel und Gegenstände werden nach Möglichkeit gespendet oder weiterverkauft.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                          <span>Sperrmüll & Hausrat: Sortierung und umweltgerechte Entsorgung</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                          <span>Elektroschrott: Fachgerechte Verwertung über zertifizierte Betriebe</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                          <span>Sondermüll: Farben, Lacke, Chemikalien – separate Entsorgung</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                          <span>Metalle: Recycling – kann den Gesamtpreis reduzieren</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warum Sparschwein Entrümpelung? */}
      <section className="section-container">
        <SectionHeader
          badge="Ihre Vorteile"
          title="Warum Sparschwein Entrümpelung?"
          description="Was uns von anderen Anbietern unterscheidet."
        />
        <div className="mx-auto max-w-3xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(whyUsPoints || defaultWhyUsPoints).map((point, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg border bg-card p-4 shadow-sm">
                <Award className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
                <span className="text-foreground">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Einsatzgebiet – verlinkte Orte + Versprechen (keine Anfahrtskosten) */}
      <section className="bg-secondary">
        <div className="section-container">
          <SectionHeader
            badge="Einsatzgebiet"
            title="In Ihrer Region für Sie da"
            description={SERVICE_AREAS_SUMMARY.radiusText}
          />
          <div className="mx-auto max-w-5xl">
            {/* Versprechen-Karten */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Keine Anfahrtskosten</p>
                  <p className="text-sm text-muted-foreground">
                    In allen unten gelisteten Orten – kostenfrei vor Ort.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Besichtigung gratis</p>
                  <p className="text-sm text-muted-foreground">
                    Unverbindlich, vor Ort, mit Festpreisangebot.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Timer className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Schnell vor Ort</p>
                  <p className="text-sm text-muted-foreground">
                    Reaktion in unter 30 Minuten – oft Termin in 24–48 h.
                  </p>
                </div>
              </div>
            </div>

            {/* Verlinkte Orte */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
              <div className="mb-5 flex items-center justify-center gap-2 text-center">
                <MapPin className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Direkt zu Ihrem Ort</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {REGIONS.filter((r) => r.id !== "havelland").map((region) => (
                  <a key={region.id} href={region.slug}>
                    <Button variant="outline" size="sm" className="gap-2 hover:border-primary hover:bg-primary/5">
                      <MapPin className="h-4 w-4 text-primary" />
                      Entrümpelung {region.name}
                    </Button>
                  </a>
                ))}
              </div>
              <p className="mt-5 text-center text-sm text-muted-foreground">
                Ihr Ort ist nicht dabei? <a href={`tel:${COMPANY_INFO.phoneLink}`} className="font-medium text-primary underline-offset-2 hover:underline">Rufen Sie uns an</a> – wir prüfen Ihre Adresse kostenlos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-container">
        <SectionHeader
          badge="Häufige Fragen"
          title={`FAQ – ${service.shortTitle}`}
          description="Antworten auf die wichtigsten Fragen."
        />
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Deep-Links: Schnellzugriff aus dem FAQ heraus */}
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <a
              href="/preise#rechner"
              className="group flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <Timer className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Sofortpreis berechnen</p>
                <p className="text-xs text-muted-foreground">Kostenrechner für {service.shortTitle}</p>
              </div>
            </a>
            <a
              href="/preise"
              className="group flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Alle Festpreise</p>
                <p className="text-xs text-muted-foreground">Volumen-Tarife im Überblick</p>
              </div>
            </a>
            <a
              href={REGIONS.find((r) => r.isHeadquarters)?.slug || "/brieselang"}
              className="group flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Vor Ort im Havelland</p>
                <p className="text-xs text-muted-foreground">Brieselang, Falkensee, Nauen & mehr</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Weitere Leistungen – interne Cross-Verlinkung */}
      <section className="bg-secondary">
        <div className="section-container">
          <SectionHeader
            badge="Weitere Leistungen"
            title="Das könnte Sie auch interessieren"
            description="Unsere weiteren Räumungs- und Entsorgungsleistungen im Überblick."
          />
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {SERVICES.filter((s) => s.id !== service.id).slice(0, 8).map((other) => {
              const Icon = iconMap[other.icon] || Home;
              return (
                <a
                  key={other.id}
                  href={other.slug}
                  className="group flex flex-col items-center gap-2 rounded-xl border bg-card p-4 text-center shadow-sm transition-all hover:border-primary hover:shadow-md"
                  aria-label={`Mehr zu ${other.shortTitle}`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-semibold leading-tight">{other.shortTitle}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Abschluss-CTA */}
      <CTASection
        title={`Jetzt ${service.title} anfragen`}
        description="Kostenlose Besichtigung, verbindlicher Festpreis, besenreine Übergabe."
      />
    </>
  );
}