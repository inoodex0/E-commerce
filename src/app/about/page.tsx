import Link from "next/link";
import { ArrowLeft, ShieldCheck, Gem, Sparkles } from "lucide-react";

export default function AboutPage() {
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6289]">About NOVARA</p>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl">
            Redefining Everyday Luxury
          </h1>
        </div>

        <div className="mt-8 space-y-6 text-[#6B6560] leading-relaxed">
          <p>
            At <strong>NOVARA</strong>, we craft timeless luxury accessories designed to empower personal expression. Every timepiece, bag, and item in our collection embodies meticulous craftsmanship, premium raw materials, and enduring style.
          </p>
          <p>
            Founded with a passion for architectural design and uncompromised detail, NOVARA creates quiet luxury essentials that seamlessly bridge classic elegance with modern versatility.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="border border-[#E7E1D8] bg-white p-6 text-center">
              <Gem className="mx-auto text-[#ff6289]" size={32} />
              <h3 className="mt-3 font-serif text-base font-semibold text-[#171412]">Artisan Made</h3>
              <p className="mt-1 text-xs text-[#6B6560]">Hand-finished by master craftspeople.</p>
            </div>
            <div className="border border-[#E7E1D8] bg-white p-6 text-center">
              <ShieldCheck className="mx-auto text-[#ff6289]" size={32} />
              <h3 className="mt-3 font-serif text-base font-semibold text-[#171412]">Guaranteed Quality</h3>
              <p className="mt-1 text-xs text-[#6B6560]">Built to endure for generations.</p>
            </div>
            <div className="border border-[#E7E1D8] bg-white p-6 text-center">
              <Sparkles className="mx-auto text-[#ff6289]" size={32} />
              <h3 className="mt-3 font-serif text-base font-semibold text-[#171412]">Ethical Luxury</h3>
              <p className="mt-1 text-xs text-[#6B6560]">Sustainably sourced premium leather & gold.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
