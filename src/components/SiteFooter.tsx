import { ExternalLink } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/8 bg-black/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-slate-400 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-2xl space-y-2">
          <p className="text-slate-200">本网站是学生制作的非官方网站，内容整理自公开资料。</p>
          <p>Diese Website ist ein inoffizielles Schülerprojekt und basiert auf öffentlich zugänglichen Informationen.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link className="focus-ring rounded text-slate-300 hover:text-white" href="/sources">资料来源</Link>
          <a className="focus-ring inline-flex items-center gap-1 rounded text-slate-300 hover:text-white" href="https://www.internats-gymnasium.de/" target="_blank" rel="noreferrer">
            学校官网 <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
