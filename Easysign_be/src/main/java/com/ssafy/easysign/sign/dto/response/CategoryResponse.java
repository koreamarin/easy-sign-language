package com.ssafy.easysign.sign.dto.response;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CategoryResponse {
    private Long categoryId;
    private String categoryName;
}
