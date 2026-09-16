import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const milestones = [
  { year: "2018", title: "The Beginning", desc: "Founded in Dhaka with a vision to redefine luxury accessories for the modern era." },
  { year: "2019", title: "First Collection", desc: "Launched our debut leather goods collection, earning recognition from fashion editors worldwide." },
  { year: "2021", title: "Global Expansion", desc: "Opened flagship studios in London and Dubai, bringing ZURII to the international stage." },
  { year: "2023", title: "Sustainability Pledge", desc: "Committed to 100% sustainable sourcing and carbon-neutral operations by 2025." },
  { year: "2025", title: "New Era", desc: "Launching our most ambitious collection yet — merging heritage craft with futuristic design." },
];

const values = [
  {
    title: "Craftsmanship",
    desc: "Every piece is handcrafted by master artisans with decades of experience, ensuring flawless execution.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.18A1.5 1.5 0 014 17.09V5.91a1.5 1.5 0 012.036-1.41l5.384 3.18a1.5 1.5 0 010 2.58z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.58 9.42l5.384-3.18A1.5 1.5 0 0122 7.41v11.18a1.5 1.5 0 01-2.036 1.41l-5.384-3.18a1.5 1.5 0 010-2.58z" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    desc: "We push boundaries with cutting-edge materials and technology, reimagining what luxury can be.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    title: "Quality",
    desc: "From Italian leather to Swiss mechanisms, we select only the finest materials for uncompromising quality.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    title: "Sustainability",
    desc: "Our commitment to the planet drives every decision — from ethical sourcing to eco-conscious packaging.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
];

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3]">

      {/* ═══ Hero with Image ═══ */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="/images/a4.avif"
          alt="ZURII Craftsmanship"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#171412]/80 via-[#171412]/60 to-[#171412]/90" />
        {/* Pink accent line */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#fd6f93] via-[#fd8faa] to-[#fd6f93]" />

        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#fd6f93] sm:text-xs">Est. 2018 — Dhaka, Bangladesh</p>
          <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
            Our <span className="text-[#fd6f93]">Story</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
            A journey of passion, precision, and the relentless pursuit of perfection.
          </p>
        </div>
      </section>

      {/* ═══ Mission Statement ═══ */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <svg className="mx-auto h-8 w-8 text-[#fd6f93]/30" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
          <p className="mt-6 font-serif text-xl leading-relaxed text-[#171412] sm:text-2xl lg:text-3xl">
            Luxury should be felt in every detail — from the weight of the leather in your hand to the click of a clasp.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#fd6f93]" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Our Philosophy</p>
            <div className="h-px w-8 bg-[#fd6f93]" />
          </div>
        </div>
      </section>

      {/* ═══ Image + Text Blocks ═══ */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-20 lg:space-y-28">

          {/* Block 1 — Craftsmanship */}
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="group relative overflow-hidden border border-[#E7E1D8] bg-[#E7E1D8]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/a1.jpg"
                  alt="Craftsmanship"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Overlay border accent on hover */}
              <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-[#fd6f93]/30" />
              {/* Corner tag */}
              <div className="absolute left-4 top-4 bg-[#171412] px-3 py-1.5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white">01</span>
              </div>
            </div>
            <div className="space-y-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#fd6f93]">Craftsmanship</p>
              <h2 className="font-serif text-2xl font-medium text-[#171412] sm:text-3xl">Handcrafted<br />With Soul</h2>
              <div className="h-px w-12 bg-[#fd6f93]" />
              <p className="text-sm leading-relaxed text-[#6B6560]">
                Every ZURII piece begins as a sketch and evolves through hundreds of hours of meticulous handwork.
                Our artisans — many with over 20 years of experience — bring each design to life with techniques
                passed down through generations. We don&apos;t mass-produce; we create one masterpiece at a time.
              </p>
              <p className="text-sm leading-relaxed text-[#6B6560]">
                From hand-stitching to edge-painting, from burnishing to embossing — every detail is a testament
                to the human hand behind the product.
              </p>
            </div>
          </div>

          {/* Block 2 — Materials */}
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 space-y-5 lg:order-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#fd6f93]">Materials</p>
              <h2 className="font-serif text-2xl font-medium text-[#171412] sm:text-3xl">Only The<br />Finest</h2>
              <div className="h-px w-12 bg-[#fd6f93]" />
              <p className="text-sm leading-relaxed text-[#6B6560]">
                We source exclusively from the world&apos;s most renowned tanneries and mills. Vegetable-tanned Italian
                leather that ages beautifully with time. Precision-machined stainless steel. Swiss-made movements.
                Every material is chosen not just for its beauty, but for its integrity and longevity.
              </p>
              <p className="text-sm leading-relaxed text-[#6B6560]">
                Our leather is tanned using centuries-old methods that produce rich patinas — meaning your ZURII
                piece gets more beautiful the longer you own it.
              </p>
            </div>
            <div className="order-1 group relative overflow-hidden border border-[#E7E1D8] bg-[#E7E1D8] lg:order-2">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/a2.avif"
                  alt="Premium Materials"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-[#fd6f93]/30" />
              <div className="absolute left-4 top-4 bg-[#171412] px-3 py-1.5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white">02</span>
              </div>
            </div>
          </div>

          {/* Block 3 — Design */}
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="group relative overflow-hidden border border-[#E7E1D8] bg-[#E7E1D8]">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/a3avif.avif"
                  alt="Design Philosophy"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-[#fd6f93]/30" />
              <div className="absolute left-4 top-4 bg-[#171412] px-3 py-1.5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white">03</span>
              </div>
            </div>
            <div className="space-y-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#fd6f93]">Design</p>
              <h2 className="font-serif text-2xl font-medium text-[#171412] sm:text-3xl">Where Heritage<br />Meets Future</h2>
              <div className="h-px w-12 bg-[#fd6f93]" />
              <p className="text-sm leading-relaxed text-[#6B6560]">
                Our design philosophy is rooted in tension — the space between tradition and innovation. We draw
                inspiration from architectural geometry, natural textures, and the quiet confidence of minimalism.
                The result is accessories that feel timeless yet unmistakably modern.
              </p>
              <p className="text-sm leading-relaxed text-[#6B6560]">
                Each collection tells a story. Each piece is designed to be the one you reach for every day — the
                one that becomes part of your identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Image Grid ═══ */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
            {[
              { src: "/images/a4.avif", alt: "Detail 1", label: "Heritage" },
              { src: "/images/a5.avif", alt: "Detail 2", label: "Precision" },
              { src: "/images/a6.avif", alt: "Detail 3", label: "Elegance" },
            ].map((img) => (
              <div key={img.src} className="group relative overflow-hidden border border-[#E7E1D8] bg-[#E7E1D8]">
                <div className="relative aspect-square">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#171412]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="w-full p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#fd6f93]">{img.label}</p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-[#fd6f93]/30" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Values ═══ */}
      <section className="bg-[#171412] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#fd6f93] sm:text-xs">What Drives Us</p>
            <h2 className="mt-3 font-serif text-2xl font-medium text-white sm:text-3xl">Our <span className="text-[#fd6f93]">Values</span></h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="group border border-white/10 bg-white/5 p-6 transition-all duration-500 hover:border-[#fd6f93]/40 hover:bg-[#fd6f93]/5 hover:shadow-lg hover:shadow-[#fd6f93]/5">
                <div className="text-[#fd6f93] transition-transform duration-500 group-hover:scale-110">{v.icon}</div>
                <h3 className="mt-4 text-sm font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/50">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Timeline ═══ */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#fd6f93] sm:text-xs">Milestones</p>
            <h2 className="mt-3 font-serif text-2xl font-medium text-[#171412] sm:text-3xl">Our <span className="text-[#fd6f93]">Journey</span></h2>
          </div>

          {/* Desktop: Alternating cards */}
          <div className="relative mt-14 hidden sm:block">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-px bg-gradient-to-b from-[#E7E1D8] via-[#fd6f93]/30 to-[#E7E1D8]" />

            <div className="space-y-12">
              {milestones.map((m, i) => (
                <div key={m.year} className={`relative flex items-center ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  {/* Dot */}
                  <div className="absolute left-1/2 flex h-4 w-4 -translate-x-2 items-center justify-center">
                    <div className="h-3 w-3 rounded-full border-2 border-[#fd6f93] bg-white" />
                  </div>

                  {/* Content card — left or right */}
                  <div className={`w-[calc(50%-32px)] ${i % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <div className="group relative overflow-hidden border border-[#E7E1D8] bg-white p-6 transition-all duration-500 hover:border-[#fd6f93]/30 hover:shadow-lg hover:shadow-[#fd6f93]/5">
                      {/* Large faded number */}
                      <div className={`pointer-events-none absolute top-2 font-serif text-[80px] font-bold leading-none text-[#E7E1D8]/50 transition-colors duration-500 group-hover:text-[#fd6f93]/10 ${i % 2 === 0 ? "right-4" : "left-4"}`}>
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="relative">
                        <span className="text-xs font-bold tracking-wider text-[#fd6f93]">{m.year}</span>
                        <h3 className="mt-1 font-serif text-base font-medium text-[#171412]">{m.title}</h3>
                        <div className={`my-2 h-px w-6 bg-[#fd6f93]/40 transition-all duration-500 group-hover:w-10 group-hover:bg-[#fd6f93] ${i % 2 === 0 ? "ml-auto" : ""}`} />
                        <p className="text-xs leading-relaxed text-[#6B6560]">{m.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="w-[calc(50%-32px)]" />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Simple vertical list */}
          <div className="relative mt-12 sm:hidden">
            <div className="absolute left-[15px] top-0 h-full w-px bg-gradient-to-b from-[#E7E1D8] via-[#fd6f93]/30 to-[#E7E1D8]" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative flex items-start gap-5">
                  <div className="relative flex h-[30px] w-[30px] shrink-0 items-center justify-center">
                    <div className="h-3 w-3 rounded-full border-2 border-[#fd6f93] bg-white" />
                  </div>
                  <div className="relative overflow-hidden border border-[#E7E1D8] bg-white p-4 transition-all duration-300 hover:border-[#fd6f93]/30">
                    {/* Large faded number */}
                    <div className="pointer-events-none absolute -right-2 -top-3 font-serif text-[60px] font-bold leading-none text-[#E7E1D8]/50">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="relative">
                      <span className="text-xs font-bold tracking-wider text-[#fd6f93]">{m.year}</span>
                      <h3 className="mt-1 font-serif text-sm font-medium text-[#171412]">{m.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#6B6560]">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Closing CTA ═══ */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden border border-[#E7E1D8] bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="group relative hidden overflow-hidden md:block">
              <Image
                src="/images/a5.avif"
                alt="ZURII Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#171412]/10" />
            </div>
            <div className="flex flex-col items-start justify-center p-8 sm:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#fd6f93]">Become Part of the Story</p>
              <h2 className="mt-3 font-serif text-2xl font-medium text-[#171412]">Experience ZURII</h2>
              <div className="mt-3 h-px w-8 bg-[#fd6f93]" />
              <p className="mt-4 text-sm leading-relaxed text-[#6B6560]">
                Discover why thousands of discerning customers choose ZURII for the moments that matter.
              </p>
              <div className="mt-6 flex gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 border border-[#171412] bg-[#171412] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#fd6f93] hover:border-[#fd6f93]"
                >
                  Shop Collection
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-[#E7E1D8] bg-white px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#171412] transition-colors hover:border-[#fd6f93] hover:text-[#fd6f93]"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
