package com.ssafy.easysign.sign.repository;

import com.ssafy.easysign.sign.entity.SignCategory;
import com.ssafy.easysign.sign.entity.SignInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SignRepository extends JpaRepository<SignInfo,Long> {

}
