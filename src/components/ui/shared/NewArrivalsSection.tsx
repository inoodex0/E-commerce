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
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8">

        {/* Header */}
        <div className="mb-10 text-center sm:mb-14 md:mb-16">
          <span className="block font-[family-name:var(--font-dancing-script)] text-[2rem] leading-none text-[#fd6f93]/60 sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem]">
            just arrived
          </span>
          <h2 className="mt-3 font-serif text-2xl font-medium tracking-[0.1em] text-[#171412] sm:text-3xl md:text-4xl lg:text-[42px]">
            NEW ARRIVALS
          </h2>
          <div className="mx-auto mt-4 h-[1.5px] w-14 bg-[#fd6f93]/70 sm:w-20" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6 lg:gap-7">

          {newItems.slice(0, 6).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="new-arrival-card group relative aspect-square overflow-hidden rounded-sm border border-[#171412]/10 bg-[#FBF8F3] shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Text behind image */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[#FBF8F3] px-4">
                <p className="text-[8px] font-medium uppercase tracking-[0.25em] text-[#fd6f93] sm:text-[9px]">
                  {item.tag}
                </p>
                <h3 className="text-center font-serif text-xs font-medium leading-snug tracking-wide text-[#171412] sm:text-sm md:text-base lg:text-lg">
                  {item.name}
                </h3>
                <p className="text-[10px] font-medium tracking-wider text-[#6B6560] sm:text-[11px]">
                  {item.price}
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

              {/* NEW badge — stays on top of the image */}
              <span className="absolute left-3 top-3 z-20 rounded-full bg-white/90 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.15em] text-[#171412] shadow-sm backdrop-blur-sm sm:text-[9px]">
                New
              </span>
            </Link>
          ))}

        </div>

        {/* View All */}
        <div className="mt-10 text-center sm:mt-12 md:mt-14">
          <Link
            href="/new-arrivals"
            className="group inline-flex items-center gap-2 border border-[#171412] bg-white px-7 py-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#171412] transition-all duration-300 hover:bg-[#fd6f93] hover:border-[#fd6f93] hover:text-white sm:px-9 sm:py-3.5 sm:text-[10px] sm:tracking-[0.2em]"
          >
            View All New Arrivals
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
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