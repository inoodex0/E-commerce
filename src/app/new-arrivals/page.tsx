"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles, ShoppingBag, Heart, Star, Truck, ShieldCheck, RotateCcw, Eye } from "lucide-react";
import { useState } from "react";

const newItems = [
  { id: 1, name: "Midnight Onyx Chrono", tag: "Just Dropped", price: "$450.00", image: "/images/a1.jpg", description: "A masterpiece of precision engineering, this chronograph features a deep onyx dial paired with rose gold accents. Water-resistant up to 100m with sapphire crystal glass.", rating: 4.8, reviews: 124 },
  { id: 2, name: "Sienna Tuscan Tote", tag: "New Season", price: "$520.00", image: "/images/a4.avif", description: "Handcrafted from premium Italian leather, this tote embodies timeless elegance. Spacious interior with multiple compartments for everyday luxury.", rating: 4.9, reviews: 89 },
  { id: 3, name: "Imperial Gold Bangle", tag: "Limited", price: "$310.00", image: "/images/a3avif.avif", description: "18K gold-plated bangle with intricate detailing. A statement piece that complements both casual and formal attire effortlessly.", rating: 4.7, reviews: 203 },
  { id: 4, name: "Obsidian Aviator Shades", tag: "Trending", price: "$280.00", image: "/images/a5.avif", description: "Polarized lenses housed in a lightweight titanium frame. UV400 protection meets contemporary design for the modern gentleman.", rating: 4.6, reviews: 156 },
  { id: 5, name: "Heritage Canvas Weekender", tag: "Bestseller", price: "$395.00", image: "/images/a6.avif", description: "Waxed canvas meets full-grain leather trim in this rugged yet refined weekender bag. Built to last a lifetime of adventures.", rating: 4.9, reviews: 312 },
  { id: 6, name: "Aura Noir Perfume", tag: "Exclusive", price: "$185.00", image: "/images/a2.avif", description: "Notes of black oud, amber, and smoky vetiver create an intoxicating signature scent. Long-lasting 12-hour fragrance profile.", rating: 4.8, reviews: 97 },
];

export default function NewArrivalsPage() {
  const [selected, setSelected] = useState(newItems[0]);

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#fd6f93] transition-colors hover:text-[#171412]"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="mt-6 border-b border-[#E7E1D8] pb-6">
          <div className="flex items-center gap-2 text-[#fd6f93]">
            <Sparkles size={16} />
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Latest Collection</p>
          </div>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl">
            New Arrivals
          </h1>
          <p className="mt-2 text-sm text-[#6B6560]">Discover our freshest drops and seasonal designs.</p>
        </div>

        {/* =====================================================
            MASTER DETAIL LAYOUT
        ====================================================== */}

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:gap-10">

          {/* Product List (left) */}
          <div className="flex flex-col gap-4 lg:w-[340px] lg:shrink-0">
            {newItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item)}
                className={`group flex items-center gap-4 border p-3 text-left transition-all duration-300 ${
                  selected.id === item.id
                    ? "border-[#fd6f93] bg-white shadow-md"
                    : "border-[#E7E1D8] bg-white/50 hover:border-[#fd6f93]/40 hover:bg-white hover:shadow-sm"
                }`}
              >
                <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-[#F5F2EC]">
                  <Image src={item.image} alt={item.name} fill className="object-cover object-center" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#fd6f93]">{item.tag}</span>
                  <h3 className="mt-0.5 truncate font-serif text-sm font-medium text-[#171412]">{item.name}</h3>
                  <p className="mt-0.5 text-xs font-semibold text-[#171412]">{item.price}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Product Detail (right) */}
          <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:gap-10">

            {/* Image */}
            <div className="relative aspect-square w-full overflow-hidden bg-[#F5F2EC] lg:w-1/2">
              <Image
                key={selected.id}
                src={selected.image}
                alt={selected.name}
                fill
                className="object-cover object-center"
              />
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col justify-center">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#fd6f93]">{selected.tag}</span>
              <h2 className="mt-2 font-serif text-2xl font-medium text-[#171412] sm:text-3xl">{selected.name}</h2>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(selected.rating) ? "fill-[#fd6f93] text-[#fd6f93]" : "text-[#E7E1D8]"} />
                  ))}
                </div>
                <span className="text-xs text-[#6B6560]">{selected.rating} ({selected.reviews} reviews)</span>
              </div>

              <p className="mt-4 text-sm leading-6 text-[#6B6560]">{selected.description}</p>

              <p className="mt-5 font-serif text-2xl font-medium text-[#171412]">{selected.price}</p>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/product/${selected.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex flex-1 items-center justify-center gap-2 border border-[#171412] bg-[#171412] py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#fd6f93] hover:border-[#fd6f93]"
                >
                  <Eye size={16} /> View Details
                </Link>
                <button className="flex items-center justify-center gap-2 border border-[#E7E1D8] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#171412] transition-all duration-300 hover:border-[#fd6f93] hover:text-[#fd6f93]">
                  <Heart size={16} /> Wishlist
                </button>
              </div>

              {/* Features */}
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-[#E7E1D8] pt-6">
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <Truck size={18} className="text-[#fd6f93]" />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[#6B6560]">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <ShieldCheck size={18} className="text-[#fd6f93]" />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[#6B6560]">2 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <RotateCcw size={18} className="text-[#fd6f93]" />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-[#6B6560]">Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
