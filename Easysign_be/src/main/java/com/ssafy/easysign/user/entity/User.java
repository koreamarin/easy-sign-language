package com.ssafy.easysign.user.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private String loginId;
    private String password;
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
    private boolean isDeleted;
    private Timestamp deletedAt;
}
