package com.ssafy.easysign.user.repository;

import com.ssafy.easysign.user.entity.BookMark;
import com.ssafy.easysign.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserBookMarkRepository extends JpaRepository<BookMark, Long> {
    List<BookMark> findBookMarksByUser(User user);
    Optional<BookMark> findByUser_userIdAndSignInfo_signId(Long userId, Long signId);
    Optional<BookMark> deleteByUser_userIdAndSignInfo_signId(Long userId, Long signId);
}

