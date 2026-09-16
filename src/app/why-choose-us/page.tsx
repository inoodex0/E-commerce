import Image from "next/image";
import Link from "next/link";

const stats = [
  { number: "7+", label: "Years of Excellence" },
  { number: "50K+", label: "Happy Customers" },
  { number: "120+", label: "Unique Products" },
  { number: "15+", label: "Countries Served" },
];

const reasons = [
  {
    title: "Precision Engineering",
    desc: "Every component is crafted with sub-millimeter precision. From the stitching on a wallet to the movement in a watch — nothing is left to chance.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    title: "Sustainable Materials",
    desc: "Ethically sourced leathers, 100% recycled metals, and eco-conscious packaging. Luxury that respects the planet.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: "Express Worldwide Shipping",
    desc: "Insured global delivery right to your doorstep. Track every step of the journey with real-time updates.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21a2.25 2.25 0 002.25-2.25V6.375c0-1.125-.9-2.063-2.018-2.182a48.039 48.039 0 00-1.965-.149H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h3.284a48.056 48.056 0 011.965-.149m13.5 0h-3" />
      </svg>
    ),
  },
  {
    title: "Lifetime Warranty",
    desc: "We stand behind the craftsmanship of every item. If anything goes wrong, we&apos;ll repair or replace it — forever.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: "Handcrafted Quality",
    desc: "Each piece is handmade by master artisans with decades of experience. No machines, no shortcuts — just pure skill.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: "Personalization",
    desc: "Make it yours. Engraving, custom colors, monogramming — we help you create accessories that tell your story.",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
];

const guarantees = [
  { title: "Secure Payment", desc: "256-bit SSL encryption on every transaction.", icon: "🔒" },
  { title: "Free Returns", desc: "30-day hassle-free returns, no questions asked.", icon: "📦" },
  { title: "24/7 Support", desc: "Our team is always here to help you.", icon: "💬" },
  { title: "Authenticity", desc: "Every product comes with a certificate of authenticity.", icon: "✅" },
];

export default function WhyChooseUsPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3]">

      {/* ═══ Hero with Image ═══ */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src="/images/a6.avif"
          alt="NOVARA Quality"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#171412]/80 via-[#171412]/60 to-[#171412]/90" />
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#fd6f93] via-[#fd8faa] to-[#fd6f93]" />

        <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#fd6f93] sm:text-xs">The NOVARA Difference</p>
          <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
            Why Choose <span className="text-[#fd6f93]">Us</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
            We don&apos;t just make accessories — we craft experiences that last a lifetime.
          </p>
        </div>
      </section>

      {/* ═══ Stats Counter ═══ */}
      <section className="border-b border-[#E7E1D8] bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-3xl font-medium text-[#171412] sm:text-4xl">{s.number}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560] sm:text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Main Reasons Grid ═══ */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#fd6f93] sm:text-xs">What Sets Us Apart</p>
            <h2 className="mt-3 font-serif text-2xl font-medium text-[#171412] sm:text-3xl">Six Reasons to Choose <span className="text-[#fd6f93]">NOVARA</span></h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className="group relative overflow-hidden border border-[#E7E1D8] bg-white p-7 transition-all duration-500 hover:border-[#fd6f93]/30 hover:shadow-xl hover:shadow-[#fd6f93]/5"
              >
                {/* Number accent */}
                <div className="absolute right-2 top-0 font-serif text-[80px] font-bold leading-none text-[#E7E1D8]/40 transition-colors duration-500 group-hover:text-[#fd6f93]/10">
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="relative">
                  <div className="inline-flex items-center justify-center border border-[#fd6f93]/20 bg-[#fd6f93]/5 p-3 text-[#fd6f93] transition-all duration-500 group-hover:border-[#fd6f93]/40 group-hover:bg-[#fd6f93]/10">
                    {r.icon}
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-medium text-[#171412]">{r.title}</h3>
                  <div className="mt-2 h-px w-8 bg-[#fd6f93]/40 transition-all duration-500 group-hover:w-12 group-hover:bg-[#fd6f93]" />
                  <p className="mt-3 text-sm leading-relaxed text-[#6B6560]">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Image + Text — Quality Block ═══ */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-stretch gap-0 border border-[#E7E1D8] bg-white lg:grid-cols-2">
            {/* Image side */}
            <div className="group relative overflow-hidden bg-[#E7E1D8]">
              <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full">
                <Image
                  src="/images/a1.jpg"
                  alt="Quality Craftsmanship"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Gradient overlay bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#171412]/50 via-transparent to-transparent opacity-60" />
              {/* Badge */}
              <div className="absolute bottom-6 left-6 border border-white/20 bg-[#171412]/80 px-5 py-3 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#fd6f93]">Since 2018</p>
                <p className="text-xs text-white/70">Dhaka, Bangladesh</p>
              </div>
              {/* Corner pink accent */}
              <div className="absolute right-0 top-0 h-16 w-16">
                <svg viewBox="0 0 64 64" fill="none" className="h-full w-full">
                  <path d="M64,0 L64,64 L0,0 Z" fill="#fd6f93" opacity="0.15" />
                </svg>
              </div>
            </div>

            {/* Text side */}
            <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-12">
              {/* Decorative large quote mark */}
              <div className="pointer-events-none absolute right-6 top-6 font-serif text-[120px] leading-none text-[#E7E1D8]/40">&ldquo;</div>

              <div className="relative">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#fd6f93]">Our Promise</p>
                <h2 className="mt-3 font-serif text-2xl font-medium text-[#171412] sm:text-3xl">Quality Without<br />Compromise</h2>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-px w-8 bg-[#fd6f93]" />
                  <div className="h-1 w-1 rounded-full bg-[#fd6f93]" />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[#6B6560]">
                  We believe luxury is defined by what you <em>don&apos;t</em> compromise on. That&apos;s why every NOVARA
                  product undergoes 47 quality checks before it reaches your hands. From the tension of each
                  stitch to the polish on every clasp — perfection is not a goal, it&apos;s a standard.
                </p>
                <div className="mt-6 space-y-3.5">
                  {["Hand-selected premium materials", "47-point quality inspection", "Master artisan craftsmanship", "Sustainable production methods"].map((item, i) => (
                    <div key={item} className="group/check flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fd6f93]/10 transition-colors duration-300 group-hover/check:bg-[#fd6f93]/20">
                        <svg className="h-3.5 w-3.5 text-[#fd6f93]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-[#171412] transition-colors duration-300 group-hover/check:text-[#171412]">{item}</span>
                    </div>
                  ))}
                </div>
                {/* CTA */}
                <div className="mt-8">
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 border border-[#171412] bg-[#171412] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-[#fd6f93] hover:border-[#fd6f93]"
                  >
                    Explore Quality
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Image + Text — Experience Block ═══ */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-stretch gap-0 border border-[#E7E1D8] bg-white lg:grid-cols-2">
            {/* Text side */}
            <div className="relative flex flex-col justify-center p-8 sm:p-10 lg:p-12 order-2 lg:order-1">
              <div className="pointer-events-none absolute left-6 top-6 font-serif text-[120px] leading-none text-[#E7E1D8]/40">&ldquo;</div>
              <div className="relative">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#fd6f93]">The Experience</p>
                <h2 className="mt-3 font-serif text-2xl font-medium text-[#171412] sm:text-3xl">More Than a<br />Purchase</h2>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-px w-8 bg-[#fd6f93]" />
                  <div className="h-1 w-1 rounded-full bg-[#fd6f93]" />
                </div>
                <p className="mt-5 text-sm leading-relaxed text-[#6B6560]">
                  Buying a NOVARA product isn&apos;t just a transaction — it&apos;s the beginning of a relationship.
                  From the moment you unbox your order to years down the line when the leather has developed
                  its unique patina, we&apos;re with you every step of the way.
                </p>
                {/* Testimonial */}
                <div className="mt-6 border-l-2 border-[#fd6f93] pl-6 py-2">
                  <p className="font-serif text-sm italic leading-relaxed text-[#171412]">
                    &ldquo;The attention to detail is unlike anything I&apos;ve experienced. My NOVARA wallet is
                    three years old and looks better than the day I bought it.&rdquo;
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => (
                        <svg key={s} className="h-3 w-3 text-[#fd6f93]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#fd6f93]">— Customer Review</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image side */}
            <div className="order-1 group relative overflow-hidden bg-[#E7E1D8] lg:order-2">
              <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full">
                <Image
                  src="/images/a5.avif"
                  alt="Customer Experience"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#171412]/50 via-transparent to-transparent opacity-60" />
              {/* Badge */}
              <div className="absolute bottom-6 right-6 border border-white/20 bg-[#171412]/80 px-5 py-3 text-right backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#fd6f93]">4.9/5</p>
                <p className="text-xs text-white/70">Customer Rating</p>
              </div>
              {/* Corner pink accent */}
              <div className="absolute bottom-0 left-0 h-16 w-16">
                <svg viewBox="0 0 64 64" fill="none" className="h-full w-full">
                  <path d="M0,64 L0,0 L64,64 Z" fill="#fd6f93" opacity="0.15" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Guarantees Bar ═══ */}
      <section className="bg-[#171412] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#fd6f93] sm:text-xs">Your Protection</p>
            <h2 className="mt-3 font-serif text-2xl font-medium text-white sm:text-3xl">Our <span className="text-[#fd6f93]">Guarantees</span></h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g) => (
              <div key={g.title} className="group border border-white/10 bg-white/5 p-6 text-center transition-all duration-500 hover:border-[#fd6f93]/40 hover:bg-[#fd6f93]/5 hover:shadow-lg hover:shadow-[#fd6f93]/5">
                <div className="text-3xl">{g.icon}</div>
                <h3 className="mt-4 text-sm font-semibold text-white">{g.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/50">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Process Steps ═══ */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#fd6f93] sm:text-xs">How It Works</p>
            <h2 className="mt-3 font-serif text-2xl font-medium text-[#171412] sm:text-3xl">From Selection to <span className="text-[#fd6f93]">Doorstep</span></h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#6B6560]">Four simple steps from choosing your piece to having it in your hands.</p>
          </div>

          {/* Desktop: Horizontal cards */}
          <div className="relative mt-14 hidden md:block">
            {/* Connecting arrow line */}
            <div className="absolute left-[12%] right-[12%] top-[52px] h-px">
              <div className="h-full bg-gradient-to-r from-[#E7E1D8] via-[#fd6f93]/30 to-[#E7E1D8]" />
              {/* Arrow tips */}
              <svg className="absolute -left-1 -top-1.5 h-4 w-4 text-[#E7E1D8]" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8h8m0 0l-3-3m3 3l-3 3" /></svg>
              <svg className="absolute -right-1 -top-1.5 h-4 w-4 text-[#fd6f93]" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8h8m0 0l-3-3m3 3l-3 3" /></svg>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {[
                { step: "01", title: "Choose Your Product", desc: "Browse our curated collections and find the perfect piece that speaks to you.", icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                )},
                { step: "02", title: "We Craft It", desc: "Our artisans handcraft your selected piece with meticulous attention to detail.", icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.18A1.5 1.5 0 014 17.09V5.91a1.5 1.5 0 012.036-1.41l5.384 3.18a1.5 1.5 0 010 2.58z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.58 9.42l5.384-3.18A1.5 1.5 0 0122 7.41v11.18a1.5 1.5 0 01-2.036 1.41l-5.384-3.18a1.5 1.5 0 010-2.58z" /></svg>
                )},
                { step: "03", title: "Quality Check", desc: "47-point inspection ensures every detail meets our exacting standards.", icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                )},
                { step: "04", title: "Delivered to You", desc: "Insured, tracked shipping delivers your NOVARA piece safely to your door.", icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21a2.25 2.25 0 002.25-2.25V6.375c0-1.125-.9-2.063-2.018-2.182a48.039 48.039 0 00-1.965-.149H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h3.284a48.056 48.056 0 011.965-.149m13.5 0h-3" /></svg>
                )},
              ].map((s, i) => (
                <div key={s.step} className="group relative overflow-hidden text-center">
                  <div className="relative">
                    {/* Large faded number background */}
                    <div className="pointer-events-none absolute inset-x-0 top-2 flex justify-center font-serif text-[70px] font-bold leading-none text-[#E7E1D8]/30 transition-colors duration-500 group-hover:text-[#fd6f93]/10">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    {/* Step circle */}
                    <div className="relative mx-auto mb-6 flex h-[104px] w-[104px] items-center justify-center rounded-full border-2 border-[#E7E1D8] bg-white transition-all duration-500 group-hover:border-[#fd6f93] group-hover:shadow-lg group-hover:shadow-[#fd6f93]/10">
                      <div className="text-[#6B6560] transition-colors duration-500 group-hover:text-[#fd6f93]">{s.icon}</div>
                      {/* Number badge */}
                      <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#171412] text-[10px] font-bold text-white">
                        {s.step}
                      </div>
                    </div>
                    <h3 className="font-serif text-base font-medium text-[#171412] transition-colors duration-300 group-hover:text-[#fd6f93]">{s.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#6B6560]">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical steps */}
          <div className="mt-12 md:hidden">
            <div className="relative space-y-8">
              {/* Vertical line */}
              <div className="absolute left-[27px] top-0 h-full w-px bg-gradient-to-b from-[#E7E1D8] via-[#fd6f93]/30 to-[#E7E1D8]" />

              {[
                { step: "01", title: "Choose Your Product", desc: "Browse our curated collections and find the perfect piece that speaks to you.", icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                )},
                { step: "02", title: "We Craft It", desc: "Our artisans handcraft your selected piece with meticulous attention to detail.", icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.18A1.5 1.5 0 014 17.09V5.91a1.5 1.5 0 012.036-1.41l5.384 3.18a1.5 1.5 0 010 2.58z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14.58 9.42l5.384-3.18A1.5 1.5 0 0122 7.41v11.18a1.5 1.5 0 01-2.036 1.41l-5.384-3.18a1.5 1.5 0 010-2.58z" /></svg>
                )},
                { step: "03", title: "Quality Check", desc: "47-point inspection ensures every detail meets our exacting standards.", icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                )},
                { step: "04", title: "Delivered to You", desc: "Insured, tracked shipping delivers your NOVARA piece safely to your door.", icon: (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21a2.25 2.25 0 002.25-2.25V6.375c0-1.125-.9-2.063-2.018-2.182a48.039 48.039 0 00-1.965-.149H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h3.284a48.056 48.056 0 011.965-.149m13.5 0h-3" /></svg>
                )},
              ].map((s, i) => (
                <div key={s.step} className="group relative flex items-start gap-5">
                  {/* Step circle */}
                  <div className="relative flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border-2 border-[#E7E1D8] bg-white transition-all duration-500 group-hover:border-[#fd6f93] group-hover:shadow-lg group-hover:shadow-[#fd6f93]/10">
                    <div className="text-[#6B6560] transition-colors duration-500 group-hover:text-[#fd6f93]">{s.icon}</div>
                    <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#171412] text-[8px] font-bold text-white">
                      {s.step}
                    </div>
                  </div>
                  <div className="group/card relative flex-1 overflow-hidden border border-[#E7E1D8] bg-white p-4 transition-all duration-300 hover:border-[#fd6f93]/30">
                    {/* Large faded number */}
                    <div className="pointer-events-none absolute right-1 top-1 font-serif text-[50px] font-bold leading-none text-[#E7E1D8]/40 transition-colors duration-500 group-hover/card:text-[#fd6f93]/10">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="relative">
                      <h3 className="font-serif text-sm font-medium text-[#171412] transition-colors duration-300 group-hover:text-[#fd6f93]">{s.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-[#6B6560]">{s.desc}</p>
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
                src="/images/a3avif.avif"
                alt="NOVARA Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#171412]/10" />
            </div>
            <div className="flex flex-col items-start justify-center p-8 sm:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#fd6f93]">Ready to Experience the Difference?</p>
              <h2 className="mt-3 font-serif text-2xl font-medium text-[#171412]">Shop NOVARA Today</h2>
              <div className="mt-3 h-px w-8 bg-[#fd6f93]" />
              <p className="mt-4 text-sm leading-relaxed text-[#6B6560]">
                Join 50,000+ customers who&apos;ve discovered what luxury truly feels like.
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
