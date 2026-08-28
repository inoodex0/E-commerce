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
    <section className="bg-[#FBF8F3] mt-0 py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="relative mb-10 text-center sm:mb-14">
          <span className="block font-[family-name:var(--font-dancing-script)] text-[2.5rem] leading-none text-[#ff6289]/50 sm:text-[3rem] md:text-[3.5rem]">
            crafted for you
          </span>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-[0.08em] text-[#171412] sm:text-4xl md:text-[42px]">
            SHOP BY CATEGORY
          </h2>
          <p className="mx-auto mt-4 max-w-[400px] text-[13px] leading-6 text-[#6B6560] sm:text-sm sm:leading-7">
            Explore our carefully curated collections designed to complement your unique style.
          </p>
        </div>

        {/* =====================================================
            GRID
        ====================================================== */}

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">

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
                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/0 transition-all duration-300 group-hover:bg-black/10">

                  <span className="flex h-10 w-10 items-center justify-center border border-white bg-white/90 text-[#171412] opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <Eye size={16} strokeWidth={1.5} />
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center border border-white bg-white/90 text-[#171412] opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <Heart size={16} strokeWidth={1.5} />
                  </span>

                </div>

              </div>

              {/* Text */}
              <div className="mt-4 text-center sm:mt-5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#171412] transition-colors duration-300 group-hover:text-[#ff6289] sm:text-sm">
                  {category.name}
                </h3>
                <span className="mt-1.5 block h-px w-0 bg-[#ff6289] transition-all duration-500 group-hover:mx-auto group-hover:w-10" />
              </div>

            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}
