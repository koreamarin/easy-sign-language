package com.ssafy.easysign.user.controller;

import com.ssafy.easysign.global.auth.PrincipalDetails;
import com.ssafy.easysign.sign.dto.response.SignResponse;
import com.ssafy.easysign.user.exception.NotFoundException;
import com.ssafy.easysign.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/vi/user/bookmark")
public class BookMarkController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<SignResponse>> getBookMark(Authentication authentication) {
        try {
            List<SignResponse> signs = userService.getSigns(authentication);
            return ResponseEntity.ok(signs); // 200 OK
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build(); // 400 Bad Request
        }
    }

    @PostMapping
    public ResponseEntity<Integer> addBookMark(@RequestParam Long signId, Authentication authentication){
        PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
        Long userId = userDetails.getUserId();
        userService.registBookMark(userId, signId);
        return ResponseEntity.ok().build(); // 200 OK
    }
}
