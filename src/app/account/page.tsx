import Link from "next/link";
import { ArrowLeft, User, Lock, ArrowRight } from "lucide-react";

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff6289] transition-colors hover:text-[#171412]"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="mt-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6289]">Client Access</p>
          <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-[#171412]">
            Account Login
          </h1>
          <p className="mt-2 text-xs text-[#6B6560]">Sign in to access your orders and personal wishlist.</p>
        </div>

        <form className="mt-8 border border-[#E7E1D8] bg-white p-8 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#171412]">Email Address</label>
              <div className="relative mt-1 flex items-center">
                <input
                  type="email"
                  placeholder="client@example.com"
                  className="w-full border border-[#E7E1D8] p-3 text-sm outline-none focus:border-[#ff6289]"
                />
                <User className="absolute right-3 text-[#ff6289]" size={18} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#171412]">Password</label>
              <div className="relative mt-1 flex items-center">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-[#E7E1D8] p-3 text-sm outline-none focus:border-[#ff6289]"
                />
                <Lock className="absolute right-3 text-[#ff6289]" size={18} />
              </div>
            </div>

            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 border border-[#171412] bg-[#171412] py-3.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#ff6289] hover:border-[#ff6289]"
            >
              Sign In <ArrowRight size={14} />
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-[#6B6560]">
            <a href="#" className="hover:text-[#ff6289]">Forgot Password?</a>
            <a href="#" className="font-semibold text-[#171412] hover:text-[#ff6289]">Create Account</a>
          </div>
        </form>
      </div>
    </main>
  );
}
