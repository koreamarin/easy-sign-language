package com.ssafy.easysign.store.service;

import com.ssafy.easysign.global.auth.PrincipalDetails;
import com.ssafy.easysign.store.dto.response.ItemResponse;
import com.ssafy.easysign.store.dto.response.ItemResponseInterface;
import com.ssafy.easysign.store.entity.Store;
import com.ssafy.easysign.store.entity.StoreLike;
import com.ssafy.easysign.store.mapper.StoreMapper;
import com.ssafy.easysign.store.repository.StoreLikeRepository;
import com.ssafy.easysign.store.repository.StoreRepository;
import com.ssafy.easysign.user.entity.User;
import com.ssafy.easysign.user.entity.UserItem;
import com.ssafy.easysign.user.exception.NotFoundException;
import com.ssafy.easysign.user.repository.UserItemRepository;
import com.ssafy.easysign.user.repository.UserRepository;
import com.ssafy.easysign.user.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreRepository storeRepository;
    @Autowired
    private StoreLikeRepository storeLikeRepository;

    @Autowired
    private  UserItemRepository userItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private StoreMapper storeMapper;

    @Override
    public List<ItemResponse> getItemResponseList(Long userId) {
        List<Long> except = new ArrayList<>();
        except.add(1L);
        except.add(2L);
        except.add(13L);
        List<ItemResponseInterface> stores = storeRepository.findStoreItem(except, userId);
        List<ItemResponse> itemResponses = stores.stream()
                .map(storeMapper::toItemResponse)
                .collect(Collectors.toList());
        log.info("Item Responses : {}", itemResponses);
        return itemResponses;
    }

    @Override
    public ItemResponse getItemDetails(Long itemId, Long userId) {
        return storeRepository.findItemDetail(itemId, userId)
                .map(storeMapper::toItemResponse)
                .orElseThrow();
    }

    @Override
    public Boolean buyItem(Long itemId, Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        User user = userRepository.findById(principalDetails.getUser().getUserId())
                .orElseThrow();
        Optional<UserItem> curItemCheck = userItemRepository.findByUser_UserIdAndItem_ItemId(user.getUserId(), itemId);
        if(curItemCheck.isPresent()) return false;
        Optional<Store> storeOptional = storeRepository.findByItemId(itemId);

        if (storeOptional.isPresent()) {
            Store store = storeOptional.get();
            int userSticker = user.getSticker();
            log.info("userSticker : " + userSticker);
            int requiredSticker = store.getPrice();
            log.info("requiredSticker : " + requiredSticker);
            if (userSticker >= requiredSticker) {
                UserItem userItem = new UserItem();
                userItem.setUser(user);
                userItem.setItem(store);
                userItemRepository.save(userItem);
                userService.updateStickerCountAfter(user.getUserId(),-requiredSticker);
                // 성공적으로 아이템을 구매했을 경우
                return true;
            } else {
                log.error("스티커 잔액 부족");
                // 스티커 잔액이 부족한 경우
                return false;
            }
        } else {
            // 해당 itemId에 해당하는 상점이 없는 경우
            throw new RuntimeException("Store not found for itemId: " + itemId);
        }
    }

    @Override
    public void postLikeItem(Long itemId, Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        User user = principalDetails.getUser();

        // 데이터베이스에서 Store 엔티티를 검색합니다.
        Optional<Store> optionalStore = storeRepository.findById(itemId);
        if (optionalStore.isPresent()) {
            Store store = optionalStore.get();
            // StoreLike 인스턴스를 생성하고 속성을 설정합니다.
            StoreLike storeLike = new StoreLike();
            // 데이터베이스에서 user 엔티티를 다시 가져와서 관리되는 상태로 만듭니다.
            User managedUser = userRepository.findById(user.getUserId()).orElseThrow(() ->
                    new EntityNotFoundException("User not found with id: " + user.getUserId()));
            storeLike.setUser(managedUser);
            storeLike.setStore(store);

            // StoreLike 엔티티를 저장합니다.
            storeLikeRepository.save(storeLike);
        } else {
            log.error("Store with itemId " + itemId + " not found");
            // 해당 itemId에 대한 Store가 없는 경우에 대한 처리를 추가하세요.
        }
    }

    @Override
    public void deleteLikeItem(Long itemId, Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        User user = principalDetails.getUser();

        // 데이터베이스에서 Store 엔티티를 검색합니다.
        Optional<Store> optionalStore = storeRepository.findById(itemId);
        if (optionalStore.isPresent()) {
            Store store = optionalStore.get();

            // StoreLike 인스턴스를 생성하고 속성을 설정합니다.
            StoreLike storeLike = storeLikeRepository.findByUserAndStore(user, store);
            if (storeLike != null) {
                // StoreLike 엔티티를 삭제합니다.
                storeLikeRepository.delete(storeLike);
            } else {
                log.error("StoreLike not found for user with id " + user.getUserId() + " and itemId " + itemId);
            }
        } else {
            log.error("Store with itemId " + itemId + " not found");
        }
    }
    private User getUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new NotFoundException("사용자를 찾을 수 없습니다.");
        }
    }
}
