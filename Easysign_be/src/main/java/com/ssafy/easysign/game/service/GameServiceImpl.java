package com.ssafy.easysign.game.service;

import com.ssafy.easysign.global.auth.PrincipalDetails;
import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.dto.response.SignResponse;
import com.ssafy.easysign.sign.entity.SignInfo;
import com.ssafy.easysign.sign.repository.SignRepository;
import com.ssafy.easysign.user.entity.User;
import com.ssafy.easysign.user.entity.UserProgress;
import com.ssafy.easysign.user.repository.UserProgressRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private SignRepository signRepository;

    @Autowired
    private UserProgressRepository userProgressRepository;
    @Override
    public List<SignResponse> getSpeedGameList(Gubun gubun) {
        // 쿼리 문자열 초기화
        String queryString = "SELECT * FROM sign_info";

        // gubun이 null이 아닌 경우 WHERE 절 추가
        if (gubun != null) {
            queryString += " WHERE gubun = :gubun";
        }

        // 쿼리 마지막에 RAND() 함수와 리미트 추가
        queryString += " ORDER BY RAND() LIMIT :limit";

        // 네이티브 쿼리 실행
        List<SignInfo> signInfos = entityManager.createNativeQuery(queryString, SignInfo.class)
                .setParameter("limit", 20) // 리미트 설정
                .setParameter("gubun", gubun != null ? gubun.toString() : null) // gubun이 null이 아닐 때 문자열로 변환하여 전달
                .getResultList();

        // 결과 매핑
        List<SignResponse> signResponses = new ArrayList<>();
        for (SignInfo signInfo : signInfos) {
            signResponses.add(mapToSignResponses(signInfo));
        }
        return signResponses;
    }

    @Override
    public List<SignResponse> getSonagiGameList(Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        User user = principalDetails.getUser();
        Long userId = user.getUserId();

        // 사용자의 진행 정보 가져오기
        List<UserProgress> userProgresses = userProgressRepository.findByUser_userId(userId);

        List<SignResponse> signResponses = new ArrayList<>();
        // 진행 정보를 기반으로 해당 기호들을 가져옴
        for (UserProgress userProgress : userProgresses) {
            SignInfo signInfo = userProgress.getSignInfo(); // 진행 정보에서 기호 가져오기
            if (signInfo != null) {
                SignResponse signResponse = mapToSignResponse(signInfo);
                signResponses.add(signResponse);
            }
        }
        // 랜덤하게 10개의 기호 선택
        Collections.shuffle(signResponses);
        int numberOfSignsToReturn = Math.min(signResponses.size(), 10);
        return signResponses.subList(0, numberOfSignsToReturn);
    }


    private SignResponse mapToSignResponse(SignInfo signInfo) {
        SignResponse signResponse = new SignResponse();
        signResponse.setSignId(signInfo.getSignId());
        signResponse.setContent(signInfo.getContent());
        signResponse.setImagePath(signInfo.getImagePath());
        signResponse.setVideoPath(signInfo.getVideoPath());
        return signResponse;
    }


    public SignResponse mapToSignResponses(SignInfo signInfo) {
        SignResponse signResponse = new SignResponse();
        signResponse.setSignId(signInfo.getSignId());
        signResponse.setContent(signInfo.getContent());
        signResponse.setImagePath(signInfo.getImagePath());
        signResponse.setVideoPath(signInfo.getVideoPath());
        return signResponse;
    }

}
