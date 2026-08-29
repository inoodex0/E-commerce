"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ChevronDown, LayoutGrid, List, Minus, Plus } from "lucide-react";

const subcategories = [
  { name: "Watches", slug: "watches" },
  { name: "Bags", slug: "bags" },
  { name: "Wallets", slug: "wallets" },
  { name: "Sunglasses", slug: "sunglasses" },
  { name: "Jewelry", slug: "jewelry" },
  { name: "Belts", slug: "belts" },
  { name: "Perfumes", slug: "perfumes" },
  { name: "Tech Accessories", slug: "tech-accessories" },
];

const newItems = [
  { id: 1, name: "Midnight Onyx Chrono", price: 450, colours: 2, category: "Watches", image: "/images/a1.jpg", href: "/product/midnight-onyx-chrono", bestSeller: true },
  { id: 2, name: "Sienna Tuscan Tote", price: 520, colours: 3, category: "Bags", image: "/images/a4.avif", href: "/product/sienna-tuscan-tote", bestSeller: false },
  { id: 3, name: "Imperial Gold Bangle", price: 310, colours: 2, category: "Jewelry", image: "/images/a3avif.avif", href: "/product/imperial-gold-bangle", bestSeller: true },
  { id: 4, name: "Obsidian Aviator Shades", price: 280, colours: 4, category: "Sunglasses", image: "/images/a5.avif", href: "/product/obsidian-aviator-shades", bestSeller: false },
  { id: 5, name: "Heritage Canvas Weekender", price: 395, colours: 2, category: "Bags", image: "/images/a6.avif", href: "/product/heritage-canvas-weekender", bestSeller: true },
  { id: 6, name: "Aura Noir Perfume", price: 185, colours: 3, category: "Perfumes", image: "/images/a2.avif", href: "/product/aura-noir-perfume", bestSeller: false },
  { id: 7, name: "Slate Leather Wallet", price: 120, colours: 2, category: "Wallets", image: "/images/a4.avif", href: "/product/slate-leather-wallet", bestSeller: true },
  { id: 8, name: "Woven Nappa Belt", price: 95, colours: 3, category: "Belts", image: "/images/a6.avif", href: "/product/woven-nappa-belt", bestSeller: false },
  { id: 9, name: "Wireless Charging Pad", price: 65, colours: 1, category: "Tech Accessories", image: "/images/a1.jpg", href: "/product/wireless-charging-pad", bestSeller: false },
  { id: 10, name: "Rose Gold Chrono", price: 480, colours: 2, category: "Watches", image: "/images/a5.avif", href: "/product/rose-gold-chrono", bestSeller: true },
];

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false); // সবসময় collapsed শুরু হবে

  return (
    <div className="border-b border-[#171412]/10 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-xs font-semibold text-[#171412]"
      >
        {title}
        {open ? <Minus size={12} /> : <Plus size={12} />}
      </button>
      {open && children && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default function NewArrivalPage() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(subcategories.map((s) => [s.name, true])) // ফিল্টার লজিক আগের মতোই সব-checked থাকবে, শুধু প্যানেল বন্ধ থাকবে
  );
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");
  const [sortOpen, setSortOpen] = useState(false);

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCheck = (name: string) => {
    setChecked((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const activeCategories = Object.keys(checked).filter((key) => checked[key]);

  const filteredItems = useMemo(() => {
    let items = newItems.filter((item) => activeCategories.includes(item.category));
    if (sortBy === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
    return items;
  }, [activeCategories, sortBy]);

  return (
    <section className="bg-white py-8 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6 xl:px-8">

        {/* Breadcrumb */}
        <p className="text-[11px] text-[#6B6560]">
          Home / <span className="text-[#171412]">New Arrival</span>
        </p>

        <div className="mt-6 flex flex-col gap-8 md:flex-row md:gap-10">

          {/* Sidebar */}
          <aside className="w-full shrink-0 md:w-56">
            <h1 className="mb-5 font-serif text-lg font-medium tracking-wide text-[#171412]">
              New Arrival
            </h1>

            {/* Subcategory — collapsible, collapsed by default */}
            <FilterGroup title="Subcategory">
              <div className="flex flex-col gap-2.5">
                {subcategories.map((sub) => (
                  <div key={sub.slug} className="flex items-center justify-between gap-2">
                    <label className="flex cursor-pointer items-center gap-2.5 text-[11px] text-[#171412]/80">
                      <input
                        type="checkbox"
                        checked={!!checked[sub.name]}
                        onChange={() => toggleCheck(sub.name)}
                        className="h-3.5 w-3.5 accent-[#fd6f93]"
                      />
                      {sub.name}
                    </label>
                    <Link
                      href={`/categories/${sub.slug}`}
                      className="text-[9px] text-[#6B6560] underline-offset-2 hover:text-[#fd6f93] hover:underline"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>
            </FilterGroup>

            <FilterGroup title="Size" />
            <FilterGroup title="Colour" />
            <FilterGroup title="Price" />
            <FilterGroup title="Discount %" />
          </aside>

          {/* Main content */}
          <div className="flex-1">

            {/* Toolbar */}
            <div className="mb-6 flex items-center justify-between border-b border-[#171412]/10 pb-4">
              <h2 className="font-serif text-xl font-medium tracking-wide text-[#171412] sm:text-2xl">
                New Arrival
                <span className="ml-2 text-xs font-normal text-[#6B6560]">
                  ({filteredItems.length} items)
                </span>
              </h2>

              <div className="flex items-center gap-4">
                <div className="hidden items-center gap-2 text-[#171412]/60 sm:flex">
                  <button
                    onClick={() => setView("list")}
                    className={view === "list" ? "text-[#171412]" : ""}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </button>
                  <button
                    onClick={() => setView("grid")}
                    className={view === "grid" ? "text-[#171412]" : ""}
                    aria-label="Grid view"
                  >
                    <LayoutGrid size={16} />
                  </button>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setSortOpen((prev) => !prev)}
                    className="flex items-center gap-1.5 text-[11px] font-medium text-[#171412]"
                  >
                    Sort by
                    <ChevronDown size={12} />
                  </button>
                  {sortOpen && (
                    <div className="absolute right-0 top-full z-20 mt-2 w-40 rounded-md border border-[#171412]/10 bg-white py-1 shadow-lg">
                      {[
                        { label: "Default", value: "default" },
                        { label: "Price: Low to High", value: "price-asc" },
                        { label: "Price: High to Low", value: "price-desc" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSortBy(opt.value as typeof sortBy);
                            setSortOpen(false);
                          }}
                          className={`block w-full px-3 py-2 text-left text-[11px] hover:bg-[#FBF8F3] ${
                            sortBy === opt.value ? "text-[#fd6f93]" : "text-[#171412]"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {filteredItems.length === 0 && (
              <p className="py-16 text-center text-sm text-[#6B6560]">
                No products found for the selected filters.
              </p>
            )}

            {filteredItems.length > 0 && (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10"
                    : "flex flex-col gap-6"
                }
              >
                {filteredItems.map((item) => (
                  <Link key={item.id} href={item.href} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F2EC]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {item.bestSeller && (
                        <span className="absolute right-0 top-3 bg-[#171412] px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-white sm:text-[9px]">
                          Best Seller
                        </span>
                      )}
                      <button
                        onClick={(e) => toggleLike(e, item.id)}
                        aria-label="Add to wishlist"
                        className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 sm:h-8 sm:w-8"
                      >
                        <Heart
                          size={14}
                          className={liked[item.id] ? "fill-[#fd6f93] text-[#fd6f93]" : "text-[#171412]"}
                        />
                      </button>
                    </div>

                    <div className="mt-3 flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xs font-medium text-[#171412] sm:text-sm">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-[#171412] sm:text-sm">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#6B6560] sm:text-[11px]">
                          {item.colours} {item.colours > 1 ? "colours" : "colour"}
                        </p>
                      </div>
                      <button
                        onClick={(e) => toggleLike(e, item.id)}
                        aria-label="Add to wishlist"
                        className="flex h-6 w-6 shrink-0 items-center justify-center sm:hidden"
                      >
                        <Heart
                          size={14}
                          className={liked[item.id] ? "fill-[#fd6f93] text-[#fd6f93]" : "text-[#171412]/40"}
                        />
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}