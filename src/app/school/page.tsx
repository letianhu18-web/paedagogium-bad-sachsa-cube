import type { Metadata } from "next";
import Image from "next/image";
import { BookOpen, Building2, GraduationCap, HeartHandshake, MapPin, School, Trees } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { SourceAnchor } from "@/components/SourceAnchor";
import { withBasePath } from "@/lib/site-path";

export const metadata: Metadata = { title: "学校介绍" };

const facts = [
  { value: "5–13", label: "年级范围", de: "Klassenstufen" },
  { value: "约 320", label: "外部走读学生", de: "externe Schüler*innen" },
  { value: "最多 45", label: "寄宿学生", de: "Internatsschüler*innen" },
] as const;

const concepts = [
  { icon: School, title: "Gymnasium｜文理中学", text: "学校是 Niedersachsen｜下萨克森州认可的 Ersatzschule｜替代性私立学校，可按州规定独立颁发中学毕业、Fachhochschulreife 学校部分及 Abitur 等证书。" },
  { icon: Building2, title: "Internat｜寄宿学校", text: "学校与寄宿部紧密协作。寄宿学生住在校园的两座寄宿楼，由固定教育人员陪伴，并获得学习方法、作业与个别辅导支持。" },
  { icon: GraduationCap, title: "Oberstufe｜高中阶段", text: "11 年级为 Einführungsphase｜导入阶段，12–13 年级进入 Profiloberstufe，可选择语言、社会科学或自然科学方向，最终参加 Abitur。" },
  { icon: HeartHandshake, title: "Fordern und Fördern｜要求与支持", text: "学校强调尊重每个人的尊严与个性，通过较小班级、个别学习计划和定期 pädagogische Gespräche，在提出要求的同时提供支持。" },
  { icon: BookOpen, title: "Bildung mit Perspektive｜面向未来的教育", text: "教育理念结合人文主义与未来导向，延续“Lernen durch Handeln｜在行动中学习”的改革教育传统，并重视社会责任与独立行动能力。" },
  { icon: Trees, title: "校园与环境", text: "校园位于 Bad Sachsa 城镇边缘、南哈尔茨地区。官网介绍了艺术、音乐、自然科学与信息技术专业教室，以及体育、音乐、艺术和手工社团。" },
] as const;

export default function SchoolPage() {
  return (
    <>
      <PageIntro eyebrow="壹 · SCHULE" title="学校介绍" subtitle="Das Internatsgymnasium Pädagogium Bad Sachsa" description="一所国家认可、独立办学并设有寄宿部的 Gymnasium｜文理中学。学校把学术教育、共同生活和个别支持放在同一个校园体系中。" accent="#4f9d79" />

      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="glass rounded-3xl p-5 sm:p-6">
              <p className="jade-title text-3xl font-semibold tracking-tight">{fact.value}</p>
              <p className="mt-2 text-sm text-emerald-50/70">{fact.label}</p>
              <p className="mt-1 font-mono text-[11px] text-emerald-100/35">{fact.de}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.08fr_.92fr]">
          <div className="glass relative min-h-[360px] overflow-hidden rounded-[2rem] sm:min-h-[480px]">
            <Image src={withBasePath("/images/school-campus.jpg")} alt="Pädagogium Bad Sachsa 校园主楼与校园环境" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 58vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#03130f] via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="jade-pill inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs backdrop-blur"><MapPin size={13} /> Ostertal · Bad Sachsa</div>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">图片来自学校官网。学校坐落在 Bad Sachsa 城镇边缘，并作为该区域一所国家认可的私立 Ersatzschule 运行。</p>
            </div>
          </div>

          <article className="glass rounded-[2rem] p-6 sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-amber-200/70">Was ist das Pädagogium?</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">传统与现代在同一所学校里</h2>
            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-300 sm:text-base">
              <p>Pädagogium 的前身源于 19 世纪末的 Thüringer Reformpädagogik｜图林根改革教育。如今，它按照下萨克森州学校法开展 5–13 年级教育。</p>
              <p>Gymnasium 与 Internat 并不是两个互不相干的部分：教师与寄宿教育人员定期沟通，为寄宿学生制定个别支持方案。较小的班级和课程规模是学校官网强调的特点。</p>
              <p>学校在 Bad Sachsa 的区域教育体系中承担与公立 Gymnasium 相当的功能，同时由非营利学校协会运营。</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <SourceAnchor href="https://www.internats-gymnasium.de/schule.html" label="学校页面" />
              <SourceAnchor href="https://www.internats-gymnasium.de/ueber-das-paedagogium/schule-in-freier-traegerschaft.html" label="办学性质" />
            </div>
          </article>
        </div>

        <div className="mt-16">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">核心概念</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">用六个关键词认识学校</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {concepts.map(({ icon: Icon, title, text }) => (
              <article key={title} className="glass-soft rounded-3xl p-6 transition hover:-translate-y-1 hover:border-amber-200/20 hover:bg-emerald-100/[0.07]">
                <span className="grid size-10 place-items-center rounded-2xl bg-emerald-300/10 text-amber-200 ring-1 ring-emerald-200/18"><Icon size={19} /></span>
                <h3 className="mt-5 text-lg font-medium text-white">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-amber-300/15 bg-amber-300/[0.05] p-5 text-sm leading-6 text-amber-100/75">
          <strong className="text-amber-100">创办年说明：</strong>官网首页称学校创办于 1890 年，而“Schule”页面把 Roßla 的前身追溯到 1889 年。本站不替官方消解这一差异；历史页以官方年表中可核对的 1890 年购地与 1891 年迁址开学为时间节点。
        </div>
      </section>
    </>
  );
}
