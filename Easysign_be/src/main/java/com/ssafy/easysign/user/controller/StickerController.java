package com.ssafy.easysign.user.controller;

import com.ssafy.easysign.global.auth.PrincipalDetails;
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
@RequestMapping("/api/v1/user/sticker")
public class StickerController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<Integer> getSticker(Authentication authentication) {
        try{
            log.info("/user " + authentication.getName() + "의 스티커 개수 조회요청");
            PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
            UserInfoResponse user = userService.getNavUserInfo(userDetails.getUser().getLoginId(), userDetails.getUserId());
            return new ResponseEntity<>(user.getSticker(), HttpStatus.OK);
        } catch(NotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // 실패 시 400 Bad Request 응답
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}
