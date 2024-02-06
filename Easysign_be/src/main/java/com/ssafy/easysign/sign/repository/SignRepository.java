package com.ssafy.easysign.sign.repository;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.entity.SignInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SignRepository extends JpaRepository<SignInfo,Long> {
    SignInfo findBySignId(Long signId);
    List<SignInfo> findByCategoryIdAndGubun(Long categoryId, Gubun gubun);

    List<SignInfo> findAll();

}
