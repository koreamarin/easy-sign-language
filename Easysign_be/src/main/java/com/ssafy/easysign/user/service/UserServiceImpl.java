package com.ssafy.easysign.user.service;

import com.ssafy.easysign.store.entity.Store;
import com.ssafy.easysign.store.repository.StoreRepository;
import com.ssafy.easysign.user.dto.response.UserInfoResponse;
import com.ssafy.easysign.user.entity.User;
import com.ssafy.easysign.user.entity.UserItem;
import com.ssafy.easysign.user.exception.NotFoundException;
import com.ssafy.easysign.user.repository.UserItemRepository;
import com.ssafy.easysign.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserItemRepository userItemRepository;
    private final StoreRepository storeRepository;
    @Override
    public UserInfoResponse getNavUserInfo(String loginId, Long userId) {
        UserInfoResponse response = new UserInfoResponse();
        Optional<User> user = userRepository.findByLoginIdAndIsDeleted(loginId, false);

        if(user.isEmpty()) throw new NotFoundException("사용자를 찾을 수 없습니다.");
        response.setName(user.get().getName());
        response.setSticker(user.get().getSticker());

        Optional<List<UserItem>> userProfile = userItemRepository.findByUser_UserIdAndIsUse(userId, true);
        for(UserItem item : userProfile.get()) {
            Optional<Store> itemInfo = storeRepository.findByItemId(item.getItem().getItemId());
            if(itemInfo.isEmpty()) throw new NotFoundException("해당하는 아이템을 찾을 수 없습니다.");
            if(itemInfo.get().getCategoryName().toString().equals("background")) {
                response.setProfileBackgroundPath(itemInfo.get().getImagePath());
            } else {
                response.setProfileCharacterPath(itemInfo.get().getImagePath());
            }
        }
        return response;
    }

    @Override
    public User getUser(String loginId) {
        Optional <User> user = userRepository.findByLoginIdAndIsDeleted(loginId, false);
        if(user.isEmpty()) throw new NotFoundException("사용자를 찾을 수 없습니다.");
        return user.get();
    }

    @Override
    public void registProfile(Long userId, Long itemId) {
        UserItem userItem = new UserItem();
        User user = new User();
        Store item = new Store();
        user.setUserId(userId);
        item.setItemId(itemId);

        userItem.setUser(user);
        userItem.setItem(item);
        userItem.setUse(true);
        userItemRepository.save(userItem);
    }


}
