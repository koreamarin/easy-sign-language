package com.ssafy.easysign.user.controller;

import com.ssafy.easysign.user.exception.NotFoundException;
import com.ssafy.easysign.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user/progress")
@Slf4j
public class ProgressController {

    @Autowired
    private UserService userService;

    @PutMapping
    public ResponseEntity<Void> saveUserProgress(@RequestParam Long signId, Authentication authentication){
        try{
            userService.saveUserProgress(signId, authentication);
            return new ResponseEntity<>(HttpStatus.OK); // 200 OK
        }catch (NotFoundException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
