import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { TeacherDirectory } from "@/components/teachers/TeacherDirectory";

export const metadata: Metadata = { title: "教师列表" };

export default function TeachersPage() {
  return (
    <>
      <PageIntro eyebrow="肆 · LEHRKRÄFTE" title="教师介绍" subtitle="Kollegium und Unterrichtsfächer" description="按姓名、学科或校内公开职务搜索。教师名单与学科来自学校官网，学科中文为便于阅读的对应翻译。" accent="#2f7359" />
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <TeacherDirectory />
      </section>
    </>
  );
}
