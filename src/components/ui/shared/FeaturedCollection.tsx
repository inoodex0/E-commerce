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
      <div className="mx-auto max-w-[1600px] px-4 pt-10 sm:px-8 sm:pt-20 lg:px-12 lg:pt-32 xl:px-16">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px w-8 bg-neutral-900" />
          <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-neutral-500">
            Our Collection
          </span>
        </div>
        <h2 className="font-sans text-[clamp(1.8rem,6vw,6rem)] font-medium leading-[0.85] tracking-[-0.04em] text-neutral-950">
          Details That <span className="text-neutral-500">Define You.</span>
        </h2>
      </div>

      {/* Collection Panels */}
      {collections.map((item, index) => (
        <div
          key={item.href}
          className={`fc-panel mt-12 lg:mt-16 overflow-hidden ${
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
              <div className="sticky top-0 h-[50vh] max-h-[400px] p-2 sm:h-[80vh] sm:max-h-[700px] sm:p-5 lg:p-8">
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
              className={`flex items-center justify-center px-4 py-10 sm:px-8 sm:py-20 lg:px-14 lg:py-0 xl:px-16 ${
                index % 2 === 1 ? "lg:order-1" : ""
              }`}
            >
              <div className="sticky top-0 flex h-[50vh] max-h-[400px] max-w-xl flex-col justify-center sm:h-[80vh] sm:max-h-[700px]">
                <div className="fc-content">
                  {/* Tag */}
                  <div className="mb-7 flex items-center gap-4">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-neutral-400">
                      {item.tag}
                    </span>
                    <span className="h-px w-12 bg-neutral-900/20" />
                  </div>

                  {/* Heading */}
                  <h3 className="max-w-xl font-sans text-[clamp(2rem,4vw,4.3rem)] font-medium leading-[0.95] tracking-[-0.025em] text-neutral-900">
                    {item.title.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i === 0 && <br />}
                      </span>
                    ))}
                  </h3>

                  {/* Description */}
                  <p className="relative mt-7 max-w-md font-sans text-[13px] leading-7 text-neutral-500">
                    {item.description}
                  </p>

                  {/* CTA */}
                  <Link
                    href={item.href}
                    className="group/btn relative mt-7 flex h-11 w-fit items-center gap-3 border border-neutral-900 px-6 text-[8px] font-semibold uppercase tracking-[0.18em] text-neutral-900 transition-all duration-300 hover:border-[#fd6f93] hover:bg-[#fd6f93] hover:text-white sm:mt-9 sm:h-12 sm:px-7 sm:text-[9px] sm:tracking-[0.2em]"
                  >
                    {item.cta}
                    <ArrowRight
                      size={14}
                      strokeWidth={1.4}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </Link>

                  {/* Decorative ring */}
                  <div className="pointer-events-none absolute -bottom-12 -right-8 h-32 w-56 rotate-[-10deg] opacity-[0.06] sm:h-40 sm:w-72">
                    <div className="h-full w-full rounded-full border-[18px] border-neutral-900" />
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
