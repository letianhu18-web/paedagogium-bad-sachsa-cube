export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-6" role="status" aria-label="页面加载中">
      <div className="text-center">
        <div className="glass mx-auto grid size-16 grid-cols-3 gap-1 rounded-2xl p-2">
          {Array.from({ length: 9 }, (_, index) => <span key={index} className={`animate-pulse rounded-sm ${index % 3 === 0 ? "bg-amber-200/70" : index % 2 === 0 ? "bg-[#e8eedc]/75" : "bg-emerald-400/75"}`} style={{ animationDelay: `${index * 80}ms` }} />)}
        </div>
        <p className="mt-4 text-sm text-emerald-100/55">正在转动玉石魔方…</p>
      </div>
    </div>
  );
}
