package com.ssafy.easysign.store.repository;


import com.ssafy.easysign.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {
    Optional<Store> findByItemId(Long itemId);

    List<Store> findAllByItemIdNotIn(List<Long> itemId);

    @Query("select s, (select count(l) from StoreLike l where l.user.userId = :userId) as isLike from Store s " +
            "where s.itemId not in :itemId")
    List<Store> findStoreItem(List<Long> itemId, Long userId);
}

