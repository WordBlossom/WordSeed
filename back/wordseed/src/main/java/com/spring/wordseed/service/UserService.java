package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.CreateUserInDTO;
import com.spring.wordseed.dto.in.UpdateUserInDTO;
import com.spring.wordseed.dto.out.ReadUserOutDTO;
import com.spring.wordseed.dto.out.UpdateUserOutDTO;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    long createUser(CreateUserInDTO createUserInDTO) throws Exception;
    ReadUserOutDTO readUser(long userId) throws Exception;
    UpdateUserOutDTO updateUser(UpdateUserInDTO updateUserInDTO) throws Exception;
}
