package com.ssafy.easysign.store.repository;

import com.ssafy.easysign.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findByItemId(Long itemId);

}

