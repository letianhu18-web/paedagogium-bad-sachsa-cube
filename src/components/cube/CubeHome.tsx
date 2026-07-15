"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Compass, Home, MapPin, Pause, Play, RotateCcw, Shuffle, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cubeFaces, type CubeFaceId } from "@/data/site";
import { CubeViewport } from "./CubeViewport";

const evolutionSeeds = [731, 422, 187, 63, 0] as const;

export function CubeHome() {
  const [selectedFace, setSelectedFace] = useState<CubeFaceId | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [evolutionStep, setEvolutionStep] = useState(0);
  const [scrambleSeed, setScrambleSeed] = useState<number>(evolutionSeeds[0]);
  const [resetKey, setResetKey] = useState(0);
  const selected = cubeFaces.find((face) => face.id === selectedFace);

  useEffect(() => {
    if (!autoRotate) return;
    const delay = evolutionStep === evolutionSeeds.length - 1 ? 6000 : 2900;
    const timer = window.setTimeout(() => {
      const nextStep = (evolutionStep + 1) % evolutionSeeds.length;
      setEvolutionStep(nextStep);
      setScrambleSeed(evolutionSeeds[nextStep]);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [autoRotate, evolutionStep]);

  const resetCube = () => {
    setScrambleSeed(0);
    setEvolutionStep(evolutionSeeds.length - 1);
    setSelectedFace(null);
    setResetKey((value) => value + 1);
  };

  const scrambleCube = () => {
    setSelectedFace(null);
    setEvolutionStep(0);
    setScrambleSeed(Math.floor(Math.random() * 10_000) + 1);
  };

  const returnHome = () => {
    setSelectedFace(null);
    setEvolutionStep(0);
    setScrambleSeed(evolutionSeeds[0]);
    setResetKey((value) => value + 1);
  };

  const evolutionStatus = scrambleSeed === 0
    ? "自动演变 · 已复原"
    : evolutionStep === 0
      ? "自动演变 · 初始打乱"
      : `自动演变 · 阶段 ${evolutionStep + 1}/${evolutionSeeds.length}`;

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
          <div className="glass relative min-h-[420px] overflow-hidden rounded-[2rem] sm:min-h-[560px]">
            <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-[#080c16]/70 px-3 py-2 text-xs text-slate-300 backdrop-blur-md">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" /> {evolutionStatus}
            </div>
            <CubeViewport
              selectedFace={selectedFace}
              autoRotate={autoRotate}
              scrambleSeed={scrambleSeed}
              resetKey={resetKey}
              onSelect={setSelectedFace}
            />
            <div className="absolute inset-x-4 bottom-4 z-10 flex flex-wrap justify-center gap-2">
              <button type="button" onClick={scrambleCube} className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#080c16]/75 px-3.5 py-2 text-xs text-slate-200 backdrop-blur-md transition hover:bg-white/10">
                <Shuffle size={14} /> 打乱魔方
              </button>
              <button type="button" onClick={resetCube} className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#080c16]/75 px-3.5 py-2 text-xs text-slate-200 backdrop-blur-md transition hover:bg-white/10">
                <RotateCcw size={14} /> 复原魔方
              </button>
              <button type="button" onClick={() => setAutoRotate((value) => !value)} className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#080c16]/75 px-3.5 py-2 text-xs text-slate-200 backdrop-blur-md transition hover:bg-white/10">
                {autoRotate ? <Pause size={14} /> : <Play size={14} />} 自动旋转
              </button>
              <button type="button" onClick={returnHome} className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#080c16]/75 px-3.5 py-2 text-xs text-slate-200 backdrop-blur-md transition hover:bg-white/10">
                <Home size={14} /> 返回首页
              </button>
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
                    <strong className="text-slate-200">操作提示</strong><br />拖动或触摸旋转 · 滚轮或双指缩放 · 悬停高亮 · 点击选面
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
