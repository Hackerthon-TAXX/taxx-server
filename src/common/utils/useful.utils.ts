/**
 * 두 지점 사이의 거리를 계산합니다.
 * @param {number} lat1 - 출발지 위도
 * @param {number} lon1 - 출발지 경도
 * @param {number} lat2 - 도착지 위도
 * @param {number} lon2 - 도착지 경도
 * @returns {number} 두 지점 사이의 거리 (미터 단위)
 */
export const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  if (lat1 == lat2 && lon1 == lon2) return 0;

  let radLat1 = (Math.PI * lat1) / 180;
  let radLat2 = (Math.PI * lat2) / 180;
  let theta = lon1 - lon2;
  let radTheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  if (dist > 1) dist = 1;

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515 * 1.609344 * 1000;
  if (dist < 100) dist = Math.round(dist / 10) * 10;
  else dist = Math.round(dist / 100) * 100;

  return dist;
};

/**
 * 두 지점 사이의 거리를 문자열로 반환합니다.
 * @param {number} lat1 - 출발지 위도
 * @param {number} lon1 - 출발지 경도
 * @param {number} lat2 - 도착지 위도
 * @param {number} lon2 - 도착지 경도
 * @returns {string} 두 지점 사이의 거리 문자열 (예: "100m", "1.5km")
 */
export const strDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): string => {
  if (lat1 == lat2 && lon1 == lon2) return '0m';

  let radLat1 = (Math.PI * lat1) / 180;
  let radLat2 = (Math.PI * lat2) / 180;
  let theta = lon1 - lon2;
  let radTheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  if (dist > 1) dist = 1;

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = Math.round(dist * 60 * 1.1515 * 1.609344 * 1000);

  if (dist < 1000) {
    return dist + 'm';
  } else {
    return (dist / 1000).toFixed(1) + 'km';
  }
};

/**
 * 랜덤한 거리 값을 반환합니다.
 * @returns {number} 랜덤한 거리 값
 */
export const getRandomDistance = (): number => {
  return Math.random() * (0.007 - 0.002) + 0.002;
};

export const predictTime = (distance) => {
  console.log(distance);
  const speed = 0.001;
  const time = distance * speed;

  const hours = Math.floor(time / 60);
  const minutes = Math.round(time % 60);

  if (minutes < 6) {
    return '근처예요';
  }

  return `${hours}시간 ${minutes}분`;
};
