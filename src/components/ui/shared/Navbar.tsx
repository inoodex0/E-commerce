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
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type DropdownType = "categories" | "deals" | "about" | null;

/* =========================================================
   DATA
========================================================= */

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

/* =========================================================
   COMPONENT
========================================================= */

export default function Navbar() {
  /* =======================================================
     LENIS
  ======================================================== */

  const lenis = useLenis();

  /* =======================================================
     STATES
  ======================================================== */

  const [mobileOpen, setMobileOpen] = useState(false);

  const [desktopDropdown, setDesktopDropdown] =
    useState<DropdownType>(null);

  const [mobileDropdown, setMobileDropdown] =
    useState<DropdownType>(null);

  /* =======================================================
     CLOSE MOBILE MENU
  ======================================================== */

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileDropdown(null);
  };

  /* =======================================================
     CLEANUP STALE STYLES + SCROLL LOCK
  ======================================================== */

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

    if (mobileOpen) {
      lenis?.stop();
      body.style.overflow = "hidden";
    } else {
      lenis?.start();
      body.style.overflow = "";
    }

    return () => {
      lenis?.start();
      body.style.overflow = "";
      html.removeAttribute("data-lenis-prevent");
      html.style.overflow = "";
      html.style.touchAction = "";
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
    };
  }, [mobileOpen, lenis]);

  /* =======================================================
     ESCAPE KEY & CLICK OUTSIDE FOR DROPDOWNS
  ======================================================== */

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobileMenu();
        setDesktopDropdown(null);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* =======================================================
     TOGGLE MOBILE DROPDOWN
  ======================================================== */

  const toggleMobileDropdown = (dropdown: DropdownType) => {
    setMobileDropdown((current) =>
      current === dropdown ? null : dropdown
    );
  };

  const toggleDesktopDropdown = (dropdown: DropdownType) => {
    setDesktopDropdown((current) => (current === dropdown ? null : dropdown));
  };

  /* =======================================================
     RETURN
  ======================================================== */

  return (
    <>
    <header
      className={`sticky top-0 z-50 w-full bg-[#FBF8F3] ${mobileOpen ? "invisible" : ""}`}
    >
      {/* =====================================================
          ANNOUNCEMENT BAR
      ====================================================== */}

      <TopBar />

      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}



      <nav className="border-b border-[#E7E1D8] bg-[#FBF8F3]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-5 lg:h-[76px] lg:px-6 xl:px-8">

          {/* =================================================
              MOBILE HAMBURGER (left)
          ================================================== */}

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="transition-transform duration-300 active:scale-90 lg:hidden"
          >
            <Menu size={21} strokeWidth={1.7} className="sm:h-[22px] sm:w-[22px]" />
          </button>

          {/* =================================================
              LOGO (center on mobile, left on desktop)
          ================================================== */}

          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 font-serif text-[20px] font-semibold tracking-[0.22em] text-[#171412] transition-opacity duration-300 hover:opacity-70 sm:text-[24px] lg:static lg:translate-x-0 lg:text-[26px] xl:tracking-[0.28em]"
          >
            NOVARA
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <div className="hidden min-w-0 items-center gap-3 lg:flex lg:gap-4 xl:gap-6 2xl:gap-8">

            {/* -------------------------------------------------
                HOME
            -------------------------------------------------- */}

            <Link
              href="/"
              className="group relative whitespace-nowrap py-7 text-[13px] font-normal tracking-wide text-[#171412]/80 xl:text-[14.5px]"
            >
              Home
              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#ff6289] transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* -------------------------------------------------
                SHOP
            -------------------------------------------------- */}

            <Link
              href="/shop"
              className="group relative whitespace-nowrap py-7 text-[13px] font-normal tracking-wide text-[#171412]/80 xl:text-[14.5px]"
            >
              Shop
              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#ff6289] transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* =================================================
                CATEGORIES
            ================================================== */}

            {/* =================================================
                CATEGORIES
            ================================================== */}

            <div
              className="relative"
              onMouseEnter={() => setDesktopDropdown("categories")}
              onMouseLeave={() => setDesktopDropdown(null)}
            >
              <button
                type="button"
                onClick={() => toggleDesktopDropdown("categories")}
                className="flex items-center gap-1.5 whitespace-nowrap py-7 text-[13px] font-normal tracking-wide text-[#171412]/80 xl:text-[14.5px]"
              >
                Categories
                <ChevronDown
                  size={14}
                  strokeWidth={1.7}
                  className={`text-[#ff6289] transition-transform duration-200 ${
                    desktopDropdown === "categories" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Categories Mega Menu */}

              <div
                className={`absolute left-1/2 top-full w-[92vw] max-w-[680px] -translate-x-1/2 pt-3 transition-all duration-200 ${
                  desktopDropdown === "categories"
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="border border-[#E7E1D8] bg-white p-6 shadow-xl shadow-[#171412]/5 sm:p-8">

                  {/* Heading */}

                  <div className="mb-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ff6289]">
                      Shop By Category
                    </p>
                    <h3 className="mt-2 font-serif text-xl font-medium text-[#171412]">
                      Explore Accessories
                    </h3>
                  </div>

                  {/* Categories */}

                  <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 sm:gap-x-10 sm:gap-y-6">
                    {categories.map((category) => (
                      <Link key={category.href} href={category.href} onClick={() => setDesktopDropdown(null)} className="group">
                        <span className="text-sm font-medium text-[#171412] transition-colors duration-300 group-hover:text-[#ff6289]">
                          {category.label}
                        </span>
                        <span className="mt-2 block h-px w-0 bg-[#ff6289] transition-all duration-300 group-hover:w-full" />
                      </Link>
                    ))}
                  </div>

                  {/* View All */}

                  
                </div>
              </div>
            </div>

            {/* -------------------------------------------------
                NEW ARRIVALS
            -------------------------------------------------- */}

            <Link
              href="/new-arrivals"
              className="group relative whitespace-nowrap py-7 text-[13px] font-normal tracking-wide text-[#171412]/80 xl:text-[14.5px]"
            >
              New Arrivals
              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#ff6289] transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* =================================================
                DEALS / OFFERS
            ================================================== */}

            <div
              className="relative"
              onMouseEnter={() => setDesktopDropdown("deals")}
              onMouseLeave={() => setDesktopDropdown(null)}
            >
              <button
                type="button"
                onClick={() => toggleDesktopDropdown("deals")}
                className="flex items-center gap-1.5 whitespace-nowrap py-7 text-[13px] font-normal tracking-wide text-[#171412]/80 xl:text-[14.5px]"
              >
                Deals 
                <ChevronDown
                  size={14}
                  strokeWidth={1.7}
                  className={`text-[#ff6289] transition-transform duration-200 ${
                    desktopDropdown === "deals" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Deals Dropdown */}

              <div
                className={`absolute left-1/2 top-full w-[90vw] max-w-[290px] -translate-x-1/2 pt-3 transition-all duration-200 ${
                  desktopDropdown === "deals"
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="border border-[#E7E1D8] bg-white p-5 shadow-xl shadow-[#171412]/5">
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ff6289]">
                      Special Offers
                    </p>
                  </div>

                  <div className="space-y-1">
                    {deals.map((deal) => (
                      <Link
                        key={deal.href}
                        href={deal.href}
                        onClick={() => setDesktopDropdown(null)}
                        className="group flex items-center justify-between px-3 py-3 text-sm font-medium text-[#171412] transition-colors duration-300 hover:bg-[#FBF8F3]"
                      >
                        {deal.label}
                        <span className="translate-x-2 text-[#ff6289] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                ABOUT
            ================================================== */}

            <div
              className="relative"
              onMouseEnter={() => setDesktopDropdown("about")}
              onMouseLeave={() => setDesktopDropdown(null)}
            >
              <button
                type="button"
                onClick={() => toggleDesktopDropdown("about")}
                className="flex items-center gap-1.5 whitespace-nowrap py-7 text-[13px] font-normal tracking-wide text-[#171412]/80 xl:text-[14.5px]"
              >
                About
                <ChevronDown
                  size={14}
                  strokeWidth={1.7}
                  className={`text-[#ff6289] transition-transform duration-200 ${
                    desktopDropdown === "about" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* About Dropdown */}

              <div
                className={`absolute left-1/2 top-full w-[90vw] max-w-[290px] -translate-x-1/2 pt-3 transition-all duration-200 ${
                  desktopDropdown === "about"
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="border border-[#E7E1D8] bg-white p-5 shadow-xl shadow-[#171412]/5">
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#ff6289]">
                      Discover Our Brand
                    </p>
                  </div>

                  <div className="space-y-1">
                    {aboutLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDesktopDropdown(null)}
                        className="group flex items-center justify-between px-3 py-3 text-sm font-medium text-[#171412] transition-colors duration-300 hover:bg-[#FBF8F3]"
                      >
                        {item.label}
                        <span className="translate-x-2 text-[#ff6289] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------
                CONTACT
            -------------------------------------------------- */}

            <Link
              href="/contact"
              className="group relative whitespace-nowrap py-7 text-[13px] font-normal tracking-wide text-[#171412]/80 xl:text-[14.5px]"
            >
              Contact
              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#ff6289] transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          {/* =================================================
              DESKTOP ACTIONS
          ================================================== */}

          <div className="hidden shrink-0 items-center gap-3.5 lg:flex xl:gap-5">

            {/* Search */}

            <Link
              href="/search"
              aria-label="Search"
              className="text-[#171412] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#ff6289]"
            >
              <Search size={18} strokeWidth={1.6} className="xl:h-[19px] xl:w-[19px]" />
            </Link>

            {/* Wishlist */}

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative text-[#171412] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#ff6289]"
            >
              <Heart size={18} strokeWidth={1.6} className="xl:h-[19px] xl:w-[19px]" />
              <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff6289] px-1 text-[9px] text-white">
                0
              </span>
            </Link>

            {/* Cart */}

            <div
              className="relative"
              onMouseEnter={() => setDesktopDropdown("cart")}
              onMouseLeave={() => setDesktopDropdown(null)}
            >
              <Link
                href="/cart"
                aria-label="Shopping Cart"
                className="relative text-[#171412] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#ff6289]"
              >
                <ShoppingBag size={19} strokeWidth={1.6} className="xl:h-5 xl:w-5" />
                <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff6289] px-1 text-[9px] text-white">
                  0
                </span>
              </Link>

              {/* Cart Dropdown */}
              <div
                className={`absolute right-0 top-ful mt-6  w-[320px] pt-3 transition-all duration-200 ${
                  desktopDropdown === "cart"
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="border border-[#E7E1D8] bg-white p-6 shadow-xl shadow-[#171412]/5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#171412]">
                    NO PRODUCTS IN THE CART.
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-[#E7E1D8] pt-5">
                    <Link
                      href="/cart"
                      className="inline-flex  mt-6 items-center gap-2 border border-[#171412] bg-[#171412] px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-[#ff6289] hover:border-[#ff6289]"
                    >
                      CART
                      <ShoppingBag size={13} strokeWidth={1.5} />
                    </Link>
                    <p className="text-[11px]  mt-6  font-semibold uppercase tracking-[0.1em] text-[#171412]">
                      TOTAL: <span className="text-[#ff6289]">$0.00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account */}

            {/* <Link
              href="/account"
              aria-label="Account"
              className="text-[#171412] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#ff6289]"
            >
              <User size={18} strokeWidth={1.6} className="xl:h-[19px] xl:w-[19px]" />
            </Link> */}
          </div>

          {/* =================================================
              MOBILE ACTIONS
          ================================================== */}

          <div className="flex items-center gap-3.5 text-[#171412] sm:gap-4 lg:hidden">

            {/* Search */}

            <Link
              href="/search"
              aria-label="Search"
              className="transition-transform duration-300 active:scale-90"
            >
              <Search size={19} strokeWidth={1.7} className="sm:h-5 sm:w-5" />
            </Link>

            {/* Cart */}

            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className="relative transition-transform duration-300 active:scale-90"
            >
              <ShoppingBag size={19} strokeWidth={1.7} className="sm:h-5 sm:w-5" />
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ff6289] px-1 text-[9px] text-white">
                0
              </span>
            </Link>
          </div>
        </div>
      </nav>

    </header>

      {/* =====================================================
          MOBILE MENU OVERLAY (outside header to escape z-50)
      ====================================================== */}

      <div
        className={`fixed inset-0 z-[100] lg:hidden ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >

        {/* ---------------------------------------------------
            BACKDROP
        ---------------------------------------------------- */}

        <div
          onClick={closeMobileMenu}
          className={`absolute inset-0 bg-[#171412]/40 transition-opacity duration-300 ease-out ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* ---------------------------------------------------
            MOBILE DRAWER
        ---------------------------------------------------- */}

        <aside
          aria-hidden={!mobileOpen}
          data-lenis-prevent
          onWheel={(e) => e.stopPropagation()}
          className={`mobile-drawer-scroll fixed right-0 top-0 h-dvh w-[88%] max-w-sm overflow-y-auto bg-[#FBF8F3] shadow-2xl transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >

          {/* =================================================
              DRAWER HEADER
          ================================================== */}

          <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-[#E7E1D8] bg-[#FBF8F3] px-5 sm:h-[72px] sm:px-6">

            <Link
              href="/"
              onClick={closeMobileMenu}
              className="font-serif text-lg font-semibold tracking-[0.2em] text-[#171412] sm:text-xl sm:tracking-[0.22em]"
            >
              NOVARA
            </Link>

            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMobileMenu}
              className="text-[#171412] transition-transform duration-300 active:rotate-90"
            >
              <X size={22} strokeWidth={1.6} className="sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* =================================================
              MOBILE NAVIGATION
          ================================================== */}

          <div className="px-5 pb-10 sm:px-6">

            {/* -------------------------------------------------
                HOME
            -------------------------------------------------- */}

            <Link
              href="/"
              onClick={closeMobileMenu}
              className="block border-b border-[#E7E1D8] py-4 text-sm font-medium text-[#171412] sm:py-5 sm:text-[15px]"
            >
              Home
            </Link>

            {/* -------------------------------------------------
                SHOP
            -------------------------------------------------- */}

            <Link
              href="/shop"
              onClick={closeMobileMenu}
              className="block border-b border-[#E7E1D8] py-4 text-sm font-medium text-[#171412] sm:py-5 sm:text-[15px]"
            >
              Shop
            </Link>

            {/* =================================================
                CATEGORIES ACCORDION
            ================================================== */}

            <div className="border-b border-[#E7E1D8]">

              <button
                type="button"
                aria-expanded={mobileDropdown === "categories"}
                onClick={() => toggleMobileDropdown("categories")}
                className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[#171412] sm:py-5 sm:text-[15px]"
              >
                Categories
                <ChevronDown
                  size={17}
                  strokeWidth={1.7}
                  className={`text-[#ff6289] transition-transform duration-300 ${
                    mobileDropdown === "categories" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  mobileDropdown === "categories" ? "max-h-[600px] pb-3" : "max-h-0"
                }`}
              >
                <div className="space-y-1 pl-3">
                  {categories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      onClick={closeMobileMenu}
                      className="group flex items-center justify-between py-2.5 text-sm text-[#6B6560] sm:text-[15px]"
                    >
                      {category.label}
                      <span className="translate-x-2 text-[#ff6289] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* -------------------------------------------------
                NEW ARRIVALS
            -------------------------------------------------- */}

            <Link
              href="/new-arrivals"
              onClick={closeMobileMenu}
              className="block border-b border-[#E7E1D8] py-4 text-sm font-medium text-[#171412] sm:py-5 sm:text-[15px]"
            >
              New Arrivals
            </Link>

            {/* =================================================
                DEALS / OFFERS ACCORDION
            ================================================== */}

            <div className="border-b border-[#E7E1D8]">

              <button
                type="button"
                aria-expanded={mobileDropdown === "deals"}
                onClick={() => toggleMobileDropdown("deals")}
                className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[#171412] sm:py-5 sm:text-[15px]"
              >
                Deals 
                <ChevronDown
                  size={17}
                  strokeWidth={1.7}
                  className={`text-[#ff6289] transition-transform duration-300 ${
                    mobileDropdown === "deals" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  mobileDropdown === "deals" ? "max-h-80 pb-3" : "max-h-0"
                }`}
              >
                <div className="space-y-1 pl-3">
                  {deals.map((deal) => (
                    <Link
                      key={deal.href}
                      href={deal.href}
                      onClick={closeMobileMenu}
                      className="group flex items-center justify-between py-2.5 text-sm text-[#6B6560] sm:text-[15px]"
                    >
                      {deal.label}
                      <span className="translate-x-2 text-[#ff6289] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* =================================================
                ABOUT ACCORDION
            ================================================== */}

            <div className="border-b border-[#E7E1D8]">

              <button
                type="button"
                aria-expanded={mobileDropdown === "about"}
                onClick={() => toggleMobileDropdown("about")}
                className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-[#171412] sm:py-5 sm:text-[15px]"
              >
                About
                <ChevronDown
                  size={17}
                  strokeWidth={1.7}
                  className={`text-[#ff6289] transition-transform duration-300 ${
                    mobileDropdown === "about" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  mobileDropdown === "about" ? "max-h-80 pb-3" : "max-h-0"
                }`}
              >
                <div className="space-y-1 pl-3">
                  {aboutLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="group flex items-center justify-between py-2.5 text-sm text-[#6B6560] sm:text-[15px]"
                    >
                      {item.label}
                      <span className="translate-x-2 text-[#ff6289] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* -------------------------------------------------
                CONTACT
            -------------------------------------------------- */}

            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="block border-b border-[#E7E1D8] py-4 text-sm font-medium text-[#171412] sm:py-5 sm:text-[15px]"
            >
              Contact
            </Link>

            {/* =================================================
                MOBILE ACTIONS
            ================================================== */}

            <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8">

              <Link
                href="/wishlist"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 border border-[#E7E1D8] py-3 px-2 text-xs font-medium uppercase tracking-wider text-[#171412] transition-colors duration-300 hover:border-[#ff6289] hover:text-[#ff6289] sm:py-4"
              >
                <Heart size={16} />
                Wishlist
              </Link>

              <Link
                href="/account"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 border border-[#E7E1D8] py-3 text-xs font-medium uppercase tracking-wider text-[#171412] transition-colors duration-300 hover:border-[#ff6289] hover:text-[#ff6289] sm:py-4"
              >
                <User size={16} />
                Account
              </Link>
            </div>

            {/* =================================================
                MOBILE FOOTER
            ================================================== */}

            {/* <div className="mt-10 border-t border-[#E7E1D8] pt-6">
              <p className="text-center text-[10px] uppercase tracking-[0.2em] text-[#6B6560]">
                Crafted Accessories, Delivered With Care
              </p>
            </div> */}
          </div>
        </aside>
      </div>
    </>
  );
}
