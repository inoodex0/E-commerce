"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight, LayoutGrid, List, SlidersHorizontal, X, RotateCcw, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";

const allSubcategories = [
  { name: "Watches", slug: "watches" },
  { name: "Bags", slug: "bags" },
  { name: "Wallets", slug: "wallets" },
  { name: "Sunglasses", slug: "sunglasses" },
  { name: "Jewelry", slug: "jewelry" },
  { name: "Belts", slug: "belts" },
  { name: "Perfumes", slug: "perfumes" },
  { name: "Tech Accessories", slug: "tech-accessories" },
];

const allSizes = ["XS", "S", "M", "L", "XL", "One Size"];

const allColours = [
  { name: "Black", hex: "#171412" },
  { name: "Brown", hex: "#8B4513" },
  { name: "Gold", hex: "#D4AF37" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Navy", hex: "#1a1a5e" },
  { name: "White", hex: "#F5F5F5" },
];

const priceRanges = [
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 – $300", min: 100, max: 300 },
  { label: "$300 – $500", min: 300, max: 500 },
  { label: "Over $500", min: 500, max: Infinity },
];

const discountRanges = [
  { label: "10% or more", min: 10 },
  { label: "20% or more", min: 20 },
  { label: "30% or more", min: 30 },
];

const newItems = [
  { id: 1, name: "Midnight Onyx Chrono", price: 450, oldPrice: 520, colours: ["Black", "Silver"], sizes: ["One Size"], discount: 13, category: "Watches", image: "/images/a1.jpg", href: "/product/midnight-onyx-chrono", bestSeller: true },
  { id: 2, name: "Sienna Tuscan Tote", price: 520, oldPrice: 600, colours: ["Brown", "Black", "Gold"], sizes: ["Medium", "Large"], discount: 13, category: "Bags", image: "/images/a4.avif", href: "/product/sienna-tuscan-tote", bestSeller: false },
  { id: 3, name: "Imperial Gold Bangle", price: 310, oldPrice: 380, colours: ["Gold", "Silver"], sizes: ["S", "M", "L"], discount: 18, category: "Jewelry", image: "/images/a3avif.avif", href: "/product/imperial-gold-bangle", bestSeller: true },
  { id: 4, name: "Obsidian Aviator Shades", price: 280, oldPrice: 320, colours: ["Black", "Gold", "Silver", "Navy"], sizes: ["One Size"], discount: 12, category: "Sunglasses", image: "/images/a5.avif", href: "/product/obsidian-aviator-shades", bestSeller: false },
  { id: 5, name: "Heritage Canvas Weekender", price: 395, oldPrice: 450, colours: ["Brown", "Navy"], sizes: ["Medium", "Large"], discount: 12, category: "Bags", image: "/images/a6.avif", href: "/product/heritage-canvas-weekender", bestSeller: true },
  { id: 6, name: "Aura Noir Perfume", price: 185, oldPrice: 220, colours: ["Black", "Gold", "Brown"], sizes: ["One Size"], discount: 16, category: "Perfumes", image: "/images/a2.avif", href: "/product/aura-noir-perfume", bestSeller: false },
  { id: 7, name: "Slate Leather Wallet", price: 120, oldPrice: 150, colours: ["Black", "Brown"], sizes: ["One Size"], discount: 20, category: "Wallets", image: "/images/a4.avif", href: "/product/slate-leather-wallet", bestSeller: true },
  { id: 8, name: "Woven Nappa Belt", price: 95, oldPrice: 120, colours: ["Brown", "Black", "Navy"], sizes: ["S", "M", "L", "XL"], discount: 21, category: "Belts", image: "/images/a6.avif", href: "/product/woven-nappa-belt", bestSeller: false },
  { id: 9, name: "Wireless Charging Pad", price: 65, oldPrice: 80, colours: ["Black"], sizes: ["One Size"], discount: 19, category: "Tech Accessories", image: "/images/a1.jpg", href: "/product/wireless-charging-pad", bestSeller: false },
  { id: 10, name: "Rose Gold Chrono", price: 480, oldPrice: 550, colours: ["Gold", "Silver"], sizes: ["One Size"], discount: 13, category: "Watches", image: "/images/a5.avif", href: "/product/rose-gold-chrono", bestSeller: true },
];

function CollapsibleSection({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="py-4 first:pt-0">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#171412]">{title}</span>
        <ChevronDown size={16} className={`text-[#6B6560] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default function NewArrivalPage() {
  const { addToCart } = useCartStore();

  const [activeCategories, setActiveCategories] = useState<string[]>(allSubcategories.map((s) => s.name));
  const [activeSizes, setActiveSizes] = useState<string[]>([]);
  const [activeColours, setActiveColours] = useState<string[]>([]);
  const [activePriceRange, setActivePriceRange] = useState<{ label: string; min: number; max: number } | null>(null);
  const [activeDiscount, setActiveDiscount] = useState<number | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">("default");
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [addedId, setAddedId] = useState<number | null>(null);

  const toggleCategory = useCallback((name: string) => {
    setActiveCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  }, []);

  const toggleSize = useCallback((size: string) => {
    setActiveSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]);
  }, []);

  const toggleColour = useCallback((name: string) => {
    setActiveColours((prev) => prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]);
  }, []);

  const clearAll = useCallback(() => {
    setActiveCategories(allSubcategories.map((s) => s.name));
    setActiveSizes([]);
    setActiveColours([]);
    setActivePriceRange(null);
    setActiveDiscount(null);
    setSortBy("default");
  }, []);

  const removeFilter = useCallback((type: string, value?: string) => {
    if (type === "category" && value) setActiveCategories((prev) => prev.filter((c) => c !== value));
    if (type === "size" && value) setActiveSizes((prev) => prev.filter((s) => s !== value));
    if (type === "colour" && value) setActiveColours((prev) => prev.filter((c) => c !== value));
    if (type === "price") setActivePriceRange(null);
    if (type === "discount") setActiveDiscount(null);
  }, []);

  const activeFilterCount =
    (activeCategories.length < allSubcategories.length ? allSubcategories.length - activeCategories.length : 0) +
    activeSizes.length +
    activeColours.length +
    (activePriceRange ? 1 : 0) +
    (activeDiscount ? 1 : 0);

  const filteredItems = useMemo(() => {
    let items = [...newItems];

    if (activeCategories.length > 0 && activeCategories.length < allSubcategories.length) {
      items = items.filter((item) => activeCategories.includes(item.category));
    }

    if (activeSizes.length > 0) {
      items = items.filter((item) => item.sizes.some((s) => activeSizes.includes(s)));
    }

    if (activeColours.length > 0) {
      items = items.filter((item) => item.colours.some((c) => activeColours.includes(c)));
    }

    if (activePriceRange) {
      items = items.filter((item) => item.price >= activePriceRange.min && item.price < activePriceRange.max);
    }

    if (activeDiscount) {
      items = items.filter((item) => item.discount >= activeDiscount);
    }

    switch (sortBy) {
      case "price-asc": items.sort((a, b) => a.price - b.price); break;
      case "price-desc": items.sort((a, b) => b.price - a.price); break;
    }

    return items;
  }, [activeCategories, activeSizes, activeColours, activePriceRange, activeDiscount, sortBy]);

  const handleAddToCart = (e: React.MouseEvent, item: typeof newItems[0]) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id: item.id, name: item.name, category: item.category, price: `$${item.price}`, image: item.image } as any, 1, "", "");
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const filterPanel = (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E7E1D8] pb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} className="text-[#171412]" />
          <span className="text-sm font-bold uppercase tracking-[0.15em] text-[#171412]">Filters</span>
          {activeFilterCount > 0 && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#E8852A] px-1.5 text-[10px] font-bold text-white">{activeFilterCount}</span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button onClick={clearAll} className="flex items-center gap-1 text-xs font-medium text-[#E8852A] hover:underline">
            <RotateCcw size={11} /> Clear
          </button>
        )}
      </div>

      {/* Subcategory */}
      <CollapsibleSection title="Subcategory">
        <div className="space-y-1">
          <button
            onClick={() => { if (activeCategories.length > 0) clearAll(); }}
            className={`w-full rounded-full border px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
              activeCategories.length === 0
                ? "border-[#E8852A] bg-[#E8852A]/5 text-[#E8852A]"
                : "border-transparent text-[#6B6560] hover:text-[#171412]"
            }`}
          >
            All Collections
          </button>
          {allSubcategories.map((sub) => {
            const isActive = activeCategories.includes(sub.name);
            return (
              <button
                key={sub.slug}
                onClick={() => toggleCategory(sub.name)}
                className={`block w-full py-2.5 text-left text-sm font-medium transition-colors duration-200 ${
                  isActive ? "text-[#E8852A] font-semibold" : "text-[#6B6560] hover:text-[#171412]"
                }`}
              >
                {sub.name}
              </button>
            );
          })}
        </div>
      </CollapsibleSection>

      {/* Size — Rounded pills */}
      <CollapsibleSection title="Size">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => {
            const exists = newItems.some((i) => i.sizes.includes(size));
            if (!exists) return null;
            const isActive = activeSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`flex h-10 min-w-[40px] items-center justify-center rounded-full border px-3.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "border-[#E8852A] bg-[#E8852A] text-white shadow-sm"
                    : "border-[#E7E1D8] bg-white text-[#6B6560] hover:border-[#171412] hover:text-[#171412]"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </CollapsibleSection>

      {/* Colour */}
      <CollapsibleSection title="Colour">
        <div className="flex flex-wrap gap-3">
          {allColours.map((col) => {
            const exists = newItems.some((i) => i.colours.includes(col.name));
            if (!exists) return null;
            const isActive = activeColours.includes(col.name);
            return (
              <button
                key={col.name}
                onClick={() => toggleColour(col.name)}
                className="group flex items-center gap-2"
              >
                <span
                  className={`h-7 w-7 rounded-full border-2 transition-all duration-200 ${
                    isActive ? "border-[#E8852A] ring-2 ring-[#E8852A]/20" : "border-[#E7E1D8] group-hover:border-[#171412]"
                  }`}
                  style={{ backgroundColor: col.hex }}
                />
                <span className={`text-sm font-medium ${isActive ? "text-[#171412]" : "text-[#6B6560]"}`}>{col.name}</span>
              </button>
            );
          })}
        </div>
      </CollapsibleSection>

      {/* Price */}
      <CollapsibleSection title="Price">
        <div className="space-y-1.5">
          {priceRanges.map((range) => {
            const isActive = activePriceRange?.label === range.label;
            return (
              <button
                key={range.label}
                onClick={() => setActivePriceRange(isActive ? null : range)}
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-all duration-200 ${
                  isActive ? "border-[#E8852A] bg-[#E8852A]/5 shadow-sm" : "border-transparent bg-[#FBF8F3] hover:bg-[#F5F2EC]"
                }`}
              >
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${isActive ? "border-[#E8852A] bg-[#E8852A]" : "border-[#D5D0C8]"}`}>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <span className={`text-sm font-medium ${isActive ? "text-[#171412]" : "text-[#6B6560]"}`}>{range.label}</span>
              </button>
            );
          })}
        </div>
      </CollapsibleSection>

      {/* Discount */}
      <CollapsibleSection title="Discount %" defaultOpen={false}>
        <div className="space-y-1.5">
          {discountRanges.map((range) => {
            const isActive = activeDiscount === range.min;
            return (
              <button
                key={range.label}
                onClick={() => setActiveDiscount(isActive ? null : range.min)}
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-all duration-200 ${
                  isActive ? "border-[#E8852A] bg-[#E8852A]/5 shadow-sm" : "border-transparent bg-[#FBF8F3] hover:bg-[#F5F2EC]"
                }`}
              >
                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${isActive ? "border-[#E8852A] bg-[#E8852A]" : "border-[#D5D0C8]"}`}>
                  {isActive && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>
                <span className={`text-sm font-medium ${isActive ? "text-[#171412]" : "text-[#6B6560]"}`}>{range.label}</span>
              </button>
            );
          })}
        </div>
      </CollapsibleSection>
    </div>
  );

  return (
    <section className="bg-[#FBF8F3] py-6 sm:py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-6 xl:px-8">

        {/* Breadcrumb */}
        <p className="text-[11px] text-[#6B6560]">
          Home <ChevronRight size={10} className="inline" /> <span className="text-[#171412] font-medium">New Arrivals</span>
        </p>

        {/* Header */}
        <div className="mt-5 flex flex-col justify-between border-b border-[#E7E1D8] pb-4 sm:mt-6 sm:flex-row sm:items-end sm:pb-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8852A] sm:text-xs">Just Dropped</p>
            <h1 className="mt-1 font-serif text-xl font-medium tracking-tight text-[#171412] sm:text-3xl lg:text-4xl">
              New Arrivals
            </h1>
          </div>
          <div className="mt-2 flex items-center gap-3 sm:mt-0">
            <p className="text-[11px] text-[#6B6560] sm:text-sm">{filteredItems.length} product{filteredItems.length !== 1 ? "s" : ""}</p>

            <div className="hidden items-center gap-1.5 text-[#171412]/40 sm:flex">
              <button onClick={() => setView("list")} className={`rounded-md p-1.5 transition-colors ${view === "list" ? "bg-[#171412] text-white" : "hover:bg-[#E7E1D8]/50"}`}>
                <List size={14} />
              </button>
              <button onClick={() => setView("grid")} className={`rounded-md p-1.5 transition-colors ${view === "grid" ? "bg-[#171412] text-white" : "hover:bg-[#E7E1D8]/50"}`}>
                <LayoutGrid size={14} />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-lg border border-[#E7E1D8] bg-white px-2.5 py-1.5 text-[10px] font-medium text-[#171412] outline-none focus:border-[#E8852A] sm:text-xs"
            >
              <option value="default">Sort by</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
            </select>

            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-[#E7E1D8] bg-white px-3 py-1.5 text-[10px] font-semibold text-[#171412] transition-colors hover:border-[#E8852A] lg:hidden"
            >
              <SlidersHorizontal size={13} /> Filters
              {activeFilterCount > 0 && (
                <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#E8852A] px-1 text-[8px] font-bold text-white">{activeFilterCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Active Filter Tags */}
        {activeFilterCount > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {activeCategories.length < allSubcategories.length && (
              allSubcategories.filter((s) => !activeCategories.includes(s.name)).map((s) => (
                <button key={s.name} onClick={() => toggleCategory(s.name)} className="flex items-center gap-1.5 rounded-full border border-[#E7E1D8] bg-white px-3 py-1.5 text-[10px] font-medium text-[#171412] transition-colors hover:border-[#E8852A]">
                  {s.name} <X size={10} />
                </button>
              ))
            )}
            {activeSizes.map((s) => (
              <button key={s} onClick={() => removeFilter("size", s)} className="flex items-center gap-1.5 rounded-full border border-[#E7E1D8] bg-white px-3 py-1.5 text-[10px] font-medium text-[#171412] transition-colors hover:border-[#E8852A]">
                Size: {s} <X size={10} />
              </button>
            ))}
            {activeColours.map((c) => (
              <button key={c} onClick={() => removeFilter("colour", c)} className="flex items-center gap-1.5 rounded-full border border-[#E7E1D8] bg-white px-3 py-1.5 text-[10px] font-medium text-[#171412] transition-colors hover:border-[#E8852A]">
                {c} <X size={10} />
              </button>
            ))}
            {activePriceRange && (
              <button onClick={() => removeFilter("price")} className="flex items-center gap-1.5 rounded-full border border-[#E7E1D8] bg-white px-3 py-1.5 text-[10px] font-medium text-[#171412] transition-colors hover:border-[#E8852A]">
                {activePriceRange.label} <X size={10} />
              </button>
            )}
            {activeDiscount && (
              <button onClick={() => removeFilter("discount")} className="flex items-center gap-1.5 rounded-full border border-[#E7E1D8] bg-white px-3 py-1.5 text-[10px] font-medium text-[#171412] transition-colors hover:border-[#E8852A]">
                {activeDiscount}%+ off <X size={10} />
              </button>
            )}
            <button onClick={clearAll} className="ml-1 text-[10px] font-semibold uppercase tracking-wider text-[#E8852A] hover:underline">Clear All</button>
          </div>
        )}

        <div className="mt-6 flex gap-8 lg:gap-10">

          {/* LEFT SIDEBAR (Desktop) */}
          <aside className="hidden w-60 shrink-0 border-r border-[#E7E1D8] pr-8 lg:block">
            {filterPanel}
          </aside>

          {/* MOBILE FILTER DRAWER */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-[9998] lg:hidden">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setMobileFilterOpen(false)} />
              <div className="absolute inset-y-0 left-0 w-[320px] max-w-[85vw] overflow-y-auto bg-white p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#171412]">Filters</h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FBF8F3] transition-colors hover:bg-[#F5F2EC]">
                    <X size={16} />
                  </button>
                </div>
                {filterPanel}
                <div className="sticky bottom-0 -mx-6 border-t border-[#E7E1D8] bg-white px-6 pt-4 pb-6">
                  <button onClick={() => setMobileFilterOpen(false)} className="w-full rounded-full border border-[#171412] bg-[#171412] py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#E8852A] hover:border-[#E8852A]">
                    Show {filteredItems.length} Result{filteredItems.length !== 1 ? "s" : ""}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS GRID */}
          <div className="flex-1">
            {filteredItems.length === 0 ? (
              <div className="mt-16 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F2EC]">
                  <ShoppingBag size={24} className="text-[#E7E1D8]" />
                </div>
                <p className="text-sm font-medium text-[#171412]">No products found</p>
                <p className="mt-1 text-xs text-[#6B6560]">Try adjusting your filters.</p>
                <button onClick={clearAll} className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#171412] bg-[#171412] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#E8852A] hover:border-[#E8852A]">
                  <RotateCcw size={11} /> Clear All Filters
                </button>
              </div>
            ) : (
              <div className={
                view === "grid"
                  ? "grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
                  : "flex flex-col gap-4"
              }>
                {filteredItems.map((item) => (
                  <div key={item.id} className="group flex flex-col overflow-hidden rounded-xl border border-[#E7E1D8] bg-white transition-all duration-300 hover:shadow-md">
                    {/* Image */}
                    <div className="relative aspect-square w-full overflow-hidden bg-[#FAFAFA]">
                      <Link href={item.href} className="absolute inset-0 z-0">
                        <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                      </Link>
                      <span className="absolute left-3 top-3 rounded bg-[#E8852A] px-2 py-0.5 text-[8px] font-bold text-white sm:text-[9px]">New Arrival</span>
                      {item.discount > 0 && <span className="absolute right-3 top-3 rounded bg-emerald-500 px-2 py-0.5 text-[8px] font-bold text-white">-{item.discount}%</span>}
                    </div>

                    {/* Info */}
                    <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                      <Link href={item.href} className="text-xs font-medium leading-tight text-[#171412] transition-colors hover:text-[#E8852A] sm:text-sm">{item.name}</Link>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-[#E8852A] sm:text-base">${item.price.toFixed(2)}</span>
                        {item.oldPrice > item.price && <span className="text-[10px] text-[#6B6560] line-through">${item.oldPrice.toFixed(2)}</span>}
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {item.colours.slice(0, 4).map((c) => {
                            const col = allColours.find((a) => a.name === c);
                            return <span key={c} className="h-2.5 w-2.5 rounded-full border border-[#E7E1D8]" style={{ backgroundColor: col?.hex || "#ccc" }} />;
                          })}
                        </div>
                        <span className="text-[9px] text-[#6B6560] sm:text-[10px]">{item.colours.length} colour{item.colours.length > 1 ? "s" : ""}</span>
                      </div>
                      <button onClick={(e) => handleAddToCart(e, item)} className={`mt-auto flex w-full items-center justify-center gap-2 rounded-lg border py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 sm:text-xs ${addedId === item.id ? "border-emerald-500 bg-emerald-50 text-emerald-600" : "border-[#171412]/20 text-[#171412] hover:border-[#171412] hover:bg-[#171412] hover:text-white"}`}>
                        <ShoppingBag size={13} /> {addedId === item.id ? "Added!" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
