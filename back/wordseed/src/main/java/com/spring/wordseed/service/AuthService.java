package com.spring.wordseed.service;

import com.spring.wordseed.dto.tool.TokenDTO;

public interface AuthService {
    TokenDTO createToken(long userId) throws Exception;
    String validateToken(String token) throws Exception;
}
