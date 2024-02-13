package com.ssafy.easysign.game.service;

import com.ssafy.easysign.global.auth.PrincipalDetails;
import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.dto.response.SignResponse;
import com.ssafy.easysign.sign.entity.SignInfo;
import com.ssafy.easysign.sign.mapper.SignMapper;
import com.ssafy.easysign.sign.repository.SignRepository;
import com.ssafy.easysign.user.entity.User;
import com.ssafy.easysign.user.entity.UserProgress;
import com.ssafy.easysign.user.repository.UserProgressRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Slf4j
@Transactional
public class GameServiceImpl implements GameService  {

    @Autowired
    private SignRepository signRepository;

    @Autowired
    private UserProgressRepository userProgressRepository;

    @Autowired
    private SignMapper signMapper;

    @Override
    public List<SignResponse> getSpeedGameList(Gubun gubun) {
        List<SignResponse> signResponses = signRepository.findAllByGubun(gubun).stream()
                .map(signMapper::toSignResponse)
                .toList();
//        List<SignResponse> signResponses = signInfos.stream()
//                .map(SignResponse::of)
//                .toList();
        // 랜덤하게 20개의 수화 선택, 불변 리스트이기 때문에 없애주기 위해서 리스트를 하나 더 선언해서 섞어준다.
        List<SignResponse> mutableSignResponses = new ArrayList<>(signResponses);
        Collections.shuffle(mutableSignResponses);
        int numberOfSignsToReturn = Math.min(mutableSignResponses.size(), 20);
        return mutableSignResponses.subList(0, numberOfSignsToReturn);
    }

    @Override
    public List<SignResponse> getSonagiGameList(Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        User user = principalDetails.getUser();
        Long userId = user.getUserId();

        // 사용자의 진행 정보 가져오기
        List<UserProgress> userProgresses = userProgressRepository.findAllByUser_userId(userId);
        log.info("userProgresses : " + userProgresses);

        List<SignInfo> signInfos = new ArrayList<>();

        // 진행 정보를 기반으로 해당 수화들을 가져옴
        for (UserProgress userProgress : userProgresses) {
            SignInfo signInfo = userProgress.getSignInfo(); // 진행 정보에서 수화 가져오기
            if (signInfo != null) {
                Long signId = signInfo.getSignId();
                // 32부터 41번 사이의 sign_id는 추가하지 않음
                if (signId < 32 || signId > 41) {
                    signInfos.add(signInfo);
                }
            }
        }


        log.info("signInfos : " + signInfos);

        List<SignResponse> signResponses = new ArrayList<>(signInfos.stream()
//                .map(SignResponse::of)
                .map(signMapper::toSignResponse)
                .toList());

        log.info("signResponses :" + signResponses);

        // 랜덤하게 10개의 수화 선택
        Collections.shuffle(signResponses);
        int numberOfSignsToReturn = Math.min(signResponses.size(), 10);
        return signResponses.subList(0, numberOfSignsToReturn);
    }
}
