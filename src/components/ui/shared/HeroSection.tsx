"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const touchStartRef = useRef<number | null>(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      cursorRef.current.x = lerp(cursorRef.current.x, targetRef.current.x, 0.15);
      cursorRef.current.y = lerp(cursorRef.current.y, targetRef.current.y, 0.15);
      setMousePos({ x: cursorRef.current.x, y: cursorRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % slides.length;
      setCurrent(indexRef.current);
      setAnimKey((k) => k + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const popupTimer = setTimeout(() => setShowPopup(true), 0);
    return () => clearTimeout(popupTimer);
  }, []);

  const goTo = (index: number) => {
    indexRef.current = index;
    setCurrent(index);
    setAnimKey((k) => k + 1);
  };

  const nextSlide = () => {
    const nextIndex = (current + 1) % slides.length;
    goTo(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (current - 1 + slides.length) % slides.length;
    goTo(prevIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartRef.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    targetRef.current = { x: e.clientX, y: e.clientY };
  };

  const slide = slides[current];

  return (
    <section
      className="hero-section relative h-[78vh] min-h-[460px] max-h-[700px] w-full overflow-hidden sm:h-[100svh] sm:min-h-none sm:max-h-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* =====================================================
          SLIDES
      ====================================================== */}
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
            i === current ? "opacity-100 z-[1]" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${s.position}`}
          />
        </div>
      ))}

      {/* =====================================================
          OVERLAY
      ====================================================== */}
      <div className="absolute inset-0 z-[2] bg-black/40 sm:bg-black/45" />

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div
        key={animKey}
        className="relative z-[3] flex h-full flex-col items-center justify-center px-4 pt-4 pb-12 text-center text-white sm:px-6 md:px-8"
      >
        {/* Eyebrow */}
        <div className="hero-slide-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="h-px w-5 bg-white/60 sm:w-8 md:w-10" />
            <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-[9px] sm:tracking-[0.2em] md:text-[10px]">
              {slide.eyebrow}
            </p>
            <span className="h-px w-5 bg-white/60 sm:w-8 md:w-10" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="hero-title mt-3 font-serif text-[clamp(1.6rem,7.5vw,5.5rem)] font-medium leading-[0.95] tracking-[0.14em] sm:mt-6 sm:tracking-[0.25em] md:mt-8">
          {slide.title.split("").map((char, i) => (
            <span
              key={`${animKey}-${i}`}
              className="hero-letter inline-block"
              style={{ animationDelay: `${0.2 + i * 0.05}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* CTA Button */}
        <Link
          href="/shop"
          className="hero-slide-up mt-5 inline-flex h-10 items-center gap-2 border border-white/40 bg-white/10 px-5 text-[8.5px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition-all duration-300 hover:border-[#fd6f93] hover:bg-[#fd6f93] sm:mt-10 sm:h-12 sm:px-8 sm:text-[10px] sm:tracking-[0.18em]"
          style={{ animationDelay: "0.35s" }}
        >
          {slide.cta}
          <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>

      {/* =====================================================
          MOBILE & DESKTOP PAGINATION DOTS
      ====================================================== */}
      <div className="absolute bottom-5 left-1/2 z-[10] flex -translate-x-1/2 items-center gap-2 sm:bottom-8">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => goTo(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === current
                ? "w-7 bg-[#fd6f93]"
                : "w-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* =====================================================
          MOBILE SWIPE ARROWS (LEFT / RIGHT)
      ====================================================== */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={prevSlide}
        className="absolute left-2 top-1/2 z-[10] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white/80 backdrop-blur-xs transition-colors hover:bg-black/40 sm:hidden"
      >
        <ChevronLeft size={18} />
      </button>

      <button
        type="button"
        aria-label="Next slide"
        onClick={nextSlide}
        className="absolute right-2 top-1/2 z-[10] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/20 text-white/80 backdrop-blur-xs transition-colors hover:bg-black/40 sm:hidden"
      >
        <ChevronRight size={18} />
      </button>

      {/* =====================================================
          CUSTOM CURSOR (desktop only)
      ====================================================== */}

      {/* Trailing ring - slow follow */}
      <div
        className="pointer-events-none fixed z-[9998] hidden -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: isHovering ? 72 : 0,
          height: isHovering ? 72 : 0,
          border: "1px solid rgba(253,111,147,0.2)",
          opacity: isHovering ? 1 : 0,
          transition: "width 0.4s cubic-bezier(0.23,1,0.32,1), height 0.4s cubic-bezier(0.23,1,0.32,1), opacity 0.4s ease",
        }}
      />

      {/* Outer ring */}
      <div
        className="pointer-events-none fixed z-[9999] hidden -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: isHovering ? 56 : 14,
          height: isHovering ? 56 : 14,
          border: isHovering
            ? "1.5px solid rgba(253,111,147,0.5)"
            : "1px solid rgba(255,255,255,0.3)",
          backgroundColor: isHovering
            ? "rgba(253,111,147,0.06)"
            : "rgba(255,255,255,0.12)",
          backdropFilter: isHovering ? "blur(10px)" : "none",
          boxShadow: isHovering
            ? "0 0 40px 8px rgba(253,111,147,0.12), inset 0 0 20px rgba(253,111,147,0.04)"
            : "0 0 12px 2px rgba(253,111,147,0.08)",
          transition: "width 0.4s cubic-bezier(0.23,1,0.32,1), height 0.4s cubic-bezier(0.23,1,0.32,1), border 0.3s, background-color 0.3s, box-shadow 0.3s",
        }}
      >
        {isHovering && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 animate-[fadeIn_0.35s_0.1s_ease-out_forwards]">
            <ArrowRight size={18} strokeWidth={1.5} className="text-[#fd6f93] -translate-x-[1px]" />
          </div>
        )}
      </div>

      {/* Inner dot */}
      <div
        className="pointer-events-none fixed z-[9999] hidden -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: isHovering ? 0 : 5,
          height: isHovering ? 0 : 5,
          backgroundColor: "#fd6f93",
          boxShadow: isHovering
            ? "0 0 20px 6px rgba(253,111,147,0.4)"
            : "0 0 14px 4px rgba(253,111,147,0.3)",
          transition: "width 0.3s, height 0.3s, box-shadow 0.3s",
        }}
      />

      {/* =====================================================
          ANIMATIONS
      ====================================================== */}
      <style>{`
        .hero-slide-up {
          opacity: 0;
          transform: translateY(30px);
          animation: slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .hero-letter {
          opacity: 0;
          transform: translateY(40px) rotateX(-80deg);
          animation: letterReveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes slideUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes letterReveal {
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        @keyframes fadeIn {
          to { opacity: 1; }
        }

        @media (hover: hover) and (pointer: fine) {
          .hero-section { cursor: none !important; }
          .hero-section * { cursor: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-slide-up,
          .hero-letter {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* =====================================================
          FLASH SALE POPUP
      ====================================================== */}
      {showPopup && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="popup-enter relative w-full max-w-[520px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#fd6f93] via-[#e8446d] to-[#c72d55] shadow-2xl shadow-[#fd6f93]/30">

            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="absolute right-3 top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              <X size={16} />
            </button>

            {/* Decorative lightning bolts */}
            <div className="pointer-events-none absolute left-6 top-8 text-yellow-300/60">
              <svg width="32" height="48" viewBox="0 0 24 36" fill="currentColor"><path d="M13 0L0 18h9l-2 18L24 16h-9l2-16z" /></svg>
            </div>
            <div className="pointer-events-none absolute right-8 top-10 text-yellow-300/40">
              <svg width="24" height="36" viewBox="0 0 24 36" fill="currentColor"><path d="M13 0L0 18h9l-2 18L24 16h-9l2-16z" /></svg>
            </div>

            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 rounded-full bg-white/5" />

            {/* Content */}
            <div className="relative flex flex-col items-center px-8 pt-12 pb-10 text-center">

              {/* Flash Sale title */}
              <h2 className="font-serif text-5xl font-bold uppercase leading-[0.85] text-white sm:text-6xl">
                Flash<br />Sale
              </h2>

              {/* Discount */}
              <div className="mt-5 flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Up to</span>
                <span className="font-serif text-4xl font-bold text-yellow-300 sm:text-5xl">20%</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Off</span>
              </div>

              {/* Product image */}
              <div className="relative mt-6 h-40 w-56 overflow-hidden">
                <Image
                  src="/images/pop up.jpg"
                  alt="Flash Sale"
                  fill
                  className="object-cover object-center drop-shadow-2xl"
                  sizes="224px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#c72d55]/50 to-transparent" />
              </div>

              {/* 24 hour badge */}
              <div className="relative -mt-4 flex items-center justify-center">
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-red-600 shadow-lg shadow-red-600/30">
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 64 64">
                    {Array.from({ length: 12 }).map((_, i) => {
                      const angle = (i * 30 * Math.PI) / 180;
                      const r1 = 28;
                      const r2 = 32;
                      const x1 = 32 + r1 * Math.sin(angle);
                      const y1 = 32 - r1 * Math.cos(angle);
                      const x2 = 32 + r2 * Math.sin(angle);
                      const y2 = 32 - r2 * Math.cos(angle);
                      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="2" />;
                    })}
                  </svg>
                  <div className="text-center leading-none">
                    <span className="block text-lg font-bold text-white">24</span>
                    <span className="block text-[6px] font-bold uppercase tracking-wider text-white/80">Hour Only</span>
                  </div>
                </div>
              </div>

              {/* Code */}
              <div className="mt-5 flex items-center gap-2 text-xs text-white/70">
                Use code{" "}
                <span className="rounded border border-white/30 bg-white/10 px-3 py-1.5 font-mono text-[11px] font-bold tracking-wider text-white backdrop-blur-sm">
                  ZURII20
                </span>
              </div>

              {/* Shop Now */}
              <Link
                href="/shop"
                onClick={() => setShowPopup(false)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-10 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#c72d55] shadow-lg shadow-black/10 transition-all duration-300 hover:bg-yellow-300 hover:text-[#171412] hover:shadow-xl"
              >
                Shop Now
              </Link>
            </div>
          </div>

          <style>{`
            .popup-enter {
              opacity: 0;
              transform: scale(0.85) translateY(30px);
              animation: popupIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards;
            }
            @keyframes popupIn {
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
          `}</style>
        </div>
      )}
    </section>
  );
}
