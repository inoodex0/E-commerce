"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Eye,
} from "lucide-react";
import { useState } from "react";
import { useCartStore, useWishlistStore } from "@/lib/store";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  isNew?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Classic Leather Watch",
    category: "Watches",
    price: 3850,
    oldPrice: 4500,
    rating: 4.8,
    reviews: 24,
    image: "/images/products/watch-1.jpg",
    isNew: true,
  },
  {
    id: 2,
    name: "Signature Leather Bag",
    category: "Bags",
    price: 4850,
    rating: 4.9,
    reviews: 31,
    image: "/images/products/bag-1.jpg",
    isNew: true,
  },
  {
    id: 3,
    name: "Classic Frame Sunglasses",
    category: "Sunglasses",
    price: 2200,
    oldPrice: 2800,
    rating: 4.7,
    reviews: 18,
    image: "/images/products/sunglasses-1.jpg",
    isNew: true,
  },
  {
    id: 4,
    name: "Minimal Gold Bracelet",
    category: "Jewelry",
    price: 1850,
    rating: 4.8,
    reviews: 16,
    image: "/images/products/bracelet-1.jpg",
    isNew: true,
  },
];

export default function NewArrivals() {
  const { addToCart } = useCartStore();
  const { toggleWishlist, isWishlisted } = useWishlistStore();

  return (
    <section className="w-full bg-[#F7F5F0] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-10 flex flex-col gap-7 sm:mb-14 md:flex-row md:items-end md:justify-between lg:mb-16">

          <div className="max-w-2xl">

            {/* Eyebrow */}

            <div className="new-arrival-reveal flex items-center gap-3">
              <span className="h-px w-8 bg-neutral-950" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-neutral-500 sm:text-[10px]">
                Just In
              </p>
            </div>

            {/* Heading */}

            <h2
              className="
                new-arrival-reveal
                new-arrival-delay-1
                mt-5
                font-[family-name:var(--font-cormorant)]
                text-[clamp(2.8rem,5vw,5rem)]
                font-medium
                leading-[0.9]
                tracking-[-0.03em]
                text-neutral-950
              "
            >
              New{" "}
              <span className="italic">
                Arrivals
              </span>
            </h2>

            {/* Description */}

            <p
              className="
                new-arrival-reveal
                new-arrival-delay-2
                mt-5
                max-w-lg
                text-[13px]
                leading-6
                text-neutral-500
                sm:text-sm
                sm:leading-7
              "
            >
              Discover the latest additions to our
              collection, thoughtfully selected to bring
              something new to your everyday style.
            </p>

          </div>

          {/* View All */}

          <Link
            href="/shop?sort=newest"
            className="
              new-arrival-reveal
              new-arrival-delay-2
              group
              inline-flex
              w-fit
              items-center
              gap-3
              border-b
              border-neutral-300
              pb-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-neutral-900
              transition-all
              duration-300
              hover:border-[#fd6f93]
              hover:bg-[#fd6f93]
              hover:text-white
            "
          >
            View All Products

            <ArrowRight
              size={15}
              strokeWidth={1.5}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </Link>

        </div>

        {/* =====================================================
            PRODUCT GRID
        ====================================================== */}

        <div
          className="
            grid
            grid-cols-2
            gap-x-3
            gap-y-10
            sm:gap-x-5
            sm:gap-y-12
            lg:grid-cols-4
            lg:gap-x-6
            lg:gap-y-14
          "
        >

          {products.map((product, index) => {
            const wishlisted = isWishlisted(product.name);

            const discount = product.oldPrice
              ? Math.round(
                  ((product.oldPrice - product.price) /
                    product.oldPrice) *
                    100
                )
              : null;

            return (
              <article
                key={product.id}
                className={`product-reveal product-delay-${index + 1} group`}
              >

                {/* =================================================
                    IMAGE
                ================================================== */}

                <div className="relative aspect-[0.82] overflow-hidden bg-white">

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
                        duration-[900ms]
                        ease-out
                        group-hover:scale-[1.05]
                      "
                    />
                  </Link>

                  {/* Overlay */}

                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.04]" />

                  {/* =================================================
                      NEW BADGE
                  ================================================== */}

                  {product.isNew && (
                    <span
                      className="
                        absolute
                        left-3
                        top-3
                        z-10
                        bg-white
                        px-2.5
                        py-1.5
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.16em]
                        text-neutral-950
                        sm:left-4
                        sm:top-4
                      "
                    >
                      New
                    </span>
                  )}

                  {/* =================================================
                      DISCOUNT
                  ================================================== */}

                  {discount && (
                    <span
                      className="
                        absolute
                        left-3
                        top-10
                        z-10
                        bg-neutral-950
                        px-2.5
                        py-1.5
                        text-[8px]
                        font-semibold
                        uppercase
                        tracking-[0.12em]
                        text-white
                        sm:left-4
                        sm:top-12
                      "
                    >
                      -{discount}%
                    </span>
                  )}

                  {/* =================================================
                      WISHLIST
                  ================================================== */}

                  <button
                    type="button"
                      aria-label={
                        wishlisted
                          ? `Remove ${product.name} from wishlist`
                          : `Add ${product.name} to wishlist`
                      }
                      onClick={() =>
                        toggleWishlist(product as any)
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
                      shadow-sm
                      transition-all
                      duration-300
                      hover:scale-105
                      sm:right-4
                      sm:top-4
                    "
                  >
                    <Heart
                      size={16}
                      strokeWidth={1.5}
                      className={
                        wishlisted
                          ? "fill-[#fd6f93] text-[#fd6f93]"
                          : "text-neutral-800"
                      }
                    />
                  </button>

                  {/* =================================================
                      QUICK VIEW
                  ================================================== */}

                  <Link
                    href={`/products/${product.id}`}
                    className="
                      absolute
                      bottom-3
                      left-3
                      right-3
                      z-20
                      hidden
                      h-10
                      items-center
                      justify-center
                      gap-2
                      bg-white/95
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.15em]
                      opacity-0
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      group-hover:opacity-100
                      sm:flex
                    "
                  >
                    <Eye
                      size={14}
                      strokeWidth={1.5}
                    />

                    Quick View
                  </Link>

                </div>

                {/* =================================================
                    PRODUCT DETAILS
                ================================================== */}

                <div className="pt-4 sm:pt-5">

                  {/* Category */}

                  <p
                    className="
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.16em]
                      text-neutral-400
                      sm:text-[9px]
                    "
                  >
                    {product.category}
                  </p>

                  {/* Product Name */}

                  <Link
                    href={`/products/${product.id}`}
                    className="mt-1.5 block"
                  >
                    <h3
                      className="
                        font-[family-name:var(--font-cormorant)]
                        text-[20px]
                        font-medium
                        leading-tight
                        text-neutral-950
                        transition-opacity
                        duration-300
                        group-hover:opacity-60
                        sm:text-[23px]
                      "
                    >
                      {product.name}
                    </h3>
                  </Link>

                  {/* =================================================
                      RATING
                  ================================================== */}

                  <div className="mt-2 flex items-center gap-2">

                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <span
                            key={star}
                            className="text-[9px] text-neutral-700"
                          >
                            ★
                          </span>
                        )
                      )}
                    </div>

                    <span className="text-[9px] text-neutral-400">
                      ({product.reviews})
                    </span>

                  </div>

                  {/* =================================================
                      PRICE
                  ================================================== */}

                  <div className="mt-2 flex items-center gap-2">

                    <span className="text-[12px] font-semibold text-neutral-950 sm:text-[13px]">
                      ৳{" "}
                      {product.price.toLocaleString()}
                    </span>

                    {product.oldPrice && (
                      <span className="text-[10px] text-neutral-400 line-through">
                        ৳{" "}
                        {product.oldPrice.toLocaleString()}
                      </span>
                    )}

                  </div>

                  {/* =================================================
                      ADD TO CART
                  ================================================== */}

                  <button
                    type="button"
                    onClick={() => addToCart({ id: product.id, name: product.name, category: product.category, price: `৳${product.price.toLocaleString()}`, image: product.image }, 1, "", "")}
                    className="
                      mt-4
                      flex
                      h-10
                      w-full
                      items-center
                      justify-center
                      gap-2
                      border
                      border-neutral-200
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[0.14em]
                      text-neutral-900
                      transition-all
                      duration-300
                      hover:border-[#fd6f93]
                      hover:bg-[#fd6f93]
                      hover:text-white
                    "
                  >
                    <ShoppingBag
                      size={14}
                      strokeWidth={1.5}
                    />

                    Add to Cart
                  </button>

                </div>
              </article>
            );
          })}

        </div>

        {/* =====================================================
            MOBILE VIEW ALL
        ====================================================== */}

        <div className="mt-12 flex justify-center sm:mt-14 lg:hidden">

          <Link
            href="/shop?sort=newest"
            className="
              inline-flex
              h-11
              items-center
              justify-center
              gap-3
              border
              border-neutral-300
              px-6
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              transition-all
              duration-300
              hover:border-[#fd6f93]
              hover:bg-[#fd6f93]
              hover:text-white
            "
          >
            View All Products

            <ArrowRight
              size={14}
              strokeWidth={1.5}
            />
          </Link>

        </div>

      </div>

      {/* =====================================================
          ANIMATIONS
      ====================================================== */}

      <style jsx>{`
        .new-arrival-reveal {
          opacity: 0;
          transform: translateY(20px);
          animation: newArrivalReveal 0.8s
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        .new-arrival-delay-1 {
          animation-delay: 0.12s;
        }

        .new-arrival-delay-2 {
          animation-delay: 0.24s;
        }

        .product-reveal {
          opacity: 0;
          transform: translateY(25px);
          animation: productReveal 0.8s
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        .product-delay-1 {
          animation-delay: 0.15s;
        }

        .product-delay-2 {
          animation-delay: 0.22s;
        }

        .product-delay-3 {
          animation-delay: 0.29s;
        }

        .product-delay-4 {
          animation-delay: 0.36s;
        }

        @keyframes newArrivalReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes productReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .new-arrival-reveal,
          .product-reveal {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}