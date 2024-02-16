package com.ssafy.easysign.user.entity;

import com.ssafy.easysign.store.entity.Store;
import com.ssafy.easysign.user.entity.Id.UserItemId;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

@Data
@Entity
@IdClass(UserItemId.class)
public class UserItem {
    @Id
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name="item_id")
    private Store item;

    @ColumnDefault("false")
    @Column(columnDefinition = "TINYINT(1)")
    private boolean isUse;
}
