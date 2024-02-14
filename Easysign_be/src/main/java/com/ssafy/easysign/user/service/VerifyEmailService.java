package com.ssafy.easysign.user.service;

import com.ssafy.easysign.user.exception.NotFoundException;
import com.ssafy.easysign.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class VerifyEmailService {
    private final UserRepository userRepository;
    private final RedisUtil redisUtil;
    @Autowired
    private JavaMailSender emailSender;

    public void sendMail(String to, String sub, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(sub);
        String content = "아래 링크를 클릭하여 인증을 완료해주세요.</br>" + text;
        message.setText(content);
        emailSender.send(message);
    }

    public void sendVerificationMail(String email) {
        String VERIFICATION_LINK = "https://easysign.shop/api/v1/verify/";
        if(email==null) throw new NotFoundException("멤버가 조회되지 않습니다.");
        UUID uuid = UUID.randomUUID();
        //redis 저장
        redisUtil.setDataExpire(uuid.toString(), email, 60*30L);
        //인증 링크 전송
        sendMail(email, "비밀번호 재설정 인증메일입니다.", VERIFICATION_LINK+uuid.toString());
    }

    public void verifyEmail(String key) {
        String verify = redisUtil.getData(key);
        if(verify == null) throw new NotFoundException("유효하지 않은 링크입니다.");
        redisUtil.deleteData(key);
    }
}
