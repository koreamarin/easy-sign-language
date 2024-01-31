package com.ssafy.easysign.user.service;


import com.ssafy.easysign.user.dto.response.UserInfoResponse;

public interface UserService {
    UserInfoResponse getNavUserInfo(String loginId);
}
