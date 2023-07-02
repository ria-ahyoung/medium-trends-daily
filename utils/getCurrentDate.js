/**
 * @description 현재 날짜 정보가 담긴 객체를 반환해주는 함수입니다.
 *
 * @returns {Object<number>}
 * @example
 * const { year, month, week, day } = getCurrentDate(post, "title");
 *
 */

export default function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = (currentDate.getMonth() + 1).toString();
  const day = currentDate.getDate();
  const week = getWeekNumber(currentDate);

  return {
    year,
    month,
    week,
    day,
  };
}

/**
 * @description 전달된 날짜가 몇 째주인지 반환해주는 함수입니다.
 *
 * @param {Date} date
 * @returns {number}
 *
 * @example
 * const weekNumber = getWeekNumber(new Date());
 * weekNumber === 1 | 2 | 3 | 4 | 5 | 6 | 7 ;
 *
 */

function getWeekNumber(date) {
  const currentDate = date.getDate();
  const firstDay = new Date(date.setDate(1)).getDay();

  return Math.ceil((currentDate + firstDay) / 7);
}
