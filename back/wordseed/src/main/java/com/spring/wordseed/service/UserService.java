package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.CreateUserInDTO;
import com.spring.wordseed.dto.in.ReadFollowerInDTOs;
import com.spring.wordseed.dto.in.ReadUserInDTOs;
import com.spring.wordseed.dto.in.UpdateUserInDTO;
import com.spring.wordseed.dto.out.DeleteUserOutDTO;
import com.spring.wordseed.dto.out.ReadUserInfoByIdOutDTO;
import com.spring.wordseed.dto.out.ReadUserOutDTO;
import com.spring.wordseed.dto.out.ReadUserOutDTOs;
import com.spring.wordseed.dto.out.UpdateUserOutDTO;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    long createUser(CreateUserInDTO createUserInDTO) throws Exception;
    ReadUserOutDTO readUser(long userId) throws Exception;
    UpdateUserOutDTO updateUser(UpdateUserInDTO updateUserInDTO) throws Exception;
    DeleteUserOutDTO deleteUser(long userId) throws Exception;
    ReadUserOutDTOs readUsers(ReadUserInDTOs readUserInDTOs)throws Exception;
    ReadUserInfoByIdOutDTO readUserInfo(long srcUserId, long dstUserId) throws Exception;
    ReadUserOutDTOs readFollowers(ReadFollowerInDTOs readFollowerInDTOs) throws Exception;
}
