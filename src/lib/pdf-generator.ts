import { type Offer, type CompanySettings } from "@/types/admin";
import { formatCurrency, formatDate, getSettings } from "@/lib/admin-store";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Modern color palette
const PRIMARY: [number, number, number] = [46, 125, 50];      // #2E7D32
const PRIMARY_DARK: [number, number, number] = [27, 94, 32];   // #1B5E20
const DARK: [number, number, number] = [51, 51, 51];           // #333333
const GRAY: [number, number, number] = [108, 117, 125];
const LIGHT_GRAY: [number, number, number] = [173, 181, 189];
const ACCENT_GOLD: [number, number, number] = [249, 168, 37];  // #F9A825
const LIGHT_GREEN_BG: [number, number, number] = [232, 245, 233]; // #E8F5E9
const ZEBRA_BG: [number, number, number] = [232, 245, 233];    // #E8F5E9 – light green tint
const INFO_BOX_BG: [number, number, number] = [245, 245, 245]; // #F5F5F5
const TABLE_BORDER: [number, number, number] = [224, 224, 224]; // #E0E0E0
const MARGIN = 20;

// Logo cache
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
      } else {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    // Cache-Busting: always fetch latest uploaded logo
    img.src = `/images/logo-sparschwein.png?v=${Date.now()}`;
  });

  return logoLoadPromise;
}

/** Safe date formatter – returns null for invalid/empty dates */
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

export async function generateOfferPDF(offer: Offer) {
  const settings = getSettings();

  // Reset in-memory cache so newly uploaded logos are used immediately
  logoDataUrl = null;
  logoLoadPromise = null;
  const logo = await loadLogo();
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const contentW = pageW - MARGIN * 2;

  let y = 0;

  y = drawHeaderBar(doc, settings, pageW, logo);
  y = drawTrustBar(doc, y, pageW);
  y = drawAddresses(doc, offer, settings, pageW, y);
  y = drawTitle(doc, y);
  y = drawGreeting(doc, offer, y);
  y = drawItemsTable(doc, offer, y, contentW);
  y = drawTotals(doc, offer, pageW, y);
  y = drawFestpreisBox(doc, y, contentW);
  y = drawNotesAndSchedule(doc, offer, contentW, y, settings);
  y = await drawClosing(doc, settings, y, offer.date);
  addFooter(doc, settings);

  if (settings.agbText) {
    doc.addPage();
    drawAgbPage(doc, settings, contentW, offer.isKleinunternehmer);
    addFooter(doc, settings);
  }

  doc.save(`Angebot_${offer.offerNumber}.pdf`);
}

// ────────────────────────────────────────
// HEADER BAR – Full-width green block
// ────────────────────────────────────────
function drawHeaderBar(doc: jsPDF, settings: CompanySettings, pageW: number, logo: string | null): number {
  const barH = 30;

  // Solid dark green background
  doc.setFillColor(...PRIMARY);
  doc.rect(0, 0, pageW, barH, "F");

  // Logo
  let textStartX = MARGIN;
  if (logo) {
    try {
      const logoH = 20;
      const logoW = logoH * 1.6;
      doc.addImage(logo, "PNG", MARGIN, 5, logoW, logoH);
      textStartX = MARGIN + logoW + 5;
    } catch {
      // fallback: no logo
    }
  }

  // Company name – large white bold
  doc.setFontSize(17);
  doc.setTextColor(255, 255, 255);
  doc.setFont(undefined!, "bold");
  doc.text("Sparschwein Entrümpelung", textStartX, 15);

  // Tagline
  doc.setFont(undefined!, "normal");
  doc.setFontSize(9);
  doc.setTextColor(200, 230, 200);
  doc.text("Ihr Partner für faire Entrümpelungen", textStartX, 22);

  // Contact info right-aligned in white
  doc.setFontSize(8);
  doc.setTextColor(220, 240, 220);
  const rightX = pageW - MARGIN;
  doc.text(`Tel: ${settings.phone}`, rightX, 10, { align: "right" });
  doc.text(settings.email, rightX, 15, { align: "right" });
  doc.text(`${settings.street}, ${settings.postalCode} ${settings.city}`, rightX, 20, { align: "right" });
  doc.text(settings.website, rightX, 25, { align: "right" });

  return barH;
}

// ────────────────────────────────────────
// TRUST BAR – No emoji/unicode stars, text only
// ────────────────────────────────────────
function drawTrustBar(doc: jsPDF, y: number, pageW: number): number {
  const barH = 8;

  // Light green background
  doc.setFillColor(...LIGHT_GREEN_BG);
  doc.rect(0, y, pageW, barH, "F");

  // Centered trust text – NO star symbols, just text
  doc.setFontSize(7.5);
  doc.setTextColor(...PRIMARY);
  doc.setFont(undefined!, "bold");
  doc.text(
    "5,0 auf Google  |  500+ Entrümpelungen  |  Familienunternehmen  |  Vollversichert  |  Festpreisgarantie",
    pageW / 2,
    y + barH / 2 + 1.5,
    { align: "center" }
  );
  doc.setFont(undefined!, "normal");

  return y + barH + 4;
}

// ────────────────────────────────────────
// ADDRESSES – Two-column layout
// ────────────────────────────────────────
function drawAddresses(
  doc: jsPDF,
  offer: Offer,
  settings: CompanySettings,
  pageW: number,
  y: number
): number {
  // Sender line (small, gray)
  doc.setFontSize(7);
  doc.setTextColor(...LIGHT_GRAY);
  doc.text(
    `${settings.name} - ${settings.street} - ${settings.postalCode} ${settings.city}`,
    MARGIN,
    y
  );
  y += 7;

  // Customer address (left)
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

  // Right side: Offer info box
  const boxW = 65;
  const boxX = pageW - MARGIN - boxW;
  const boxY = y - 16;
  doc.setFillColor(...INFO_BOX_BG);
  doc.roundedRect(boxX, boxY, boxW, 24, 2, 2, "F");
  doc.setDrawColor(...TABLE_BORDER);
  doc.setLineWidth(0.3);
  doc.roundedRect(boxX, boxY, boxW, 24, 2, 2, "S");

  let ry = boxY + 7;
  doc.setFontSize(8.5);

  const infoRows: [string, string][] = [
    ["Angebotsnr.:", offer.offerNumber],
    ["Datum:", formatDate(offer.date)],
  ];

  const validUntil = new Date(offer.date);
  validUntil.setDate(validUntil.getDate() + offer.validityDays);
  const validDateStr = safeDateFormat(validUntil.toISOString());
  if (validDateStr) {
    infoRows.push(["Gültig bis:", validDateStr]);
  }

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

// ────────────────────────────────────────
// TITLE
// ────────────────────────────────────────
function drawTitle(doc: jsPDF, y: number): number {
  doc.setFontSize(20);
  doc.setTextColor(...PRIMARY);
  doc.setFont(undefined!, "bold");
  doc.text("ANGEBOT", MARGIN, y);
  doc.setFont(undefined!, "normal");

  // Subtle line under title
  doc.setDrawColor(...PRIMARY);
  doc.setLineWidth(0.8);
  doc.line(MARGIN, y + 2, MARGIN + 35, y + 2);

  return y + 14;
}

// ────────────────────────────────────────
// GREETING
// ────────────────────────────────────────
function drawGreeting(doc: jsPDF, offer: Offer, y: number): number {
  doc.setFontSize(10);
  doc.setTextColor(...DARK);

  const salutation = offer.customer.salutation || "Herr";
  let greeting: string;
  if (salutation === "Frau") {
    greeting = `Sehr geehrte Frau ${offer.customer.lastName},`;
  } else if (salutation === "Firma") {
    greeting = "Sehr geehrte Damen und Herren,";
  } else {
    greeting = `Sehr geehrter Herr ${offer.customer.lastName},`;
  }

  doc.text(greeting, MARGIN, y);
  y += 6;
  doc.text(
    "vielen Dank für Ihre Anfrage. Gerne unterbreiten wir Ihnen folgendes Angebot:",
    MARGIN,
    y
  );
  return y + 10;
}

// ────────────────────────────────────────
// ITEMS TABLE – Modern zebra stripes, no vertical lines
// ────────────────────────────────────────
function drawItemsTable(
  doc: jsPDF,
  offer: Offer,
  y: number,
  contentW: number
): number {
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
    headStyles: {
      fillColor: [46, 125, 50],
      textColor: 255,
      fontSize: 9,
      fontStyle: "bold",
      cellPadding: 4,
    },
    styles: {
      fontSize: 9,
      cellPadding: { top: 3.5, bottom: 3.5, left: 3, right: 3 },
      textColor: DARK,
      lineColor: TABLE_BORDER,
      lineWidth: 0,
    },
    alternateRowStyles: {
      fillColor: ZEBRA_BG,
    },
    columnStyles: {
      0: { cellWidth: 14, halign: "center" },
      1: { cellWidth: "auto" },
      2: { cellWidth: 18, halign: "right" },
      3: { cellWidth: 20 },
      4: { cellWidth: 28, halign: "right" },
      5: { cellWidth: 28, halign: "right" },
    },
    // Only horizontal lines between rows
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

// ────────────────────────────────────────
// TOTALS – Gold accent for total
// ────────────────────────────────────────
function drawTotals(
  doc: jsPDF,
  offer: Offer,
  pageW: number,
  y: number
): number {
  const labelX = pageW - MARGIN - 70;
  const valueX = pageW - MARGIN;

  doc.setFontSize(10);
  doc.setTextColor(...DARK);

  if (offer.isKleinunternehmer) {
    // Separator line
    doc.setDrawColor(...PRIMARY);
    doc.setLineWidth(0.5);
    doc.line(labelX, y - 2, valueX, y - 2);

    doc.setFont(undefined!, "bold");
    doc.setFontSize(14);
    doc.setTextColor(...ACCENT_GOLD);
    doc.text("Gesamtbetrag:", labelX, y + 5);
    doc.text(formatCurrency(offer.totalNet), valueX, y + 5, { align: "right" });
    doc.setFont(undefined!, "normal");
    y += 14;

    doc.setFontSize(8.5);
    doc.setTextColor(...GRAY);
    doc.text(
      "Gemäß §19 UStG wird keine Umsatzsteuer berechnet.",
      MARGIN,
      y
    );
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

    // Separator
    doc.setDrawColor(...PRIMARY);
    doc.setLineWidth(0.5);
    doc.line(labelX, y - 1, valueX, y - 1);
    y += 5;

    // Total in gold/orange accent
    doc.setFont(undefined!, "bold");
    doc.setFontSize(14);
    doc.setTextColor(...ACCENT_GOLD);
    doc.text("Gesamtbetrag:", labelX, y);
    doc.text(formatCurrency(offer.totalGross), valueX, y, { align: "right" });
    doc.setFont(undefined!, "normal");
    y += 12;
  }

  return y;
}

// ────────────────────────────────────────
// FESTPREIS BOX – Green left accent bar
// ────────────────────────────────────────
function drawFestpreisBox(doc: jsPDF, y: number, contentW: number): number {
  const boxH = 12;

  // Light green background
  doc.setFillColor(...LIGHT_GREEN_BG);
  doc.roundedRect(MARGIN, y, contentW, boxH, 2, 2, "F");

  // 4px thick green left accent bar
  doc.setFillColor(...PRIMARY);
  doc.rect(MARGIN, y + 1, 2.5, boxH - 2, "F");

  // Text
  doc.setFontSize(9.5);
  doc.setFont(undefined!, "bold");
  doc.setTextColor(...PRIMARY);
  doc.text(
    "Festpreis – keine versteckten Kosten oder Nachzahlungen.",
    MARGIN + 8,
    y + boxH / 2 + 1.5
  );
  doc.setFont(undefined!, "normal");

  return y + boxH + 10;
}

// ────────────────────────────────────────
// NOTES & SCHEDULE – Bug fixes: Invalid Date + plural
// ────────────────────────────────────────
function ensureSpace(doc: jsPDF, y: number, needed: number, settings: CompanySettings): number {
  const pageH = doc.internal.pageSize.getHeight();
  const footerMargin = 22;
  if (y + needed > pageH - footerMargin) {
    addFooter(doc, settings);
    doc.addPage();
    return 20;
  }
  return y;
}

function drawNotesAndSchedule(
  doc: jsPDF,
  offer: Offer,
  contentW: number,
  y: number,
  settings: CompanySettings
): number {
  if (offer.notes) {
    y = ensureSpace(doc, y, 15, settings);
    doc.setFontSize(10);
    doc.setTextColor(...DARK);
    doc.setFont(undefined!, "bold");
    doc.text("Anmerkungen:", MARGIN, y);
    doc.setFont(undefined!, "normal");
    y += 5;

    const lines: string[] = doc.splitTextToSize(offer.notes, contentW);
    const pageH = doc.internal.pageSize.getHeight();
    const footerMargin = 22;
    const lineH = 4.5;

    for (const line of lines) {
      if (y + lineH > pageH - footerMargin) {
        addFooter(doc, settings);
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(10);
      doc.setTextColor(...DARK);
      doc.text(line, MARGIN, y);
      y += lineH;
    }
    y += 5;
  }

  // BUG FIX: Only show scheduled date if valid (no "Invalid Date")
  if (offer.scheduledDate) {
    const formattedDate = safeDateFormat(offer.scheduledDate);
    if (formattedDate) {
      y = ensureSpace(doc, y, 8, settings);
      doc.setFontSize(9);
      doc.setTextColor(...DARK);
      doc.text(`Voraussichtlicher Termin: ${formattedDate}`, MARGIN, y);
      y += 5;
    }
  }

  // BUG FIX: Plural logic for duration + hide if empty
  if (offer.estimatedDuration && offer.estimatedDuration.trim() !== "") {
    const duration = offer.estimatedDuration.trim();
    // Fix "2 Tag" → "2 Tage" etc.
    const fixedDuration = duration.replace(
      /(\d+)\s*Tag(?!e)/g,
      (_, num) => `${num} ${Number(num) === 1 ? "Tag" : "Tage"}`
    );
    y = ensureSpace(doc, y, 8, settings);
    doc.setFontSize(9);
    doc.setTextColor(...DARK);
    doc.text(`Geschätzte Dauer: ${fixedDuration}`, MARGIN, y);
    y += 8;
  }

  return y;
}

// ────────────────────────────────────────
// CLOSING
// ────────────────────────────────────────
async function drawClosing(doc: jsPDF, settings: CompanySettings, y: number, offerDate: string): Promise<number> {
  // Need ~45mm for closing + signature block
  y = ensureSpace(doc, y, 70, settings);

  // Format date for pre-fill
  const formattedDate = offerDate
    ? new Date(offerDate).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })
    : "";

  y += 5;
  doc.setFontSize(10);
  doc.setTextColor(...DARK);
  doc.text("Wir freuen uns auf Ihre Beauftragung!", MARGIN, y);
  y += 15;

  // Signature block with labels above the lines
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  doc.setFont(undefined!, "bold");
  doc.text("Ort, Datum", MARGIN, y);
  doc.text("Unterschrift Auftraggeber", MARGIN + 90, y);
  doc.setFont(undefined!, "normal");
  y += 8;

  // Signature lines
  doc.setDrawColor(...GRAY);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, y, MARGIN + 70, y);
  doc.line(MARGIN + 90, y, MARGIN + 170, y);
  y += 16;

  // Second signature block – Auftragnehmer
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  doc.setFont(undefined!, "bold");
  doc.text("Ort, Datum", MARGIN, y);
  doc.text("Unterschrift Auftragnehmer", MARGIN + 90, y);
  doc.setFont(undefined!, "normal");
  y += 10;

  // Pre-fill city + date linksbündig über der Linie
  const cityDate = `${settings.city}, ${formattedDate}`;
  doc.setFontSize(9);
  doc.setTextColor(...DARK);
  doc.text(cityDate, MARGIN, y);

  // Reserve space for signature, then draw line
  y += 4;

  // Load and place signature image just above the line
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
    // Center signature over the signature line (line goes from MARGIN+90 to MARGIN+170)
    doc.addImage(sigImg, "PNG", MARGIN + 90 + (80 - sigW) / 2, y - sigH, sigW, sigH);
  } catch {
    // skip silently
  }

  doc.setDrawColor(...GRAY);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, y, MARGIN + 70, y);
  doc.line(MARGIN + 90, y, MARGIN + 170, y);
  y += 12;

  doc.setFontSize(8);
  doc.setTextColor(...GRAY);
  doc.text(
    `Bei Rückfragen erreichen Sie uns unter ${settings.phone} oder ${settings.email}`,
    MARGIN,
    y
  );

  return y + 5;
}

// ────────────────────────────────────────
// AGB PAGE – Green paragraph titles
// ────────────────────────────────────────
function drawAgbPage(doc: jsPDF, settings: CompanySettings, contentW: number, isKleinunternehmer: boolean) {
  const pageH = doc.internal.pageSize.getHeight();
  const footerMargin = 22;
  const lineHeight = 4.5;
  let ay = 20;

  doc.setFontSize(14);
  doc.setTextColor(...PRIMARY);
  doc.setFont(undefined!, "bold");
  doc.text("Allgemeine Geschäftsbedingungen", MARGIN, ay);
  doc.setFont(undefined!, "normal");

  // Accent line
  doc.setDrawColor(...PRIMARY);
  doc.setLineWidth(0.6);
  doc.line(MARGIN, ay + 2, MARGIN + 50, ay + 2);
  ay += 10;

  // Dynamically adjust §4 based on Kleinunternehmer status
  let agbText = settings.agbText;

  const paragraph4Marker = "§4 Preise und Zahlung";
  const paragraph4Idx = agbText.indexOf(paragraph4Marker);
  if (paragraph4Idx !== -1) {
    const afterMarker = agbText.indexOf("\n", paragraph4Idx);
    const absatz1End = agbText.indexOf("\n", afterMarker + 1);
    const restAfter1 = agbText.substring(absatz1End + 1);

    let taxParagraph: string;
    if (isKleinunternehmer) {
      taxParagraph = "(2) Gemäß §19 UStG wird keine Umsatzsteuer berechnet und ausgewiesen (Kleinunternehmerregelung).";
    } else {
      taxParagraph = "(2) Die angegebenen Preise verstehen sich zzgl. der gesetzlichen Umsatzsteuer von derzeit 19%.";
    }

    if (restAfter1.startsWith("(2) Gemäß") || restAfter1.startsWith("(2) Die angegebenen Preise")) {
      const nextLineEnd = restAfter1.indexOf("\n");
      const remainingText = restAfter1.substring(nextLineEnd);
      agbText = agbText.substring(0, absatz1End + 1) + taxParagraph + remainingText;
    } else {
      let renumbered = restAfter1;
      renumbered = renumbered.replace(/^\(4\)/m, "(5)");
      renumbered = renumbered.replace(/^\(3\)/m, "(4)");
      renumbered = renumbered.replace(/^\(2\)/m, "(3)");
      agbText = agbText.substring(0, absatz1End + 1) + taxParagraph + "\n" + renumbered;
    }
  }

  doc.setFontSize(9);
  const agbLines: string[] = doc.splitTextToSize(agbText, contentW);

  for (const line of agbLines) {
    if (ay + lineHeight > pageH - footerMargin) {
      addFooter(doc, settings);
      doc.addPage();
      ay = 20;
    }

    // Style paragraph titles (§) in green bold
    if (/^§\d+/.test(line.trim())) {
      doc.setFont(undefined!, "bold");
      doc.setTextColor(...PRIMARY);
      doc.setFontSize(10);
      doc.text(line, MARGIN, ay);
      doc.setFont(undefined!, "normal");
      doc.setFontSize(9);
    } else {
      doc.setTextColor(...DARK);
      doc.text(line, MARGIN, ay);
    }
    ay += lineHeight;
  }
}

// ────────────────────────────────────────
// FOOTER (every page) – Green separator
// ────────────────────────────────────────
function addFooter(doc: jsPDF, settings: CompanySettings) {
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  // Thin gray separator line
  doc.setDrawColor(...LIGHT_GRAY);
  doc.setLineWidth(0.2);
  doc.line(MARGIN, pageH - 16, pageW - MARGIN, pageH - 16);

  doc.setFontSize(7);
  doc.setTextColor(...GRAY);
  const line1 = `${settings.name} | Inhaber: ${settings.owner} | ${settings.street}, ${settings.postalCode} ${settings.city}`;
  const line2 = `Tel: ${settings.phone} | ${settings.email} | ${settings.website}${settings.taxNumber ? ` | St.-Nr.: ${settings.taxNumber}` : ""}`;

  doc.text(line1, pageW / 2, pageH - 11, { align: "center" });
  doc.text(line2, pageW / 2, pageH - 7, { align: "center" });
}
