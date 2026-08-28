"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export default function FeaturedCollection() {
  return (
    <section className="w-full bg-white py-14 sm:py-20 lg:py-32">

      <div className="mx-auto max-w-[1600px] px-0 sm:px-8 lg:px-12 xl:px-16">

        {/* =====================================================
            SECTION INTRO
        ====================================================== */}

        <div className="px-5 sm:px-0">

          <div className="mb-4 flex items-center gap-3">

            <span className="h-px w-8 bg-neutral-900" />

            <span
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.28em]
                text-neutral-500
              "
            >
              Our Collection
            </span>

          </div>

          <h2
            className="
              font-sans
              text-[clamp(2.2rem,6vw,6rem)]
              font-medium
              leading-[0.85]
              tracking-[-0.04em]
              text-neutral-950
            "
          >
            Details That{" "}
            <span className="text-neutral-500">
              Define You.
            </span>
          </h2>

        </div>


        {/* =====================================================
            EDITORIAL GRID
        ====================================================== */}

        <div
          className="
            mt-12
            grid
            grid-cols-1
            lg:mt-16
            lg:grid-cols-2
          "
        >

          {/* =================================================
              BLOCK 01 — IMAGE
          ================================================== */}

          <div
            className="
              group
              relative
              aspect-[1/1]
              overflow-hidden
              border-b
              border-neutral-200
              lg:border-r
            "
          >

            <Image
              src="/images/collections/3.avif"
              alt="Signature accessories collection"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="
                object-cover
                transition-transform
                duration-[1200ms]
                ease-out
                group-hover:scale-[1.035]
              "
            />

          </div>


          {/* =================================================
              BLOCK 02 — TEXT
          ================================================== */}

          <div
            className="
              relative
              flex
              min-h-[350px]
              flex-col
              justify-center
              overflow-hidden
              border-b
              border-neutral-200
              bg-white
              px-5
              py-10
              sm:px-8
              sm:py-14
              lg:min-h-0
              lg:px-14
              xl:px-16
            "
          >

            {/* Small heading */}

            <div className="mb-7 flex items-center gap-4">

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.24em]
                  text-neutral-900
                "
              >
                Signature Accessories
              </span>

              <span className="h-px w-12 bg-neutral-900" />

            </div>


            {/* Main Heading */}

            <h3
              className="
                max-w-xl
                font-sans
                text-[clamp(2.2rem,4vw,4.3rem)]
                font-medium
                leading-[0.95]
                tracking-[-0.025em]
                text-neutral-900
              "
            >
              Timeless pieces
              <br />
              made to be remembered.
            </h3>


            {/* Description */}

            <p
              className="
                mt-7
                max-w-xl
                font-sans
                text-[12px]
                leading-6
                text-neutral-500
                sm:text-[13px]
                sm:leading-7
              "
            >
              From refined jewelry to statement accessories,
              discover carefully selected pieces designed to
              complement your individual style and elevate
              every everyday moment.
            </p>


            {/* Buttons */}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 sm:mt-9">
              <Link
                href="/collections/signature"
                className="
                  group/button
                  flex
                  h-12
                  w-fit
                  items-center
                  gap-4
                  border
                  border-neutral-900
                  px-7
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-neutral-900
                  transition-all
                  duration-300
                  hover:bg-[#ff6289]
                  hover:border-[#ff6289]
                  hover:text-white
                "
              >
                Discover Collection
                <ArrowRight
                  size={14}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover/button:translate-x-1"
                />
              </Link>

            
            </div>


            {/* Decorative Product */}

            <div
              className="
                pointer-events-none
                absolute
                -bottom-12
                -right-8
                h-32
                w-56
                rotate-[-10deg]
                opacity-[0.08]
                sm:h-40
                sm:w-72
              "
            >
              <div className="h-full w-full rounded-full border-[18px] border-neutral-900" />
            </div>

          </div>


          {/* =================================================
              BLOCK 03 — TEXT
          ================================================== */}

          <div
            className="
              relative
              flex
              min-h-[350px]
              flex-col
              justify-center
              overflow-hidden
              border-b
              border-neutral-200
              bg-[#FAF9F7]
              px-5
              py-10
              sm:px-8
              sm:py-14
              lg:min-h-0
              lg:px-14
              xl:px-16
            "
          >

            {/* Watermark */}

       


            {/* Number */}

            <span
              className="
                relative
                mb-7
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-neutral-400
              "
            >
               Everyday Collection
            </span>


            {/* Heading */}

            <h3
              className="
                relative
                max-w-xl
                font-sans
                text-[clamp(2.4rem,4vw,4.5rem)]
                font-medium
                leading-[0.9]
                tracking-[-0.03em]
                text-neutral-950
              "
            >
              What you wear
              <br />
              <span className="text-neutral-500">
                says everything.
              </span>
            </h3>


            {/* Description */}

            <p
              className="
                relative
                mt-7
                max-w-xl
                font-sans
                text-[12px]
                leading-6
                text-neutral-500
                sm:text-[13px]
                sm:leading-7
              "
            >
              Everyday essentials created for modern
              living. Simple, versatile and effortlessly
              sophisticated pieces that work with your
              personal style.
            </p>

            <Link
              href="/collections/essentials"
              className="
                group/button
                relative
                mt-9
                flex
                w-fit
                items-center
                gap-4
                border
                border-neutral-900
                px-7
                h-12
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-neutral-900
                transition-all
                duration-300
                hover:bg-[#ff6289]
                hover:border-[#ff6289]
                hover:text-white
              "
            >
              Explore Essentials
              <ArrowRight
                size={14}
                strokeWidth={1.4}
                className="transition-transform duration-300 group-hover/button:translate-x-1"
              />
            </Link>
            

          </div>
          


          {/* =================================================
              BLOCK 04 — IMAGE
          ================================================== */}

          <div
            className="
              group
              relative
              aspect-[1/1]
              overflow-hidden
              border-b
              border-neutral-200
            "
          >

            <Image
              src="/images/collections/accessories.avif"
              alt="Everyday accessories collection"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="
                object-cover
                transition-transform
                duration-[1200ms]
                ease-out
                group-hover:scale-[1.035]
              "
            />


            {/* Image overlay */}

            <div
              className="
                absolute
                inset-0
                bg-black/0
                transition-colors
                duration-700
                group-hover:bg-black/[0.04]
              "
            />


            {/* Number */}

            <div
              className="
                absolute
                left-6
                top-6
                sm:left-8
                sm:top-8
              "
            >

           

            </div>


            {/* Arrow */}

          </div>

        </div>


        {/* =====================================================
            BOTTOM STATEMENT
        ====================================================== */}

    

      </div>
    </section>
  );
}