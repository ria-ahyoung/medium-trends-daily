import fs from "fs";
import path from "path";

import aggregateTrends from "../core/aggregator.js";
import generatePostContent from "../core/generator.js";

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
  console.log("Meduim에서 최신 트렌드를 받아옵니다. 잠시만 기다려 주세요... 🤖");

  const allContent = [];
  
  try {
    const trends = await aggregateTrends();
    const { year, month, week, day } = getCurrentDate();
    
    for (const [tag, data] of Object.entries(trends)) {
      try {
        const content = generatePostContent(tag, data.trends);
        const filePath = `./Daily_Trends/${year}/${month}월 트렌드/${week}째주/${tag}/${month}월 ${day}일.md`;
        const directoryPath = path.dirname(filePath);
        
        if (!fs.existsSync(directoryPath)) {
          fs.mkdirSync(directoryPath, { recursive: true });
        }
        
        fs.writeFileSync(filePath, content, 'utf-8');

        allContent.push(content);
        console.log(`✓ ${tag} 트렌드 업데이트 완료`);
      } catch (error) {
        console.error(`⚠️ ${tag} 트렌드 생성 중 오류 발생:`, error.message);
        continue;
      }
    }

    const mergedContent = allContent.join("<br/>");
    fs.writeFileSync("./src/template/dynamic.md", mergedContent, "utf-8");

    mergeReadmeFiles();

  } catch (error) {
    console.error('트렌드 수집 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
}