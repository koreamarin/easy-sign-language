package com.ssafy.easysign.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Data
@NoArgsConstructor
public class GameRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gameId;
    @ColumnDefault("0")
    private int currentUserCnt;
    private String inviteCode;
    private boolean isPublic;

}
