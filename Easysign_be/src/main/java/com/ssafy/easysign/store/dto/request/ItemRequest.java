package com.ssafy.easysign.store.dto.request;

import com.ssafy.easysign.global.jpaEnum.StoreCategory;

public record ItemRequest (
    Long itemId,
    StoreCategory categoryName,
    int price,
    String description,
    String imagePath,
    int isLike
) {

}
