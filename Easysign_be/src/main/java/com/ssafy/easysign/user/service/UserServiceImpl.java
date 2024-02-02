package com.ssafy.easysign.user.service;
import com.ssafy.easysign.sign.entity.SignInfo;
import com.ssafy.easysign.user.entity.BookMark;
import com.ssafy.easysign.user.repository.UserBookMarkRepository;
import org.springframework.security.core.Authentication;
import com.ssafy.easysign.global.auth.PrincipalDetails;
import com.ssafy.easysign.store.dto.response.ItemResponse;
import com.ssafy.easysign.store.entity.Store;
import com.ssafy.easysign.store.repository.StoreRepository;
import com.ssafy.easysign.user.dto.request.ProfileRequest;
import com.ssafy.easysign.user.dto.response.UserInfoResponse;
import com.ssafy.easysign.user.entity.StickerLog;
import com.ssafy.easysign.user.entity.User;
import com.ssafy.easysign.user.entity.UserItem;
import com.ssafy.easysign.user.exception.NotFoundException;
import com.ssafy.easysign.user.repository.StickerLogRepository;
import com.ssafy.easysign.user.repository.UserItemRepository;
import com.ssafy.easysign.user.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserItemRepository userItemRepository;
    private final StoreRepository storeRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final StickerLogRepository stickerLogRepository;
    private final UserBookMarkRepository userBookMarkRepository;
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public UserInfoResponse getNavUserInfo(String loginId, Long userId) {
        UserInfoResponse response = new UserInfoResponse();
        Optional<User> user = userRepository.findByLoginId(loginId);

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
        Optional <User> user = userRepository.findByLoginId(loginId);
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

    @Override
    public void registBookMark(Long userId, Long signId) {
        User user = new User();
        user.setUserId(userId);

        SignInfo signInfo = new SignInfo();
        signInfo.setSignId(signId);

        BookMark bookMark = new BookMark();
        bookMark.setUser(user);
        bookMark.setSignInfo(signInfo);

        userBookMarkRepository.save(bookMark);
    }


    @Override
    public void updateProfile(Long userId, ProfileRequest profileRequest) {
        Optional<List<UserItem>> userItems = userItemRepository.findByUser_UserIdAndIsUse(userId, true);
        if(userItems.isEmpty()) throw new NotFoundException("사용자를 찾을 수 없습니다.");
        // 아이템 적용 전체 해제
        for(UserItem item : userItems.get()) {
            item.setUse(false);
            userItemRepository.save(item);
        }

        // 새 아이템 적용
        UserItem userItem = new UserItem();
        User user = new User();
        user.setUserId(userId);

        // 배경 적용
        Store item = new Store();
        item.setItemId(profileRequest.getBackgroundId());
        userItem.setUser(user);
        userItem.setItem(item);
        userItem.setUse(true);
        userItemRepository.save(userItem);

        // 캐릭터 적용
        item.setItemId(profileRequest.getCharacterId());
        userItem.setItem(item);
        userItemRepository.save(userItem);
    }

    @Override
    public void updateItem(Long itemId, Authentication authentication) {

        PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
        Long userId = userDetails.getUserId();

        // userId로 user_item 테이블에서 모든 아이템 조회
        Optional<List<UserItem>> userItemsOptional = userItemRepository.findByUser_UserId(userId);

        if (userItemsOptional.isPresent()) {
            List<UserItem> userItems = userItemsOptional.get();

            // 아이템 리스트에서 반복문을 돌면서 itemId와 일치하는 아이템 찾기
            for (UserItem userItem : userItems) {
                if (userItem.getItem().getItemId().equals(itemId)) {
                    // is_use 값 변경 (0이면 1로, 1이면 0으로 toggle)
                    userItem.setUse(!userItem.isUse());

                    // 변경된 정보 저장
                    userItemRepository.save(userItem);

                    // 반복문 탈출
                    break;
                }
            }
        } else {
            throw new NotFoundException("사용자를 찾을 수 없습니다.");
        }
    }

    @Override
    public void updateName(Long userId, String name) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()) throw new NotFoundException("사용자를 찾을 수 없습니다.");

        user.get().setName(name);
        userRepository.save(user.get());
    }

    @Override
    public void updatePassword(Long userId, String password) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()) throw new NotFoundException("사용자를 찾을 수 없습니다.");

        user.get().setPassword(bCryptPasswordEncoder.encode(password));
        userRepository.save(user.get());
    }

    @Override
    public void deleteUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()) throw new NotFoundException("사용자를 찾을 수 없습니다.");

        //유저 보유 아이템 삭제
        userItemRepository.deleteByUserId(userId);

        //TODO 학습된 단어 삭제
        //TODO 즐겨찾기 삭제
        //TODO 아이템 찜하기 삭제

        userRepository.delete(user.get());
    }

    @Override
    public void updateStickerCountAfter(Long userId, int count) {
        try {
            // 이전 스티커 갯수 조회
            int stickerCountBefore = getStickerCount(userId);

            log.info("stickerCountBefore : " + stickerCountBefore);

            // 스티커 갯수 업데이트
            updateUserSticker(userId, stickerCountBefore+count);

            // 변경된 스티커 갯수 조회
            int stickerCountAfter = stickerCountBefore+count;

            log.info("stickerCountAfter : " + stickerCountAfter);

            // StickerLog에 저장
            StickerLog stickerLog = new StickerLog();
            stickerLog.setUserId(getUser(userId));
            stickerLog.setStickerCountBefore(stickerCountBefore);
            stickerLog.setStickerCountAfter(stickerCountAfter);
            stickerLog.setOccurDate(new Timestamp(System.currentTimeMillis()));
            stickerLogRepository.save(stickerLog);
        } catch (Exception e) {
            // 예외 처리
            log.error("스티커 갯수 업데이트 및 로그 저장 실패. userId: {}, count: {}", userId, count, e);
            throw new RuntimeException("스티커 갯수 업데이트 및 로그 저장 실패.", e);
        }
    }

    @Override
    public List<ItemResponse> getUserItems(Long userId) {
        // 유저 아이디로 인해서 UserItemList를 가져와야한다.
        Optional<List<UserItem>> userItems = userItemRepository.findByUser_UserId(userId);
        List<ItemResponse> userItemResponses = new ArrayList<>();
        if(userItems.isPresent()){
            for (UserItem userItem : userItems.get()) {
                Long itemId = userItem.getItem().getItemId();
                Optional<Store> storeOptional = storeRepository.findByItemId(itemId);
                storeOptional.ifPresent(store -> {
                    // Store에서 필요한 정보를 이용하여 ItemResponse를 생성
                    ItemResponse itemResponse = new ItemResponse();
                    itemResponse.setItemId(store.getItemId());
                    itemResponse.setItemName(store.getItemName());
                    itemResponse.setCategoryName(store.getCategoryName().toString());
                    itemResponse.setImagePath(store.getImagePath());
                    // 생성된 ItemResponse를 리스트에 추가
                    userItemResponses.add(itemResponse);
                });
            }
        }
        return userItemResponses;
    }

    private User getUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new NotFoundException("사용자를 찾을 수 없습니다.");
        }
    }

    private int getStickerCount(Long userId) {
        // 스티커 갯수 조회
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get().getSticker();
        } else {
            throw new NotFoundException("사용자를 찾을 수 없습니다.");
        }
    }

    private void updateUserSticker(Long userId, int count) {
        try {
            // 네이티브 쿼리 대신 JPQL 사용
            entityManager.createQuery("UPDATE User SET sticker = : count WHERE userId = :userId")
                    .setParameter("count", count)
                    .setParameter("userId", userId)
                    .executeUpdate();
        } catch (Exception e) {
            // 예외 처리
            log.error("사용자 스티커 갯수 업데이트 실패. userId: {}, count: {}", userId, count, e);
            throw new RuntimeException("사용자 스티커 갯수 업데이트 실패.", e);
        }
    }

}
