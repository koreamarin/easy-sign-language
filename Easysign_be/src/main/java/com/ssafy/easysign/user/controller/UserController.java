package com.ssafy.easysign.user.controller;

import com.ssafy.easysign.user.dto.request.RegistRequest;
import com.ssafy.easysign.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/regist")
    public ResponseEntity<String> registerUser(@RequestBody RegistRequest registRequest){
        try {
            // 사용자 등록 서비스 호출
            userService.registerUser(registRequest);
            // 성공 시 200 OK 응답
            log.info("request : " + registRequest);
            return new ResponseEntity<>("User registered successfully!", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            // 실패 시 400 Bad Request 응답
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
