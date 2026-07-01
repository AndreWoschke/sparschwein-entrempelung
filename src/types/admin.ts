// Admin Types for Offer Calculator

export type Salutation = "Herr" | "Frau" | "Firma";

export interface CustomerData {
  salutation: Salutation;
  firstName: string;
  lastName: string;
  street: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
}

export interface OfferLineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  note: string;
}

export type OfferStatus = "offen" | "angenommen" | "abgelehnt";

export interface Offer {
  id: string;
  offerNumber: string;
  date: string; // ISO
  validityDays: number;
  customer: CustomerData;
  items: OfferLineItem[];
  notes: string;
  scheduledDate: string;
  estimatedDuration: string;
  isKleinunternehmer: boolean;
  status: OfferStatus;
  totalNet: number;
  totalGross: number;
  createdAt: string;
}

export interface ServiceCatalogItem {
  id: string;
  category: "entruempelung" | "zusatz";
  name: string;
  defaultPrice: number;
  defaultUnit: string;
}

export interface CompanySettings {
  name: string;
  owner: string;
  street: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  website: string;
  taxNumber: string;
  isKleinunternehmer: boolean;
  agbText: string;
  nextOfferNumber: number;
  offerYear: number;
  bankAccountHolder: string;
  iban: string;
  bic: string;
  bankName: string;
  nextInvoiceNumber: number;
  invoiceYear: number;
}

export const DEFAULT_SERVICE_CATALOG: ServiceCatalogItem[] = [
  // Entrümpelungsleistungen
  { id: "1", category: "entruempelung", name: "Wohnungsentrümpelung", defaultPrice: 0, defaultUnit: "pauschal" },
  { id: "2", category: "entruempelung", name: "Hausentrümpelung", defaultPrice: 0, defaultUnit: "pauschal" },
  { id: "3", category: "entruempelung", name: "Kellerentrümpelung", defaultPrice: 0, defaultUnit: "pauschal" },
  { id: "4", category: "entruempelung", name: "Dachbodenentrümpelung", defaultPrice: 0, defaultUnit: "pauschal" },
  { id: "5", category: "entruempelung", name: "Haushaltsauflösung", defaultPrice: 0, defaultUnit: "pauschal" },
  { id: "6", category: "entruempelung", name: "Firmen-/Gewerbeentrümpelung", defaultPrice: 0, defaultUnit: "pauschal" },
  { id: "7", category: "entruempelung", name: "Garagenentrümpelung", defaultPrice: 0, defaultUnit: "pauschal" },
  { id: "8", category: "entruempelung", name: "Gartenräumung", defaultPrice: 0, defaultUnit: "pauschal" },
  // Zusatzleistungen
  { id: "9", category: "zusatz", name: "Demontage (Möbel, Küche, etc.)", defaultPrice: 0, defaultUnit: "pauschal" },
  { id: "10", category: "zusatz", name: "Besenreine Übergabe", defaultPrice: 0, defaultUnit: "pauschal" },
  { id: "11", category: "zusatz", name: "Sperrmüllentsorgung", defaultPrice: 0, defaultUnit: "m³" },
  { id: "12", category: "zusatz", name: "Schrottabholung (kostenlos)", defaultPrice: 0, defaultUnit: "pauschal" },
  { id: "13", category: "zusatz", name: "Elektrogeräte-Entsorgung", defaultPrice: 0, defaultUnit: "Stück" },
  { id: "14", category: "zusatz", name: "Sondermüllentsorgung (Farben, Lacke)", defaultPrice: 0, defaultUnit: "pauschal" },
  { id: "15", category: "zusatz", name: "Trageweg-Zuschlag (ab 3. OG ohne Aufzug)", defaultPrice: 50, defaultUnit: "pauschal" },
  { id: "16", category: "zusatz", name: "Anfahrtspauschale", defaultPrice: 0, defaultUnit: "pauschal" },
];

export const DEFAULT_AGB = `ALLGEMEINE GESCHÄFTSBEDINGUNGEN (AGB)
Sparschwein Entrümpelung – Inhaber: Stefan Wagner und Andre Woschke
Stand: Februar 2026

§1 Geltungsbereich
(1) Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") gelten für sämtliche Verträge zwischen Sparschwein Entrümpelung, Inhaber Stefan Wagner und Andre Woschke, Karl-Marx-Straße 9, 14656 Brieselang (nachfolgend „Auftragnehmer") und dem jeweiligen Kunden (nachfolgend „Auftraggeber") über Entrümpelungs-, Räumungs- und Entsorgungsleistungen.
(2) Abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der Auftragnehmer stimmt ihrer Geltung ausdrücklich schriftlich zu.
(3) Diese AGB gelten sowohl gegenüber Verbrauchern als auch gegenüber Unternehmern im Sinne des BGB.

§2 Angebote und Vertragsschluss
(1) Unsere Angebote sind freibleibend und unverbindlich. Die im Angebot genannten Preise basieren auf einer persönlichen Besichtigung vor Ort und beziehen sich ausschließlich auf den dabei festgestellten Umfang.
(2) Ein Vertrag kommt zustande durch: schriftliche Auftragsbestätigung durch den Auftragnehmer, Annahme des Angebots durch den Auftraggeber (schriftlich, per E-Mail oder WhatsApp), oder Beginn der Leistungserbringung durch den Auftragnehmer.
(3) Die Annahme des Angebots durch den Auftraggeber stellt eine verbindliche Beauftragung dar.
(4) Angebote haben die im jeweiligen Angebot angegebene Gültigkeitsdauer. Nach Ablauf der Gültigkeit besteht kein Anspruch auf die angebotenen Konditionen.

§3 Leistungsumfang
(1) Der Umfang der Leistungen ergibt sich aus dem jeweiligen Angebot. Das Angebot basiert auf der bei der Besichtigung vorgefundenen Situation.
(2) Zum Leistungsumfang gehören, sofern im Angebot vereinbart: Entrümpelung und Räumung der vereinbarten Räumlichkeiten, Demontage von Möbeln und Einbauten, Abtransport und fachgerechte Entsorgung, besenreine Übergabe der Räumlichkeiten.
(3) Nicht im Leistungsumfang enthalten sind, sofern nicht ausdrücklich im Angebot vereinbart: Entsorgung von Sondermüll (z.B. Farben, Lacke, Öle, Chemikalien, Asbest), Schimmelbeseitigung oder Schädlingsbekämpfung, Renovierungs- oder Malerarbeiten, Entrümpelung zusätzlicher Räume, die nicht im Angebot aufgeführt sind.
(4) Werden nach Vertragsschluss oder bei Durchführung der Arbeiten Gegenstände oder Umstände vorgefunden, die den Umfang des Angebots wesentlich übersteigen, ist der Auftragnehmer berechtigt, ein ergänzendes Angebot zu erstellen. Die Zusatzleistungen werden erst nach gesonderter Beauftragung erbracht.

§4 Preise und Zahlung
(1) Es gelten die im Angebot genannten Festpreise. Der Festpreis umfasst alle im Angebot aufgeführten Leistungen einschließlich Arbeitskosten, Fahrtkosten (sofern im Angebot enthalten) und Entsorgungskosten.
(2) Die Zahlung ist unmittelbar nach Abschluss der Arbeiten und Übergabe fällig, sofern nichts anderes vereinbart wurde.
(3) Die Zahlung kann in bar oder per Banküberweisung erfolgen. Bei Barzahlung erhält der Auftraggeber eine Quittung.
(4) Bei Zahlungsverzug ist der Auftragnehmer berechtigt, Verzugszinsen in gesetzlicher Höhe zu berechnen.

§5 Termine und Durchführung
(1) Vereinbarte Termine werden nach Möglichkeit eingehalten. Sollte ein Termin aufgrund höherer Gewalt, Krankheit oder unvorhersehbarer Umstände nicht eingehalten werden können, wird der Auftraggeber unverzüglich informiert und ein Ersatztermin vereinbart.
(2) Der Auftraggeber stellt sicher, dass die zu entrümpelnden Räumlichkeiten zum vereinbarten Zeitpunkt zugänglich sind. Ist der Zugang nicht möglich und wurde der Auftragnehmer nicht rechtzeitig (mindestens 24 Stunden vorher) informiert, kann eine Anfahrtspauschale berechnet werden.
(3) Der Auftraggeber hat vor Beginn der Arbeiten persönliche Gegenstände, Wertsachen und Dokumente, die nicht entsorgt werden sollen, aus den zu räumenden Bereichen zu entfernen oder eindeutig zu kennzeichnen.

§6 Wertgegenstände und Verwertung
(1) Der Auftraggeber versichert, dass alle in den zu entrümpelnden Räumen befindlichen Gegenstände zur Entsorgung bzw. Verwertung freigegeben sind, sofern sie nicht ausdrücklich als ausgenommen gekennzeichnet wurden.
(2) Brauchbare Gegenstände können nach Absprache einer Verwertung (z.B. Spende, Weiterverkauf) zugeführt werden. Ein Anspruch des Auftraggebers auf Erlöse aus der Verwertung besteht nicht, sofern nichts anderes vereinbart wurde.
(3) Nach Abschluss der Entrümpelung und besenreiner Übergabe besteht kein Anspruch mehr auf Herausgabe bereits entsorgter oder verwerteter Gegenstände.

§7 Stornierung und Rücktritt
(1) Eine kostenlose Stornierung durch den Auftraggeber ist bis 48 Stunden vor dem vereinbarten Termin möglich.
(2) Bei Stornierung weniger als 48 Stunden vor dem vereinbarten Termin kann eine Ausfallpauschale von bis zu 50% des Angebotspreises berechnet werden, um bereits entstandene Kosten (Personalplanung, Fahrzeugreservierung) zu decken.
(3) Bereits begonnene Arbeiten sind in vollem Umfang zu vergüten.
(4) Der Auftragnehmer ist berechtigt, vom Vertrag zurückzutreten, wenn die tatsächlichen Verhältnisse vor Ort wesentlich von der Besichtigung abweichen und eine Durchführung zu den vereinbarten Konditionen unzumutbar ist.

§8 Haftung
(1) Der Auftragnehmer haftet für Schäden an der Immobilie (z.B. Wände, Böden, Türen), die nachweislich durch seine Mitarbeiter im Rahmen der Entrümpelung verursacht werden.
(2) Der Auftragnehmer verfügt über eine Betriebshaftpflichtversicherung. Die Haftung ist auf den Umfang der bestehenden Betriebshaftpflichtversicherung beschränkt.
(3) Schäden sind unverzüglich, spätestens bei der Übergabe, dem Auftragnehmer anzuzeigen. Verdeckte Mängel sind innerhalb von 7 Tagen nach Feststellung schriftlich mitzuteilen.
(4) Für Schäden an Gegenständen, die zur Entsorgung freigegeben wurden, wird keine Haftung übernommen.
(5) Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, außer bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) sowie bei Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit.

§9 Übergabe
(1) Nach Abschluss der Arbeiten erfolgt eine gemeinsame Abnahme (Übergabe) der geräumten Räumlichkeiten, sofern der Auftraggeber oder ein Bevollmächtigter vor Ort ist.
(2) Mit der Übergabe bestätigt der Auftraggeber, dass die vereinbarten Leistungen vollständig und ordnungsgemäß erbracht wurden.
(3) Ist der Auftraggeber bei der Übergabe nicht anwesend und hat er auch keinen Vertreter benannt, gelten die Arbeiten als abgenommen, sofern der Auftraggeber nicht innerhalb von 3 Werktagen schriftlich Mängel anzeigt.

§10 Datenschutz
(1) Der Auftragnehmer erhebt und verarbeitet personenbezogene Daten des Auftraggebers (Name, Adresse, Kontaktdaten) ausschließlich zum Zweck der Auftragsabwicklung gemäß Art. 6 Abs. 1 lit. b DSGVO.
(2) Eine Weitergabe der Daten an Dritte erfolgt nicht, es sei denn, dies ist zur Vertragserfüllung erforderlich (z.B. Entsorgungsfachbetriebe) oder gesetzlich vorgeschrieben.
(3) Der Auftraggeber hat das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung seiner personenbezogenen Daten.

§11 Schlussbestimmungen
(1) Änderungen und Ergänzungen dieses Vertrages bedürfen der Schriftform. Dies gilt auch für die Aufhebung des Schriftformerfordernisses.
(2) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
(3) Es gilt das Recht der Bundesrepublik Deutschland.
(4) Gerichtsstand ist, soweit gesetzlich zulässig, Potsdam.

Sparschwein Entrümpelung
Inhaber: Stefan Wagner und Andre Woschke
Karl-Marx-Straße 9, 14656 Brieselang
Tel: 01579 2639408
E-Mail: info@sparschwein-entruempelung.de`;

export const DEFAULT_COMPANY_SETTINGS: CompanySettings = {
  name: "Sparschwein Entrümpelung",
  owner: "Stefan Wagner und Andre Woschke",
  street: "Karl-Marx-Straße 9",
  postalCode: "14656",
  city: "Brieselang",
  phone: "01579 2639408",
  email: "info@sparschwein-entruempelung.de",
  website: "sparschwein-entruempelung.de",
  taxNumber: "",
  isKleinunternehmer: false,
  agbText: DEFAULT_AGB,
  nextOfferNumber: 1,
  offerYear: new Date().getFullYear(),
  bankAccountHolder: "Andre Olaf Woschke",
  iban: "DE18 1001 2345 0460 7846 11",
  bic: "TRBKDEBBXXX",
  bankName: "Trade Republic",
  nextInvoiceNumber: 1,
  invoiceYear: new Date().getFullYear(),
};
