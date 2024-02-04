package com.ssafy.easysign.user.controller;

import com.ssafy.easysign.global.auth.PrincipalDetails;
import com.ssafy.easysign.store.dto.response.ItemResponse;
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
@RequestMapping("/api/v1/user/items")
public class ItemController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<ItemResponse>> getUserItems(Authentication authentication){
        try {
            PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
            log.info("apply, userDetails : " + userDetails);
            Long userId = userDetails.getUserId();
            log.info("userId : " + userId);
            List<ItemResponse> userItems = userService.getUserItems(userId);
            return ResponseEntity.ok(userItems);
        } catch (Exception e) {
            log.error("사용자 아이템을 검색하는 중 오류가 발생하였습니다.", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/apply-item")
    public ResponseEntity<String> updateItem(@RequestParam Long itemId, Authentication authentication) {
        try {
            PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
            Long userId = userDetails.getUserId();

            userService.updateItem(itemId, authentication);
            return ResponseEntity.ok("아이템 업데이트 성공");
        } catch (NotFoundException e) {
            log.error("아이템 업데이트 중 사용자나 아이템을 찾을 수 없습니다.", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("사용자나 아이템을 찾을 수 없습니다.");
        } catch (Exception e) {
            log.error("아이템 업데이트 중 오류가 발생하였습니다.", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("아이템 업데이트 중 오류가 발생하였습니다.");
        }
    }

}
