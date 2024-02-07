package com.ssafy.easysign.sign.dto.response;

import com.ssafy.easysign.global.jpaEnum.Gubun;

public record SignResponse2 (
    Long signId,
    String content,
    String imagePath,
    String videoPath,
    Long categoryId,
    Gubun gubun
) {}
