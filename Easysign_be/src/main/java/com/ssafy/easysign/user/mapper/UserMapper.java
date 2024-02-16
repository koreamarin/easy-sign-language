package com.ssafy.easysign.user.mapper;

import com.ssafy.easysign.sign.entity.SignInfo;
import com.ssafy.easysign.store.entity.Store;
import com.ssafy.easysign.user.dto.request.RegistRequest;
import com.ssafy.easysign.user.dto.response.UserInfoResponse;
import com.ssafy.easysign.user.entity.*;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(RegistRequest registRequest);
    UserInfoResponse toUserInfoResponse(User user, String profileCharacterPath, String profileBackgroundPath, String mask);
    UserProgress toUserProgress(User user, SignInfo signInfo);
    UserItem toUserItem(User user, Store item, boolean use);
    BookMark toBookMark(User user, SignInfo signInfo);
}
