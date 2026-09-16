"use client";

import { Suspense } from "react";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/products";
import { useCartStore } from "@/lib/store";

const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

function ShopContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";
  const [activeCategory, setActiveCategory] = useState(categoryParam ? categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1) : "All");
  const { addToCart } = useCartStore();

  const filtered = useMemo(() => {
    let list = products;

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    return list;
  }, [query, activeCategory]);

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-3 py-6 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mt-4 flex flex-col justify-between border-b border-[#E7E1D8] pb-4 sm:mt-6 sm:flex-row sm:items-end sm:pb-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fd6f93] sm:text-xs">Collection</p>
            <h1 className="mt-1 font-serif text-xl font-medium tracking-tight text-[#171412] sm:text-3xl lg:text-4xl">
              {query ? `Results for "${query}"` : categoryParam ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}` : "Shop All Products"}
            </h1>
          </div>
          <p className="mt-1.5 text-[11px] text-[#6B6560] sm:mt-0 sm:text-sm">Showing {filtered.length} piece{filtered.length !== 1 ? "s" : ""}</p>
        </div>

        <div className="no-scrollbar mt-4 flex gap-1.5 overflow-x-auto pb-2 sm:mt-6 sm:flex-wrap sm:gap-2 sm:overflow-visible">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 sm:px-4 sm:py-2 sm:text-[10px] sm:tracking-[0.15em] ${
                activeCategory === cat
                  ? "border-[#171412] bg-[#171412] text-white"
                  : "border-[#E7E1D8] bg-white text-[#171412] hover:border-[#fd6f93] hover:text-[#fd6f93]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-sm text-[#6B6560]">No products found for &ldquo;{query}&rdquo;</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden border border-[#E7E1D8] bg-white transition-all duration-300 hover:shadow-lg hover:shadow-[#171412]/5"
              >
                <div className="relative aspect-[0.88] w-full overflow-hidden bg-[#F5F2EC]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-2.5 sm:p-4">
                  <span className="text-[7px] font-semibold uppercase tracking-widest text-[#fd6f93] sm:text-[9px]">
                    {product.category}
                  </span>
                  <h3 className="mt-0.5 font-serif text-xs font-medium leading-tight text-[#171412] sm:text-base">{product.name}</h3>
                  <div className="mt-auto flex items-center justify-between gap-1 pt-2 sm:pt-3">
                    <span className="text-[10px] font-semibold text-[#171412] sm:text-sm">{product.price}</span>
                    <button
                      onClick={() => addToCart(product, 1, "", "")}
                      className="flex shrink-0 items-center gap-1 border border-[#171412] bg-[#171412] px-2 py-1 text-[8px] font-semibold text-white transition-colors hover:bg-[#fd6f93] hover:border-[#fd6f93] sm:px-3.5 sm:py-2 sm:text-xs"
                    >
                      <ShoppingBag size={10} className="sm:hidden" /><ShoppingBag size={12} className="hidden sm:block" /> <span className="hidden sm:inline">Add to</span> Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FBF8F3]" />}>
      <ShopContent />
    </Suspense>
  );
}
