import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "badsachsa",
    template: "%s｜badsachsa",
  },
  description: "通过互动三维魔方，用中文了解 Pädagogium Bad Sachsa 的学校、历史、教师与寄宿生活。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased">
        <div className="site-grid pointer-events-none fixed inset-0 -z-20" />
        <div className="palace-frame" aria-hidden="true" />
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <span className="particle absolute left-[8%] top-[18%] size-1 rounded-full bg-emerald-200 text-emerald-200" />
          <span className="particle absolute left-[78%] top-[26%] size-1.5 rounded-full bg-[#e8eedc] text-[#e8eedc] [animation-delay:2s]" />
          <span className="particle absolute left-[48%] top-[72%] size-1 rounded-full bg-amber-200 text-amber-200 [animation-delay:4s]" />
          <span className="particle absolute left-[92%] top-[62%] size-1 rounded-full bg-emerald-400 text-emerald-400 [animation-delay:6s]" />
        </div>
        <SiteHeader />
        <main className="min-h-[70vh]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
