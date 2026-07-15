"use client";

import { Box } from "lucide-react";
import { cubeFaces, type CubeFaceId } from "@/data/site";

export function CubeFallback({ onSelect }: { onSelect: (face: CubeFaceId) => void }) {
  return (
    <div className="grid h-full min-h-[420px] place-items-center px-6 pb-24 pt-20">
      <div className="max-w-sm text-center">
        <Box className="mx-auto text-slate-500" size={28} />
        <p className="mt-3 text-sm text-slate-300">当前设备无法加载 WebGL，已切换到二维魔方。</p>
        <div className="mx-auto mt-6 grid w-48 grid-cols-3 gap-1.5 rounded-3xl border border-white/10 bg-black/25 p-3 shadow-2xl">
          {Array.from({ length: 9 }, (_, index) => {
            const face = cubeFaces[index % cubeFaces.length];
            return <button key={index} type="button" aria-label={`选择${face.label}`} onClick={() => onSelect(face.id)} className="focus-ring aspect-square rounded-md transition hover:scale-105" style={{ background: face.color }} />;
          })}
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {cubeFaces.map((face) => <button key={face.id} type="button" onClick={() => onSelect(face.id)} className="focus-ring rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300">{face.label}</button>)}
        </div>
      </div>
    </div>
  );
}
