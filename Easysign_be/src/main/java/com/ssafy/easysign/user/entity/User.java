package com.ssafy.easysign.user.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.sql.Timestamp;

@Entity
@Data
@SQLDelete(sql="UPDATE user set deleted_at = NOW(), is_deleted = true where user_id = ?")
@SQLRestriction("is_deleted = false")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true, nullable = false)
    private String loginId;

    @Column(nullable = false)
    private String password;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(nullable = false)
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
    @Column(columnDefinition = "TINYINT(1)",  nullable = false)
    private boolean isDeleted;
    private Timestamp deletedAt;
}
