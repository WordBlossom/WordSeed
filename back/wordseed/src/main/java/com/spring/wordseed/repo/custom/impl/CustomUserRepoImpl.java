package com.spring.wordseed.repo.custom.impl;

import com.querydsl.jpa.impl.JPAQuery;
import com.spring.wordseed.entity.QUser;
import com.spring.wordseed.entity.QUserInfo;
import com.spring.wordseed.entity.User;
import com.spring.wordseed.repo.custom.CustomUserRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.Optional;

public class CustomUserRepoImpl implements CustomUserRepo {
    @PersistenceContext
    EntityManager em;
    private final QUser qUser = QUser.user;
    private final QUserInfo qUserInfo = QUserInfo.userInfo;

    @Override
    public Optional<User> findWithUserInfoById(long userId) throws Exception {
        User user = new JPAQuery<>(em)
                .select(qUser)
                .from(qUser)
                .join(qUser.userInfo, qUserInfo).fetchJoin()
                .where(qUser.userId.eq(userId))
                .fetchOne();
        return Optional.ofNullable(user);
    }
}
