export const VERIFIED_DATE = "2026-07-15";

export const navItems = [
  { href: "/", label: "首页" },
  { href: "/school", label: "学校介绍" },
  { href: "/history", label: "学校历史" },
  { href: "/leadership", label: "校长" },
  { href: "/teachers", label: "教师" },
  { href: "/contact", label: "联系方式" },
] as const;

export const cubeFaces = [
  { id: "school", label: "学校介绍", de: "Schule", href: "/school", color: "#2563eb", soft: "rgba(37,99,235,.18)", description: "认识这所位于南哈尔茨的国家认可私立文理中学。" },
  { id: "history", label: "学校历史", de: "Geschichte", href: "/history", color: "#ef4444", soft: "rgba(239,68,68,.18)", description: "从 19 世纪末的改革教育传统走进今天的校园。" },
  { id: "leadership", label: "校长与管理", de: "Schulleitung", href: "/leadership", color: "#facc15", soft: "rgba(250,204,21,.16)", description: "查看官网公开的校长、协调员与行政管理团队。" },
  { id: "teachers", label: "教师介绍", de: "Lehrkräfte", href: "/teachers", color: "#22c55e", soft: "rgba(34,197,94,.16)", description: "按姓名、学科与职务查找官网公开的教师信息。" },
  { id: "internat", label: "寄宿学校", de: "Internat", href: "/internat", color: "#f8fafc", soft: "rgba(248,250,252,.12)", description: "了解两个寄宿楼、学习支持与共同生活。" },
  { id: "contact", label: "联系方式", de: "Kontakt", href: "/contact", color: "#f97316", soft: "rgba(249,115,22,.18)", description: "查看学校地址、总机、邮箱与公开办公联系人。" },
] as const;

export type CubeFaceId = (typeof cubeFaces)[number]["id"];

export const schoolContact = {
  name: "Internatsgymnasium Pädagogium Bad Sachsa",
  address: "Ostertal 1–5, 37441 Bad Sachsa, Deutschland",
  phone: "+49 5523 3001 0",
  email: "info@internats-gymnasium.de",
  hours: "周一至周五 08:00–12:00（电话）",
  website: "https://www.internats-gymnasium.de/",
};
