package com.ssafy.easysign.game.service;

import com.ssafy.easysign.sign.dto.response.SignResponse;

import java.util.List;

public interface GameService {
    List<SignResponse>  getGameList();
}
