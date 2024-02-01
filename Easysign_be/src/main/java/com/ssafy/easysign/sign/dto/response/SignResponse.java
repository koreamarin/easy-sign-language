package com.ssafy.easysign.sign.dto.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignResponse {
    private Long signId;
    private String content;
    private String imagePath;
    private String videoPath;
}
