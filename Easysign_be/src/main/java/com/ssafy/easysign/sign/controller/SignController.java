package com.ssafy.easysign.sign.controller;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.dto.response.CategoryResponse;
import com.ssafy.easysign.sign.service.SignService;
import com.ssafy.easysign.user.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequestMapping("/api/v1/sign")
public class SignController {

    @Autowired
    private SignService signService;

    @GetMapping("/category")
    public ResponseEntity<List<CategoryResponse>> getCategoryResponseList(Long categoryId) {
        try{
            log.info("/category !");
            List<CategoryResponse> response = signService.getCategoryResponseList(categoryId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (NotFoundException e){
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
