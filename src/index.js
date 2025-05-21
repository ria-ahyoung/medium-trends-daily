"use strict";

import fs from 'fs';
import path from 'path';
import aggregateTrends from './core/aggregator.js';
import getCurrentDate from './utils/getCurrentDate.js';
import generatePostContent from './core/generator.js';

async function main() {
  console.log("Meduim에서 최신 트렌드를 받아옵니다. 잠시만 기다려 주세요... 🤖");
  
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
        console.log(`✓ ${tag} 트렌드 업데이트 완료`);
      } catch (error) {
        console.error(`⚠️ ${tag} 트렌드 생성 중 오류 발생:`, error.message);
        continue;
      }
    }
    console.log("신규 컨텐츠가 dynamic.md 파일에 동적으로 생성되었습니다. 📖");
  } catch (error) {
    console.error('트렌드 수집 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
}

main();
