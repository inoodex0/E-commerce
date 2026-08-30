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
}

const F = "helvetica";

function buildPDF(data: InvoiceData): jsPDF {
  const doc = new jsPDF();
  const pw = doc.internal.pageSize.getWidth();
  const ph = doc.internal.pageSize.getHeight();

  const dk: [number, number, number] = [23, 20, 18];
  const gy: [number, number, number] = [107, 101, 96];
  const lt: [number, number, number] = [231, 225, 216];
  const bg: [number, number, number] = [245, 242, 236];

  // ── Logo circle + INVOICE ──
  doc.setFillColor(240, 237, 232);
  doc.circle(32, 24, 12, "F");
  doc.setFontSize(5);
  doc.setFont(F, "bold");
  doc.setTextColor(...dk);
  doc.text("NOVARA", 32, 22, { align: "center" });
  doc.text("LOGO", 32, 27, { align: "center" });

  doc.setFontSize(20);
  doc.setFont(F, "normal");
  doc.setTextColor(...dk);
  doc.text("INVOICE", 50, 26);

  // ── Invoice Info + Billed To ──
  const infoY = 46;
  doc.setFontSize(8);
  doc.setFont(F, "bold");
  doc.setTextColor(...dk);
  doc.text("Invoice Number:", 20, infoY);
  doc.setFont(F, "normal");
  doc.setTextColor(...gy);
  doc.text(data.orderId, 56, infoY);

  doc.setFont(F, "bold");
  doc.setTextColor(...dk);
  doc.text("Invoice Date:", 20, infoY + 6);
  doc.setFont(F, "normal");
  doc.setTextColor(...gy);
  doc.text(data.date, 50, infoY + 6);

  const payLabel = data.paymentMethod === "cod" ? "Cash on Delivery" : data.paymentMethod === "bkash" ? "bKash" : "Nagad";
  doc.setFont(F, "bold");
  doc.setTextColor(...dk);
  doc.text("Payment:", 20, infoY + 12);
  doc.setFont(F, "normal");
  doc.setTextColor(...gy);
  doc.text(payLabel, 40, infoY + 12);

  // Billed to (right)
  doc.setFont(F, "bold");
  doc.setTextColor(...dk);
  doc.text("Billed to:", pw - 20, infoY, { align: "right" });
  doc.text(data.customer.name || "N/A", pw - 20, infoY + 6, { align: "right" });
  doc.setFont(F, "normal");
  doc.setTextColor(...gy);
  doc.text(data.customer.address || "", pw - 20, infoY + 12, { align: "right" });
  doc.text(`${data.customer.area}, ${data.customer.city}`, pw - 20, infoY + 18, { align: "right" });
  doc.text(data.customer.email || "", pw - 20, infoY + 24, { align: "right" });

  // ── Table ──
  const tY = infoY + 34;
  const rows = data.items.map((i) => [
    i.name,
    `৳${i.price.toLocaleString()}`,
    String(i.quantity),
    `৳${(i.price * i.quantity).toLocaleString()}`,
  ]);

  autoTable(doc, {
    startY: tY,
    margin: { left: 20, right: 20 },
    head: [["Description", "Price", "Quantity", "Total"]],
    body: rows,
    theme: "plain",
    headStyles: {
      fillColor: [255, 255, 255],
      textColor: dk,
      fontSize: 8,
      fontStyle: "bold",
      halign: "left",
      cellPadding: 4,
      lineColor: dk,
      lineWidth: 0.5,
    },
    bodyStyles: {
      textColor: dk,
      fontSize: 8,
      cellPadding: 4,
      lineColor: lt,
      lineWidth: 0.1,
    },
    columnStyles: {
      1: { halign: "right" as const },
      2: { halign: "center" as const },
      3: { halign: "right" as const },
    },
  });

  const tEnd = (doc as any).lastAutoTable?.finalY || tY + 20;

  // ── Bank Info + Total Due ──
  const bankY = tEnd + 10;
  doc.setFillColor(...bg);
  doc.roundedRect(20, bankY, pw - 40, 32, 3, 3, "F");

  doc.setFontSize(8);
  doc.setFont(F, "bold");
  doc.setTextColor(...dk);
  doc.text("Bank Info", 26, bankY + 8);

  doc.setFontSize(7);
  doc.setFont(F, "normal");
  doc.setTextColor(...gy);

  doc.text("Account Name:", 26, bankY + 15);
  doc.setFont(F, "bold"); doc.setTextColor(...dk);
  doc.text("NOVARA", 58, bankY + 15);

  doc.setFont(F, "normal"); doc.setTextColor(...gy);
  doc.text("Bank:", 26, bankY + 20);
  doc.setFont(F, "bold"); doc.setTextColor(...dk);
  doc.text("bKash / Nagad", 58, bankY + 20);

  doc.setFont(F, "normal"); doc.setTextColor(...gy);
  doc.text("Account Number:", 26, bankY + 25);
  doc.setFont(F, "bold"); doc.setTextColor(...dk);
  doc.text("01XXXXXXXXX", 58, bankY + 25);

  // Total due (right)
  doc.setFontSize(7);
  doc.setFont(F, "normal");
  doc.setTextColor(...gy);
  doc.text("Total due:", pw - 26, bankY + 10, { align: "right" });
  doc.setFontSize(14);
  doc.setFont(F, "bold");
  doc.setTextColor(...dk);
  doc.text(`৳${data.total.toLocaleString()}`, pw - 26, bankY + 24, { align: "right" });

  // ── Footer ──
  const fY = ph - 14;
  doc.setDrawColor(...lt);
  doc.setLineWidth(0.15);
  doc.line(20, fY - 4, pw - 20, fY - 4);

  doc.setFontSize(7);
  doc.setFont(F, "normal");
  doc.setTextColor(...gy);

  const heart = "\u2665";
  const footerParts = [
    "+880 1XXXXXXXXX",
    "|",
    "support@novara.com",
    "|",
    "www.novara.com",
    heart,
  ];
  const footerText = footerParts.join("  ");
  doc.text(footerText, pw / 2, fY + 2, { align: "center" });

  // Heart pink
  const fw = doc.getTextWidth(footerText);
  const hx = pw / 2 + fw / 2 - 3;
  doc.setTextColor(253, 111, 147);
  doc.text(heart, hx, fY + 2);

  return doc;
}

export function downloadInvoicePDF(data: InvoiceData): void {
  const doc = buildPDF(data);
  doc.save(`NOVARA-Invoice-${data.orderId}.pdf`);
}

export function printInvoicePDF(data: InvoiceData): void {
  const doc = buildPDF(data);
  const blob = doc.output("blob");
  const url = URL.createObjectURL(blob);
  const w = window.open(url);
  if (w) w.onload = () => w.print();
}
