"use client";

import { ArrowRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#fd6f93]/10 py-16 sm:py-20 lg:py-24">

      <div className="relative z-10 mx-auto max-w-[1200px] px-5 sm:px-8">

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">

          {/* Left - Subscribe text */}

          <p
            className="
              font-[family-name:var(--font-dancing-script)]
              text-[clamp(2rem,8vw,8rem)]
              font-medium
              italic
              leading-none
              text-[#fd6f93]/40
            "
          >
            Subscribe
          </p>

          {/* Right - Form */}

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="
                flex
                w-full
                max-w-xl
                flex-row
                gap-0
              "
            >

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="E-mail address"
                required
                className="
                  h-14
                  flex-1
                  rounded-l-md
                  border
                  border-neutral-300
                  bg-white
                  px-5
                  text-[14px]
                  sm:text-[12px]
                  text-neutral-900
                  outline-none
                  placeholder:text-neutral-400
                  focus:border-[#fd6f93]
                "
              />

              <button
                type="submit"
                className="
                  group
                  flex
                  h-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-r-md
                  bg-[#171412]
                  px-4
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-white
                  transition-all
                  duration-300
                  hover:bg-[#fd6f93]
                  sm:px-6
                "
              >
                Send
              </button>

            </form>
          ) : (

            <div
              className="
                flex
                w-full
                max-w-xl
                items-center
                justify-center
                gap-3
                border
                border-neutral-200
                bg-white
                px-5
                py-5
              "
            >

              <span
                className="
                  flex
                  h-7
                  w-7
                  items-center
                  justify-center
                  rounded-full
                  bg-[#fd6f93]
                  text-white
                "
              >
                <Check
                  size={13}
                  strokeWidth={1.5}
                />
              </span>

              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-800">
                Thank you for subscribing.
              </p>

            </div>

          )}

        </div>

      </div>

    </section>
  );
}
