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
import com.spring.wordseed.dto.out.ReadPostOutDTOs;
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

    @Override
    public List<ReadPostOutDTO> FindPostAllBy(String postTypes, String mark, Long userId, PostSort sort, String query, Long page, Long size) {
        // postType
        List<String> postType = new ArrayList<>(Arrays.asList(postTypes.split(",")));
        String postTypesInSQL = "";

        for (String type : postType)
            postTypesInSQL += ("\"" + type + "\",");

        postTypesInSQL = postTypesInSQL.substring(0, postTypesInSQL.length() - 1);
        String postSQL = "AND P.POST_TYPE IN (" + postTypesInSQL + ") ";

        // word


        // sort
        String sortSQL = "ORDER BY ";

        if (sort == PostSort.DATE_ASC)
            sortSQL += "CREATED_AT ASC ";

        else if (sort == PostSort.DATE_DSC)
            sortSQL += "CREATED_AT DESC ";

        else if (sort == PostSort.LIKE_ASC)
            sortSQL += "LIKECNT ASC ";

        else if (sort == PostSort.LIKE_DSC)
            sortSQL += "LIKECNT DESC ";

        // paging
        String pagingSQL = String.format("LIMIT %d OFFSET %s", size, (page - 1) * size);

        // native query
        String sql = "SELECT P.POST_ID PID, P.USER_ID, U.USER_NAME, P.POST_TYPE, P.CONTENT, P.URL, P.LIKED_CNT LIKECNT, P.BOOK_MARK_CNT, P.COMMENT_CNT, " +
                "EXISTS(SELECT * FROM BOOK_MARKS BM JOIN POSTS P ON BM.POST_ID = P.POST_ID WHERE BM.USER_ID = :bind1 AND P.POST_ID = PID), " +
                "EXISTS(SELECT * FROM POST_LIKEDS PL JOIN POSTS P ON PL.POST_ID = P.POST_ID WHERE PL.USER_ID = :bind2 AND P.POST_ID = PID), " +
                "EXISTS(SELECT * FROM FOLLOWS F WHERE F.SRC_ID = :bind3 AND F.DST_ID = P.USER_ID), " +
                "DATE_FORMAT(P.CREATED_AT, '%Y-%m-%d %H:%i:%s') AS CREATED_AT," +
                "DATE_FORMAT(P.UPDATED_AT, '%Y-%m-%d %H:%i:%s') AS UPDATED_AT " +
                "FROM POSTS P " +
                "JOIN USERS U ON P.USER_ID = U.USER_ID " +
                "JOIN WORDS W ON P.WORD_ID = W.WORD_ID " +
                "WHERE P.USER_ID = :bind4 " +
                postSQL +
                sortSQL +
                pagingSQL;

        // create query
        Query nativeQuery = em.createNativeQuery(sql);

        // %should change
        nativeQuery.setParameter("bind1", "7"); // post user Id
        nativeQuery.setParameter("bind2", "7"); // post user Id
        nativeQuery.setParameter("bind3", "3"); // user Id
        nativeQuery.setParameter("bind4", "3"); // user Id

        List<Object[]> resultList = nativeQuery.getResultList();
        List<ReadPostOutDTO> readPostOutDTOs = new ArrayList<>();

        // initialize data
        for (Object[] row : resultList) {
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
            DateTimeFormatter createFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime rCreatedAt = LocalDateTime.parse(createAtString, createFormatter);

            // updateAt
            String updateAtString = (String) row[13];
            DateTimeFormatter updateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime rUpdatedAt = LocalDateTime.parse(updateAtString, updateFormatter);

            // build
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

        // if bookMark is true
        if (mark.equals("true"))
            readPostOutDTOs.removeIf(element -> !element.getBookMarked());

        return readPostOutDTOs;
    }

    @Override
    public List<ReadPostOutDTO> FindPostAllUserDSLBy(String postTypes, String mark, Long userId, PostSort sort, String query, Long page, Long size, Long srcUserId) {
        List<PostType> postTypeList = Arrays.stream(postTypes.split(","))
                .map(PostType::valueOf)
                .toList();

        /*
        postType=text,img,sound,video
        &sort=DATE_ASC
        &query=하늘
        &page=4
        &size=10
        &userId=123
        &mark=true
        */
        List<ReadPostOutDTO> readPostOutDTOList = new JPAQuery<>(em)
                .select(Projections.constructor(ReadPostOutDTO.class,
                        qPost.postId,// postId()
                        qPost.user.userId,// userId()
                        qPost.user.userName,// userName()
                        qPost.postType,// postType()
                        qPost.content,// content()
                        qPost.url,// url()
                        qPost.likedCnt,// likedCnt()
                        qPost.bookMarkCnt,// bookMarkCnt()
                        qPost.commentCnt,// commentCnt()
                        Expressions.TRUE,// liked()
                        Expressions.TRUE,// bookMarked()
                        Expressions.TRUE,// subscribed()
                        qPost.createdAt,// createdAt()
                        qPost.updatedAt))
                .from(qPost)
                .where(qPost.postType.in(postTypeList))

                .orderBy()
                .fetch();
        return null;
    }


}
