"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Compass, Gauge, MapPin, Pause, Play, Repeat2, RotateCcw, Shuffle, Users } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { cubeFaces, type CubeFaceId } from "@/data/site";
import { CubeViewport } from "./CubeViewport";
import type { CubeDemoCommand, CubeDemoCommandType } from "./types";

export function CubeHome() {
  const [selectedFace, setSelectedFace] = useState<CubeFaceId | null>(null);
  const commandId = useRef(1);
  const [command, setCommand] = useState<CubeDemoCommand>({ id: 1, type: "start" });
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [loop, setLoop] = useState(true);
  const selected = cubeFaces.find((face) => face.id === selectedFace);

  const sendCommand = (type: CubeDemoCommandType) => {
    commandId.current += 1;
    setSelectedFace(null);
    setPaused(false);
    setCommand({ id: commandId.current, type });
  };

  return (
    <div className="relative overflow-hidden">
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-10 sm:px-6 sm:pt-16 lg:px-8 lg:pb-20">
        <div className="mx-auto max-w-5xl text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/8 px-3 py-1.5 text-xs text-blue-200">
            <Compass size={13} /> 旋转 · 点击 · 探索
          </div>
          <h1 className="text-balance text-4xl font-semibold tracking-[-0.055em] text-white sm:text-6xl lg:text-7xl">
            魔方里的 <span className="bg-gradient-to-r from-blue-300 via-white to-emerald-300 bg-clip-text text-transparent">Pädagogium Bad Sachsa</span>
          </h1>
          <p className="mt-4 font-mono text-xs tracking-[0.12em] text-slate-500 sm:text-sm">Das Pädagogium Bad Sachsa im Zauberwürfel</p>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-7 text-slate-300 sm:text-lg">
            通过一个可以旋转和点击的魔方，了解 Pädagogium Bad Sachsa 的学校历史、校长、教师和校园生活。
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(360px,.82fr)]">
          <div className="glass relative min-h-[600px] overflow-hidden rounded-[2rem] sm:min-h-[640px]">
            <CubeViewport
              selectedFace={selectedFace}
              command={command}
              paused={paused}
              speed={speed}
              loop={loop}
              onSelect={setSelectedFace}
            />
            <div className="absolute inset-x-3 bottom-3 z-10 rounded-2xl border border-white/10 bg-[#080c16]/80 p-2.5 shadow-2xl backdrop-blur-xl sm:inset-x-4 sm:bottom-4 sm:p-3">
              <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="魔方演示控制">
                <button type="button" onClick={() => sendCommand("start")} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-blue-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-400">
                  <Play size={14} /> 开始演示
                </button>
                <button type="button" onClick={() => setPaused(true)} disabled={paused} className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40">
                  <Pause size={14} /> 暂停
                </button>
                <button type="button" onClick={() => setPaused(false)} disabled={!paused} className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40">
                  <Play size={14} /> 继续
                </button>
                <button type="button" onClick={() => sendCommand("restart")} className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10">
                  <RotateCcw size={14} /> 重新开始
                </button>
                <button type="button" onClick={() => sendCommand("randomize")} className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10">
                  <Shuffle size={14} /> 重新随机打乱
                </button>
                <button type="button" aria-pressed={loop} onClick={() => setLoop((value) => !value)} className={`focus-ring inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs transition ${loop ? "border-emerald-300/30 bg-emerald-400/12 text-emerald-200" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"}`}>
                  <Repeat2 size={14} /> 循环播放
                </button>
              </div>
              <label className="mx-auto mt-2.5 flex max-w-md items-center gap-3 px-1 text-xs text-slate-300">
                <Gauge size={15} className="shrink-0 text-slate-500" />
                <span className="shrink-0">动画速度</span>
                <input type="range" min="0.5" max="1.8" step="0.05" value={speed} onChange={(event) => setSpeed(Number(event.target.value))} className="h-1.5 w-full cursor-pointer accent-blue-400" />
                <span className="w-10 shrink-0 text-right font-mono text-slate-400">{speed.toFixed(1)}×</span>
              </label>
            </div>
          </div>

          <aside className="glass flex min-h-[420px] flex-col rounded-[2rem] p-6 sm:p-8" aria-live="polite">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Selected face</p>
                <p className="mt-2 text-sm text-slate-400">点击魔方任意彩色小块选择栏目</p>
              </div>
              <div className="grid grid-cols-3 gap-1" aria-hidden="true">
                {cubeFaces.map((face) => <span key={face.id} className="size-3 rounded-[3px]" style={{ background: face.color }} />)}
              </div>
            </div>

            <div className="my-7 h-px bg-white/8" />

            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div key={selected.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="flex flex-1 flex-col">
                  <span className="mb-6 block h-1 w-16 rounded-full" style={{ background: selected.color }} />
                  <p className="font-mono text-sm text-slate-500">{selected.de}</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{selected.label}</h2>
                  <p className="mt-5 text-base leading-7 text-slate-300">{selected.description}</p>
                  <Link href={selected.href} className="focus-ring mt-auto inline-flex w-full items-center justify-between rounded-2xl px-5 py-4 font-medium text-slate-950 transition hover:brightness-110" style={{ background: selected.color }}>
                    进入详细页面 <ArrowRight size={18} />
                  </Link>
                </motion.div>
              ) : (
                <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-1 flex-col">
                  <div className="flex items-center gap-2 text-sm text-blue-300"><MapPin size={15} /> Bad Sachsa · Niedersachsen</div>
                  <h2 className="mt-5 text-3xl font-semibold tracking-tight">一所学校，六个视角</h2>
                  <p className="mt-5 text-base leading-7 text-slate-300">Pädagogium 是一所国家认可、独立办学并设有 Internat｜寄宿部的 Gymnasium｜文理中学。</p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <Link href="/school" className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-500 px-4 py-3.5 text-sm font-medium text-white transition hover:bg-blue-400"><ArrowRight size={16} /> 进入学校介绍</Link>
                    <Link href="/teachers" className="focus-ring inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-4 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"><Users size={16} /> 查看教师</Link>
                  </div>
                  <div className="mt-auto rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-sm leading-6 text-slate-400">
                    <strong className="text-slate-200">操作</strong><br />拖动或触摸改变视角 · 滚轮或双指缩放 · 点击彩色贴纸选择栏目
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </aside>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {cubeFaces.map((face) => (
            <button key={face.id} type="button" onClick={() => setSelectedFace(face.id)} className="focus-ring glass-soft group flex items-center gap-3 rounded-2xl p-3 text-left transition hover:-translate-y-0.5 hover:bg-white/[0.07]">
              <span className="size-3 shrink-0 rounded-sm shadow-[0_0_18px_currentColor]" style={{ background: face.color, color: face.color }} />
              <span><span className="block text-sm text-slate-200">{face.label}</span><span className="block text-[11px] text-slate-500">{face.de}</span></span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
