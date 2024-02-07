package com.ssafy.easysign.user.dto.request;

public record RegistRequest (
    String email,
    String loginId,
    String password,
    String name
) {}
