package com.spring.wordseed.service;

public interface AuthService {
    String[] createToken(long userId) throws Exception;
    String validateToken(String token) throws Exception;
}
