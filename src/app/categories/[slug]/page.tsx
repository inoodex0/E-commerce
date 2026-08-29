"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { products } from "@/lib/products";
import { use } from "react";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { addToCart } = useCartStore();

  const formattedCategory = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const filtered = products.filter(
    (p) => p.category.toLowerCase() === formattedCategory.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="mt-6 border-b border-[#E7E1D8] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Category</p>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl">
            {formattedCategory}
          </h1>
          <p className="mt-2 text-sm text-[#6B6560]">
            {filtered.length > 0
              ? `Explore curated luxury ${formattedCategory.toLowerCase()}`
              : `No products found in this category`}
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden border border-[#E7E1D8] bg-white transition-all duration-300 hover:shadow-lg hover:shadow-[#171412]/5"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-[#F5F2EC]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#fd6f93]">
                    {item.category}
                  </span>
                  <h3 className="mt-1 font-serif text-lg font-medium text-[#171412]">{item.name}</h3>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="text-sm font-semibold text-[#171412]">{item.price}</span>
                    <button
                      onClick={() => addToCart(item, 1, "", "")}
                      className="flex items-center gap-1.5 border border-[#171412] bg-[#171412] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#fd6f93] hover:border-[#fd6f93]"
                    >
                      <ShoppingBag size={14} /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-sm text-[#6B6560]">No products found for &ldquo;{formattedCategory}&rdquo;.</p>
            <Link href="/shop" className="mt-4 inline-block border-b border-[#171412] text-xs font-semibold uppercase tracking-[0.15em] text-[#171412]">
              Browse All Products
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}
