package com.ssafy.easysign.sign.mapper;

import com.ssafy.easysign.sign.dto.response.CategoryResponse;
import com.ssafy.easysign.sign.entity.SignCategory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SignCategoryMapper {

    CategoryResponse toCategoryResponse(SignCategory signCategory);
}
