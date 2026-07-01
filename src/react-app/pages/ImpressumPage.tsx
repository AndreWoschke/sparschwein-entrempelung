import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { COMPANY_INFO } from "@/lib/seo";

export default function ImpressumPage() {
  return (
    <Layout>
      <Helmet>
        <title>Impressum | Sparschwein Entrümpelung</title>
        <meta name="description" content="Impressum der Sparschwein Entrümpelung – Angaben gemäß § 5 TMG und § 18 MStV." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="section-container py-12 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold lg:text-4xl">Impressum</h1>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            {/* Angaben gemäß § 5 TMG */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
              <p className="text-muted-foreground">
                <strong>{COMPANY_INFO.name}</strong><br />
                Inhaber: Stefan Wagner und Andre Woschke<br />
                {COMPANY_INFO.address.street}<br />
                {COMPANY_INFO.address.postalCode} {COMPANY_INFO.address.city}<br />
                Deutschland
              </p>
            </section>

            {/* Kontakt */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Kontakt</h2>
              <p className="text-muted-foreground">
                Telefon: <a href={`tel:${COMPANY_INFO.phoneLink}`} className="text-primary hover:underline">{COMPANY_INFO.phone}</a><br />
                E-Mail: <a href={`mailto:${COMPANY_INFO.email}`} className="text-primary hover:underline">{COMPANY_INFO.email}</a>
              </p>
            </section>


            {/* Berufsbezeichnung */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Berufsbezeichnung und berufsrechtliche Regelungen</h2>
              <p className="text-muted-foreground">
                Berufsbezeichnung: Entrümpelungsdienstleister / Haushaltsauflösungen<br />
                Zuständige Kammer: Keine Kammerzugehörigkeit erforderlich<br />
                Es gelten keine besonderen berufsrechtlichen Regelungen.
              </p>
            </section>

            {/* Verantwortlich für den Inhalt */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
              <p className="text-muted-foreground">
                {COMPANY_INFO.owner.name}<br />
                {COMPANY_INFO.address.street}<br />
                {COMPANY_INFO.address.postalCode} {COMPANY_INFO.address.city}
              </p>
            </section>

            {/* EU-Streitschlichtung */}
            <section>
              <h2 className="text-xl font-semibold mb-4">EU-Streitschlichtung</h2>
              <p className="text-muted-foreground">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a 
                  href="https://ec.europa.eu/consumers/odr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-muted-foreground mt-2">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            {/* Verbraucherstreitbeilegung */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
              <p className="text-muted-foreground">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            {/* Haftungsausschluss */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Haftung für Inhalte</h2>
              <p className="text-muted-foreground">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                Tätigkeit hinweisen.
              </p>
              <p className="text-muted-foreground mt-2">
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den 
                allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch 
                erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei 
                Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </section>

            {/* Haftung für Links */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Haftung für Links</h2>
              <p className="text-muted-foreground">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber 
                der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung 
                auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der 
                Verlinkung nicht erkennbar.
              </p>
              <p className="text-muted-foreground mt-2">
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete 
                Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen 
                werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            {/* Urheberrecht */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Urheberrecht</h2>
              <p className="text-muted-foreground">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
                der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen 
                Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind 
                nur für den privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
              <p className="text-muted-foreground mt-2">
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die 
                Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. 
                Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um 
                einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige 
                Inhalte umgehend entfernen.
              </p>
            </section>

            {/* Stand */}
            <section className="border-t pt-6">
              <p className="text-sm text-muted-foreground">
                Stand: Januar 2026
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
