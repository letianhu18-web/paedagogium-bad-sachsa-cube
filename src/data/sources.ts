import { VERIFIED_DATE } from "./site";

export interface SourceRecord {
  title: string;
  url: string;
  usedFor: string;
  note?: string;
}

export const sources: SourceRecord[] = [
  { title: "Pädagogium Bad Sachsa｜官网首页", url: "https://www.internats-gymnasium.de/", usedFor: "学校简介、1890 创办年表述、规模、教育理念、地址与近期发展" },
  { title: "Schule｜学校页面", url: "https://www.internats-gymnasium.de/schule.html", usedFor: "学校类型、5–13 年级、课程、Oberstufe、校园设施与 1889 前身表述", note: "该页的 1889 表述与官网首页的 1890 表述不同，网站已显著标注。" },
  { title: "Geschichte｜官方历史年表", url: "https://www.internats-gymnasium.de/ueber-das-paedagogium/geschichte.html", usedFor: "1890–2014 的历史节点、校名与校园建筑变化" },
  { title: "Schule in freier Trägerschaft", url: "https://www.internats-gymnasium.de/ueber-das-paedagogium/schule-in-freier-traegerschaft.html", usedFor: "国家认可、Ersatzschule、办学主体与区域角色" },
  { title: "Unser Selbstverständnis", url: "https://www.internats-gymnasium.de/schule/unser-selbstverstaendnis.html", usedFor: "人文教育、改革教育传统、Fordern und Fördern 教育理念" },
  { title: "Gymnasiale Oberstufe", url: "https://www.internats-gymnasium.de/schule/gymnasiale-oberstufe.html", usedFor: "11–13 年级、课程设置、三个方向与 Abitur" },
  { title: "Lehrkräfte｜教师名单", url: "https://www.internats-gymnasium.de/schule/lehrerinnen-und-lehrer.html", usedFor: "教师姓名、学科、学科组负责人、公开校内职务及官网人员照片" },
  { title: "Kontakt｜官方联系方式", url: "https://www.internats-gymnasium.de/kontakt.html", usedFor: "地址、总机、办公时间、校长与管理人员、官方工作邮箱和电话" },
  { title: "Internat｜寄宿学校", url: "https://www.internats-gymnasium.de/internat.html", usedFor: "寄宿部特点、两个寄宿楼、教育人员职责与国际学生来源" },
  { title: "Erzieher*innen｜寄宿教育团队", url: "https://www.internats-gymnasium.de/internat/erzieherteam.html", usedFor: "官网公开的寄宿教育人员姓名" },
  { title: "官网校园图片", url: "https://www.internats-gymnasium.de/wp-content/uploads/2016/11/schule_ueber.jpg", usedFor: "学校介绍页面的校园配图" },
  { title: "官网寄宿生活图片（2024-09）", url: "https://www.internats-gymnasium.de/wp-content/uploads/2024/11/Internat202409-web.jpg", usedFor: "寄宿学校页面配图" },
];

export const sourceDates = { retrievedAt: VERIFIED_DATE, verifiedAt: VERIFIED_DATE };
