import type { Metadata } from "next";
import { AlertTriangle, CalendarDays } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { SourceAnchor } from "@/components/SourceAnchor";
import { historyEvents, historyVerifiedAt } from "@/data/history";

export const metadata: Metadata = { title: "学校历史" };

export default function HistoryPage() {
  return (
    <>
      <PageIntro eyebrow="貳 · GESCHICHTE" title="学校历史" subtitle="Von der Reformpädagogik bis zur Gegenwart" description="以下时间轴只使用学校官网能明确核对的日期与事件，展示校园、学校类型、寄宿部和教育项目的发展。" accent="#3e8266" />
      <section className="mx-auto mt-12 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="glass mb-12 flex flex-col gap-4 rounded-3xl p-5 sm:flex-row sm:items-start sm:p-6">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-amber-400/10 text-amber-300"><AlertTriangle size={18} /></span>
          <div className="text-sm leading-6 text-slate-300">
            <h2 className="font-medium text-white">关于“创办年份”的资料差异</h2>
            <p className="mt-1">官网首页写“1890 gegründet”，学校介绍页称前身于 1889 年在 Roßla 创办；官方历史年表则从 1890 年购地、1891 年迁至 Bad Sachsa 开始。本站同时保留三种官方表述，不自行推断唯一年份。</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-amber-200 via-emerald-300/40 to-transparent sm:left-[151px]" />
          <ol className="space-y-5">
            {historyEvents.map((event, index) => (
              <li key={`${event.year}-${event.title}`} className="relative grid gap-4 pl-14 sm:grid-cols-[120px_1fr] sm:pl-0">
                <div className="pt-5 font-mono text-xs text-amber-200/75 sm:text-right">{event.year}</div>
                <span className="absolute left-[12px] top-5 grid size-4 place-items-center rounded-full border-4 border-[#03130f] bg-emerald-300 shadow-[0_0_20px_rgba(82,183,136,.42)] sm:left-[144px]" />
                <article className="glass-soft rounded-3xl p-5 sm:ml-8 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-lg font-medium text-white"><span className="mr-2 font-mono text-xs text-slate-600">{String(index + 1).padStart(2, "0")}</span>{event.title}</h2>
                    <span className="jade-pill rounded-full px-2.5 py-1 font-mono text-[10px]">{event.keyword}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{event.description}</p>
                  <div className="mt-4"><SourceAnchor href={event.source} /></div>
                </article>
              </li>
            ))}
          </ol>
        </div>

        <div className="glass-soft mt-10 flex items-center justify-between gap-4 rounded-2xl p-4 text-xs text-emerald-100/40">
          <span className="inline-flex items-center gap-2"><CalendarDays size={14} /> 最后核实：{historyVerifiedAt}</span>
          <span>未确认的年份未写入</span>
        </div>
      </section>
    </>
  );
}
