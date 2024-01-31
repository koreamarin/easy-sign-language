package com.ssafy.easysign.user.service;


import com.ssafy.easysign.user.dto.request.RegistRequest;

public interface AuthService {
    void registerUser(RegistRequest registRequest);
    boolean idCheck(String loginId);
    boolean nameCheck(String name);
}
