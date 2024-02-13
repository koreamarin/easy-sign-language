package com.ssafy.easysign.user.repository;

import com.ssafy.easysign.user.entity.UserProgress;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    List<UserProgress> findAllByUser_userId(Long userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM UserProgress u WHERE u.user.userId = :userId")
    void deleteByUserId(Long userId);

}
