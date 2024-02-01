package com.ssafy.easysign.sign.controller;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.dto.response.CategoryResponse;
import com.ssafy.easysign.sign.service.SignService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
