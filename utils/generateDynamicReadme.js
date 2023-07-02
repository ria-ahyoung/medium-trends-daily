import fs from "fs";
import path from "path";

import { DISPLAY_LABEL, TRENDS_TOPIC } from "../static/index.js";
import fetchMediumPosts from "../services/fetchMediumPosts.js";

import generatePostContent from "./generatePostContent.js";
import mergeReadmeFiles from "./mergeReadmeFiles.js";
import getCurrentDate from "./getCurrentDate.js";

/**
 * @description fetchMediumPosts 함수로부터 동적 컨텐츠를 받아와 신규 README 파일을 생성합니다.
 * - 생성된 파일 저장 위치 : `template/dynamic.md`
 * - 파일이 이미 존재할 경우 새로운 값으로 덮어씌워집니다.
 *
 * @example generateDynamicReadme();
 *
 */

export default async function generateDynamicReadme() {
  console.log(
    "Meduim에서 최신 트렌드를 받아옵니다. 잠시만 기다려 주세요... 🤖"
  );

  const allContent = [];

  for (const tag of TRENDS_TOPIC) {
    const posts = await fetchMediumPosts(tag);
    const content = generatePostContent(tag, posts);

    const { year, month, week, day } = getCurrentDate();
    const filePath = `./Daily_Trends/${year}/${month}월 트렌드/${week}째주/${DISPLAY_LABEL[tag]}/${month}월 ${day}일.md`;
    const directoryPath = path.dirname(filePath);

    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
    fs.writeFileSync(filePath, content, "utf-8");

    allContent.push(content);
    console.log(`ㄴ ${tag} 작업 완료`);
  }

  const mergedContent = allContent.join("<br/>");
  fs.writeFileSync("./template/dynamic.md", mergedContent, "utf-8");

  console.log("신규 컨텐츠가 dynamic.md 파일에 동적으로 생성되었습니다. 📖");
  mergeReadmeFiles();
}
