package com.ssafy.easysign.sign.service;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.dto.response.CategoryResponse;

import java.util.List;

public interface SignService {
    List<CategoryResponse> getCategoryResponseList(Long categoryId);
}
