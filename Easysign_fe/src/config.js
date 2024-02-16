const BASE_URL = "https://easysign.shop/api/v1";

// params를 받아야 하는 경우 여기에 적지 않는다.
const API = {
  // 단어장 조회
  BOOKMARK: `${BASE_URL}/user/bookmark`,
  // 회원가입
  JOIN: `${BASE_URL}/auth/regist`,
  // 로그인
  LOGIN: `${BASE_URL}/login`,
  // 상점
  STORE_LIST: `${BASE_URL}/store/info`,
  // 보유아이템
  ITEM_HAVE: `${BASE_URL}/user/items`,
  // 아이템 구매
  ITEM_PURCHASE: `${BASE_URL}/store/buyItem`,
};

export default API;
