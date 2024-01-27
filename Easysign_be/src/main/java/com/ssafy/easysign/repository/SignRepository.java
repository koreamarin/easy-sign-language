package com.ssafy.easysign.repository;

import com.ssafy.easysign.model.SignInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SignRepository extends JpaRepository<SignInfo,Long> {

}
