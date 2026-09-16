"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
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
            SALE BANNER — Flash Sale Style
        ====================================================== */}

        <div className="relative mt-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#e8446d] via-[#fd6f93] to-[#c72d55] shadow-xl shadow-[#fd6f93]/30">

          {/* Bokeh / light dots */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[10%] top-[15%] h-3 w-3 rounded-full bg-yellow-300/40 blur-[1px]" />
            <div className="absolute left-[25%] top-[60%] h-2 w-2 rounded-full bg-yellow-200/50 blur-[1px]" />
            <div className="absolute left-[40%] top-[20%] h-4 w-4 rounded-full bg-white/20 blur-[2px]" />
            <div className="absolute left-[55%] top-[70%] h-2 w-2 rounded-full bg-yellow-300/30 blur-[1px]" />
            <div className="absolute left-[70%] top-[25%] h-3 w-3 rounded-full bg-white/15 blur-[2px]" />
            <div className="absolute left-[85%] top-[55%] h-2 w-2 rounded-full bg-yellow-200/40 blur-[1px]" />
            <div className="absolute left-[15%] top-[80%] h-2 w-2 rounded-full bg-white/20 blur-[1px]" />
            <div className="absolute left-[60%] top-[40%] h-5 w-5 rounded-full bg-yellow-100/15 blur-[3px]" />
            <div className="absolute left-[80%] top-[85%] h-3 w-3 rounded-full bg-yellow-300/20 blur-[2px]" />
            <div className="absolute left-[35%] top-[45%] h-2 w-2 rounded-full bg-white/25 blur-[1px]" />
          </div>

          {/* Confetti pieces */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute left-[8%] top-[10%] h-4 w-1 rotate-45 bg-yellow-400/50" />
            <div className="absolute left-[18%] top-[75%] h-3 w-1 -rotate-30 bg-pink-300/40" />
            <div className="absolute left-[32%] top-[8%] h-1 w-4 rotate-[60deg] bg-yellow-300/50" />
            <div className="absolute left-[48%] top-[82%] h-3 w-1 rotate-12 bg-white/30" />
            <div className="absolute left-[62%] top-[12%] h-4 w-1 -rotate-45 bg-yellow-200/40" />
            <div className="absolute left-[75%] top-[78%] h-1 w-3 rotate-[75deg] bg-pink-200/40" />
            <div className="absolute left-[88%] top-[15%] h-3 w-1 rotate-[30deg] bg-yellow-400/40" />
            <div className="absolute left-[42%] top-[5%] h-1 w-4 -rotate-20 bg-white/25" />
          </div>

          {/* Large decorative circle */}
          <div className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border-[3px] border-dashed border-white/10" />
          <div className="pointer-events-none absolute -left-12 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full border-2 border-white/5" />

          <div className="relative grid grid-cols-1 lg:grid-cols-[auto_1fr]">

            {/* Left — Timer */}
            <div className="flex items-center border-b border-white/15 lg:border-b-0 lg:border-r">

              <div className="flex items-center gap-4 px-8 py-10 sm:gap-6 sm:px-12 lg:px-14">

                {/* Hours */}
                <div className="text-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-black/20 shadow-inner" />
                    <div className="relative font-sans text-3xl font-bold leading-none text-white sm:text-4xl lg:text-5xl tabular-nums px-4 py-3">
                      {formatNumber(hours)}
                    </div>
                  </div>
                  <span className="mt-2 block text-[7px] font-bold uppercase tracking-[0.2em] text-white/50 sm:text-[8px]">
                    Hours
                  </span>
                </div>

                <span className="pb-5 text-2xl font-bold text-yellow-300/60">:</span>

                {/* Minutes */}
                <div className="text-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-black/20 shadow-inner" />
                    <div className="relative font-sans text-3xl font-bold leading-none text-white sm:text-4xl lg:text-5xl tabular-nums px-4 py-3">
                      {formatNumber(minutes)}
                    </div>
                  </div>
                  <span className="mt-2 block text-[7px] font-bold uppercase tracking-[0.2em] text-white/50 sm:text-[8px]">
                    Minutes
                  </span>
                </div>

                <span className="pb-5 text-2xl font-bold text-yellow-300/60">:</span>

                {/* Seconds */}
                <div className="text-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-black/20 shadow-inner" />
                    <div className="relative font-sans text-3xl font-bold leading-none text-white sm:text-4xl lg:text-5xl tabular-nums px-4 py-3">
                      {formatNumber(seconds)}
                    </div>
                  </div>
                  <span className="mt-2 block text-[7px] font-bold uppercase tracking-[0.2em] text-white/50 sm:text-[8px]">
                    Seconds
                  </span>
                </div>

              </div>
            </div>

            {/* Right — Content */}
            <div className="flex flex-col justify-center px-8 py-10 sm:px-12 sm:py-12 lg:px-16">

              {/* Special Offer tag */}
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-yellow-300/80">
                ✦ Special Offer
              </span>

              {/* Flash Sale title */}
              <h3 className="mt-3 font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[0.85] text-white uppercase">
                Flash<br />Sale
              </h3>

              {/* Discount */}
              <p className="mt-4 font-serif text-xl font-medium text-white sm:text-2xl">
                Up to <span className="text-yellow-300 font-bold">20% Off</span>
              </p>

              {/* Shop Now + Limited */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/deals/flash-sale"
                  className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-7 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#c72d55] shadow-lg shadow-yellow-400/20 transition-all duration-300 hover:bg-yellow-300 hover:shadow-xl"
                >
                  Shop Now
                  <ArrowRight size={12} />
                </Link>
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">
                  ⚡ Limited Time Only ⚡
                </span>
              </div>

            </div>
          </div>
        </div>


        {/* =====================================================
            PRODUCTS
        ====================================================== */}

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">

          {dealProducts.map((product, index) => (
            <article
              key={product.id}
              className="group"
            >

              {/* Image */}

              <div className="relative aspect-[0.88] overflow-hidden bg-white">

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
                    text-[7px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-neutral-400
                    sm:text-[8px]
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
                      mt-1.5
                      font-sans
                      text-[14px]
                      font-medium
                      leading-tight
                      text-neutral-950
                      transition-opacity
                      duration-300
                      group-hover:opacity-60
                      sm:text-[15px]
                    "
                  >
                    {product.name}
                  </h3>

                </Link>


                {/* Price */}

                <div className="mt-2 flex items-center gap-1.5 sm:gap-2">

                  <span className="text-[11px] font-semibold text-neutral-950 sm:text-[13px]">
                    ৳ {product.price.toLocaleString()}
                  </span>

                  <span className="text-[9px] text-neutral-400 line-through sm:text-[10px]">
                    ৳ {product.oldPrice.toLocaleString()}
                  </span>

                </div>


                {/* Progress */}

                <div className="mt-3">

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