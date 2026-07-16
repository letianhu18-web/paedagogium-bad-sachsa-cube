"use client";

import { Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/data/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-amber-100/12 bg-[#06241e]/78 shadow-[0_12px_44px_rgba(0,15,10,0.24),inset_0_-1px_0_rgba(238,225,179,0.035)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-lg" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-[#edf3dc]/16 to-emerald-300/8 text-amber-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_0_26px_rgba(210,192,123,0.12)] ring-1 ring-amber-200/30">
            <Sparkles size={16} aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight text-[#edf3df]">Päda<span className="text-emerald-300">Cube</span></span>
        </Link>

        <nav aria-label="主导航" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring rounded-full px-3.5 py-2 text-sm transition ${active ? "bg-[#eef3df]/12 text-[#fffdeb] ring-1 ring-amber-200/22 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" : "text-emerald-50/55 hover:bg-[#eef3df]/7 hover:text-[#fffdeb]"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "关闭导航" : "打开导航"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="focus-ring grid size-10 place-items-center rounded-xl border border-amber-100/18 bg-[#edf3df]/7 text-[#fffdeb] md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav aria-label="手机导航" className="border-t border-amber-100/12 bg-[#06241e]/94 px-4 py-3 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm ${pathname === item.href ? "bg-emerald-300/12 text-emerald-100 ring-1 ring-amber-200/15" : "text-emerald-100/65 hover:bg-emerald-100/6"}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
