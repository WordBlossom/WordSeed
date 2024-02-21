package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.CreateUserInDTO;
import com.spring.wordseed.dto.out.ReadUserOutDTO;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    long createUser(CreateUserInDTO createUserInDTO) throws Exception;
    ReadUserOutDTO readUser(long userId) throws Exception;
}
