package com.ssafy.easysign.game.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Data
public class GameRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gameId;
    @ColumnDefault("0")
    private int currentUserCnt;
    private String inviteCode;
    @Column(columnDefinition = "TINYINT(1)")
    private boolean isPublic;

}
