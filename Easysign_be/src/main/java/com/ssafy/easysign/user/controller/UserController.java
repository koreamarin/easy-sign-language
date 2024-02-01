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

    /**
     * 유저 표시 정보들 가져오기
     * @param authentication
     * @return UserInfoResponse(닉네임, 스티커, 캐릭터 이미지경로, 배경 이미지 경로)
     */
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

    /**
     * 프로필 정보(캐릭터, 배경) 변경
     * @param profileRequest(바꿀 배경, 캐릭터 id)
     * @param authentication
     */
    @PutMapping("/profile")
    public ResponseEntity<String> updateProfile(@RequestBody ProfileRequest profileRequest , Authentication authentication) {
        try{
            log.info("/profile " + authentication.getName() + "의 프로필 변경요청");
            PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
            userService.updateProfile(userDetails.getUserId(), profileRequest);
            return new ResponseEntity<>("프로필 업데이트가 완료되었습니다!", HttpStatus.OK);
        } catch(NotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * 닉네임 변경
     * @param name
     * @param authentication
     */
    @PutMapping("/name")
    public ResponseEntity<String> updateName(@RequestParam String name, Authentication authentication) {
        try{
            log.info("/name " + authentication.getName() + "의 닉네임 변경요청 ");
            PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
            userService.updateName(userDetails.getUserId(), name);
            return new ResponseEntity<>("닉네임 변경이 완료되었습니다!", HttpStatus.OK);
        } catch(NotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/password")
    public ResponseEntity<String> updatePassword(@RequestParam String password, Authentication authentication) {
        try{
            log.info("/name " + authentication.getName() + "의 비밀번호 변경요청 ");
            PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
            userService.updatePassword(userDetails.getUserId(), password);
            return new ResponseEntity<>("비밀번호 변경이 완료되었습니다!", HttpStatus.OK);
        } catch(NotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
