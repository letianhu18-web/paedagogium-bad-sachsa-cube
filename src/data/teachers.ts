import { VERIFIED_DATE } from "./site";

export type SubjectCategory = "语言" | "自然科学" | "社会科学" | "艺术与体育" | "宗教与价值观" | "其他";

export interface TeacherSubject {
  de: string;
  zh: string;
  category: SubjectCategory;
  lead?: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  photo?: string;
  profilePath: string;
  subjects: TeacherSubject[];
  roles: { de: string; zh: string }[];
  email?: string;
  phone?: string;
  source: string;
  verifiedAt: string;
}

const source = "https://www.internats-gymnasium.de/schule/lehrerinnen-und-lehrer.html";
const s = (de: string, zh: string, category: SubjectCategory, lead = false): TeacherSubject => ({ de, zh, category, lead });

const officialTeacherPhotos: Record<string, string> = {
  "mark-bischoff": "/images/teachers/mark-bischoff.jpg",
  "frau-bornemann": "/images/teachers/frau-bornemann.jpg",
  "stephan-bueschel": "/images/teachers/stephan-bueschel.jpg",
  "martin-coombes": "/images/teachers/martin-coombes.jpg",
  "andre-fries": "/images/teachers/andre-fries.jpg",
  "madame-grabes": "/images/teachers/madame-grabes.jpg",
  "beate-gruenberg": "/images/teachers/beate-gruenberg.jpg",
  "heinz-gruenberg": "/images/teachers/heinz-gruenberg.jpg",
  "dr-rainer-hattenhauer": "/images/teachers/dr-rainer-hattenhauer.jpg",
  "herr-kerwitz": "/images/teachers/herr-kerwitz.jpg",
  "alexander-klinzmann": "/images/teachers/alexander-klinzmann.jpg",
  "dr-michael-koehring": "/images/teachers/dr-michael-koehring.jpg",
  "frau-dr-kopka": "/images/teachers/frau-dr-kopka.jpg",
  "franziska-kuegler": "/images/teachers/franziska-kuegler.jpg",
  "andre-lang": "/images/teachers/andre-lang.jpg",
  "frau-lehne-rott": "/images/teachers/frau-lehne-rott.jpg",
  "dr-uwe-leinhos": "/images/teachers/dr-uwe-leinhos.jpg",
  "frau-luehrig": "/images/teachers/frau-luehrig.jpg",
  "hans-christian-metzger": "/images/teachers/hans-christian-metzger.jpg",
  "roland-moellers": "/images/teachers/roland-moellers.jpg",
  "frau-pfeiffer": "/images/teachers/frau-pfeiffer.jpg",
  "torsten-schwark": "/images/teachers/torsten-schwark.jpg",
  "herr-seidelmann": "/images/teachers/herr-seidelmann.jpg",
  "andreas-siebers": "/images/teachers/andreas-siebers.jpg",
  "herr-sieg": "/images/teachers/herr-sieg.jpg",
  "annika-tretbar": "/images/teachers/annika-tretbar.jpg",
  "miriam-wassmann": "/images/teachers/miriam-wassmann.jpg",
  "victor-woska": "/images/teachers/victor-woska.jpg",
};

type TeacherRecord = Omit<Teacher, "photo" | "profilePath">;

const teacherRecords: TeacherRecord[] = [
  { id: "manuel-antonius", name: "Manuel Antonius", subjects: [s("Erdkunde", "地理", "社会科学"), s("Politik-Wirtschaft", "政治与经济", "社会科学")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "mark-bischoff", name: "Mark Bischoff", subjects: [s("Englisch", "英语", "语言"), s("Französisch", "法语", "语言")], roles: [{ de: "Stellv. Schulleiter", zh: "副校长" }], email: "mark.bischoff@internats-gymnasium.schule", phone: "05523 / 3001-35", source, verifiedAt: VERIFIED_DATE },
  { id: "frau-bornemann", name: "Frau Bornemann", subjects: [s("Deutsch", "德语", "语言"), s("Politik-Wirtschaft", "政治与经济", "社会科学", true)], roles: [{ de: "Fachgruppenleiterin Politik-Wirtschaft", zh: "政治与经济学科组负责人" }], source, verifiedAt: VERIFIED_DATE },
  { id: "stephan-bueschel", name: "Stephan Büschel", subjects: [s("Biologie", "生物", "自然科学", true), s("Sport", "体育", "艺术与体育", true)], roles: [{ de: "Fachgruppenleiter Biologie / Sport", zh: "生物／体育学科组负责人" }], source, verifiedAt: VERIFIED_DATE },
  { id: "martin-coombes", name: "Martin Coombes", subjects: [s("HA-Betreuung", "作业辅导", "其他")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "simon-eichhorn", name: "Simon Eichhorn", subjects: [s("Erdkunde", "地理", "社会科学"), s("Biologie", "生物", "自然科学"), s("Politik-Wirtschaft", "政治与经济", "社会科学"), s("Berufsorientierung", "职业规划", "其他")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "andre-fries", name: "André Fries", subjects: [s("Englisch", "英语", "语言"), s("Darstellendes Spiel", "戏剧表演", "艺术与体育")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "madame-grabes", name: "Madame Grabes", subjects: [s("Englisch", "英语", "语言"), s("Französisch", "法语", "语言", true)], roles: [{ de: "Fachgruppenleiterin Französisch", zh: "法语学科组负责人" }], source, verifiedAt: VERIFIED_DATE },
  { id: "beate-gruenberg", name: "Beate Grünberg", subjects: [s("Englisch", "英语", "语言")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "heinz-gruenberg", name: "Heinz Grünberg", subjects: [s("Politik-Wirtschaft", "政治与经济", "社会科学"), s("Deutsch", "德语", "语言"), s("Werte und Normen", "价值观与规范", "宗教与价值观")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "dr-rainer-hattenhauer", name: "Dr. Rainer Hattenhauer", subjects: [s("Mathematik", "数学", "自然科学"), s("Physik", "物理", "自然科学", true), s("Informatik", "信息技术", "自然科学", true)], roles: [{ de: "Fachgruppenleiter Physik / Informatik", zh: "物理／信息技术学科组负责人" }], source, verifiedAt: VERIFIED_DATE },
  { id: "herr-herthum", name: "Herr Herthum", subjects: [s("Mathematik", "数学", "自然科学"), s("Physik", "物理", "自然科学")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "inken-karykowski", name: "Inken Karykowski", subjects: [s("Englisch", "英语", "语言"), s("Mathematik", "数学", "自然科学")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "herr-kerwitz", name: "Herr Kerwitz", subjects: [s("Kunst", "艺术", "艺术与体育")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "herr-kijek", name: "Herr Kijek", subjects: [s("Mathematik", "数学", "自然科学"), s("Sport", "体育", "艺术与体育")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "alexander-klinzmann", name: "Alexander Klinzmann", subjects: [s("Werte und Normen", "价值观与规范", "宗教与价值观"), s("Evangelische Religion", "新教宗教课", "宗教与价值观"), s("Latein", "拉丁语", "语言")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "dr-michael-koehring", name: "Dr. Michael Köhring", subjects: [s("Mathematik", "数学", "自然科学"), s("Physik", "物理", "自然科学")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "frau-dr-kopka", name: "Frau Dr. Kopka", subjects: [s("Mathematik", "数学", "自然科学"), s("Physik", "物理", "自然科学")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "franziska-kuegler", name: "Franziska Kügler", subjects: [s("Deutsch", "德语", "语言"), s("Politik-Wirtschaft", "政治与经济", "社会科学")], roles: [{ de: "Koordinatorin Sekundarstufe II", zh: "高中阶段负责人" }], email: "Franziska.Kuegler@internats-gymnasium.de", phone: "05523 / 3001-19", source, verifiedAt: VERIFIED_DATE },
  { id: "ewa-kukielka", name: "Ewa Kukielka", subjects: [s("Englisch", "英语", "语言"), s("Deutsch als Fremdsprache", "德语（外语）", "语言")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "andre-lang", name: "André Lang", subjects: [s("Englisch", "英语", "语言"), s("Deutsch", "德语", "语言")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "frau-lehne-rott", name: "Frau Lehne-Rott", subjects: [s("Deutsch", "德语", "语言"), s("Katholische Religion", "天主教宗教课", "宗教与价值观"), s("Werte und Normen", "价值观与规范", "宗教与价值观")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "dr-uwe-leinhos", name: "Dr. Uwe Leinhos", subjects: [s("Mathematik", "数学", "自然科学"), s("Physik", "物理", "自然科学"), s("Chemie", "化学", "自然科学"), s("Informatik", "信息技术", "自然科学")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "heike-lischewski", name: "Heike Lischewski", subjects: [s("Deutsch", "德语", "语言"), s("Mathematik", "数学", "自然科学")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "frau-luehrig", name: "Frau Lührig", subjects: [s("Musik", "音乐", "艺术与体育", true), s("Französisch", "法语", "语言")], roles: [{ de: "Fachgruppenleiterin Musik", zh: "音乐学科组负责人" }], source, verifiedAt: VERIFIED_DATE },
  { id: "hans-christian-metzger", name: "Hans-Christian Metzger", subjects: [s("Evangelische Religion", "新教宗教课", "宗教与价值观", true), s("Physik", "物理", "自然科学"), s("Musik", "音乐", "艺术与体育")], roles: [{ de: "Fachgruppenleiter Evangelische Religion", zh: "新教宗教课学科组负责人" }], source, verifiedAt: VERIFIED_DATE },
  { id: "roland-moellers", name: "Roland Möllers", subjects: [s("Deutsch", "德语", "语言", true), s("Englisch", "英语", "语言", true)], roles: [{ de: "Fachgruppenleiter Deutsch / Englisch", zh: "德语／英语学科组负责人" }], source, verifiedAt: VERIFIED_DATE },
  { id: "herr-pelz", name: "Herr Pelz", subjects: [s("Deutsch", "德语", "语言"), s("Geschichte", "历史", "社会科学"), s("Politik-Wirtschaft", "政治与经济", "社会科学")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "frau-pfeiffer", name: "Frau Pfeiffer", subjects: [s("Kunst", "艺术", "艺术与体育", true)], roles: [{ de: "Fachgruppenleiterin Kunst", zh: "艺术学科组负责人" }], source, verifiedAt: VERIFIED_DATE },
  { id: "claudia-quandt", name: "Claudia Quandt", subjects: [s("Biologie", "生物", "自然科学")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "natalie-rusch", name: "Natalie Rusch", subjects: [s("Französisch", "法语", "语言"), s("Deutsch", "德语", "语言")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "herr-schulze", name: "Herr Schulze", subjects: [s("Musik", "音乐", "艺术与体育"), s("Katholische Religion", "天主教宗教课", "宗教与价值观")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "torsten-schwark", name: "Torsten Schwark", subjects: [s("Deutsch", "德语", "语言"), s("Englisch", "英语", "语言")], roles: [{ de: "Schul- und Internatsleiter", zh: "学校与寄宿部负责人／校长" }], email: "torsten.schwark@internats-gymnasium.de", phone: "05523 / 3001-15", source, verifiedAt: VERIFIED_DATE },
  { id: "herr-seidelmann", name: "Herr Seidelmann", subjects: [s("Deutsch", "德语", "语言"), s("Geschichte", "历史", "社会科学")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "andreas-siebers", name: "Andreas Siebers", subjects: [s("Werte und Normen", "价值观与规范", "宗教与价值观")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "herr-sieg", name: "Herr Sieg", subjects: [s("Latein", "拉丁语", "语言"), s("Geschichte", "历史", "社会科学")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "stephanie-sommerfeld", name: "Stephanie Sommerfeld", subjects: [s("Englisch", "英语", "语言"), s("Deutsch", "德语", "语言")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "annika-tretbar", name: "Annika Tretbar", subjects: [s("Latein", "拉丁语", "语言"), s("Deutsch", "德语", "语言")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "benedikt-walta", name: "Benedikt Walta", subjects: [s("Mathematik", "数学", "自然科学", true), s("Latein", "拉丁语", "语言"), s("Informatik", "信息技术", "自然科学")], roles: [{ de: "Fachgruppenleiter Mathematik", zh: "数学学科组负责人" }], source, verifiedAt: VERIFIED_DATE },
  { id: "miriam-wassmann", name: "Miriam Waßmann", subjects: [s("Sport", "体育", "艺术与体育")], roles: [], source, verifiedAt: VERIFIED_DATE },
  { id: "victor-woska", name: "Victor Woska", subjects: [s("Latein", "拉丁语", "语言"), s("Geschichte", "历史", "社会科学", true)], roles: [{ de: "Koordinator Sekundarstufe I", zh: "初中阶段负责人" }, { de: "Fachgruppenleiter Geschichte", zh: "历史学科组负责人" }], email: "Victor.Woska@internats-gymnasium.de", phone: "05523 / 3001-14", source, verifiedAt: VERIFIED_DATE },
  { id: "patricia-zumbroich", name: "Patricia Zumbroich", subjects: [s("Latein", "拉丁语", "语言"), s("Spanisch (AG)", "西班牙语（社团）", "语言")], roles: [], source, verifiedAt: VERIFIED_DATE },
];

export const teachers: Teacher[] = teacherRecords.map((teacher) => ({
  ...teacher,
  photo: officialTeacherPhotos[teacher.id],
  profilePath: `/teachers/${teacher.id}`,
}));

export const teacherCategories: ("全部" | SubjectCategory)[] = ["全部", "语言", "自然科学", "社会科学", "艺术与体育", "宗教与价值观", "其他"];

export function teacherInitials(name: string) {
  const clean = name.replace(/^(Frau|Herr|Madame|Dr\.)\s+/i, "").replace(/Dr\.\s+/i, "");
  const parts = clean.split(/[\s-]+/).filter(Boolean);
  return parts.length > 1 ? `${parts[0][0]}${parts.at(-1)?.[0] ?? ""}`.toUpperCase() : clean.slice(0, 2).toUpperCase();
}
