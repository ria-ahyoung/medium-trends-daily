import fs from "fs";
import path from "path";

import aggregateTrends from "../core/aggregator.js";
import generatePostContent from "../core/generator.js";
import { infra, common, front, mobile } from "../static/index.js";

import mergeReadmeFiles from "./mergeReadmeFiles.js";
import getCurrentDate from "./getCurrentDate.js";

/**
 * @description Medium 트렌드 데이터를 받아와 신규 README 파일을 생성합니다.
 * - 생성된 파일 저장 위치 : `src/template/dynamic.md`
 * - 파일이 이미 존재할 경우 새로운 값으로 덮어씌워집니다.
 *
 * @example generateDynamicReadme();
 *
 */

export default async function generateDynamicReadme() {
  console.log("Fetching the latest trends from Medium. Please wait... 🤖");

  const allContent = [];

  try {
    const trends = await aggregateTrends();
    const { year, month, week, day } = getCurrentDate();

    const ordered = [common, infra, front, mobile];
    for (const group of ordered) {
      for (const tag of group) {
        const data = trends[tag] || { trends: [] };
        try {
          const content = generatePostContent(tag, data.trends);
          const filePath = `./Daily_Trends/${year}/${month}-trends/${week}th-week/${tag}/${month}-${day}.md`;
          const directoryPath = path.dirname(filePath);
          if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
          }
          fs.writeFileSync(filePath, content, "utf-8");
          allContent.push(content);
          console.log(`✓ ${tag} trends updated`);
        } catch (error) {
          console.error(`⚠️ Error generating ${tag} trends:`, error.message);
          continue;
        }
      }
    }

    const mergedContent = allContent.join("<br/>");
    fs.writeFileSync("./src/template/dynamic.md", mergedContent, "utf-8");

    mergeReadmeFiles();
  } catch (error) {
    console.error("Error occurred during trend collection:", error);
    process.exit(1);
  }
}
