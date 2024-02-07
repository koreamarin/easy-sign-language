// const BASE_URL = "https://i10c202.p.ssafy.io/api/v1";
const BASE_URL = "http://192.168.100.96:8080/api/v1";

const API = {
  CATEGORY: `${BASE_URL}/sign/category`,
  SIGNINFO: `${BASE_URL}/sign`,
  USERINFO: `${BASE_URL}/user/info`,
  ADDBOOKMARK: `${BASE_URL}/user/bookmark`,
  ADDSTICKER: `${BASE_URL}/user/sticker`,
  ADDLEARNEDWORD: `${BASE_URL}/user/progress`,
};

export default API;
