import { BASE_URL, DISPLAY_LABEL } from "../static/index.js";

/**
 * @description 포스팅 정보를 README 컨텐츠로 생성해 반환하는 함수입니다.
 * 
 * @param {string} tag : 토픽 정보 (ex. nextjs, react)
 * @param {Array<Object>} posts
 * @returns {string} 요약된 포스팅 정보를 마크다운 문자열 형태로 반환합니다.
 * 
 * @example const content = generatePostContent(tag, posts);
 * content === `
    <h3>포스팅 제목 - <a>link</a></h3>
    <p>저자명</p> <date>작성 날짜</date>
    <blockquote>요약 게시물</blockquote>
    `
 */

export default function generatePostContent(tag, posts) {
  const label = DISPLAY_LABEL[tag].split("/")[1];
  const mainUrl = `${BASE_URL}/tag/${tag}/recommended`;
  let readmeContent = `\n<h1><a href=${mainUrl} target="_blank" rel="noopener noreferrer">${label}</a></h1>\n`;

  if (!posts) return readmeContent += directContent('https://medium.com/tag/' + tag, label);
  else {
    posts?.forEach((post, index) => {
      const template = templateContent(post, index);
      readmeContent += template;
    });
    return readmeContent;
  }
}

const directContent = (link, label) => {
  return `<h3>🔥 &nbsp;<a href=${link} target="_blank" rel="noopener noreferrer">${label} 주간 핫토픽</a>&nbsp; 🔗</h3>\n`;
};

const templateContent = (post, index) => {
  const { title, author, date, preview, link } = post;
  return `<h3>${
    index + 1
  }. ${title} - <a href=${link} target="_blank" rel="noopener noreferrer">link</a></h3>\n\n✍️ **posted by \`${author}\`** <date>${
    date ? " , " + date : date
  }</date>\n\n<blockquote>${
    preview ?? "Click the link to check out the post. ⌲"
  }</blockquote>\n\n`;
};
