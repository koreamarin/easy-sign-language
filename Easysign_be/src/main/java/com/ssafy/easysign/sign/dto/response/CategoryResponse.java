package com.ssafy.easysign.sign.dto.response;

import com.ssafy.easysign.global.jpaEnum.Gubun;

public record CategoryResponse (
    Long categoryId,
    String categoryName,

    Gubun gubun,

    int addSticker

) {}
