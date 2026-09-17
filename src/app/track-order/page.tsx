"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle, Clock, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface OrderData {
  orderId: string;
  date: string;
  customer: { name: string; phone: string; email: string; address: string; city: string; area: string };
  items: { name: string; category: string; size: string; color: string; quantity: number; price: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  status: string;
  createdAt: string;
}

const steps = [
  { key: "confirmed", label: "Order Confirmed", icon: CheckCircle, desc: "Your order has been received and confirmed." },
  { key: "processing", label: "Processing", icon: Package, desc: "We are preparing your order for shipment." },
  { key: "shipped", label: "Shipped", icon: Truck, desc: "Your order is on its way to you." },
  { key: "delivered", label: "Delivered", icon: MapPin, desc: "Your order has been delivered." },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = () => {
    const id = orderId.trim().toUpperCase();
    if (!id) return;

    const orders: OrderData[] = JSON.parse(localStorage.getItem("zurii-orders") || "[]");
    const found = orders.find((o) => o.orderId === id);
    if (found) {
      setOrder(found);
      setNotFound(false);
    } else {
      setOrder(null);
      setNotFound(true);
    }
  };

  const getStepIndex = (status: string) => {
    const idx = steps.findIndex((s) => s.key === status);
    return idx >= 0 ? idx : 0;
  };

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8 border-b border-[#E7E1D8] pb-6">
          <Link href="/" className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#6B6560] transition-colors hover:text-[#E8852A]">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl">Track Your Order</h1>
          <p className="mt-2 text-sm text-[#6B6560]">Enter your order ID to see the current status of your order.</p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                placeholder="Enter Order ID (e.g. NVR-123456)"
                className="w-full border border-[#E7E1D8] bg-white px-5 py-4 text-sm text-[#171412] outline-none transition-colors focus:border-[#E8852A] placeholder:text-[#6B6560]/40"
              />
              <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6560]/40" />
            </div>
            <button
              onClick={handleTrack}
              className="shrink-0 border border-[#171412] bg-[#171412] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#E8852A] hover:border-[#E8852A]"
            >
              Track
            </button>
          </div>
          <p className="mt-2 text-[11px] text-[#6B6560]">You can find your Order ID in the invoice email or on the checkout confirmation page.</p>
        </div>

        {/* Not Found */}
        {notFound && (
          <div className="border border-[#E7E1D8] bg-white p-8 text-center shadow-sm">
            <Package size={40} className="mx-auto text-[#6B6560]/30" strokeWidth={1.2} />
            <h3 className="mt-4 font-serif text-lg font-medium text-[#171412]">Order Not Found</h3>
            <p className="mt-2 text-sm text-[#6B6560]">
              No order found with ID <span className="font-semibold text-[#171412]">#{orderId}</span>. Please check and try again.
            </p>
          </div>
        )}

        {/* Order Found */}
        {order && (
          <div className="space-y-6">

            {/* Order Info */}
            <div className="border border-[#E7E1D8] bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Order ID</p>
                  <p className="mt-1 font-serif text-xl font-medium text-[#171412]">#{order.orderId}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Order Date</p>
                  <p className="mt-1 text-sm text-[#171412]">{order.date}</p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-3 border-t border-[#E7E1D8] pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Deliver To</p>
                  <p className="mt-1 text-sm text-[#171412]">{order.customer.name}</p>
                  <p className="text-[11px] text-[#6B6560]">{order.customer.address}, {order.customer.area}, {order.customer.city}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Total Amount</p>
                  <p className="mt-1 text-lg font-semibold text-[#E8852A]">৳{order.total.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Tracking Steps */}
            <div className="border border-[#E7E1D8] bg-white p-6 shadow-sm">
              <h3 className="mb-6 font-serif text-lg font-medium text-[#171412]">Order Status</h3>
              <div className="relative">
                {steps.map((step, i) => {
                  const active = i <= getStepIndex(order.status);
                  const current = i === getStepIndex(order.status);
                  const StepIcon = step.icon;
                  return (
                    <div key={step.key} className="flex gap-4 pb-8 last:pb-0">
                      {/* Line + Circle */}
                      <div className="flex flex-col items-center">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                          current ? "border-[#E8852A] bg-[#E8852A] text-white" :
                          active ? "border-[#E8852A] bg-[#E8852A]/10 text-[#E8852A]" :
                          "border-[#E7E1D8] bg-[#F9F7F4] text-[#6B6560]/40"
                        }`}>
                          <StepIcon size={18} />
                        </div>
                        {i < steps.length - 1 && (
                          <div className={`mt-1 h-full w-[2px] flex-1 ${active ? "bg-[#E8852A]" : "bg-[#E7E1D8]"}`} />
                        )}
                      </div>
                      {/* Text */}
                      <div className="pt-1.5">
                        <p className={`text-sm font-medium ${current ? "text-[#E8852A]" : active ? "text-[#171412]" : "text-[#6B6560]/50"}`}>
                          {step.label}
                        </p>
                        <p className={`mt-0.5 text-[11px] ${active ? "text-[#6B6560]" : "text-[#6B6560]/40"}`}>
                          {step.desc}
                        </p>
                        {current && (
                          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#E8852A]/10 px-3 py-1 text-[10px] font-semibold text-[#E8852A]">
                            <Clock size={10} /> Current Status
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items */}
            <div className="border border-[#E7E1D8] bg-white p-6 shadow-sm">
              <h3 className="mb-4 font-serif text-lg font-medium text-[#171412]">Order Items</h3>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-[#E7E1D8] py-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-sm font-medium text-[#171412]">{item.name}</p>
                      <p className="text-[11px] text-[#6B6560]">{item.category}{item.size ? ` / ${item.size}` : ""}{item.color ? ` / ${item.color}` : ""} × {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-[#171412]">৳{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Help */}
            <div className="rounded-xl border border-[#E8852A]/20 bg-[#E8852A]/5 p-5 text-center">
              <p className="text-sm text-[#171412]">Need help with your order?</p>
              <a href="https://wa.me/8801XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-semibold text-[#E8852A] underline underline-offset-2 hover:text-[#c96f1f]">
                Contact us on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
