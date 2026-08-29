import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export default function WhyChooseUsPage() {
  const reasons = [
    { title: "Precision Engineering", desc: "Every component is crafted with sub-millimeter precision." },
    { title: "Sustainable Materials", desc: "Ethically sourced leathers and 100% recycled gold & silver elements." },
    { title: "Express Worldwide Shipping", desc: "Insured global delivery direct to your doorstep." },
    { title: "Lifetime Warranty", desc: "We stand behind the craftsmanship of every item we produce." },
  ];

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
       

        <div className="mt-6 border-b border-[#E7E1D8] pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#fd6f93]">The NOVARA Difference</p>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-[#171412] sm:text-4xl">
            Why Choose Us
          </h1>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {reasons.map((r, i) => (
            <div key={i} className="border border-[#E7E1D8] bg-white p-6">
              <CheckCircle2 className="text-[#fd6f93]" size={28} />
              <h3 className="mt-3 font-serif text-lg font-medium text-[#171412]">{r.title}</h3>
              <p className="mt-1 text-sm text-[#6B6560]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
