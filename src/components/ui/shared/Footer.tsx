"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  ArrowUp,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { FormEvent, useState } from "react";

const shopLinks = [
  { name: "All Products", href: "/shop" },
  { name: "New Arrivals", href: "/shop?filter=new" },
  { name: "Best Sellers", href: "/shop?filter=best" },
  { name: "Deals & Offers", href: "/deals" },
];

const helpLinks = [
  { name: "Contact Us", href: "/contact" },
  { name: "Shipping & Delivery", href: "/shipping" },
  { name: "Returns & Exchange", href: "/returns" },
  { name: "FAQs", href: "/faq" },
];

const aboutLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Story", href: "/our-story" },
  { name: "Why Choose Us", href: "/#why-choose-us" },
  { name: "Partnerships", href: "/partnerships" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#0a0a0a] text-white border-t border-white/5 relative overflow-hidden">
      {/* Accent gradient line at the very top */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#fd6f93]/70 to-transparent" />

      {/* =====================================================
          MAIN FOOTER CONTENT
      ====================================================== */}
      <div className="mx-auto max-w-[1600px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr] xl:gap-16">
          {/* Brand Presentation & Socials */}
          <div className="flex flex-col space-y-6">
            <div>
              <Link
                href="/"
                className="font-serif text-4xl font-medium tracking-[0.15em] text-white transition-opacity duration-300 hover:opacity-75 sm:text-5xl"
              >
                NOVARA
              </Link>
              <p className="mt-4 max-w-sm font-serif text-sm italic leading-relaxed text-neutral-400">
                Crafting premium accessories for those who believe elegance lies in the details.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-2.5 pt-2">
              <a
                href="mailto:hello@novara.com"
                className="flex items-center gap-3 text-xs text-neutral-300 transition-colors duration-300 hover:text-[#fd6f93]"
              >
                <Mail size={14} strokeWidth={1.5} className="text-[#fd6f93]" />
                hello@novara.com
              </a>
              <span className="flex items-center gap-3 text-xs text-neutral-400">
                <Phone size={14} strokeWidth={1.5} className="text-[#fd6f93]" />
                +880 1700-000000
              </span>
              <span className="flex items-start gap-3 text-xs text-neutral-400">
                <MapPin size={14} strokeWidth={1.5} className="text-[#fd6f93] shrink-0 mt-0.5" />
                Dhaka, Bangladesh
              </span>
            </div>

            {/* Social Icons with Premium Animation */}
            <div className="flex items-center gap-3 pt-2">
              {[
                {
                  label: "Instagram",
                  icon: (
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  ),
                },
                {
                  label: "Facebook",
                  icon: (
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  ),
                },
                {
                  label: "Pinterest",
                  icon: (
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M8 22a9 9 0 0 1-1.91-8.39c.56-2 1.94-3.72 3.75-4.82A9.9 9.9 0 0 1 15 7.5c2.25 0 4.3.85 5.86 2.25A9 9 0 0 1 12 24a8.9 8.9 0 0 1-4-2z"/><circle cx="12" cy="12" r="3"/></svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-all duration-300 hover:scale-105 hover:border-[#fd6f93] hover:bg-[#fd6f93] hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Columns */}
          <FooterColumn title="Shop Collection" links={shopLinks} />
          <FooterColumn title="Customer Care" links={helpLinks} />

          {/* Newsletter Section */}
          <div className="flex flex-col space-y-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#fd6f93]">
              Boutique Newsletter
            </p>
            <h3 className="font-serif text-lg font-medium text-neutral-200 leading-tight">
              Subscribe to stay updated.
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed max-w-xs">
              Receive notifications for exclusive collections, signature arrivals, and seasonal drops.
            </p>

            <form onSubmit={handleSubscribe} className="mt-2 flex w-full relative">
              <input
                type="email"
                placeholder="E-mail address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 w-full border-b border-white/20 bg-transparent text-xs text-white outline-none placeholder:text-neutral-600 focus:border-[#fd6f93] transition-colors pr-10"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-0 top-0 flex h-11 w-8 items-center justify-center text-neutral-400 transition-colors duration-300 hover:text-[#fd6f93]"
              >
                <ArrowUpRight size={16} strokeWidth={1.5} />
              </button>
            </form>

            {subscribed && (
              <p className="text-[10px] text-[#fd6f93] animate-pulse font-medium tracking-wide">
                ✓ Welcome to Novara. Check your inbox.
              </p>
            )}
          </div>
        </div>

        {/* =====================================================
            BOTTOM PAYMENT & COPYRIGHT BAR
        ====================================================== */}
        <div className="mt-8 border-t border-white/5 pt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[9px] uppercase tracking-[0.16em] text-neutral-400">
              © {new Date().getFullYear()} NOVARA. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[9px] uppercase tracking-[0.15em] text-neutral-400">
              <Link href="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Premium Clean SVG Payment Badges */}
          <div className="flex items-center gap-3 opacity-45 hover:opacity-75 transition-opacity duration-300">
            {/* Visa */}
            <span className="flex h-6 w-10 items-center justify-center rounded-sm bg-neutral-900 border border-white/10 text-[9px] font-bold tracking-wider text-white">
              VISA
            </span>
            {/* Mastercard */}
            <span className="flex h-6 w-10 items-center justify-center rounded-sm bg-neutral-900 border border-white/10">
              <span className="flex -space-x-1">
                <span className="h-3 w-3 rounded-full bg-neutral-500" />
                <span className="h-3 w-3 rounded-full bg-neutral-400" />
              </span>
            </span>
            {/* Amex */}
            <span className="flex h-6 w-10 items-center justify-center rounded-sm bg-neutral-900 border border-white/10 text-[8px] font-semibold text-white">
              AMEX
            </span>
            {/* bKash */}
            <span className="flex h-6 w-10 items-center justify-center rounded-sm bg-neutral-900 border border-white/10 text-[8px] font-bold text-[#e2136e]">
              bkash
            </span>
            {/* Nagad */}
            <span className="flex h-6 w-10 items-center justify-center rounded-sm bg-neutral-900 border border-white/10 text-[8px] font-bold text-[#ff6a00]">
              nagad
            </span>
          </div>

          {/* Interactive Floating / Contained Back to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-all duration-300 hover:border-[#fd6f93] hover:bg-neutral-900 hover:text-white"
            aria-label="Scroll to top"
          >
            <ArrowUp
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   FOOTER COLUMN COMPONENT
============================================================ */
interface FooterColumnProps {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="flex flex-col space-y-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#fd6f93]">
        {title}
      </p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1 text-[11px] text-neutral-400 transition-colors duration-300 hover:text-white"
            >
              {link.name}
              <ArrowUpRight
                size={11}
                strokeWidth={1}
                className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-[#fd6f93]"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}