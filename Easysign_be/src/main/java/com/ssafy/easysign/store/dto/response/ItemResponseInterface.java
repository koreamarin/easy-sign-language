package com.ssafy.easysign.store.dto.response;

public interface ItemResponseInterface {
    Long getItem_id();
    String getCategory_name();
    String getItem_name();
    int getPrice();
    String getDescription();
    String getImage_path();
    boolean getIsLike();
}
