package com.ssafy.easysign.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Store {
    @Id
    private Long item_id;
    private String category_name;
    private int price;
    private String descript;
    private String image_path;
}
