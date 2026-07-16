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
  { id: "school", numeral: "壹", label: "学校介绍", de: "Schule", href: "/school", color: "#9ec9b0", soft: "rgba(158,201,176,.2)", description: "认识这所位于南哈尔茨的国家认可私立文理中学。" },
  { id: "history", numeral: "貳", label: "学校历史", de: "Geschichte", href: "/history", color: "#86b89f", soft: "rgba(134,184,159,.2)", description: "从 19 世纪末的改革教育传统走进今天的校园。" },
  { id: "leadership", numeral: "參", label: "校长与管理", de: "Schulleitung", href: "/leadership", color: "#c8d9b8", soft: "rgba(200,217,184,.19)", description: "查看官网公开的校长、协调员与行政管理团队。" },
  { id: "teachers", numeral: "肆", label: "教师介绍", de: "Lehrkräfte", href: "/teachers", color: "#70a990", soft: "rgba(112,169,144,.19)", description: "按姓名、学科与职务查找官网公开的教师信息。" },
  { id: "internat", numeral: "伍", label: "寄宿学校", de: "Internat", href: "/internat", color: "#edf2e2", soft: "rgba(237,242,226,.16)", description: "了解两个寄宿楼、学习支持与共同生活。" },
  { id: "contact", numeral: "陸", label: "联系方式", de: "Kontakt", href: "/contact", color: "#b7cb9b", soft: "rgba(183,203,155,.2)", description: "查看学校地址、总机、邮箱与公开办公联系人。" },
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
