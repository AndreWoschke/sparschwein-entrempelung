import { type Offer, type CompanySettings } from "@/types/admin";
import { formatCurrency, formatDate } from "@/lib/admin-store";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Reuse color palette from pdf-generator
const PRIMARY: [number, number, number] = [46, 125, 50];
const PRIMARY_DARK: [number, number, number] = [27, 94, 32];
const DARK: [number, number, number] = [51, 51, 51];
const GRAY: [number, number, number] = [108, 117, 125];
const LIGHT_GRAY: [number, number, number] = [173, 181, 189];
const ACCENT_GOLD: [number, number, number] = [249, 168, 37];
const LIGHT_GREEN_BG: [number, number, number] = [232, 245, 233];
const ZEBRA_BG: [number, number, number] = [232, 245, 233];
const INFO_BOX_BG: [number, number, number] = [245, 245, 245];
const TABLE_BORDER: [number, number, number] = [224, 224, 224];
const MARGIN = 20;

let logoDataUrl: string | null = null;
let logoLoadPromise: Promise<string | null> | null = null;

function loadLogo(): Promise<string | null> {
  if (logoDataUrl) return Promise.resolve(logoDataUrl);
  if (logoLoadPromise) return logoLoadPromise;
  logoLoadPromise = new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        logoDataUrl = canvas.toDataURL("image/png");
        resolve(logoDataUrl);
      } else resolve(null);
    };
    img.onerror = () => resolve(null);
    img.src = `/images/logo-sparschwein.png?v=${Date.now()}`;
  });
  return logoLoadPromise;
}

function safeDateFormat(dateStr: string | null | undefined): string | null {
  if (!dateStr || dateStr === "" || dateStr === "none") return null;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return null;
    return formatDate(dateStr);
  } catch {
    return null;
  }
}

export async function generateInvoicePDF(offer: Offer, invoiceNumber: string, settings: CompanySettings) {
  logoDataUrl = null;
  logoLoadPromise = null;
  const logo = await loadLogo();
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const contentW = pageW - MARGIN * 2;

  let y = 0;

  y = drawHeaderBar(doc, settings, pageW, logo);
  y = drawTrustBar(doc, y, pageW);
  y = drawAddresses(doc, offer, settings, pageW, y, invoiceNumber);
  y = drawTitle(doc, y);
  y = drawGreeting(doc, offer, y);
  y = drawItemsTable(doc, offer, y, contentW);
  y = drawTotals(doc, offer, pageW, y);
  y = ensureSpace(doc, y, 40, settings);
  y = drawBankDetails(doc, settings, y, contentW);
  y = ensureSpace(doc, y, 45, settings);
  y = drawPaymentNote(doc, y, contentW, invoiceNumber, settings);
  y = await drawClosing(doc, settings, y, offer.date);
  addFooter(doc, settings);

  doc.save(`Rechnung_${invoiceNumber}.pdf`);
}

// ── HEADER BAR ──
function drawHeaderBar(doc: jsPDF, settings: CompanySettings, pageW: number, logo: string | null): number {
  const barH = 30;
  doc.setFillColor(...PRIMARY);
  doc.rect(0, 0, pageW, barH, "F");

  let textStartX = MARGIN;
  if (logo) {
    try {
      const logoH = 20;
      const logoW = logoH * 1.6;
      doc.addImage(logo, "PNG", MARGIN, 5, logoW, logoH);
      textStartX = MARGIN + logoW + 5;
    } catch {}
  }

  doc.setFontSize(17);
  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined!, "bold");
  doc.text("Sparschwein Entrümpelung", textStartX, 15);

  doc.setFont(undefined!, "normal");
  doc.setFontSize(9);
  doc.setTextColor(200, 230, 200);
  doc.text("Ihr Partner für faire Entrümpelungen", textStartX, 22);

  doc.setFontSize(8);
  doc.setTextColor(220, 240, 220);
  const rightX = pageW - MARGIN;
  doc.text(`Tel: ${settings.phone}`, rightX, 10, { align: "right" });
  doc.text(settings.email, rightX, 15, { align: "right" });
  doc.text(`${settings.street}, ${settings.postalCode} ${settings.city}`, rightX, 20, { align: "right" });
  doc.text(settings.website, rightX, 25, { align: "right" });

  return barH;
}

// ── TRUST BAR ──
function drawTrustBar(doc: jsPDF, y: number, pageW: number): number {
  const barH = 8;
  doc.setFillColor(...LIGHT_GREEN_BG);
  doc.rect(0, y, pageW, barH, "F");
  doc.setFontSize(7.5);
  doc.setTextColor(...PRIMARY);
  doc.setFont(undefined!, "bold");
  doc.text(
    "5,0 auf Google  |  500+ Entrümpelungen  |  Familienunternehmen  |  Vollversichert  |  Festpreisgarantie",
    pageW / 2, y + barH / 2 + 1.5, { align: "center" }
  );
  doc.setFont(undefined!, "normal");
  return y + barH + 4;
}

// ── ADDRESSES ──
function drawAddresses(doc: jsPDF, offer: Offer, settings: CompanySettings, pageW: number, y: number, invoiceNumber: string): number {
  doc.setFontSize(7);
  doc.setTextColor(...LIGHT_GRAY);
  doc.text(`${settings.name} - ${settings.street} - ${settings.postalCode} ${settings.city}`, MARGIN, y);
  y += 7;

  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  doc.setFont(undefined!, "bold");
  doc.text(`${offer.customer.firstName} ${offer.customer.lastName}`, MARGIN, y);
  doc.setFont(undefined!, "normal");
  y += 5;
  doc.setFontSize(10);
  doc.text(offer.customer.street, MARGIN, y);
  y += 5;
  doc.text(`${offer.customer.postalCode} ${offer.customer.city}`, MARGIN, y);

  // Info box – invoice number + date
  const boxW = 65;
  const boxX = pageW - MARGIN - boxW;
  const boxY = y - 16;
  doc.setFillColor(...INFO_BOX_BG);
  doc.roundedRect(boxX, boxY, boxW, 18, 2, 2, "F");
  doc.setDrawColor(...TABLE_BORDER);
  doc.setLineWidth(0.3);
  doc.roundedRect(boxX, boxY, boxW, 18, 2, 2, "S");

  let ry = boxY + 7;
  doc.setFontSize(8.5);

  const infoRows: [string, string][] = [
    ["Rechnungsnr.:", invoiceNumber],
    ["Datum:", formatDate(offer.date)],
  ];

  for (const [label, value] of infoRows) {
    doc.setTextColor(...GRAY);
    doc.text(label, boxX + 4, ry);
    doc.setTextColor(...DARK);
    doc.setFont(undefined!, "bold");
    doc.text(value, boxX + boxW - 4, ry, { align: "right" });
    doc.setFont(undefined!, "normal");
    ry += 6;
  }

  return y + 18;
}

// ── TITLE ──
function drawTitle(doc: jsPDF, y: number): number {
  doc.setFontSize(20);
  doc.setTextColor(...PRIMARY);
  doc.setFont(undefined!, "bold");
  doc.text("RECHNUNG", MARGIN, y);
  doc.setFont(undefined!, "normal");
  doc.setDrawColor(...PRIMARY);
  doc.setLineWidth(0.8);
  doc.line(MARGIN, y + 2, MARGIN + 42, y + 2);
  return y + 14;
}

// ── GREETING ──
function drawGreeting(doc: jsPDF, offer: Offer, y: number): number {
  doc.setFontSize(10);
  doc.setTextColor(...DARK);

  const salutation = offer.customer.salutation || "Herr";
  let greeting: string;
  if (salutation === "Frau") greeting = `Sehr geehrte Frau ${offer.customer.lastName},`;
  else if (salutation === "Firma") greeting = "Sehr geehrte Damen und Herren,";
  else greeting = `Sehr geehrter Herr ${offer.customer.lastName},`;

  doc.text(greeting, MARGIN, y);
  y += 6;
  doc.text("hiermit stellen wir Ihnen folgende Leistungen in Rechnung:", MARGIN, y);
  return y + 10;
}

// ── ITEMS TABLE ──
function drawItemsTable(doc: jsPDF, offer: Offer, y: number, contentW: number): number {
  const tableData = offer.items.map((item, i) => [
    String(i + 1),
    item.description + (item.note ? `\n${item.note}` : ""),
    String(item.quantity).replace(".", ","),
    item.unit,
    formatCurrency(item.unitPrice),
    formatCurrency(item.quantity * item.unitPrice),
  ]);

  autoTable(doc, {
    startY: y,
    head: [["Nr.", "Bezeichnung", "Menge", "Einheit", "Einzelpreis", "Gesamtpreis"]],
    body: tableData,
    theme: "plain",
    headStyles: { fillColor: [46, 125, 50], textColor: 255, fontSize: 9, fontStyle: "bold", cellPadding: 4 },
    styles: { fontSize: 9, cellPadding: { top: 3.5, bottom: 3.5, left: 3, right: 3 }, textColor: DARK, lineColor: TABLE_BORDER, lineWidth: 0 },
    alternateRowStyles: { fillColor: ZEBRA_BG },
    columnStyles: {
      0: { cellWidth: 14, halign: "center" },
      1: { cellWidth: "auto" },
      2: { cellWidth: 18, halign: "right" },
      3: { cellWidth: 20 },
      4: { cellWidth: 28, halign: "right" },
      5: { cellWidth: 28, halign: "right" },
    },
    didDrawCell: (data) => {
      if (data.section === "body") {
        const { x, y: cellY, width } = data.cell;
        doc.setDrawColor(...TABLE_BORDER);
        doc.setLineWidth(0.2);
        doc.line(x, cellY, x + width, cellY);
      }
    },
    margin: { left: MARGIN, right: MARGIN },
  });

  return (doc as any).lastAutoTable.finalY + 10;
}

// ── TOTALS ──
function drawTotals(doc: jsPDF, offer: Offer, pageW: number, y: number): number {
  const labelX = pageW - MARGIN - 70;
  const valueX = pageW - MARGIN;

  doc.setFontSize(10);
  doc.setTextColor(...DARK);

  if (offer.isKleinunternehmer) {
    doc.setDrawColor(...PRIMARY);
    doc.setLineWidth(0.5);
    doc.line(labelX, y - 2, valueX, y - 2);

    doc.setFont(undefined!, "bold");
    doc.setFontSize(14);
    doc.setTextColor(...ACCENT_GOLD);
    doc.text("Rechnungsbetrag:", labelX, y + 5);
    doc.text(formatCurrency(offer.totalNet), valueX, y + 5, { align: "right" });
    doc.setFont(undefined!, "normal");
    y += 14;

    doc.setFontSize(8.5);
    doc.setTextColor(...GRAY);
    doc.text("Gemäß §19 UStG wird keine Umsatzsteuer berechnet.", MARGIN, y);
    y += 6;
  } else {
    doc.setFont(undefined!, "normal");
    doc.text("Nettobetrag:", labelX, y);
    doc.text(formatCurrency(offer.totalNet), valueX, y, { align: "right" });
    y += 5;

    const vat = offer.totalNet * 0.19;
    doc.text("MwSt. 19%:", labelX, y);
    doc.text(formatCurrency(vat), valueX, y, { align: "right" });
    y += 6;

    doc.setDrawColor(...PRIMARY);
    doc.setLineWidth(0.5);
    doc.line(labelX, y - 1, valueX, y - 1);
    y += 5;

    doc.setFont(undefined!, "bold");
    doc.setFontSize(14);
    doc.setTextColor(...ACCENT_GOLD);
    doc.text("Rechnungsbetrag:", labelX, y);
    doc.text(formatCurrency(offer.totalGross), valueX, y, { align: "right" });
    doc.setFont(undefined!, "normal");
    y += 12;
  }

  return y;
}

// ── BANK DETAILS BOX ──
function drawBankDetails(doc: jsPDF, settings: CompanySettings, y: number, contentW: number): number {
  const boxH = 28;

  doc.setFillColor(...LIGHT_GREEN_BG);
  doc.roundedRect(MARGIN, y, contentW, boxH, 2, 2, "F");
  doc.setFillColor(...PRIMARY);
  doc.rect(MARGIN, y + 1, 2.5, boxH - 2, "F");

  doc.setFontSize(10);
  doc.setFont(undefined!, "bold");
  doc.setTextColor(...PRIMARY);
  doc.text("Bankverbindung", MARGIN + 8, y + 7);

  doc.setFont(undefined!, "normal");
  doc.setFontSize(9);
  doc.setTextColor(...DARK);

  const bankLines = [
    `Kontoinhaber: ${settings.bankAccountHolder}`,
    `IBAN: ${settings.iban}`,
    `BIC: ${settings.bic}${settings.bankName ? `  |  Bank: ${settings.bankName}` : ""}`,
  ];

  let ly = y + 13;
  for (const line of bankLines) {
    doc.text(line, MARGIN + 8, ly);
    ly += 5;
  }

  return y + boxH + 8;
}

// ── PAYMENT NOTE ──
function drawPaymentNote(doc: jsPDF, y: number, contentW: number, invoiceNumber: string, settings: CompanySettings): number {
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  doc.setFont(undefined!, "bold");
  doc.text("Zahlungsbedingungen:", MARGIN, y);
  doc.setFont(undefined!, "normal");
  y += 5;

  const paymentLines = [
    `1. Eine Anzahlung in Höhe von 20 % des Rechnungsbetrags ist vor Auftragsbeginn auf das oben genannte Konto zu überweisen.`,
    `2. Der Restbetrag ist am Tag der Fertigstellung fällig und muss vor Verlassen der Einsatzstelle beglichen sein – per Sofortüberweisung oder in bar.`,
    `3. Bitte stellen Sie sicher, dass Sie über Sofortüberweisung verfügen oder den Betrag in bar bereithalten.`,
    ``,
    `Bitte geben Sie bei Überweisungen die Rechnungsnummer ${invoiceNumber} als Verwendungszweck an.`,
  ];

  const pageH = doc.internal.pageSize.getHeight();
  const footerMargin = 22;

  for (const line of paymentLines) {
    if (line === "") { y += 2; continue; }
    const wrapped: string[] = doc.splitTextToSize(line, contentW);
    for (const wl of wrapped) {
      if (y + 4.5 > pageH - footerMargin) {
        addFooter(doc, settings);
        doc.addPage();
        y = 20;
      }
      doc.text(wl, MARGIN, y);
      y += 4.5;
    }
  }

  return y + 5;
}

// ── CLOSING ──
async function drawClosing(doc: jsPDF, settings: CompanySettings, y: number, offerDate: string): Promise<number> {
  y = ensureSpace(doc, y, 50, settings);

  const formattedDate = offerDate
    ? new Date(offerDate).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "";

  y += 5;
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  doc.text("Vielen Dank für Ihren Auftrag!", MARGIN, y);
  y += 10;

  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  const cityDate = `${settings.city}, ${formattedDate}`;
  doc.text(cityDate, MARGIN, y);
  y += 8;

  // Signature Wagner (left)
  try {
    const sigImg = new Image();
    sigImg.crossOrigin = "anonymous";
    await new Promise<void>((resolve, reject) => {
      sigImg.onload = () => resolve();
      sigImg.onerror = () => reject();
      sigImg.src = `/images/signature-auftragnehmer.png?t=${Date.now()}`;
    });
    const sigW = 35;
    const sigH = (sigImg.naturalHeight / sigImg.naturalWidth) * sigW;
    doc.addImage(sigImg, "PNG", MARGIN, y - sigH + 2, sigW, sigH);
  } catch {}

  // Signature Woschke (right)
  try {
    const sigImg2 = new Image();
    sigImg2.crossOrigin = "anonymous";
    await new Promise<void>((resolve, reject) => {
      sigImg2.onload = () => resolve();
      sigImg2.onerror = () => reject();
      sigImg2.src = `/images/signature-woschke.png?t=${Date.now()}`;
    });
    const sigW2 = 35;
    const sigH2 = (sigImg2.naturalHeight / sigImg2.naturalWidth) * sigW2;
    doc.addImage(sigImg2, "PNG", MARGIN + 90, y - sigH2 + 2, sigW2, sigH2);
  } catch {}

  doc.setDrawColor(...GRAY);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, y, MARGIN + 70, y);
  doc.line(MARGIN + 90, y, MARGIN + 160, y);
  y += 5;

  doc.setFontSize(8);
  doc.setTextColor(...GRAY);
  doc.text("Stefan Wagner", MARGIN, y);
  doc.text("Andre Woschke", MARGIN + 90, y);

  return y + 10;
}

function ensureSpace(doc: jsPDF, y: number, needed: number, settings: CompanySettings): number {
  const pageH = doc.internal.pageSize.getHeight();
  if (y + needed > pageH - 22) {
    addFooter(doc, settings);
    doc.addPage();
    return 20;
  }
  return y;
}

// ── FOOTER ──
function addFooter(doc: jsPDF, settings: CompanySettings) {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  doc.setDrawColor(...LIGHT_GRAY);
  doc.setLineWidth(0.2);
  doc.line(MARGIN, pageH - 16, pageW - MARGIN, pageH - 16);
  doc.setFontSize(7);
  doc.setTextColor(...GRAY);
  const line1 = `${settings.name} | Inhaber: ${settings.owner} | ${settings.street}, ${settings.postalCode} ${settings.city}`;
  const line2 = `Tel: ${settings.phone} | ${settings.email} | ${settings.website}${settings.taxNumber ? ` | St.-Nr.: ${settings.taxNumber}` : ""} | IBAN: ${settings.iban}`;
  doc.text(line1, pageW / 2, pageH - 11, { align: "center" });
  doc.text(line2, pageW / 2, pageH - 7, { align: "center" });
}
