package com.ssafy.easysign.service.UserService;


import com.ssafy.easysign.model.request.RegistRequest;
import org.springframework.stereotype.Service;

public interface UserService {
    void registerUser(RegistRequest registRequest);
}
