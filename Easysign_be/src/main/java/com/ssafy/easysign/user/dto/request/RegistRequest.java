package com.ssafy.easysign.user.dto.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegistRequest  {
    private String email;
    private String loginId;
    private String password;
    private String name;
}
