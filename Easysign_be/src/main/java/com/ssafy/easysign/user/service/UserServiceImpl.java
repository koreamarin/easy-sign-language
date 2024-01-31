package com.ssafy.easysign.user.service;

import com.ssafy.easysign.user.dto.response.UserInfoResponse;
import com.ssafy.easysign.user.entity.User;
import com.ssafy.easysign.user.exception.NotFoundException;
import com.ssafy.easysign.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    @Override
    public UserInfoResponse getNavUserInfo(String loginId) {
        UserInfoResponse response = new UserInfoResponse();
        Optional<User> user = userRepository.findByLoginId(loginId);
        if(user.isEmpty()) throw new NotFoundException("사용자를 찾을 수 없습니다.");
        response.setName(user.get().getName());
        response.setSticker(user.get().getSticker());
        return response;
    }
}
