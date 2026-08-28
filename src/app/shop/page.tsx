import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, SlidersHorizontal, ShoppingBag } from "lucide-react";

const products = [
  { id: 1, name: "Chronograph Noir Watch", category: "Watches", price: "$340.00", image: "/images/a1.jpg" },
  { id: 2, name: "Luxe Leather Tote Bag", category: "Bags", price: "$490.00", image: "/images/a2.avif" },
  { id: 3, name: "Gold Minimalist Bracelet", category: "Jewelry", price: "$180.00", image: "/images/a3avif.avif" },
  { id: 4, name: "Classic Aviator Sunglasses", category: "Sunglasses", price: "$210.00", image: "/images/a4.avif" },
  { id: 5, name: "Artisan Leather Wallet", category: "Wallets", price: "$120.00", image: "/images/a5.avif" },
  { id: 6, name: "Signature Velvet Pouch", category: "Tech Accessories", price: "$95.00", image: "/images/a6.avif" },
];

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb / Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff6289] transition-colors hover:text-[#171412]"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Page Title */}
        <div className="mt-6 flex flex-col justify-between border-b border-[#E7E1D8] pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6289]">Collection</p>
            <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl">
              Shop All Products
            </h1>
          </div>
          <p className="mt-2 text-sm text-[#6B6560] sm:mt-0">Showing 6 premium pieces</p>
        </div>

        {/* Products Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden border border-[#E7E1D8] bg-white transition-all duration-300 hover:shadow-lg hover:shadow-[#171412]/5"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-[#F5F2EC]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#ff6289]">
                  {product.category}
                </span>
                <h3 className="mt-1 font-serif text-lg font-medium text-[#171412]">{product.name}</h3>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="text-sm font-semibold text-[#171412]">{product.price}</span>
                  <button className="flex items-center gap-1.5 border border-[#171412] bg-[#171412] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#ff6289] hover:border-[#ff6289]">
                    <ShoppingBag size={14} /> Add to Cart
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
