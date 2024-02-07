package com.ssafy.easysign.sign.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.entity.SignCategory;
import lombok.*;

@Builder
@AllArgsConstructor
@Setter
@Getter
@JsonSerialize
public class CategoryResponse {
    private Long categoryId;
    private String categoryName;
    private Gubun gubun;
    private int addSticker;

    public static CategoryResponse of(SignCategory signCategory){
        return CategoryResponse.builder()
            .categoryId(signCategory.getCategoryId())
            .categoryName(signCategory.getCategoryName())
            .gubun(signCategory.getGubun())
            .addSticker(signCategory.getAddSticker())
            .build();
    }
}
