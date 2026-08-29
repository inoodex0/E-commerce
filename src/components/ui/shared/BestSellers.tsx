"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import { useCartStore, useWishlistStore } from "@/lib/store";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  reviews: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Classic Leather Watch",
    category: "Watches",
    price: 3850,
    oldPrice: 4500,
    image: "/images/products/watch-1.avif",
    reviews: 48,
  },
  {
    id: 2,
    name: "Signature Leather Bag",
    category: "Bags",
    price: 4850,
    image: "/images/products/bag-1.avif",
    reviews: 36,
  },
  {
    id: 3,
    name: "Classic Frame Sunglasses",
    category: "Sunglasses",
    price: 2200,
    oldPrice: 2800,
    image: "/images/products/sunglasses-1.avif",
    reviews: 29,
  },
  {
    id: 4,
    name: "Minimal Gold Bracelet",
    category: "Jewelry",
    price: 1850,
    image: "/images/products/bracelet-1.avif",
    reviews: 24,
  },
];

export default function BestSellers() {
  const { addToCart } = useCartStore();
  const { toggleWishlist, isWishlisted } = useWishlistStore();

  return (
    <section className="w-full bg-white py-14 sm:py-20 lg:py-32">

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="grid grid-cols-1 gap-8 border-b border-neutral-200 pb-8 lg:grid-cols-[1fr_auto] lg:items-end">

          {/* Left */}

          <div>

            <div className="flex items-center gap-3">

              <span className="h-px w-8 bg-neutral-900" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-500 sm:text-[10px]">
                Customer Favorites
              </p>

            </div>

            <h2
              className="
                mt-5
                font-[family-name:var(--font-cormorant)]
                text-[clamp(3rem,6vw,6rem)]
                font-medium
                leading-[0.85]
                tracking-[-0.04em]
                text-neutral-950
              "
            >
              Best{" "}
              <span className="italic text-neutral-500">
                Sellers
              </span>
            </h2>

          </div>

          {/* Right */}

          <div className="max-w-sm lg:text-right">

          

          </div>

        </div>


        {/* =====================================================
            PRODUCTS
        ====================================================== */}

        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-12 sm:mt-14 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-7">

          {products.map((product, index) => {
            const wishlisted = isWishlisted(product.name);

            return (
              <article
                key={product.id}
                className="group"
              >

                {/* =================================================
                    IMAGE
                ================================================== */}

                <div className="relative aspect-[0.88] overflow-hidden bg-[#F5F4F1]">

                  <Link
                    href={`/products/${product.id}`}
                    className="absolute inset-0 z-0"
                  >

                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="
                        (max-width: 640px) 50vw,
                        (max-width: 1024px) 33vw,
                        25vw
                      "
                      className="
                        object-cover
                        transition-transform
                        duration-[1000ms]
                        ease-out
                        group-hover:scale-[1.045]
                      "
                    />

                  </Link>


                  {/* =================================================
                      RANK
                  ================================================== */}

                  <div
                    className="
                      absolute
                      left-3
                      top-3
                      z-10
                      sm:left-4
                      sm:top-4
                    "
                  >

                    <span
                      className="
                        bg-white
                        px-2.5
                        py-1.5
                        text-[8px]
                        font-semibold
                        tracking-[0.15em]
                        text-neutral-900
                        shadow-sm
                      "
                    >
                      0{index + 1}
                    </span>

                  </div>


                  {/* =================================================
                      BEST SELLER
                  ================================================== */}

                  <div
                    className="
                      absolute
                      bottom-3
                      left-3
                      z-10
                      sm:bottom-4
                      sm:left-4
                    "
                  >

                    <span
                      className="
                        bg-neutral-950
                        px-2.5
                        py-1.5
                        text-[7px]
                        font-semibold
                        uppercase
                        tracking-[0.14em]
                        text-white
                      "
                    >
                      Best Seller
                    </span>

                  </div>


                  {/* =================================================
                      WISHLIST
                  ================================================== */}

                  <button
                    type="button"
                    onClick={() =>
                      toggleWishlist(product as any)
                    }
                    aria-label={
                      wishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    className="
                      absolute
                      right-3
                      top-3
                      z-20
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-white/95
                      transition-all
                      duration-300
                      hover:scale-105
                      sm:right-4
                      sm:top-4
                    "
                  >

                    <Heart
                      size={15}
                      strokeWidth={1.4}
                      className={
                        wishlisted
                          ? "fill-[#fd6f93] text-[#fd6f93]"
                          : "text-neutral-800"
                      }
                    />

                  </button>

                </div>


                {/* =================================================
                    PRODUCT INFO
                ================================================== */}

                <div className="pt-4 sm:pt-5">

                  {/* Category */}

                  <p
                    className="
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.2em]
                      text-neutral-400
                      sm:text-[9px]
                    "
                  >
                    {product.category}
                  </p>


                  {/* Name */}

                  <Link
                    href={`/products/${product.id}`}
                    className="block"
                  >

                    <h3
                      className="
                        mt-2
                        font-[family-name:var(--font-cormorant)]
                        text-[21px]
                        font-medium
                        leading-tight
                        tracking-[-0.01em]
                        text-neutral-950
                        transition-opacity
                        duration-300
                        group-hover:opacity-60
                        sm:text-[25px]
                      "
                    >
                      {product.name}
                    </h3>

                  </Link>


                  {/* Reviews */}

                  <div className="mt-2 flex items-center gap-2">

                    <div className="flex gap-0.5">

                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className="text-[8px] text-neutral-800"
                        >
                          ★
                        </span>
                      ))}

                    </div>

                    <span className="text-[9px] text-neutral-400">
                      {product.reviews} reviews
                    </span>

                  </div>


                  {/* Price */}

                  <div className="mt-2 flex items-center gap-2">

                    <span className="text-[12px] font-semibold text-neutral-950 sm:text-[13px]">
                      ৳ {product.price.toLocaleString()}
                    </span>

                    {product.oldPrice && (
                      <span className="text-[10px] text-neutral-400 line-through">
                        ৳ {product.oldPrice.toLocaleString()}
                      </span>
                    )}

                  </div>


                  {/* Add to cart */}

                  <button
                    type="button"
                    onClick={() => addToCart({ id: product.id, name: product.name, category: product.category, price: `৳${product.price.toLocaleString()}`, image: product.image }, 1, "", "")}
                    className="
                      mt-4
                      flex
                      h-9
                      w-full
                      items-center
                      justify-center
                      gap-2
                      border
                      border-neutral-200
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-neutral-900
                      transition-all
                      duration-300
                      hover:border-[#fd6f93]
                      hover:bg-[#fd6f93]
                      hover:text-white
                      sm:h-10
                      sm:text-[8px]
                      sm:tracking-[0.16em]
                    "
                  >

                    <ShoppingBag
                      size={13}
                      strokeWidth={1.4}
                    />

                    Add to Cart

                  </button>

                </div>

              </article>
            );
          })}

        </div>


        {/* =====================================================
            BOTTOM CTA
        ====================================================== */}

        <div
          className="
            mt-14
            flex
            justify-center
            border-t
            border-neutral-200
            pt-8
            sm:mt-16
          "
        >

          <Link
            href="/shop?sort=best-selling"
            className="
              group
              inline-flex
              h-11
              items-center
              gap-3
              border
              border-[#171412]
              bg-white
              px-6
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-[#171412]
              transition-all
              duration-300
              hover:bg-[#fd6f93]
              hover:border-[#fd6f93]
              hover:text-white
              sm:h-12
              sm:px-7
              sm:text-[9px]
              sm:tracking-[0.2em]
            "
          >
            Shop All Best Sellers

            <ArrowRight
              size={14}
              strokeWidth={1.4}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />

          </Link>

        </div>

      </div>

    </section>
  );
}