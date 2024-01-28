package com.ssafy.easysign.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String email;
    private String password;
    private String name;
    @CreationTimestamp
    private Timestamp createDate;
    private String provider;
    private String providerId;
    private int sticker;
    private int wordCount;
    private boolean isDeleted;
    @Column(name = "deleted_at")
    private Timestamp deletedAt;
}
