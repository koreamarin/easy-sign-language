package com.ssafy.easysign.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
public class User {
    @Id
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
