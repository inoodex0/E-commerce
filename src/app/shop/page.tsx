"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { products } from "@/lib/products";
import { useCartStore } from "@/lib/store";

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCartStore();

  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mt-6 flex flex-col justify-between border-b border-[#E7E1D8] pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Collection</p>
            <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl">
              Shop All Products
            </h1>
          </div>
          <p className="mt-2 text-sm text-[#6B6560] sm:mt-0">Showing {filtered.length} premium pieces</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                activeCategory === cat
                  ? "border-[#171412] bg-[#171412] text-white"
                  : "border-[#E7E1D8] bg-white text-[#171412] hover:border-[#fd6f93] hover:text-[#fd6f93]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden border border-[#E7E1D8] bg-white transition-all duration-300 hover:shadow-lg hover:shadow-[#171412]/5"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#F5F2EC]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#fd6f93]">
                  {product.category}
                </span>
                <h3 className="mt-1 font-serif text-lg font-medium text-[#171412]">{product.name}</h3>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-sm font-semibold text-[#171412]">{product.price}</span>
                  <button
                    onClick={() => addToCart(product, 1, "", "")}
                    className="flex items-center gap-1.5 border border-[#171412] bg-[#171412] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#fd6f93] hover:border-[#fd6f93]"
                  >
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
