import Parser from 'rss-parser';
import { validateTrends } from './validator.js';

const parser = new Parser();

export default async function collectMediumTrends(tag) {
  try {

    // 1. Collect trends
    const feed = await parser.parseURL(`https://medium.com/feed/tag/${tag}`);
    const rawTrends = feed.items.map(item => ({
      title: item.title,
      author: item.creator,
      link: item.link,
      date: item.isoDate,
      content: item.contentSnippet,
      categories: item.categories
    }));

    // 2. Validate data
    const filteredTrends = validateTrends(rawTrends);
    console.log(`[${tag}] collected: ${rawTrends.length}, validated: ${filteredTrends.length}`);

    return filteredTrends;
  } catch (error) {
    console.error(`[${tag}] error while fetching trends (${error.message})`);
    return [];
  }
} 
