package com.ssafy.easysign.user.repository;

import com.ssafy.easysign.user.entity.User;
import com.ssafy.easysign.user.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    List<UserProgress> findUserProgressByUser(User user);
}
