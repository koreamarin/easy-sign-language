// 토큰 저장 페이지

function Token() {
  localStorage.setItem(
    "token",
    "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJFYXN5U2lnbiIsImV4cCI6MTcwNzk1NjYzMiwiaWQiOjEsImxvZ2luSWQiOiJzc2FmeSJ9.b2ymQWsAP9esX7Q3v1G8-n9YdLOr9rnEHJWF2G4PX4boHjZPv4kfrIuDvI6GTeI29mZbGwL6GYxzDPzfpzZZpw"
  );
}

export const token = localStorage.getItem("token") || "";
