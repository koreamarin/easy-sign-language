// 토큰 저장 페이지

localStorage.setItem(
  "token",
  "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJFYXN5U2lnbiIsImV4cCI6MTcwODA3MDM0MCwiaWQiOjEsImxvZ2luSWQiOiJzc2FmeSJ9.gbrEPzWL6cGNAj_SnFP4nQB5qmxrT72DD3y5et15w8lfG5iCkWJNrwnpih7ua9ulvpmF1GvolMwa9RNzEA4cvA"
);

export const token = localStorage.getItem("token") || "";
