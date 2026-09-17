"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const collections = [
  {
    tag: "Signature Accessories",
    title: "Timeless pieces\nmade to be remembered.",
    description:
      "From refined jewelry to statement accessories, discover carefully selected pieces designed to complement your individual style.",
    href: "/collections/signature",
    cta: "Discover Collection",
    image: "/images/a5.avif",
  },
  {
    tag: "Everyday Collection",
    title: "What you wear\nsays everything.",
    description:
      "Everyday essentials created for modern living. Simple, versatile and effortlessly sophisticated pieces that work with your personal style.",
    href: "/collections/essentials",
    cta: "Explore Essentials",
    image: "/images/collections/accessories.avif",
  },
];

export default function FeaturedCollection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const panels = sectionRef.current.querySelectorAll<HTMLElement>(".fc-panel");
    const images = sectionRef.current.querySelectorAll<HTMLElement>(".fc-image");

    panels.forEach((panel, i) => {
      gsap.fromTo(
        panel.querySelector(".fc-content"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        images[i],
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full">
      {/* Section Intro */}
      <div className="mx-auto max-w-[1600px] px-4 pt-10 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20 xl:px-16">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-neutral-900" />
          <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-neutral-500">
            Our Collection
          </span>
        </div>
        <h2 className="font-sans text-[clamp(1.5rem,4vw,3.5rem)] font-medium leading-[0.9] tracking-[-0.03em] text-neutral-950">
          Details That <span className="text-neutral-500">Define You.</span>
        </h2>
      </div>

      {/* Collection Panels */}
      {collections.map((item, index) => (
        <div
          key={item.href}
          className={`fc-panel mt-8 lg:mt-10 overflow-hidden ${
            index % 2 === 0 ? "" : "bg-[#FAF9F7]"
          }`}
        >
          <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-2">
            {/* Image Side — sticky */}
            <div
              className={`relative overflow-hidden ${
                index % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <div className="sticky top-0 h-[35vh] max-h-[280px] p-2 sm:h-[50vh] sm:max-h-[420px] sm:p-4 lg:p-6">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.tag}
                    fill
                    sizes="50vw"
                    className="fc-image object-cover"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                </div>
              </div>
            </div>

            {/* Content Side — sticky */}
            <div
              className={`flex items-center justify-center px-4 py-8 sm:px-8 sm:py-12 lg:px-12 lg:py-0 xl:px-14 ${
                index % 2 === 1 ? "lg:order-1" : ""
              }`}
            >
              <div className="sticky top-0 flex h-[35vh] max-h-[280px] max-w-xl flex-col justify-center sm:h-[50vh] sm:max-h-[420px]">
                <div className="fc-content">
                  {/* Tag */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-[8px] font-semibold uppercase tracking-[0.24em] text-neutral-400">
                      {item.tag}
                    </span>
                    <span className="h-px w-8 bg-neutral-900/20" />
                  </div>

                  {/* Heading */}
                  <h3 className="max-w-xl font-sans text-[clamp(1.4rem,3vw,2.8rem)] font-medium leading-[0.95] tracking-[-0.025em] text-neutral-900">
                    {item.title.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i === 0 && <br />}
                      </span>
                    ))}
                  </h3>

                  {/* Description */}
                  <p className="relative mt-4 max-w-md font-sans text-[12px] leading-6 text-neutral-500">
                    {item.description}
                  </p>

                  {/* CTA */}
                  <Link
                    href={item.href}
                    className="group/btn relative mt-5 flex h-10 w-fit items-center gap-3 rounded-full border border-[#171412] bg-white px-5 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#171412] transition-all duration-300 hover:border-[#E8852A] hover:bg-[#E8852A] hover:text-white sm:mt-6 sm:h-11 sm:px-6 sm:text-[9px] sm:tracking-[0.2em]"
                  >
                    {item.cta}
                    <ArrowRight
                      size={13}
                      strokeWidth={1.4}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </Link>

                  {/* Decorative ring */}
                  <div className="pointer-events-none absolute -bottom-8 -right-6 h-24 w-44 rotate-[-10deg] opacity-[0.06] sm:h-32 sm:w-56">
                    <div className="h-full w-full rounded-full border-[14px] border-neutral-900" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
