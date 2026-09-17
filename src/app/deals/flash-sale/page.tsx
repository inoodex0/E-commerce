"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store";

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
  const { addToCart } = useCartStore();

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
      <div className="relative overflow-hidden rounded-none bg-gradient-to-br from-[#e8446d] via-[#E8852A] to-[#c72d55]">

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
              <div className="flex items-center gap-2 px-5 py-6 sm:gap-4 sm:px-10 sm:py-8 lg:px-14">
                <div className="text-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-black/20 shadow-inner" />
                    <div className="relative font-sans text-2xl font-bold leading-none text-white px-3 py-2 tabular-nums sm:text-4xl sm:px-4 sm:py-3 lg:text-5xl">{fmt(hours)}</div>
                  </div>
                  <span className="mt-1.5 block text-[6px] font-bold uppercase tracking-[0.2em] text-white/50 sm:text-[7px] lg:text-[8px]">Hours</span>
                </div>
                <span className="pb-4 text-xl font-bold text-yellow-300/60 sm:text-2xl">:</span>
                <div className="text-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-black/20 shadow-inner" />
                    <div className="relative font-sans text-2xl font-bold leading-none text-white px-3 py-2 tabular-nums sm:text-4xl sm:px-4 sm:py-3 lg:text-5xl">{fmt(minutes)}</div>
                  </div>
                  <span className="mt-1.5 block text-[6px] font-bold uppercase tracking-[0.2em] text-white/50 sm:text-[7px] lg:text-[8px]">Minutes</span>
                </div>
                <span className="pb-4 text-xl font-bold text-yellow-300/60 sm:text-2xl">:</span>
                <div className="text-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-black/20 shadow-inner" />
                    <div className="relative font-sans text-2xl font-bold leading-none text-white px-3 py-2 tabular-nums sm:text-4xl sm:px-4 sm:py-3 lg:text-5xl">{fmt(seconds)}</div>
                  </div>
                  <span className="mt-1.5 block text-[6px] font-bold uppercase tracking-[0.2em] text-white/50 sm:text-[7px] lg:text-[8px]">Seconds</span>
                </div>
              </div>
            </div>
          )}

          {/* Right — Content */}
          <div className="flex flex-col justify-center px-5 py-8 sm:px-10 sm:py-10 lg:px-16">
            <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-yellow-300/80 sm:text-[9px]">✦ Special Offer</span>
            <h1 className="mt-2 font-serif text-[clamp(1.8rem,5vw,4.5rem)] font-bold leading-[0.85] text-white uppercase sm:mt-3">Flash<br />Sale</h1>
            <p className="mt-3 font-serif text-lg font-medium text-white sm:text-xl lg:text-2xl">Up to <span className="text-yellow-300 font-bold">20% Off</span></p>
            <div className="mt-4 flex flex-wrap items-center gap-3 sm:mt-6 sm:gap-4">
              <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#c72d55] shadow-lg shadow-yellow-400/20 transition-all duration-300 hover:bg-yellow-300 hover:shadow-xl sm:px-7 sm:py-3 sm:text-[10px]">
                Shop Now <ArrowRight size={12} />
              </Link>
              <span className="hidden items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 sm:flex sm:text-[10px]">⚡ Limited Time Only ⚡</span>
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════
          PRODUCTS GRID
      ═══════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

        <div className="flex items-center justify-between border-b border-[#E7E1D8] pb-4 sm:pb-6">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#E8852A] sm:text-[10px]">Don&apos;t Miss Out</p>
            <h2 className="mt-1 font-serif text-xl font-medium text-[#171412] sm:text-2xl lg:text-3xl">Today&apos;s Deals</h2>
          </div>
          <Link href="/shop" className="hidden items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#171412] transition-colors hover:text-[#E8852A] sm:inline-flex">
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-7">
          {dealProducts.map((product) => (
            <article key={product.id} className="group flex flex-col overflow-hidden rounded-xl border border-[#E7E1D8] bg-white transition-all duration-300 hover:shadow-md">
              {/* Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#FAFAFA]">
                <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded bg-[#171412] px-2 py-0.5 text-[8px] font-bold text-white sm:text-[9px]">-{product.discount}%</span>
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                <Link href={`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}`} className="text-xs font-medium leading-tight text-[#171412] transition-colors hover:text-[#E8852A] sm:text-sm">{product.name}</Link>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-[#E8852A] sm:text-base">৳{product.price.toLocaleString()}</span>
                  <span className="text-[10px] text-[#6B6560] line-through">৳{product.oldPrice.toLocaleString()}</span>
                </div>
                <button type="button" onClick={() => addToCart({ id: product.id, name: product.name, category: product.category, price: `৳${product.price}`, image: product.image } as any, 1, "", "")} className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg border border-[#171412]/20 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#171412] transition-all duration-300 hover:border-[#171412] hover:bg-[#171412] hover:text-white sm:text-xs">
                  <ShoppingBag size={13} /> Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/shop" className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#171412] transition-colors hover:text-[#E8852A]">
            View All Deals <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
