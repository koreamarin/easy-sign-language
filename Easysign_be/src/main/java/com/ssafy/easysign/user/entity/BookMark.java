package com.ssafy.easysign.user.entity;

import com.ssafy.easysign.sign.entity.SignInfo;
import com.ssafy.easysign.user.entity.Id.BookMarkId;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@IdClass(BookMarkId.class)
public class BookMark {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "sign_id")
    private SignInfo signInfo;

}
