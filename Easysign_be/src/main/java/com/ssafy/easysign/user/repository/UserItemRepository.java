package com.ssafy.easysign.user.repository;

import com.ssafy.easysign.user.entity.UserItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserItemRepository extends JpaRepository<UserItem, Long> {
    Optional<List<UserItem>> findByUser_UserId(Long userId);
    Optional<List<UserItem>> findByUser_UserIdAndIsUse(Long userId, boolean isUse);
    Optional<List<UserItem>> findByUser_UserIdAndItem_ItemId(Long userId,Long itemId);

    @Modifying
    @Transactional
    @Query("DELETE FROM UserItem u WHERE u.user.userId = :userId")
    void deleteByUserId(Long userId);
}