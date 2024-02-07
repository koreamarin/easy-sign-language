package com.ssafy.easysign.sign.mapper;

import com.ssafy.easysign.sign.dto.response.SignResponse;
import com.ssafy.easysign.sign.dto.response.SignResponse2;
import com.ssafy.easysign.sign.entity.SignInfo;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SignMapper {

    SignResponse toSignResponse(SignInfo signInfo);
    SignResponse2 toSignResponse2(SignInfo signInfo);
}
