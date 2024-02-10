package com.ssafy.easysign.user.entity.Id;

import com.ssafy.easysign.store.entity.Store;
import com.ssafy.easysign.user.entity.User;
import lombok.Data;

import java.io.Serializable;
@Data
public class UserItemId implements Serializable {
    private User user;
    private Store item;
}
