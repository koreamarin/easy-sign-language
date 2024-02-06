package com.ssafy.easysign.store.controller;

import com.ssafy.easysign.store.dto.response.ItemResponse;
import com.ssafy.easysign.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/store")
@RequiredArgsConstructor
@Slf4j
public class StoreController {

    private final StoreService storeService;

    @GetMapping("/info")
    public ResponseEntity<List<ItemResponse>> getItemResponseList() {
        List<ItemResponse> itemResponses = storeService.getItemResponseList();
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
    public ResponseEntity<ItemResponse> getItemDetails(@RequestParam Long itemId) {
        Optional<ItemResponse> itemResponse = storeService.getItemDetails(itemId);
        if (itemResponse.isPresent()) {
            // 성공적으로 값을 찾았을 경우 200 OK와 함께 값을 반환
            return new ResponseEntity<>(itemResponse.get(), HttpStatus.OK);
        } else {
            // 값이 없는 경우 400 Bad Request 반환
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
