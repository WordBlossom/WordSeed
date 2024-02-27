package com.spring.wordseed.repo.custom.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.spring.wordseed.dto.tool.UserDTO;
import com.spring.wordseed.entity.QFollow;
import com.spring.wordseed.entity.QUser;
import com.spring.wordseed.entity.QUserInfo;
import com.spring.wordseed.entity.User;
import com.spring.wordseed.repo.custom.CustomUserRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.List;
import java.util.Optional;

public class CustomUserRepoImpl implements CustomUserRepo {
    @PersistenceContext
    EntityManager em;
    private final QUser qUser = QUser.user;
    private final QUserInfo qUserInfo = QUserInfo.userInfo;
    private final QFollow qFollow = QFollow.follow;

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

    @Override
    public Optional<List<UserDTO>> findUserBy(long userId, String query, long page, long size) {
        List<UserDTO> users = new JPAQuery<>(em)
                .select(Projections.constructor(UserDTO.class,
                        qUser.userId,
                        qUser.userName,
                        qUserInfo.followSrcCnt,
                        qUserInfo.followDstCnt,
                        qUserInfo.userDecp,
                        isSubscribedBy(userId)))
                .from(qUser)
                .innerJoin(qUser.userInfo, qUserInfo)
                .where(qUser.userName.like(query + "%"))
                .orderBy(qUser.userName.asc())
                .offset((page - 1) * size)
                .limit(size)
                .fetch();

        return Optional.ofNullable(users);
    }

    private BooleanExpression isSubscribedBy(long srcUserId) {
        return JPAExpressions
                .selectOne()
                .from(qFollow)
                .where(qFollow.srcUser.userId.eq(srcUserId))
                .where(qFollow.dstUser.userId.eq(qUser.userId))
                .exists();
    }


}
