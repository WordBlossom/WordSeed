package com.spring.wordseed.repo.custom.impl;

import com.querydsl.jpa.impl.JPAQuery;
import com.spring.wordseed.entity.*;
import com.spring.wordseed.repo.custom.CustomBookMarkRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public class CustomBookMarkRepoImpl implements CustomBookMarkRepo {
    @PersistenceContext
    EntityManager em;
    private final QPost qPost = QPost.post;
    private final QUser qUser = QUser.user;
    private final QBookMark qBookMark = QBookMark.bookMark;
    @Override
    public BookMark findBookMarkBy(Long postId, Long userId) {
        return new JPAQuery<>(em)
                .select(qBookMark)
                .from(qBookMark)
                .join(qBookMark.post, qPost)
                .join(qBookMark.user, qUser)
                .where(qPost.postId.eq(postId))
                .where(qUser.userId.eq(userId))
                .fetchOne();
    }
}
