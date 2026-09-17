import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export interface InvoiceItem {
  name: string;
  category: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface InvoiceData {
  orderId: string;
  date: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    area: string;
  };
  items: InvoiceItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  paymentDetails?: string;
}

export type PaperSize = "a4" | "a5" | "letter";

const F = "helvetica";

const PAPER_DIMS: Record<PaperSize, { w: number; h: number }> = {
  a4: { w: 210, h: 297 },
  a5: { w: 148, h: 210 },
  letter: { w: 215.9, h: 279.4 },
};

function buildPDF(data: InvoiceData, paper: PaperSize = "a4"): jsPDF {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: paper });
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();

  const dk: [number, number, number] = [23, 20, 18];
  const gy: [number, number, number] = [107, 101, 96];
  const lt: [number, number, number] = [231, 225, 216];
  const pk: [number, number, number] = [232, 133, 42];

  const sidebarW = 62;
  const pad = 14;

  // ── Left sidebar (dark navy) ──
  doc.setFillColor(...dk);
  doc.rect(0, 0, sidebarW, ph, "F");

  // Pink wave (triangular wedge approximation)
  doc.setFillColor(...pk);
  doc.setGState(new (doc as any).GState({ opacity: 0.85 }));
  doc.triangle(sidebarW, 0, sidebarW + 30, ph * 0.15, sidebarW, ph * 0.55, "F");
  doc.setGState(new (doc as any).GState({ opacity: 0.4 }));
  doc.triangle(sidebarW - 10, 0, sidebarW + 18, ph * 0.2, sidebarW - 10, ph * 0.65, "F");
  doc.setGState(new (doc as any).GState({ opacity: 1 }));

  // ── Sidebar content ──
  let sy = 30;

  // Brand
  doc.setFillColor(255, 255, 255);
  doc.setGState(new (doc as any).GState({ opacity: 0.1 }));
  doc.roundedRect(pad, sy - 8, 16, 14, 2, 2, "F");
  doc.setGState(new (doc as any).GState({ opacity: 1 }));
  doc.setFontSize(10);
  doc.setFont(F, "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("N", pad + 8, sy + 1, { align: "center" });

  doc.setFontSize(11);
  doc.text("ZURII", pad + 22, sy - 2);
  doc.setFontSize(5);
  doc.setFont(F, "normal");
  doc.setTextColor(255, 255, 255);
  doc.setGState(new (doc as any).GState({ opacity: 0.5 }));
  doc.text("PREMIUM ACCESSORIES", pad + 22, sy + 3);
  doc.setGState(new (doc as any).GState({ opacity: 1 }));

  sy += 24;

  // Invoice to
  doc.setFontSize(6);
  doc.setFont(F, "normal");
  doc.setTextColor(255, 255, 255);
  doc.setGState(new (doc as any).GState({ opacity: 0.4 }));
  doc.text("INVOICE TO:", pad, sy);
  doc.setGState(new (doc as any).GState({ opacity: 1 }));

  sy += 8;
  doc.setFontSize(9);
  doc.setFont(F, "bold");
  doc.setTextColor(255, 255, 255);
  doc.text(data.customer.name || "N/A", pad, sy);

  doc.setFontSize(7);
  doc.setFont(F, "normal");
  doc.setTextColor(255, 255, 255);
  doc.setGState(new (doc as any).GState({ opacity: 0.7 }));

  const custLines = [
    data.customer.address,
    `${data.customer.area}, ${data.customer.city}`,
    data.customer.email,
    data.customer.phone,
  ].filter(Boolean);

  custLines.forEach((line, i) => {
    doc.text(line, pad, sy + 6 + i * 5);
  });

  doc.setGState(new (doc as any).GState({ opacity: 1 }));

  sy += 6 + custLines.length * 5 + 10;

  // Terms & Conditions
  doc.setDrawColor(255, 255, 255);
  doc.setGState(new (doc as any).GState({ opacity: 0.1 }));
  doc.setLineWidth(0.2);
  doc.line(pad, sy, sidebarW - pad, sy);
  doc.setGState(new (doc as any).GState({ opacity: 1 }));

  sy += 6;
  doc.setFontSize(7);
  doc.setFont(F, "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("TERMS & CONDITIONS", pad, sy);

  sy += 5;
  doc.setFontSize(5.5);
  doc.setFont(F, "normal");
  doc.setTextColor(255, 255, 255);
  doc.setGState(new (doc as any).GState({ opacity: 0.5 }));
  doc.text("Payment is due upon delivery for COD orders.", pad, sy, { maxWidth: sidebarW - pad * 2 });
  doc.text("Digital payments must be completed before", pad, sy + 4, { maxWidth: sidebarW - pad * 2 });
  doc.text("order processing. Returns accepted within", pad, sy + 8, { maxWidth: sidebarW - pad * 2 });
  doc.text("7 days of delivery.", pad, sy + 12, { maxWidth: sidebarW - pad * 2 });
  doc.setGState(new (doc as any).GState({ opacity: 1 }));

  // ── Right content area ──
  const rx = sidebarW + pad;
  const rw = pw - sidebarW - pad * 2;
  let ry = 28;

  // INVOICE title
  doc.setFontSize(28);
  doc.setFont(F, "normal");
  doc.setTextColor(...pk);
  doc.text("INVOICE", pw - pad, ry, { align: "right" });

  ry += 10;
  doc.setFontSize(7);
  doc.setFont(F, "bold");
  doc.setTextColor(...gy);
  doc.text("Invoice#", pw - pad - 40, ry);
  doc.setFont(F, "normal");
  doc.setTextColor(...dk);
  doc.text(`#${data.orderId}`, pw - pad, ry, { align: "right" });

  ry += 6;
  doc.setFont(F, "bold");
  doc.setTextColor(...gy);
  doc.text("Date", pw - pad - 40, ry);
  doc.setFont(F, "normal");
  doc.setTextColor(...dk);
  doc.text(data.date, pw - pad, ry, { align: "right" });

  ry += 14;

  // ── Items Table ──
  const rows = data.items.map((i, idx) => [
    String(idx + 1),
    i.name,
    `Tk ${i.price.toLocaleString()}`,
    String(i.quantity),
    `Tk ${(i.price * i.quantity).toLocaleString()}`,
  ]);

  autoTable(doc, {
    startY: ry,
    margin: { left: rx, right: pad },
    head: [["SL.", "Item Description", "Price", "Qty.", "Total"]],
    body: rows,
    theme: "plain",
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: dk,
      fontSize: 7,
      fontStyle: "bold",
      halign: "left",
      cellPadding: 3,
      lineColor: dk,
      lineWidth: 0.3,
    },
    bodyStyles: {
      textColor: dk,
      fontSize: 7,
      cellPadding: 3,
      lineColor: lt,
      lineWidth: 0.1,
    },
    columnStyles: {
      0: { cellWidth: 12, halign: "center" as const },
      2: { halign: "right" as const },
      3: { halign: "center" as const },
      4: { halign: "right" as const },
    },
  });

  const tEnd = (doc as any).lastAutoTable?.finalY || ry + 20;

  // ── Totals ──
  let totY = tEnd + 10;
  const totX = pw - pad;
  const totLabelX = totX - 55;

  doc.setFontSize(8);
  doc.setFont(F, "normal");
  doc.setTextColor(...dk);
  doc.text("Sub Total:", totLabelX, totY);
  doc.text(`Tk ${data.subtotal.toLocaleString()}`, totX, totY, { align: "right" });

  totY += 6;
  doc.text("Shipping:", totLabelX, totY);
  doc.setTextColor(...pk);
  doc.text(data.shipping === 0 ? "Free" : `Tk ${data.shipping}`, totX, totY, { align: "right" });

  totY += 8;
  doc.setDrawColor(...dk);
  doc.setLineWidth(0.3);
  doc.line(totLabelX, totY - 4, totX, totY - 4);
  doc.setFontSize(10);
  doc.setFont(F, "bold");
  doc.setTextColor(...dk);
  doc.text("Total:", totLabelX, totY);
  doc.setTextColor(...pk);
  doc.text(`Tk ${data.total.toLocaleString()}`, totX, totY, { align: "right" });

  // ── Payment Info + Authorised Sign ──
  totY += 16;

  const payLabel = data.paymentMethod === "cod" ? "Cash on Delivery" : data.paymentMethod === "bkash" ? "bKash" : "Nagad";

  // Authorised Sign (left of right area)
  doc.setDrawColor(...dk);
  doc.setLineWidth(0.3);
  doc.line(rx, totY + 12, rx + 50, totY + 12);
  doc.setFontSize(6);
  doc.setFont(F, "bold");
  doc.setTextColor(...dk);
  doc.text("AUTHORISED SIGN", rx, totY + 17);

  // Payment Info (right)
  doc.setFontSize(7);
  doc.setFont(F, "bold");
  doc.setTextColor(...dk);
  doc.text("PAYMENT INFO:", totLabelX, totY);

  totY += 6;
  doc.setFontSize(6.5);
  doc.setFont(F, "normal");
  doc.setTextColor(...gy);
  doc.text("Account #:", totLabelX, totY);
  doc.text("01XXXXXXXXX", totX, totY, { align: "right" });

  totY += 5;
  doc.text("A/C Name:", totLabelX, totY);
  doc.text("ZURII", totX, totY, { align: "right" });

  totY += 5;
  doc.text("Bank Details:", totLabelX, totY);
  doc.text(payLabel, totX, totY, { align: "right" });

  if (data.paymentDetails) {
    totY += 5;
    doc.setTextColor(...gy);
    doc.text(data.paymentDetails, totLabelX, totY, { maxWidth: rw });
  }

  // ── Thank you ──
  const fY = ph - pad - 8;
  doc.setDrawColor(...lt);
  doc.setLineWidth(0.15);
  doc.line(rx, fY - 4, pw - pad, fY - 4);

  doc.setFontSize(7);
  doc.setFont(F, "normal");
  doc.setTextColor(...dk);
  doc.text("Thank you for your business", rx, fY + 2);

  return doc;
}

export function downloadInvoicePDF(data: InvoiceData, paper: PaperSize = "a4"): void {
  const doc = buildPDF(data, paper);
  doc.save(`ZURII-Invoice-${data.orderId}.pdf`);
}

export function printInvoicePDF(data: InvoiceData, paper: PaperSize = "a4"): void {
  const doc = buildPDF(data, paper);
  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  const w = window.open(url);
  if (w) w.onload = () => w.print();
}
