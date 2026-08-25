"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const categories = [
  { label: "Bags & Backpacks", href: "/categories/bags-backpacks" },
  { label: "Watches", href: "/categories/watches" },
  { label: "Jewelry", href: "/categories/jewelry" },
  { label: "Sunglasses", href: "/categories/sunglasses" },
  { label: "Belts & Wallets", href: "/categories/belts-wallets" },
  { label: "Scarves & Hats", href: "/categories/scarves-hats" },
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

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileDropdown(null);
  };

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (mobileOpen) {
      html.setAttribute("data-lenis-prevent", "");
      html.style.overflow = "hidden";
      html.style.touchAction = "none";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${window.scrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
    } else {
      const scrollY = body.style.top;
      html.removeAttribute("data-lenis-prevent");
      html.style.overflow = "";
      html.style.touchAction = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      if (scrollY) {
        window.scrollTo(0, -parseInt(scrollY || "0"));
      }
    }

    return () => {
      const scrollY = body.style.top;
      html.removeAttribute("data-lenis-prevent");
      html.style.overflow = "";
      html.style.touchAction = "";
      body.style.overflow = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      if (scrollY) {
        window.scrollTo(0, -parseInt(scrollY || "0"));
      }
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!headerRef.current) return;

    const navLinks = headerRef.current.querySelectorAll<HTMLElement>(
      ".group, button[aria-label], [aria-label]"
    );

    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    gsap.fromTo(
      navLinks,
      { y: -10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.3,
      }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-[#FBF8F3] opacity-0 shadow-[0_1px_0_rgba(23,20,18,0.06)]"
    >
      <nav className="border-b border-[#E7E1D8] bg-[#FBF8F3]">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 lg:h-[72px] lg:px-8">

          {/* LOGO */}
          <Link
            href="/"
            className="shrink-0 font-serif text-xl font-semibold tracking-[0.2em] text-[#171412] lg:text-2xl lg:tracking-[0.28em]"
          >
            NOVARA
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            <Link href="/" className="group relative py-7 text-[13px] font-medium tracking-wide text-[#171412]">
              Home
              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#A9814D] transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link href="/shop" className="group relative py-7 text-[13px] font-medium tracking-wide text-[#171412]">
              Shop
              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#A9814D] transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDesktopDropdown("categories")}
              onMouseLeave={() => setDesktopDropdown(null)}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 py-7 text-[13px] font-medium tracking-wide text-[#171412]"
              >
                Categories
                <ChevronDown size={14} strokeWidth={1.7} className={`text-[#A9814D] transition-transform duration-200 ${desktopDropdown === "categories" ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute left-1/2 top-full w-[680px] -translate-x-1/2 pt-3 transition-all duration-200 ${desktopDropdown === "categories" ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}>
                <div className="border border-[#E7E1D8] bg-white p-8 shadow-xl shadow-[#171412]/5">
                  <div className="mb-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A9814D]">Shop By Category</p>
                    <h3 className="mt-2 font-serif text-xl font-medium text-[#171412]">Explore Our Accessories</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-x-10 gap-y-6">
                    {categories.map((category) => (
                      <Link key={category.href} href={category.href} className="group">
                        <span className="text-sm font-medium text-[#171412] transition-colors group-hover:text-[#A9814D]">{category.label}</span>
                        <span className="mt-2 block h-px w-0 bg-[#A9814D] transition-all duration-300 group-hover:w-full" />
                      </Link>
                    ))}
                  </div>
                  <div className="mt-8 border-t border-[#E7E1D8] pt-6">
                    <Link href="/categories" className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#171412] transition-colors hover:text-[#A9814D]">
                      View All Categories →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/new-arrivals" className="group relative py-7 text-[13px] font-medium tracking-wide text-[#171412]">
              New Arrivals
              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#A9814D] transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Deals Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDesktopDropdown("deals")}
              onMouseLeave={() => setDesktopDropdown(null)}
            >
              <button type="button" className="flex items-center gap-1.5 py-7 text-[13px] font-medium tracking-wide text-[#171412]">
                Deals
                <ChevronDown size={14} strokeWidth={1.7} className={`text-[#A9814D] transition-transform duration-200 ${desktopDropdown === "deals" ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute left-1/2 top-full w-[280px] -translate-x-1/2 pt-3 transition-all duration-200 ${desktopDropdown === "deals" ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}>
                <div className="border border-[#E7E1D8] bg-white p-5 shadow-xl shadow-[#171412]/5">
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A9814D]">Special Offers</p>
                  </div>
                  <div className="space-y-1">
                    {deals.map((deal) => (
                      <Link key={deal.href} href={deal.href} className="group flex items-center justify-between px-3 py-3 text-sm font-medium text-[#171412] transition-colors hover:bg-[#FBF8F3]">
                        {deal.label}
                        <span className="translate-x-[-5px] text-[#A9814D] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDesktopDropdown("about")}
              onMouseLeave={() => setDesktopDropdown(null)}
            >
              <button type="button" className="flex items-center gap-1.5 py-7 text-[13px] font-medium tracking-wide text-[#171412]">
                About
                <ChevronDown size={14} strokeWidth={1.7} className={`text-[#A9814D] transition-transform duration-200 ${desktopDropdown === "about" ? "rotate-180" : ""}`} />
              </button>
              <div className={`absolute left-1/2 top-full w-[280px] -translate-x-1/2 pt-3 transition-all duration-200 ${desktopDropdown === "about" ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}>
                <div className="border border-[#E7E1D8] bg-white p-5 shadow-xl shadow-[#171412]/5">
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#A9814D]">Discover Our Brand</p>
                  </div>
                  <div className="space-y-1">
                    {aboutLinks.map((item) => (
                      <Link key={item.href} href={item.href} className="group flex items-center justify-between px-3 py-3 text-sm font-medium text-[#171412] transition-colors hover:bg-[#FBF8F3]">
                        {item.label}
                        <span className="translate-x-[-5px] text-[#A9814D] opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/contact" className="group relative py-7 text-[13px] font-medium tracking-wide text-[#171412]">
              Contact
              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#A9814D] transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden items-center gap-5 lg:flex">
            <Link href="/search" aria-label="Search" className="text-[#171412] transition-colors hover:text-[#A9814D]">
              <Search size={19} strokeWidth={1.6} />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className="relative text-[#171412] transition-colors hover:text-[#A9814D]">
              <Heart size={19} strokeWidth={1.6} />
              <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#A9814D] px-1 text-[9px] text-white">0</span>
            </Link>
            <Link href="/cart" aria-label="Cart" className="relative text-[#171412] transition-colors hover:text-[#A9814D]">
              <ShoppingBag size={20} strokeWidth={1.6} />
              <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#A9814D] px-1 text-[9px] text-white">0</span>
            </Link>
            <Link href="/account" aria-label="Account" className="text-[#171412] transition-colors hover:text-[#A9814D]">
              <User size={19} strokeWidth={1.6} />
            </Link>
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex items-center gap-4 lg:hidden">
            <Link href="/search" aria-label="Search" className="text-[#171412]">
              <Search size={20} strokeWidth={1.7} />
            </Link>
            <Link href="/cart" aria-label="Cart" className="relative text-[#171412]">
              <ShoppingBag size={20} strokeWidth={1.7} />
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#A9814D] px-1 text-[9px] text-white">0</span>
            </Link>
            <button type="button" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
              <Menu size={22} strokeWidth={1.7} className="text-[#171412]" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU DRAWER */}
      <div
        data-lenis-prevent
        className={`fixed inset-0 z-[60] lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Overlay */}
        <div
          onClick={closeMobile}
          data-lenis-prevent
          className={`absolute inset-0 bg-[#171412]/40 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
        />

        {/* Drawer */}
        <div
          data-lenis-prevent
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-[#FBF8F3] px-6 py-6 transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-[#E7E1D8] pb-6">
            <Link href="/" onClick={closeMobile} className="font-serif text-xl font-semibold tracking-[0.2em] text-[#171412]">
              NOVARA
            </Link>
            <button type="button" aria-label="Close menu" onClick={closeMobile} className="text-[#171412]">
              <X size={23} strokeWidth={1.6} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="mt-6">
            <Link href="/" onClick={closeMobile} className="block border-b border-[#E7E1D8] py-4 text-[15px] font-medium text-[#171412]">
              Home
            </Link>
            <Link href="/shop" onClick={closeMobile} className="block border-b border-[#E7E1D8] py-4 text-[15px] font-medium text-[#171412]">
              Shop
            </Link>

            {/* Categories */}
            <div className="border-b border-[#E7E1D8]">
              <button
                type="button"
                onClick={() => setMobileDropdown(mobileDropdown === "categories" ? null : "categories")}
                className="flex w-full items-center justify-between py-4 text-[15px] font-medium text-[#171412]"
              >
                Categories
                <ChevronDown size={17} className={`text-[#A9814D] transition-transform ${mobileDropdown === "categories" ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileDropdown === "categories" ? "max-h-96 pb-3" : "max-h-0"}`}>
                {categories.map((category) => (
                  <Link key={category.href} href={category.href} onClick={closeMobile} className="block py-2.5 pl-4 text-[15px] text-[#6B6560]">
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/new-arrivals" onClick={closeMobile} className="block border-b border-[#E7E1D8] py-4 text-[15px] font-medium text-[#171412]">
              New Arrivals
            </Link>

            {/* Deals */}
            <div className="border-b border-[#E7E1D8]">
              <button
                type="button"
                onClick={() => setMobileDropdown(mobileDropdown === "deals" ? null : "deals")}
                className="flex w-full items-center justify-between py-4 text-[15px] font-medium text-[#171412]"
              >
                Deals / Offers
                <ChevronDown size={17} className={`text-[#A9814D] transition-transform ${mobileDropdown === "deals" ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileDropdown === "deals" ? "max-h-72 pb-3" : "max-h-0"}`}>
                {deals.map((deal) => (
                  <Link key={deal.href} href={deal.href} onClick={closeMobile} className="block py-2.5 pl-4 text-[15px] text-[#6B6560]">
                    {deal.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="border-b border-[#E7E1D8]">
              <button
                type="button"
                onClick={() => setMobileDropdown(mobileDropdown === "about" ? null : "about")}
                className="flex w-full items-center justify-between py-4 text-[15px] font-medium text-[#171412]"
              >
                About
                <ChevronDown size={17} className={`text-[#A9814D] transition-transform ${mobileDropdown === "about" ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobileDropdown === "about" ? "max-h-72 pb-3" : "max-h-0"}`}>
                {aboutLinks.map((item) => (
                  <Link key={item.href} href={item.href} onClick={closeMobile} className="block py-2.5 pl-4 text-[15px] text-[#6B6560]">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/contact" onClick={closeMobile} className="block border-b border-[#E7E1D8] py-4 text-[15px] font-medium text-[#171412]">
              Contact
            </Link>
          </div>

          {/* Drawer Bottom Actions */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            <Link
              href="/wishlist"
              onClick={closeMobile}
              className="flex items-center justify-center gap-2 border border-[#E7E1D8] py-3 text-xs font-medium uppercase tracking-wider text-[#171412] transition-colors hover:border-[#A9814D] hover:text-[#A9814D]"
            >
              <Heart size={16} />
              Wishlist
            </Link>
            <Link
              href="/account"
              onClick={closeMobile}
              className="flex items-center justify-center gap-2 border border-[#E7E1D8] py-3 text-xs font-medium uppercase tracking-wider text-[#171412] transition-colors hover:border-[#A9814D] hover:text-[#A9814D]"
            >
              <User size={16} />
              Account
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
