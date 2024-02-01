package com.ssafy.easysign.sign.service;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.dto.response.CategoryResponse;
import com.ssafy.easysign.sign.entity.SignCategory;
import com.ssafy.easysign.sign.repository.SignCategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SignServiceImpl implements SignService {

    private final SignCategoryRepository signCategoryRepository;

    @Override
    public List<CategoryResponse> getCategoryResponseList(Gubun gubun) {
        List<SignCategory> signCategories = signCategoryRepository.findByGubun(gubun);
        List<CategoryResponse> categoryResponses = signCategories.stream()
                .map(this::mapToCategoryResponse)
                .collect(Collectors.toList());
        log.info("Category Responses: {}", categoryResponses);
        return categoryResponses;
    }
    public CategoryResponse mapToCategoryResponse(SignCategory signCategory) {
        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setCategoryId(signCategory.getCategoryId());
        categoryResponse.setCategoryName(signCategory.getCategoryName());
        return categoryResponse;
    }
}
