// 토큰 저장 페이지

localStorage.setItem(
  "token",
  // TOKEN 부분에 토큰 정보 입력받음
  "Bearer TOKEN"
);

export const token = localStorage.getItem("token") || "";
