package com.ssafy.easysign.store.entity.id;

import com.ssafy.easysign.store.entity.Store;
import com.ssafy.easysign.user.entity.User;

import java.io.Serializable;

public class StoreLikeId implements Serializable {
    private User user;
    private Store item;

}
