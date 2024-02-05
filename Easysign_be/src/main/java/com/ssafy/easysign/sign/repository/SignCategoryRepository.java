package com.ssafy.easysign.sign.repository;

import com.ssafy.easysign.sign.entity.SignCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SignCategoryRepository extends JpaRepository<SignCategory, Long> {
    SignCategory findByCategoryName(String categoryName);
}


