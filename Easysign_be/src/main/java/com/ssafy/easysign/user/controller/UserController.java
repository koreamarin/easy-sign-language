package com.ssafy.easysign.user.controller;

import com.ssafy.easysign.user.dto.response.UserInfoResponse;
import com.ssafy.easysign.user.exception.NotFoundException;
import com.ssafy.easysign.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/info")
    public ResponseEntity<UserInfoResponse> getNavUserInfo(Authentication authentication) {
        try{
            log.info("현재 접속 id : " + authentication.getPrincipal());
            UserInfoResponse response = userService.getNavUserInfo(authentication.getName());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(NotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

}
