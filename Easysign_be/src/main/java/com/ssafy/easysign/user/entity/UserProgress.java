package com.ssafy.easysign.user.entity;

import com.ssafy.easysign.sign.entity.SignInfo;
import com.ssafy.easysign.user.entity.Id.UserProgressId;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@IdClass(UserProgressId.class) // UserProgressId 클래스를 기본 키로 사용한다고 명시
public class UserProgress {
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "sign_id")
    private SignInfo signInfo;
}
