package com.ssafy.easysign.user.controller;

import com.ssafy.easysign.global.auth.PrincipalDetails;
import com.ssafy.easysign.user.dto.response.UserInfoResponse;
import com.ssafy.easysign.user.exception.NotFoundException;
import com.ssafy.easysign.user.service.UserService;
import jakarta.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/v1/user/sticker")
public class StickerController {
    @Autowired
    private UserService userService;
    private final EntityManager entityManager;

    public StickerController(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @GetMapping
    public ResponseEntity<Integer> getSticker(Authentication authentication) {
        try {
            log.info("/user " + authentication.getName() + "의 스티커 개수 조회요청");
            PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
            UserInfoResponse user = userService.getNavUserInfo(userDetails.getUser().getLoginId(), userDetails.getUserId());
            return new ResponseEntity<>(user.sticker(), HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // 실패 시 400 Bad Request 응답
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping
    public ResponseEntity<Void> updateStickerCountAfter(@RequestParam int count, Authentication authentication) {
        Long userId = null;
        try {
            // PrincipalDetails에서 사용자 정보 가져오기
            PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();

            // userDetails에서 사용자 ID 가져오기
            userId = userDetails.getUserId();

            // UserService를 통해 스티커 카운트 업데이트
            userService.updateStickerCountAfter(userId, count);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            // 예외 처리가 필요한 경우
            log.error("스티커 카운트 업데이트 실패. userId: {}, count: {}", userId, count, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

