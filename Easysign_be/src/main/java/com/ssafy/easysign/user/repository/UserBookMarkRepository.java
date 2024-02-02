package com.ssafy.easysign.user.repository;

import com.ssafy.easysign.user.entity.BookMark;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserBookMarkRepository extends JpaRepository<BookMark, Long> {
}
