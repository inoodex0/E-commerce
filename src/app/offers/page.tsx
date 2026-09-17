"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronDown, ShoppingBag, Tag, SlidersHorizontal, X, RotateCcw } from "lucide-react";
import { useCartStore } from "@/lib/store";

const offerProducts = [
  { id: 1, name: "Chronograph Noir Watch", category: "Watches", price: 34000, oldPrice: 42000, discount: 19, image: "/images/products/watch-1.avif", colors: ["Black", "Silver"], sizes: ["One Size"] },
  { id: 2, name: "Luxe Leather Tote Bag", category: "Bags", price: 49000, oldPrice: 58000, discount: 16, image: "/images/products/bag-1.avif", colors: ["Brown", "Black"], sizes: ["Medium", "Large"] },
  { id: 3, name: "Gold Minimalist Bracelet", category: "Jewelry", price: 18000, oldPrice: 22000, discount: 18, image: "/images/products/bracelet-1.avif", colors: ["Gold"], sizes: ["S", "M", "L"] },
  { id: 4, name: "Classic Aviator Sunglasses", category: "Sunglasses", price: 21000, oldPrice: 26000, discount: 19, image: "/images/products/sunglasses-1.avif", colors: ["Gold", "Silver"], sizes: ["One Size"] },
  { id: 5, name: "Artisan Leather Wallet", category: "Wallets", price: 12000, oldPrice: 15000, discount: 20, image: "/images/a5.avif", colors: ["Brown", "Black"], sizes: ["One Size"] },
  { id: 6, name: "Signature Velvet Pouch", category: "Tech Accessories", price: 9500, oldPrice: 12000, discount: 21, image: "/images/a6.avif", colors: ["Black", "Navy"], sizes: ["S", "M"] },
  { id: 7, name: "Premium Aviator Shades", category: "Sunglasses", price: 26000, oldPrice: 32000, discount: 19, image: "/images/products/sunglasses-1.avif", colors: ["Black", "Gold"], sizes: ["One Size"] },
  { id: 8, name: "Classic Bifold Wallet", category: "Wallets", price: 15000, oldPrice: 18000, discount: 17, image: "/images/a5.avif", colors: ["Brown", "Navy"], sizes: ["One Size"] },
  { id: 9, name: "Smart Watch Band", category: "Tech Accessories", price: 9500, oldPrice: 12000, discount: 21, image: "/images/products/watch-1.avif", colors: ["Black", "Silver", "Brown"], sizes: ["S", "M", "L"] },
  { id: 10, name: "Daytona Silver Watch", category: "Watches", price: 52000, oldPrice: 62000, discount: 16, image: "/images/products/watch-1.avif", colors: ["Silver", "Black"], sizes: ["One Size"] },
  { id: 11, name: "Canvas Messenger Bag", category: "Bags", price: 38000, oldPrice: 45000, discount: 16, image: "/images/products/bag-1.avif", colors: ["Black", "Brown"], sizes: ["Medium", "Large"] },
  { id: 12, name: "Pearl Drop Necklace", category: "Jewelry", price: 24000, oldPrice: 30000, discount: 20, image: "/images/products/bracelet-1.avif", colors: ["Gold", "Silver"], sizes: ["One Size"] },
];

const allCategories = ["All", ...Array.from(new Set(offerProducts.map((p) => p.category)))];
const allColors = Array.from(new Set(offerProducts.flatMap((p) => p.colors || [])));
const allSizes = ["XS", "S", "M", "L", "XL", "One Size"];

const colorMap: Record<string, string> = {
  Black: "#171412", Brown: "#8B4513", Silver: "#C0C0C0",
  Gold: "#D4AF37", Navy: "#1a1a5e",
};

const discountRanges = [
  { label: "10% or more", min: 10 },
  { label: "15% or more", min: 15 },
  { label: "20% or more", min: 20 },
];

function FilterSection({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
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

export default function OffersPage() {
  const { addToCart } = useCartStore();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [activeSizes, setActiveSizes] = useState<string[]>([]);
  const [activeDiscount, setActiveDiscount] = useState<number | null>(null);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(62500);
  const [sortBy, setSortBy] = useState<"default" | "discount-high" | "price-low" | "price-high">("default");
  const [addedId, setAddedId] = useState<number | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const toggleColor = useCallback((color: string) => {
    setActiveColors((prev) => prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]);
  }, []);

  const toggleSize = useCallback((size: string) => {
    setActiveSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]);
  }, []);

  const clearAll = useCallback(() => {
    setActiveCategory("All");
    setActiveColors([]);
    setActiveSizes([]);
    setActiveDiscount(null);
    setPriceMin(0);
    setPriceMax(62500);
    setSortBy("default");
  }, []);

  const removeFilter = useCallback((type: string, value?: string) => {
    if (type === "category") setActiveCategory("All");
    if (type === "color" && value) setActiveColors((prev) => prev.filter((c) => c !== value));
    if (type === "size" && value) setActiveSizes((prev) => prev.filter((s) => s !== value));
    if (type === "discount") setActiveDiscount(null);
  }, []);

  const activeFilterCount =
    (activeCategory !== "All" ? 1 : 0) +
    activeColors.length +
    activeSizes.length +
    (activeDiscount ? 1 : 0) +
    (priceMin > 0 || priceMax < 62500 ? 1 : 0);

  const filtered = useMemo(() => {
    let list = [...offerProducts];
    if (activeCategory !== "All") list = list.filter((p) => p.category === activeCategory);
    if (activeColors.length > 0) list = list.filter((p) => p.colors?.some((c) => activeColors.includes(c)));
    if (activeSizes.length > 0) list = list.filter((p) => p.sizes?.some((s) => activeSizes.includes(s)));
    if (activeDiscount) list = list.filter((p) => p.discount >= activeDiscount);
    if (priceMin > 0 || priceMax < 62500) list = list.filter((p) => p.price >= priceMin && p.price <= priceMax);
    switch (sortBy) {
      case "discount-high": list.sort((a, b) => b.discount - a.discount); break;
      case "price-low": list.sort((a, b) => a.price - b.price); break;
      case "price-high": list.sort((a, b) => b.price - a.price); break;
    }
    return list;
  }, [activeCategory, activeColors, activeSizes, activeDiscount, priceMin, priceMax, sortBy]);

  const handleAdd = (product: typeof offerProducts[0]) => {
    addToCart({ id: product.id, name: product.name, category: product.category, price: `৳${product.price.toLocaleString()}`, image: product.image, colors: product.colors, sizes: product.sizes }, 1, "", "");
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const filterPanel = (
    <div>
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

      {/* Price Slider */}
      <FilterSection title="Price">
        <div className="space-y-3">
          <div className="relative h-2 w-full">
            <div className="absolute inset-0 rounded-full bg-[#F5F2EC]" />
            <div className="absolute inset-y-0 rounded-full bg-gradient-to-r from-[#D4A574] to-[#171412]" style={{ left: `${(priceMin / 62500) * 100}%`, right: `${100 - (priceMax / 62500) * 100}%` }} />
            <input type="range" min={0} max={62500} value={priceMin} onChange={(e) => { const v = Number(e.target.value); if (v < priceMax) setPriceMin(v); }} className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#D4A574] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow" />
            <input type="range" min={0} max={62500} value={priceMax} onChange={(e) => { const v = Number(e.target.value); if (v > priceMin) setPriceMax(v); }} className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#171412] [&::-webkit-slider-thumb]:bg-[#171412] [&::-webkit-slider-thumb]:shadow" />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-1.5 rounded-lg border border-[#E7E1D8] bg-white px-3 py-2.5">
              <span className="text-sm font-medium text-[#6B6560]">৳</span>
              <input type="number" value={priceMin} onChange={(e) => setPriceMin(Number(e.target.value))} className="w-full bg-transparent text-sm font-medium text-[#171412] outline-none" />
            </div>
            <span className="text-sm text-[#6B6560]">to</span>
            <div className="flex flex-1 items-center gap-1.5 rounded-lg border border-[#E7E1D8] bg-white px-3 py-2.5">
              <span className="text-sm font-medium text-[#6B6560]">৳</span>
              <input type="number" value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full bg-transparent text-sm font-medium text-[#171412] outline-none" />
            </div>
          </div>
          <p className="text-sm text-[#6B6560]">The highest price is ৳62,500</p>
        </div>
      </FilterSection>

      {/* Categories */}
      <FilterSection title="Categories">
        <div className="space-y-1">
          <button
            onClick={() => setActiveCategory("All")}
            className={`w-full rounded-full border px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
              activeCategory === "All" ? "border-[#E8852A] bg-[#E8852A]/5 text-[#E8852A]" : "border-transparent text-[#6B6560] hover:text-[#171412]"
            }`}
          >
            All Collections
          </button>
          {allCategories.filter((c) => c !== "All").map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`block w-full py-2.5 text-left text-sm font-medium transition-colors duration-200 ${
                activeCategory === cat ? "text-[#E8852A] font-semibold" : "text-[#6B6560] hover:text-[#171412]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {allSizes.map((size) => {
            const exists = offerProducts.some((p) => p.sizes?.includes(size));
            if (!exists) return null;
            const isActive = activeSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`flex h-10 min-w-[40px] items-center justify-center rounded-full border px-3.5 text-sm font-medium transition-all duration-200 ${
                  isActive ? "border-[#E8852A] bg-[#E8852A] text-white shadow-sm" : "border-[#E7E1D8] bg-white text-[#6B6560] hover:border-[#171412] hover:text-[#171412]"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Color */}
      <FilterSection title="Color">
        <div className="flex flex-wrap gap-3">
          {allColors.map((color) => {
            const isActive = activeColors.includes(color);
            return (
              <button key={color} onClick={() => toggleColor(color)} className="group flex items-center gap-2">
                <span
                  className={`h-7 w-7 rounded-full border-2 transition-all duration-200 ${
                    isActive ? "border-[#E8852A] ring-2 ring-[#E8852A]/20" : "border-[#E7E1D8] group-hover:border-[#171412]"
                  }`}
                  style={{ backgroundColor: colorMap[color] || "#ccc" }}
                />
                <span className={`text-sm font-medium ${isActive ? "text-[#171412]" : "text-[#6B6560]"}`}>{color}</span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Discount */}
      <FilterSection title="Discount %">
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
      </FilterSection>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-3 py-6 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <p className="text-[11px] text-[#6B6560]">
          Home <ChevronRight size={10} className="inline" /> <span className="text-[#171412] font-medium">Offers</span>
        </p>

        {/* Header */}
        <div className="mt-5 flex flex-col justify-between border-b border-[#E7E1D8] pb-4 sm:mt-6 sm:flex-row sm:items-end sm:pb-6">
          <div>
            <div className="flex items-center gap-2">
              <Tag size={20} className="text-[#E8852A]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#E8852A] sm:text-xs">Limited Time</p>
            </div>
            <h1 className="mt-1 font-serif text-xl font-medium tracking-tight text-[#171412] sm:text-3xl lg:text-4xl">Exclusive Offers</h1>
          </div>
          <div className="mt-2 flex items-center gap-3 sm:mt-0">
            <p className="text-[11px] text-[#6B6560] sm:text-sm">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-lg border border-[#E7E1D8] bg-white px-2.5 py-1.5 text-[10px] font-medium text-[#171412] outline-none focus:border-[#E8852A] sm:text-xs"
            >
              <option value="default">Sort by</option>
              <option value="discount-high">Biggest Discount</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
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
            {activeCategory !== "All" && (
              <button onClick={() => removeFilter("category")} className="flex items-center gap-1.5 rounded-full border border-[#E7E1D8] bg-white px-3 py-1.5 text-[10px] font-medium text-[#171412] transition-colors hover:border-[#E8852A]">
                {activeCategory} <X size={10} />
              </button>
            )}
            {activeColors.map((c) => (
              <button key={c} onClick={() => removeFilter("color", c)} className="flex items-center gap-1.5 rounded-full border border-[#E7E1D8] bg-white px-3 py-1.5 text-[10px] font-medium text-[#171412] transition-colors hover:border-[#E8852A]">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colorMap[c] || "#ccc" }} />{c} <X size={10} />
              </button>
            ))}
            {activeSizes.map((s) => (
              <button key={s} onClick={() => removeFilter("size", s)} className="flex items-center gap-1.5 rounded-full border border-[#E7E1D8] bg-white px-3 py-1.5 text-[10px] font-medium text-[#171412] transition-colors hover:border-[#E8852A]">
                Size: {s} <X size={10} />
              </button>
            ))}
            {activeDiscount && (
              <button onClick={() => removeFilter("discount")} className="flex items-center gap-1.5 rounded-full border border-[#E7E1D8] bg-white px-3 py-1.5 text-[10px] font-medium text-[#171412] transition-colors hover:border-[#E8852A]">
                {activeDiscount}%+ off <X size={10} />
              </button>
            )}
            <button onClick={clearAll} className="ml-1 text-[10px] font-semibold uppercase tracking-wider text-[#E8852A] hover:underline">Clear All</button>
          </div>
        )}

        <div className="mt-6 flex gap-8 lg:gap-10">

          {/* LEFT SIDEBAR */}
          <aside className="hidden w-60 shrink-0 border-r border-[#E7E1D8] pr-8 lg:block">{filterPanel}</aside>

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
                    Show {filtered.length} Result{filtered.length !== 1 ? "s" : ""}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS GRID */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="mt-16 text-center">
                <Tag size={40} className="mx-auto text-[#E7E1D8]" strokeWidth={1.2} />
                <p className="mt-4 text-sm font-medium text-[#171412]">No offers found</p>
                <p className="mt-1 text-xs text-[#6B6560]">Try adjusting your filters.</p>
                <button onClick={clearAll} className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#171412] bg-[#171412] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#E8852A] hover:border-[#E8852A]">
                  <RotateCcw size={11} /> Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 lg:gap-5">
                {filtered.map((item) => (
                  <article key={item.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-[#E7E1D8] bg-white transition-all duration-300 hover:shadow-md">
                    <div className="relative aspect-square w-full overflow-hidden bg-[#FAFAFA]">
                      <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw" className="object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                      <span className="absolute right-3 top-3 rounded bg-emerald-500 px-2 py-0.5 text-[8px] font-bold text-white sm:text-[9px]">-{item.discount}%</span>
                      <span className="absolute left-3 top-3 rounded bg-[#E8852A] px-2 py-0.5 text-[8px] font-bold text-white sm:text-[9px]">SALE</span>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                      <p className="text-[8px] font-semibold uppercase tracking-[0.15em] text-[#6B6560] sm:text-[9px]">{item.category}</p>
                      <Link href={`/product/${item.name.toLowerCase().replace(/\s+/g, "-")}`} className="text-xs font-medium leading-tight text-[#171412] transition-colors hover:text-[#E8852A] sm:text-sm">{item.name}</Link>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-bold text-[#E8852A] sm:text-base">৳{item.price.toLocaleString()}</span>
                        <span className="text-[10px] text-[#6B6560] line-through">৳{item.oldPrice.toLocaleString()}</span>
                      </div>
                      <button
                        onClick={() => handleAdd(item)}
                        className={`mt-auto flex w-full items-center justify-center gap-2 rounded-lg border py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 sm:text-xs ${
                          addedId === item.id ? "border-emerald-500 bg-emerald-50 text-emerald-600" : "border-[#E8852A]/30 text-[#E8852A] hover:border-[#E8852A] hover:bg-[#E8852A] hover:text-white"
                        }`}
                      >
                        <ShoppingBag size={13} /> {addedId === item.id ? "Added!" : "Add To Cart"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
