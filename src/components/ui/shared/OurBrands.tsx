"use client";

import Image from "next/image";

const brands = [
  { src: "/images/partnership/A.png", alt: "Brand A" },
  { src: "/images/partnership/b.png", alt: "Brand B" },
  { src: "/images/partnership/E.png", alt: "Brand E" },
  { src: "/images/partnership/EY.png", alt: "Brand EY" },
  { src: "/images/partnership/F.png", alt: "Brand F" },
  { src: "/images/partnership/F1.png", alt: "Brand F1" },
  { src: "/images/partnership/s.png", alt: "Brand S" },
  { src: "/images/partnership/v.png", alt: "Brand V" },
];

export default function OurBrands() {
  return (
    <section className="bg-[#FBF8F3] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="font-serif text-2xl font-medium tracking-wide text-[#171412] sm:text-3xl md:text-4xl">
            Our Brands
          </h2>
        </div>

        {/* Brand Logos Grid */}
        <div className="grid grid-cols-2 items-center justify-items-center gap-6 sm:grid-cols-4 sm:gap-8 lg:grid-cols-4 lg:gap-10">
          {brands.map((brand) => (
            <div
              key={brand.src}
              className="flex h-16 items-center justify-center transition-all duration-300 sm:h-20 lg:h-24"
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                width={180}
                height={70}
                className="h-10 w-auto object-contain opacity-50 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 sm:h-12 lg:h-14"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
