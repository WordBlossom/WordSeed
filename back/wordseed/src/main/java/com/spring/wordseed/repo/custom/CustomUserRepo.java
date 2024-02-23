package com.spring.wordseed.repo.custom;

import com.spring.wordseed.entity.User;

import java.util.Optional;

public interface CustomUserRepo {
    Optional<User> findWithUserInfoById(long userId) throws Exception;
}
