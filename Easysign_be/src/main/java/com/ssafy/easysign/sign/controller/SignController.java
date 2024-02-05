package com.ssafy.easysign.sign.controller;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.entity.SignCategory;
import com.ssafy.easysign.sign.entity.SignInfo;
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
    public ResponseEntity<List<SignCategory>> getCategoryResponseList() {
        List<SignCategory> signCategories = signService.getCategoryList();
        log.info("categoryResponses : " + signCategories);
        return new ResponseEntity<>(signCategories, HttpStatus.OK);

    }
    @GetMapping("/jihwa")
    public ResponseEntity<List<SignInfo>> getSignResponseListJihwa(
            @RequestParam(value = "categoryname", required = false) String categoryName) {
        return getSignResponseList(Gubun.jihwa, categoryName);
    }

    @GetMapping("/word")
    public ResponseEntity<List<SignInfo>> getSignResponseListWord(
            @RequestParam(value = "categoryname", required = false) String categoryName) {
        return getSignResponseList(Gubun.word, categoryName);
    }

    @GetMapping("/sentence")
    public ResponseEntity<List<SignInfo>> getSignResponseListSentence(
            @RequestParam(value = "categoryname", required = false) String categoryName) {
        return getSignResponseList(Gubun.sentence, categoryName);
    }

    private ResponseEntity<List<SignInfo>> getSignResponseList(Gubun gubun, String categoryName) {
        if (categoryName != null) {
            try {
                List<SignInfo> signResponses = signService.getSignResponseList(categoryName, gubun);
                log.info("signResponses : " + signResponses);
                return new ResponseEntity<>(signResponses, HttpStatus.OK);
            } catch (Exception e) {
                // 실패 시 400 Bad Request 반환
                log.error("Error retrieving sign responses: " + e.getMessage());
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            // 실패 시 403 Forbidden 반환
            log.info("gubun : " + gubun + ", categoryId: " + categoryName);
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

}
