package com.ssafy.easysign.user.controller;

import com.ssafy.easysign.global.auth.PrincipalDetails;
import com.ssafy.easysign.user.dto.request.ProfileRequest;
import com.ssafy.easysign.user.dto.response.UserInfoResponse;
import com.ssafy.easysign.user.exception.NotFoundException;
import com.ssafy.easysign.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/info")
    public ResponseEntity<UserInfoResponse> getNavUserInfo(Authentication authentication) {
        try{
            log.info("/info 현재 접속 id : " + authentication.getName());
            PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
            UserInfoResponse response = userService.getNavUserInfo(authentication.getName(), userDetails.getUserId());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch(NotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(@RequestBody ProfileRequest profileRequest , Authentication authentication) {
        try{
            log.info("/profile " + authentication.getName() + "의 프로필 변경요청");
            PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
            userService.updateProfile(userDetails.getUserId(), profileRequest);
            return new ResponseEntity<>("프로필 업데이트 성공!", HttpStatus.OK);
        } catch(NotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
