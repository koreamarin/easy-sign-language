package com.ssafy.easysign.store.service;


import com.ssafy.easysign.store.dto.response.ItemResponse;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface StoreService {
    List<ItemResponse> getItemResponseList(Long userId);
    ItemResponse getItemDetails(Long itemId);
    Boolean buyItem(Long itemId, Authentication authentication);

}
