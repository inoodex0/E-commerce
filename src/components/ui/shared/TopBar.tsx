import Link from "next/link";
import { User } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-[#171412] text-[#FBF8F3]">
      <div className="relative mx-auto h-9 max-w-7xl overflow-hidden px-4 sm:px-5 lg:px-6 xl:px-8">

        {/* Desktop */}
        <div className="hidden h-full items-center justify-between sm:flex">
          <a
            href="mailto:novara@example.com"
            className="shrink-0 text-[10px] font-medium tracking-[0.12em] text-white/80 transition-colors duration-300 hover:text-white"
          >
            novara@example.com
          </a>

          <div className="mx-6 flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Flash Sale</span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-white/70">Up to 20% Off — Watches, Bags &amp; Sunglasses</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Limited Time Only</span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-white/70">Free Shipping on Orders Over ৳5,000</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Flash Sale</span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-white/70">Up to 20% Off — Watches, Bags &amp; Sunglasses</span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Limited Time Only</span>
              <span className="text-[9px] uppercase tracking-[0.15em] text-white/70">Free Shipping on Orders Over ৳5,000</span>
            </div>
          </div>

          <Link
            href="/account"
            className="shrink-0 flex items-center gap-1.5 text-[10px] font-medium tracking-[0.12em] text-white/80 transition-colors duration-300 hover:text-white"
          >
            Login
            <User size={12} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Mobile - full width marquee */}
        <div className="absolute inset-0 flex items-center sm:hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-6">
            <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Flash Sale</span>
            <span className="text-[8px] uppercase tracking-[0.15em] text-white/70">Up to 20% Off — Watches, Bags &amp; Sunglasses</span>
            <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Limited Time Only</span>
            <span className="text-[8px] uppercase tracking-[0.15em] text-white/70">Free Shipping on Orders Over ৳5,000</span>
            <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Flash Sale</span>
            <span className="text-[8px] uppercase tracking-[0.15em] text-white/70">Up to 20% Off — Watches, Bags &amp; Sunglasses</span>
            <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Limited Time Only</span>
            <span className="text-[8px] uppercase tracking-[0.15em] text-white/70">Free Shipping on Orders Over ৳5,000</span>
          </div>
        </div>

      </div>
    </div>
  );
}
