"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Star, Minus, Plus, Eye, Truck, RotateCcw, ShieldCheck, Share2, GitCompare, MessageCircle, ChevronRight, Check, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/lib/store";

export interface Product {
  name: string;
  category: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviews: number;
  sold: string;
  viewing: number;
  description: string;
  colors: string[];
  sizes: string[];
  sku: string;
  vendor: string;
  available: string;
  categories: string;
  images: string[];
}

const frequentlyBought = [
  { id: 1, name: "Lyocell Wrap Top", price: "$30.00", image: "/images/a5.avif", colors: ["Mauve", "Beige", "Green"], sizes: ["S", "M", "L", "XL"] },
  { id: 2, name: "Cashmere Blend Cardigan", price: "$45.00", image: "/images/a6.avif", colors: ["Beige", "Black", "Brown"], sizes: ["S", "M", "L"] },
];

const tabOptions = ["Description", "Additional Information", "Reviews (3)"];

export default function ProductDetail({ product, allProducts }: { product: Product; allProducts: Product[] }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const [activeTab, setActiveTab] = useState("Description");
  const [relatedTab, setRelatedTab] = useState<"related" | "recent">("related");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useCartStore((state) => state.cart);
  const addToCartStore = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const addToCart = () => {
    addToCartStore(product as any, quantity, selectedSize, product.colors[selectedColor]);
    setIsCartOpen(true);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.product.price.replace("$", "")) * item.quantity, 0);
  const freeShippingThreshold = 150;
  const shippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);

  return (
    <main className="min-h-screen bg-[#FBF8F3]">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-serif text-xs text-[#6B6560] sm:text-sm sm:gap-2.5">
          <Link href="/" className="transition-colors hover:text-[#fd6f93]">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="transition-colors hover:text-[#fd6f93]">Products</Link>
          <ChevronRight size={12} />
          <span className="text-[#171412] font-medium truncate max-w-[150px] sm:max-w-none">{product.name}</span>
        </nav>

        {/* ═══════════════════════════════════════════════════════════
            PRODUCT SECTION
        ═══════════════════════════════════════════════════════════ */}
        <div className="mt-8 flex flex-col gap-10 sm:mt-10 lg:mt-12 lg:flex-row lg:gap-14">

          {/* Left — Images + Frequently Bought Together */}
          <div className="flex flex-col lg:w-[55%]">

            {/* Images Row */}
            <div className="flex flex-col-reverse gap-3 sm:gap-4 lg:flex-row lg:gap-5">

              {/* Thumbnails */}
              <div className="flex gap-2 sm:gap-3 lg:flex-col">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(i)}
                    className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 sm:h-[68px] sm:w-[68px] sm:rounded-xl lg:h-[84px] lg:w-[84px] ${
                      selectedImage === i
                        ? "border-[#171412] shadow-lg shadow-[#171412]/10"
                        : "border-[#E7E1D8] opacity-60 hover:opacity-100 hover:border-[#171412]/40"
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover object-center" />
                  </button>
                ))}
              </div>

              {/* Main Image with Zoom */}
              <div className="relative flex gap-4 lg:flex-1">
                <div
                  className="relative w-full overflow-hidden rounded-xl bg-[#F5F2EC] cursor-crosshair shadow-sm aspect-[4/5] sm:rounded-2xl"
                  onMouseEnter={() => setIsZooming(true)}
                  onMouseLeave={() => setIsZooming(false)}
                  onMouseMove={handleMouseMove}
                >
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover object-center pointer-events-none"
                  />
                  <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center bg-white/90 rounded-full z-10 shadow-sm sm:left-4 sm:top-4 sm:h-8 sm:w-8">
                    <Eye size={14} className="text-[#171412]" />
                  </div>
                </div>

                {/* Zoomed Preview — Desktop Only */}
                {isZooming && (
                  <div className="hidden lg:block absolute left-full top-0 ml-4 h-[440px] w-[440px] overflow-hidden rounded-2xl border border-[#E7E1D8] bg-white shadow-2xl shadow-[#171412]/10 z-50">
                    <Image
                      src={product.images[selectedImage]}
                      alt={product.name}
                      fill
                      className="object-cover pointer-events-none"
                      style={{
                        objectPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                        transform: "scale(2.5)",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════
                FREQUENTLY BOUGHT TOGETHER — Below Images
            ═══════════════════════════════════════════════════════════ */}
            <div className="mt-8 sm:mt-10 lg:mt-12">
              <h2 className="font-serif text-xl font-medium text-[#171412] sm:text-2xl">Frequently Bought Together</h2>

              <div className="mt-5 flex flex-col gap-3 sm:mt-6 sm:gap-4">
                {/* Main product */}
                <div className="flex items-center gap-3 rounded-xl border border-[#E7E1D8] bg-white p-3 transition-all hover:border-[#fd6f93]/30 sm:gap-5 sm:rounded-2xl sm:p-5">
                  <input type="checkbox" defaultChecked className="h-4 w-4 shrink-0 accent-[#fd6f93] sm:h-5 sm:w-5" />
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#F5F2EC] sm:h-20 sm:w-20 sm:rounded-xl lg:h-24 lg:w-24">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover object-center" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-sm font-medium text-[#171412] sm:text-base">{product.name}</h3>
                    <p className="mt-0.5 font-serif text-sm font-semibold text-[#fd6f93] sm:text-base">{product.price}</p>
                    <select className="mt-1.5 w-full max-w-[160px] border border-[#E7E1D8] bg-white px-2 py-1.5 text-xs text-[#6B6560] rounded-md sm:mt-2 sm:max-w-[200px] sm:px-3 sm:py-2 sm:text-sm sm:rounded-lg">
                      {product.sizes.map((size) =>
                        product.colors.map((color, ci) => (
                          <option key={`${size}-${ci}`}>{size} / {color}</option>
                        ))
                      )}
                    </select>
                  </div>
                </div>

                <div className="text-center text-sm text-[#fd6f93] font-bold sm:text-base">+</div>

                {frequentlyBought.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-xl border border-[#E7E1D8] bg-white p-3 transition-all hover:border-[#fd6f93]/30 sm:gap-5 sm:rounded-2xl sm:p-5">
                    <input type="checkbox" defaultChecked className="h-4 w-4 shrink-0 accent-[#fd6f93] sm:h-5 sm:w-5" />
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#F5F2EC] sm:h-20 sm:w-20 sm:rounded-xl lg:h-24 lg:w-24">
                      <Image src={item.image} alt={item.name} fill className="object-cover object-center" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-sm font-medium text-[#171412] sm:text-base">{item.name}</h3>
                      <p className="mt-0.5 font-serif text-sm font-semibold text-[#fd6f93] sm:text-base">{item.price}</p>
                      <select className="mt-1.5 w-full max-w-[160px] border border-[#E7E1D8] bg-white px-2 py-1.5 text-xs text-[#6B6560] rounded-md sm:mt-2 sm:max-w-[200px] sm:px-3 sm:py-2 sm:text-sm sm:rounded-lg">
                        {item.sizes.map((size) =>
                          item.colors.map((color, ci) => (
                            <option key={`${size}-${ci}`}>{size} / {color}</option>
                          ))
                        )}
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col items-center gap-3 border-t border-[#E7E1D8] pt-5 sm:mt-6 sm:flex-row sm:justify-between sm:gap-4 sm:pt-6">
                <div className="text-center sm:text-left">
                  <span className="text-xs text-[#6B6560] sm:text-sm">Total price: </span>
                  <span className="font-serif text-xl font-medium text-[#171412] sm:text-2xl">$104.99</span>
                </div>
                <button className="flex w-full rounded-2xl items-center justify-center gap-2 border border-neutral-200   bg-[#171412] px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-[#fd6f93] hover:border-[#fd6f93] sm:w-auto sm:px-8 sm:py-3.5 sm:text-sm">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                  Add Selected To Cart
                </button>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              RIGHT — Details
          ═══════════════════════════════════════════════════════════ */}
          <div className="flex flex-1 flex-col lg:w-[45%]">

            {/* Category */}
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#fd6f93] sm:text-xs">{product.category}</p>

            {/* Name */}
            <h1 className="mt-2 font-serif text-2xl font-medium leading-tight text-[#171412] sm:text-3xl lg:text-[38px]">
              {product.name}
            </h1>

            {/* Rating + Sold */}
            <div className="mt-3 flex flex-wrap items-center gap-2 sm:mt-4 sm:gap-3">
              <div className="flex items-center gap-0.5 sm:gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-[#fd6f93] text-[#fd6f93]" : "text-[#E7E1D8] sm:size-[18px]"} />
                ))}
              </div>
              <span className="text-xs text-[#6B6560] sm:text-sm">({product.reviews} review{product.reviews > 1 ? "s" : ""})</span>
              <span className="hidden h-4 w-px bg-[#E7E1D8] sm:block" />
              <span className="flex items-center gap-1.5 text-xs text-[#fd6f93] font-medium sm:text-sm">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#fd6f93] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#fd6f93]" />
                </span>
                {product.sold}
              </span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-2 sm:mt-5 sm:gap-4">
              <span className="font-serif text-2xl font-medium text-[#171412] sm:text-4xl">{product.price}</span>
              <span className="text-sm text-[#6B6560] line-through sm:text-lg">{product.originalPrice}</span>
              <span className="rounded-full bg-[#fd6f93]/10 px-2 py-0.5 text-[10px] font-semibold text-[#fd6f93] sm:px-3 sm:py-1 sm:text-xs">
                Save {(parseFloat(product.originalPrice.replace("$", "")) - parseFloat(product.price.replace("$", ""))).toFixed(0)}
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm leading-[1.7] text-[#6B6560] sm:mt-5 sm:text-base sm:leading-[1.8]">{product.description}</p>

            {/* Viewing */}
            <div className="mt-4 flex items-center gap-2 rounded-full bg-[#fd6f93]/5 px-3 py-2 w-fit sm:mt-5 sm:gap-2.5 sm:px-5 sm:py-2.5">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#fd6f93] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#fd6f93]" />
              </span>
              <span className="text-xs text-[#6B6560] sm:text-sm"><span className="font-semibold text-[#171412]">{product.viewing}</span> People are viewing this right now</span>
            </div>

            <div className="my-5 h-px bg-gradient-to-r from-transparent via-[#E7E1D8] to-transparent sm:my-7" />

            {/* Color */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#171412] sm:text-sm">Color: <span className="text-[#6B6560] font-normal normal-case">{product.colors[selectedColor]}</span></p>
              <div className="mt-2.5 flex gap-2.5 sm:mt-3 sm:gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedColor(i)}
                    className={`relative h-9 w-9 rounded-full border-2 transition-all duration-300 sm:h-10 sm:w-10 ${
                      selectedColor === i ? "border-[#171412] scale-110 shadow-lg" : "border-[#E7E1D8] hover:border-[#171412]/40"
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {selectedColor === i && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Check size={14} className={color === "#2C2C2C" ? "text-white" : "text-[#171412]"} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mt-5 sm:mt-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#171412] sm:text-sm">Size: <span className="text-[#6B6560] font-normal normal-case">{selectedSize}</span></p>
                <button className="text-xs text-[#6B6560] underline underline-offset-4 decoration-[#E7E1D8] hover:text-[#fd6f93] hover:decoration-[#fd6f93] transition-colors sm:text-sm">Size Guide</button>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2 sm:mt-3 sm:gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[40px] px-3 py-2 border text-xs font-medium transition-all duration-300 sm:min-w-[48px] sm:px-4 sm:py-2.5 sm:text-sm ${
                      selectedSize === size
                        ? "border-[#171412] bg-[#171412] text-white shadow-lg shadow-[#171412]/20"
                        : "border-[#E7E1D8] text-[#171412] hover:border-[#171412]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
              <div className="flex items-center border border-[#E7E1D8] bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-11 w-11 items-center justify-center text-[#171412] transition-colors hover:bg-[#F5F3EE] sm:h-12 sm:w-12"
                >
                  <Minus size={16} />
                </button>
                <span className="flex h-11 w-12 items-center justify-center border-x border-[#E7E1D8] text-sm font-semibold sm:h-12 sm:w-14 sm:text-base">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-11 w-11 items-center justify-center text-[#171412] transition-colors hover:bg-[#F5F3EE] sm:h-12 sm:w-12"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button 
                onClick={addToCart}
                className="group rounded-2xl flex flex-1 items-center justify-center gap-2 border border-[#171412] bg-[#171412] py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#fd6f93] hover:border-[#fd6f93] hover:shadow-lg hover:shadow-[#fd6f93]/20 sm:gap-2.5 sm:text-sm"
              >
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                Add to Cart — {product.price}
              </button>

              <button className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#E7E1D8] bg-white transition-all duration-300 hover:border-[#fd6f93] hover:text-[#fd6f93] hover:bg-[#fd6f93]/5 sm:h-12 sm:w-12">
                <Heart size={20} />
              </button>
            </div>

            {/* Buy It Now */}
            <Link
              href="/checkout"
              onClick={() => {
                addToCartStore(product as any, quantity, selectedSize, product.colors[selectedColor]);
              }}
              className="group rounded-2xl mt-3 flex w-full items-center justify-center bg-gradient-to-r from-[#fd6f93] to-[#ff8fab] py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#fd6f93]/30 hover:from-[#e5507a] hover:to-[#fd6f93] sm:py-4 sm:text-sm"
            >
              Buy It Now
            </Link>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[#E7E1D8] pt-4 sm:mt-5 sm:flex-nowrap sm:gap-6 sm:pt-5">
              <button className="flex items-center gap-1.5 text-xs text-[#6B6560] transition-colors hover:text-[#171412] sm:gap-2 sm:text-sm">
                <GitCompare size={16} /> Compare
              </button>
              <button className="flex items-center gap-1.5 text-xs text-[#6B6560] transition-colors hover:text-[#171412] sm:gap-2 sm:text-sm">
                <MessageCircle size={16} /> Ask A Question
              </button>
              <button className="flex items-center gap-1.5 text-xs text-[#6B6560] transition-colors hover:text-[#171412] sm:gap-2 sm:text-sm">
                <Share2 size={16} /> Share
              </button>
            </div>

            {/* Delivery Info */}
            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-3">
              <div className="flex items-start gap-3 rounded-xl border border-[#E7E1D8] bg-white p-3.5 sm:p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fd6f93]/10 sm:h-10 sm:w-10">
                  <Truck size={18} className="text-[#fd6f93]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#171412] sm:text-sm">Free Shipping</p>
                  <p className="mt-0.5 text-[10px] leading-relaxed text-[#6B6560] sm:text-xs">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-[#E7E1D8] bg-white p-3.5 sm:p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fd6f93]/10 sm:h-10 sm:w-10">
                  <RotateCcw size={18} className="text-[#fd6f93]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#171412] sm:text-sm">Easy Returns</p>
                  <p className="mt-0.5 text-[10px] leading-relaxed text-[#6B6560] sm:text-xs">45-day return policy</p>
                </div>
              </div>
            </div>

            {/* Meta */}
            <div className="mt-4 rounded-xl border border-[#E7E1D8] bg-white p-3.5 text-xs space-y-1.5 sm:mt-5 sm:p-4 sm:text-sm sm:space-y-2">
              <div className="flex items-center gap-2"><span className="w-20 text-[#6B6560]">SKU:</span><span className="font-medium text-[#171412]">{product.sku}</span></div>
              <div className="flex items-center gap-2"><span className="w-20 text-[#6B6560]">Vendor:</span><span className="font-medium text-[#171412]">{product.vendor}</span></div>
              <div className="flex items-center gap-2"><span className="w-20 text-[#6B6560]">Available:</span><span className="font-medium text-[#2E8B7B]">{product.available}</span></div>
              <div className="flex items-center gap-2"><span className="w-20 text-[#6B6560]">Categories:</span><span className="font-medium text-[#171412]">{product.categories}</span></div>
            </div>

            {/* Safe Checkout */}
            <div className="mt-4 rounded-xl bg-[#F5F3EE] p-5 text-center sm:mt-5 sm:p-6">
              <p className="text-sm font-semibold text-[#2E8B7B] sm:text-base">Guarantee Safe Checkout:</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:mt-4 sm:gap-2.5">
                {/* VISA */}
                <div className="rounded bg-white px-3 py-1.5 shadow-sm sm:px-4 sm:py-2">
                  <svg viewBox="0 0 48 32" className="h-5 sm:h-6" fill="none">
                    <rect width="48" height="32" rx="4" fill="white"/>
                    <path d="M19.5 21h-3l1.9-11h3l-1.9 11zm10.3-10.7c-.6-.2-1.5-.5-2.7-.5-3 0-5 1.5-5 3.7 0 1.6 1.5 2.5 2.6 3 1.2.5 1.6.9 1.6 1.4 0 .7-.9 1.1-1.8 1.1-1.2 0-1.8-.2-2.8-.6l-.4-.2-.4 2.5c.7.3 2 .6 3.4.6 3.2 0 5.3-1.5 5.3-3.8 0-1.3-.8-2.2-2.5-3-.9-.5-1.5-.9-1.5-1.4 0-.5.5-1 1.7-1 1 0 1.7.2 2.2.4l.3.1.5-2.4zm7.8-.3h-2.3c-.7 0-1.3.2-1.6 1l-4.5 10h3.2l.6-1.8h3.9l.4 1.8h2.8l-2.5-11zm-3.7 7.1c.3-.7 1-2.3 1-2.3s.2-.6.3-.9l.1.5.6 2.7h-2zM15 9.3l-2.9 7.6-.3-1.5c-.5-1.8-2.1-3.7-3.9-4.6l2.7 10h3.2l4.8-11.5h-3.6z" fill="#1A1F71"/>
                    <path d="M9.6 9.3H3.2l-.1.3c5.1 1.3 8.5 4.4 9.9 8.3l-1.4-6.6c-.2-.9-.8-1.5-1.6-1.7l-.4-.6z" fill="#F7B600"/>
                  </svg>
                </div>
                {/* Mastercard */}
                <div className="rounded bg-white px-3 py-1.5 shadow-sm sm:px-4 sm:py-2">
                  <svg viewBox="0 0 48 32" className="h-5 sm:h-6" fill="none">
                    <rect width="48" height="32" rx="4" fill="white"/>
                    <circle cx="19" cy="16" r="8" fill="#EB001B"/>
                    <circle cx="29" cy="16" r="8" fill="#F79E1B"/>
                    <path d="M24 10.3a8 8 0 010 11.4 8 8 0 000-11.4z" fill="#FF5F00"/>
                  </svg>
                </div>
                {/* AMEX */}
                <div className="rounded bg-white px-3 py-1.5 shadow-sm sm:px-4 sm:py-2">
                  <svg viewBox="0 0 48 32" className="h-5 sm:h-6" fill="none">
                    <rect width="48" height="32" rx="4" fill="#006FCF"/>
                    <text x="24" y="19" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold" fontFamily="Arial">AMEX</text>
                  </svg>
                </div>
                {/* PayPal */}
                <div className="rounded bg-white px-3 py-1.5 shadow-sm sm:px-4 sm:py-2">
                  <svg viewBox="0 0 48 32" className="h-5 sm:h-6" fill="none">
                    <rect width="48" height="32" rx="4" fill="white"/>
                    <path d="M17.5 8h-6c-.5 0-1 .4-1.1.9L8 24h4.5l.7-3.5h2.8c4.5 0 7.5-2.2 8.2-6.5.3-1.8 0-3.2-.9-4.1-.9-.9-2.5-1.4-4.8-1.4h-.5zm.8 2.8c1.5 0 2.5.4 2.2 2-.3 2-2.2 2-3.5 2h-.9l-.6-3.2c0-.1.1-.2.3-.3.4-.1.9-.5 2.5-.5z" fill="#003087"/>
                    <path d="M21.5 7h-6c-.5 0-1 .4-1.1.9L12 23h4.5l.7-3.5h2.8c4.5 0 7.5-2.2 8.2-6.5.3-1.8 0-3.2-.9-4.1-.9-.9-2.5-1.4-4.8-1.4h-.5zm.8 2.8c1.5 0 2.5.4 2.2 2-.3 2-2.2 2-3.5 2h-.9l-.6-3.2c0-.1.1-.2.3-.3.4-.1.9-.5 2.5-.5z" fill="#009CDE"/>
                  </svg>
                </div>
                {/* Discover */}
                <div className="rounded bg-white px-3 py-1.5 shadow-sm sm:px-4 sm:py-2">
                  <svg viewBox="0 0 48 32" className="h-5 sm:h-6" fill="none">
                    <rect width="48" height="32" rx="4" fill="white"/>
                    <text x="24" y="19" textAnchor="middle" fill="#FF6000" fontSize="7" fontWeight="bold" fontFamily="Arial">DISCOVER</text>
                  </svg>
                </div>
                {/* Diners */}
                <div className="rounded bg-white px-3 py-1.5 shadow-sm sm:px-4 sm:py-2">
                  <svg viewBox="0 0 48 32" className="h-5 sm:h-6" fill="none">
                    <rect width="48" height="32" rx="4" fill="white"/>
                    <circle cx="21" cy="16" r="7" stroke="#004A97" strokeWidth="1.5" fill="none"/>
                    <circle cx="27" cy="16" r="7" stroke="#004A97" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            DESCRIPTION TABS
        ═══════════════════════════════════════════════════════════ */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="flex gap-0 overflow-x-auto border-b border-[#E7E1D8]">
            {tabOptions.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative shrink-0 px-5 py-4 font-serif text-sm font-normal transition-colors sm:px-8 sm:py-5 sm:text-2xl lg:text-[28px] ${
                  activeTab === tab ? "text-[#171412]" : "text-[#6B6560] hover:text-[#171412]"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#171412]" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-white p-5 border border-[#E7E1D8] sm:mt-8 sm:rounded-2xl sm:p-8 lg:p-10">
            {activeTab === "Description" && (
              <div className="space-y-3 text-lg leading-[1.8] text-[#6B6560] sm:space-y-4 sm:text-base">
                <p>{product.description}</p>
                <p>Experience unparalleled craftsmanship with this exquisite piece from our curated collection. Each detail has been meticulously designed to deliver both style and functionality, making it a timeless addition to your wardrobe.</p>
                <p>Crafted from the finest materials, this product embodies the essence of luxury. Whether for everyday elegance or special occasions, it promises to be a standout piece.</p>
              </div>
            )}
            {activeTab === "Additional Information" && (
              <div className="space-y-2 text-sm text-[#6B6560] sm:space-y-3 sm:text-base">
                <div className="flex border-b border-[#E7E1D8] py-2.5 sm:py-3"><span className="w-28 shrink-0 font-medium text-[#171412] sm:w-40">Category</span><span>{product.categories}</span></div>
                <div className="flex border-b border-[#E7E1D8] py-2.5 sm:py-3"><span className="w-28 shrink-0 font-medium text-[#171412] sm:w-40">Vendor</span><span>{product.vendor}</span></div>
                <div className="flex border-b border-[#E7E1D8] py-2.5 sm:py-3"><span className="w-28 shrink-0 font-medium text-[#171412] sm:w-40">SKU</span><span>{product.sku}</span></div>
                <div className="flex py-2.5 sm:py-3"><span className="w-28 shrink-0 font-medium text-[#171412] sm:w-40">Tags</span><span>{product.category}, Luxury, Premium</span></div>
              </div>
            )}
            {activeTab === "Reviews (3)" && (
              <div className="space-y-5 sm:space-y-6">
                {[1, 2, 3].map((r) => (
                  <div key={r} className="flex gap-3 border-b border-[#E7E1D8] pb-5 last:border-0 sm:gap-4 sm:pb-6">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5F3EE] text-xs font-semibold text-[#171412] sm:h-10 sm:w-10 sm:text-sm">U{r}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#171412] sm:text-base">User {r}</span>
                        <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-[#fd6f93] text-[#fd6f93] sm:size-[14px]" />)}</div>
                      </div>
                      <p className="mt-1 text-xs text-[#6B6560] sm:mt-1.5 sm:text-sm">Absolutely love this product! The quality exceeded my expectations and it arrived beautifully packaged.</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            RELATED PRODUCTS
        ═══════════════════════════════════════════════════════════ */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="flex items-center gap-5 overflow-x-auto border-b border-[#E7E1D8] sm:gap-8">
            <button
              onClick={() => setRelatedTab("related")}
              className={`relative shrink-0 pb-4 text-lg font-serif font-medium transition-colors sm:text-2xl ${
                relatedTab === "related" ? "text-[#171412]" : "text-[#6B6560] hover:text-[#171412]"
              }`}
            >
              Related Products
              {relatedTab === "related" && <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#171412]" />}
            </button>
            <button
              onClick={() => setRelatedTab("recent")}
              className={`relative shrink-0 pb-4 text-lg font-serif font-medium transition-colors sm:text-2xl ${
                relatedTab === "recent" ? "text-[#171412]" : "text-[#6B6560] hover:text-[#171412]"
              }`}
            >
              Recently Viewed
              {relatedTab === "recent" && <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#171412]" />}
            </button>
          </div>

          {relatedTab === "related" && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {allProducts.filter((p) => p.name !== product.name).slice(0, 4).map((item, i) => (
                <Link
                  key={i}
                  href={`/product/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#F5F2EC] rounded-xl sm:rounded-2xl">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute left-2 top-2 rounded-full bg-[#2E8B7B] px-2 py-0.5 text-[9px] font-semibold text-white sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-[10px]">In Stock</span>
                    {item.originalPrice && (
                      <span className="absolute right-2 top-2 rounded-full bg-[#fd6f93] px-2 py-0.5 text-[9px] font-semibold text-white sm:right-3 sm:top-3 sm:px-3 sm:py-1 sm:text-[10px]">
                        -{Math.round((1 - parseFloat(item.price.replace("$", "")) / parseFloat(item.originalPrice.replace("$", ""))) * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="mt-2 sm:mt-4">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#fd6f93] sm:text-[11px]">{item.category}</p>
                    <h3 className="mt-0.5 text-xs font-medium text-[#171412] group-hover:text-[#fd6f93] transition-colors sm:text-base">{item.name}</h3>
                    <div className="mt-1 flex items-center gap-1.5 sm:mt-2 sm:gap-2">
                      <span className="text-sm font-semibold text-[#171412] sm:text-lg">{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-[10px] text-[#6B6560] line-through sm:text-sm">{item.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {relatedTab === "recent" && (
            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {allProducts.slice(2, 6).map((item, i) => (
                <Link
                  key={i}
                  href={`/product/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#F5F2EC] rounded-xl sm:rounded-2xl">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="absolute left-2 top-2 rounded-full bg-[#2E8B7B] px-2 py-0.5 text-[9px] font-semibold text-white sm:left-3 sm:top-3 sm:px-3 sm:py-1 sm:text-[10px]">In Stock</span>
                    {item.originalPrice && (
                      <span className="absolute right-2 top-2 rounded-full bg-[#fd6f93] px-2 py-0.5 text-[9px] font-semibold text-white sm:right-3 sm:top-3 sm:px-3 sm:py-1 sm:text-[10px]">
                        -{Math.round((1 - parseFloat(item.price.replace("$", "")) / parseFloat(item.originalPrice.replace("$", ""))) * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="mt-2 sm:mt-4">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#fd6f93] sm:text-[11px]">{item.category}</p>
                    <h3 className="mt-0.5 text-xs font-medium text-[#171412] group-hover:text-[#fd6f93] transition-colors sm:text-base">{item.name}</h3>
                    <div className="mt-1 flex items-center gap-1.5 sm:mt-2 sm:gap-2">
                      <span className="text-sm font-semibold text-[#171412] sm:text-lg">{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-[10px] text-[#6B6560] line-through sm:text-sm">{item.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative flex w-full max-w-lg flex-col bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E7E1D8] px-6 py-4">
              <h2 className="font-serif text-lg font-semibold text-[#171412]">Shopping Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-[#6B6560] hover:text-[#171412] transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="border-b border-[#E7E1D8] px-6 py-4">
              {subtotal >= freeShippingThreshold ? (
                <p className="text-xs text-green-600 font-medium uppercase tracking-wider">✓ You've earned FREE Shipping!</p>
              ) : (
                <>
                  <p className="text-xs text-[#171412] font-medium mb-2">Add ${(freeShippingThreshold - subtotal).toFixed(2)} more for FREE Shipping</p>
                  <div className="h-1.5 w-full rounded-full bg-[#F0ECE6]">
                    <div className="h-full rounded-full bg-[#171412] transition-all duration-500" style={{ width: `${shippingProgress}%` }} />
                  </div>
                </>
              )}
            </div>

            {/* You Might Like */}
            {cartItems.length > 0 && (
              <div className="border-b border-[#E7E1D8] px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#171412] mb-3">You Might Also Like</p>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {allProducts.filter(p => p.name !== product.name).slice(0, 4).map((item) => (
                    <Link
                      key={item.name}
                      href={`/product/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => setIsCartOpen(false)}
                      className="flex w-20 shrink-0 flex-col items-center gap-1"
                    >
                      <div className="h-20 w-20 overflow-hidden rounded-lg bg-[#F0ECE6]">
                        <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <span className="text-[9px] text-center text-[#6B6560] leading-tight">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <ShoppingBag size={48} className="text-[#E7E1D8] mb-4" />
                  <p className="text-sm text-[#6B6560]">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex gap-4 border-b border-[#E7E1D8] pb-4 last:border-0">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#F0ECE6]">
                        <img src={item.product.images?.[0] ?? item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <p className="text-xs font-medium text-[#171412] mb-0.5">{item.product.name}</p>
                        <p className="text-[10px] text-[#6B6560] mb-1">Size: {item.size} / {item.color}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-[#E7E1D8] rounded">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateQuantity(index, item.quantity - 1);
                                } else {
                                  removeFromCart(index);
                                }
                              }}
                              className="px-2 py-0.5 text-[#6B6560] hover:text-[#171412]"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-2 text-xs font-medium">{item.quantity}</span>
                            <button
                              onClick={() => {
                                updateQuantity(index, item.quantity + 1);
                              }}
                              className="px-2 py-0.5 text-[#6B6560] hover:text-[#171412]"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="ml-auto text-xs font-semibold text-[#171412]">${(parseFloat(item.product.price.replace("$", "")) * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(index)} className="text-[#6B6560] hover:text-[#fd6f93] transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-[#E7E1D8] px-6 py-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-[#6B6560]">Subtotal</span>
                  <span className="text-sm font-semibold text-[#171412]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-semibold text-[#171412]">Total</span>
                  <span className="text-sm font-semibold text-[#171412]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-start gap-2 mb-4">
                  <input type="checkbox" className="mt-0.5 accent-[#171412]" />
                  <span className="text-[10px] text-[#6B6560]">I agree with the terms & conditions</span>
                </div>
                <button className="w-full bg-[#171412] py-3 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#fd6f93] transition-colors rounded-lg mb-2">
                  Check Out
                </button>
                <div className="flex justify-between text-xs">
                  <Link href="/cart" className="text-[#171412] underline underline-offset-4 hover:text-[#fd6f93] transition-colors" onClick={() => setIsCartOpen(false)}>View Cart</Link>
                  <button onClick={() => setIsCartOpen(false)} className="text-[#171412] underline underline-offset-4 hover:text-[#fd6f93] transition-colors">Continue Shopping</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
