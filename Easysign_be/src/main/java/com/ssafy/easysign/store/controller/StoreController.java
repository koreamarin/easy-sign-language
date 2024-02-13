package com.ssafy.easysign.store.controller;

import com.ssafy.easysign.global.auth.PrincipalDetails;
import com.ssafy.easysign.store.dto.response.ItemResponse;
import com.ssafy.easysign.store.entity.StoreLike;
import com.ssafy.easysign.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/store")
@RequiredArgsConstructor
@Slf4j
public class StoreController {

    private final StoreService storeService;

    @GetMapping("/info")
    public ResponseEntity<List<ItemResponse>> getItemResponseList(Authentication authentication) {
        PrincipalDetails user = (PrincipalDetails) authentication.getPrincipal();
        List<ItemResponse> itemResponses = storeService.getItemResponseList(user.getUserId());
        log.info("itemResponses : " + itemResponses);
        if(itemResponses != null){
            return new ResponseEntity<>(itemResponses, HttpStatus.OK);
        }
        else{
            // 실패 시 403 Forbidden 반환
            log.info("itemResponses : " + itemResponses);
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }
    @GetMapping("/infoDetail")
    public ResponseEntity<ItemResponse> getItemDetails(@RequestParam Long itemId, Authentication authentication) {
        PrincipalDetails user = (PrincipalDetails) authentication.getPrincipal();
        ItemResponse itemResponse = storeService.getItemDetails(itemId, user.getUserId());
        // 성공적으로 값을 찾았을 경우 200 OK와 함께 값을 반환
        // 값이 없는 경우 400 Bad Request 반환
        if(itemResponse == null)  return new ResponseEntity<>(itemResponse, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(itemResponse, HttpStatus.OK);
    }

    @GetMapping("/buyItem")
    public ResponseEntity<Boolean> buyItem(@RequestParam Long itemId, Authentication authentication) {
        try {
            Boolean buyCheck = storeService.buyItem(itemId, authentication);
            // buyItem 메서드에서 예외 발생 시
            return ResponseEntity.ok().body(buyCheck);
        } catch (Exception e) {
            // 기타 예외 상황에 대한 처리
            return ResponseEntity.badRequest().body(false);
        }
    }

    @PostMapping("likeItem")
    public ResponseEntity<Void> postLikeItem(@RequestParam Long itemId, Authentication authentication) {
        try {
            storeService.postLikeItem(itemId, authentication);
            return ResponseEntity.ok().build(); // 성공 시 200 반환
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 예외 발생 시 403 반환
        }
    }
    @DeleteMapping("likeItem")
    public ResponseEntity<Void> deleteLikeItem(@RequestParam Long itemId, Authentication authentication) {
        try {
            storeService.deleteLikeItem(itemId, authentication);
            return ResponseEntity.ok().build(); // 성공 시 200 반환
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // 예외 발생 시 403 반환
        }
    }

}
