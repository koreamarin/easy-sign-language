package com.ssafy.easysign.store.repository;

import com.ssafy.easysign.store.entity.Store;
import com.ssafy.easysign.store.entity.StoreLike;
import com.ssafy.easysign.user.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface StoreLikeRepository extends JpaRepository<StoreLike, Long> {
    StoreLike findByUserAndStore(User user, Store store);
    @Modifying
    @Transactional
    @Query("DELETE FROM StoreLike s WHERE s.user.userId = :userId")
    void deleteByUserId(Long userId);
}
