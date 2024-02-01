package com.ssafy.easysign.store.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ItemResponse {
    private Long itemId;
    private String categoryName;
    private String itemName;
    private String imagePath;
}
