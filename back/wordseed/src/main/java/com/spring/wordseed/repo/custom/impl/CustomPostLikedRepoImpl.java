package com.spring.wordseed.repo.custom.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.spring.wordseed.dto.out.ReadPostByPostIdOutDTO;
import com.spring.wordseed.dto.out.ReadPostOutDTO;
import com.spring.wordseed.entity.*;
import com.spring.wordseed.enu.PostSort;
import com.spring.wordseed.enu.PostType;
import com.spring.wordseed.repo.custom.CustomPostLikedRepo;
import com.spring.wordseed.repo.custom.CustomPostRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CustomPostLikedRepoImpl implements CustomPostLikedRepo {
    @PersistenceContext
    EntityManager em;
    private final QPost qPost = QPost.post;
    private final QUser qUser = QUser.user;
    private final QPostLiked qPostLiked = QPostLiked.postLiked;
    @Override
    public PostLiked FindPostLikedIdBy(Long userId, Long postId) {
        return new JPAQuery<>(em)
                .select(qPostLiked)
                .from(qPostLiked)
                .join(qPostLiked.user, qUser)
                .join(qPostLiked.post, qPost)
                .where(qUser.userId.eq(userId))
                .where(qPost.postId.eq(postId))
                .fetchOne();
    }
}
