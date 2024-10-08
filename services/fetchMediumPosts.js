import axios from "axios";
import { JSDOM } from "jsdom";

import { BASE_URL } from "../static/APP.js";
import getElementContent from "../utils/getElementContent.js";

const postLimit = 5;

/**
 * @description 지정된 태그의 주간 포스팅 정보 Medium 사이트로부터 가져옵니다.
 *
 * @param {string} tag 태그 값 (기본값: "nextjs")
 * @returns {Promise<Array<Object>>} - 배열 형태의 주간 트렌드 정보를 반환합니다.
 *
 * @example
 * const posts = await fetchMediumPosts(tag);
 */

export default async function fetchMediumPosts(tag = "nextjs") {
  try {
    const url = `${BASE_URL}/tag/${tag}/recommended`;
    const response = await axios.get(url);

    if (response.status === 200) {
      const html = response.data;
      const document = new JSDOM(html).window.document;

      let postInfo = [];
      const posts = getElementContent(document, "article");

      if (!posts) return null;
      posts.forEach((post, index) => {
        if (index >= postLimit) return;

        const title = getElementContent(post, "title");
        const author = getElementContent(post, "author");
        const preview = getElementContent(post, "preview");
        const link = getElementContent(post, "link");

        postInfo.push({
          title,
          author,
          preview,
          link,
        });
      });

      return postInfo;
    } else {
      console.log("데이터를 가져오는 데 실패했습니다.");
    }
  } catch (error) {
    console.log("오류가 발생했습니다.", error);
  }
}
