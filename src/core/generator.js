import { DISPLAY_LABEL } from "../static/index.js";

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
    <p>저자명</p> 
    <blockquote>요약 게시물</blockquote>
    `
 */

export default function generatePostContent(tag, posts) {
  const label = DISPLAY_LABEL[tag].split("/")[1];
  let readmeContent = `\n<h1><a href=https://medium.com/tag/${tag}/recommended target="_blank" rel="noopener noreferrer">${label}</a></h1>\n`;

  if (!posts.length) return readmeContent += directContent("https://medium.com/tag/" + tag, label);
  else {
    posts?.forEach((post, index) => {
      const template = templateContent(post, index);
      readmeContent += template;
    });
    return readmeContent;
  }
}

const directContent = (link, label) => {
  return `<h3>🔥 &nbsp;<a href="${link}" target="_blank" rel="noopener noreferrer">${label} Weekly Hot Topics</a>&nbsp; 🔗</h3>\n`;
};

const templateContent = (post, index) => {
  const { title, author, content, link } = post;
  const postTitle = `${index + 1}. ${title}`;
  const postLink = `<a href="${link}" target="_blank" rel="noopener noreferrer">link</a>`;
  const authorInfo = `✍️ **posted by \`${author ?? "Unknown"}\`**`;
  const postPreview = `<blockquote>${content ?? "Please click the link to read the article. ⌲"}</blockquote>`;
  return `<h3>${postTitle} - ${postLink}</h3>\n\n${authorInfo}\n\n${postPreview}\n\n`;
};
