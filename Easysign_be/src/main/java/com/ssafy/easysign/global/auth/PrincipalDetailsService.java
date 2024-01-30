package com.ssafy.easysign.global.auth;

import com.ssafy.easysign.user.entity.User;
import com.ssafy.easysign.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

//http://localhost:8080/login => 여기서 동작을 안한다.
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String loginId) throws UsernameNotFoundException {
        Optional<User> userEntity = userRepository.findByLoginId(loginId);
        return new PrincipalDetails(userEntity.get());
    }
}
