package com.ssafy.easysign.user.repository;

import com.ssafy.easysign.sign.entity.SignInfo;
import com.ssafy.easysign.user.entity.UserProgress;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    @Query("SELECT s from UserProgress u, SignInfo s " +
            "where u.signInfo.signId = s.signId " +
            "and s.categoryId != 3" +
            "and u.user.userId = :userId")
    List<SignInfo> getSignProgress(Long userId);

    @Query("SELECT count(1) from UserProgress u, SignInfo s " +
            "where u.signInfo.signId = s.signId " +
            "and s.categoryId != 3" +
            "and u.user.userId = :userId")
    int getProgressCount(Long userId);


    @Modifying
    @Transactional
    @Query("DELETE FROM UserProgress u WHERE u.user.userId = :userId")
    void deleteByUserId(Long userId);

}
