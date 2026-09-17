"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const collections = [
  {
    title: "Watches Collection",
    subtitle: "REFINED ESSENTIALS",
    image: "/images/products/watch-1.avif",
    href: "/categories/watches",
    comingSoon: false,
  },
  {
    title: "Bags Collection",
    subtitle: "TAILORED GRACE",
    image: "/images/products/bag-1.avif",
    href: "/categories/bags",
    comingSoon: false,
  },
  {
    title: "Jewelry Collection",
    subtitle: "OCCASION READY",
    image: "/images/products/bracelet-1.avif",
    href: "/categories/jewelry",
    comingSoon: false,
  },
  {
    title: "Sunglasses Collection",
    subtitle: "COMING SOON",
    image: "/images/products/sunglasses-1.avif",
    href: "/categories/sunglasses",
    comingSoon: true,
  },
];

export default function NewArrivalsSection() {
  return (
    <section className="bg-[#FBF8F3] py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between sm:mb-14">
          <div>
            <span className="block font-[family-name:var(--font-dancing-script)] text-[1.8rem] leading-none text-[#E8852A]/60 sm:text-[2.2rem] lg:text-[2.8rem]">
              just arrived
            </span>
            <h2 className="mt-2 font-serif text-2xl font-medium tracking-wide text-[#171412] sm:text-3xl md:text-4xl">
              NEW ARRIVALS
            </h2>
            <div className="mt-3 h-[3px] w-14 rounded-full bg-[#E8852A] sm:w-20" />
          </div>
        
        </div>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {collections.map((item, i) => (
            <Link
              key={item.title}
              href={item.href}
              className={`group relative block overflow-hidden rounded-2xl bg-[#171412] ${
                i === 0 ? "aspect-[3/4]" : "aspect-[3/4]"
              }`}
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Top-left subtle line */}
              <div className="absolute left-0 top-0 h-12 w-[1px] bg-white/20" />
              <div className="absolute left-0 top-0 h-[1px] w-12 bg-white/20" />

              {/* Corner brackets */}
              <div className="absolute bottom-20 left-5 h-6 w-6 border-b border-l border-white/30 sm:h-7 sm:w-7" />
              <div className="absolute bottom-20 right-5 h-6 w-6 border-b border-r border-white/30 sm:h-7 sm:w-7" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#E8852A] sm:text-[10px]">
                  {item.subtitle}
                </p>
                <h3 className="font-serif text-xl font-medium text-white sm:text-2xl">
                  {item.title}
                </h3>
                {item.comingSoon && (
                  <p className="mt-3 inline-block rounded-full border border-white/30 px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-[9px]">
                    COMING SOON
                  </p>
                )}
                {!item.comingSoon && (
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/70 transition-colors group-hover:text-[#E8852A] sm:text-xs">
                    EXPLORE <ChevronRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href="/new-arrivals"
            className="group inline-flex items-center gap-2 rounded-full border border-[#171412] bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#171412] transition-all duration-300 hover:border-[#E8852A] hover:bg-[#E8852A] hover:text-white"
          >
            View All New Arrivals
            <ChevronRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
