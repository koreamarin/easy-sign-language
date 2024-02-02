package com.ssafy.easysign.sign.dto.response;

import com.ssafy.easysign.sign.entity.SignInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor

public class SignResponse {
    private Long signId;
    private String content;
    private String imagePath;
    private String videoPath;

    public static SignResponse fromSignInfo (SignInfo signInfo){
        return  SignResponse.builder()
        .signId(signInfo.getSignId())
        .content(signInfo.getContent())
        .imagePath(signInfo.getImagePath())
        .videoPath(signInfo.getVideoPath())
        .build();
    }

}
