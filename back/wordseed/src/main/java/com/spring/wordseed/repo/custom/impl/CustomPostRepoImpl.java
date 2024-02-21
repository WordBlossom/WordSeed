package com.spring.wordseed.repo.custom.impl;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.spring.wordseed.dto.out.ReadPostOutDTO;
import com.spring.wordseed.entity.*;
import com.spring.wordseed.enu.PostSort;
import com.spring.wordseed.enu.PostType;
import com.spring.wordseed.repo.custom.CustomPostRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CustomPostRepoImpl implements CustomPostRepo {
    @PersistenceContext
    EntityManager em;
    private final QPost qPost = QPost.post;
    private final QUser qUser = QUser.user;
    private final QBookMark qBookMark = QBookMark.bookMark;
    private final QPostLiked qPostLiked = QPostLiked.postLiked;
    private final QWord qWord = QWord.word1;

    @Override
    public List<ReadPostOutDTO> FindByCustom(String postTypes, String mark, Long userId, PostSort sort, String query, Long page, Long size) {
        List<String> postType = new ArrayList<>(Arrays.asList(postTypes.split(",")));
        System.out.println(postType.toString());



        // post, user, bookMark,follow, like
        List<ReadPostOutDTO> readPostOutDTO = new JPAQuery<>(em)
                .select(Projections.constructor(ReadPostOutDTO.class
                        , qPost.postId
                        , qUser.userId
                        , qUser.userName
                        , qPost.postType
                        , qPost.content
                        , qPost.url
                        , qPost.likedCnt
                        , qPost.bookMarkCnt
                        , qPost.commentCnt
                        , Expressions.FALSE
                        , Expressions.FALSE
                        , Expressions.FALSE
                        , qPost.createdAt
                        , qPost.updatedAt))
                .from(qPost)
                .join(qUser)
                .on(qPost.user.userId.eq(qUser.userId))
                .join(qBookMark)
                .on(qBookMark.post.postId.eq(qPost.postId))
                .where(qPost.postType.stringValue().in(postType))
                //.where(qWord.word.like("%" + query + "%"))
                .where(qUser.userId.eq(userId))
                .orderBy(sort == PostSort.DATE_ASC ? qPost.createdAt.asc()
                        : (sort == PostSort.DATE_DSC ? qPost.createdAt.desc()
                        : (sort == PostSort.LIKE_ASC ? qPost.likedCnt.asc()
                        : qPost.likedCnt.desc())))
                .fetch();

        // query, size, page
        // mark, like, subscribe
        return readPostOutDTO;
    }
}
