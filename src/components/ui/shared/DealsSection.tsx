"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface DealProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
}

const dealProducts: DealProduct[] = [
  {
    id: 1,
    name: "Classic Leather Watch",
    category: "Watches",
    price: 3150,
    oldPrice: 3850,
    discount: 18,
    image: "/images/products/watch-1.avif",
  },
  {
    id: 2,
    name: "Signature Leather Bag",
    category: "Bags",
    price: 3990,
    oldPrice: 4850,
    discount: 18,
    image: "/images/products/bag-1.avif",
  },
  {
    id: 3,
    name: "Classic Frame Sunglasses",
    category: "Sunglasses",
    price: 1790,
    oldPrice: 2200,
    discount: 19,
    image: "/images/products/sunglasses-1.avif",
  },
  {
    id: 4,
    name: "Gold Minimalist Bracelet",
    category: "Jewelry",
    price: 1520,
    oldPrice: 1850,
    discount: 18,
    image: "/images/products/bracelet-1.avif",
  },
  {
    id: 5,
    name: "Artisan Leather Wallet",
    category: "Wallets",
    price: 1020,
    oldPrice: 1250,
    discount: 18,
    image: "/images/a5.avif",
  },
  {
    id: 6,
    name: "Signature Velvet Pouch",
    category: "Tech Accessories",
    price: 805,
    oldPrice: 990,
    discount: 19,
    image: "/images/a6.avif",
  },
];

const SALE_DURATION = 24 * 60 * 60;

export default function DealsSection() {
  const [timeLeft, setTimeLeft] = useState(SALE_DURATION);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    setMounted(true);

    let endTime: number;

    try {
      const savedEndTime = localStorage.getItem("accessories-sale-end");
      if (savedEndTime) {
        endTime = Number(savedEndTime);
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

    const updateTimer = () => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-scroll cards on mobile
  useEffect(() => {
    if (!mounted) return;
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = 143;
    let timer: ReturnType<typeof setInterval>;

    const checkMobile = () => window.innerWidth < 640;

    const start = () => {
      stop();
      if (!checkMobile()) return;
      timer = setInterval(() => {
        if (isHovered.current || !container.isConnected) return;
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScroll - 5) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }, 2500);
    };

    const stop = () => {
      if (timer) clearInterval(timer);
    };

    start();
    const resize = () => { checkMobile() ? start() : stop(); };
    window.addEventListener("resize", resize);
    return () => { stop(); window.removeEventListener("resize", resize); };
  }, [mounted]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formatNumber = (value: number) => String(value).padStart(2, "0");

  if (!mounted) {
    return (
      <section className="w-full bg-[#FAF9F7] py-14 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col gap-8 border-b border-neutral-200 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-neutral-900" />
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-500 sm:text-[10px]">Limited Time</p>
              </div>
              <h2 className="mt-5 font-sans text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.84] tracking-[-0.04em] text-neutral-950">
                Flash <span className="italic text-neutral-500">Sale</span>
              </h2>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#FAF9F7] py-10 sm:py-20 lg:py-32">

      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-12 xl:px-16">

        {/* =====================================================
            DARK NAVY FLASH SALE CONTAINER
        ====================================================== */}

        <div className="overflow-hidden rounded-xl bg-[#0B1929]">

          {/* Header Bar */}
          <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8 sm:py-6">

            {/* Left — Title */}
            <h3 className="font-serif text-lg font-bold uppercase text-white sm:text-2xl lg:text-3xl">
              Flash<span className="text-yellow-400">⚡</span>Sale
            </h3>

            {/* Center — Timer */}
            {mounted && (
              <div className="flex items-center justify-center gap-1.5 sm:gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-white/10 font-sans text-sm font-bold text-white tabular-nums sm:h-10 sm:w-10 sm:text-base lg:h-12 lg:w-12 lg:text-xl">{formatNumber(hours)}</div>
                <span className="text-sm font-bold text-white/40 sm:text-lg">:</span>
                <div className="flex h-8 w-8 items-center justify-center rounded bg-white/10 font-sans text-sm font-bold text-white tabular-nums sm:h-10 sm:w-10 sm:text-base lg:h-12 lg:w-12 lg:text-xl">{formatNumber(minutes)}</div>
                <span className="text-sm font-bold text-white/40 sm:text-lg">:</span>
                <div className="flex h-8 w-8 items-center justify-center rounded bg-white/10 font-sans text-sm font-bold text-white tabular-nums sm:h-10 sm:w-10 sm:text-base lg:h-12 lg:w-12 lg:text-xl">{formatNumber(seconds)}</div>
              </div>
            )}

            {/* Right — Shop More */}
            <Link href="/deals/flash-sale" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[9px] font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white hover:text-[#0B1929] sm:px-5 sm:py-2.5 sm:text-[10px]">
              Shop More
              <ArrowRight size={11} />
            </Link>
          </div>

          {/* Product Cards — Horizontal Scroll */}
          <div
            ref={scrollRef}
            className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-4 sm:gap-4 sm:px-8 sm:pb-6"
            onMouseEnter={() => { isHovered.current = true; }}
            onMouseLeave={() => { isHovered.current = false; }}
            onTouchStart={() => { isHovered.current = true; }}
            onTouchEnd={() => { setTimeout(() => { isHovered.current = false; }, 3000); }}
          >
            {dealProducts.map((product, index) => (
              <article
                key={product.id}
                className="group w-[135px] shrink-0 sm:w-[220px] lg:w-[260px]"
              >
                {/* Image */}
                <div className="relative aspect-square w-full overflow-hidden rounded-t-lg bg-white/5">
                  <Link href={`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}`} className="absolute inset-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="260px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>

                  {/* Discount badge */}
                  <div className="absolute left-1.5 top-1.5 z-10 sm:left-2 sm:top-2">
                    <span className="flex items-center gap-0.5 rounded-sm bg-emerald-500 px-1.5 py-0.5 text-[7px] font-bold text-white sm:px-2 sm:py-1 sm:text-[8px] lg:text-[9px]">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                      {product.discount}%
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="rounded-b-lg bg-white p-2.5 sm:p-3 lg:p-3.5">
                  <h3 className="text-[10px] font-medium leading-tight text-[#171412] line-clamp-2 sm:text-[11px] lg:text-xs">{product.name}</h3>

                  {/* Sold / Stock */}
                  <div className="mt-1.5 sm:mt-2">
                    {index % 2 === 0 ? (
                      <div>
                        <span className="text-[8px] text-[#6B6560] sm:text-[9px]">{42 + index * 6} items sold</span>
                        <div className="mt-0.5 h-1 w-full overflow-hidden rounded-full bg-[#E7E1D8] sm:mt-1">
                          <div
                            className="h-full rounded-full bg-[#171412]"
                            style={{ width: index === 0 ? "78%" : index === 2 ? "64%" : "86%" }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-[8px] font-semibold text-[#fd6f93] sm:text-[9px]">Limited Stock!</span>
                    )}
                  </div>

                  {/* Price + Discount */}
                  <div className="mt-1.5 flex items-end justify-between sm:mt-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[11px] font-bold text-[#171412] sm:text-xs lg:text-sm">৳{product.price.toLocaleString()}</span>
                      <span className="text-[7px] text-[#6B6560] line-through sm:text-[8px]">৳{product.oldPrice.toLocaleString()}</span>
                    </div>
                    <span className="hidden items-center gap-0.5 rounded-sm bg-emerald-50 px-1 py-0.5 text-[6px] font-bold text-emerald-600 sm:flex sm:px-1.5 sm:text-[7px] lg:text-[8px]">
                      <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                      {product.discount}%
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
}