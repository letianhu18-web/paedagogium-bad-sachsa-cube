import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const records = {
  "mark-bischoff": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/BIS-21.jpg",
  "frau-bornemann": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/BOR-21.jpg",
  "stephan-bueschel": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/BSM-21.jpg",
  "martin-coombes": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/CMB-21.jpg",
  "andre-fries": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/FRI-21.jpg",
  "madame-grabes": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/GRA-21.jpg",
  "beate-gruenberg": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/GNF-21.jpg",
  "heinz-gruenberg": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/GNM-21.jpg",
  "dr-rainer-hattenhauer": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/HAT-21-1.jpg",
  "herr-kerwitz": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/KWZ-21.jpg",
  "alexander-klinzmann": "https://www.internats-gymnasium.de/wp-content/uploads/2025/09/KLM-25.jpg",
  "dr-michael-koehring": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/KOE-21.jpg",
  "frau-dr-kopka": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/KOP-21.jpg",
  "franziska-kuegler": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/KUG-21.jpg",
  "andre-lang": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/LNG-21.jpg",
  "frau-lehne-rott": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/LRO-21.jpg",
  "dr-uwe-leinhos": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/LEI-21.jpg",
  "frau-luehrig": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/LUE-21.jpg",
  "hans-christian-metzger": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/MEZ-21.jpg",
  "roland-moellers": "https://www.internats-gymnasium.de/wp-content/uploads/2025/09/MOE-25.jpg",
  "frau-pfeiffer": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/PFR-21.jpg",
  "torsten-schwark": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/SWA-21.jpg",
  "herr-seidelmann": "https://www.internats-gymnasium.de/wp-content/uploads/2026/04/SEI-26.jpg",
  "andreas-siebers": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/SIB-21.jpg",
  "herr-sieg": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/SIG-21.jpg",
  "annika-tretbar": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/TTB-21.jpg",
  "miriam-wassmann": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/WSM-21.jpg",
  "victor-woska": "https://www.internats-gymnasium.de/wp-content/uploads/2021/10/WOS-21.jpg",
};

const output = join(process.cwd(), "public", "images", "teachers");
await mkdir(output, { recursive: true });
for (const [id, url] of Object.entries(records)) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  await writeFile(join(output, `${id}.jpg`), Buffer.from(await response.arrayBuffer()));
  console.log(`saved ${id}.jpg`);
}
