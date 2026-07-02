import { Link } from "react-router-dom";
import {
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  Star,
  Users,
  Home,
  Building2,
  Warehouse,
  Layers,
  Building,
  Package,
  Trash2,
  Recycle,
  MapPin,
  Truck,
  Award,
  FileCheck,
  ThumbsUp,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/ui/cta-section";
import { LazyGoogleMap } from "@/components/ui/lazy-google-map";
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
  PRICING,
  REVIEWS,
  FAQ_ITEMS,
  generateLocalBusinessSchema,
  generateFAQSchema,
  generateServiceSchema,
  generateOrganizationSchema,
  generateReviewSchema,
  generateBreadcrumbSchema,
  generateWebSiteSchema,
} from "@/lib/seo";

// LCP Image: Import and preload for priority loading
import sparschweinImage from "@/assets/sparschwein-entruempelung.webp";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Building2,
  Warehouse,
  Layers,
  Building,
  Package,
  Trash2,
  Recycle,
};

// Konkrete Statistiken für Vertrauen und SEO
const heroStats = [
  {
    value: "500+",
    label: "Entrümpelungen",
    description: "erfolgreich durchgeführt",
  },
  {
    value: "Ø 30 Min.",
    label: "Rückrufzeit",
    description: "schnelle Reaktion garantiert",
  },
  {
    value: "Seit 2015",
    label: "Regional tätig",
    description: "in Brieselang & Havelland",
  },
  {
    value: "2-3",
    label: "Fahrzeuge",
    description: "täglich im Einsatz",
  },
];

const usps = [
  {
    icon: BadgeCheck,
    title: "Keine Vermittlung",
    description: "Wir arbeiten selbst – eigene Mitarbeiter, eigene Fahrzeuge",
  },
  {
    icon: Users,
    title: "Familienunternehmen",
    description: "Persönlicher Service mit Herz – seit 2015",
  },
  {
    icon: Truck,
    title: "Eigene Fahrzeuge",
    description: "2-3 Transporter täglich im Einsatz im Havelland",
  },
  {
    icon: Shield,
    title: "Festpreisgarantie",
    description: "Verbindlicher Preis nach Besichtigung – keine Nachzahlung",
  },
  {
    icon: FileCheck,
    title: "Vollversichert",
    description: "Betriebshaftpflichtversicherung für Ihre Sicherheit",
  },
];

const trustBadges = [
  { icon: Award, text: "5,0 ★ Google-Bewertung" },
  { icon: FileCheck, text: "Kostenlose Besichtigung" },
  { icon: ThumbsUp, text: "Festpreis ohne Nachzahlung" },
  { icon: Truck, text: "2-3 Fahrzeuge täglich" },
];

const processSteps = [
  {
    step: 1,
    title: "Kontakt aufnehmen",
    description:
      "Rufen Sie uns an oder schreiben Sie per WhatsApp. Rückruf meist innerhalb von 30 Minuten.",
    stat: "Ø 30 Min.",
  },
  {
    step: 2,
    title: "Kostenlose Besichtigung",
    description:
      "Wir besichtigen vor Ort und erstellen ein verbindliches Festpreisangebot – kostenlos.",
    stat: "100% kostenlos",
  },
  {
    step: 3,
    title: "Besenreine Übergabe",
    description:
      "Wir erledigen die komplette Arbeit. Sie erhalten eine besenreine Übergabe zum vereinbarten Preis.",
    stat: "Garantiert",
  },
];

export default function HomePage() {
  const localBusinessSchema = generateLocalBusinessSchema();
  const faqSchema = generateFAQSchema(FAQ_ITEMS.slice(0, 6));
  const serviceSchema = generateServiceSchema();
  const organizationSchema = generateOrganizationSchema();
  const reviewSchema = generateReviewSchema(REVIEWS);
  const websiteSchema = generateWebSiteSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Startseite", url: "/" },
  ]);

  return (
    <>
      {/* JSON-LD im Body; <head>-Meta liefert das Astro-Layout (index.astro) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero Section mit Inhaber & Anti-Vermittler */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 py-20 text-primary-foreground lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" aria-hidden="true" />
        <div className="section-container relative">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-semibold backdrop-blur-sm">
              🐷 Ihr Entrümpelungs-Profi im Havelland – seit 2015
            </span>
            
            <h1 id="hero-heading" className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Entrümpelung & Haushaltsauflösung{" "}
              <span className="block text-accent sm:inline">zum Festpreis</span>
            </h1>
            
            <p className="mx-auto mb-6 max-w-2xl text-lg text-primary-foreground/90 sm:text-xl">
              Ihre Entrümpelungsfirma für Brieselang, Falkensee & das Havelland: über 500
              erfolgreiche Entrümpelungen, Festpreis nach kostenloser Besichtigung –
              besenreine Übergabe garantiert.
            </p>

            {/* Anti-Vermittler Statement */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-lg border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-2 text-sm">
              <CheckCircle2 className="h-5 w-5 text-accent" aria-hidden="true" />
              <span className="font-medium">Keine Vermittlung – eigene Mitarbeiter, eigene Fahrzeuge, persönlicher Service</span>
            </div>

            {/* Trust Badges */}
            <ul className="mb-8 flex flex-wrap items-center justify-center gap-3" aria-label="Vorteile">
              {trustBadges.map((badge, index) => (
                <li
                  key={index}
                  className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 text-sm font-medium backdrop-blur-sm"
                >
                  <badge.icon className="h-4 w-4" aria-hidden="true" />
                  {badge.text}
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={`tel:${COMPANY_INFO.phoneLink}`} aria-label={`Anrufen: ${COMPANY_INFO.phone}`}>
                <Button size="lg" className="btn-cta text-lg">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Jetzt anrufen: {COMPANY_INFO.phone}
                </Button>
              </a>
              <a
                href={COMPANY_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp-Nachricht senden"
              >
                <Button
                  size="lg"
                  className="gap-2 bg-[#25D366] text-lg text-white hover:bg-[#20BD5A]"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  WhatsApp schreiben
                </Button>
              </a>
            </div>

            {/* Öffnungszeiten-Hinweis */}
            <p className="mt-4 text-sm text-primary-foreground/90">
              <Clock className="mr-1 inline h-4 w-4" aria-hidden="true" />
              {COMPANY_INFO.openingHoursText} | Rückruf garantiert innerhalb 30 Min.
            </p>

            {/* Hero Statistics */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {heroStats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-primary-foreground/10 p-4 backdrop-blur-sm"
                >
                  <div className="text-2xl font-bold sm:text-3xl">{stat.value}</div>
                  <div className="text-sm font-semibold">{stat.label}</div>
                  <div className="text-xs text-primary-foreground/90">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* USPs */}
      <section className="relative -mt-10 z-10" aria-labelledby="usp-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="usp-heading" className="mb-6 text-center text-2xl font-bold sm:text-3xl">Unsere Vorteile</h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {usps.map((usp, index) => (
              <li key={index}>
                <Card className="card-hover border-none bg-card shadow-lg h-full">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <usp.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="mb-1 font-semibold">{usp.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {usp.description}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process with Stats */}
      <section id="ablauf" className="section-container" aria-labelledby="ablauf-heading">
        <SectionHeader
          id="ablauf-heading"
          badge="So einfach geht's"
          title="Entrümpelung Havelland – So läuft es ab"
          description="In nur 3 Schritten zur professionellen Haushaltsauflösung in Brieselang, Falkensee & Umgebung."
        />
        <ol className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <li key={index} className="relative text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground" aria-hidden="true">
                {step.step}
              </div>
              {index < processSteps.length - 1 && (
                <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border md:block" aria-hidden="true" />
              )}
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="mb-2 text-muted-foreground">{step.description}</p>
              <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
                {step.stat}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* Über uns / Entity Section */}
      <section id="ueber-uns" className="bg-secondary" aria-labelledby="ueber-uns-heading">
        <div className="section-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left: Team Image */}
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                <img 
                  src={sparschweinImage} 
                  alt="Sparschwein Entrümpelung - Team und Fahrzeuge im Havelland"
                  width={600}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 rounded-xl bg-accent p-4 text-accent-foreground shadow-lg lg:-right-8">
                <div className="text-2xl font-bold">Seit 2015</div>
                <div className="text-sm">im Havelland</div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                Über uns
              </span>
              <h2 id="ueber-uns-heading" className="mb-4 text-3xl font-bold">
                Ihre Entrümpelungsfirma im Havelland
              </h2>
              <p className="mb-6 text-lg text-muted-foreground">
                Seit 2015 führen wir Sparschwein Entrümpelung als inhabergeführte
                Entrümpelungsfirma und Familienbetrieb in Brieselang. Was uns von großen
                Anbietern unterscheidet: Bei uns bekommen Sie persönlichen Service –
                keine anonyme Hotline, keine Subunternehmer.
              </p>
              
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-card p-4 shadow-sm">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Entrümpelungen</div>
                </div>
                <div className="rounded-lg bg-card p-4 shadow-sm">
                  <div className="text-2xl font-bold text-primary">10+ Jahre</div>
                  <div className="text-sm text-muted-foreground">Erfahrung</div>
                </div>
                <div className="rounded-lg bg-card p-4 shadow-sm">
                  <div className="text-2xl font-bold text-primary">2-3</div>
                  <div className="text-sm text-muted-foreground">Eigene Fahrzeuge</div>
                </div>
                <div className="rounded-lg bg-card p-4 shadow-sm">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Lokal & direkt</div>
                </div>
              </div>

              <ul className="flex flex-col gap-3 rounded-lg border border-success/20 bg-success/5 p-4">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-success" aria-hidden="true" />
                  <span><strong>Keine Vermittlung</strong> – Wir arbeiten selbst</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-success" aria-hidden="true" />
                  <span><strong>Eigene Mitarbeiter</strong> – Eingespieltes Team</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-success" aria-hidden="true" />
                  <span><strong>Eigene Fahrzeuge</strong> – 2-3 Transporter täglich</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-success" aria-hidden="true" />
                  <span><strong>Vollversichert</strong> – Betriebshaftpflicht</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Teaser */}
      <section aria-labelledby="leistungen-heading">
        <div className="section-container">
          <SectionHeader
            id="leistungen-heading"
            badge="Unsere Leistungen"
            title="Entrümpelung & Haushaltsauflösung im Havelland"
            description="Von Wohnungsentrümpelung über Kellerentrümpelung bis Schrottabholung – Ihr zuverlässiger Partner vor Ort."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((service) => {
              const Icon = iconMap[service.icon] || Package;
              return (
                <a key={service.id} href={service.slug}>
                  <Card className="card-hover h-full">
                    <CardContent className="p-6">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="mb-2 font-semibold">{service.title}</h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {service.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Mehr erfahren <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </CardContent>
                  </Card>
                </a>
              );
            })}
          </div>
          {/* Alle 6 Leistungen werden bereits oben angezeigt */}
        </div>
      </section>
      {/* Pricing Teaser */}
      <section className="section-container" aria-labelledby="preise-heading">
        <SectionHeader
          id="preise-heading"
          badge="Faire Festpreise"
          title="Transparente Preise ohne Überraschungen"
          description="Keine versteckten Kosten – Sie wissen vorher, was es kostet."
        />
        <p className="mb-8 text-center text-sm text-muted-foreground">
          <Clock className="mr-1 inline h-4 w-4" />
          Preise gültig bis März 2026 | Letzte Aktualisierung: Januar 2026
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING.map((tier) => (
            <Card
              key={tier.id}
              className={`card-hover relative ${
                tier.popular ? "border-2 border-accent shadow-xl" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-accent px-4 py-1 text-sm font-semibold text-accent-foreground">
                    Beliebt
                  </span>
                </div>
              )}
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold">{tier.name}</h3>
                <p className="text-sm text-muted-foreground">{tier.volume}</p>
                <div className="my-4">
                  <span className="text-4xl font-bold">{tier.price}€</span>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  {tier.description}
                </p>
                <ul className="mb-6 space-y-2 text-left text-sm">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-success" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="/preise">
            <Button variant="outline" size="lg" className="gap-2">
              Mehr zu unseren Preisen
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </a>
        </div>
      </section>

      {/* CTA */}
      <CTASection variant="accent" />

      {/* Reviews Teaser mit echten Daten / Kundenstimmen */}
      <section id="kundenstimmen" className="section-container" aria-labelledby="kundenstimmen-heading">
        <SectionHeader
          id="kundenstimmen-heading"
          badge="Kundenstimmen"
          title="Das sagen unsere Kunden im Havelland"
          description="Echte Bewertungen aus unserem Google-Unternehmensprofil – zuletzt aktualisiert Januar 2026"
        />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: Review Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {REVIEWS.slice(0, 4).map((review) => (
              <Card key={review.id} className="card-hover">
                <CardContent className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex" role="img" aria-label={`${review.rating} von 5 Sternen`}>
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-warning text-warning"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{review.location}</span>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">"{review.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{review.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Right: Lazy-loaded Google Maps */}
          <LazyGoogleMap
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2424.2443392588875!2d13.011592499999999!3d52.58327549999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8fbab8e553643%3A0x367a88f674ce0d1b!2sSparschwein-Entr%C3%BCmpelung%20%E2%80%93%20Schrottabholung%20%26%20Haushaltsaufl%C3%B6sung!5e0!3m2!1sde!2sde!4v1769190687348!5m2!1sde!2sde"
            title="Sparschwein Entrümpelung Standort Brieselang"
            className="overflow-hidden rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Regions Teaser - Compact Tag/Pill Layout */}
      <section className="bg-secondary" aria-labelledby="regionen-heading">
        <div className="section-container">
          <SectionHeader
            id="regionen-heading"
            badge="Einsatzgebiete"
            title="Wir sind in Ihrer Nähe – kostenlose Anfahrt"
            description="Die Firma um die Ecke: Im gesamten Havelland und Umgebung berechnen wir keine Anfahrtskosten – weder zur Besichtigung noch zur Durchführung."
          />
          
          {/* Compact card with pill-style location links */}
          <div className="mx-auto max-w-2xl">
            <Card className="border bg-card shadow-sm">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center justify-center gap-2 rounded-lg bg-accent/10 px-4 py-3 text-center">
                  <Truck className="h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <p className="text-sm font-semibold text-foreground">
                    Anfahrt zu allen Orten <span className="text-accent">100% kostenlos</span> – auch zur Besichtigung.
                  </p>
                </div>
                <h3 className="mb-4 text-center text-lg font-semibold">
                  Direkt zu Ihrem Ort:
                </h3>
                <p className="mx-auto mb-5 max-w-xl text-center text-sm text-muted-foreground">
                  Besonders häufig im Einsatz sind wir bei der{" "}
                  <a href="/entruempelung-brieselang" className="font-medium text-primary underline-offset-2 hover:underline">Entrümpelung Brieselang</a>,{" "}
                  <a href="/entruempelung-falkensee" className="font-medium text-primary underline-offset-2 hover:underline">Entrümpelung Falkensee</a>{" "}
                  und der <a href="/entruempelung-nauen" className="font-medium text-primary underline-offset-2 hover:underline">Entrümpelung Nauen</a>.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {REGIONS.map((region) => (
                    <a
                      key={region.id}
                      href={region.slug}
                      className={`inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-sm font-medium transition-all hover:border-primary hover:bg-primary/5 hover:text-primary ${
                        region.isHeadquarters
                          ? "border-primary text-primary"
                          : "border-border text-foreground"
                      }`}
                    >
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      Entrümpelung {region.name}
                    </a>
                  ))}
                </div>
                <p className="mt-5 text-center text-sm text-muted-foreground">
                  Darüber hinaus sind wir im Umkreis von ca. 50 km rund um Brieselang im Einsatz – auch hier ohne Anfahrtskosten.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Table - Mobile Optimized */}
      <section className="section-container" aria-labelledby="vergleich-heading">
        <SectionHeader
          id="vergleich-heading"
          badge="Warum wir?"
          title="Sparschwein Entrümpelung vs. Andere"
        />
        {/* Mobile: Card-based layout, Desktop: Table */}
        <div className="mx-auto max-w-3xl">
          {/* Desktop Table - hidden on mobile */}
          <div className="hidden sm:block overflow-hidden rounded-xl border bg-card shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-secondary">
                  <th className="p-4 text-left font-semibold">Merkmal</th>
                  <th className="p-4 text-center font-semibold text-primary">
                    🐷 Sparschwein
                  </th>
                  <th className="p-4 text-center font-semibold text-muted-foreground">
                    Andere
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Eigene Mitarbeiter", true, "oft Subunternehmer"],
                  ["Eigene Fahrzeuge", true, "oft gemietet"],
                  ["Inhaber vor Ort", true, false],
                  ["Keine Vermittlung", true, false],
                  ["Kostenlose Besichtigung", true, false],
                  ["Verbindlicher Festpreis", true, false],
                  ["Keine versteckten Kosten", true, false],
                  ["Besenreine Übergabe", true, "teilweise"],
                  ["Kurzfristige Termine", true, "selten"],
                  ["Umweltgerechte Entsorgung", true, "nicht immer"],
                ].map(([feature, us, others], index) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="p-4 font-medium">{feature}</td>
                    <td className="p-4 text-center">
                      {us === true ? (
                        <>
                          <CheckCircle2 className="mx-auto h-6 w-6 text-success" aria-hidden="true" />
                          <span className="sr-only">Ja</span>
                        </>
                      ) : (
                        <span>{us}</span>
                      )}
                    </td>
                    <td className="p-4 text-center text-muted-foreground">
                      {others === false ? (
                        <>
                          <span className="text-destructive" aria-hidden="true">✗</span>
                          <span className="sr-only">Nein</span>
                        </>
                      ) : (
                        <span>{others}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout - visible only on mobile */}
          <div className="sm:hidden space-y-3">
            {/* Header */}
            <div className="grid grid-cols-3 gap-2 rounded-lg bg-secondary p-3 text-center">
              <div className="text-left text-sm font-semibold">Merkmal</div>
              <div className="flex flex-col items-center">
                <span className="text-lg">🐷</span>
                <span className="text-xs font-semibold text-primary">Wir</span>
              </div>
              <div className="text-xs font-semibold text-muted-foreground">Andere</div>
            </div>
            
            {/* Comparison Items */}
            {[
              ["Eigene Mitarbeiter", true, "Subunternehmer"],
              ["Eigene Fahrzeuge", true, "gemietet"],
              ["Inhaber vor Ort", true, false],
              ["Keine Vermittlung", true, false],
              ["Kostenlose Besichtigung", true, false],
              ["Verbindlicher Festpreis", true, false],
              ["Keine versteckten Kosten", true, false],
              ["Besenreine Übergabe", true, "teilweise"],
              ["Kurzfristige Termine", true, "selten"],
              ["Umweltgerechte Entsorgung", true, "nicht immer"],
            ].map(([feature, us, others], index) => (
              <div 
                key={index} 
                className="grid grid-cols-3 gap-2 items-center rounded-lg border bg-card p-3"
              >
                <div className="text-sm font-medium leading-tight">{feature}</div>
                <div className="flex justify-center">
                  {us === true ? (
                    <>
                      <CheckCircle2 className="h-6 w-6 text-success" aria-hidden="true" />
                      <span className="sr-only">Ja</span>
                    </>
                  ) : (
                    <span className="text-xs text-center">{us}</span>
                  )}
                </div>
                <div className="text-center">
                  {others === false ? (
                    <>
                      <span className="text-lg text-destructive" aria-hidden="true">✗</span>
                      <span className="sr-only">Nein</span>
                    </>
                  ) : (
                    <span className="text-xs text-muted-foreground">{others}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-container" aria-labelledby="faq-heading">
        <SectionHeader
          id="faq-heading"
          badge="Häufige Fragen"
          title="FAQ – Ihre Fragen zur Entrümpelung"
          description="Transparente Antworten auf die wichtigsten Fragen rund um Entrümpelung, Preise und Ablauf."
        />
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.slice(0, 6).map((faq, index) => (
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
        </div>
        <div className="mt-8 text-center">
          <p className="mb-4 text-muted-foreground">
            Noch Fragen? Wir beraten Sie gerne persönlich.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href={`tel:${COMPANY_INFO.phoneLink}`} aria-label={`Anrufen: ${COMPANY_INFO.phone}`}>
              <Button variant="outline" className="gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {COMPANY_INFO.phone}
              </Button>
            </a>
            <a
              href={COMPANY_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp-Nachricht senden"
            >
              <Button className="gap-2 bg-[#25D366] text-white hover:bg-[#20BD5A]">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA / Kontakt */}
      <div id="kontakt">
        <CTASection
          title="Bereit für eine stressfreie Entrümpelung?"
          description="Über 500 zufriedene Kunden vertrauen uns. Kontaktieren Sie uns für ein kostenloses Angebot."
        />
      </div>
    </>
  );
}
