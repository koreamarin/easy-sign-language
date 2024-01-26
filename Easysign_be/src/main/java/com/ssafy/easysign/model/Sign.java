package com.ssafy.easysign.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Sign {

    @Id
    private Long singId;
    private Long categoryId;
    private String content;
    private String imagePath;
    private String videoPath;
}
