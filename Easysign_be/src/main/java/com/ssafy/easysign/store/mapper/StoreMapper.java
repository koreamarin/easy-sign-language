package com.ssafy.easysign.store.mapper;

import com.ssafy.easysign.store.dto.response.ItemResponse;
import com.ssafy.easysign.store.entity.Store;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StoreMapper {
    ItemResponse toItemResponse(Store store);
}
