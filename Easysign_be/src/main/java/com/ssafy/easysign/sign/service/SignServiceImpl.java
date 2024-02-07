package com.ssafy.easysign.sign.service;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.dto.response.CategoryResponse;
import com.ssafy.easysign.sign.dto.response.SignResponse2;
import com.ssafy.easysign.sign.entity.SignCategory;
import com.ssafy.easysign.sign.entity.SignInfo;
import com.ssafy.easysign.sign.repository.SignCategoryRepository;
import com.ssafy.easysign.sign.repository.SignRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SignServiceImpl implements SignService {

    private final SignRepository signRepository;
    private final SignCategoryRepository signCategoryRepository;


    @Override
    public List<CategoryResponse> getCategoryList() {
        List<SignCategory> signCategories = signCategoryRepository.findAll();
        log.info("signCategories : " + signCategories);
        List<CategoryResponse> categoryResponses = signCategories.stream()
                .map(CategoryResponse::of)
                .toList();
        log.info("categoryResponses : " + categoryResponses);
        return categoryResponses;
    }

    @Override
    public List<SignResponse2> getSignResponseList(String categoryName, Gubun gubun) {
        SignCategory signCategory = signCategoryRepository.findByCategoryName(categoryName);
        log.info("signCategory : "+signCategory);
        Long categoryId = signCategory.getCategoryId();
        log.info("categoryId : " + categoryId);
        List<SignInfo> signInfos = signRepository.findByCategoryId(categoryId);
        log.info("signInfos : " + signInfos );
        List<SignResponse2> signResponses = new ArrayList<>();
        for(SignInfo signInfo : signInfos){
            signResponses.add(mapToSignResponses(signInfo,categoryId,gubun));
        }
        return signResponses;
    }

    public SignResponse2 mapToSignResponses(SignInfo signInfo, Long categoryId, Gubun gubun) {
        SignResponse2 signResponse = new SignResponse2();
        signResponse.setSignId(signInfo.getSignId());
        signResponse.setContent(signInfo.getContent());
        signResponse.setImagePath(signInfo.getImagePath());
        signResponse.setVideoPath(signInfo.getVideoPath());
        signResponse.setCategoryId(categoryId);
        signResponse.setGubun(gubun);
        return signResponse;
    }
}
