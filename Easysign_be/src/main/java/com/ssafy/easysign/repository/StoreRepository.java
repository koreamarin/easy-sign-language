package com.ssafy.easysign.repository;

import com.ssafy.easysign.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface StoreRepository extends JpaRepository<Store, Long> {

}

