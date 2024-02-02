package com.ssafy.easysign.user.controller;
import com.ssafy.easysign.global.auth.PrincipalDetails;
import com.ssafy.easysign.sign.dto.response.SignResponse;
import com.ssafy.easysign.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
//import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/api/vi/user/bookmark")
public class BookMarkController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<SignResponse> getBookMark(@RequestParam Long signId, Authentication authentication){
        PrincipalDetails userDetails = (PrincipalDetails) authentication.getPrincipal();
        Long userId = userDetails.getUserId();
        userService.registBookMark(userId, signId);
        return ResponseEntity.ok().build(); // 200 OK
    }
}
