package com.ssafy.easysign.sign.controller;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.dto.response.CategoryResponse;
import com.ssafy.easysign.sign.dto.response.SignResponse;
import com.ssafy.easysign.sign.service.SignService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/sign")
@RequiredArgsConstructor
@Slf4j
public class SignController {

    private final SignService signService;

    @GetMapping("/category")
    public ResponseEntity<List<CategoryResponse>> getCategoryResponseList(@RequestParam(value = "Gubun", required = false) Gubun gubun) {
        if(gubun != null){
            List<CategoryResponse> categoryResponses = signService.getCategoryResponseList(gubun);
            log.info("categoryResponses : " + categoryResponses);
            return new ResponseEntity<>(categoryResponses, HttpStatus.OK);
        }
        else {
            // 실패 시 403 Forbidden 반환
            log.info("gubun : " + gubun);
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }
    @GetMapping("/jihwa")
    public ResponseEntity<List<SignResponse>> getSignResponseList(
            @RequestParam(value = "Gubun", required = false) Gubun gubun,
            @RequestParam(value = "categoryId", required = false) Long categoryId) {
        if (gubun != null && categoryId != null) {
            try {
                List<SignResponse> signResponses = signService.getSignResponseList(categoryId, gubun);
                log.info("signResponses : " + signResponses);
                return new ResponseEntity<>(signResponses, HttpStatus.OK);
            } catch (Exception e) {
                // 실패 시 400 Bad Request 반환
                log.error("Error retrieving sign responses: " + e.getMessage());
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            // 실패 시 403 Forbidden 반환
            log.info("gubun : " + gubun + ", categoryId: " + categoryId);
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }


}
