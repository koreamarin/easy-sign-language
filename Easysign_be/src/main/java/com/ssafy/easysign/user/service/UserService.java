package com.ssafy.easysign.user.service;


import com.ssafy.easysign.user.dto.response.UserInfoResponse;
import com.ssafy.easysign.user.dto.response.UserProfileResponse;

public interface UserService {
    UserInfoResponse getNavUserInfo(String loginId);

    UserProfileResponse getProfileInfo(Long userId);
}
