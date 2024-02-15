package com.ssafy.easysign.store.entity;

import com.ssafy.easysign.global.jpaEnum.StoreCategory;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Data
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long itemId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StoreCategory categoryName;

    @Column(nullable = false)
    private String itemName;

    @Column(nullable = false)
    private int price;
    private String description;

    @Column(nullable = false)
    private String imagePath;
}
