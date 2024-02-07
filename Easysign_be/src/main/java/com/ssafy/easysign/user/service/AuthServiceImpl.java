package com.ssafy.easysign.user.service;

import com.ssafy.easysign.user.dto.request.RegistRequest;
import com.ssafy.easysign.user.entity.User;
import com.ssafy.easysign.user.mapper.UserMapper;
import com.ssafy.easysign.user.repository.AuthRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final AuthRepository authRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserMapper userMapper;

    @Override
    public void registerUser(RegistRequest registRequest) {
        // 유효성 검사 및 사용자 등록 로직 구현
        if (registRequest == null || invalidInput(registRequest)) {
            throw new IllegalArgumentException("중복된 필드가 존재합니다.");
        }

        User user = userMapper.toUser(registRequest);
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        authRepository.save(user);  // JPA를 사용하여 사용자 등록 로직
    }

    //아이디 중복검사
    @Override
    public boolean idCheck(String loginId) {
        log.info("Service id Check :" + loginId);
        Optional<User> user = authRepository.findByLoginId(loginId);
        return user.isEmpty();
    }

    @Override
    public String findId(String email) {
        log.info("Service email Check : " + email);
        Optional<User> user = authRepository.findByEmail(email);
        // 사용자가 존재하면 LoginId 반환, 그렇지 않으면 null 반환
        return user.map(User::getLoginId).orElse(null);
    }


    //닉네임 중복검사
    @Override
    public boolean nameCheck(String name) {
        log.info("Service name Check :" + name);
        Optional<User> user = authRepository.findByName(name);
        return user.isEmpty();
    }

    private boolean invalidInput(RegistRequest registRequest) {
        if(!idCheck(registRequest.loginId())) {
            log.error("already exist id");
            return true;
        }

        if(!nameCheck(registRequest.name())) {
            log.error("already exist name");
            return true;
        }
        return false;
    }
}
