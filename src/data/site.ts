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
  { id: "school", numeral: "壹", label: "学校介绍", de: "Schule", href: "/school", color: "#4f9d79", soft: "rgba(79,157,121,.18)", description: "认识这所位于南哈尔茨的国家认可私立文理中学。" },
  { id: "history", numeral: "貳", label: "学校历史", de: "Geschichte", href: "/history", color: "#3e8266", soft: "rgba(62,130,102,.18)", description: "从 19 世纪末的改革教育传统走进今天的校园。" },
  { id: "leadership", numeral: "參", label: "校长与管理", de: "Schulleitung", href: "/leadership", color: "#75a97f", soft: "rgba(117,169,127,.17)", description: "查看官网公开的校长、协调员与行政管理团队。" },
  { id: "teachers", numeral: "肆", label: "教师介绍", de: "Lehrkräfte", href: "/teachers", color: "#2f7359", soft: "rgba(47,115,89,.17)", description: "按姓名、学科与职务查找官网公开的教师信息。" },
  { id: "internat", numeral: "伍", label: "寄宿学校", de: "Internat", href: "/internat", color: "#b8cdb3", soft: "rgba(184,205,179,.15)", description: "了解两个寄宿楼、学习支持与共同生活。" },
  { id: "contact", numeral: "陸", label: "联系方式", de: "Kontakt", href: "/contact", color: "#8cac74", soft: "rgba(140,172,116,.18)", description: "查看学校地址、总机、邮箱与公开办公联系人。" },
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
