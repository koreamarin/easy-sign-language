package com.ssafy.easysign.store.service;


import com.ssafy.easysign.store.dto.response.ItemResponse;

import java.util.List;
import java.util.Optional;

public interface StoreService {
    List<ItemResponse> getItemResponseList();
    Optional<ItemResponse> getItemDetails(Long itemId);

}
