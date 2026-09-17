"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/store";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Classic Leather Watch",
    category: "Watches",
    price: 3850,
    oldPrice: 4500,
    image: "/images/products/watch-1.avif",
  },
  {
    id: 2,
    name: "Signature Leather Bag",
    category: "Bags",
    price: 4850,
    image: "/images/products/bag-1.avif",
  },
  {
    id: 3,
    name: "Classic Frame Sunglasses",
    category: "Sunglasses",
    price: 2200,
    oldPrice: 2800,
    image: "/images/products/sunglasses-1.avif",
  },
  {
    id: 4,
    name: "Minimal Gold Bracelet",
    category: "Jewelry",
    price: 1850,
    image: "/images/products/bracelet-1.avif",
  },
];

export default function BestSellers() {
  const { addToCart, cart, updateQuantity } = useCartStore();
  const [addedId, setAddedId] = useState<number | null>(null);

  const getCartIndex = (id: number) => cart.findIndex((item) => item.product.id === id);
  const getQty = (id: number) => {
    const idx = getCartIndex(id);
    return idx >= 0 ? cart[idx].quantity : 0;
  };

  const handleAdd = (product: Product) => {
    addToCart(
      { id: product.id, name: product.name, category: product.category, price: `৳${product.price.toLocaleString()}`, image: product.image, colors: [], sizes: [] },
      1,
      "",
      ""
    );
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleBuyNow = (product: Product) => {
    const qty = getQty(product.id);
    if (qty === 0) {
      addToCart(
        { id: product.id, name: product.name, category: product.category, price: `৳${product.price.toLocaleString()}`, image: product.image, colors: [], sizes: [] },
        1,
        "",
        ""
      );
    }
    window.location.href = "/checkout";
  };

  return (
    <section className="w-full bg-[#FBF8F3] py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 text-center sm:mb-14">
          <h2 className="font-serif text-2xl font-medium tracking-wide text-[#171412] sm:text-3xl md:text-4xl">
            Top Selling Products
          </h2>
        </div>

        {/* Products Grid — 2 columns */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          {products.map((product) => {
            const qty = getQty(product.id);
            return (
              <article
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E7E1D8] bg-white shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row"
              >
                {/* Image — left side */}
                <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-[#FAFAFA] sm:aspect-auto sm:h-[200px] md:h-[220px] md:w-[320px] lg:h-[240px] lg:w-[340px]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 240px"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Info — right side */}
                <div className="flex flex-1 flex-col justify-center gap-3 p-6 sm:p-8">
                  <h3 className="text-lg font-medium text-[#171412] sm:text-xl lg:text-2xl">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-[#E8852A] sm:text-2xl">৳{product.price.toLocaleString()}</span>
                    {product.oldPrice && (
                      <span className="text-sm text-[#6B6560] line-through">৳{product.oldPrice.toLocaleString()}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    {qty > 0 ? (
                      <div className="flex items-center rounded-lg border border-[#E7E1D8]">
                        <button
                          onClick={() => { const idx = getCartIndex(product.id); if (idx >= 0) updateQuantity(idx, qty - 1); }}
                          className="flex h-10 w-10 items-center justify-center text-[#171412] transition-colors hover:bg-[#FBF8F3]"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="flex h-10 w-12 items-center justify-center border-x border-[#E7E1D8] text-sm font-medium text-[#171412]">
                          {qty}
                        </span>
                        <button
                          onClick={() => { const idx = getCartIndex(product.id); if (idx >= 0) updateQuantity(idx, qty + 1); }}
                          className="flex h-10 w-10 items-center justify-center text-[#171412] transition-colors hover:bg-[#FBF8F3]"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAdd(product)}
                        className="flex items-center gap-2 rounded-lg border border-[#E8852A] px-5 py-2.5 text-sm font-semibold text-[#E8852A] transition-all duration-300 hover:bg-[#E8852A] hover:text-white"
                      >
                        <ShoppingBag size={15} />
                        {addedId === product.id ? "Added!" : "Add To Cart"}
                      </button>
                    )}

                    <button
                      onClick={() => handleBuyNow(product)}
                      className="flex items-center gap-2 rounded-lg bg-[#E8852A] px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#e55a7f]"
                    >
                      <ShoppingCart size={15} /> Buy now
                    </button>
                  </div>
                </div>

                {/* Best Selling badge */}
                <span className="absolute right-3 top-3 rounded bg-[#E8852A] px-2.5 py-1 text-[9px] font-bold text-white shadow-sm">
                  Best Selling
                </span>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex justify-center sm:mt-16">
          <Link
            href="/shop?sort=best-selling"
            className="group inline-flex items-center gap-3 rounded-full border border-[#171412] bg-white px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#171412] transition-all duration-300 hover:border-[#E8852A] hover:bg-[#E8852A] hover:text-white"
          >
            Shop All Best Sellers
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
