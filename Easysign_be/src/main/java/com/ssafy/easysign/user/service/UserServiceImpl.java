package com.ssafy.easysign.user.service;

import com.ssafy.easysign.user.dto.request.RegistRequest;
import com.ssafy.easysign.user.entity.User;
import com.ssafy.easysign.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void registerUser(RegistRequest registRequest) {
        // 유효성 검사 및 사용자 등록 로직 구현
        if (registRequest == null || invalidInput(registRequest)) {
            throw new IllegalArgumentException("Invalid input data");
        }

        User user = new User();
        user.setLoginId(registRequest.getLoginId());
        user.setName(registRequest.getName());
        user.setEmail(registRequest.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(registRequest.getPassword()));
        user.setName(registRequest.getName());

         userRepository.save(user);  // JPA를 사용하여 사용자 등록 로직
    }

    private boolean invalidInput(RegistRequest registRequest) {
        // 유효성 검사 로직을 추가하여 필요한 경우 예외를 던집니다.
        // 예: 아이디, 이메일, 비밀번호 등의 형식 체크
        return false;
    }
}
