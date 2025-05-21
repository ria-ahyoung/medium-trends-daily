import getCurrentDate from "./getCurrentDate.js";

export default function generateDateTitle() {
  const { year, month, day } = getCurrentDate();
  const todayDate = `${year}/${month.padStart(2, "0")}/${day.padStart(2, "0")}`;
  return `# Daily Tech Trends ![Static Badge](https://img.shields.io/badge/version-latest_updated_(${todayDate})-725236)\n`;
};
