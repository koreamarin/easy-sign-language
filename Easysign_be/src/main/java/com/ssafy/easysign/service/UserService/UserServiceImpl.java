package com.ssafy.easysign.service.UserService;

import com.ssafy.easysign.model.User;
import com.ssafy.easysign.model.request.RegistRequest;
import com.ssafy.easysign.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void registerUser(RegistRequest registRequest) {
        // 유효성 검사 및 사용자 등록 로직 구현
        if (registRequest == null || invalidInput(registRequest)) {
            throw new IllegalArgumentException("Invalid input data");
        }

        User user = new User();
        user.setUserId(registRequest.getId());
        user.setEmail(registRequest.getEmail());
        user.setPassword(registRequest.getPassword());
        user.setName(registRequest.getName());

         userRepository.save(user);  // JPA를 사용하여 사용자 등록 로직
    }

    private boolean invalidInput(RegistRequest registRequest) {
        // 유효성 검사 로직을 추가하여 필요한 경우 예외를 던집니다.
        // 예: 아이디, 이메일, 비밀번호 등의 형식 체크
        return false;
    }
}
