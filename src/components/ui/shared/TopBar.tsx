import Link from "next/link";
import { User } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-[#171412] text-[#FBF8F3]">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-5 lg:px-6 xl:px-8">
        <a
          href="mailto:novara@example.com"
          className="text-[10px] font-medium tracking-[0.12em] text-white/80 transition-colors duration-300 hover:text-white sm:text-[11px]"
        >
          novara@example.com
        </a>
        <Link
          href="/account"
          className="flex items-center gap-1.5 text-[10px] font-medium tracking-[0.12em] text-white/80 transition-colors duration-300 hover:text-white sm:text-[11px]"
        >
          Login
          <User size={12} strokeWidth={1.5} />
        </Link>
      </div>
    </div>
  );
}
