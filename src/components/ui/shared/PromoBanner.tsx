"use client";

import Image from "next/image";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="bg-white py-6 sm:py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href="/shop" className="group block overflow-hidden rounded-2xl">
          <div className="relative w-full">
            <Image
              src="/images/collections/add.png"
              alt="ZURII Collection"
              width={1400}
              height={500}
              className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              priority
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
