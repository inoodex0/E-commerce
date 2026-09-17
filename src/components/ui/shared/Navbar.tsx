"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import TopBar from "./TopBar";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Package,
  MoreHorizontal,
} from "lucide-react";
import { useCartStore, useWishlistStore } from "@/lib/store";
import Image from "next/image";

type DropdownType = "categories" | "deals" | "about" | "cart" | null;

const categories = [
  { label: "Watches", href: "/categories/watches" },
  { label: "Bags", href: "/categories/bags" },
  { label: "Wallets", href: "/categories/wallets" },
  { label: "Sunglasses", href: "/categories/sunglasses" },
  { label: "Jewelry", href: "/categories/jewelry" },
  { label: "Belts", href: "/categories/belts" },
  { label: "Perfumes", href: "/categories/perfumes" },
  { label: "Tech Accessories", href: "/categories/tech-accessories" },
];

const deals = [
  { label: "Discount Products", href: "/deals/discount-products" },
  { label: "Flash Sale", href: "/deals/flash-sale" },
  { label: "Coupons", href: "/deals/coupons" },
];

const aboutLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Story", href: "/our-story" },
  { label: "Why Choose Us", href: "/why-choose-us" },
];

const navCategories = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/new-arrivals" },
  { label: "Best Sellers", href: "/shop?sort=best-selling" },
  { label: "Deals", href: "/deals/flash-sale" },
];

export default function Navbar() {
  const lenis = useLenis();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const [desktopDropdown, setDesktopDropdown] = useState<DropdownType>(null);
  const [mobileDropdown, setMobileDropdown] = useState<DropdownType>(null);
  const [mounted, setMounted] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const wishlist = useWishlistStore((state) => state.wishlist);

  useEffect(() => { setMounted(true); }, []);

  const cartCount = mounted ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const cartTotal = mounted ? cart.reduce((sum, item) => sum + parseFloat(item.product.price.replace(/[^0-9.]/g, "")) * item.quantity, 0) : 0;

  const closeMobileMenu = () => { setMobileOpen(false); setMobileDropdown(null); };

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.removeAttribute("data-lenis-prevent");
    html.style.overflow = "";
    html.style.touchAction = "";
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    if (mobileOpen) { lenis?.stop(); body.style.overflow = "hidden"; }
    else { lenis?.start(); body.style.overflow = ""; }
    return () => { lenis?.start(); body.style.overflow = ""; html.removeAttribute("data-lenis-prevent"); html.style.overflow = ""; html.style.touchAction = ""; body.style.position = ""; body.style.top = ""; body.style.left = ""; body.style.right = ""; };
  }, [mobileOpen, lenis]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { closeMobileMenu(); setDesktopDropdown(null); setSearchQuery(""); setMobileSearchOpen(false); }
    };
    document.addEventListener("keydown", handleEscape);
    return () => { document.removeEventListener("keydown", handleEscape); };
  }, []);

  const handleSearch = () => {
    const cat = searchCategory === "All" ? "" : searchCategory.toLowerCase();
    const q = searchQuery.trim();
    if (q || cat) {
      window.location.href = `/shop?q=${encodeURIComponent(q)}${cat ? `&category=${encodeURIComponent(cat)}` : ""}`;
    } else {
      window.location.href = "/shop";
    }
    setMobileSearchOpen(false);
    setSearchQuery("");
  };

  const toggleMobileDropdown = (dropdown: DropdownType) => { setMobileDropdown((current) => current === dropdown ? null : dropdown); };
  const toggleDesktopDropdown = (dropdown: DropdownType) => { setDesktopDropdown((current) => current === dropdown ? null : dropdown); };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 w-full bg-white ${mobileOpen ? "invisible" : ""}`}>
        <TopBar />

        {/* Main Navbar */}
        <nav className="border-b border-[#E7E1D8] bg-white">
          <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:h-[72px] sm:px-5 lg:h-[76px] lg:px-6 xl:px-8">

            {/* Mobile Hamburger */}
            <button type="button" aria-label="Open menu" onClick={() => setMobileOpen(true)} className="lg:hidden">
              <Menu size={22} strokeWidth={1.7} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 lg:mr-6">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E8852A]">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="hidden font-serif text-xl font-bold tracking-[0.15em] text-[#171412] sm:block">
                ZURII
              </span>
            </Link>

            {/* Search Bar — Center */}
            <div className="hidden flex-1 items-center lg:flex">
              <div className="relative flex w-full max-w-[480px] items-center rounded-lg border border-[#E7E1D8] bg-[#F9F7F4] transition-all focus-within:border-[#E8852A] focus-within:bg-white">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="appearance-none border-r border-[#E7E1D8] bg-transparent pl-3 pr-8 py-2.5 text-[12px] font-medium text-[#171412] outline-none cursor-pointer"
                >
                  <option>All</option>
                  {categories.map((c) => (
                    <option key={c.href} value={c.label}>{c.label}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search in..."
                  className="flex-1 bg-transparent px-3 py-2.5 text-[13px] text-[#171412] outline-none placeholder:text-[#6B6560]/50"
                  onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                />
                <button onClick={handleSearch} className="px-3 py-2.5 text-[#6B6560] hover:text-[#E8852A] transition-colors">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Right Icons */}
            <div className="hidden items-center gap-5 lg:flex xl:gap-7">
              <Link href="/wishlist" className="flex flex-col items-center gap-0.5 text-[#171412] transition-colors hover:text-[#E8852A]">
                <Heart size={20} strokeWidth={1.5} />
                <span className="text-[9px] font-medium">Wishlist</span>
                {wishlist.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E8852A] px-1 text-[8px] text-white">{wishlist.length}</span>
                )}
              </Link>
              <Link href="/cart" className="relative flex flex-col items-center gap-0.5 text-[#171412] transition-colors hover:text-[#E8852A]">
                <ShoppingBag size={20} strokeWidth={1.5} />
                <span className="text-[9px] font-medium">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E8852A] px-1 text-[8px] text-white">{cartCount}</span>
                )}
              </Link>
              <div className="flex flex-col items-center gap-0.5 text-[#171412]">
                <MoreHorizontal size={20} strokeWidth={1.5} />
                <span className="text-[9px] font-medium">More</span>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-4 lg:hidden">
              <button onClick={() => setMobileSearchOpen(!mobileSearchOpen)} aria-label="Search">
                <Search size={20} strokeWidth={1.7} />
              </button>
              <Link href="/cart" aria-label="Cart" className="relative">
                <ShoppingBag size={20} strokeWidth={1.7} />
                {cartCount > 0 && <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E8852A] px-1 text-[9px] text-white">{cartCount}</span>}
              </Link>
            </div>
          </div>
        </nav>

        {/* Category Navigation Bar */}
        <div className="hidden border-b border-[#E7E1D8] bg-white lg:block">
          <div className="mx-auto max-w-[1400px] px-6 xl:px-8">
            <div className="no-scrollbar flex items-center gap-6 py-2.5 xl:gap-8">
              {navCategories.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap text-[16px] font-medium text-[#171412]/70 transition-colors hover:text-[#E8852A] xl:text-[17px]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="relative group">
                <button
                  className="flex items-center gap-1 whitespace-nowrap text-[16px] font-medium text-[#171412]/70 transition-colors hover:text-[#E8852A] xl:text-[17px]"
                >
                  Categories
                  <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
                </button>
                <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-0 top-full z-50 mt-1 min-w-[180px] rounded-lg border border-[#E7E1D8] bg-white py-2 shadow-lg shadow-[#171412]/5 transition-all duration-200">
                  {categories.map((cat) => (
                    <Link
                      key={cat.href}
                      href={cat.href}
                      className="block px-4 py-2.5 text-[13px] font-medium text-[#171412]/70 hover:bg-[#F9F7F4] hover:text-[#E8852A]"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/contact"
                className="whitespace-nowrap text-[16px] font-medium text-[#171412]/70 transition-colors hover:text-[#E8852A] xl:text-[17px]"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[calc(2.25rem+4rem)] sm:h-[calc(2.25rem+4.5rem)] lg:h-[calc(2.25rem+4.75rem+2.5rem)]" />

      {/* Mobile Search Overlay */}
      <div className={`fixed left-0 right-0 top-[96px] z-[90] sm:top-[72px] lg:hidden transition-all duration-300 ${mobileSearchOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="mx-4 overflow-hidden border border-[#E7E1D8] bg-white shadow-2xl shadow-[#171412]/10" ref={mobileSearchRef}>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent px-4 py-3 text-sm text-[#171412] outline-none placeholder:text-[#6B6560]/40"
              autoFocus={mobileSearchOpen}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); if (e.key === "Escape") { setMobileSearchOpen(false); setSearchQuery(""); } }}
            />
            <button onClick={handleSearch} className="px-4 py-3 text-[#6B6560] hover:text-[#E8852A]">
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>
      {mobileSearchOpen && <div className="fixed inset-0 z-[80] lg:hidden" onClick={() => { setMobileSearchOpen(false); setSearchQuery(""); }} />}

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[100] lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div onClick={closeMobileMenu} className={`absolute inset-0 bg-[#171412]/40 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`} />
        <aside aria-hidden={!mobileOpen} className={`fixed right-0 top-0 h-dvh w-[88%] max-w-sm overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-[#E7E1D8] bg-white px-5">
            <Link href="/" onClick={closeMobileMenu} className="font-serif text-lg font-bold tracking-[0.15em] text-[#171412]">ZURII</Link>
            <button type="button" aria-label="Close menu" onClick={closeMobileMenu}><X size={22} strokeWidth={1.6} /></button>
          </div>
          <div className="px-5 pb-10">
            <Link href="/" onClick={closeMobileMenu} className="block border-b border-[#E7E1D8] py-4 text-sm font-medium text-[#171412]">Home</Link>
            <Link href="/shop" onClick={closeMobileMenu} className="block border-b border-[#E7E1D8] py-4 text-sm font-medium text-[#171412]">Shop</Link>
            <div className="border-b border-[#E7E1D8]">
              <button type="button" onClick={() => toggleMobileDropdown("categories")} className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[#171412]">
                Categories
                <ChevronDown size={17} className={`text-[#E8852A] transition-transform duration-300 ${mobileDropdown === "categories" ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileDropdown === "categories" ? "max-h-[600px] pb-3" : "max-h-0"}`}>
                <div className="space-y-1 pl-3">
                  {categories.map((category) => (
                    <Link key={category.href} href={category.href} onClick={closeMobileMenu} className="block py-2.5 text-sm text-[#6B6560] hover:text-[#E8852A]">{category.label}</Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/new-arrivals" onClick={closeMobileMenu} className="block border-b border-[#E7E1D8] py-4 text-sm font-medium text-[#171412]">New Arrivals</Link>
            <Link href="/contact" onClick={closeMobileMenu} className="block border-b border-[#E7E1D8] py-4 text-sm font-medium text-[#171412]">Contact</Link>
          </div>
        </aside>
      </div>
    </>
  );
}
