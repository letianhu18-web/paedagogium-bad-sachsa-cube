export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-6" role="status" aria-label="页面加载中">
      <div className="text-center">
        <div className="mx-auto grid size-16 grid-cols-3 gap-1 rounded-2xl bg-white/5 p-2 ring-1 ring-white/10">
          {Array.from({ length: 9 }, (_, index) => <span key={index} className="animate-pulse rounded-sm bg-blue-400/70" style={{ animationDelay: `${index * 80}ms` }} />)}
        </div>
        <p className="mt-4 text-sm text-slate-400">正在转动魔方…</p>
      </div>
    </div>
  );
}
