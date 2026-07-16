import type { Metadata } from "next";
import Image from "next/image";
import { BookMarked, Clock3, Globe2, House, UsersRound } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { SourceAnchor } from "@/components/SourceAnchor";
import { withBasePath } from "@/lib/site-path";

export const metadata: Metadata = { title: "寄宿学校" };

const educators = ["Michael Lerchner", "Anja Möllers", "Bastian Pieper", "Daniela Schröter", "Angela Schwark"];

export default function InternatPage() {
  return (
    <>
      <PageIntro eyebrow="伍 · INTERNAT" title="寄宿学校" subtitle="Leben und Lernen im Internat" description="寄宿部把共同生活、学习支持和课外成长连接起来。官网强调，学习不仅需要头脑，也需要“Herz und Hände｜心与双手”。" accent="#b8cdb3" />
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass relative min-h-[360px] overflow-hidden rounded-[2rem] sm:min-h-[520px]">
          <Image src={withBasePath("/images/internat-life.jpg")} alt="Pädagogium Bad Sachsa 寄宿学生共同活动的官网照片" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#03130f] via-[#03130f]/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 max-w-3xl p-6 sm:p-10">
            <p className="font-mono text-xs text-slate-300">Schüler*innen im Internat · September 2024</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">共同生活，也是教育的一部分</h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: House, title: "两个寄宿楼", text: "官网说明寄宿教育人员在两座寄宿建筑内工作，与学生保持紧密联系。" },
            { icon: UsersRound, title: "固定陪伴人员", text: "Erzieher*innen 既关心个人生活，也与教师共同跟进学业。" },
            { icon: BookMarked, title: "个别学习支持", text: "包括学习方法课程、监督自习、小组辅导与按需个别辅导。" },
            { icon: Globe2, title: "多元共同体", text: "官网称寄宿学生来自德国各地，也来自欧洲与亚洲其他国家。" },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="glass-soft rounded-3xl p-6">
              <Icon className="text-amber-200/65" size={20} />
              <h3 className="mt-4 font-medium text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <article className="glass rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm text-slate-400"><Clock3 size={16} /> Internatsalltag｜寄宿日常</div>
            <h2 className="mt-4 text-2xl font-semibold">学习、活动与周末</h2>
            <p className="mt-5 text-sm leading-7 text-slate-300">寄宿生活在课堂之外继续：下午有监督学习与支持，课余和周末安排体育、文化和共同活动。学校强调，学校与寄宿部通过定期教育沟通把学业和生活连接起来。</p>
            <div className="mt-6"><SourceAnchor href="https://www.internats-gymnasium.de/internat.html" /></div>
          </article>

          <article className="glass rounded-[2rem] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Erzieher*innen · 官网公开名单</p>
            <h2 className="mt-3 text-2xl font-semibold">寄宿教育团队</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {educators.map((name) => (
                <div key={name} className="glass-soft flex items-center gap-3 rounded-2xl p-3">
                  <span className="grid size-9 place-items-center rounded-xl bg-emerald-200/10 text-xs font-medium text-emerald-50/75 ring-1 ring-emerald-100/10">{name.split(" ").map((part) => part[0]).join("")}</span>
                  <span className="text-sm text-slate-200">{name}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-500">官网仅在该页面公开姓名，未逐一标注具体岗位，因此本站不添加未经确认的职务。</p>
            <div className="mt-4"><SourceAnchor href="https://www.internats-gymnasium.de/internat/erzieherteam.html" /></div>
          </article>
        </div>
      </section>
    </>
  );
}
