import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[65vh] max-w-2xl place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-sm text-blue-300">404 · CUBE FACE NOT FOUND</p>
        <h1 className="mt-4 text-4xl font-semibold">这一面还没有资料</h1>
        <p className="mt-4 text-slate-400">返回首页，继续旋转魔方探索学校。</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950">返回首页</Link>
      </div>
    </div>
  );
}
