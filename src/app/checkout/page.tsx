"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, CreditCard, Truck, ShieldCheck, Download, Printer } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { downloadInvoicePDF, printInvoicePDF, type InvoiceData, type PaperSize } from "@/lib/generateInvoice";

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad">("cod");
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [paperSize, setPaperSize] = useState<PaperSize>("a4");
  const [showPaperModal, setShowPaperModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<"print" | "download">("print");

  const handlePaperSelect = (size: PaperSize) => {
    setPaperSize(size);
    setShowPaperModal(false);
    if (pendingAction === "print") {
      printInvoicePDF(invoiceData!, size);
    } else {
      downloadInvoicePDF(invoiceData!, size);
    }
  };

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    area: "",
    notes: "",
    bkashNumber: "",
    nagadNumber: "",
    transactionId: "",
  });

  const updateForm = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.product.price.replace(/[^0-9.]/g, ""));
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  const placeOrder = () => {
    const orderId = `NVR-${Date.now().toString().slice(-6)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-BD", { year: "numeric", month: "long", day: "numeric" });

    const data: InvoiceData = {
      orderId,
      date: dateStr,
      customer: { name: form.name, phone: form.phone, email: form.email, address: form.address, city: form.city, area: form.area },
      items: cart.map((item) => ({
        name: item.product.name,
        category: item.product.category,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: parseFloat(item.product.price.replace(/[^0-9.]/g, "")),
      })),
      subtotal,
      shipping,
      total,
      paymentMethod: paymentMethod,
      paymentDetails: paymentMethod === "bkash"
        ? `bKash: ${form.bkashNumber} | TXN: ${form.transactionId}`
        : paymentMethod === "nagad"
        ? `Nagad: ${form.nagadNumber} | TXN: ${form.transactionId}`
        : undefined,
    };

    setInvoiceData(data);
    setOrderPlaced(true);
    clearCart();
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      </main>
    );
  }

  if (orderPlaced && invoiceData) {
    const payLabel = invoiceData.paymentMethod === "cod" ? "Cash on Delivery" : invoiceData.paymentMethod === "bkash" ? "bKash" : "Nagad";
    return (
      <main className="min-h-screen bg-[#FBF8F3] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">

          <div className="mb-6 text-center">
            <CheckCircle className="mx-auto text-[#E8852A]" size={48} strokeWidth={1.5} />
            <h1 className="mt-3 font-serif text-2xl font-medium text-[#171412]">Order Placed Successfully!</h1>
            <p className="mt-1 text-sm text-[#6B6560]">Your invoice is ready. Print or download it below.</p>
          </div>

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => { setPendingAction("print"); setShowPaperModal(true); }}
              className="flex items-center justify-center gap-2 border border-[#171412] bg-[#171412] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#E8852A] hover:border-[#E8852A]"
            >
              <Printer size={14} />
              Print Invoice
            </button>
            <button
              onClick={() => { setPendingAction("download"); setShowPaperModal(true); }}
              className="flex items-center justify-center gap-2 border border-[#E7E1D8] bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#171412] transition-colors hover:border-[#E8852A] hover:text-[#E8852A]"
            >
              <Download size={14} />
              Download PDF
            </button>
            <Link
              href="/shop"
              className="flex items-center justify-center gap-2 border border-[#E7E1D8] bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6560] transition-colors hover:border-[#E8852A] hover:text-[#E8852A]"
            >
              Continue Shopping
            </Link>
          </div>

          {/* ═══ INVOICE PREVIEW — Sidebar Layout ═══ */}
          <div className="relative overflow-hidden bg-white shadow-xl shadow-[#171412]/10">
            <div className="flex flex-col md:flex-row">

              {/* ── Left Sidebar (dark navy + pink wave) ── */}
              <div className="relative w-full shrink-0 bg-[#171412] px-6 py-10 sm:px-8 md:w-[260px] lg:w-[280px]">
                {/* Pink curved wave overlay */}
                <svg className="pointer-events-none absolute right-0 top-0 h-full w-[120px]" viewBox="0 0 120 600" preserveAspectRatio="none" fill="none">
                  <path d="M120,0 C40,80 0,160 20,300 C40,440 100,520 120,600 L120,0 Z" fill="#E8852A" opacity="0.85" />
                </svg>
                <svg className="pointer-events-none absolute right-[30px] top-0 h-full w-[80px]" viewBox="0 0 80 600" preserveAspectRatio="none" fill="none">
                  <path d="M80,0 C20,100 0,200 10,340 C20,480 70,540 80,600 L80,0 Z" fill="#E8852A" opacity="0.4" />
                </svg>

                <div className="relative z-10">
                  {/* Brand */}
                  <div className="mb-10">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                        <span className="font-serif text-base font-bold text-white">N</span>
                      </div>
                      <div>
                        <h2 className="text-base font-bold tracking-[0.12em] text-white">ZURII</h2>
                        <p className="text-[8px] uppercase tracking-[0.2em] text-white/50">Premium Accessories</p>
                      </div>
                    </div>
                  </div>

                  {/* Invoice to */}
                  <div className="mb-8">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">Invoice to:</p>
                    <div className="mt-3 space-y-1">
                      <p className="text-sm font-semibold text-white">{invoiceData.customer.name}</p>
                      <p className="text-[11px] leading-relaxed text-white/70">{invoiceData.customer.address}</p>
                      <p className="text-[11px] leading-relaxed text-white/70">{invoiceData.customer.area}, {invoiceData.customer.city}</p>
                      <p className="text-[11px] leading-relaxed text-white/70">{invoiceData.customer.email}</p>
                      <p className="text-[11px] leading-relaxed text-white/70">{invoiceData.customer.phone}</p>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="border-t border-white/10 pt-6">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white">Terms &amp; Conditions</p>
                    <p className="mt-2 text-[9px] leading-relaxed text-white/50">
                      Payment is due upon delivery for COD orders. Digital payments must be completed before order processing. Returns accepted within 7 days of delivery.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Right Content ── */}
              <div className="flex-1 p-6 sm:p-8 lg:p-10">

                {/* INVOICE title + meta */}
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div />
                  <div className="text-left sm:text-right">
                    <h2 className="text-3xl font-light tracking-[0.15em] text-[#E8852A] sm:text-4xl">INVOICE</h2>
                    <div className="mt-3 space-y-1">
                      <div className="flex gap-3 sm:justify-end">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6560]">Invoice#</span>
                        <span className="text-xs font-semibold text-[#171412]">#{invoiceData.orderId}</span>
                      </div>
                      <div className="flex gap-3 sm:justify-end">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B6560]">Date</span>
                        <span className="text-xs text-[#171412]">{invoiceData.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items Table */}
                <div className="mt-10 overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b-2 border-[#171412]">
                        <th className="py-2 text-[10px] font-bold uppercase tracking-wider text-[#6B6560]">SL.</th>
                        <th className="py-2 text-[10px] font-bold uppercase tracking-wider text-[#6B6560]">Item Description</th>
                        <th className="py-2 text-right text-[10px] font-bold uppercase tracking-wider text-[#6B6560]">Price</th>
                        <th className="py-2 text-center text-[10px] font-bold uppercase tracking-wider text-[#6B6560]">Qty.</th>
                        <th className="py-2 text-right text-[10px] font-bold uppercase tracking-wider text-[#6B6560]">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.items.map((item, idx) => (
                        <tr key={idx} className="border-b border-[#E7E1D8]">
                          <td className="py-3 text-xs text-[#6B6560]">{idx + 1}</td>
                          <td className="py-3">
                            <p className="text-xs font-medium text-[#171412]">{item.name}</p>
                            <p className="text-[10px] text-[#6B6560]">{item.category}{item.size ? ` / ${item.size}` : ""}{item.color ? ` / ${item.color}` : ""}</p>
                          </td>
                          <td className="py-3 text-right text-xs text-[#171412]">৳{item.price.toLocaleString()}</td>
                          <td className="py-3 text-center text-xs text-[#6B6560]">{item.quantity}</td>
                          <td className="py-3 text-right text-xs font-medium text-[#171412]">৳{(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Empty rows to match visual */}
                <div className="border-b border-[#E7E1D8]">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-8 border-b border-[#E7E1D8]" />
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-6 flex justify-end">
                  <div className="w-full max-w-[240px] space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#171412]">Sub Total:</span>
                      <span className="text-[#171412]">৳{invoiceData.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#171412]">Shipping:</span>
                      <span className={invoiceData.shipping === 0 ? "font-medium text-[#E8852A]" : "text-[#171412]"}>
                        {invoiceData.shipping === 0 ? "Free" : `৳${invoiceData.shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-[#E7E1D8] pt-3">
                      <span className="text-sm font-bold text-[#171412]">Total:</span>
                      <span className="text-sm font-bold text-[#E8852A]">৳{invoiceData.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Info + Authorised Sign + Thank you */}
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {/* Authorised Sign */}
                  <div className="flex flex-col justify-end">
                    <div className="border-t border-[#171412] pt-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#171412]">Authorised Sign</p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#171412]">Payment Info:</p>
                    <div className="mt-2 space-y-1">
                      <div className="flex gap-2 text-[11px]">
                        <span className="font-medium text-[#6B6560]">Account #:</span>
                        <span className="text-[#171412]">01XXXXXXXXX</span>
                      </div>
                      <div className="flex gap-2 text-[11px]">
                        <span className="font-medium text-[#6B6560]">A/C Name:</span>
                        <span className="text-[#171412]">ZURII</span>
                      </div>
                      <div className="flex gap-2 text-[11px]">
                        <span className="font-medium text-[#6B6560]">Bank Details:</span>
                        <span className="text-[#171412]">{payLabel}</span>
                      </div>
                      {invoiceData.paymentDetails && (
                        <p className="mt-1 text-[10px] text-[#6B6560]">{invoiceData.paymentDetails}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Thank you */}
                <div className="mt-8 border-t border-[#E7E1D8] pt-4">
                  <p className="text-xs font-medium text-[#171412]">Thank you for your business</p>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Paper Size Modal */}
        {showPaperModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowPaperModal(false)}>
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90vw] max-w-sm" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 text-center">
                <h3 className="font-serif text-lg font-medium text-[#171412]">Select Paper Size</h3>
                <p className="mt-1 text-xs text-[#6B6560]">Choose a paper size for your invoice</p>
              </div>
              <div className="flex flex-col gap-2">
                {([
                  { id: "a4" as const, label: "A4", desc: "210 × 297 mm" },
                  { id: "a5" as const, label: "A5", desc: "148 × 210 mm" },
                  { id: "letter" as const, label: "Letter", desc: "8.5 × 11 in" },
                ]).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handlePaperSelect(s.id)}
                    className={`flex items-center justify-between px-4 py-3 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 ${
                      paperSize === s.id
                        ? "border border-[#171412] bg-[#171412] text-white"
                        : "border border-[#E7E1D8] bg-white text-[#6B6560] hover:border-[#E8852A] hover:text-[#E8852A]"
                    }`}
                  >
                    <span>{s.label}</span>
                    <span className={`text-[9px] font-normal normal-case tracking-normal ${paperSize === s.id ? "text-white/60" : "text-[#6B6560]/60"}`}>{s.desc}</span>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowPaperModal(false)}
                className="mt-4 w-full border border-[#E7E1D8] bg-white py-2 text-[11px] font-semibold uppercase tracking-wider text-[#6B6560] transition-colors hover:border-[#E8852A] hover:text-[#E8852A]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        <div className="mt-6 border-b border-[#E7E1D8] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8852A]">Secure Checkout</p>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl">
            Checkout
          </h1>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">

          <div className="space-y-8">

            {/* Shipping Information */}
            <div className="border border-[#E7E1D8] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-[#E7E1D8] pb-4">
                <Truck size={18} className="text-[#E8852A]" />
                <h2 className="font-serif text-lg font-medium text-[#171412]">Shipping Information</h2>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => updateForm("name", e.target.value)}
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#E8852A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1XXXXXXXXX"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#E8852A]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#E8852A]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="House 12, Road 5, Block B"
                    value={form.address}
                    onChange={(e) => updateForm("address", e.target.value)}
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#E8852A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="Dhaka"
                    value={form.city}
                    onChange={(e) => updateForm("city", e.target.value)}
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#E8852A]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Area / District *</label>
                  <input
                    type="text"
                    required
                    placeholder="Gulshan"
                    value={form.area}
                    onChange={(e) => updateForm("area", e.target.value)}
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#E8852A]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Order Notes (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Special delivery instructions..."
                    value={form.notes}
                    onChange={(e) => updateForm("notes", e.target.value)}
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#E8852A] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-[#E7E1D8] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-[#E7E1D8] pb-4">
                <CreditCard size={18} className="text-[#E8852A]" />
                <h2 className="font-serif text-lg font-medium text-[#171412]">Payment Method</h2>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { id: "cod" as const, label: "Cash on Delivery", desc: "Pay when you receive your order" },
                  { id: "bkash" as const, label: "bKash", desc: "Pay via bKash mobile wallet" },
                  { id: "nagad" as const, label: "Nagad", desc: "Pay via Nagad mobile wallet" },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-center gap-4 border p-4 transition-all duration-200 ${
                      paymentMethod === method.id
                        ? "border-[#171412] bg-[#FBF8F3]"
                        : "border-[#E7E1D8] hover:border-[#E8852A]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="accent-[#E8852A]"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#171412]">{method.label}</p>
                      <p className="text-[11px] text-[#6B6560]">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              {paymentMethod === "bkash" && (
                <div className="mt-5 space-y-4 rounded-lg border border-[#E2136E]/20 bg-[#FBF8F3] p-5">
                  <div className="flex items-center gap-2.5">
                    <svg viewBox="0 0 36 36" className="h-9 w-9 shrink-0" fill="none">
                      <circle cx="18" cy="18" r="18" fill="#E2136E"/>
                      <text x="18" y="23" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="Arial">bK</text>
                    </svg>
                    <p className="text-sm font-medium text-[#171412]">Pay with bKash</p>
                  </div>
                  <p className="text-[11px] text-[#6B6560]">
                    Send <span className="font-semibold text-[#171412]">৳{total.toLocaleString()}</span> to <span className="font-semibold text-[#171412]">01XXXXXXXXX (Personal)</span> and enter details below.
                  </p>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Your bKash Number *</label>
                    <input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={form.bkashNumber}
                      onChange={(e) => updateForm("bkashNumber", e.target.value)}
                      className="mt-1.5 w-full border border-[#E7E1D8] bg-white px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#E8852A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">bKash Transaction ID *</label>
                    <input
                      type="text"
                      placeholder="e.g. 8A3B5C7D9E"
                      value={form.transactionId}
                      onChange={(e) => updateForm("transactionId", e.target.value)}
                      className="mt-1.5 w-full border border-[#E7E1D8] bg-white px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#E8852A]"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "nagad" && (
                <div className="mt-5 space-y-4 rounded-lg border border-[#F6921E]/20 bg-[#FBF8F3] p-5">
                  <div className="flex items-center gap-2.5">
                    <svg viewBox="0 0 36 36" className="h-9 w-9 shrink-0" fill="none">
                      <circle cx="18" cy="18" r="18" fill="#F6921E"/>
                      <text x="18" y="23" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">Nagad</text>
                    </svg>
                    <p className="text-sm font-medium text-[#171412]">Pay with Nagad</p>
                  </div>
                  <p className="text-[11px] text-[#6B6560]">
                    Send <span className="font-semibold text-[#171412]">৳{total.toLocaleString()}</span> to <span className="font-semibold text-[#171412]">01XXXXXXXXX (Personal)</span> and enter details below.
                  </p>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Your Nagad Number *</label>
                    <input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={form.nagadNumber}
                      onChange={(e) => updateForm("nagadNumber", e.target.value)}
                      className="mt-1.5 w-full border border-[#E7E1D8] bg-white px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#E8852A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Nagad Transaction ID *</label>
                    <input
                      type="text"
                      placeholder="e.g. 8A3B5C7D9E"
                      value={form.transactionId}
                      onChange={(e) => updateForm("transactionId", e.target.value)}
                      className="mt-1.5 w-full border border-[#E7E1D8] bg-white px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#E8852A]"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Order Summary */}
          <div className="h-fit border border-[#E7E1D8] bg-white p-6 shadow-sm">
            <h3 className="font-serif text-lg font-medium text-[#171412]">Order Summary</h3>

            <div className="mt-4 max-h-[280px] space-y-3 overflow-y-auto">
              {cart.map((item, index) => (
                <div
                  key={`${item.product.name}-${item.size}-${item.color}-${index}`}
                  className="flex items-center gap-3"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-[#F5F2EC]">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#171412] px-1 text-[8px] text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-[#171412] line-clamp-1">{item.product.name}</p>
                    <p className="text-[10px] text-[#6B6560]">{item.size} / {item.color}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#171412]">
                    ৳{(parseFloat(item.product.price.replace(/[^0-9.]/g, "")) * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 border-t border-[#E7E1D8] pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B6560]">Subtotal</span>
                <span className="font-medium text-[#171412]">৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#6B6560]">Shipping</span>
                <span className="font-medium text-[#171412]">
                  {shipping === 0 ? (
                    <span className="text-[#E8852A]">Free</span>
                  ) : (
                    `৳${shipping}`
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-[10px] text-[#6B6560]">Free shipping on orders over ৳5,000</p>
              )}
            </div>

            <div className="flex justify-between border-t border-[#E7E1D8] py-4">
              <span className="text-sm font-semibold text-[#171412]">Total</span>
              <span className="text-lg font-semibold text-[#171412]">৳{total.toLocaleString()}</span>
            </div>

            <button
              onClick={placeOrder}
              disabled={
                !form.name || !form.phone || !form.email || !form.address || !form.city || !form.area ||
                (paymentMethod === "bkash" && (!form.bkashNumber || !form.transactionId)) ||
                (paymentMethod === "nagad" && (!form.nagadNumber || !form.transactionId))
              }
              className="w-full border border-[#171412] bg-[#171412] py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#E8852A] hover:border-[#E8852A] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#171412] disabled:hover:border-[#171412]"
            >
              Place Order — ৳{total.toLocaleString()}
            </button>

            <div className="mt-4 space-y-2 border-t border-[#E7E1D8] pt-4">
              <div className="flex items-center gap-2 text-[10px] text-[#6B6560]">
                <ShieldCheck size={12} className="text-[#E8852A]" />
                256-bit SSL encrypted payment
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#6B6560]">
                <Truck size={12} className="text-[#E8852A]" />
                Delivery within 3-5 business days
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
