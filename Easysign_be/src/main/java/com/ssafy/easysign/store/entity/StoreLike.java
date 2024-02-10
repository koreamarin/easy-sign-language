package com.ssafy.easysign.store.entity;

import com.ssafy.easysign.store.entity.id.StoreLikeId;
import com.ssafy.easysign.user.entity.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@IdClass(StoreLikeId.class)
public class StoreLike {
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "item_id")
    private Store store;
}
