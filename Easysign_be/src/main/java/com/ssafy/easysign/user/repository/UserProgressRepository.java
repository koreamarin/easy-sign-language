package com.ssafy.easysign.user.repository;

import com.ssafy.easysign.user.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
}
