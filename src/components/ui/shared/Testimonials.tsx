"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Nusrat Jahan",
    role: "Style Enthusiast",
    image: "/images/testimonials/user-1.jpg",
    text: "I absolutely loved the quality and finishing. Every piece feels elegant, premium and beautifully made. It has quickly become one of my favorite accessories.",
  },
  {
    id: 2,
    name: "Sadia Rahman",
    role: "Verified Customer",
    image: "/images/testimonials/user-2.jpg",
    text: "The design is even more beautiful in person. The packaging was elegant, delivery was quick and the quality exceeded my expectations.",
  },
  {
    id: 3,
    name: "Maliha Ahmed",
    role: "Fashion Lover",
    image: "/images/testimonials/user-3.jpg",
    text: "I was looking for something simple but sophisticated, and I found exactly that here. The accessories are timeless and work perfectly with my everyday style.",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const current = testimonials[active];

  const previous = () => {
    setActive((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const next = () => {
    setActive((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[#fd6f93]/10 py-10 sm:py-12 lg:py-16">

      {/* =====================================================
          DECORATIVE BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute -left-10 bottom-0 opacity-100 sm:-left-2 sm:bottom-4 lg:left-16">
        <div className="h-[140px] w-[170px] overflow-hidden sm:h-[320px] sm:w-[380px] lg:h-[450px] lg:w-[520px]">
          <Image
            src="/images/products/m-h-bg-icons.png"
            alt=""
            width={600}
            height={600}
            className="h-full w-full object-cover object-right-top saturate-[3] brightness-[0.5] contrast-[1.5] hue-rotate-[-20deg]"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute -right-6 top-0 opacity-100 sm:-right-2 sm:top-0 lg:right-12">
        <div className="h-[120px] w-[150px] overflow-hidden sm:h-[280px] sm:w-[340px] lg:h-[380px] lg:w-[450px]">
          <Image
            src="/images/products/m-h-bg-icons.png"
            alt=""
            width={500}
            height={500}
            className="h-full w-full object-cover object-left-bottom saturate-[3] brightness-[0.5] contrast-[1.5] hue-rotate-[-20deg]"
          />
        </div>
      </div>


      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="relative z-10 text-center">

          <p
            className="
              font-[family-name:var(--font-dancing-script)]
              text-3xl
              italic
              leading-none
              text-[#fd6f93]/60
              sm:text-4xl
            "
          >
            perfect shades
          </p>

          <h2
            className="
              mt-1
              font-[family-name:var(--font-cormorant)]
              text-[clamp(2rem,3.5vw,3.5rem)]
              font-normal
              uppercase
              leading-none
              tracking-[0.02em]
              text-neutral-950
            "
          >
            Testimonials
          </h2>

          <div className="mx-auto mt-4 flex items-center justify-center gap-2">
            <span className="h-px w-20 bg-neutral-300" />
          </div>

        </div>


        {/* =====================================================
            TESTIMONIAL AREA
        ====================================================== */}

        <div className="relative mx-auto mt-4 max-w-6xl sm:mt-2">

          {/* =================================================
              PREVIOUS BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={previous}
            aria-label="Previous testimonial"
            className="
              absolute
              left-0
              top-1/2
              z-20
              hidden
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-neutral-400
              bg-transparent
              text-neutral-800
              transition-all
              duration-300
              hover:border-neutral-900
              hover:bg-neutral-900
              hover:text-white
              sm:flex
              sm:h-12
              sm:w-12
              lg:left-2
            "
          >
            <ChevronLeft
              size={20}
              strokeWidth={1.2}
            />
          </button>


          {/* =================================================
              NEXT BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="
              absolute
              right-0
              top-1/2
              z-20
              hidden
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-neutral-400
              bg-transparent
              text-neutral-800
              transition-all
              duration-300
              hover:border-neutral-900
              hover:bg-neutral-900
              hover:text-white
              sm:flex
              sm:h-12
              sm:w-12
              lg:right-2
            "
          >
            <ChevronRight
              size={20}
              strokeWidth={1.2}
            />
          </button>


          {/* =================================================
              CONTENT
          ================================================== */}

          <div
            key={current.id}
            className="
              mx-auto
              max-w-3xl
              px-6
              text-center
              sm:px-14
              lg:px-20
            "
          >

            {/* Quote icon */}

            <div className="mb-6 flex justify-center">

              <Quote
                size={20}
                strokeWidth={1}
                className="text-neutral-300"
              />

            </div>


            {/* Review */}

            <p
              className="
                font-[family-name:var(--font-cormorant)]
                text-[clamp(1rem,1.8vw,1.5rem)]
                font-medium
                italic
                leading-[1.35]
                tracking-[-0.01em]
                text-neutral-800
                line-clamp-2
              "
            >
              “{current.text}”
            </p>

            <p
              className="
                mt-4
                font-[family-name:var(--font-cormorant)]
                text-sm
                italic
                text-neutral-400
                sm:mt-6
                sm:text-base
              "
            >
              — {current.name} —
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}