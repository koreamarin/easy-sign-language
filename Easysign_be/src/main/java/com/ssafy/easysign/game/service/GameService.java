package com.ssafy.easysign.game.service;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.dto.response.SignResponse;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface GameService {
    List<SignResponse> getSpeedGameList(Gubun gubun);

    List<SignResponse> getSonagiGameList(Authentication authentication);
}
