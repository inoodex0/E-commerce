"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const slides = [
  {
    src: "/images/a1.jpg",
    alt: "Premium accessories",
    eyebrow: "New Season",
    title: "ELEGANCE",
    description: "Discover handcrafted pieces that speak sophistication and timeless style.",
    cta: "Explore Now",
    position: "object-[center_40%] sm:object-center",
  },
  {
    src: "/images/a2.avif",
    alt: "Luxury collection",
    eyebrow: "Best Sellers",
    title: "CURATED",
    description: "Every accessory tells a story. Find yours in our latest collection.",
    cta: "Shop Collection",
    position: "object-center",
  },
  {
    src: "/images/a3avif.avif",
    alt: "Curated pieces",
    eyebrow: "Limited Edition",
    title: "TIMELESS",
    description: "Precision meets design in our exclusive artisan-made accessories.",
    cta: "View Pieces",
    position: "object-center",
  },
  {
    src: "/images/a4.avif",
    alt: "Modern essentials",
    eyebrow: "Everyday Luxe",
    title: "ESSENTIALS",
    description: "From daily essentials to statement pieces — style that fits your life.",
    cta: "Shop Now",
    position: "object-center",
  },
  {
    src: "/images/a5.avif",
    alt: "Signature items",
    eyebrow: "Signature Range",
    title: "REFINED",
    description: "Make a statement with accessories designed for the modern trendsetter.",
    cta: "Discover",
    position: "object-center",
  },
  {
    src: "/images/a6.avif",
    alt: "Exclusive range",
    eyebrow: "Exclusive Drop",
    title: "EXCLUSIVE",
    description: "Stand out from the crowd with our exclusive limited-edition collection.",
    cta: "Get Yours",
    position: "object-center",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const indexRef = useRef(0);
  const [animKey, setAnimKey] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const touchStartRef = useRef<number | null>(null);

  useEffect(() => {
    const popupTimer = setTimeout(() => setShowPopup(true), 0);
    return () => clearTimeout(popupTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % slides.length;
      setCurrent(indexRef.current);
      setAnimKey((k) => k + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index: number) => {
    indexRef.current = index;
    setCurrent(index);
    setAnimKey((k) => k + 1);
  };

  const nextSlide = () => goTo((current + 1) % slides.length);
  const prevSlide = () => goTo((current - 1 + slides.length) % slides.length);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartRef.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const diff = touchStartRef.current - e.changedTouches[0].clientX;
    if (diff > 50) nextSlide();
    else if (diff < -50) prevSlide();
    touchStartRef.current = null;
  };

  const slide = slides[current];

  return (
    <section className="w-full bg-[#FBF8F3] px-3 pt-3 pb-6 sm:px-5 sm:pt-5 sm:pb-10 lg:px-8 lg:pt-6 lg:pb-12">
      <div className="mx-auto max-w-[1600px] flex flex-col gap-3 sm:gap-4 lg:grid lg:grid-cols-[1fr_340px] lg:gap-4 xl:grid-cols-[1fr_380px]">

        {/* ═══════════════════════════════════════
            LEFT — MAIN CAROUSEL
        ═══════════════════════════════════════ */}
        <div
          className="relative overflow-hidden rounded-xl bg-[#F5F2EC] sm:rounded-2xl lg:rounded-2xl"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative aspect-[16/9] w-full sm:aspect-[2/1] lg:aspect-[16/7]">
            {slides.map((s, i) => (
              <div
                key={s.src}
                className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out ${
                  i === current ? "opacity-100 z-[1]" : "opacity-0 z-0"
                }`}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className={`object-cover ${s.position}`}
                />
              </div>
            ))}

            {/* Overlay */}
            <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

            {/* Content */}
            <div key={animKey} className="absolute inset-0 z-[3] flex flex-col justify-center px-6 sm:px-10 lg:px-14">
              <div className="hero-slide-up" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-center gap-2">
                  <span className="h-px w-5 bg-white/60 sm:w-8" />
                  <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-[10px]">{slide.eyebrow}</span>
                </div>
              </div>

              <h2 key={`title-${animKey}`} className="mt-2 font-serif text-[clamp(1.8rem,5vw,4rem)] font-bold leading-[0.9] tracking-[0.08em] text-white sm:mt-3 sm:text-[clamp(2rem,4.5vw,4.5rem)] lg:text-[clamp(2.5rem,4vw,5rem)]">
                {slide.title.split("").map((char, i) => (
                  <span key={i} className="hero-letter inline-block" style={{ animationDelay: `${0.15 + i * 0.04}s` }}>
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h2>

              <p className="mt-2 max-w-[280px] text-[11px] leading-relaxed text-white/70 sm:mt-3 sm:max-w-sm sm:text-xs lg:text-sm">
                {slide.description}
              </p>

              <div className="mt-3 sm:mt-5">
                <Link
                  href="/shop"
                  className="hero-slide-up inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#171412] transition-all duration-300 hover:bg-[#E8852A] hover:text-white sm:px-7 sm:py-3 sm:text-[11px]"
                  style={{ animationDelay: "0.5s" }}
                >
                  {slide.cta}
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Arrows */}
            <button onClick={prevSlide} className="absolute left-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40 sm:left-4 sm:h-9 sm:w-9 lg:left-5">
              <ChevronLeft size={18} />
            </button>
            <button onClick={nextSlide} className="absolute right-3 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40 sm:right-4 sm:h-9 sm:w-9 lg:right-5">
              <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 sm:bottom-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                    i === current ? "w-6 bg-white sm:w-8" : "w-1.5 bg-white/40 sm:w-2"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            RIGHT — SIDEBAR
        ═══════════════════════════════════════ */}
        <div className="hidden flex-col gap-3 sm:gap-4 lg:flex">
          {/* Flash Sale Card */}
          <Link href="/deals/flash-sale" className="group relative flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B1929] via-[#112240] to-[#0B1929] p-5 transition-all duration-300 hover:shadow-xl xl:p-6">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#E8852A]/10" />
            <div className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-yellow-400/5" />
            <div className="relative">
              <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#E8852A]">Limited Time</span>
              <h3 className="mt-2 font-serif text-2xl font-bold uppercase leading-[0.9] text-white xl:text-3xl">
                Flash<br />Sale
              </h3>
              <p className="mt-2 text-xs text-white/60">
                Up to <span className="font-bold text-yellow-300">20% Off</span> on selected items
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-white transition-all duration-300 group-hover:bg-[#E8852A] group-hover:border-[#E8852A]">
                Shop Now <ArrowRight size={11} />
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-4 -right-4 h-36 w-36 opacity-20 sm:h-40 sm:w-40">
              <Image src="/images/collections/hero-right.png" alt="" fill className="object-contain" sizes="160px" />
            </div>
          </Link>

          {/* New Arrivals Card */}
          <Link href="/new-arrivals" className="group relative flex-1 overflow-hidden rounded-2xl bg-[#F5F2EC] p-5 transition-all duration-300 hover:shadow-xl xl:p-6">
            <div className="relative">
              <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#E8852A]">New Arrivals</span>
              <h3 className="mt-2 font-serif text-xl font-bold uppercase leading-[0.9] text-[#171412] lg:text-2xl xl:text-[1.7rem]">
                Fresh<br />Drops
              </h3>
              <p className="mt-2 max-w-[200px] text-[11px] leading-relaxed text-[#6B6560]">
                Check out the latest additions to our curated collection.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#171412] bg-[#171412] px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-white transition-all duration-300 group-hover:bg-[#E8852A] group-hover:border-[#E8852A]">
                Explore <ArrowRight size={11} />
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-2 -right-2 h-28 w-28 opacity-15 sm:h-32 sm:w-32">
              <Image src="/images/products/watch-1.avif" alt="" fill className="object-cover rounded-xl" sizes="128px" />
            </div>
          </Link>
        </div>

      </div>

      <style>{`
        .hero-slide-up {
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .hero-letter {
          opacity: 0;
          transform: translateY(30px);
          animation: letterReveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes slideUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes letterReveal { to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) {
          .hero-slide-up, .hero-letter { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      {/* ═══════════════════════════════════════
          FLASH SALE POPUP
      ═══════════════════════════════════════ */}
      {showPopup && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="popup-enter relative w-full max-w-[360px] overflow-hidden rounded-2xl shadow-2xl sm:max-w-[400px]">
            {/* Full cover background image */}
            <Image src="/images/collections/hero-right.png" alt="Flash Sale" fill className="object-cover object-center" sizes="400px" />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />

            <button type="button" onClick={() => setShowPopup(false)} className="absolute right-2.5 top-2.5 z-30 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30">
              <X size={14} />
            </button>

            <div className="relative z-10 flex flex-col items-center px-6 pt-8 pb-8 text-center sm:px-8 sm:pt-10 sm:pb-9">
              <div className="pointer-events-none absolute left-4 top-5 text-yellow-300/50">
                <svg width="20" height="30" viewBox="0 0 24 36" fill="currentColor"><path d="M13 0L0 18h9l-2 18L24 16h-9l2-16z" /></svg>
              </div>
              <div className="pointer-events-none absolute right-5 top-7 text-yellow-300/30">
                <svg width="16" height="24" viewBox="0 0 24 36" fill="currentColor"><path d="M13 0L0 18h9l-2 18L24 16h-9l2-16z" /></svg>
              </div>

              <h2 className="font-serif text-3xl font-bold uppercase leading-[0.85] text-white drop-shadow-lg sm:text-4xl">Flash<br />Sale</h2>
              <div className="mt-3 flex items-baseline gap-1.5 sm:mt-4">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/90 sm:text-[10px]">Up to</span>
                <span className="font-serif text-4xl font-bold text-yellow-300 drop-shadow-lg sm:text-5xl">20%</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/90 sm:text-[10px]">Off</span>
              </div>

              <div className="relative -mt-3 flex items-center justify-center sm:-mt-3.5">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-red-600 shadow-lg shadow-red-600/30 sm:h-14 sm:w-14">
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 64 64">
                    {Array.from({ length: 10 }).map((_, i) => {
                      const angle = (i * 36 * Math.PI) / 180;
                      return <line key={i} x1={32 + 28 * Math.sin(angle)} y1={32 - 28 * Math.cos(angle)} x2={32 + 32 * Math.sin(angle)} y2={32 - 32 * Math.cos(angle)} stroke="white" strokeWidth="1.5" />;
                    })}
                  </svg>
                  <div className="text-center leading-none">
                    <span className="block text-sm font-bold text-white sm:text-base">24</span>
                    <span className="block text-[5px] font-bold uppercase tracking-wider text-white/70 sm:text-[6px]">Hour Only</span>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-[10px] text-white/80 sm:mt-4">
                Use code{" "}
                <span className="rounded border border-white/30 bg-white/10 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-white backdrop-blur-sm sm:text-[11px]">ZURII20</span>
              </div>
              <Link href="/shop" onClick={() => setShowPopup(false)} className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-8 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] text-[#c72d55] shadow-lg shadow-black/10 transition-all duration-300 hover:bg-yellow-300 hover:text-[#171412] hover:shadow-xl sm:mt-5 sm:px-10 sm:py-3 sm:text-[11px]">
                Shop Now
              </Link>
            </div>
          </div>
          <style>{`
            .popup-enter { opacity: 0; transform: scale(0.85) translateY(30px); animation: popupIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards; }
            @keyframes popupIn { to { opacity: 1; transform: scale(1) translateY(0); } }
          `}</style>
        </div>
      )}
    </section>
  );
}
