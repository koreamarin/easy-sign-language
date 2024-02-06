package com.ssafy.easysign.game.service;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.dto.response.SignResponse;
import com.ssafy.easysign.sign.entity.SignInfo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@Transactional
public class GameServiceImpl implements GameService  {

    @PersistenceContext
    private EntityManager entityManager;
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


    public SignResponse mapToSignResponses(SignInfo signInfo) {
        SignResponse signResponse = new SignResponse();
        signResponse.setSignId(signInfo.getSignId());
        signResponse.setContent(signInfo.getContent());
        signResponse.setImagePath(signInfo.getImagePath());
        signResponse.setVideoPath(signInfo.getVideoPath());
        return signResponse;
    }

}
