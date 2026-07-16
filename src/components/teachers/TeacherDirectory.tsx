"use client";

import { ArrowUpRight, Search, SlidersHorizontal, UserRoundSearch, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { teacherCategories, teacherInitials, teachers, type SubjectCategory } from "@/data/teachers";
import { withBasePath } from "@/lib/site-path";

type CategoryFilter = "全部" | SubjectCategory;

const categoryColors: Record<CategoryFilter, string> = {
  "全部": "#9eb5aa", "语言": "#83b99b", "自然科学": "#4fa67a", "社会科学": "#d0b67a", "艺术与体育": "#9fb28b", "宗教与价值观": "#c8d5ba", "其他": "#739989",
};

export function TeacherDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("全部");
  const normalizedQuery = query.trim().toLocaleLowerCase("de");
  const filtered = teachers.filter((teacher) => {
    const inCategory = category === "全部" || teacher.subjects.some((subject) => subject.category === category);
    const haystack = [teacher.name, ...teacher.subjects.flatMap((subject) => [subject.de, subject.zh]), ...teacher.roles.flatMap((role) => [role.de, role.zh])].join(" ").toLocaleLowerCase("de");
    return inCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
  });

  return (
    <div>
      <div className="glass rounded-[2rem] p-4 sm:p-5">
        <label htmlFor="teacher-search" className="sr-only">搜索教师姓名、学科或职务</label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-amber-200/45" size={18} />
          <input
            id="teacher-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索教师姓名、学科或职务…"
            className="focus-ring w-full rounded-2xl border border-emerald-100/14 bg-[#02140f]/50 py-3.5 pl-11 pr-11 text-sm text-emerald-50 outline-none placeholder:text-emerald-100/25"
          />
          {query && <button type="button" aria-label="清空搜索" onClick={() => setQuery("")} className="focus-ring absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-emerald-100/40 hover:bg-emerald-100/6 hover:text-emerald-50"><X size={16} /></button>}
        </div>
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1" aria-label="按学科类别筛选">
          <SlidersHorizontal className="mr-1 shrink-0 text-amber-200/35" size={15} />
          {teacherCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`focus-ring shrink-0 rounded-full border px-3 py-1.5 text-xs transition ${category === item ? "border-amber-100/20 text-[#062219] shadow-[inset_0_1px_0_rgba(255,255,255,.25)]" : "border-emerald-100/12 bg-emerald-100/[0.025] text-emerald-100/45 hover:text-emerald-50"}`}
              style={category === item ? { background: categoryColors[item] } : undefined}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between text-sm text-emerald-100/40">
        <span>找到 <strong className="font-mono text-amber-100/80">{filtered.length}</strong> 位</span>
        <span>官网教师页共 {teachers.length} 条公开记录</span>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((teacher) => {
            const dominant = teacher.subjects.find((subject) => category === "全部" || subject.category === category)?.category ?? teacher.subjects[0]?.category ?? "其他";
            return (
              <article key={teacher.id} className="glass group flex min-h-[285px] flex-col rounded-[2rem] p-5 transition hover:-translate-y-1">
                <div className="flex items-start justify-between gap-4">
                  {teacher.photo ? (
                    <span className="relative block size-16 shrink-0 overflow-hidden rounded-2xl ring-1 ring-emerald-100/15">
                      <Image src={withBasePath(teacher.photo)} alt={`${teacher.name} 的学校官网照片`} fill className="object-cover object-top" sizes="64px" />
                    </span>
                  ) : (
                    <span className="grid size-16 shrink-0 place-items-center rounded-2xl text-sm font-semibold shadow-[inset_1px_1px_2px_rgba(255,255,255,.12)] ring-1 ring-emerald-100/14" style={{ background: `${categoryColors[dominant]}22`, color: categoryColors[dominant] }}>{teacherInitials(teacher.name)}</span>
                  )}
                  {teacher.roles.length > 0 && <span className="jade-pill max-w-[170px] rounded-full px-2.5 py-1 text-right text-[10px] leading-4">{teacher.roles[0].de}</span>}
                </div>
                <h2 className="mt-5 text-xl font-semibold text-white">{teacher.name}</h2>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {teacher.subjects.map((subject) => (
                    <span key={`${teacher.id}-${subject.de}`} className="rounded-lg border border-emerald-100/10 bg-emerald-100/[0.035] px-2 py-1 text-[11px] text-emerald-50/68">
                      {subject.de}<span className="mx-1 text-emerald-100/25">｜</span>{subject.zh}{subject.lead ? <sup className="ml-1 text-amber-200">*</sup> : null}
                    </span>
                  ))}
                </div>
                <Link href={teacher.profilePath} className="focus-ring jade-button-secondary mt-auto flex items-center justify-between gap-3 rounded-xl px-4 py-2.5">
                  <span className="min-w-0">
                    <span className="block text-sm">打开个人页面</span>
                    <span className="block truncate font-mono text-[10px] text-slate-500">{teacher.profilePath}</span>
                  </span>
                  <ArrowUpRight className="shrink-0" size={15} />
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="mt-8 grid min-h-72 place-items-center rounded-[2rem] border border-dashed border-emerald-100/14 bg-emerald-100/[0.02] text-center">
          <div><UserRoundSearch className="mx-auto text-emerald-100/30" size={32} /><p className="mt-3 text-emerald-50/65">没有匹配的教师</p><button type="button" onClick={() => { setQuery(""); setCategory("全部"); }} className="focus-ring mt-3 rounded-lg text-sm text-amber-200/80">清除筛选</button></div>
        </div>
      )}

      <p className="mt-6 text-xs leading-5 text-slate-500">* 星号表示学校官网在该学科后标注该教师为 Fachgruppenleiter/-in｜学科组负责人。部分姓名仅以“Frau/Herr + 姓氏”公开，本站保留官网写法，不推断名字。</p>
    </div>
  );
}
