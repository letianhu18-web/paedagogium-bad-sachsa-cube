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
        <Link href={backHref} className="focus-ring jade-button-secondary mb-8 inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm">
          <ArrowLeft size={15} /> 返回
        </Link>
        <div className="max-w-4xl">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-emerald-100/55">
            <span className="h-px w-7" style={{ background: accent }} />
            {eyebrow}
            <span className="jade-pill inline-flex items-center gap-1 rounded-full px-2 py-1 normal-case tracking-normal"><Database size={11} /> 官网公开资料</span>
          </div>
          <h1 className="jade-title text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">{title}</h1>
          <p className="mt-3 font-mono text-sm tracking-wide text-emerald-100/38 sm:text-base">{subtitle}</p>
          <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-emerald-50/70 sm:text-lg">{description}</p>
        </div>
      </div>
    </section>
  );
}
