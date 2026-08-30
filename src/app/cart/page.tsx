"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();

  const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.product.price.replace(/[^0-9.]/g, ""));
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

       

        <div className="mt-6 border-b border-[#E7E1D8] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Shopping Bag</p>
          <div className="mt-1 flex items-center justify-between">
            <h1 className="font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl">
              Your Cart
            </h1>
            {cart.length > 0 && (
              <p className="text-sm text-[#6B6560]">{cart.length} {cart.length === 1 ? "item" : "items"}</p>
            )}
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="mt-8 border border-[#E7E1D8] bg-white p-12 text-center shadow-sm">
            <ShoppingBag className="mx-auto text-[#fd6f93]" size={48} strokeWidth={1.5} />
            <h3 className="mt-4 font-serif text-xl font-medium text-[#171412]">Your Cart is Currently Empty</h3>
            <p className="mt-2 text-sm text-[#6B6560]">Explore our signature collection to add luxury accessories.</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 border border-[#171412] bg-[#171412] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#fd6f93] hover:border-[#fd6f93]"
            >
              Shop Collection
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_350px]">

            {/* Cart Items */}
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={`${item.product.name}-${item.size}-${item.color}-${index}`}
                  className="flex gap-4 border border-[#E7E1D8] bg-white p-4 transition-shadow hover:shadow-md sm:gap-6 sm:p-5"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-[#F5F2EC] sm:h-28 sm:w-28">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#fd6f93]">
                        {item.product.category}
                      </p>
                      <h3 className="mt-0.5 font-serif text-sm font-medium text-[#171412] sm:text-base">
                        {item.product.name}
                      </h3>
                      {(item.size || item.color) && (
                        <p className="mt-0.5 text-[11px] text-[#6B6560]">
                          {item.size && `Size: ${item.size}`}{item.size && item.color && " / "}{item.color && `Color: ${item.color}`}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#E7E1D8]">
                        <button
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2.5 py-1.5 text-[#6B6560] transition-colors hover:text-[#171412] disabled:opacity-30"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-medium text-[#171412]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                          className="px-2.5 py-1.5 text-[#6B6560] transition-colors hover:text-[#171412]"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-[#171412]">
                          ৳{(parseFloat(item.product.price.replace(/[^0-9.]/g, "")) * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-[#6B6560] transition-colors hover:text-[#fd6f93]"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="h-fit border border-[#E7E1D8] bg-white p-6 shadow-sm">
              <h3 className="font-serif text-lg font-medium text-[#171412]">Order Summary</h3>

              <div className="mt-4 space-y-3 border-b border-[#E7E1D8] pb-4">
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

              <div className="flex justify-between py-4">
                <span className="text-sm font-semibold text-[#171412]">Total</span>
                <span className="text-lg font-semibold text-[#171412]">৳{total.toLocaleString()}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full border border-[#171412] bg-[#171412] py-3.5 text-center text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#fd6f93] hover:border-[#fd6f93]"
              >
                Proceed to Checkout
              </Link>

              <button
                onClick={clearCart}
                className="mt-3 w-full border border-[#E7E1D8] py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560] transition-colors hover:border-[#fd6f93] hover:text-[#fd6f93]"
              >
                Clear Cart
              </button>

              <div className="mt-4 border-t border-[#E7E1D8] pt-4">
                <div className="flex items-center gap-2 text-[10px] text-[#6B6560]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#fd6f93]" />
                  14-day hassle-free returns
                </div>
                <div className="mt-1.5 flex items-center gap-2 text-[10px] text-[#6B6560]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#fd6f93]" />
                  Secure checkout with SSL encryption
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
