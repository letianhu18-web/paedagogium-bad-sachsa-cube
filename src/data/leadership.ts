import { VERIFIED_DATE } from "./site";

export interface Leader {
  name: string;
  roleDe: string;
  roleZh: string;
  responsibility: string;
  email: string;
  phone: string;
}

export const leadership: Leader[] = [
  { name: "Torsten Schwark", roleDe: "Schul- und Internatsleiter", roleZh: "校长兼寄宿部负责人", responsibility: "学校与 Internat 的整体教育和组织领导", email: "torsten.schwark@internats-gymnasium.de", phone: "05523 / 3001-15" },
  { name: "Mark Bischoff, StD", roleDe: "Stellv. Schulleiter", roleZh: "副校长", responsibility: "协助学校管理与教学组织", email: "mark.bischoff@internats-gymnasium.schule", phone: "05523 / 3001-35" },
  { name: "Victor Woska", roleDe: "Koordinator Sekundarstufe I", roleZh: "初中阶段负责人", responsibility: "Sekundarstufe I｜中学阶段 I 的教学协调", email: "Victor.Woska@internats-gymnasium.de", phone: "05523 / 3001-14" },
  { name: "Franziska Kügler", roleDe: "Koordinatorin Sekundarstufe II", roleZh: "高中阶段负责人", responsibility: "Sekundarstufe II / Oberstufe｜高中阶段的教学与升学考试协调", email: "Franziska.Kuegler@internats-gymnasium.de", phone: "05523 / 3001-19" },
  { name: "Oana Lehmköster", roleDe: "Wirtschaftsleiterin", roleZh: "经济与运营负责人", responsibility: "学校运营与经济管理", email: "oana.lehmkoester@internats-gymnasium.de", phone: "05523 / 3001-20" },
  { name: "Detlev Weigmann", roleDe: "Verwaltung", roleZh: "行政管理", responsibility: "学校行政事务", email: "detlev.weigmann@internats-gymnasium.schule", phone: "05523 / 3001-21" },
  { name: "Birgit Omland", roleDe: "Sekretariat", roleZh: "学校秘书处", responsibility: "秘书处与日常联络", email: "birgit.omland@internats-gymnasium.de", phone: "05523 / 3001-12" },
];

export const leadershipSource = "https://www.internats-gymnasium.de/kontakt.html";
export const leadershipVerifiedAt = VERIFIED_DATE;
