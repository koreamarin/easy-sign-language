package com.ssafy.easysign.user.service;

import com.ssafy.easysign.global.auth.PrincipalDetails;
import com.ssafy.easysign.sign.dto.response.SignResponse;
import com.ssafy.easysign.sign.entity.SignInfo;
import com.ssafy.easysign.sign.repository.SignRepository;
import com.ssafy.easysign.store.dto.response.ItemResponse;
import com.ssafy.easysign.store.entity.Store;
import com.ssafy.easysign.store.repository.StoreRepository;
import com.ssafy.easysign.user.dto.request.ProfileRequest;
import com.ssafy.easysign.user.dto.response.UserInfoResponse;
import com.ssafy.easysign.user.entity.*;
import com.ssafy.easysign.user.exception.NotFoundException;
import com.ssafy.easysign.user.repository.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
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
    private final SignRepository signRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final StickerLogRepository stickerLogRepository;
    private final UserBookMarkRepository userBookMarkRepository;
    private final UserProgressRepository userProgressRepository;

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
    public List<SignResponse> getSigns(Authentication authentication) {
        PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
        Long userId = userDetails.getUserId();
        User user = userRepository.findById(userId).orElseThrow(()->new NotFoundException("사용자가 없습니다."));
        List<BookMark> bookMarkList = userBookMarkRepository.findBookMarksByUser(user);
        List<SignInfo> signInfos =bookMarkList.stream()
                .map(BookMark::getSignInfo)
                .toList();
        log.info("signInfos : " + signInfos);
        List<SignResponse> signResponses = signInfos.stream()
                .map(SignResponse::fromSignInfo)
                .toList();
        return signResponses;
    }

    @Override
    public void saveUserProgress(Long signId, Authentication authentication) {
        PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
        Long userId = userDetails.getUserId();
        UserProgress progress = new UserProgress();
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()) throw new NotFoundException("사용자를 찾을 수 없습니다.");

        SignInfo signInfo = signRepository.findBySignId(signId);

        progress.setUser(user.get());
        progress.setSignInfo(signInfo);

        userProgressRepository.save(progress);
    }


    @Override
    public void registProfile(Long userId, Long itemId) {
        UserItem userItem = new UserItem();
        Optional<User> user = userRepository.findById(userId);
        Optional<Store> item = storeRepository.findByItemId(itemId);

        userItem.setUser(user.get());
        userItem.setItem(item.get());
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

        Optional<UserItem> priorUserItem = userItemRepository.findPriorItem(userId, itemId);
        if (priorUserItem.isPresent()) {
            //기존 아이템
            priorUserItem.get().setUse(false);
            userItemRepository.save(priorUserItem.get());

            // 새 아이템 적용
            Optional<UserItem> userItem = userItemRepository.findByUser_UserIdAndItem_ItemId(userId, itemId);
            if(userItem.isEmpty()) throw new NotFoundException("해당 아이템을 보유하고 있지 않습니다.");

            userItem.get().setUse(true);
            userItemRepository.save(userItem.get());

        } else {
            throw new NotFoundException("아이템을 찾을 수 없습니다.");
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

    /**
     * 즐겨찾기 삭제 메소드
     *
     * @param signId 삭제할 즐겨찾기의 식별자
     * @param userId 현재 사용자의 식별자
     * @return 삭제가 성공한 경우 true, 실패한 경우 false 반환
     */
    @Override
    public boolean deleteBookMark(Long signId, Long userId) {
        // 주어진 userId와 signId로 즐겨찾기를 찾음
        Optional<BookMark> bookMark = userBookMarkRepository.findByUser_userIdAndSignInfo_signId(userId, signId);

        // 즐겨찾기가 존재할 경우 삭제 수행
        if (bookMark.isPresent()) {
            // 주어진 signId로 SignInfo를 찾음
            Optional<SignInfo> signInfo = signRepository.findById(signId);

            // 주어진 userId로 User를 찾음
            Optional<User> user = userRepository.findById(userId);

            // 즐겨찾기 삭제
            userBookMarkRepository.deleteByUser_userIdAndSignInfo_signId(userId, signId);
            return true; // 삭제 성공
        } else {
            return false; // 삭제할 즐겨찾기가 존재하지 않음
        }
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
