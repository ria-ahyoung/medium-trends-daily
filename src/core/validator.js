/**
 * 스팸성 컨텐츠를 필터링하는 함수
 */
export function isSpamContent(content) {
  // 1. 반복되는 해시태그 패턴 체크
  const hashtagPattern = /#\w+#/g;
  const hashtags = content.match(hashtagPattern) || [];
  if (hashtags.length > 5) return true;

  // 2. 컨텐츠 길이 체크 (너무 짧은 컨텐츠)
  if (content.length < 50) return true;

  // 3. 특수문자 비율 체크
  const specialCharRatio = (content.match(/[^a-zA-Z0-9\s]/g) || []).length / content.length;
  if (specialCharRatio > 0.5) return true;

  return false;
}


export function validateTrends(trends) {
  return trends.filter(trend => {
    // 제목과 내용 모두 스팸이 아닌 경우만 허용
    return !isSpamContent(trend.title) && !isSpamContent(trend.content);
  });
} 