package com.ssafy.easysign.user.controller;

import com.ssafy.easysign.user.dto.request.RegistRequest;
import com.ssafy.easysign.user.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    /**
     * 회원가입
     * @param registRequest
     * @return
     */
    @PostMapping("/regist")
    public ResponseEntity<String> registerUser(@RequestBody RegistRequest registRequest){
        try {
            // 사용자 등록 서비스 호출
            authService.registerUser(registRequest);
            // 성공 시 200 OK 응답
            log.info("request : " + registRequest);
            return new ResponseEntity<>("회원가입이 완료되었습니다.", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            // 실패 시 400 Bad Request 응답
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 아이디 중복체크
     * @param loginId
     * @return true : 사용가능 / false : 사용불가능
     */
    @GetMapping("/idCheck")
    public ResponseEntity<Boolean> idCheck(@RequestParam String loginId) {
        try {
            log.info("Controller id check : " + loginId);
            return new ResponseEntity<>(authService.idCheck(loginId), HttpStatus.OK);
        } catch (Exception e) {
            // 실패 시 400 Bad Request 응답
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 닉네임 중복체크
     * @param name
     * @return true : 사용가능 / false : 사용불가능
     */
    @GetMapping("/nameCheck")
    public ResponseEntity<Boolean> nameCheck(@RequestParam String name) {
        try {
            log.info("Controller name check : " + name);
            return new ResponseEntity<>(authService.nameCheck(name), HttpStatus.OK);
        } catch (Exception e) {
            // 실패 시 400 Bad Request 응답
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }
}
