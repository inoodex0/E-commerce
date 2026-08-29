"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, CreditCard, Truck, ShieldCheck, Download, Printer, FileText } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { downloadInvoicePDF, printInvoicePDF, type InvoiceData } from "@/lib/generateInvoice";

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad">("cod");
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    area: "",
    notes: "",
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
    };

    setInvoiceData(data);
    setOrderPlaced(true);
    clearCart();
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="font-serif text-3xl font-medium text-[#171412]">No Items to Checkout</h1>
          <p className="mt-2 text-sm text-[#6B6560]">Add some items to your cart first.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 border border-[#171412] bg-[#171412] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#fd6f93] hover:border-[#fd6f93]"
          >
            Shop Collection
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
            <CheckCircle className="mx-auto text-[#fd6f93]" size={48} strokeWidth={1.5} />
            <h1 className="mt-3 font-serif text-2xl font-medium text-[#171412]">Order Placed Successfully!</h1>
            <p className="mt-1 text-sm text-[#6B6560]">Your invoice is ready. Print or download it below.</p>
          </div>

          {/* Action Buttons */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={() => printInvoicePDF(invoiceData)}
              className="flex items-center justify-center gap-2 border border-[#171412] bg-[#171412] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#fd6f93] hover:border-[#fd6f93]"
            >
              <Printer size={14} />
              Print Invoice
            </button>
            <button
              onClick={() => downloadInvoicePDF(invoiceData)}
              className="flex items-center justify-center gap-2 border border-[#E7E1D8] bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#171412] transition-colors hover:border-[#fd6f93] hover:text-[#fd6f93]"
            >
              <Download size={14} />
              Download PDF
            </button>
            <Link
              href="/shop"
              className="flex items-center justify-center gap-2 border border-[#E7E1D8] bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6560] transition-colors hover:border-[#fd6f93] hover:text-[#fd6f93]"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Invoice Preview */}
          <div className="border border-[#E7E1D8] bg-white shadow-sm overflow-hidden">

            {/* Invoice Header */}
            <div className="bg-[#171412] px-6 py-5 sm:px-8 sm:py-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-serif text-xl font-bold text-[#fd6f93] sm:text-2xl">NOVARA</p>
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 sm:text-xs">Invoice</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-white">Order #{invoiceData.orderId}</p>
                  <p className="text-[10px] text-gray-400 sm:text-xs">{invoiceData.date}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-5 sm:px-8">

              {/* Billing + Payment */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#fd6f93]">Bill To</p>
                  <p className="mt-1 text-sm font-medium text-[#171412]">{invoiceData.customer.name}</p>
                  <p className="text-xs text-[#6B6560]">{invoiceData.customer.address}</p>
                  <p className="text-xs text-[#6B6560]">{invoiceData.customer.area}, {invoiceData.customer.city}</p>
                  <p className="text-xs text-[#6B6560]">{invoiceData.customer.phone}</p>
                  <p className="text-xs text-[#6B6560]">{invoiceData.customer.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#fd6f93]">Payment Method</p>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#FBF8F3] px-3 py-2">
                    <FileText size={14} className="text-[#171412]" />
                    <span className="text-xs font-medium text-[#171412]">{payLabel}</span>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-[#171412]">
                      <th className="pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#171412]">Item</th>
                      <th className="pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#171412]">Size</th>
                      <th className="pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#171412]">Color</th>
                      <th className="pb-2 text-center text-[10px] font-semibold uppercase tracking-wider text-[#171412]">Qty</th>
                      <th className="pb-2 text-right text-[10px] font-semibold uppercase tracking-wider text-[#171412]">Price</th>
                      <th className="pb-2 text-right text-[10px] font-semibold uppercase tracking-wider text-[#171412]">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item, idx) => (
                      <tr key={idx} className="border-b border-[#E7E1D8]">
                        <td className="py-2.5 text-xs font-medium text-[#171412]">{item.name}</td>
                        <td className="py-2.5 text-xs text-[#6B6560]">{item.size}</td>
                        <td className="py-2.5 text-xs text-[#6B6560]">{item.color}</td>
                        <td className="py-2.5 text-center text-xs text-[#6B6560]">{item.quantity}</td>
                        <td className="py-2.5 text-right text-xs text-[#171412]">৳{item.price.toLocaleString()}</td>
                        <td className="py-2.5 text-right text-xs font-semibold text-[#171412]">৳{(item.price * item.quantity).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="mt-5 flex justify-end">
                <div className="w-full max-w-[260px] space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#6B6560]">Subtotal</span>
                    <span className="font-medium text-[#171412]">৳{invoiceData.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#6B6560]">Shipping</span>
                    <span className="font-medium text-[#171412]">
                      {invoiceData.shipping === 0 ? <span className="text-[#fd6f93]">Free</span> : `৳${invoiceData.shipping.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-t-2 border-[#171412] pt-2">
                    <span className="text-sm font-bold text-[#171412]">Total</span>
                    <span className="text-base font-bold text-[#fd6f93]">৳{invoiceData.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Footer */}
            <div className="bg-[#171412] px-6 py-3 sm:px-8">
              <div className="flex flex-col items-center justify-between gap-1 sm:flex-row">
                <p className="text-[10px] text-gray-400">NOVARA — Premium Fashion & Accessories</p>
                <p className="text-[10px] text-gray-400">support@novara.com</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560] transition-colors hover:text-[#171412]"
        >
          <ArrowLeft size={14} /> Back to Cart
        </Link>

        <div className="mt-6 border-b border-[#E7E1D8] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Secure Checkout</p>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl">
            Checkout
          </h1>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">

          <div className="space-y-8">

            {/* Shipping Information */}
            <div className="border border-[#E7E1D8] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-[#E7E1D8] pb-4">
                <Truck size={18} className="text-[#fd6f93]" />
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
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#fd6f93]"
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
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#fd6f93]"
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
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#fd6f93]"
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
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#fd6f93]"
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
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#fd6f93]"
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
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#fd6f93]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Order Notes (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Special delivery instructions..."
                    value={form.notes}
                    onChange={(e) => updateForm("notes", e.target.value)}
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#fd6f93] resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-[#E7E1D8] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-[#E7E1D8] pb-4">
                <CreditCard size={18} className="text-[#fd6f93]" />
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
                        : "border-[#E7E1D8] hover:border-[#fd6f93]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="accent-[#fd6f93]"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#171412]">{method.label}</p>
                      <p className="text-[11px] text-[#6B6560]">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
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
                    <span className="text-[#fd6f93]">Free</span>
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
              disabled={!form.name || !form.phone || !form.email || !form.address || !form.city || !form.area}
              className="w-full border border-[#171412] bg-[#171412] py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#fd6f93] hover:border-[#fd6f93] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#171412] disabled:hover:border-[#171412]"
            >
              Place Order — ৳{total.toLocaleString()}
            </button>

            <div className="mt-4 space-y-2 border-t border-[#E7E1D8] pt-4">
              <div className="flex items-center gap-2 text-[10px] text-[#6B6560]">
                <ShieldCheck size={12} className="text-[#fd6f93]" />
                256-bit SSL encrypted payment
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#6B6560]">
                <Truck size={12} className="text-[#fd6f93]" />
                Delivery within 3-5 business days
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
