package com.ssafy.easysign.user.service;


import com.ssafy.easysign.user.dto.request.ProfileRequest;
import com.ssafy.easysign.user.dto.response.UserInfoResponse;
import com.ssafy.easysign.user.entity.User;

public interface UserService {
    UserInfoResponse getNavUserInfo(String loginId, Long userId);

    void registProfile(Long userid, Long itemId);

    User getUser(String loginId);

    void updateProfile(Long userId, ProfileRequest profileRequest);

    void updateName(Long userId, String name);

    void updatePassword(Long userId, String password);
}
