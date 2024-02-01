package com.ssafy.easysign.sign.service;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.dto.response.CategoryResponse;
import com.ssafy.easysign.sign.dto.response.SignResponse;
import com.ssafy.easysign.sign.entity.SignCategory;
import com.ssafy.easysign.sign.entity.SignInfo;
import com.ssafy.easysign.sign.repository.SignCategoryRepository;
import com.ssafy.easysign.sign.repository.SignRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SignServiceImpl implements SignService {

    private final SignRepository signRepository;
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

    @Override
    public List<SignResponse> getSignResponseList(Long categoryId, Gubun gubun) {
        List<SignInfo> signInfos = signRepository.findByCategoryIdAndGubun(categoryId, gubun);
        List<SignResponse> signResponses = signInfos.stream()
                .map(this::mapToSignResponses)
                .collect(Collectors.toList());
        log.info("Sign signResponses : {}", signResponses);
        return signResponses;
    }

    public CategoryResponse mapToCategoryResponse(SignCategory signCategory) {
        CategoryResponse categoryResponse = new CategoryResponse();
        categoryResponse.setCategoryId(signCategory.getCategoryId());
        categoryResponse.setCategoryName(signCategory.getCategoryName());
        return categoryResponse;
    }
    public SignResponse mapToSignResponses(SignInfo signInfo) {
        SignResponse signResponse = new SignResponse();
        signResponse.setSignId(signInfo.getSignId());
        signResponse.setContent(signInfo.getContent());
        signResponse.setImagePath(signInfo.getImagePath());
        signResponse.setVideoPath(signInfo.getVideoPath());
        return signResponse;
    }
}
