package com.ssafy.easysign.user.controller;
import com.ssafy.easysign.sign.entity.SignInfo;
import com.ssafy.easysign.user.exception.NotFoundException;
import com.ssafy.easysign.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user/progress")
@Slf4j
public class ProgressController {

    @Autowired
    private UserService userService;

    @PutMapping()
    public ResponseEntity<List<SignInfo>> getUserProgress(@RequestParam Long signId, Authentication authentication){
        try{
            List<SignInfo> signInfoList = userService.getUserProgress(signId, authentication);
            return ResponseEntity.ok(signInfoList); // 200 OK
        }catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
