package com.ssafy.easysign.user.service;


import com.ssafy.easysign.sign.dto.response.SignResponse;
import com.ssafy.easysign.store.dto.response.ItemResponse;
import com.ssafy.easysign.user.dto.request.ProfileRequest;
import com.ssafy.easysign.user.dto.response.UserInfoResponse;
import com.ssafy.easysign.user.entity.User;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface UserService {
    UserInfoResponse getNavUserInfo(String loginId, Long userId);

    void registProfile(Long userid, Long itemId);

    void registBookMark(Long userId, Long signId);

    User getUser(String loginId);

    List<SignResponse> getSigns(Authentication authentication);

    void saveUserProgress(Long signId, Authentication authentication);

    void updateProfile(Long userId, ProfileRequest profileRequest);

    void updateItem(Long userId, Long itemId);

    void updateName(Long userId, String name);

    void updatePassword(Long userId, String password);

    void deleteUser(Long userId);

    boolean deleteBookMark(Long signId, Long userId);

    void updateStickerCountAfter(Long userId, int count);

    List<ItemResponse> getUserItems(Long userId);

    boolean getUserProgressCount(Long userId);
}
