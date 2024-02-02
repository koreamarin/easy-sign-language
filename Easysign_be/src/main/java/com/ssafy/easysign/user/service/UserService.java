package com.ssafy.easysign.user.service;


import com.ssafy.easysign.store.dto.response.ItemResponse;
import com.ssafy.easysign.user.dto.request.ProfileRequest;
import com.ssafy.easysign.user.dto.response.UserInfoResponse;
import com.ssafy.easysign.user.entity.User;
//import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.security.core.Authentication;
import java.util.List;

public interface UserService {
    UserInfoResponse getNavUserInfo(String loginId, Long userId);

    void registProfile(Long userid, Long itemId);

    User getUser(String loginId);

    void updateProfile(Long userId, ProfileRequest profileRequest);

    void updateItem(Long itemId, Authentication authentication);

    void updateName(Long userId, String name);

    void updatePassword(Long userId, String password);

    void deleteUser(Long userId);

    void updateStickerCountAfter(Long userId, int count);

    List<ItemResponse> getUserItems(Long userId);
}
