package com.ssafy.easysign.user.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    @Column(unique = true)
    private String loginId;
    private String password;
    @Column(unique = true)
    private String name;
    private String email;
    @CreationTimestamp
    private Timestamp createDate;
    private String provider;
    private String providerId;
    @ColumnDefault("0")
    private int sticker;
    @ColumnDefault("0")
    private int wordCount;

    @ColumnDefault("false")
    @Column(columnDefinition = "TINYINT(1)")
    private boolean isDeleted;
    private Timestamp deletedAt;
}
