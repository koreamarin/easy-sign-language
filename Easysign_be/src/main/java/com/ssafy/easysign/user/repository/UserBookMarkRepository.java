package com.ssafy.easysign.user.repository;

import com.ssafy.easysign.user.entity.BookMark;
import com.ssafy.easysign.user.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserBookMarkRepository extends JpaRepository<BookMark, Long> {
    List<BookMark> findAllByUser(User user);
    Optional<BookMark> findByUser_userIdAndSignInfo_signId(Long userId, Long signId);
    void deleteByUser_userIdAndSignInfo_signId(Long userId, Long signId);

    @Modifying
    @Transactional
    @Query("DELETE FROM BookMark b WHERE b.user.userId = :userId")
    void deleteByUserId(Long userId);
}

