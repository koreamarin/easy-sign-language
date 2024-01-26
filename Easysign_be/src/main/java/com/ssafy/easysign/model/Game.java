package com.ssafy.easysign.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Game {
    @Id
    private Long gameId;
    private int currentUser;
    private String inviteCode;
    private boolean isPublic;

}
