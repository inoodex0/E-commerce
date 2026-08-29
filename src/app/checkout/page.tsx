"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, CreditCard, Truck, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/store";

export default function CheckoutPage() {
  const { cart, clearCart } = useCartStore();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad">("cod");

  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.product.price.replace(/[^0-9.]/g, ""));
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

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

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <div className="border border-[#E7E1D8] bg-white p-12 shadow-sm">
            <CheckCircle className="mx-auto text-[#fd6f93]" size={56} strokeWidth={1.5} />
            <h1 className="mt-4 font-serif text-2xl font-medium text-[#171412]">Order Placed Successfully!</h1>
            <p className="mt-2 text-sm text-[#6B6560]">
              Thank you for your purchase. We&apos;ll send you a confirmation email shortly.
            </p>
            <p className="mt-1 text-xs text-[#6B6560]">
              Order ID: <span className="font-medium text-[#171412]">NVR-{Date.now().toString().slice(-6)}</span>
            </p>
            <Link
              href="/shop"
              className="mt-8 inline-flex items-center gap-2 border border-[#171412] bg-[#171412] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#fd6f93] hover:border-[#fd6f93]"
            >
              Continue Shopping
            </Link>
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
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#fd6f93]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1XXXXXXXXX"
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#fd6f93]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#fd6f93]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="House 12, Road 5, Block B"
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#fd6f93]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="Dhaka"
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#fd6f93]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Area / District *</label>
                  <input
                    type="text"
                    required
                    placeholder="Gulshan"
                    className="mt-1.5 w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 text-sm text-[#171412] outline-none transition-colors focus:border-[#fd6f93]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Order Notes (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Special delivery instructions..."
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
                    <p className="text-[10px] text-[#6B6560]">{item.product.category}</p>
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
              onClick={() => {
                setOrderPlaced(true);
                clearCart();
              }}
              className="w-full border border-[#171412] bg-[#171412] py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#fd6f93] hover:border-[#fd6f93]"
            >
              Place Order
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
