package com.ssafy.easysign.user.entity.Id;

import com.ssafy.easysign.sign.entity.SignInfo;
import com.ssafy.easysign.user.entity.User;
import lombok.Data;

import java.io.Serializable;

@Data
public class UserProgressId implements Serializable {
    private User user;
    private SignInfo signInfo;
}