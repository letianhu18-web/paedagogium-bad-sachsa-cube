import type { Metadata } from "next";
import { Clock3, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { SourceAnchor } from "@/components/SourceAnchor";
import { leadership } from "@/data/leadership";
import { schoolContact } from "@/data/site";

export const metadata: Metadata = { title: "联系方式" };

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="陸 · KONTAKT" title="学校联系方式" subtitle="Internatsgymnasium Pädagogium Bad Sachsa" description="以下为学校官网公开的地址、总机、邮箱和工作联系人。联系前建议在学校官网再次确认最新信息。" accent="#8cac74" />
      <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <article className="glass rounded-[2rem] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-amber-200/70">Allgemeiner Kontakt · 总联络</p>
            <h2 className="mt-4 text-2xl font-semibold">{schoolContact.name}</h2>
            <div className="mt-8 space-y-5 text-sm text-slate-300">
              <p className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-amber-200/70" />{schoolContact.address}</p>
              <a href={`tel:${schoolContact.phone.replace(/\s/g, "")}`} className="focus-ring flex items-center gap-3 rounded-lg hover:text-white"><Phone size={18} className="shrink-0 text-amber-200/70" />{schoolContact.phone}</a>
              <a href={`mailto:${schoolContact.email}`} className="focus-ring flex items-center gap-3 rounded-lg hover:text-white"><Mail size={18} className="shrink-0 text-amber-200/70" />{schoolContact.email}</a>
              <p className="flex items-center gap-3"><Clock3 size={18} className="shrink-0 text-amber-200/70" />{schoolContact.hours}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://www.google.com/maps/search/?api=1&query=Ostertal+1-5+37441+Bad+Sachsa" target="_blank" rel="noreferrer" className="focus-ring jade-button-primary inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium">在地图中查看 <ExternalLink size={14} /></a>
              <SourceAnchor href="https://www.internats-gymnasium.de/kontakt.html" label="官网联系页" />
            </div>
          </article>

          <div className="grid gap-3 sm:grid-cols-2">
            {leadership.slice(0, 6).map((person) => (
              <article key={person.name} className="glass-soft rounded-3xl p-5">
                <h3 className="font-medium text-white">{person.name}</h3>
                <p className="mt-1 text-xs leading-5 text-amber-200/70">{person.roleDe}<span className="mx-1 text-emerald-100/25">｜</span>{person.roleZh}</p>
                <div className="mt-4 space-y-2 text-xs text-slate-400">
                  <a href={`mailto:${person.email}`} className="focus-ring flex items-center gap-2 rounded hover:text-white"><Mail size={12} /><span className="truncate">{person.email}</span></a>
                  <a href={`tel:${person.phone.replace(/[^\d+]/g, "")}`} className="focus-ring flex items-center gap-2 rounded hover:text-white"><Phone size={12} />{person.phone}</a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="glass-soft mt-8 rounded-2xl p-5 text-sm leading-6 text-emerald-100/50">
          本站不代替学校处理报名、请假或行政事务。涉及学生个人情况时，请直接使用学校官方渠道，并避免在非官方平台发送敏感信息。
        </div>
      </section>
    </>
  );
}
