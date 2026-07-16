"use client";

import { Box } from "lucide-react";
import { cubeFaces, type CubeFaceId } from "@/data/site";

export function CubeFallback({ onSelect }: { onSelect: (face: CubeFaceId) => void }) {
  return (
    <div className="grid h-full min-h-[420px] place-items-center px-6 pb-24 pt-20">
      <div className="max-w-sm text-center">
        <Box className="mx-auto text-amber-200/55" size={28} />
        <p className="mt-3 text-sm text-emerald-50/70">当前设备无法加载 WebGL，已切换到二维玉石魔方。</p>
        <div className="jade-control mx-auto mt-6 grid w-48 grid-cols-3 gap-1.5 rounded-3xl p-3 shadow-2xl">
          {Array.from({ length: 9 }, (_, index) => {
            const face = cubeFaces[index % cubeFaces.length];
            return <button key={index} type="button" aria-label={`选择${face.label}`} onClick={() => onSelect(face.id)} className="focus-ring grid aspect-square place-items-center rounded-md font-serif text-sm font-semibold text-[#09271d] shadow-[inset_1px_1px_2px_rgba(255,255,255,.3),inset_-2px_-2px_3px_rgba(0,25,17,.34)] transition hover:scale-105" style={{ background: face.color }}>{face.numeral}</button>;
          })}
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {cubeFaces.map((face) => <button key={face.id} type="button" onClick={() => onSelect(face.id)} className="focus-ring jade-button-secondary rounded-full px-3 py-1.5 text-xs">{face.label}</button>)}
        </div>
      </div>
    </div>
  );
}
