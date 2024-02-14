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
        String content = "안녕하세요,\n" +
                "\n" +
                "회원님의 계정 안전을 위해 비밀번호를 변경해주시기 바랍니다. 아래 링크를 클릭하여 변경해주시기 바랍니다.\n" +
                "\n" +
                text +
                "\n" +
                "비밀번호를 안전하게 보호하기 위해 다음 사항을 고려해주세요:\n" +
                "\n" +
                "영문 대/소문자, 숫자, 특수문자를 혼합하여 비밀번호를 설정하세요.\n" +
                "다른 사이트의 비밀번호와 겹치지 않도록 주의하세요.\n" +
                "주기적으로 비밀번호를 변경하여 계정을 보호하세요.\n" +
                "변경 사항이 없거나 궁금한 사항이 있으시면 언제든지 저희에게 문의해주세요.\n" +
                "\n" +
                "감사합니다.\n" +
                "\n" +
                "수어쉬워 드림";
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
