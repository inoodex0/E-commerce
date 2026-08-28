"use client";

import Image from "next/image";
import Link from "next/link";

const newItems = [
  { id: 1, name: "Midnight Onyx Chrono", tag: "Watches", price: "$450.00", image: "/images/a1.jpg", href: "/product/midnight-onyx-chrono" },
  { id: 2, name: "Sienna Tuscan Tote", tag: "Bags", price: "$520.00", image: "/images/a4.avif", href: "/product/sienna-tuscan-tote" },
  { id: 3, name: "Imperial Gold Bangle", tag: "Jewelry", price: "$310.00", image: "/images/a3avif.avif", href: "/product/imperial-gold-bangle" },
  { id: 4, name: "Obsidian Aviator Shades", tag: "Sunglasses", price: "$280.00", image: "/images/a5.avif", href: "/product/obsidian-aviator-shades" },
  { id: 5, name: "Heritage Canvas Weekender", tag: "Bags", price: "$395.00", image: "/images/a6.avif", href: "/product/heritage-canvas-weekender" },
  { id: 6, name: "Aura Noir Perfume", tag: "Perfumes", price: "$185.00", image: "/images/a2.avif", href: "/product/aura-noir-perfume" },
];

export default function NewArrivalsSection() {
  return (
    <section className="bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8">

        {/* Header */}
        <div className="mb-10 text-center sm:mb-14">
          <span className="block font-[family-name:var(--font-dancing-script)] text-[2.5rem] leading-none text-[#ff6289]/50 sm:text-[3rem] md:text-[3.5rem]">
            just arrived
          </span>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-[0.08em] text-[#171412] sm:text-4xl md:text-[42px]">
            NEW ARRIVALS
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4">

          {newItems.slice(0, 6).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="new-arrival-card group relative aspect-square overflow-hidden bg-[#F5F2EC]"
            >
              {/* Text behind image */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FBF8F3] px-4">
                <h3 className="text-center font-serif text-base font-medium tracking-wide text-[#171412] sm:text-lg">
                  {item.name}
                </h3>
                <p className="mt-1 text-center text-[11px] tracking-wider text-[#6B6560]">
                  {item.tag}
                </p>
              </div>

              {/* Image — slides left on hover */}
              <div className="new-arrival-image absolute inset-0 z-10">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover object-center"
                />
              </div>
            </Link>
          ))}

        </div>

        {/* View All */}
        <div className="mt-12 text-center">
          <Link
            href="#"
            className="inline-flex items-center gap-3 border border-[#171412] bg-white px-8 py-3.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#171412] transition-all duration-300 hover:bg-[#ff6289] hover:border-[#ff6289] hover:text-white"
          >
            View All New Arrivals
          </Link>
        </div>
      </div>

      <style>{`
        .new-arrival-card:hover .new-arrival-image {
          transform: translateX(-100%);
        }
        .new-arrival-image {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </section>
  );
}
