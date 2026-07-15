import Link from "next/link";
import { ArrowLeft, Database } from "lucide-react";

interface PageIntroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  accent?: string;
  backHref?: string;
}

export function PageIntro({ eyebrow, title, subtitle, description, accent = "#3b82f6", backHref = "/" }: PageIntroProps) {
  return (
    <section className="relative overflow-hidden pt-14 sm:pt-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full opacity-20 blur-[100px]" style={{ background: accent }} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href={backHref} className="focus-ring mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
          <ArrowLeft size={15} /> 返回
        </Link>
        <div className="max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            <span className="h-px w-7" style={{ background: accent }} />
            {eyebrow}
            <span className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-white/4 px-2 py-1 normal-case tracking-normal text-slate-500"><Database size={11} /> 官网公开资料</span>
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-[-0.045em] text-white sm:text-6xl">{title}</h1>
          <p className="mt-3 font-mono text-sm tracking-wide text-slate-500 sm:text-base">{subtitle}</p>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
        </div>
      </div>
    </section>
  );
}
