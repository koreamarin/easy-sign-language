package com.ssafy.easysign.sign.dto.response;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.entity.SignInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor

public class SignResponse2 {
    private Long signId;
    private String content;
    private String imagePath;
    private String videoPath;
    private Long categoryId;
    private Gubun gubun;
    public static SignResponse2 fromSignInfo (SignInfo signInfo){
        return  SignResponse2.builder()
        .signId(signInfo.getSignId())
        .content(signInfo.getContent())
        .imagePath(signInfo.getImagePath())
        .videoPath(signInfo.getVideoPath())
        .categoryId(signInfo.getCategoryId())
        .gubun(signInfo.getGubun())
        .build();
    }

}
