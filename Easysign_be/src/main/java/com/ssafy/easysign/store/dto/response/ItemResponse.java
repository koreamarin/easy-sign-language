package com.ssafy.easysign.store.dto.response;

public record ItemResponse (
    Long itemId,
    String categoryName,
    String itemName,
    String imagePath,
    boolean  isLike
)  {}
