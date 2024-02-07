package com.ssafy.easysign.sign.repository;

import com.ssafy.easysign.sign.entity.SignCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SignCategoryRepository extends JpaRepository<SignCategory, Long> {
    Optional<SignCategory> findByCategoryName(String categoryName);
}


