package com.spring.wordseed.repo.custom.impl;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.spring.wordseed.dto.out.ReadPostByPostIdOutDTO;
import com.spring.wordseed.dto.out.ReadPostOutDTO;
import com.spring.wordseed.entity.*;
import com.spring.wordseed.enu.PostSort;
import com.spring.wordseed.enu.PostType;
import com.spring.wordseed.repo.custom.CustomPostRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.hibernate.query.criteria.JpaSubQuery;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CustomPostRepoImpl implements CustomPostRepo {
    @PersistenceContext
    EntityManager em;
    private final QPost qPost = QPost.post;
    private final QUser qUser = QUser.user;
    private final QUser qUser2 = new QUser("user2");
    private final QBookMark qBookMark = QBookMark.bookMark;
    private final QPostLiked qPostLiked = QPostLiked.postLiked;
    private final QWord qWord = QWord.word1;
    private final QFollow qFollow = QFollow.follow;

    @Override
    public ReadPostByPostIdOutDTO findPostByPostId(Long postId) {
        BooleanExpression likedExpression = JPAExpressions
                .selectOne()
                .from(qPost)
                .join(qPost.postLikeds, qPostLiked)
                .where(qPostLiked.user.userId.eq(7L))
                .where(qPost.postId.eq(postId))
                .exists();

        BooleanExpression bookMarkedExpression = JPAExpressions
                .selectOne()
                .from(qPost)
                .join(qPost.bookMarks, qBookMark)
                .where(qBookMark.user.userId.eq(7L))
                .where(qPost.postId.eq(postId))
                .exists();

        BooleanExpression subscribedExpression = JPAExpressions
                .selectOne()
                .from(qFollow)
                .join(qFollow.srcUser, qUser)
                .join(qFollow.dstUser, qUser2)
                .join(qUser2.posts, qPost)
                .where(qUser.userId.eq(7L))
                .where(qPost.postId.eq(postId))
                .exists();

        ReadPostByPostIdOutDTO readPostByPostIdOutDTO = new JPAQuery<>(em)
                .select(Projections.constructor(
                        ReadPostByPostIdOutDTO.class,
                        qPost.postId.as("postId"),
                        qPost.user.userId.as("userId"),
                        qPost.user.userName.as("userName"),
                        qPost.postType.as("postType"),
                        qPost.postAlign.as("postAlign"),
                        qPost.postVisibility.as("postVisibility"),
                        qPost.content.as("content"),
                        qPost.url.as("url"),
                        qPost.likedCnt.as("likedCnt"),
                        qPost.bookMarkCnt.as("bookMarkCnt"),
                        qPost.commentCnt.as("commentCnt"),
                        likedExpression.as("liked"),
                        bookMarkedExpression.as("bookMarked"),
                        subscribedExpression.as("subscribed"),
                        qWord.wordId.as("wordId"),
                        qWord.word.as("word"),
                        qPost.createdAt.as("createdAt"),
                        qPost.updatedAt.as("updatedAt")))
                .from(qPost)
                .join(qPost.user, qUser)
                .join(qPost.word, qWord)
                .where(qPost.postId.eq(postId))
                .fetchOne();

        return readPostByPostIdOutDTO;
    }
}
