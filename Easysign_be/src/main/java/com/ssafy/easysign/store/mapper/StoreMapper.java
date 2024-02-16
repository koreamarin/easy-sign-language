package com.ssafy.easysign.store.mapper;

import com.ssafy.easysign.store.dto.response.ItemResponse;
import com.ssafy.easysign.store.dto.response.ItemResponseInterface;
import com.ssafy.easysign.store.entity.Store;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface StoreMapper {

    ItemResponse toItemResponse(Store store);

    @Mapping(source = "i.item_id", target = "itemId")
    @Mapping(source = "i.category_name", target = "categoryName")
    @Mapping(source = "i.image_path", target = "imagePath")
    @Mapping(source = "i.item_name", target = "itemName")
    ItemResponse toItemResponse(ItemResponseInterface i);

}
