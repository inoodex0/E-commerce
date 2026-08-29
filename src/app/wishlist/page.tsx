"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlistStore, useCartStore } from "@/lib/store";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560] transition-colors hover:text-[#171412]"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <div className="mt-6 border-b border-[#E7E1D8] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Saved Items</p>
          <div className="mt-1 flex items-center justify-between">
            <h1 className="font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl">
              My Wishlist
            </h1>
            {wishlist.length > 0 && (
              <p className="text-sm text-[#6B6560]">{wishlist.length} {wishlist.length === 1 ? "item" : "items"}</p>
            )}
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="mt-8 border border-[#E7E1D8] bg-white p-12 text-center shadow-sm">
            <Heart className="mx-auto text-[#fd6f93]" size={48} strokeWidth={1.5} />
            <h3 className="mt-4 font-serif text-xl font-medium text-[#171412]">Your Wishlist is Empty</h3>
            <p className="mt-2 text-sm text-[#6B6560]">Save your favorite luxury pieces to view them later.</p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center gap-2 border border-[#171412] bg-[#171412] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#fd6f93] hover:border-[#fd6f93]"
            >
              <ShoppingBag size={14} /> Explore Collection
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((product) => (
                <div
                  key={product.name}
                  className="group border border-[#E7E1D8] bg-white transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-[#F5F2EC]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      onClick={() => removeFromWishlist(product.name)}
                      className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center bg-white/90 text-[#6B6560] shadow-sm transition-colors hover:text-[#fd6f93]"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#fd6f93]">
                      {product.category}
                    </p>
                    <h3 className="mt-1 font-serif text-base font-medium text-[#171412]">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-sm font-semibold text-[#171412]">
                      {product.price}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => addToCart(product, 1, "", "")}
                        className="flex flex-1 items-center justify-center gap-1.5 border border-[#171412] bg-[#171412] py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#fd6f93] hover:border-[#fd6f93]"
                      >
                        <ShoppingBag size={12} /> Add to Cart
                      </button>
                      <Link
                        href={`/product/${product.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex items-center justify-center border border-[#E7E1D8] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#171412] transition-all duration-300 hover:border-[#fd6f93] hover:text-[#fd6f93]"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={clearWishlist}
                className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560] transition-colors hover:text-[#fd6f93]"
              >
                Clear All
              </button>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 border border-[#171412] bg-[#171412] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#fd6f93] hover:border-[#fd6f93]"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
