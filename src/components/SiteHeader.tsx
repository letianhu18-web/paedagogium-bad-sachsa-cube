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
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#060913]/78 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-lg" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center rounded-xl bg-blue-500/15 text-blue-300 ring-1 ring-blue-400/30">
            <Sparkles size={16} aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight">Päda<span className="text-blue-400">Cube</span></span>
        </Link>

        <nav aria-label="主导航" className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`focus-ring rounded-full px-3.5 py-2 text-sm transition ${active ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
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
          className="focus-ring grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200 md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav aria-label="手机导航" className="border-t border-white/8 px-4 py-3 md:hidden">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-sm ${pathname === item.href ? "bg-blue-500/15 text-blue-200" : "text-slate-300 hover:bg-white/5"}`}
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
