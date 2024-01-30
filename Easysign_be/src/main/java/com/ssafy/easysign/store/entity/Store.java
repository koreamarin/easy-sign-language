package com.ssafy.easysign.store.entity;

import com.ssafy.easysign.global.jpaEnum.StoreCategory;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Store {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long item_id;

    @Enumerated(EnumType.STRING)
    private StoreCategory category_name;
    private int price;
    private String description;
    private String image_path;
}
