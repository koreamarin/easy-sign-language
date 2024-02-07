package com.ssafy.easysign.sign.dto.response;

import com.ssafy.easysign.sign.entity.SignInfo;
import lombok.*;

@Data
@NoArgsConstructor
@Builder
@Getter
@AllArgsConstructor

public class SignResponse {
    private Long signId;
    private String content;
    private String imagePath;
    private String videoPath;

    public static SignResponse of (SignInfo signInfo){
        return  SignResponse.builder()
        .signId(signInfo.getSignId())
        .content(signInfo.getContent())
        .imagePath(signInfo.getImagePath())
        .videoPath(signInfo.getVideoPath())
        .build();
    }
}
