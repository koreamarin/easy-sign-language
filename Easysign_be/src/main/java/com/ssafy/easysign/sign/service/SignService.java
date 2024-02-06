package com.ssafy.easysign.sign.service;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.dto.response.SignResponse2;
import com.ssafy.easysign.sign.entity.SignCategory;

import java.util.List;

public interface SignService {
    List<SignCategory> getCategoryList();
    List<SignResponse2> getSignResponseList(String categoryName, Gubun gubun);
}
