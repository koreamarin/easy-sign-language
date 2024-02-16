package com.ssafy.easysign.user.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
@Builder
@Entity
public class StickerLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Long logId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private int stickerCountBefore;

    @Column(nullable = false)
    private int stickerCountAfter;

    @Column(nullable = false)
    private Timestamp occurDate;
}
