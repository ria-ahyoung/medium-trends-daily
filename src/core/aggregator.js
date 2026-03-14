import collectMediumTrends from "./collector.js";
import { TRENDS_TOPIC } from "../static/index.js";

export default async function aggregateTrends() {
  const allTrends = {};
  const tasks = TRENDS_TOPIC.map((tag) =>
    collectMediumTrends(tag)
      .then((mediumTrends) => {
        allTrends[tag] = { source: "medium", trends: mediumTrends };
      })
      .catch((error) => {
        console.error(`Error while collecting trends for [${tag}]:`, error);
        allTrends[tag] = { source: "medium", trends: [] };
      }),
  );
  await Promise.allSettled(tasks);
  return allTrends;
}
