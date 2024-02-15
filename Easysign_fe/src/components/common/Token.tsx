// 토큰 저장 페이지

function Token() {
  localStorage.setItem(
    "token",
    "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJFYXN5U2lnbiIsImV4cCI6MTcwNzk3ODIzOCwiaWQiOjEsImxvZ2luSWQiOiJzc2FmeSJ9.8hLq-oy4_KjFTL7MZ_Fs94_i11Rhb7y163oYc2J7cBbMEnuTLbKNBz2FmuI_8xlfa-6UDWBB8lYOGHbUULneDw"
  );
}

export const token = localStorage.getItem("token") || "";
