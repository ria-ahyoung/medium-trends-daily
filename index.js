"use strict";

import fs from 'fs';
import path from 'path';
import aggregateTrends from './src/core/aggregator.js';
import getCurrentDate from './src/utils/getCurrentDate.js';
import generatePostContent from './src/core/generator.js';

async function main() {
  console.log('트렌드 수집을 시작합니다... 🤖');
  
  try {
    const trends = await aggregateTrends();
    const { year, month, week, day } = getCurrentDate();
    
    for (const [tag, data] of Object.entries(trends)) {
      const content = generatePostContent(tag, data.trends);
      const filePath = `./Daily_Trends/${year}/${month}월 트렌드/${week}째주/${tag}/${month}월 ${day}일.md`;
      const directoryPath = path.dirname(filePath);
      
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }
      
      fs.writeFileSync(filePath, content, 'utf-8');
    }
    
    console.log('모든 트렌드가 성공적으로 업데이트되었습니다. 📖');
  } catch (error) {
    console.error('트렌드 수집 중 오류가 발생했습니다:', error);
    process.exit(1);
  }
}

main();
