"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
  const touchStartRef = useRef<number | null>(null);

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
    setMousePos({ x: e.clientX, y: e.clientY });
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
          className="hero-slide-up mt-6 inline-flex h-11 items-center gap-2.5 border border-white/40 bg-white/10 px-6 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-all duration-300 hover:border-[#ff6289] hover:bg-[#ff6289] sm:mt-10 sm:h-12 sm:px-8 sm:text-[10px] sm:tracking-[0.18em]"
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
                ? "w-7 bg-[#ff6289]"
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
          SCROLL DOWN ARROW (Desktop only)
      ====================================================== */}
      <div
        className="hero-slide-up absolute bottom-8 right-5 hidden flex-col items-center gap-2 sm:bottom-10 sm:right-8 md:right-10 lg:flex"
        style={{ animationDelay: "0.8s" }}
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/50 [writing-mode:vertical-lr]">
          Scroll
        </span>
        <ArrowDown size={16} strokeWidth={1.5} className="animate-bounce text-white/60" />
      </div>

      {/* =====================================================
          CUSTOM ARROW CURSOR (desktop only)
      ====================================================== */}
      <div
        className={`pointer-events-none fixed z-[9999] hidden -translate-x-1/2 -translate-y-1/2 transition-[opacity,transform] duration-200 ease-out md:block ${
          isHovering ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{ left: mousePos.x, top: mousePos.y }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="md:h-[70px] md:w-[70px] lg:h-[80px] lg:w-[80px]">
          <path d="M22 15L38 30L22 45" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        </svg>
      </div>

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
    </section>
  );
}
