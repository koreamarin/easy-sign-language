package com.ssafy.easysign.store.service;

import com.ssafy.easysign.store.dto.response.ItemResponse;
import com.ssafy.easysign.store.entity.Store;
import com.ssafy.easysign.store.repository.StoreRepository;
import com.ssafy.easysign.user.entity.User;
import com.ssafy.easysign.user.exception.NotFoundException;
import com.ssafy.easysign.user.repository.UserItemRepository;
import com.ssafy.easysign.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    private final UserRepository userRepository;

    @Autowired
    private final UserItemRepository userItemRepository;
    @Override
    public List<ItemResponse> getItemResponseList() {
        List<Store> stores = storeRepository.findAll();
        List<ItemResponse> itemResponses = stores.stream()
                .map(this::mapToitemResponses)
                .collect(Collectors.toList());
        log.info("Item Responses : {}", itemResponses);
        return itemResponses;
    }



    private User getUser(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new NotFoundException("사용자를 찾을 수 없습니다.");
        }
    }

    public ItemResponse mapToitemResponses(Store store){
        ItemResponse itemResponse = new ItemResponse();
        itemResponse.setItemId(store.getItemId());
        itemResponse.setItemName(store.getItemName());
        itemResponse.setCategoryName(store.getCategoryName().toString());
        itemResponse.setImagePath(store.getImagePath());
        return itemResponse;
    }
}
