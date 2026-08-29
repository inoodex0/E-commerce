"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, Heart, ShoppingBag, Eye, Truck, ShieldCheck, RotateCcw, Award, Gem, Leaf, Clock } from "lucide-react";
import { useState, use } from "react";

const collectionsData: Record<string, {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  heroImage: string;
  features: { icon: string; title: string; desc: string }[];
  products: {
    id: number;
    slug: string;
    name: string;
    category: string;
    tag: string;
    price: string;
    originalPrice: string;
    image: string;
    description: string;
    rating: number;
    reviews: number;
    colors: string[];
  }[];
}> = {
  signature: {
    tag: "Curated Excellence",
    title: "Signature Collection",
    subtitle: "perfect choices",
    description: "Our handpicked selection of timeless pieces — each one representing the finest craftsmanship and design that defines the NOVARA identity. Every piece tells a story of dedication, precision, and an unwavering commitment to luxury that transcends fleeting trends.",
    heroImage: "/images/collections/3.avif",
    features: [
      { icon: "gem", title: "Premium Quality", desc: "Only the finest materials make it into our signature pieces, ensuring lasting beauty and durability." },
      { icon: "award", title: "Artisan Crafted", desc: "Each piece is meticulously handcrafted by master artisans with decades of experience." },
      { icon: "leaf", title: "Sustainable", desc: "Responsibly sourced materials and eco-conscious production methods guide our craft." },
      { icon: "shield", title: "Certified", desc: "Every item comes with authenticity certification and our comprehensive warranty." },
      { icon: "truck", title: "Free Shipping", desc: "Complimentary worldwide shipping on all orders over $150 with careful packaging." },
      { icon: "clock", title: "Timeless Design", desc: "Classic designs that transcend seasons, ensuring your investment never goes out of style." },
    ],
    products: [
      { id: 1, slug: "midnight-onyx-chrono", name: "Midnight Onyx Chrono", category: "Watches", tag: "Bestseller", price: "$450.00", originalPrice: "$520.00", image: "/images/a1.jpg", description: "A masterpiece of precision engineering, this chronograph features a deep onyx dial paired with rose gold accents.", rating: 4.8, reviews: 124, colors: ["#2C2C2C", "#D4B89C", "#8B6B5B"] },
      { id: 2, slug: "sienna-tuscan-tote", name: "Sienna Tuscan Tote", category: "Bags", tag: "Editor's Pick", price: "$520.00", originalPrice: "$590.00", image: "/images/a4.avif", description: "Handcrafted from premium Italian leather, this tote embodies timeless elegance.", rating: 4.9, reviews: 89, colors: ["#C4A882", "#8B6B5B", "#2C2C2C"] },
      { id: 3, slug: "imperial-gold-bangle", name: "Imperial Gold Bangle", category: "Jewelry", tag: "Limited Edition", price: "$310.00", originalPrice: "$370.00", image: "/images/a3avif.avif", description: "18K gold-plated bangle with intricate detailing. A statement piece for any occasion.", rating: 4.7, reviews: 203, colors: ["#D4B89C", "#2C2C2C", "#8B6B5B"] },
      { id: 4, slug: "obsidian-aviator-shades", name: "Obsidian Aviator Shades", category: "Sunglasses", tag: "Trending", price: "$280.00", originalPrice: "$340.00", image: "/images/a5.avif", description: "Polarized lenses housed in a lightweight titanium frame with UV400 protection.", rating: 4.6, reviews: 156, colors: ["#2C2C2C", "#D4B89C"] },
      { id: 5, slug: "heritage-canvas-weekender", name: "Heritage Canvas Weekender", category: "Bags", tag: "Most Loved", price: "$395.00", originalPrice: "$450.00", image: "/images/a6.avif", description: "Waxed canvas meets full-grain leather trim in this rugged yet refined weekender bag.", rating: 4.9, reviews: 312, colors: ["#8B6B5B", "#C4A882", "#2C2C2C"] },
      { id: 6, slug: "aura-noir-perfume", name: "Aura Noir Perfume", category: "Perfumes", tag: "Exclusive", price: "$185.00", originalPrice: "$220.00", image: "/images/a2.avif", description: "Notes of black oud, amber, and smoky vetiver create an intoxicating signature scent.", rating: 4.8, reviews: 97, colors: ["#2C2C2C"] },
    ],
  },
  essentials: {
    tag: "Everyday Luxe",
    title: "Essentials Collection",
    subtitle: "daily essentials",
    description: "The foundation of a refined wardrobe. Versatile, enduring pieces crafted for daily elegance without compromise. These essentials form the cornerstone of modern luxury, designed to elevate your everyday moments into something extraordinary.",
    heroImage: "/images/collections/accessories.avif",
    features: [
      { icon: "gem", title: "Versatile Style", desc: "Pieces designed to transition seamlessly from day to night, casual to formal." },
      { icon: "award", title: "Everyday Durability", desc: "Built to withstand daily wear while maintaining their luxurious appearance." },
      { icon: "leaf", title: "Comfort First", desc: "Ergonomically designed for all-day comfort without sacrificing style." },
      { icon: "shield", title: "Warranty", desc: "Comprehensive 2-year warranty covering manufacturing defects and materials." },
      { icon: "truck", title: "Quick Delivery", desc: "Fast, reliable shipping with signature-required delivery for your peace of mind." },
      { icon: "clock", title: "Seasonless", desc: "Classic designs that work year-round, making them smart investments." },
    ],
    products: [
      { id: 1, slug: "obsidian-aviator-shades", name: "Obsidian Aviator Shades", category: "Sunglasses", tag: "Daily Essential", price: "$280.00", originalPrice: "$340.00", image: "/images/a5.avif", description: "Polarized lenses housed in a lightweight titanium frame with UV400 protection.", rating: 4.6, reviews: 156, colors: ["#2C2C2C", "#D4B89C"] },
      { id: 2, slug: "aura-noir-perfume", name: "Aura Noir Perfume", category: "Perfumes", tag: "Everyday Scent", price: "$185.00", originalPrice: "$220.00", image: "/images/a2.avif", description: "Notes of black oud, amber, and smoky vetiver create an intoxicating signature scent.", rating: 4.8, reviews: 97, colors: ["#2C2C2C"] },
      { id: 3, slug: "midnight-onyx-chrono", name: "Midnight Onyx Chrono", category: "Watches", tag: "Versatile Pick", price: "$450.00", originalPrice: "$520.00", image: "/images/a1.jpg", description: "A masterpiece of precision engineering that transitions seamlessly from office to evening.", rating: 4.8, reviews: 124, colors: ["#2C2C2C", "#D4B89C", "#8B6B5B"] },
      { id: 4, slug: "sienna-tuscan-tote", name: "Sienna Tuscan Tote", category: "Bags", tag: "Carry Essential", price: "$520.00", originalPrice: "$590.00", image: "/images/a4.avif", description: "Handcrafted from premium Italian leather with spacious interior — perfect for work or weekend.", rating: 4.9, reviews: 89, colors: ["#C4A882", "#8B6B5B", "#2C2C2C"] },
      { id: 5, slug: "heritage-canvas-weekender", name: "Heritage Canvas Weekender", category: "Bags", tag: "Travel Must-Have", price: "$395.00", originalPrice: "$450.00", image: "/images/a6.avif", description: "Waxed canvas meets full-grain leather trim in this rugged yet refined weekender bag.", rating: 4.9, reviews: 312, colors: ["#8B6B5B", "#C4A882", "#2C2C2C"] },
      { id: 6, slug: "imperial-gold-bangle", name: "Imperial Gold Bangle", category: "Jewelry", tag: "Subtle Statement", price: "$310.00", originalPrice: "$370.00", image: "/images/a3avif.avif", description: "18K gold-plated bangle with intricate detailing — a refined touch for any daily look.", rating: 4.7, reviews: 203, colors: ["#D4B89C", "#2C2C2C", "#8B6B5B"] },
    ],
  },
};

const iconMap: Record<string, React.ReactNode> = {
  gem: <Gem size={28} strokeWidth={1.2} />,
  award: <Award size={28} strokeWidth={1.2} />,
  leaf: <Leaf size={28} strokeWidth={1.2} />,
  shield: <ShieldCheck size={28} strokeWidth={1.2} />,
  truck: <Truck size={28} strokeWidth={1.2} />,
  clock: <Clock size={28} strokeWidth={1.2} />,
};

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const collection = collectionsData[slug];

  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  if (!collection) {
    return (
      <main className="min-h-screen bg-[#FBF8F3] flex flex-col items-center justify-center px-4">
        <ShoppingBag size={64} className="text-[#E7E1D8] mb-6" />
        <h1 className="font-serif text-3xl font-medium text-[#171412]">Collection Not Found</h1>
        <p className="mt-2 text-sm text-[#6B6560]">The collection you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="mt-6 inline-flex items-center gap-2 border border-[#171412] bg-[#171412] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-all hover:bg-[#fd6f93] hover:border-[#fd6f93]">
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">

      {/* ═══════════════════════════════════════════════════════════
          HERO IMAGE — Full Width
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#f8f5f0]">
        <div className="relative mx-auto max-w-[1600px]">
          <div className="relative aspect-[21/9] w-full overflow-hidden sm:aspect-[21/8] lg:aspect-[21/7]">
            <Image
              src={collection.heroImage}
              alt={collection.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          ABOUT SECTION — Centered Text
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-serif text-lg italic text-[#fd6f93]/60 sm:text-xl">{collection.subtitle}</span>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl lg:text-5xl">
            {collection.title.replace("Collection", "")}That Defines You.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-[#6B6560] sm:text-base sm:leading-8">
            {collection.description}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FEATURES ROW — Icons
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#FAF9F7] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {collection.features.map((feat, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center"
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-[#E7E1D8] bg-white transition-all duration-300 ${hoveredFeature === i ? "border-[#fd6f93] text-[#fd6f93] shadow-lg shadow-[#fd6f93]/10" : "text-[#171412]"}`}>
                  {iconMap[feat.icon]}
                </div>
                <h3 className="font-serif text-sm font-semibold uppercase tracking-wider text-[#171412]">{feat.title}</h3>
                <p className="mt-2 text-[11px] leading-5 text-[#6B6560]">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PRODUCTS GRID
      ═══════════════════════════════════════════════════════════ */}
      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#fd6f93]">{collection.products.length} Products</span>
            <h2 className="mt-2 font-serif text-2xl font-medium text-[#171412] sm:text-3xl">Explore The Collection</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {collection.products.map((item) => {
              const discount = Math.round(((parseFloat(item.originalPrice.replace("$", "")) - parseFloat(item.price.replace("$", ""))) / parseFloat(item.originalPrice.replace("$", ""))) * 100);
              return (
                <Link
                  key={item.id}
                  href={`/product/${item.slug}`}
                  className="group relative flex flex-col overflow-hidden border border-[#E7E1D8] bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-[#171412]/10 hover:-translate-y-1"
                  onMouseEnter={() => setHoveredProduct(item.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F5F2EC]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 flex flex-col gap-2">
                      <span className="inline-block rounded-full bg-white/90 px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-[#171412] backdrop-blur-sm">{item.tag}</span>
                      {discount > 0 && (
                        <span className="inline-block rounded-full bg-[#fd6f93] px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-white">-{discount}%</span>
                      )}
                    </div>
                    <div className={`absolute bottom-0 left-0 right-0 flex justify-center gap-3 bg-gradient-to-t from-black/50 to-transparent p-6 transition-all duration-500 ${hoveredProduct === item.id ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                      <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#171412] shadow-lg transition-all duration-300 hover:bg-[#fd6f93] hover:text-white hover:scale-110"><Heart size={16} /></button>
                      <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#171412] shadow-lg transition-all duration-300 hover:bg-[#fd6f93] hover:text-white hover:scale-110"><Eye size={16} /></button>
                      <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#171412] shadow-lg transition-all duration-300 hover:bg-[#fd6f93] hover:text-white hover:scale-110"><ShoppingBag size={16} /></button>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#fd6f93]">{item.category}</span>
                    <h3 className="mt-1 font-serif text-base font-medium text-[#171412] sm:text-lg">{item.name}</h3>
                    <p className="mt-2 text-xs leading-5 text-[#6B6560] line-clamp-2">{item.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < Math.floor(item.rating) ? "fill-[#fd6f93] text-[#fd6f93]" : "text-[#E7E1D8]"} />
                        ))}
                      </div>
                      <span className="text-[10px] text-[#6B6560]">({item.reviews})</span>
                    </div>
                    <div className="mt-3 flex gap-1.5">
                      {item.colors.map((c, i) => (
                        <span key={i} className="h-4 w-4 rounded-full border border-[#E7E1D8]" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                    <div className="mt-auto flex items-center gap-2 pt-4">
                      <span className="font-serif text-lg font-semibold text-[#171412]">{item.price}</span>
                      {item.originalPrice && <span className="text-xs text-[#6B6560] line-through">{item.originalPrice}</span>}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          BACK TO HOME
      ═══════════════════════════════════════════════════════════ */}
      <section className="border-t border-[#E7E1D8] bg-[#FAF9F7] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-[#171412] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#171412] transition-all duration-300 hover:bg-[#fd6f93] hover:border-[#fd6f93] hover:text-white"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </section>

    </main>
  );
}
