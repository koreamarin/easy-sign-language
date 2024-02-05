package com.ssafy.easysign.sign.service;

import com.ssafy.easysign.global.jpaEnum.Gubun;
import com.ssafy.easysign.sign.entity.SignCategory;
import com.ssafy.easysign.sign.entity.SignInfo;

import java.util.List;

public interface SignService {
    List<SignCategory> getCategoryList();
    List<SignInfo> getSignResponseList(String categoryName, Gubun gubun);
}
