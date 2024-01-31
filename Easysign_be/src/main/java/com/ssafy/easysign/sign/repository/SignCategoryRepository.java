package com.ssafy.easysign.sign.repository;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.dto.response.CategoryResponse;
import com.ssafy.easysign.sign.entity.SignCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SignCategoryRepository extends JpaRepository<SignCategory, Long> {
    List<CategoryResponse> findAllByCategoryId(Long categoryId);
}

