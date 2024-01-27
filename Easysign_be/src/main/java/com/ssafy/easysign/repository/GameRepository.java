package com.ssafy.easysign.repository;

import com.ssafy.easysign.model.GameRoom;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GameRepository extends JpaRepository<GameRoom, Long> {

}
