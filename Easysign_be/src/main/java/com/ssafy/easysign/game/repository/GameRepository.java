package com.ssafy.easysign.game.repository;

import com.ssafy.easysign.game.entity.GameRoom;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GameRepository extends JpaRepository<GameRoom, Long> {

}
