import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CalendarCheck, Link2, Mail, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SourceAnchor } from "@/components/SourceAnchor";
import { teacherInitials, teachers } from "@/data/teachers";
import { withBasePath } from "@/lib/site-path";

interface TeacherPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return teachers.map((teacher) => ({ id: teacher.id }));
}

export async function generateMetadata({ params }: TeacherPageProps): Promise<Metadata> {
  const { id } = await params;
  const teacher = teachers.find((item) => item.id === id);
  return { title: teacher ? `${teacher.name}｜教师详情` : "教师未找到" };
}

export default async function TeacherDetailPage({ params }: TeacherPageProps) {
  const { id } = await params;
  const teacher = teachers.find((item) => item.id === id);
  if (!teacher) notFound();

  return (
    <section className="mx-auto max-w-5xl px-4 pb-6 pt-14 sm:px-6 sm:pt-20 lg:px-8">
      <Link href="/teachers" className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 hover:bg-white/10"><ArrowLeft size={15} /> 返回教师列表</Link>
      <div className="glass mt-8 overflow-hidden rounded-[2rem]">
        <div className="relative border-b border-white/8 p-6 sm:p-10">
          <div className="absolute -right-20 -top-20 size-64 rounded-full bg-emerald-500/12 blur-[80px]" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            {teacher.photo ? (
              <span className="relative block size-28 shrink-0 overflow-hidden rounded-[2rem] ring-1 ring-white/12 sm:size-32">
                <Image src={withBasePath(teacher.photo)} alt={`${teacher.name} 的学校官网照片`} fill priority className="object-cover object-top" sizes="128px" />
              </span>
            ) : (
              <span className="grid size-28 shrink-0 place-items-center rounded-[2rem] bg-emerald-400/10 text-2xl font-semibold text-emerald-200 ring-1 ring-emerald-300/20 sm:size-32">{teacherInitials(teacher.name)}</span>
            )}
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-emerald-300">Lehrkraft · 教师</p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{teacher.name}</h1>
              {teacher.roles.length > 0 && <p className="mt-3 text-sm text-slate-300">{teacher.roles.map((role) => `${role.de}｜${role.zh}`).join(" · ")}</p>}
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Unterrichtsfächer · 任教学科</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {teacher.subjects.map((subject) => (
                <div key={subject.de} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                  <p className="font-medium text-white">{subject.de}<span className="mx-2 text-slate-600">｜</span>{subject.zh}</p>
                  <p className="mt-1 text-xs text-slate-500">{subject.category}{subject.lead ? " · 学科组负责人" : ""}</p>
                </div>
              ))}
            </div>
            {teacher.roles.length > 0 && (
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Schulische Funktion · 校内职务</p>
                <ul className="mt-3 space-y-2">{teacher.roles.map((role) => <li key={role.de} className="text-sm text-slate-300">{role.de}<span className="mx-2 text-slate-600">｜</span>{role.zh}</li>)}</ul>
              </div>
            )}
          </div>

          <aside className="rounded-3xl border border-white/8 bg-black/15 p-5 sm:p-6">
            <div className="flex items-center gap-2 text-sm text-slate-300"><ShieldCheck size={16} className="text-emerald-300" /> 官方工作联系方式</div>
            <div className="mt-5 space-y-3 text-sm">
              {teacher.email ? <a href={`mailto:${teacher.email}`} className="focus-ring flex items-start gap-2 rounded-lg text-slate-300 hover:text-white"><Mail size={15} className="mt-0.5 shrink-0 text-slate-500" /><span className="break-all">{teacher.email}</span></a> : <p className="flex items-start gap-2 text-slate-400"><Mail size={15} className="mt-0.5 shrink-0 text-slate-600" />请使用官网教师页面的邮件按钮或联系学校总机。</p>}
              {teacher.phone && <a href={`tel:${teacher.phone.replace(/[^\d+]/g, "")}`} className="focus-ring flex items-center gap-2 rounded-lg text-slate-300 hover:text-white"><Phone size={15} className="text-slate-500" />{teacher.phone}</a>}
            </div>
            <div className="my-5 h-px bg-white/8" />
            <p className="flex items-center gap-2 text-xs text-slate-500"><CalendarCheck size={14} /> 最后核实：{teacher.verifiedAt}</p>
            <div className="mt-4"><SourceAnchor href={teacher.source} label={teacher.photo ? "姓名、学科与照片来源" : "姓名与学科来源"} /></div>
          </aside>
        </div>
      </div>
      <div className="mt-5 rounded-2xl border border-blue-300/12 bg-blue-300/[0.04] p-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <Link2 className="mt-0.5 shrink-0 text-blue-300" size={16} />
          <div className="min-w-0">
            <p className="text-xs text-slate-500">个人页面网址 · 本地运行时</p>
            <p className="mt-1 truncate font-mono text-xs text-blue-200">http://localhost:3000{teacher.profilePath}</p>
          </div>
        </div>
        <Link href={teacher.profilePath} className="focus-ring mt-3 inline-flex items-center gap-1.5 rounded-xl border border-blue-300/15 bg-blue-300/10 px-3 py-2 text-xs text-blue-100 hover:bg-blue-300/15 sm:mt-0">
          打开网址 <ArrowUpRight size={13} />
        </Link>
      </div>
      <p className="mt-5 text-center text-xs text-slate-600">本页不提供教师评分、学生评论、私人信息或未经证实的内容。</p>
    </section>
  );
}
