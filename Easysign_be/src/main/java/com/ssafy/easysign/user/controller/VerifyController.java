package com.ssafy.easysign.user.controller;


import com.ssafy.easysign.user.entity.User;
import com.ssafy.easysign.user.exception.NotFoundException;
import com.ssafy.easysign.user.service.UserService;
import com.ssafy.easysign.user.service.VerifyEmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/verify")
public class VerifyController {
    private final VerifyEmailService verifyEmailService;
    private final UserService userService;

    // 비밀번호 재설정 이메일 전송
    @GetMapping
    public ResponseEntity<Boolean> verify(@RequestParam String email) throws NotFoundException {
        User user = userService.getUserByEmail(email);
        if(user!=null) {
            verifyEmailService.sendVerificationMail(user.getEmail());
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        else return new ResponseEntity<>(false,HttpStatus.NO_CONTENT);
    }

    // 인증링크 확인
    @GetMapping("/{key}")
    public ResponseEntity<Boolean> getVerify(@PathVariable String key) throws NotFoundException {
        try {
            verifyEmailService.verifyEmail(key);
            URI redirectUri = new URI("https://easysign.shop/password");
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.setLocation(redirectUri);
            return new ResponseEntity<>(true, httpHeaders, HttpStatus.SEE_OTHER);
        }
        catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }
}
