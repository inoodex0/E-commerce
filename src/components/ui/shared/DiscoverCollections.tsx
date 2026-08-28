"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const collections = [
  {
    id: 1,
    name: "Signature",
    slug: "signature",
    tag: "Curated Excellence",
    description: "Our handpicked selection of timeless pieces — each one representing the finest craftsmanship and design that defines the NOVARA identity.",
    image: "/images/collections/signature.jpg",
    productCount: 6,
  },
  {
    id: 2,
    name: "Essentials",
    slug: "essentials",
    tag: "Everyday Luxe",
    description: "The foundation of a refined wardrobe. Versatile, enduring pieces crafted for daily elegance without compromise.",
    image: "/images/collections/essentials.jpg",
    productCount: 6,
  },
];

export default function DiscoverCollections() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="bg-[#FBF8F3] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ff6289]">Discover</p>
          <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl lg:text-5xl">
            Our Collections
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-[#6B6560]">
            Two distinct visions, one commitment to exceptional quality.
          </p>
        </div>

        {/* Collection Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:mt-16">
          {collections.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group relative overflow-hidden border border-[#E7E1D8] bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-[#171412]/10 hover:-translate-y-1"
              onMouseEnter={() => setHoveredId(col.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={col.image}
                  alt={`${col.name} Collection`}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Tag */}
                <div className="absolute left-5 top-5 sm:left-6 sm:top-6">
                  <span className="inline-block rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#171412] backdrop-blur-sm">
                    {col.tag}
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-[#ff6289]">
                    {col.productCount} Products
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-medium text-white sm:text-3xl">
                    {col.name} Collection
                  </h3>
                  <p className="mt-2 max-w-sm text-xs leading-5 text-white/70 sm:text-sm">
                    {col.description}
                  </p>

                  {/* CTA */}
                  <div
                    className={`mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 ${
                      hoveredId === col.id ? "gap-3" : ""
                    }`}
                  >
                    Explore {col.name}
                    <ArrowRight
                      size={16}
                      className={`transition-transform duration-300 ${
                        hoveredId === col.id ? "translate-x-1" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
