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

function buildPDF(data: InvoiceData): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(251, 248, 243);
  doc.rect(0, 0, pageWidth, 297, "F");

  doc.setFillColor(23, 20, 18);
  doc.rect(0, 0, pageWidth, 45, "F");

  doc.setTextColor(253, 111, 147);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("NOVARA", 20, 20);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("INVOICE", 20, 30);

  doc.setFontSize(9);
  doc.text(`Order #${data.orderId}`, pageWidth - 20, 20, { align: "right" });
  doc.text(data.date, pageWidth - 20, 28, { align: "right" });

  doc.setTextColor(107, 101, 96);
  doc.setFontSize(8);
  doc.text("BILL TO", 20, 56);

  doc.setTextColor(23, 20, 18);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(data.customer.name || "N/A", 20, 63);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(107, 101, 96);
  const addr = [data.customer.address, data.customer.area, data.customer.city].filter(Boolean).join(", ");
  doc.text(addr || "N/A", 20, 69);
  doc.text(data.customer.phone || "N/A", 20, 75);
  doc.text(data.customer.email || "N/A", 20, 81);

  doc.setFontSize(8);
  doc.setTextColor(107, 101, 96);
  doc.text("PAYMENT METHOD", pageWidth - 20, 56, { align: "right" });
  doc.setFontSize(9);
  doc.setTextColor(23, 20, 18);
  const payLabel = data.paymentMethod === "cod" ? "Cash on Delivery" : data.paymentMethod === "bkash" ? "bKash" : "Nagad";
  doc.text(payLabel, pageWidth - 20, 63, { align: "right" });

  const tableData = data.items.map((item) => [
    item.name,
    item.size,
    item.color,
    String(item.quantity),
    `৳${item.price.toLocaleString()}`,
    `৳${(item.price * item.quantity).toLocaleString()}`,
  ]);

  autoTable(doc, {
    startY: 92,
    margin: { left: 20, right: 20 },
    head: [["Item", "Size", "Color", "Qty", "Price", "Total"]],
    body: tableData,
    theme: "plain",
    headStyles: {
      fillColor: [23, 20, 18],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
      halign: "left",
      cellPadding: 4,
    },
    bodyStyles: {
      textColor: [23, 20, 18],
      fontSize: 8,
      cellPadding: 4,
      lineColor: [231, 225, 216],
      lineWidth: 0.1,
    },
    alternateRowStyles: {
      fillColor: [245, 242, 236],
    },
    columnStyles: {
      0: { cellWidth: 60 },
      3: { halign: "center" as const },
      4: { halign: "right" as const },
      5: { halign: "right" as const },
    },
  });

  const tableEnd = (doc as any).lastAutoTable?.finalY || 130;
  const summaryY = tableEnd + 10;

  doc.setDrawColor(231, 225, 216);
  doc.line(pageWidth - 90, summaryY, pageWidth - 20, summaryY);

  doc.setFontSize(9);
  doc.setTextColor(107, 101, 96);
  doc.text("Subtotal", pageWidth - 90, summaryY + 8);
  doc.setTextColor(23, 20, 18);
  doc.text(`৳${data.subtotal.toLocaleString()}`, pageWidth - 20, summaryY + 8, { align: "right" });

  doc.setTextColor(107, 101, 96);
  doc.text("Shipping", pageWidth - 90, summaryY + 15);
  doc.setTextColor(23, 20, 18);
  doc.text(data.shipping === 0 ? "Free" : `৳${data.shipping.toLocaleString()}`, pageWidth - 20, summaryY + 15, { align: "right" });

  doc.setDrawColor(23, 20, 18);
  doc.line(pageWidth - 90, summaryY + 20, pageWidth - 20, summaryY + 20);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(107, 101, 96);
  doc.text("Total", pageWidth - 90, summaryY + 28);
  doc.setTextColor(253, 111, 147);
  doc.text(`৳${data.total.toLocaleString()}`, pageWidth - 20, summaryY + 28, { align: "right" });

  const footerY = 275;
  doc.setFillColor(23, 20, 18);
  doc.rect(0, footerY, pageWidth, 22, "F");
  doc.setFontSize(7);
  doc.setTextColor(180, 180, 180);
  doc.setFont("helvetica", "normal");
  doc.text("NOVARA — Premium Fashion & Accessories", 20, footerY + 8);
  doc.text("Questions? Contact us at support@novara.com", 20, footerY + 14);
  doc.text("Thank you for shopping with us!", pageWidth - 20, footerY + 8, { align: "right" });

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
  const printWindow = window.open(url);
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
    };
  }
}
