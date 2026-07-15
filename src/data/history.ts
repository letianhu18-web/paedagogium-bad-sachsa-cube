import { VERIFIED_DATE } from "./site";

export interface HistoryEvent {
  year: string;
  title: string;
  description: string;
  keyword: string;
  source: string;
}

const chronicle = "https://www.internats-gymnasium.de/ueber-das-paedagogium/geschichte.html";

export const historyEvents: HistoryEvent[] = [
  { year: "24.06.1890", title: "购入今日校园用地", description: "Willbrandt Rhotert 购买今天的 Pädagogium 校园，并建起如今主楼的核心部分。", keyword: "Geländekauf · Haupthaus", source: chronicle },
  { year: "04.1891", title: "迁至 Bad Sachsa 并开学", description: "原先由 W. Rhotert 在 Roßla 创办的学校迁到 Bad Sachsa，学校与寄宿部同时开放。", keyword: "Schule und Internat eröffnet", source: chronicle },
  { year: "1898", title: "校园第一次重要扩建", description: "礼堂扩建，并修建被称为“Schwarzes Haus”的建筑。", keyword: "Aula · Schwarzes Haus", source: chronicle },
  { year: "1905–1908", title: "Härtelsches Pädagogium 阶段", description: "Walter Härtel 在 Bad Sachsa 开设“Härtelsches Pädagogium”；1905 年学校获得相应的私校认可，1908 年迁入 Ostertal 校址。", keyword: "Härtelsches Pädagogium", source: chronicle },
  { year: "1930", title: "获准实行男女合校", description: "学校获得国家对 Koedukation 的许可，并把 Haus Tannenberg 作为女生寄宿楼开放。", keyword: "Koedukation · Mädcheninternat", source: chronicle },
  { year: "1932", title: "取得毕业考试资格", description: "学校被认可为可举行 Reifeprüfung 的私立学校，并完成第一次 Abitur 考试。", keyword: "Reifeprüfungsberechtigte Privatschule", source: chronicle },
  { year: "1937–1938", title: "学校类型与艺术楼", description: "学校按国家要求改制为 Oberrealschule；翌年建成艺术教学楼。", keyword: "Oberrealschule · Kunstgebäude", source: chronicle },
  { year: "01.04.1944", title: "战争期间国有化", description: "学校以“Staatliche Internatsschule Bad Sachsa”的名称被国有化。", keyword: "Verstaatlichung", source: chronicle },
  { year: "05.10.1945", title: "战后恢复", description: "Kulenkampff-Pauli 女士重新取得学校，最初 5 名寄宿学生回到校园。", keyword: "Wiedereröffnung", source: chronicle },
  { year: "19.02.1954", title: "学校协会成立", description: "Schulverein 成立，为之后的非营利办学结构奠定基础。", keyword: "Gründung des Schulvereins", source: chronicle },
  { year: "01.01.1968", title: "协会接管学校", description: "官网历史年表记载，学校协会接管 Pädagogium，并使用 Waldheimschule Pädagogium Bad Sachsa Kulenkampff Stiftung e.V. 这一名称。", keyword: "freie Trägerschaft", source: chronicle },
  { year: "1978–1987", title: "寄宿建筑持续更新", description: "Haus Tannenberg 的基础建筑在 1978 年完成，1984 年新楼启用；1987 年新 Haus Kulenkampff 在校园内启用。", keyword: "Tannenberg · Kulenkampff", source: chronicle },
  { year: "1990", title: "百年校庆", description: "Pädagogium 举行 100 周年纪念。", keyword: "100-jähriges Jubiläum", source: chronicle },
  { year: "17.06.2000", title: "Wandelturm 启用", description: "Forschnerscher Wandelturm 正式启用，成为校园建筑发展中的一个节点。", keyword: "Forschnerscher Wandelturm", source: chronicle },
  { year: "2003–2009", title: "语言证书与课程拓展", description: "2003 年举行首次 DELF 法语考试；2009 年举行首次 Cambridge Certificate 英语考试，并开始管乐团课程。", keyword: "DELF · Cambridge Certificate", source: chronicle },
  { year: "2026", title: "数字化与校园共同体", description: "官网公开资料显示，学校为学生提供 1:1 iPad 配备、教室数字显示设备；2026 年学校加入“Schule ohne Rassismus – Schule mit Courage”网络。", keyword: "Digitalisierung · Schule mit Courage", source: "https://www.internats-gymnasium.de/" },
];

export const historyVerifiedAt = VERIFIED_DATE;
