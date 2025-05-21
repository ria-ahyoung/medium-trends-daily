import Parser from 'rss-parser';
import { validateTrends } from './validator.js';

const parser = new Parser();

export default async function collectMediumTrends(tag) {
  try {

    // 1. 트렌드 수집
    const feed = await parser.parseURL(`https://medium.com/feed/tag/${tag}`);
    const rawTrends = feed.items.map(item => ({
      title: item.title,
      author: item.creator,
      link: item.link,
      date: item.isoDate,
      content: item.contentSnippet,
      categories: item.categories
    }));

    // 2. 데이터 검증
    const filteredTrends = validateTrends(rawTrends);
    console.log(`[${tag}] 📥 수집된 트렌드: ${rawTrends.length}개, ✅ 검증된 트렌드: ${filteredTrends.length}개`);

    return filteredTrends;
  } catch (error) {
    console.error(`[${tag}] 트렌드 수집 중 오류 발생 (${error.message})`);
    return [];
  }
} 