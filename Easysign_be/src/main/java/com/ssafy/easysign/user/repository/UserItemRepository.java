package com.ssafy.easysign.user.repository;

import com.ssafy.easysign.user.entity.UserItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserItemRepository extends JpaRepository<UserItem, Long> {
    Optional<List<UserItem>> findByUser_UserIdAndIsUse(Long userId, boolean isUse);

}