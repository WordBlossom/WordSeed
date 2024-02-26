package com.spring.wordseed.repo.custom.impl;

import com.querydsl.jpa.impl.JPADeleteClause;
import com.spring.wordseed.entity.QFollow;
import com.spring.wordseed.repo.custom.CustomFollowRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class CustomFollowRepoImpl implements CustomFollowRepo {

    @PersistenceContext
    EntityManager em;
    QFollow qFollow = QFollow.follow;
    @Override
    public void deleteFollowBy(long srcUserId, long dstUserId) throws Exception{
        if(srcUserId == dstUserId) throw new IllegalArgumentException();
        new JPADeleteClause(em, qFollow)
                .where(qFollow.srcUser.userId.eq(srcUserId))
                .where(qFollow.dstUser.userId.eq(dstUserId))
                .execute();
    }
}
