package com.ssafy.easysign.global.jwt;

public interface JwtProperties {
    String SECRET = "EasySign"; // 우리 서버만 알고 있는 비밀값
    int EXPIRATION_TIME = 1000*60*60*24; // 토큰 만료 기간 1일 [ms]
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
