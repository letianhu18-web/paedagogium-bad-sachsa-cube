import type { Metadata } from "next";
import { CalendarCheck, Mail, Phone, ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { SourceAnchor } from "@/components/SourceAnchor";
import { leadership, leadershipSource, leadershipVerifiedAt } from "@/data/leadership";
import { teacherInitials } from "@/data/teachers";

export const metadata: Metadata = { title: "校长和管理人员" };

export default function LeadershipPage() {
  return (
    <>
      <PageIntro eyebrow="黄色面 · SCHULLEITUNG" title="校长和管理人员" subtitle="Schulleitung, Koordination und Verwaltung" description="人员、职务与工作联系方式均来自学校官网 Kontakt 页面。没有使用私人地址、私人电话或非官方社交信息。" accent="#facc15" />
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-yellow-300/12 bg-yellow-300/[0.045] p-5 text-sm text-yellow-50/75 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center gap-2"><ShieldCheck size={17} className="text-yellow-300" /> 仅展示官网公开的校内工作信息</span>
          <span className="inline-flex items-center gap-2 text-xs text-yellow-100/50"><CalendarCheck size={14} /> 最后核实：{leadershipVerifiedAt}</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {leadership.map((leader, index) => (
            <article key={leader.name} className="glass group flex min-h-[330px] flex-col rounded-[2rem] p-6 transition hover:-translate-y-1">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-yellow-300/20 to-orange-300/5 text-sm font-semibold text-yellow-100 ring-1 ring-yellow-300/20">{teacherInitials(leader.name)}</span>
                <span className="font-mono text-xs text-slate-600">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h2 className="mt-6 text-xl font-semibold text-white">{leader.name}</h2>
              <p className="mt-2 text-sm font-medium text-yellow-200">{leader.roleDe}<span className="mx-1.5 text-slate-600">｜</span>{leader.roleZh}</p>
              <p className="mt-4 text-sm leading-6 text-slate-400">{leader.responsibility}</p>
              <div className="mt-auto space-y-2 border-t border-white/8 pt-5 text-sm">
                <a href={`mailto:${leader.email}`} className="focus-ring flex items-center gap-2 rounded-lg text-slate-300 hover:text-white"><Mail size={14} className="text-slate-500" /><span className="truncate">{leader.email}</span></a>
                <a href={`tel:${leader.phone.replace(/[^\d+]/g, "")}`} className="focus-ring flex items-center gap-2 rounded-lg text-slate-300 hover:text-white"><Phone size={14} className="text-slate-500" />{leader.phone}</a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-white/8 bg-white/[0.025] p-6">
          <h2 className="font-medium text-white">职务说明</h2>
          <div className="mt-4 grid gap-3 text-sm text-slate-400 sm:grid-cols-2 lg:grid-cols-4">
            <p><strong className="block text-slate-200">Schulleiter</strong>校长／学校负责人</p>
            <p><strong className="block text-slate-200">Stellv. Schulleiter</strong>副校长</p>
            <p><strong className="block text-slate-200">Koordinator Sek I</strong>初中阶段负责人</p>
            <p><strong className="block text-slate-200">Koordinatorin Sek II</strong>高中阶段负责人</p>
          </div>
          <div className="mt-5"><SourceAnchor href={leadershipSource} label="官网联系人页面" /></div>
        </div>
      </section>
    </>
  );
}
