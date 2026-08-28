import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff6289] transition-colors hover:text-[#171412]"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="mt-6 border-b border-[#E7E1D8] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6289]">Shopping Bag</p>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl">
            Your Cart
          </h1>
        </div>

        <div className="mt-8 border border-[#E7E1D8] bg-white p-12 text-center shadow-sm">
          <ShoppingBag className="mx-auto text-[#ff6289]" size={48} strokeWidth={1.5} />
          <h3 className="mt-4 font-serif text-xl font-medium text-[#171412]">Your Cart is Currently Empty</h3>
          <p className="mt-2 text-sm text-[#6B6560]">Explore our signature collection to add luxury accessories.</p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 border border-[#171412] bg-[#171412] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#ff6289] hover:border-[#ff6289]"
          >
            Shop Collection
          </Link>
        </div>
      </div>
    </main>
  );
}
