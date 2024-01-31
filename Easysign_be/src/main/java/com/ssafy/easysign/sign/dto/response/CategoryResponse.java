package com.ssafy.easysign.sign.dto.response;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import lombok.Data;

@Data
public class CategoryResponse {
    private Long categoryId;
    private String categoryName;
    private Gubun gubun;
}
