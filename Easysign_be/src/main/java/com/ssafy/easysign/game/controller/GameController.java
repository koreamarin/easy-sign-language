package com.ssafy.easysign.game.controller;


import com.ssafy.easysign.game.service.GameService;
import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.dto.response.SignResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
    public ResponseEntity<List<SignResponse>> getSpeedGameList() {
        try {
            // 직접 설정한 값을 넘겨줍니다. 여기서는 예시로 Gubun.jihwa를 전달합니다.
            List<SignResponse> signResponses = gameService.getSpeedGameList(Gubun.jihwa);
            log.info("signResponses: " + signResponses);
            return new ResponseEntity<>(signResponses, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("sonagi-game")
    public ResponseEntity<List<SignResponse>> getSonagiGameList(Authentication authentication){
        try{
        List<SignResponse> signResponses = gameService.getSonagiGameList(authentication);
            return new ResponseEntity<>(signResponses, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
