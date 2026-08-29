import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Tag, ShoppingBag } from "lucide-react";

interface DealsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DealsPage({ params }: DealsPageProps) {
  const { slug } = await params;
  const formattedDeal = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const deals = [
    { id: 1, name: "Luxury Chrono Watch", originalPrice: "$500.00", dealPrice: "$340.00", image: "/images/a1.jpg" },
    { id: 2, name: "Artisan Leather Bag", originalPrice: "$650.00", dealPrice: "$490.00", image: "/images/a2.avif" },
  ];

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#fd6f93] transition-colors hover:text-[#171412]"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="mt-6 border-b border-[#E7E1D8] pb-6">
          <div className="flex items-center gap-2 text-[#fd6f93]">
            <Tag size={16} />
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Exclusive Offer</p>
          </div>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl">
            {formattedDeal}
          </h1>
          <p className="mt-2 text-sm text-[#6B6560]">Special pricing on select handcrafted pieces for a limited time.</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col overflow-hidden border border-[#E7E1D8] bg-white transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#F5F2EC]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-lg font-medium text-[#171412]">{item.name}</h3>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-[#fd6f93]">{item.dealPrice}</span>
                    <span className="text-xs text-[#6B6560] line-through">{item.originalPrice}</span>
                  </div>
                  <button className="flex items-center gap-1.5 border border-[#171412] bg-[#171412] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#fd6f93] hover:border-[#fd6f93]">
                    <ShoppingBag size={14} /> Claim Deal
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
