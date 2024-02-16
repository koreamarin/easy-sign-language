package com.ssafy.easysign.store.service;


import com.ssafy.easysign.store.dto.response.ItemResponse;
import com.ssafy.easysign.store.entity.StoreLike;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface StoreService {
    List<ItemResponse> getItemResponseList(Long userId);
    ItemResponse getItemDetails(Long itemId, Long userId);
    Boolean buyItem(Long itemId, Authentication authentication);
    void postLikeItem(Long itemId, Authentication authentication);
    void deleteLikeItem(Long itemId, Authentication authentication);
}
