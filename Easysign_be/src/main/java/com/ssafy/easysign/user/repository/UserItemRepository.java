package com.ssafy.easysign.user.repository;

import com.ssafy.easysign.user.entity.UserItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserItemRepository extends JpaRepository<UserItem, Long> {
    List<UserItem> findAllByUser_UserId(Long userId);
    List<UserItem> findAllByUser_UserIdAndIsUse(Long userId, boolean isUse);
    Optional<UserItem> findByUser_UserIdAndItem_ItemId(Long userId, Long itemId);
    @Query("select i from UserItem i, Store s \n" +
            "where i.item.itemId = s.itemId \n" +
            "and i.isUse=true \n" +
            "and s.categoryName=(select categoryName from Store where itemId = :itemId)\n" +
            "and i.user.userId = :userId")
    Optional<UserItem> findPriorItem(Long userId, Long itemId);
    @Modifying
    @Transactional
    @Query("DELETE FROM UserItem u WHERE u.user.userId = :userId")
    void deleteByUserId(Long userId);
}