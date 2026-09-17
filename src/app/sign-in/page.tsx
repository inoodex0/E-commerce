"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, User } from "lucide-react";

export default function SignInPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#FBF8F3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">

        {/* Header */}
        <div className="mb-8 border-b border-[#E7E1D8] pb-6">
          <Link href="/" className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#6B6560] transition-colors hover:text-[#E8852A]">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="font-serif text-3xl font-medium tracking-tight text-[#171412]">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="mt-2 text-sm text-[#6B6560]">
            {mode === "login" ? "Sign in to your ZURII account." : "Register for a new ZURII account."}
          </p>
        </div>

        {/* Form */}
        <div className="border border-[#E7E1D8] bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-4">

            {mode === "register" && (
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Full Name</label>
                <div className="relative mt-1.5">
                  <input type="text" placeholder="John Doe" className="w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 pl-10 text-sm text-[#171412] outline-none transition-colors focus:border-[#E8852A]" />
                  <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6560]/40" />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Email Address</label>
              <div className="relative mt-1.5">
                <input type="email" placeholder="john@example.com" className="w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 pl-10 text-sm text-[#171412] outline-none transition-colors focus:border-[#E8852A]" />
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6560]/40" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6B6560]">Password</label>
              <div className="relative mt-1.5">
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full border border-[#E7E1D8] bg-[#FBF8F3] px-4 py-3 pl-10 pr-10 text-sm text-[#171412] outline-none transition-colors focus:border-[#E8852A]" />
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6560]/40" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6560]/40 hover:text-[#6B6560]">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {mode === "login" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-[11px] text-[#6B6560]">
                  <input type="checkbox" className="accent-[#E8852A]" />
                  Remember me
                </label>
                <button className="text-[11px] font-medium text-[#E8852A] hover:text-[#c96f1f]">
                  Forgot Password?
                </button>
              </div>
            )}

            <button className="w-full border border-[#171412] bg-[#171412] py-3.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#E8852A] hover:border-[#E8852A]">
              {mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-[#E7E1D8]" />
            <span className="text-[10px] font-medium uppercase tracking-wider text-[#6B6560]/50">or</span>
            <div className="h-[1px] flex-1 bg-[#E7E1D8]" />
          </div>

          {/* Social */}
          <button className="flex w-full items-center justify-center gap-3 border border-[#E7E1D8] bg-white py-3 text-sm font-medium text-[#171412] transition-colors hover:border-[#E8852A] hover:text-[#E8852A]">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Toggle */}
          <p className="mt-6 text-center text-xs text-[#6B6560]">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="font-semibold text-[#E8852A] hover:text-[#c96f1f]">
              {mode === "login" ? "Register" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
