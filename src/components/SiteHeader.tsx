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
    <header className="sticky top-0 z-50 border-b border-emerald-100/10 bg-[#03130f]/84 shadow-[0_12px_40px_rgba(0,12,8,0.22)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-lg" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center rounded-xl bg-emerald-300/10 text-amber-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_0_22px_rgba(82,183,136,0.1)] ring-1 ring-amber-200/25">
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
                className={`focus-ring rounded-full px-3.5 py-2 text-sm transition ${active ? "bg-emerald-100/10 text-emerald-50 ring-1 ring-amber-200/15" : "text-emerald-100/55 hover:bg-emerald-100/6 hover:text-emerald-50"}`}
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
          className="focus-ring grid size-10 place-items-center rounded-xl border border-emerald-100/15 bg-emerald-100/6 text-emerald-50 md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav aria-label="手机导航" className="border-t border-emerald-100/10 bg-[#03130f]/92 px-4 py-3 md:hidden">
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
