import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
       

        <div className="mt-6 border-b border-[#E7E1D8] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">Our Heritage</p>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl">
            Our Story
          </h1>
        </div>

        <div className="mt-8 space-y-6 text-[#6B6560] leading-relaxed">
          <p>
            NOVARA began with a simple belief: luxury should be felt in every detail. What started as a boutique design workshop has evolved into a internationally celebrated accessories house.
          </p>
          <p>
            Each product in our catalogue undergoes rigorous prototyping and material selection. From vegetable-tanned Italian leathers to precision-engineered Swiss clockwork components, we honor traditional craftsmanship while embracing modern aesthetic minimalist values.
          </p>
        </div>
      </div>
    </main>
  );
}
