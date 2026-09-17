"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import { useCartStore } from "@/lib/store";

const products = [
  { id: 1, name: "Classic Leather Watch", price: 3850, image: "/images/products/watch-1.avif", category: "Watches" },
  { id: 2, name: "Signature Leather Bag", price: 4850, image: "/images/products/bag-1.avif", category: "Bags" },
  { id: 3, name: "Classic Frame Sunglasses", price: 2200, image: "/images/products/sunglasses-1.avif", category: "Sunglasses" },
  { id: 4, name: "Minimal Gold Bracelet", price: 1850, image: "/images/products/bracelet-1.avif", category: "Jewelry" },
  { id: 5, name: "Obsidian Aviator Shades", price: 2800, oldPrice: 3200, image: "/images/products/sunglasses-1.avif", category: "Sunglasses" },
  { id: 6, name: "Sienna Tuscan Tote", price: 5200, oldPrice: 6000, image: "/images/products/bag-1.avif", category: "Bags" },
  { id: 7, name: "Midnight Onyx Chrono", price: 4500, oldPrice: 5200, image: "/images/products/watch-1.avif", category: "Watches" },
  { id: 8, name: "Imperial Gold Bangle", price: 3100, oldPrice: 3800, image: "/images/products/bracelet-1.avif", category: "Jewelry" },
];

export default function TrendingNow() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [addedId, setAddedId] = useState<number | null>(null);
  const { addToCart } = useCartStore();
  const pausedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el || pausedRef.current) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 10;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 260, behavior: "smooth" });
      }
    }, 2500);
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoScroll]);

  const pause = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  const handleAdd = (product: typeof products[0]) => {
    addToCart(
      { id: product.id, name: product.name, category: product.category, price: `৳${product.price.toLocaleString()}`, image: product.image, colors: [], sizes: [] },
      1, "", ""
    );
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between border-b border-[#E7E1D8] pb-4 sm:mb-10">
          <h2 className="font-serif text-xl font-medium text-[#171412] sm:text-2xl lg:text-3xl">
            Trending Now
          </h2>
          <Link href="/shop" className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#E8852A] transition-colors hover:text-[#c96f1f] sm:text-xs">
            VIEW ALL ITEMS <ChevronRight size={14} />
          </Link>
        </div>

        {/* Orange underline */}
        <div className="mb-8 h-[3px] w-16 rounded-full bg-[#E8852A]" />

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={() => setTimeout(resume, 1000)}
          className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth sm:gap-5"
        >
          {products.map((product) => (
            <article
              key={product.id}
              className="group flex w-[200px] shrink-0 flex-col overflow-hidden rounded-xl border border-[#E7E1D8] bg-white transition-all duration-300 hover:shadow-md sm:w-[230px]"
            >
              {/* Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#FAFAFA]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="230px"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col gap-2 p-3 sm:p-4">
                <h3 className="text-xs font-medium leading-tight text-[#171412] sm:text-sm">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-[#E8852A] sm:text-base">৳{product.price.toLocaleString()}</span>
                  {product.oldPrice && <span className="text-[10px] text-[#6B6560] line-through">৳{product.oldPrice.toLocaleString()}</span>}
                </div>
                <button
                  onClick={() => handleAdd(product)}
                  className="mt-auto flex w-full items-center justify-center gap-2 rounded-lg border border-[#E8852A]/30 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#E8852A] transition-all duration-300 hover:border-[#E8852A] hover:bg-[#E8852A] hover:text-white sm:text-xs"
                >
                  <ShoppingBag size={13} />
                  {addedId === product.id ? "Added!" : "Add To Cart"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
