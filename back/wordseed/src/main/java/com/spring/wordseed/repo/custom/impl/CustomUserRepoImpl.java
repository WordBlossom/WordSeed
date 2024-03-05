package com.spring.wordseed.repo.custom.impl;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.spring.wordseed.dto.out.ReadUserInfoByIdOutDTO;
import com.spring.wordseed.dto.tool.UserDTO;
import com.spring.wordseed.entity.QFollow;
import com.spring.wordseed.entity.QUser;
import com.spring.wordseed.entity.QUserInfo;
import com.spring.wordseed.entity.User;
import com.spring.wordseed.enu.FollowType;
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

    @Override
    public Optional<ReadUserInfoByIdOutDTO> findUserInfoBy(long srcUserId, long dstUserId) {
        ReadUserInfoByIdOutDTO userInfo =  new JPAQuery<>(em)
                .select(Projections.constructor(ReadUserInfoByIdOutDTO.class,
                        qUser.userId,
                        qUser.userName,
                        qUserInfo.userDecp,
                        qUserInfo.postCnt,
                        qUserInfo.followSrcCnt,
                        qUserInfo.followDstCnt,
                        isSubscribedBy(srcUserId, dstUserId)
                        ))
                .from(qUser)
                .innerJoin(qUser.userInfo, qUserInfo)
                .where(qUser.userId.eq(dstUserId))
                .fetchOne();
        return Optional.ofNullable(userInfo);
    }

    @Override
    public Optional<List<UserDTO>> findUserBy(FollowType type, long authUserId, long targetUserId, long page, long size) {
        QUser follower = (type == FollowType.SEND) ? qFollow.dstUser : qFollow.srcUser;
        List<UserDTO> users = new JPAQuery<>(em)
                .select(Projections.constructor(UserDTO.class,
                        qUser.userId,
                        qUser.userName,
                        qUserInfo.followSrcCnt,
                        qUserInfo.followDstCnt,
                        qUserInfo.userDecp,
                        isSubscribedBy(authUserId)))
                .from(qFollow)
                .innerJoin(follower, qUser)
                .innerJoin(qUser.userInfo, qUserInfo)
                .where(followTypeEq(type, targetUserId))
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

    private BooleanExpression isSubscribedBy(long srcUserId, long dstUserId) {
        return JPAExpressions
                .selectOne()
                .from(qFollow)
                .where(qFollow.srcUser.userId.eq(srcUserId))
                .where(qFollow.dstUser.userId.eq(dstUserId))
                .exists();
    }

    private BooleanExpression followTypeEq(FollowType type, long userId) {
        if(type == FollowType.SEND) return qFollow.srcUser.userId.eq(userId);
        return qFollow.dstUser.userId.eq(userId);
    }

}
