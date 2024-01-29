package com.ssafy.easysign.user.dto.request;

import lombok.Data;

@Data
public class LoginRequest {

    private String id;
    private String password;
}
