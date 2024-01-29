package com.ssafy.easysign.user.repository;

import com.ssafy.easysign.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByLoginId(String loginId);
}