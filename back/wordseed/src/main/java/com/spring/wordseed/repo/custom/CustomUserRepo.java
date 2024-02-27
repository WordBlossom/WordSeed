package com.spring.wordseed.repo.custom;

import com.spring.wordseed.dto.out.ReadUserInfoByIdOutDTO;
import com.spring.wordseed.dto.out.ReadUserOutDTOs;
import com.spring.wordseed.dto.tool.UserDTO;
import com.spring.wordseed.entity.User;

import java.util.List;
import java.util.Optional;

public interface CustomUserRepo {
    Optional<User> findWithUserInfoById(long userId) throws Exception;
    Optional<List<UserDTO>> findUserBy(long userId, String query, long page, long size);
    Optional<ReadUserInfoByIdOutDTO> findUserInfoBy(long srcUserId, long dstUserId);
}
