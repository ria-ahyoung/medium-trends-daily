import collectMediumTrends from "./collector.js";
import { TRENDS_TOPIC } from "../static/index.js";

export default async function aggregateTrends() {
  const allTrends = {};
  
  for (const tag of TRENDS_TOPIC) {
    try {
      const mediumTrends = await collectMediumTrends(tag);
      allTrends[tag] = {
        source: 'medium',
        trends: mediumTrends
      };
    } catch (error) {
      console.error(`${tag} 트렌드 수집 중 오류 발생:`, error);
    }
  }
  
  return allTrends;
} 