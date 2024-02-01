package com.ssafy.easysign.sign.entity;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class SignInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long signId;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private SignCategory category;

    @Column(name = "category_id", insertable = false, updatable = false)
    private Long categoryId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gubun gubun;

    @Column(unique = true)
    private String content;

    @Column(nullable = false)
    private String imagePath;
    private String videoPath;

    public Long getCategoryId() {
        return this.category.getCategoryId();
    }
}
