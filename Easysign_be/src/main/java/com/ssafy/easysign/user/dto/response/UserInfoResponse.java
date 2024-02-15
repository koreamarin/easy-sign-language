package com.ssafy.easysign.user.dto.response;

public record UserInfoResponse (
    String name,
    int sticker,
    String profileCharacterPath,
    String profileBackgroundPath
) {
}
