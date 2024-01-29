package com.ssafy.easysign.user.service;


import com.ssafy.easysign.user.dto.request.RegistRequest;

public interface UserService {
    void registerUser(RegistRequest registRequest);
}
