package com.ssafy.easysign.game.controller;


import com.ssafy.easysign.game.service.GameService;
import com.ssafy.easysign.sign.dto.response.SignResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/game")
@RequiredArgsConstructor
@Slf4j
public class GameController {
    private final GameService gameService;

    @GetMapping("/speed-game")
    public ResponseEntity<List<SignResponse>> getGameList(){
        try {
            List<SignResponse> signResponses = gameService.getGameList();
            log.info("signResponses : " + signResponses);
            return new ResponseEntity<>(signResponses, HttpStatus.OK);
        } catch (Exception e) {
            // 실패 시 400 Bad Request 반환
            log.error("Error retrieving sign responses: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
