"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface DealProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
}

const dealProducts: DealProduct[] = [
  {
    id: 1,
    name: "Classic Leather Watch",
    category: "Watches",
    price: 3150,
    oldPrice: 3850,
    discount: 18,
    image: "/images/products/watch-1.avif",
  },
  {
    id: 2,
    name: "Signature Leather Bag",
    category: "Bags",
    price: 3990,
    oldPrice: 4850,
    discount: 18,
    image: "/images/products/bag-1.avif",
  },
  {
    id: 3,
    name: "Classic Frame Sunglasses",
    category: "Sunglasses",
    price: 1790,
    oldPrice: 2200,
    discount: 19,
    image: "/images/products/sunglasses-1.avif",
  },
];

const SALE_DURATION = 24 * 60 * 60;

export default function DealsSection() {
  const [timeLeft, setTimeLeft] = useState(SALE_DURATION);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    let endTime: number;

    try {
      const savedEndTime = localStorage.getItem("accessories-sale-end");
      if (savedEndTime) {
        endTime = Number(savedEndTime);
        if (endTime <= Date.now()) {
          endTime = Date.now() + SALE_DURATION * 1000;
          localStorage.setItem("accessories-sale-end", String(endTime));
        }
      } else {
        endTime = Date.now() + SALE_DURATION * 1000;
        localStorage.setItem("accessories-sale-end", String(endTime));
      }
    } catch {
      endTime = Date.now() + SALE_DURATION * 1000;
    }

    const updateTimer = () => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formatNumber = (value: number) => String(value).padStart(2, "0");

  if (!mounted) {
    return (
      <section className="w-full bg-[#FAF9F7] py-14 sm:py-20 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex flex-col gap-8 border-b border-neutral-200 pb-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-neutral-900" />
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-500 sm:text-[10px]">Limited Time</p>
              </div>
              <h2 className="mt-5 font-sans text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.84] tracking-[-0.04em] text-neutral-950">
                Flash <span className="italic text-neutral-500">Sale</span>
              </h2>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#FAF9F7] py-14 sm:py-20 lg:py-32">

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">

        {/* =====================================================
            TOP HEADER
        ====================================================== */}

        <div className="flex flex-col gap-8 border-b border-neutral-200 pb-10 lg:flex-row lg:items-end lg:justify-between">

          {/* Left */}

          <div>

            <div className="flex items-center gap-3">

              <span className="h-px w-8 bg-neutral-900" />

              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-500 sm:text-[10px]">
                Limited Time
              </p>

            </div>

            <h2
              className="
                mt-5
                font-sans
                text-[clamp(3rem,6vw,6rem)]
                font-medium
                leading-[0.84]
                tracking-[-0.04em]
                text-neutral-950
              "
            >
              Flash{" "}
              <span className="italic text-neutral-500">
                Sale
              </span>
            </h2>

          </div>

        </div>


        {/* =====================================================
            SALE BANNER
        ====================================================== */}

        <div className="mt-8 overflow-hidden border border-[#fd6f93]/20 bg-[#fd6f93] shadow-lg shadow-[#fd6f93]/20">

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto]">

            {/* Offer */}

            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-14">

              <div className="flex items-center gap-3">

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#fd6f93] sm:h-8 sm:w-8">
                  <Clock
                    size={12}
                    strokeWidth={1.4}
                    className="sm:hidden"
                  />
                  <Clock
                    size={14}
                    strokeWidth={1.4}
                    className="hidden sm:block"
                  />
                </span>

                <span className="text-[8px] font-semibold uppercase tracking-[0.15em] text-white/80 sm:text-[9px] sm:tracking-[0.2em]">
                  Ending Soon
                </span>

              </div>


              <h3
                className="
                  mt-5
                  font-sans
                  text-[clamp(2rem,4vw,3.5rem)]
                  font-medium
                  leading-none
                  text-white
                "
              >
                Up to{" "}
                <span className="italic">
                  20% Off
                </span>
              </h3>


             

            </div>


            {/* =================================================
                COUNTDOWN
            ================================================== */}

            <div className="border-t border-neutral-200 lg:border-l lg:border-t-0">

              <div className="flex h-full items-center justify-center px-6 py-8 sm:px-10 lg:px-14">

                <div className="flex items-center gap-3 sm:gap-5">

                  {/* Hours */}

                  <div className="text-center">

                    <div
                      className="
                        font-sans
                        text-3xl
                        font-medium
                        leading-none
                        text-neutral-950
                        sm:text-4xl
                        lg:text-5xl
                      "
                    >
                      {formatNumber(hours)}
                    </div>

                    <span className="mt-1 block text-[6px] font-semibold uppercase tracking-[0.15em] text-black sm:mt-2 sm:text-[7px] sm:tracking-[0.2em]">
                      Hours
                    </span>

                  </div>


                  <span className="pb-4 text-lg text-black sm:pb-5 sm:text-xl">
                    :
                  </span>


                  {/* Minutes */}

                  <div className="text-center">

                    <div
                      className="
                        font-sans
                        text-3xl
                        font-medium
                        leading-none
                        text-neutral-950
                        sm:text-4xl
                        lg:text-5xl
                      "
                    >
                      {formatNumber(minutes)}
                    </div>

                    <span className="mt-1 block text-[6px] font-semibold uppercase tracking-[0.15em] text-black sm:mt-2 sm:text-[7px] sm:tracking-[0.2em]">
                      Minutes
                    </span>

                  </div>


                  <span className="pb-4 text-lg text-black sm:pb-5 sm:text-xl">
                    :
                  </span>


                  {/* Seconds */}

                  <div className="text-center">

                    <div
                      className="
                        font-sans
                        text-3xl
                        font-medium
                        leading-none
                        text-neutral-950
                        sm:text-4xl
                        lg:text-5xl
                      "
                    >
                      {formatNumber(seconds)}
                    </div>

                    <span className="mt-1 block text-[6px] font-semibold uppercase tracking-[0.15em] text-black sm:mt-2 sm:text-[7px] sm:tracking-[0.2em]">
                      Seconds
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            PRODUCTS
        ====================================================== */}

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">

          {dealProducts.map((product, index) => (
            <article
              key={product.id}
              className="group"
            >

              {/* Image */}

              <div className="relative aspect-[1.05] overflow-hidden bg-white">

                <Link
                  href={`/products/${product.id}`}
                  className="absolute inset-0"
                >

                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 1024px) 50vw,
                      33vw
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


                {/* Discount */}

                <div className="absolute left-3 top-3 z-10 sm:left-4 sm:top-4">

                  <span className="bg-neutral-950 px-2 py-1.5 text-[7px] font-semibold uppercase tracking-[0.15em] text-white sm:px-3 sm:py-2 sm:text-[8px]">
                    -{product.discount}%
                  </span>

                </div>


                {/* Product Number */}

                <div className="absolute right-3 top-3 z-10 sm:right-4 sm:top-4">

                  <span className="bg-white/95 px-2 py-1.5 text-[7px] font-medium tracking-[0.16em] text-neutral-900 backdrop-blur-sm sm:px-3 sm:py-2 sm:text-[8px]">
                    0{index + 1}
                  </span>

                </div>


                {/* Wishlist */}

                <button
                  type="button"
                  aria-label={`Add ${product.name} to wishlist`}
                  className="
                    absolute
                    bottom-3
                    right-3
                    z-20
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    text-neutral-900
                    transition-transform
                    duration-300
                    hover:scale-105
                    sm:bottom-4
                    sm:right-4
                    sm:h-10
                    sm:w-10
                  "
                >

                  <Heart
                    size={15}
                    strokeWidth={1.4}
                  />

                </button>

              </div>


              {/* Product Details */}

              <div className="pt-5">

                <p
                  className="
                    text-[8px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-neutral-400
                    sm:text-[9px]
                  "
                >
                  {product.category}
                </p>


                <Link
                  href={`/products/${product.id}`}
                  className="block"
                >

                  <h3
                    className="
                      mt-2
                      font-sans
                      text-[20px]
                      font-medium
                      leading-none
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


                {/* Price */}

                <div className="mt-3 flex items-center gap-2 sm:gap-3">

                  <span className="text-[11px] font-semibold text-neutral-950 sm:text-[13px]">
                    ৳ {product.price.toLocaleString()}
                  </span>

                  <span className="text-[9px] text-neutral-400 line-through sm:text-[10px]">
                    ৳ {product.oldPrice.toLocaleString()}
                  </span>

                </div>


                {/* Progress */}

                <div className="mt-4">

                  <div className="mb-2 flex justify-between">

                    <span className="text-[6px] font-medium uppercase tracking-[0.12em] text-neutral-400 sm:text-[7px] sm:tracking-[0.15em]">
                      Selling Fast
                    </span>

                    <span className="text-[7px] text-neutral-500 sm:text-[8px]">
                      Limited Stock
                    </span>

                  </div>

                  <div className="h-[2px] w-full bg-neutral-200">

                    <div
                      className="h-full bg-neutral-900"
                      style={{
                        width:
                          index === 0
                            ? "78%"
                            : index === 1
                              ? "64%"
                              : "86%",
                      }}
                    />

                  </div>

                </div>

              </div>

            </article>
          ))}

        </div>


        {/* =====================================================
            CTA
        ====================================================== */}

        <div className="mt-12 flex justify-center sm:mt-16">

          <Link
            href="/shop?discount=true"
            className="
              group
              inline-flex
              h-11
              items-center
              gap-3
              border
              border-neutral-900
              px-6
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-neutral-900
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

            Shop The Sale

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