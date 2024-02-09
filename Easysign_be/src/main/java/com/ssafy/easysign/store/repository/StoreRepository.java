package com.ssafy.easysign.store.repository;


import com.ssafy.easysign.store.dto.response.ItemResponseInterface;
import com.ssafy.easysign.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Long> {

    Optional<Store> findByItemId(Long itemId);
    @Query(value = "select s.*, IF((select count(1) from store_like l where l.user_id = ?2 and l.item_id = s.item_id) , 'true', 'false') as isLike from store s " +
            "where s.item_id = ?1", nativeQuery = true)
    Optional<ItemResponseInterface> findItemDetail(Long itemId, Long userId);

    @Query(value = "select s.*, IF((select count(1) from store_like l where l.user_id = ?2 and l.item_id = s.item_id) , 'true', 'false') as isLike from store s " +
            "where s.item_id not in ?1", nativeQuery = true)
    List<ItemResponseInterface> findStoreItem(List<Long> itemId, Long userId);
}

