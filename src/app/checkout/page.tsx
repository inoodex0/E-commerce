"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Minus, Plus, Trash2, CheckCircle, Download, Printer, Tag, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { downloadInvoicePDF, printInvoicePDF, type InvoiceData, type PaperSize } from "@/lib/generateInvoice";

const districts = ["Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh"];

export default function CheckoutPage() {
  const { cart, clearCart, removeFromCart, updateQuantity } = useCartStore();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad">("cod");
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [paperSize, setPaperSize] = useState<PaperSize>("a4");
  const [showPaperModal, setShowPaperModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<"print" | "download">("print");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handlePaperSelect = (size: PaperSize) => {
    setPaperSize(size);
    setShowPaperModal(false);
    if (pendingAction === "print") printInvoicePDF(invoiceData!, size);
    else downloadInvoicePDF(invoiceData!, size);
  };

  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", district: "", thana: "", notes: "",
    bkashNumber: "", nagadNumber: "", transactionId: "",
  });
  const updateForm = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.product.price.replace(/[^0-9.৳,]/g, ""));
    return sum + price * item.quantity;
  }, 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "ZURII10") setCouponApplied(true);
  };

  const placeOrder = () => {
    const orderId = `ZUR-${Date.now().toString().slice(-6)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString("en-BD", { year: "numeric", month: "long", day: "numeric" });
    const data: InvoiceData = {
      orderId, date: dateStr,
      customer: { name: form.name, phone: form.phone, email: form.email, address: form.address, city: form.district, area: form.thana },
      items: cart.map((item) => ({
        name: item.product.name, category: item.product.category, size: item.size, color: item.color,
        quantity: item.quantity, price: parseFloat(item.product.price.replace(/[^0-9.]/g, "")),
      })),
      subtotal, shipping, total, paymentMethod: paymentMethod,
      paymentDetails: paymentMethod === "bkash" ? `bKash: ${form.bkashNumber} | TXN: ${form.transactionId}` : paymentMethod === "nagad" ? `Nagad: ${form.nagadNumber} | TXN: ${form.transactionId}` : undefined,
    };
    setInvoiceData(data);
    setOrderPlaced(true);
    const existing = JSON.parse(localStorage.getItem("zurii-orders") || "[]");
    existing.push({ ...data, status: "confirmed", createdAt: now.toISOString() });
    localStorage.setItem("zurii-orders", JSON.stringify(existing));
    clearCart();
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8852A]">Checkout</p>
          <h1 className="mt-2 font-serif text-3xl font-medium text-[#171412]">Your cart is empty</h1>
          <Link href="/shop" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#E8852A] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#d47a24]">
            Continue Shopping
          </Link>
        </div>
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
            <button onClick={() => { setPendingAction("print"); setShowPaperModal(true); }} className="flex items-center justify-center gap-2 border border-[#171412] bg-[#171412] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#E8852A] hover:border-[#E8852A]">
              <Printer size={14} /> Print Invoice
            </button>
            <button onClick={() => { setPendingAction("download"); setShowPaperModal(true); }} className="flex items-center justify-center gap-2 border border-[#E7E1D8] bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#171412] hover:border-[#E8852A] hover:text-[#E8852A]">
              <Download size={14} /> Download PDF
            </button>
            <Link href="/shop" className="flex items-center justify-center gap-2 border border-[#E7E1D8] bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6560] hover:border-[#E8852A] hover:text-[#E8852A]">
              Continue Shopping
            </Link>
          </div>
          <div className="relative overflow-hidden bg-white shadow-xl shadow-[#171412]/10">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full shrink-0 bg-[#171412] px-6 py-10 sm:px-8 md:w-[260px]">
                <svg className="pointer-events-none absolute right-0 top-0 h-full w-[120px]" viewBox="0 0 120 600" preserveAspectRatio="none" fill="none">
                  <path d="M120,0 C40,80 0,160 20,300 C40,440 100,520 120,600 L120,0 Z" fill="#E8852A" opacity="0.85" />
                </svg>
                <div className="relative z-10">
                  <div className="mb-10">
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                        <span className="font-serif text-base font-bold text-white">Z</span>
                      </div>
                      <div>
                        <h2 className="text-base font-bold tracking-[0.12em] text-white">ZURII</h2>
                        <p className="text-[8px] uppercase tracking-[0.2em] text-white/50">Premium Accessories</p>
                      </div>
                    </div>
                  </div>
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
                </div>
              </div>
              <div className="flex-1 p-6 sm:p-8 lg:p-10">
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
                            <p className="text-[10px] text-[#6B6560]">{item.category}</p>
                          </td>
                          <td className="py-3 text-right text-xs text-[#171412]">৳{item.price.toLocaleString()}</td>
                          <td className="py-3 text-center text-xs text-[#6B6560]">{item.quantity}</td>
                          <td className="py-3 text-right text-xs font-medium text-[#171412]">৳{(item.price * item.quantity).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 flex justify-end">
                  <div className="w-full max-w-[240px] space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#171412]">Sub Total:</span>
                      <span className="text-[#171412]">৳{invoiceData.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#171412]">Shipping:</span>
                      <span className={invoiceData.shipping === 0 ? "font-medium text-[#E8852A]" : "text-[#171412]"}>{invoiceData.shipping === 0 ? "Free" : `৳${invoiceData.shipping}`}</span>
                    </div>
                    <div className="flex justify-between border-t border-[#E7E1D8] pt-3">
                      <span className="text-sm font-bold text-[#171412]">Total:</span>
                      <span className="text-sm font-bold text-[#E8852A]">৳{invoiceData.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-10 border-t border-[#E7E1D8] pt-4">
                  <p className="text-xs font-medium text-[#171412]">Thank you for your business</p>
                </div>
              </div>
            </div>
          </div>
          {showPaperModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowPaperModal(false)}>
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-[90vw] max-w-sm" onClick={(e) => e.stopPropagation()}>
                <h3 className="mb-4 text-center font-serif text-lg font-medium text-[#171412]">Select Paper Size</h3>
                <div className="flex flex-col gap-2">
                  {([ { id: "a4" as const, label: "A4", desc: "210 × 297 mm" }, { id: "a5" as const, label: "A5", desc: "148 × 210 mm" }, { id: "letter" as const, label: "Letter", desc: "8.5 × 11 in" } ]).map((s) => (
                    <button key={s.id} onClick={() => handlePaperSelect(s.id)} className={`flex items-center justify-between px-4 py-3 text-[11px] font-semibold uppercase tracking-wider ${paperSize === s.id ? "border border-[#171412] bg-[#171412] text-white" : "border border-[#E7E1D8] bg-white text-[#6B6560] hover:border-[#E8852A]"}`}>
                      <span>{s.label}</span><span className="text-[9px] font-normal normal-case tracking-normal opacity-60">{s.desc}</span>
                    </button>
                  ))}
                </div>
                <button onClick={() => setShowPaperModal(false)} className="mt-4 w-full border border-[#E7E1D8] bg-white py-2 text-[11px] font-semibold uppercase tracking-wider text-[#6B6560] hover:border-[#E8852A]">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF8F3]">
      {/* Header */}
      <div className="border-b border-[#E7E1D8] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <h1 className="text-center font-serif text-2xl font-medium text-[#171412] sm:text-3xl">Checkout</h1>
          <p className="mt-1 text-center text-xs text-[#6B6560]">
            <Link href="/" className="hover:text-[#E8852A]">Home</Link>
            <ChevronRight size={10} className="mx-1.5 inline" />
            <span className="text-[#E8852A]">Checkout</span>
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">

        {/* Login Banner */}
        <div className="mb-6 flex items-center justify-between rounded-lg border border-[#E7E1D8] bg-white px-5 py-3.5">
          <p className="text-sm text-[#6B6560]">Have any account? please <Link href="/sign-in" className="font-semibold text-[#E8852A] hover:underline">login</Link> or <Link href="/sign-in" className="font-semibold text-[#E8852A] hover:underline">register</Link></p>
          <div className="flex gap-2">
            <Link href="/sign-in" className="rounded-lg border border-[#E7E1D8] bg-white px-4 py-2 text-xs font-semibold text-[#171412] hover:border-[#E8852A]">Login</Link>
            <Link href="/sign-in" className="rounded-lg border border-[#E8852A] bg-[#E8852A] px-4 py-2 text-xs font-semibold text-white hover:bg-[#d47a24]">Register</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            {/* Order Review */}
            <div className="rounded-lg border border-[#E7E1D8] bg-white p-5">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-[#171412]">
                <span className="h-5 w-1 rounded-full bg-[#E8852A]" />
                Order review
              </h2>
              <div className="space-y-4">
                {cart.map((item, index) => {
                  const price = parseFloat(item.product.price.replace(/[^0-9.]/g, ""));
                  return (
                    <div key={`${item.product.name}-${index}`} className="flex items-center gap-4 border-b border-[#E7E1D8] pb-4 last:border-0 last:pb-0">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#F5F2EC]">
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[#171412] truncate">{item.product.name}</p>
                        <div className="mt-1.5 flex items-center gap-2">
                          <span className="text-[11px] text-[#6B6560]">Qty:</span>
                          <div className="flex items-center rounded-md border border-[#E7E1D8]">
                            <button onClick={() => updateQuantity(index, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center text-[#6B6560] hover:bg-[#FBF8F3]">
                              <Minus size={12} />
                            </button>
                            <span className="flex h-7 w-8 items-center justify-center border-x border-[#E7E1D8] text-xs font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(index, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center text-[#6B6560] hover:bg-[#FBF8F3]">
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="ml-auto text-sm font-semibold text-[#171412]">৳{(price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(index)} className="text-[#6B6560] hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="rounded-lg border border-[#E7E1D8] bg-white p-5">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-[#171412]">
                <span className="h-5 w-1 rounded-full bg-[#E8852A]" />
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => updateForm("name", e.target.value)} className="rounded-lg border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none focus:border-[#E8852A]" />
                <div className="flex gap-2">
                  <span className="flex items-center rounded-lg border border-[#E7E1D8] bg-[#FBF8F3] px-3 text-sm text-[#6B6560]">88</span>
                  <input type="tel" placeholder="01XXXXXXXXX" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} className="flex-1 rounded-lg border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none focus:border-[#E8852A]" />
                </div>
                <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => updateForm("email", e.target.value)} className="sm:col-span-2 rounded-lg border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none focus:border-[#E8852A]" />
                <div className="sm:col-span-2 rounded-lg border border-[#E8852A]/30 bg-[#E8852A]/5 px-4 py-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#E8852A]">Your Address</p>
                  <input type="text" placeholder="House, Road, Block..." value={form.address} onChange={(e) => updateForm("address", e.target.value)} className="mt-1 w-full bg-transparent text-sm text-[#171412] outline-none placeholder:text-[#6B6560]/40" />
                </div>
                <input type="text" placeholder="Street Address (Optional)" className="sm:col-span-2 rounded-lg border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none focus:border-[#E8852A]" />
                <select value={form.district} onChange={(e) => updateForm("district", e.target.value)} className="rounded-lg border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none focus:border-[#E8852A]">
                  <option value="">Select District</option>
                  {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                <input type="text" placeholder="Select Thana (Optional)" value={form.thana} onChange={(e) => updateForm("thana", e.target.value)} className="rounded-lg border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none focus:border-[#E8852A]" />
              </div>
            </div>

            {/* Billing Address */}
            <div className="rounded-lg border border-[#E7E1D8] bg-white">
              <button onClick={() => setBillingOpen(!billingOpen)} className="flex w-full items-center justify-between p-5">
                <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-[#171412]">
                  <span className="h-5 w-1 rounded-full bg-[#E8852A]" />
                  Billing Address
                </h2>
                <div className={`h-5 w-5 rounded-full border-2 transition-colors ${billingOpen ? "border-[#E8852A] bg-[#E8852A]" : "border-[#D5D0C8]"}`} />
              </button>
              {billingOpen && (
                <div className="grid grid-cols-1 gap-3 border-t border-[#E7E1D8] px-5 pb-5 pt-4 sm:grid-cols-2">
                  <input type="text" placeholder="Full Name" className="rounded-lg border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none focus:border-[#E8852A]" />
                  <input type="tel" placeholder="Phone Number" className="rounded-lg border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none focus:border-[#E8852A]" />
                  <input type="text" placeholder="Address" className="sm:col-span-2 rounded-lg border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none focus:border-[#E8852A]" />
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            {/* Payment Method */}
            <div className="rounded-lg border border-[#E7E1D8] bg-white p-5">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-[#171412]">
                <span className="h-5 w-1 rounded-full bg-[#E8852A]" />
                Payment method
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => setPaymentMethod("cod")} className={`flex items-center gap-2.5 rounded-lg border-2 px-3 py-3 text-left transition-all ${paymentMethod === "cod" ? "border-[#E8852A] bg-[#E8852A]/5" : "border-[#E7E1D8] hover:border-[#E8852A]/50"}`}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#E8852A]/10 text-[#E8852A]">💵</span>
                  <span className="text-xs font-semibold text-[#171412]">Cash On Delivery</span>
                  {paymentMethod === "cod" && <CheckCircle size={16} className="ml-auto text-[#E8852A]" />}
                </button>
                <button onClick={() => setPaymentMethod("bkash")} className={`flex items-center gap-2.5 rounded-lg border-2 px-3 py-3 text-left transition-all ${paymentMethod === "bkash" ? "border-[#E8852A] bg-[#E8852A]/5" : "border-[#E7E1D8] hover:border-[#E8852A]/50"}`}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#E2136E]/10 text-[#E2136E] font-bold text-[10px]">bK</span>
                  <span className="text-xs font-semibold text-[#171412]">bKash</span>
                  {paymentMethod === "bkash" && <CheckCircle size={16} className="ml-auto text-[#E8852A]" />}
                </button>
                <button onClick={() => setPaymentMethod("nagad")} className={`flex items-center gap-2.5 rounded-lg border-2 px-3 py-3 text-left transition-all ${paymentMethod === "nagad" ? "border-[#E8852A] bg-[#E8852A]/5" : "border-[#E7E1D8] hover:border-[#E8852A]/50"}`}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#F6921E]/10 text-[#F6921E] font-bold text-[10px]">N</span>
                  <span className="text-xs font-semibold text-[#171412]">Nagad</span>
                  {paymentMethod === "nagad" && <CheckCircle size={16} className="ml-auto text-[#E8852A]" />}
                </button>
                <button className={`flex items-center gap-2.5 rounded-lg border-2 px-3 py-3 text-left transition-all border-[#E7E1D8] hover:border-[#E8852A]/50`}>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-blue-500/10 text-blue-500">💳</span>
                  <span className="text-xs font-semibold text-[#171412]">Online Payment</span>
                </button>
              </div>

              {paymentMethod === "bkash" && (
                <div className="mt-4 space-y-3 rounded-lg border border-[#E2136E]/20 bg-[#FBF8F3] p-4">
                  <p className="text-[11px] text-[#6B6560]">Send <span className="font-semibold text-[#171412]">৳{total.toLocaleString()}</span> to <span className="font-semibold text-[#171412]">01XXXXXXXXX</span></p>
                  <input type="tel" placeholder="Your bKash Number" value={form.bkashNumber} onChange={(e) => updateForm("bkashNumber", e.target.value)} className="w-full rounded-lg border border-[#E7E1D8] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#E8852A]" />
                  <input type="text" placeholder="Transaction ID" value={form.transactionId} onChange={(e) => updateForm("transactionId", e.target.value)} className="w-full rounded-lg border border-[#E7E1D8] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#E8852A]" />
                </div>
              )}
              {paymentMethod === "nagad" && (
                <div className="mt-4 space-y-3 rounded-lg border border-[#F6921E]/20 bg-[#FBF8F3] p-4">
                  <p className="text-[11px] text-[#6B6560]">Send <span className="font-semibold text-[#171412]">৳{total.toLocaleString()}</span> to <span className="font-semibold text-[#171412]">01XXXXXXXXX</span></p>
                  <input type="tel" placeholder="Your Nagad Number" value={form.nagadNumber} onChange={(e) => updateForm("nagadNumber", e.target.value)} className="w-full rounded-lg border border-[#E7E1D8] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#E8852A]" />
                  <input type="text" placeholder="Transaction ID" value={form.transactionId} onChange={(e) => updateForm("transactionId", e.target.value)} className="w-full rounded-lg border border-[#E7E1D8] bg-white px-4 py-2.5 text-sm outline-none focus:border-[#E8852A]" />
                </div>
              )}
            </div>

            {/* Coupon */}
            <div className="rounded-lg border border-[#E7E1D8] bg-white p-5">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-[#171412]">
                <span className="h-5 w-1 rounded-full bg-[#E8852A]" />
                Have any coupon or gift voucher?
              </h2>
              <div className="flex gap-2">
                <input type="text" placeholder="Enter Coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="flex-1 rounded-lg border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-2.5 text-sm outline-none focus:border-[#E8852A]" />
                <button onClick={applyCoupon} className="rounded-lg bg-[#E8852A] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#d47a24]">Apply coupon</button>
              </div>
              {couponApplied && <p className="mt-2 text-xs text-emerald-600 font-medium">Coupon applied! 10% discount</p>}
              <div className="mt-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#6B6560]">Eligible promo codes</p>
                <div className="inline-flex items-center gap-2 rounded-lg border border-dashed border-[#E8852A] bg-[#E8852A]/5 px-3 py-2">
                  <Tag size={12} className="text-[#E8852A]" />
                  <div>
                    <p className="text-xs font-bold text-[#E8852A]">ZURII10</p>
                    <p className="text-[9px] text-[#6B6560]">Flat 10% OFF</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="rounded-lg border border-[#E7E1D8] bg-white p-5">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6560]">Sub total</span>
                  <span className="font-medium text-[#171412]">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6560]">Delivery cost</span>
                  <span className={shipping === 0 ? "font-medium text-[#E8852A]" : "font-medium text-[#171412]"}>{shipping === 0 ? "Free" : `৳${shipping}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B6560]">Discount (10%)</span>
                    <span className="font-medium text-emerald-600">-৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-[#E7E1D8] pt-3">
                  <span className="text-sm font-bold text-[#171412]">Total</span>
                  <span className="text-lg font-bold text-[#E8852A]">৳{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Special Notes */}
            <div className="rounded-lg border border-[#E7E1D8] bg-white p-5">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] text-[#171412]">
                <span className="h-5 w-1 rounded-full bg-[#E8852A]" />
                Special notes <span className="text-[10px] font-normal normal-case tracking-normal text-[#6B6560]">(Optional)</span>
              </h2>
              <textarea rows={3} maxLength={90} placeholder="Any special instructions..." value={form.notes} onChange={(e) => updateForm("notes", e.target.value)} className="w-full rounded-lg border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none focus:border-[#E8852A] resize-none" />
              <p className="mt-1 text-[10px] text-[#6B6560]">{form.notes.length} / 90 characters</p>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-0.5 accent-[#E8852A]" />
              <span className="text-[11px] text-[#6B6560]">
                I have read and agree to the <Link href="/terms" className="font-medium text-[#E8852A] hover:underline">Terms and Conditions</Link>, <Link href="/privacy" className="font-medium text-[#E8852A] hover:underline">Privacy Policy</Link> & <Link href="/returns" className="font-medium text-[#E8852A] hover:underline">Refund and Return Policy</Link>.
              </span>
            </label>

            {/* Place Order */}
            <button
              onClick={placeOrder}
              disabled={!form.name || !form.phone || !form.email || !form.address || !form.district || !termsAccepted || (paymentMethod === "bkash" && (!form.bkashNumber || !form.transactionId)) || (paymentMethod === "nagad" && (!form.nagadNumber || !form.transactionId))}
              className="w-full rounded-lg bg-[#E8852A] py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#d47a24] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>

      {/* Floating Cart Widget */}
      <div className="fixed bottom-6 right-20 z-[98] flex flex-col items-center gap-1 sm:bottom-8 sm:right-24">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8852A] text-white shadow-lg">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" /></svg>
        </div>
        <span className="text-[9px] font-bold text-[#171412]">{cart.length} Items</span>
        <span className="text-[9px] font-bold text-[#E8852A]">৳{subtotal.toLocaleString()}</span>
      </div>
    </main>
  );
}
