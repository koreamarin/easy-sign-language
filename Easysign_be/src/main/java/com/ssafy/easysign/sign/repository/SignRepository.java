package com.ssafy.easysign.sign.repository;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.entity.SignInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SignRepository extends JpaRepository<SignInfo,Long> {
    Optional <SignInfo> findBySignId(Long signId);
    List<SignInfo> findAllByGubun(Gubun gubun);
    List<SignInfo> findAllByCategoryId(Long categoryId);
}
