package com.spring.wordseed.repo.custom;

import com.spring.wordseed.dto.out.ReadUserInfoByIdOutDTO;
import com.spring.wordseed.dto.tool.UserDTO;
import com.spring.wordseed.entity.User;
import com.spring.wordseed.enu.FollowType;

import java.util.List;
import java.util.Optional;

public interface CustomUserRepo {
    Optional<User> findWithUserInfoById(long userId) throws Exception;
    Optional<List<UserDTO>> findUserBy(long userId, String query, long page, long size);
    Optional<ReadUserInfoByIdOutDTO> findUserInfoBy(long srcUserId, long dstUserId);
    Optional<List<UserDTO>> findUserBy(FollowType type, long authUserId, long targetUserId, long page, long size) throws  Exception;
}
