"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ShoppingBag, Heart } from "lucide-react";
import { useEffect, useState } from "react";

const SALE_DURATION = 24 * 60 * 60;

const dealProducts = [
  { id: 1, name: "Classic Leather Watch", category: "Watches", price: 3150, oldPrice: 3850, discount: 18, image: "/images/products/watch-1.avif" },
  { id: 2, name: "Signature Leather Bag", category: "Bags", price: 3990, oldPrice: 4850, discount: 18, image: "/images/products/bag-1.avif" },
  { id: 3, name: "Classic Frame Sunglasses", category: "Sunglasses", price: 1790, oldPrice: 2200, discount: 19, image: "/images/products/sunglasses-1.avif" },
  { id: 4, name: "Gold Minimalist Bracelet", category: "Jewelry", price: 1520, oldPrice: 1850, discount: 18, image: "/images/products/bracelet-1.avif" },
  { id: 5, name: "Artisan Leather Wallet", category: "Wallets", price: 1020, oldPrice: 1250, discount: 18, image: "/images/a5.avif" },
  { id: 6, name: "Signature Velvet Pouch", category: "Tech Accessories", price: 805, oldPrice: 990, discount: 19, image: "/images/a6.avif" },
];

export default function FlashSalePage() {
  const [timeLeft, setTimeLeft] = useState(SALE_DURATION);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let endTime: number;
    try {
      const saved = localStorage.getItem("accessories-sale-end");
      if (saved) {
        endTime = Number(saved);
        if (endTime <= Date.now()) {
          endTime = Date.now() + SALE_DURATION * 1000;
          localStorage.setItem("accessories-sale-end", String(endTime));
        }
      } else {
        endTime = Date.now() + SALE_DURATION * 1000;
        localStorage.setItem("accessories-sale-end", String(endTime));
      }
    } catch {
      endTime = Date.now() + SALE_DURATION * 1000;
    }
    const update = () => setTimeLeft(Math.max(0, Math.floor((endTime - Date.now()) / 1000)));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const fmt = (v: number) => String(v).padStart(2, "0");

  return (
    <main className="min-h-screen bg-[#FBF8F3]">

      {/* ═══════════════════════════════════════════
          FLASH SALE BANNER
      ═══════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-none bg-gradient-to-br from-[#e8446d] via-[#fd6f93] to-[#c72d55]">

        {/* Bokeh / light dots */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[10%] top-[15%] h-3 w-3 rounded-full bg-yellow-300/40 blur-[1px]" />
          <div className="absolute left-[25%] top-[60%] h-2 w-2 rounded-full bg-yellow-200/50 blur-[1px]" />
          <div className="absolute left-[40%] top-[20%] h-4 w-4 rounded-full bg-white/20 blur-[2px]" />
          <div className="absolute left-[55%] top-[70%] h-2 w-2 rounded-full bg-yellow-300/30 blur-[1px]" />
          <div className="absolute left-[70%] top-[25%] h-3 w-3 rounded-full bg-white/15 blur-[2px]" />
          <div className="absolute left-[85%] top-[55%] h-2 w-2 rounded-full bg-yellow-200/40 blur-[1px]" />
          <div className="absolute left-[15%] top-[80%] h-2 w-2 rounded-full bg-white/20 blur-[1px]" />
          <div className="absolute left-[60%] top-[40%] h-5 w-5 rounded-full bg-yellow-100/15 blur-[3px]" />
          <div className="absolute left-[80%] top-[85%] h-3 w-3 rounded-full bg-yellow-300/20 blur-[2px]" />
          <div className="absolute left-[35%] top-[45%] h-2 w-2 rounded-full bg-white/25 blur-[1px]" />
        </div>

        {/* Confetti pieces */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[8%] top-[10%] h-4 w-1 rotate-45 bg-yellow-400/50" />
          <div className="absolute left-[18%] top-[75%] h-3 w-1 -rotate-30 bg-pink-300/40" />
          <div className="absolute left-[32%] top-[8%] h-1 w-4 rotate-[60deg] bg-yellow-300/50" />
          <div className="absolute left-[48%] top-[82%] h-3 w-1 rotate-12 bg-white/30" />
          <div className="absolute left-[62%] top-[12%] h-4 w-1 -rotate-45 bg-yellow-200/40" />
          <div className="absolute left-[75%] top-[78%] h-1 w-3 rotate-[75deg] bg-pink-200/40" />
          <div className="absolute left-[88%] top-[15%] h-3 w-1 rotate-[30deg] bg-yellow-400/40" />
          <div className="absolute left-[42%] top-[5%] h-1 w-4 -rotate-20 bg-white/25" />
        </div>

        {/* Large decorative circle */}
        <div className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border-[3px] border-dashed border-white/10" />
        <div className="pointer-events-none absolute -left-12 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border-2 border-white/5" />

        <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[auto_1fr]">

          {/* Left — Timer */}
          {mounted && (
            <div className="flex items-center border-b border-white/15 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-4 px-8 py-10 sm:gap-6 sm:px-12 lg:px-14">
                <div className="text-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-black/20 shadow-inner" />
                    <div className="relative font-sans text-3xl font-bold leading-none text-white sm:text-4xl lg:text-5xl tabular-nums px-4 py-3">{fmt(hours)}</div>
                  </div>
                  <span className="mt-2 block text-[7px] font-bold uppercase tracking-[0.2em] text-white/50 sm:text-[8px]">Hours</span>
                </div>
                <span className="pb-5 text-2xl font-bold text-yellow-300/60">:</span>
                <div className="text-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-black/20 shadow-inner" />
                    <div className="relative font-sans text-3xl font-bold leading-none text-white sm:text-4xl lg:text-5xl tabular-nums px-4 py-3">{fmt(minutes)}</div>
                  </div>
                  <span className="mt-2 block text-[7px] font-bold uppercase tracking-[0.2em] text-white/50 sm:text-[8px]">Minutes</span>
                </div>
                <span className="pb-5 text-2xl font-bold text-yellow-300/60">:</span>
                <div className="text-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-black/20 shadow-inner" />
                    <div className="relative font-sans text-3xl font-bold leading-none text-white sm:text-4xl lg:text-5xl tabular-nums px-4 py-3">{fmt(seconds)}</div>
                  </div>
                  <span className="mt-2 block text-[7px] font-bold uppercase tracking-[0.2em] text-white/50 sm:text-[8px]">Seconds</span>
                </div>
              </div>
            </div>
          )}

          {/* Right — Content */}
          <div className="flex flex-col justify-center px-8 py-10 sm:px-12 sm:py-12 lg:px-16">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-yellow-300/80">✦ Special Offer</span>
            <h1 className="mt-3 font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.85] text-white uppercase">Flash<br />Sale</h1>
            <p className="mt-4 font-serif text-xl font-medium text-white sm:text-2xl">Up to <span className="text-yellow-300 font-bold">20% Off</span></p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-7 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#c72d55] shadow-lg shadow-yellow-400/20 transition-all duration-300 hover:bg-yellow-300 hover:shadow-xl">
                Shop Now <ArrowRight size={12} />
              </Link>
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">⚡ Limited Time Only ⚡</span>
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════
          PRODUCTS GRID
      ═══════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">

        <div className="flex items-center justify-between border-b border-[#E7E1D8] pb-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Don&apos;t Miss Out</p>
            <h2 className="mt-1 font-serif text-2xl font-medium text-[#171412] sm:text-3xl">Today&apos;s Deals</h2>
          </div>
          <Link href="/shop" className="hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171412] transition-colors hover:text-[#fd6f93] sm:inline-flex">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {dealProducts.map((product) => (
            <article key={product.id} className="group relative flex flex-col overflow-hidden border border-[#E7E1D8] bg-white transition-all duration-300 hover:shadow-lg hover:shadow-[#171412]/5">

              {/* Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F5F2EC]">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />

                {/* Discount badge */}
                <div className="absolute left-3 top-3 z-10">
                  <span className="bg-[#171412] px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[0.15em] text-white sm:text-[9px]">-{product.discount}%</span>
                </div>

                {/* Wishlist */}
                <button type="button" aria-label={`Add ${product.name} to wishlist`} className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#171412] shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-[#fd6f93] hover:text-white">
                  <Heart size={14} />
                </button>

                {/* Quick add */}
                <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                  <button type="button" className="flex w-full items-center justify-center gap-2 bg-[#171412] py-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#fd6f93]">
                    <ShoppingBag size={13} /> Add to Cart
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6B6560]">{product.category}</p>
                <Link href={`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}`} className="mt-1 font-serif text-sm font-medium text-[#171412] transition-colors duration-300 hover:text-[#fd6f93] sm:text-base">{product.name}</Link>
                <div className="mt-auto flex items-baseline gap-2 pt-3">
                  <span className="font-serif text-base font-semibold text-[#fd6f93] sm:text-lg">৳{product.price.toLocaleString()}</span>
                  <span className="text-xs text-[#6B6560] line-through">৳{product.oldPrice.toLocaleString()}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link href="/shop" className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171412] transition-colors hover:text-[#fd6f93]">
            View All Deals <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
