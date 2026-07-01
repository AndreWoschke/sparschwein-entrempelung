import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { COMPANY_INFO } from "@/lib/seo";

export default function DatenschutzPage() {
  return (
    <Layout>
      <Helmet>
        <title>Datenschutzerklärung | Sparschwein Entrümpelung</title>
        <meta name="description" content="Datenschutzerklärung der Sparschwein Entrümpelung – Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="section-container py-12 lg:py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 text-3xl font-bold lg:text-4xl">Datenschutzerklärung</h1>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground">
            
            {/* Einleitung */}
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Datenschutz auf einen Blick</h2>
              
              <h3 className="text-lg font-medium mt-6 mb-3">Allgemeine Hinweise</h3>
              <p className="text-muted-foreground">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. 
                Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter 
                diesem Text aufgeführten Datenschutzerklärung.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">Datenerfassung auf dieser Website</h3>
              <p className="text-muted-foreground">
                <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen 
                Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser 
                Datenschutzerklärung entnehmen.
              </p>

              <p className="text-muted-foreground mt-4">
                <strong>Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei 
                kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben, per 
                E-Mail senden oder telefonisch mitteilen.
              </p>
              <p className="text-muted-foreground mt-2">
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website 
                durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, 
                Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt 
                automatisch, sobald Sie diese Website betreten.
              </p>

              <p className="text-muted-foreground mt-4">
                <strong>Wofür nutzen wir Ihre Daten?</strong><br />
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu 
                gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>

              <p className="text-muted-foreground mt-4">
                <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und 
                Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein 
                Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine 
                Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung 
                jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten 
                Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. 
                Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
            </section>

            {/* Verantwortliche Stelle */}
            <section>
              <h2 className="text-xl font-semibold mb-4">2. Verantwortliche Stelle</h2>
              <p className="text-muted-foreground">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>{COMPANY_INFO.name}</strong><br />
                {COMPANY_INFO.owner.name}<br />
                {COMPANY_INFO.address.street}<br />
                {COMPANY_INFO.address.postalCode} {COMPANY_INFO.address.city}<br />
                Deutschland
              </p>
              <p className="text-muted-foreground mt-4">
                Telefon: {COMPANY_INFO.phone}<br />
                E-Mail: {COMPANY_INFO.email}
              </p>
              <p className="text-muted-foreground mt-4">
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder 
                gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen 
                Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
              </p>
            </section>

            {/* Speicherdauer */}
            <section>
              <h2 className="text-xl font-semibold mb-4">3. Speicherdauer</h2>
              <p className="text-muted-foreground">
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt 
                wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die 
                Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen 
                oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, 
                sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer 
                personenbezogenen Daten haben (z.B. steuer- oder handelsrechtliche Aufbewahrungsfristen); 
                im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
              </p>
            </section>

            {/* Rechtsgrundlagen */}
            <section>
              <h2 className="text-xl font-semibold mb-4">4. Allgemeine Hinweise zu den Rechtsgrundlagen</h2>
              <p className="text-muted-foreground">
                Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre 
                personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 
                Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO 
                verarbeitet werden.
              </p>
              <p className="text-muted-foreground mt-2">
                Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener 
                Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von 
                Art. 49 Abs. 1 lit. a DSGVO.
              </p>
              <p className="text-muted-foreground mt-2">
                Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen 
                in Ihr Endgerät (z.B. via Device-Fingerprinting) eingewilligt haben, erfolgt die 
                Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TTDSG.
              </p>
              <p className="text-muted-foreground mt-2">
                Die Einwilligung ist jederzeit widerrufbar. Sofern Ihre Daten zur Vertragserfüllung 
                oder zur Durchführung vorvertraglicher Maßnahmen erforderlich sind, verarbeiten wir 
                Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten 
                wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung 
                erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO.
              </p>
              <p className="text-muted-foreground mt-2">
                Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses 
                nach Art. 6 Abs. 1 lit. f DSGVO erfolgen.
              </p>
            </section>

            {/* Empfänger */}
            <section>
              <h2 className="text-xl font-semibold mb-4">5. Empfänger von personenbezogenen Daten</h2>
              <p className="text-muted-foreground">
                Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen 
                zusammen. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an 
                diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur dann an 
                externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, 
                wenn wir gesetzlich hierzu verpflichtet sind (z.B. Weitergabe von Daten an 
                Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO 
                an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe 
                erlaubt.
              </p>
              <p className="text-muted-foreground mt-2">
                Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer 
                Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter. 
                Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung 
                geschlossen.
              </p>
            </section>

            {/* Rechte der Betroffenen */}
            <section>
              <h2 className="text-xl font-semibold mb-4">6. Ihre Rechte als betroffene Person</h2>
              
              <h3 className="text-lg font-medium mt-6 mb-3">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
              <p className="text-muted-foreground">
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung 
                möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die 
                Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf 
                unberührt.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">Widerspruchsrecht gegen die Datenerhebung (Art. 21 DSGVO)</h3>
              <p className="text-muted-foreground">
                <strong>Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f 
                DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer 
                besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten 
                Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes 
                Profiling. Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung beruht, 
                entnehmen Sie dieser Datenschutzerklärung. Wenn Sie Widerspruch einlegen, werden 
                wir Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn, 
                wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die 
                Ihre Interessen, Rechte und Freiheiten überwiegen oder die Verarbeitung dient der 
                Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch nach 
                Art. 21 Abs. 1 DSGVO).</strong>
              </p>
              <p className="text-muted-foreground mt-2">
                <strong>Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu 
                betreiben, so haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung 
                Sie betreffender personenbezogener Daten zum Zwecke derartiger Werbung einzulegen; 
                dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung 
                steht. Wenn Sie widersprechen, werden Ihre personenbezogenen Daten anschließend 
                nicht mehr zum Zwecke der Direktwerbung verwendet (Widerspruch nach Art. 21 Abs. 2 
                DSGVO).</strong>
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">Beschwerderecht bei der Aufsichtsbehörde</h3>
              <p className="text-muted-foreground">
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht 
                bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen 
                Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. 
                Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder 
                gerichtlicher Rechtsbehelfe.
              </p>
              <p className="text-muted-foreground mt-2">
                Zuständige Aufsichtsbehörde in Brandenburg:<br />
                Die Landesbeauftragte für den Datenschutz und für das Recht auf Akteneinsicht Brandenburg<br />
                Stahnsdorfer Damm 77, 14532 Kleinmachnow<br />
                Telefon: 033203 356-0<br />
                E-Mail: poststelle@lda.brandenburg.de
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">Recht auf Datenübertragbarkeit</h3>
              <p className="text-muted-foreground">
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in 
                Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten 
                in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die 
                direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt 
                dies nur, soweit es technisch machbar ist.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">Auskunft, Berichtigung und Löschung</h3>
              <p className="text-muted-foreground">
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf 
                unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren 
                Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf 
                Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema 
                personenbezogene Daten können Sie sich jederzeit an uns wenden.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">Recht auf Einschränkung der Verarbeitung</h3>
              <p className="text-muted-foreground">
                Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen 
                Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf 
                Einschränkung der Verarbeitung besteht in folgenden Fällen:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten</li>
                <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht</li>
                <li>Wenn Sie die Löschung Ihrer personenbezogenen Daten ablehnen, weil Sie diese zur Geltendmachung von Rechtsansprüchen benötigen</li>
                <li>Wenn Sie Widerspruch eingelegt haben und noch nicht feststeht, ob unsere berechtigten Gründe gegenüber Ihren überwiegen</li>
              </ul>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl font-semibold mb-4">7. Cookies</h2>
              
              <h3 className="text-lg font-medium mt-6 mb-3">Was sind Cookies?</h3>
              <p className="text-muted-foreground">
                Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine 
                Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder 
                vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft 
                (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach 
                Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem 
                Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung 
                durch Ihren Webbrowser erfolgt.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">Arten von Cookies</h3>
              <p className="text-muted-foreground">
                <strong>Technisch notwendige Cookies:</strong> Diese Cookies sind für den Betrieb 
                der Website erforderlich und können nicht deaktiviert werden. Sie werden in der 
                Regel nur als Reaktion auf von Ihnen getätigte Aktionen gesetzt, wie z.B. das 
                Festlegen Ihrer Datenschutzeinstellungen, das Anmelden oder das Ausfüllen von 
                Formularen.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Statistik- und Analyse-Cookies:</strong> Diese Cookies ermöglichen es uns, 
                Besuche und Verkehrsquellen zu zählen, damit wir die Leistung unserer Website 
                messen und verbessern können. Sie helfen uns zu wissen, welche Seiten am 
                beliebtesten und am wenigsten beliebt sind, und zu sehen, wie sich Besucher auf 
                der Website bewegen.
              </p>
              <p className="text-muted-foreground mt-4">
                <strong>Marketing- und Werbe-Cookies:</strong> Diese Cookies können über unsere 
                Website von unseren Werbepartnern gesetzt werden. Sie können von diesen Unternehmen 
                verwendet werden, um ein Profil Ihrer Interessen zu erstellen und Ihnen relevante 
                Anzeigen auf anderen Websites zu zeigen.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">Cookie-Einwilligung</h3>
              <p className="text-muted-foreground">
                Beim Besuch unserer Website werden Sie über unseren Cookie-Banner über die 
                Verwendung von Cookies informiert und um Ihre Einwilligung gebeten. Sie können 
                wählen, ob Sie alle Cookies akzeptieren, nur technisch notwendige Cookies zulassen 
                oder alle Cookies ablehnen möchten. Ihre Einwilligung können Sie jederzeit 
                widerrufen. Die Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO in Verbindung mit 
                § 25 Abs. 1 TTDSG.
              </p>
            </section>

            {/* Server-Log-Files */}
            <section>
              <h2 className="text-xl font-semibold mb-4">8. Server-Log-Dateien</h2>
              <p className="text-muted-foreground">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so 
                genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. 
                Dies sind:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>Verwendetes Betriebssystem</li>
                <li>Referrer URL (die zuvor besuchte Seite)</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>IP-Adresse</li>
                <li>Uhrzeit der Serveranfrage</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Erfassung 
                dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der 
                Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien 
                Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files 
                erfasst werden.
              </p>
            </section>

            {/* Kontaktformular */}
            <section>
              <h2 className="text-xl font-semibold mb-4">9. Kontaktaufnahme</h2>
              
              <h3 className="text-lg font-medium mt-6 mb-3">Kontaktformular</h3>
              <p className="text-muted-foreground">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus 
                dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks 
                Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. 
                Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p className="text-muted-foreground mt-2">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, 
                sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur 
                Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen 
                beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven 
                Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf 
                Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
              </p>
              <p className="text-muted-foreground mt-2">
                Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns 
                zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der 
                Zweck für die Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung 
                Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere 
                Aufbewahrungsfristen – bleiben unberührt.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">Anfrage per E-Mail oder Telefon</h3>
              <p className="text-muted-foreground">
                Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive 
                aller daraus hervorgehenden personenbezogenen Daten (Name, Telefonnummer, E-Mail, 
                Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und 
                verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p className="text-muted-foreground mt-2">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. 
                Die von Ihnen übermittelten Daten verbleiben bei uns, bis Sie uns zur Löschung 
                auffordern oder der Zweck für die Datenspeicherung entfällt.
              </p>
            </section>

            {/* Analyse-Tools */}
            <section>
              <h2 className="text-xl font-semibold mb-4">10. Analyse-Tools und Tracking</h2>
              
              <h3 className="text-lg font-medium mt-6 mb-3">Google Analytics</h3>
              <p className="text-muted-foreground">
                Diese Website nutzt oder kann in Zukunft Funktionen des Webanalysedienstes Google 
                Analytics nutzen. Anbieter ist die Google Ireland Limited („Google"), Gordon House, 
                Barrow Street, Dublin 4, Irland.
              </p>
              <p className="text-muted-foreground mt-2">
                Google Analytics ermöglicht es dem Websitebetreiber, das Verhalten der 
                Websitebesucher zu analysieren. Hierbei erhält der Websitebetreiber verschiedene 
                Nutzungsdaten, wie z.B. Seitenaufrufe, Verweildauer, verwendete Betriebssysteme 
                und Herkunft des Nutzers. Diese Daten werden in einem Nutzerprofil zusammengefasst 
                und dem jeweiligen Endgerät des Websitebesuchers zugeordnet.
              </p>
              <p className="text-muted-foreground mt-2">
                Google Analytics verwendet Technologien, die die Wiedererkennung des Nutzers zum 
                Zwecke der Analyse des Nutzerverhaltens ermöglichen (z.B. Cookies oder 
                Device-Fingerprinting). Die von Google erfassten Informationen über die Benutzung 
                dieser Website werden in der Regel an einen Server von Google in den USA übertragen 
                und dort gespeichert.
              </p>
              <p className="text-muted-foreground mt-2">
                Die Nutzung dieses Dienstes erfolgt nur mit Ihrer Einwilligung nach Art. 6 Abs. 1 
                lit. a DSGVO und § 25 Abs. 1 TTDSG. Die Einwilligung ist jederzeit widerrufbar.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">Google Tag Manager</h3>
              <p className="text-muted-foreground">
                Wir nutzen oder können in Zukunft den Google Tag Manager nutzen. Anbieter ist die 
                Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.
              </p>
              <p className="text-muted-foreground mt-2">
                Der Google Tag Manager ist ein Tool, mit dessen Hilfe wir Tracking- oder 
                Statistik-Tools und andere Technologien auf unserer Website einbinden können. 
                Der Google Tag Manager selbst erstellt keine Nutzerprofile, speichert keine 
                Cookies und nimmt keine eigenständigen Analysen vor. Er dient lediglich der 
                Verwaltung und Ausspielung der über ihn eingebundenen Tools.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">Google Ads und Conversion-Tracking</h3>
              <p className="text-muted-foreground">
                Diese Website nutzt oder kann in Zukunft Google Ads nutzen. Google Ads ist ein 
                Online-Werbeprogramm der Google Ireland Limited („Google"), Gordon House, Barrow 
                Street, Dublin 4, Irland.
              </p>
              <p className="text-muted-foreground mt-2">
                Im Rahmen von Google Ads nutzen wir das so genannte Conversion-Tracking. Wenn Sie 
                auf eine von Google geschaltete Anzeige klicken, wird ein Cookie für das 
                Conversion-Tracking gesetzt. Cookies sind kleine Textdateien, die der 
                Internet-Browser auf dem Computer des Nutzers ablegt. Diese Cookies verlieren nach 
                30 Tagen ihre Gültigkeit und dienen nicht der persönlichen Identifizierung der 
                Nutzer. Besucht der Nutzer bestimmte Seiten dieser Website und das Cookie ist noch 
                nicht abgelaufen, können Google und wir erkennen, dass der Nutzer auf die Anzeige 
                geklickt hat und zu dieser Seite weitergeleitet wurde.
              </p>
              <p className="text-muted-foreground mt-2">
                Die mit Hilfe des Conversion-Cookies eingeholten Informationen dienen dazu, 
                Conversion-Statistiken für Ads-Kunden zu erstellen. Die Nutzung erfolgt nur mit 
                Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">Meta Pixel (ehemals Facebook Pixel)</h3>
              <p className="text-muted-foreground">
                Diese Website nutzt oder kann in Zukunft zur Konversionsmessung das Besucheraktions-Pixel 
                von Meta (ehemals Facebook). Anbieter ist die Meta Platforms Ireland Limited, 4 Grand 
                Canal Square, Grand Canal Harbour, Dublin 2, Irland.
              </p>
              <p className="text-muted-foreground mt-2">
                So kann das Verhalten der Seitenbesucher nachverfolgt werden, nachdem diese durch 
                Klick auf eine Facebook-Werbeanzeige auf die Website des Anbieters weitergeleitet 
                wurden. Dadurch können die Wirksamkeit der Facebook-Werbeanzeigen für statistische 
                und Marktforschungszwecke ausgewertet werden und zukünftige Werbemaßnahmen optimiert 
                werden.
              </p>
              <p className="text-muted-foreground mt-2">
                Die Nutzung dieses Dienstes erfolgt nur mit Ihrer Einwilligung nach Art. 6 Abs. 1 
                lit. a DSGVO und § 25 Abs. 1 TTDSG. Die Einwilligung ist jederzeit widerrufbar.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">Heatmaps und Session-Recording</h3>
              <p className="text-muted-foreground">
                Wir nutzen oder können in Zukunft Heatmap- und Session-Recording-Tools nutzen, um 
                das Nutzerverhalten auf unserer Website zu analysieren. Diese Tools erfassen 
                Mausbewegungen, Klicks und Scrollverhalten, um die Benutzerfreundlichkeit unserer 
                Website zu verbessern. Die Erfassung erfolgt anonymisiert und ohne persönliche 
                Identifikation.
              </p>
              <p className="text-muted-foreground mt-2">
                Die Nutzung erfolgt nur mit Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO 
                und § 25 Abs. 1 TTDSG. Die Einwilligung ist jederzeit widerrufbar.
              </p>
            </section>

            {/* Call-Tracking */}
            <section>
              <h2 className="text-xl font-semibold mb-4">11. Telefon- und Call-Tracking</h2>
              <p className="text-muted-foreground">
                Wir nutzen oder können in Zukunft Call-Tracking-Dienste nutzen, um die Effektivität 
                unserer Marketingmaßnahmen zu messen. Dabei werden bei Anrufen folgende Daten 
                erfasst werden können:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Telefonnummer des Anrufers (wenn nicht unterdrückt)</li>
                <li>Datum und Uhrzeit des Anrufs</li>
                <li>Dauer des Gesprächs</li>
                <li>Quelle des Anrufs (z.B. Website, Google Ads)</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. 
                Wir haben ein berechtigtes Interesse an der Analyse der Wirksamkeit unserer 
                Marketingmaßnahmen.
              </p>
            </section>

            {/* Hosting */}
            <section>
              <h2 className="text-xl font-semibold mb-4">12. Hosting</h2>
              <p className="text-muted-foreground">
                Wir hosten die Inhalte unserer Website bei folgenden Anbietern:
              </p>
              
              <h3 className="text-lg font-medium mt-6 mb-3">Externes Hosting</h3>
              <p className="text-muted-foreground">
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser 
                Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei 
                kann es sich v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, 
                Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über 
                eine Website generiert werden, handeln.
              </p>
              <p className="text-muted-foreground mt-2">
                Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren 
                potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse 
                einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots 
                durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
              <p className="text-muted-foreground mt-2">
                Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung 
                ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG.
              </p>
              <p className="text-muted-foreground mt-2">
                Unser Hoster wird Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung 
                seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese 
                Daten befolgen. Wir setzen folgende Hoster ein: Server befinden sich in der 
                Europäischen Union. Mit dem Anbieter wurde ein Auftragsverarbeitungsvertrag 
                geschlossen.
              </p>
            </section>

            {/* Auftragsverarbeitung */}
            <section>
              <h2 className="text-xl font-semibold mb-4">13. Auftragsverarbeitung</h2>
              <p className="text-muted-foreground">
                Wir haben mit unseren Dienstleistern Verträge zur Auftragsverarbeitung (AVV) 
                abgeschlossen. Diese Verträge stellen sicher, dass unsere Dienstleister die 
                personenbezogenen Daten nur nach unseren Weisungen verarbeiten und die Vorgaben 
                der DSGVO einhalten.
              </p>
              <p className="text-muted-foreground mt-2">
                Zu unseren Auftragsverarbeitern gehören können:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                <li>Hosting-Anbieter</li>
                <li>E-Mail-Marketing-Dienste</li>
                <li>Analyse- und Tracking-Dienste</li>
                <li>Marketing- und Werbe-Dienstleister</li>
                <li>IT-Support und Wartung</li>
              </ul>
            </section>

            {/* SSL/TLS */}
            <section>
              <h2 className="text-xl font-semibold mb-4">14. SSL- bzw. TLS-Verschlüsselung</h2>
              <p className="text-muted-foreground">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung 
                vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als 
                Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte 
                Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" 
                auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
              <p className="text-muted-foreground mt-2">
                Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie 
                an uns übermitteln, nicht von Dritten mitgelesen werden.
              </p>
            </section>

            {/* Aktualität */}
            <section>
              <h2 className="text-xl font-semibold mb-4">15. Aktualität und Änderung dieser Datenschutzerklärung</h2>
              <p className="text-muted-foreground">
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Januar 2026.
              </p>
              <p className="text-muted-foreground mt-2">
                Durch die Weiterentwicklung unserer Website und Angebote darüber oder aufgrund 
                geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig 
                werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle 
                Datenschutzerklärung kann jederzeit auf der Website von Ihnen abgerufen und 
                ausgedruckt werden.
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
