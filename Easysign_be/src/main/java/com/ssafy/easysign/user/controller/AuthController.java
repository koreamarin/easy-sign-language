package com.ssafy.easysign.user.controller;

import com.ssafy.easysign.user.dto.request.RegistRequest;
import com.ssafy.easysign.user.entity.User;
import com.ssafy.easysign.user.service.AuthService;
import com.ssafy.easysign.user.service.UserService;
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

    @Autowired
    private UserService userService;

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

            User user = userService.getUser(registRequest.getLoginId());
            //기본 이미지, 배경 등록
            userService.registProfile(user.getUserId(), 1L);
            userService.registProfile(user.getUserId(), 2L);

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

    @GetMapping("/id")
    public ResponseEntity<String> findId(@RequestParam String email) {
        try {
            log.info("Controller email : " + email);
            String loginId = authService.findId(email);
            if (loginId != null) {
                // 사용자가 존재하면 200 OK 응답
                return new ResponseEntity<>(loginId, HttpStatus.OK);
            } else {
                // 사용자가 존재하지 않으면 400 Bad Request 응답
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            // 예외 발생 시 400 Bad Request 응답
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
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
