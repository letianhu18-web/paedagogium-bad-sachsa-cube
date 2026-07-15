import type { Metadata } from "next";
import { CheckCircle2, ExternalLink, SearchCheck } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { sourceDates, sources } from "@/data/sources";

export const metadata: Metadata = { title: "资料来源" };

export default function SourcesPage() {
  return (
    <>
      <PageIntro eyebrow="QUELLEN · SOURCES" title="资料来源" subtitle="Öffentlich zugängliche Informationen" description="网站的重要事实均附有可访问的公开来源。优先使用学校官网，并记录获取与最后核实日期。" accent="#8b5cf6" />
      <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="glass mb-7 grid gap-5 rounded-3xl p-5 sm:grid-cols-3 sm:p-6">
          <div><p className="text-3xl font-semibold">{sources.length}</p><p className="mt-1 text-sm text-slate-500">公开来源条目</p></div>
          <div><p className="font-mono text-lg text-slate-200">{sourceDates.retrievedAt}</p><p className="mt-1 text-sm text-slate-500">获取日期</p></div>
          <div><p className="font-mono text-lg text-emerald-300">{sourceDates.verifiedAt}</p><p className="mt-1 text-sm text-slate-500">最后核实日期</p></div>
        </div>

        <div className="space-y-3">
          {sources.map((source, index) => (
            <article key={source.url} className="glass-soft grid gap-4 rounded-3xl p-5 sm:grid-cols-[42px_1fr_auto] sm:items-start sm:p-6">
              <span className="grid size-9 place-items-center rounded-xl bg-violet-400/10 font-mono text-xs text-violet-200 ring-1 ring-violet-300/15">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="font-medium text-white">{source.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400"><strong className="text-slate-300">使用信息：</strong>{source.usedFor}</p>
                {source.note && <p className="mt-2 text-xs leading-5 text-amber-200/70">说明：{source.note}</p>}
                <p className="mt-3 break-all font-mono text-[10px] text-slate-600">{source.url}</p>
              </div>
              <a href={source.url} target="_blank" rel="noreferrer" className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300 hover:bg-white/10">打开 <ExternalLink size={12} /></a>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-emerald-300/12 bg-emerald-300/[0.04] p-6">
            <CheckCircle2 className="text-emerald-300" size={20} />
            <h2 className="mt-4 font-medium text-white">隐私边界</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">仅整理学校公开的工作信息；不展示私人住址、私人电话、家庭信息、私人社交账号、教师评分或学生评论。</p>
          </div>
          <div className="rounded-3xl border border-blue-300/12 bg-blue-300/[0.04] p-6">
            <SearchCheck className="text-blue-300" size={20} />
            <h2 className="mt-4 font-medium text-white">核实原则</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">无法确认的历史年份不写入；不同官方页面出现差异时保留差异说明。人员资料应以学校官网最新页面为准。</p>
          </div>
        </div>
      </section>
    </>
  );
}
