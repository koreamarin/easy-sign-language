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
    private Long categoryId;
    @Enumerated(EnumType.STRING)
    private Gubun gubun;
    @Column(unique = true)
    private String content;
    private String imagePath;
    private String videoPath;
}
