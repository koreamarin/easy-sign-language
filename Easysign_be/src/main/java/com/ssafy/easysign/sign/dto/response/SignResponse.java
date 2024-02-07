package com.ssafy.easysign.sign.dto.response;

import com.ssafy.easysign.sign.entity.SignInfo;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

public record SignResponse (
    Long signId,
    String content,
    String imagePath,
    String videoPath
) {}
