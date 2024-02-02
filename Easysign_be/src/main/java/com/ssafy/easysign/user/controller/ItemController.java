package com.ssafy.easysign.user.controller;

import com.ssafy.easysign.global.auth.PrincipalDetails;
import com.ssafy.easysign.store.dto.response.ItemResponse;
import com.ssafy.easysign.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            Long userId = userDetails.getUserId();
            List<ItemResponse> userItems = userService.getUserItems(userId);
            return ResponseEntity.ok(userItems);
        } catch (Exception e) {
            log.error("Error retrieving user items", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
