"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Heart } from "lucide-react";

const categories = [
  {
    name: "Watches",
    image: "/images/a1.jpg",
    href: "/categories/watches",
  },
  {
    name: "Bags",
    image: "/images/a2.avif",
    href: "/categories/bags",
  },
  {
    name: "Wallets",
    image: "/images/a3avif.avif",
    href: "/categories/wallets",
  },
  {
    name: "Sunglasses",
    image: "/images/a4.avif",
    href: "/categories/sunglasses",
  },
  {
    name: "Jewelry",
    image: "/images/a5.avif",
    href: "/categories/jewelry",
  },
  {
    name: "Belts",
    image: "/images/a6.avif",
    href: "/categories/belts",
  },
  {
    name: "Perfumes",
    image: "/images/a1.jpg",
    href: "/categories/perfumes",
  },
  {
    name: "Tech Accessories",
    image: "/images/a2.avif",
    href: "/categories/tech-accessories",
  },
];

export default function ShopByCategory() {
  return (
    <section className="bg-[#FBF8F3] mt-0 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="relative mb-8 text-center sm:mb-12 md:mb-14">
          <span className="block font-[family-name:var(--font-dancing-script)] text-[2rem] leading-none text-[#fd6f93]/50 sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]">
            crafted for you
          </span>
          <h2 className="mt-3 font-serif text-2xl font-medium tracking-[0.08em] text-[#171412] sm:text-3xl md:text-4xl lg:text-[42px]">
            SHOP BY CATEGORY
          </h2>
          <p className="mx-auto mt-3 max-w-[340px] text-xs leading-5 text-[#6B6560] sm:max-w-[400px] sm:text-sm sm:leading-7">
            Explore our carefully curated collections designed to complement your unique style.
          </p>
        </div>

        {/* =====================================================
            GRID
        ====================================================== */}

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 lg:gap-7">

          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F3EE]">

                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 transition-all duration-300 group-hover:bg-black/10 sm:gap-3">

                  <span className="flex h-8 w-8 items-center justify-center border border-white bg-white/90 text-[#171412] opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 sm:h-10 sm:w-10">
                    <Eye size={14} strokeWidth={1.5} className="sm:hidden" />
                    <Eye size={16} strokeWidth={1.5} className="hidden sm:block" />
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center border border-white bg-white/90 text-[#171412] opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 sm:h-10 sm:w-10">
                    <Heart size={14} strokeWidth={1.5} className="sm:hidden" />
                    <Heart size={16} strokeWidth={1.5} className="hidden sm:block" />
                  </span>

                </div>

              </div>

              {/* Text */}
              <div className="mt-2.5 text-center sm:mt-4 md:mt-5">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#171412] transition-colors duration-300 group-hover:text-[#fd6f93] sm:text-xs md:text-sm">
                  {category.name}
                </h3>
                <span className="mt-1 block h-px w-0 bg-[#fd6f93] transition-all duration-500 group-hover:mx-auto group-hover:w-8 sm:group-hover:w-10" />
              </div>

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}
