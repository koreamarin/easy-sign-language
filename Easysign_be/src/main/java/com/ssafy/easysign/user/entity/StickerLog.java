package com.ssafy.easysign.user.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Entity
public class StickerLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_id")
    private Long logId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;

    @Column(nullable = false)
    private int stickerCountBefore;

    @Column(nullable = false)
    private int stickerCountAfter;

    @Column(nullable = false)
    private Timestamp occurDate;
}
