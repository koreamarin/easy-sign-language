package com.ssafy.easysign.repository;

import com.ssafy.easysign.model.Sign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface SignRepository extends JpaRepository<Sign,Long> {

}
