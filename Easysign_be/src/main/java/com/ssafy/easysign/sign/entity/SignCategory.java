package com.ssafy.easysign.sign.entity;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class SignCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    private String categoryName;

    @Enumerated(EnumType.STRING)
    private Gubun gubun;
}
