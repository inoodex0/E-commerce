import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShoppingBag } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const formattedCategory = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const items = [
    { id: 1, name: `Signature ${formattedCategory} Piece 01`, price: "$290.00", image: "/images/a1.jpg" },
    { id: 2, name: `Limited ${formattedCategory} Drop 02`, price: "$420.00", image: "/images/a2.avif" },
    { id: 3, name: `Artisan ${formattedCategory} Craft 03`, price: "$195.00", image: "/images/a3avif.avif" },
    { id: 4, name: `Premium ${formattedCategory} Select 04`, price: "$350.00", image: "/images/a4.avif" },
    { id: 5, name: `Exclusive ${formattedCategory} Edition 05`, price: "$510.00", image: "/images/a5.avif" },
    { id: 6, name: `Handmade ${formattedCategory} Luxury 06`, price: "$275.00", image: "/images/a6.avif" },
  ];

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
    

        <div className="mt-6 border-b border-[#E7E1D8] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Category</p>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl">
            {formattedCategory}
          </h1>
          <p className="mt-2 text-sm text-[#6B6560]">Explore curated luxury {formattedCategory.toLowerCase()}</p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative flex flex-col overflow-hidden border border-[#E7E1D8] bg-white transition-all duration-300 hover:shadow-lg hover:shadow-[#171412]/5"
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
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#fd6f93]">
                  {formattedCategory}
                </span>
                <h3 className="mt-1 font-serif text-lg font-medium text-[#171412]">{item.name}</h3>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-sm font-semibold text-[#171412]">{item.price}</span>
                  <button className="flex items-center gap-1.5 border border-[#171412] bg-[#171412] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#fd6f93] hover:border-[#fd6f93]">
                    <ShoppingBag size={14} /> Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
