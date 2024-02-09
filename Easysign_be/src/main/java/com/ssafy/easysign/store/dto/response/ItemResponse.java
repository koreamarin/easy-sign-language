package com.ssafy.easysign.store.dto.response;

public record ItemResponse (
    Long itemId,
    String categoryName,
    int price,
    String description,
    String imagePath,
    String itemName,
    boolean isLike
)  {}
