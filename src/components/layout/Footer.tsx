import { Phone, Mail, MapPin, Clock, MessageCircle, Facebook } from "lucide-react";
import { COMPANY_INFO, SERVICES, REGIONS } from "@/lib/seo";

export function Footer() {
  return (
    <footer role="contentinfo" className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Kontakt */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground text-xl">
                🐷
              </div>
              <span className="text-lg font-bold">Sparschwein Entrümpelung</span>
            </div>
            <p className="mb-4 text-sm text-primary-foreground/80">
              Ihr zuverlässiger Partner für Entrümpelungen im Havelland. Über 10
              Jahre Erfahrung, faire Festpreise und besenreine Übergabe.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {COMPANY_INFO.address.street}, {COMPANY_INFO.address.postalCode}{" "}
                  {COMPANY_INFO.address.city}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY_INFO.phoneLink}`}
                  className="flex items-center gap-2 hover:underline"
                  aria-label={`Anrufen: ${COMPANY_INFO.phone}`}
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-2 hover:underline"
                  aria-label={`E-Mail senden an ${COMPANY_INFO.email}`}
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{COMPANY_INFO.openingHoursText}</span>
              </li>
            </ul>
          </div>

          {/* Leistungen */}
          <nav aria-label="Leistungen">
            <h3 className="mb-4 text-lg font-semibold">Leistungen</h3>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href={service.slug}
                    className="text-primary-foreground/80 hover:text-primary-foreground hover:underline"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Regionen */}
          <nav aria-label="Einsatzgebiete">
            <h3 className="mb-4 text-lg font-semibold">Einsatzgebiete</h3>
            <ul className="space-y-2 text-sm">
              {REGIONS.map((region) => (
                <li key={region.id}>
                  <a
                    href={region.slug}
                    className="text-primary-foreground/80 hover:text-primary-foreground hover:underline"
                  >
                    Entrümpelung {region.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Rechtliches & Navigation */}
          <div>
            <nav aria-label="Schnellzugriff">
              <h3 className="mb-4 text-lg font-semibold">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/"
                    className="text-primary-foreground/80 hover:text-primary-foreground hover:underline"
                  >
                    Startseite
                  </a>
                </li>
                <li>
                  <a
                    href="/#ablauf"
                    className="text-primary-foreground/80 hover:text-primary-foreground hover:underline"
                  >
                    So läuft es ab
                  </a>
                </li>
                <li>
                  <a
                    href="/preise"
                    className="text-primary-foreground/80 hover:text-primary-foreground hover:underline"
                  >
                    Preise
                  </a>
                </li>
                <li>
                  <a
                    href="/#kundenstimmen"
                    className="text-primary-foreground/80 hover:text-primary-foreground hover:underline"
                  >
                    Glückliche Kunden
                  </a>
                </li>
                <li>
                  <a
                    href="/#faq"
                    className="text-primary-foreground/80 hover:text-primary-foreground hover:underline"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-label="Rechtliche Informationen">
              <h3 className="mb-2 mt-6 text-lg font-semibold">Rechtliches</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/impressum"
                    rel="nofollow"
                    className="text-primary-foreground/80 hover:text-primary-foreground hover:underline"
                  >
                    Impressum
                  </a>
                </li>
                <li>
                  <a
                    href="/datenschutz"
                    rel="nofollow"
                    className="text-primary-foreground/80 hover:text-primary-foreground hover:underline"
                  >
                    Datenschutz
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-sm text-primary-foreground/80">
              <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. Alle Rechte vorbehalten.</p>
              <p className="mt-1 text-xs">
                Inhaber: {COMPANY_INFO.owner.name} |
                {COMPANY_INFO.address.street}, {COMPANY_INFO.address.postalCode} {COMPANY_INFO.address.city}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.facebook.com/sparschweinentruempelung"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1877F2] text-white transition-colors hover:bg-[#0e5fc4]"
                aria-label="Facebook-Seite von Sparschwein Entrümpelung besuchen"
              >
                <Facebook className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={COMPANY_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#20BD5A]"
                aria-label="WhatsApp-Nachricht senden"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={`tel:${COMPANY_INFO.phoneLink}`}
                className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                aria-label={`Anrufen: ${COMPANY_INFO.phone}`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Jetzt anrufen
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
