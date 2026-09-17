"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  { name: "Watches", image: "/images/a1.jpg", href: "/categories/watches" },
  { name: "Bags", image: "/images/a2.avif", href: "/categories/bags" },
  { name: "Wallets", image: "/images/a3avif.avif", href: "/categories/wallets" },
  { name: "Sunglasses", image: "/images/a4.avif", href: "/categories/sunglasses" },
  { name: "Jewelry", image: "/images/a5.avif", href: "/categories/jewelry" },
  { name: "Belts", image: "/images/a6.avif", href: "/categories/belts" },
  { name: "Perfumes", image: "/images/a1.jpg", href: "/categories/perfumes" },
  { name: "Tech Accessories", image: "/images/a2.avif", href: "/categories/tech-accessories" },
];

export default function ShopByCategory() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const pausedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el || pausedRef.current) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 10;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 180, behavior: "smooth" });
      }
    }, 2500);
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoScroll]);

  const pause = () => { pausedRef.current = true; };
  const resume = () => { pausedRef.current = false; };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="bg-[#FBF8F3] py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8">

        {/* Header */}
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="font-serif text-2xl font-medium tracking-wide text-[#171412] sm:text-3xl md:text-4xl">
            Featured Categories
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative overflow-visible">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => { scroll("left"); pause(); setTimeout(resume, 4000); }}
              className="absolute -left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E7E1D8] bg-white text-[#171412] shadow-md transition-all duration-300 hover:border-[#E8852A] hover:text-[#E8852A] sm:-left-5"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => { scroll("right"); pause(); setTimeout(resume, 4000); }}
              className="absolute -right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#E7E1D8] bg-white text-[#171412] shadow-md transition-all duration-300 hover:border-[#E8852A] hover:text-[#E8852A] sm:-right-5"
            >
              <ChevronRight size={18} />
            </button>
          )}

          {/* Scrollable Row */}
          <div
            ref={scrollRef}
            onMouseEnter={pause}
            onMouseLeave={resume}
            onTouchStart={pause}
            onTouchEnd={() => setTimeout(resume, 1000)}
            className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth px-2 py-2 sm:gap-8 sm:px-6"
          >
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group flex shrink-0 flex-col items-center gap-3"
              >
                {/* Rounded Square Image */}
                <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-2xl border border-[#E7E1D8] bg-white shadow-sm transition-all duration-500 group-hover:shadow-lg group-hover:shadow-[#E8852A]/10 sm:h-[130px] sm:w-[130px] md:h-[150px] md:w-[150px]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={150}
                    height={150}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                {/* Name */}
                <span className="text-xs font-medium text-[#171412] transition-colors duration-300 group-hover:text-[#E8852A] sm:text-sm">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
