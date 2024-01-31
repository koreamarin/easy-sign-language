package com.ssafy.easysign.sign.service;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.dto.response.CategoryResponse;
import com.ssafy.easysign.sign.entity.SignCategory;
import com.ssafy.easysign.sign.repository.SignCategoryRepository;
import com.ssafy.easysign.sign.repository.SignRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SignServiceImpl implements SignService {

    private final SignCategoryRepository signCategoryRepository;

    @Override
    public List<CategoryResponse> getCategoryResponseList(Long categoryId) {
        List<CategoryResponse> responses = signCategoryRepository.findAllByCategoryId(categoryId);
        return responses;
    }
}
