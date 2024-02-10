package com.ssafy.easysign.store.entity.id;

import com.ssafy.easysign.store.entity.Store;
import com.ssafy.easysign.store.entity.StoreLike;
import com.ssafy.easysign.user.entity.User;
import lombok.Data;

import java.io.Serializable;

@Data
public class StoreLikeId implements Serializable {
    private User user;
    private Store store;
}
