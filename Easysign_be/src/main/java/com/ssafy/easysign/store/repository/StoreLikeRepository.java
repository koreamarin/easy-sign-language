package com.ssafy.easysign.store.repository;

import com.ssafy.easysign.store.entity.Store;
import com.ssafy.easysign.store.entity.StoreLike;
import com.ssafy.easysign.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoreLikeRepository extends JpaRepository<StoreLike, Long> {
    StoreLike findByUserAndStore(User user, Store store);
}
