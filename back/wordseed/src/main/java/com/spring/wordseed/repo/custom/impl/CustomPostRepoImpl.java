package com.spring.wordseed.repo.custom.impl;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.spring.wordseed.dto.out.ReadPostOutDTO;
import com.spring.wordseed.entity.*;
import com.spring.wordseed.enu.PostSort;
import com.spring.wordseed.enu.PostType;
import com.spring.wordseed.repo.custom.CustomPostRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

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
    private final QBookMark qBookMark = QBookMark.bookMark;
    private final QPostLiked qPostLiked = QPostLiked.postLiked;
    private final QWord qWord = QWord.word1;

    @Override
    public List<ReadPostOutDTO> FindByCustom(String postTypes, String mark, Long userId, PostSort sort, String query, Long page, Long size) {
        List<String> postType = new ArrayList<>(Arrays.asList(postTypes.split(",")));

        String postTypesInSQL = "";
        for (String type : postType)
            postTypesInSQL += ("\"" + type + "\",");

        postTypesInSQL = postTypesInSQL.substring(0, postTypesInSQL.length() - 1);

        String sql = "SELECT P.POST_ID PID, P.USER_ID, U.USER_NAME, P.POST_TYPE, P.CONTENT, P.URL, P.LIKED_CNT, P.BOOK_MARK_CNT, P.COMMENT_CNT, " +
                "EXISTS(SELECT * FROM BOOK_MARKS BM JOIN POSTS P ON BM.POST_ID = P.POST_ID WHERE BM.USER_ID = :bind1 AND P.POST_ID = PID), " +
                "EXISTS(SELECT * FROM POST_LIKEDS PL JOIN POSTS P ON PL.POST_ID = P.POST_ID WHERE PL.USER_ID = :bind2 AND P.POST_ID = PID), " +
                "EXISTS(SELECT * FROM FOLLOWS F WHERE F.SRC_ID = :bind3 AND F.DST_ID = P.USER_ID), " +
                "P.CREATED_AT, P.UPDATED_AT " +
                "FROM POSTS P " +
                "JOIN USERS U ON P.USER_ID = U.USER_ID " +
                "JOIN WORDS W ON P.WORD_ID = W.WORD_ID " +
                "WHERE P.USER_ID = :bind4 ";
                //"AND P.POST_TYPE IN (:bind5) " +
                //"AND W.WORD LIKE \"%%\"";

        Query nativeQuery = em.createNativeQuery(sql);
        nativeQuery.setParameter("bind1", "7"); // 본인 user Id
        nativeQuery.setParameter("bind2", "7"); // 본인 user Id
        nativeQuery.setParameter("bind3", "3"); // 본인 user Id
        nativeQuery.setParameter("bind4", "3"); // 본인 user Id
        //nativeQuery.setParameter("bind5", postTypesInSQL);

        List<Object[]> resultList = nativeQuery.getResultList();
        List<ReadPostOutDTO> readPostOutDTOs = new ArrayList<>();

        for (Object[] row : resultList){
            Long rPostId = (Long) row[0];
            Long rUserId = (Long) row[1];
            String rUserName = (String) row[2];
            PostType rPostType = PostType.valueOf((String) row[3]);
            String rContent = (String) row[4];
            String rUrl = (String) row[5];
            Long rLikedCnt = (Long) row[6];
            Long rBookMarkCnt = (Long) row[7];
            Long rCommentCnt = (Long) row[8];
            Boolean rBookMarked = (Long) row[9] == 1L;
            Boolean rLiked = (Long) row[10] == 1L;
            Boolean rSubs = (Long) row[11] == 1L;

            // createAt
            String createAtString = (String) row[12];
            DateTimeFormatter createAtFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            LocalDateTime rCreatedAt = LocalDateTime.parse(createAtString, createAtFormat);

            // updateAt
            String updateAtString = (String) row[13];
            DateTimeFormatter updateAtFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
            LocalDateTime rUpdatedAt = LocalDateTime.parse(updateAtString, updateAtFormat);

            ReadPostOutDTO readPostOutDTO = ReadPostOutDTO.builder()
                    .postId(rPostId)
                    .userId(rUserId)
                    .userName(rUserName)
                    .postType(rPostType)
                    .content(rContent)
                    .url(rUrl)
                    .likedCnt(rLikedCnt)
                    .bookMarkCnt(rBookMarkCnt)
                    .commentCnt(rCommentCnt)
                    .bookMarked(rBookMarked)
                    .liked(rLiked)
                    .subscribed(rSubs)
                    .createdAt(rCreatedAt)
                    .updatedAt(rUpdatedAt)
                    .build();

            readPostOutDTOs.add(readPostOutDTO);
        }
        return readPostOutDTOs;
    }
}
