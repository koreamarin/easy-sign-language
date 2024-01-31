package com.ssafy.easysign.user.service;


import com.ssafy.easysign.user.dto.response.UserInfoResponse;
import com.ssafy.easysign.user.dto.response.UserProfileResponse;
import com.ssafy.easysign.user.entity.User;

public interface UserService {
    UserInfoResponse getNavUserInfo(String loginId);

    UserProfileResponse getProfileInfo(Long userId);

    void registProfile(Long userid, Long itemId);

    User getUser(String loginId);
}
