"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  {
    label: "Watches",
    href: "/categories/watches",
  },
  {
    label: "Bags",
    href: "/categories/bags",
  },
  {
    label: "Wallets",
    href: "/categories/wallets",
  },
  {
    label: "Sunglasses",
    href: "/categories/sunglasses",
  },
  {
    label: "Jewelry",
    href: "/categories/jewelry",
  },
  {
    label: "Belts",
    href: "/categories/belts",
  },
  {
    label: "Perfumes",
    href: "/categories/perfumes",
  },
  {
    label: "Tech Accessories",
    href: "/categories/tech-accessories",
  },
];

const deals = [
  {
    label: "Discount Products",
    href: "/deals/discount-products",
  },
  {
    label: "Flash Sale",
    href: "/deals/flash-sale",
  },
  {
    label: "Coupons",
    href: "/deals/coupons",
  },
];

const aboutLinks = [
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Our Story",
    href: "/our-story",
  },
  {
    label: "Why Choose Us",
    href: "/why-choose-us",
  },
];

/* =========================================================
   COMPONENT
========================================================= */

export default function Navbar() {
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
     MOBILE BODY SCROLL LOCK
  ======================================================== */

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* =======================================================
     ESCAPE KEY
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

  /* =======================================================
     RETURN
  ======================================================== */

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* =====================================================
          ANNOUNCEMENT BAR
      ====================================================== */}

      <div className="bg-neutral-950 px-4 py-2.5 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white sm:text-[11px]">
        Free Shipping on Orders Over ৳5,000
      </div>

      {/* =====================================================
          MAIN NAVBAR
      ====================================================== */}

      <nav className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">

          {/* =================================================
              LOGO
          ================================================== */}

          <Link
            href="/"
            className="shrink-0 text-[21px] font-semibold tracking-[0.2em] text-neutral-950 transition-opacity duration-300 hover:opacity-70 sm:text-2xl"
          >
            NOVARA
          </Link>

          {/* =================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <div className="hidden items-center gap-6 lg:flex xl:gap-8">

            {/* -------------------------------------------------
                HOME
            -------------------------------------------------- */}

            <Link
              href="/"
              className="group relative py-7 text-[13px] font-medium tracking-wide text-neutral-900"
            >
              Home

              <span className="absolute bottom-0 left-0 h-px w-0 bg-neutral-950 transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* -------------------------------------------------
                SHOP
            -------------------------------------------------- */}

            <Link
              href="/shop"
              className="group relative py-7 text-[13px] font-medium tracking-wide text-neutral-900"
            >
              Shop

              <span className="absolute bottom-0 left-0 h-px w-0 bg-neutral-950 transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* =================================================
                CATEGORIES
            ================================================== */}

            <div
              className="relative"
              onMouseEnter={() =>
                setDesktopDropdown("categories")
              }
              onMouseLeave={() =>
                setDesktopDropdown(null)
              }
            >
              <button
                type="button"
                className="flex items-center gap-1.5 py-7 text-[13px] font-medium tracking-wide text-neutral-900"
              >
                Categories

                <ChevronDown
                  size={14}
                  strokeWidth={1.7}
                  className={`transition-transform duration-200 ${
                    desktopDropdown === "categories"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {/* Categories Mega Menu */}

              <div
                className={`absolute left-1/2 top-full w-[680px] -translate-x-1/2 pt-3 transition-all duration-200 ${
                  desktopDropdown === "categories"
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="border border-neutral-200 bg-white p-8 shadow-xl">

                  {/* Heading */}

                  <div className="mb-7">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                      Shop By Category
                    </p>

                    <h3 className="mt-2 text-xl font-medium text-neutral-950">
                      Explore Accessories
                    </h3>
                  </div>

                  {/* Categories */}

                  <div className="grid grid-cols-3 gap-x-10 gap-y-6">
                    {categories.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="group"
                      >
                        <span className="text-sm font-medium text-neutral-800 transition-colors duration-300 group-hover:text-neutral-500">
                          {category.label}
                        </span>

                        <span className="mt-2 block h-px w-0 bg-neutral-950 transition-all duration-300 group-hover:w-full" />
                      </Link>
                    ))}
                  </div>

                  {/* View All */}

                  <div className="mt-8 border-t border-neutral-200 pt-6">
                    <Link
                      href="/categories"
                      className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-900"
                    >
                      View All Categories

                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------
                NEW ARRIVALS
            -------------------------------------------------- */}

            <Link
              href="/new-arrivals"
              className="group relative py-7 text-[13px] font-medium tracking-wide text-neutral-900"
            >
              New Arrivals

              <span className="absolute bottom-0 left-0 h-px w-0 bg-neutral-950 transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* =================================================
                DEALS / OFFERS
            ================================================== */}

            <div
              className="relative"
              onMouseEnter={() =>
                setDesktopDropdown("deals")
              }
              onMouseLeave={() =>
                setDesktopDropdown(null)
              }
            >
              <button
                type="button"
                className="flex items-center gap-1.5 py-7 text-[13px] font-medium tracking-wide text-neutral-900"
              >
                Deals / Offers

                <ChevronDown
                  size={14}
                  strokeWidth={1.7}
                  className={`transition-transform duration-200 ${
                    desktopDropdown === "deals"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {/* Deals Dropdown */}

              <div
                className={`absolute left-1/2 top-full w-[290px] -translate-x-1/2 pt-3 transition-all duration-200 ${
                  desktopDropdown === "deals"
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="border border-neutral-200 bg-white p-5 shadow-xl">

                  <div className="mb-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                      Special Offers
                    </p>
                  </div>

                  <div className="space-y-1">
                    {deals.map((deal) => (
                      <Link
                        key={deal.href}
                        href={deal.href}
                        className="group flex items-center justify-between px-3 py-3 text-sm font-medium text-neutral-800 transition-colors duration-300 hover:bg-neutral-50"
                      >
                        {deal.label}

                        <span className="translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
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
              onMouseEnter={() =>
                setDesktopDropdown("about")
              }
              onMouseLeave={() =>
                setDesktopDropdown(null)
              }
            >
              <button
                type="button"
                className="flex items-center gap-1.5 py-7 text-[13px] font-medium tracking-wide text-neutral-900"
              >
                About

                <ChevronDown
                  size={14}
                  strokeWidth={1.7}
                  className={`transition-transform duration-200 ${
                    desktopDropdown === "about"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              {/* About Dropdown */}

              <div
                className={`absolute left-1/2 top-full w-[290px] -translate-x-1/2 pt-3 transition-all duration-200 ${
                  desktopDropdown === "about"
                    ? "visible translate-y-0 opacity-100"
                    : "invisible -translate-y-2 opacity-0"
                }`}
              >
                <div className="border border-neutral-200 bg-white p-5 shadow-xl">

                  <div className="mb-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                      Discover Our Brand
                    </p>
                  </div>

                  <div className="space-y-1">
                    {aboutLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center justify-between px-3 py-3 text-sm font-medium text-neutral-800 transition-colors duration-300 hover:bg-neutral-50"
                      >
                        {item.label}

                        <span className="translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
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
              className="group relative py-7 text-[13px] font-medium tracking-wide text-neutral-900"
            >
              Contact

              <span className="absolute bottom-0 left-0 h-px w-0 bg-neutral-950 transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          {/* =================================================
              DESKTOP ACTIONS
          ================================================== */}

          <div className="hidden items-center gap-5 lg:flex">

            {/* Search */}

            <Link
              href="/search"
              aria-label="Search"
              className="text-neutral-800 transition-all duration-300 hover:-translate-y-0.5 hover:text-neutral-500"
            >
              <Search
                size={19}
                strokeWidth={1.6}
              />
            </Link>

            {/* Wishlist */}

            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative text-neutral-800 transition-all duration-300 hover:-translate-y-0.5 hover:text-neutral-500"
            >
              <Heart
                size={19}
                strokeWidth={1.6}
              />

              <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-950 px-1 text-[9px] text-white">
                0
              </span>
            </Link>

            {/* Cart */}

            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className="relative text-neutral-800 transition-all duration-300 hover:-translate-y-0.5 hover:text-neutral-500"
            >
              <ShoppingBag
                size={20}
                strokeWidth={1.6}
              />

              <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-950 px-1 text-[9px] text-white">
                0
              </span>
            </Link>

            {/* Account */}

            <Link
              href="/account"
              aria-label="Account"
              className="text-neutral-800 transition-all duration-300 hover:-translate-y-0.5 hover:text-neutral-500"
            >
              <User
                size={19}
                strokeWidth={1.6}
              />
            </Link>
          </div>

          {/* =================================================
              MOBILE ACTIONS
          ================================================== */}

          <div className="flex items-center gap-4 lg:hidden">

            {/* Search */}

            <Link
              href="/search"
              aria-label="Search"
              className="transition-transform duration-300 active:scale-90"
            >
              <Search
                size={20}
                strokeWidth={1.7}
              />
            </Link>

            {/* Cart */}

            <Link
              href="/cart"
              aria-label="Shopping Cart"
              className="relative transition-transform duration-300 active:scale-90"
            >
              <ShoppingBag
                size={20}
                strokeWidth={1.7}
              />

              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-neutral-950 px-1 text-[9px] text-white">
                0
              </span>
            </Link>

            {/* Hamburger */}

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="transition-transform duration-300 active:scale-90"
            >
              <Menu
                size={23}
                strokeWidth={1.7}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* =====================================================
          MOBILE MENU OVERLAY
      ====================================================== */}

      <div
        className={`fixed inset-0 z-[100] lg:hidden ${
          mobileOpen
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
      >

        {/* ---------------------------------------------------
            BACKDROP
        ---------------------------------------------------- */}

        <div
          onClick={closeMobileMenu}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ease-out ${
            mobileOpen
              ? "opacity-100"
              : "opacity-0"
          }`}
        />

        {/* ---------------------------------------------------
            MOBILE DRAWER
        ---------------------------------------------------- */}

        <aside
          aria-hidden={!mobileOpen}
          className={`fixed right-0 top-0 h-dvh w-[88%] max-w-sm overflow-y-auto overscroll-contain bg-white shadow-2xl transition-transform duration-300 ease-out ${
            mobileOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >

          {/* =================================================
              DRAWER HEADER
          ================================================== */}

          <div className="sticky top-0 z-10 flex h-[76px] items-center justify-between border-b border-neutral-200 bg-white px-6">

            <Link
              href="/"
              onClick={closeMobileMenu}
              className="text-xl font-semibold tracking-[0.18em]"
            >
              NOVARA
            </Link>

            <button
              type="button"
              aria-label="Close menu"
              onClick={closeMobileMenu}
              className="transition-transform duration-300 active:rotate-90"
            >
              <X
                size={24}
                strokeWidth={1.6}
              />
            </button>
          </div>

          {/* =================================================
              MOBILE NAVIGATION
          ================================================== */}

          <div className="px-6 pb-10">

            {/* -------------------------------------------------
                HOME
            -------------------------------------------------- */}

            <Link
              href="/"
              onClick={closeMobileMenu}
              className="block border-b border-neutral-100 py-4 text-sm font-medium"
            >
              Home
            </Link>

            {/* -------------------------------------------------
                SHOP
            -------------------------------------------------- */}

            <Link
              href="/shop"
              onClick={closeMobileMenu}
              className="block border-b border-neutral-100 py-4 text-sm font-medium"
            >
              Shop
            </Link>

            {/* =================================================
                CATEGORIES ACCORDION
            ================================================== */}

            <div className="border-b border-neutral-100">

              <button
                type="button"
                aria-expanded={
                  mobileDropdown === "categories"
                }
                onClick={() =>
                  toggleMobileDropdown("categories")
                }
                className="flex w-full items-center justify-between py-4 text-left text-sm font-medium"
              >
                Categories

                <ChevronDown
                  size={17}
                  strokeWidth={1.7}
                  className={`transition-transform duration-300 ${
                    mobileDropdown === "categories"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  mobileDropdown === "categories"
                    ? "max-h-[600px] pb-3"
                    : "max-h-0"
                }`}
              >
                <div className="space-y-1 pl-3">
                  {categories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      onClick={closeMobileMenu}
                      className="group flex items-center justify-between py-2.5 text-sm text-neutral-600"
                    >
                      {category.label}

                      <span className="translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
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
              className="block border-b border-neutral-100 py-4 text-sm font-medium"
            >
              New Arrivals
            </Link>

            {/* =================================================
                DEALS / OFFERS ACCORDION
            ================================================== */}

            <div className="border-b border-neutral-100">

              <button
                type="button"
                aria-expanded={
                  mobileDropdown === "deals"
                }
                onClick={() =>
                  toggleMobileDropdown("deals")
                }
                className="flex w-full items-center justify-between py-4 text-left text-sm font-medium"
              >
                Deals / Offers

                <ChevronDown
                  size={17}
                  strokeWidth={1.7}
                  className={`transition-transform duration-300 ${
                    mobileDropdown === "deals"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  mobileDropdown === "deals"
                    ? "max-h-80 pb-3"
                    : "max-h-0"
                }`}
              >
                <div className="space-y-1 pl-3">
                  {deals.map((deal) => (
                    <Link
                      key={deal.href}
                      href={deal.href}
                      onClick={closeMobileMenu}
                      className="group flex items-center justify-between py-2.5 text-sm text-neutral-600"
                    >
                      {deal.label}

                      <span className="translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
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

            <div className="border-b border-neutral-100">

              <button
                type="button"
                aria-expanded={
                  mobileDropdown === "about"
                }
                onClick={() =>
                  toggleMobileDropdown("about")
                }
                className="flex w-full items-center justify-between py-4 text-left text-sm font-medium"
              >
                About

                <ChevronDown
                  size={17}
                  strokeWidth={1.7}
                  className={`transition-transform duration-300 ${
                    mobileDropdown === "about"
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-out ${
                  mobileDropdown === "about"
                    ? "max-h-80 pb-3"
                    : "max-h-0"
                }`}
              >
                <div className="space-y-1 pl-3">
                  {aboutLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="group flex items-center justify-between py-2.5 text-sm text-neutral-600"
                    >
                      {item.label}

                      <span className="translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
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
              className="block border-b border-neutral-100 py-4 text-sm font-medium"
            >
              Contact
            </Link>

            {/* =================================================
                MOBILE ACTIONS
            ================================================== */}

            <div className="mt-8 grid grid-cols-2 gap-3">

              <Link
                href="/wishlist"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 border border-neutral-200 py-3 text-xs font-medium uppercase tracking-wider transition-colors duration-300 hover:bg-neutral-50"
              >
                <Heart size={16} />
                Wishlist
              </Link>

              <Link
                href="/account"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 border border-neutral-200 py-3 text-xs font-medium uppercase tracking-wider transition-colors duration-300 hover:bg-neutral-50"
              >
                <User size={16} />
                Account
              </Link>
            </div>

            {/* =================================================
                MOBILE FOOTER TEXT
            ================================================== */}

            <div className="mt-10 border-t border-neutral-200 pt-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                Premium Accessories
              </p>

              <p className="mt-2 text-xs leading-5 text-neutral-500">
                Timeless accessories designed for
                modern everyday living.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}