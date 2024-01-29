package com.ssafy.easysign.sign.repository;

import com.ssafy.easysign.sign.entity.SignInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SignRepository extends JpaRepository<SignInfo,Long> {

}
