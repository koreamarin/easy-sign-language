package com.ssafy.easysign.game.service;

import com.ssafy.easysign.sign.dto.response.SignResponse;
import com.ssafy.easysign.sign.entity.SignInfo;
import com.ssafy.easysign.sign.repository.SignRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class GameServiceImpl implements GameService  {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private final SignRepository signRepository;

    public GameServiceImpl(SignRepository signRepository) {
        this.signRepository = signRepository;
    }

    @Override
    public List<SignResponse> getGameList() {
        List<SignResponse> signResponses = em.createQuery("SELECT s FROM SignInfo s ORDER BY RAND()", SignInfo.class)
                .setMaxResults(20)
                .getResultList()
                .stream().map(this::mapToSignResponses)
                .collect(Collectors.toList());
        log.info("Sign signResponses : {}", signResponses);
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
