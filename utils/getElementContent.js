/**
 * @description 전달된 type 값을 지정된 Element 값을 전달합니다.
 * 포스팅 정보를 받아오기 위해
 * @param {Document} document - 요소를 검색할 parent 문서 객체 정보
 * @param {string} type - 받아올 정보 유형
 * @returns {Document | string} - element 정보 반환
 *
 * @example
 * const title = getElementContent(post, "title");
 * title === '포스팅 제목';
 *
 * const article = getElementContent(document, "article");
 * article === <article> ... </article>;
 *
 */

const EXCEPTION_TYPE = ["article", "link"];

export default function getElementContent(document, type) {
  const elements = {
    article: document.querySelectorAll("article"),
    title: document.querySelector("div.ab > div > a > h2 "),
    author: document.querySelector("div.bl > a > p"),
    date: document.querySelector("a > span > div"),
    preview: document.querySelector("div.jc > h3"),
    link: document.querySelector("div.ab > div > a").getAttribute("href"),
  };

  if (EXCEPTION_TYPE.includes(type)) return elements[type];
  return elements[type]?.textContent.trim();
}
