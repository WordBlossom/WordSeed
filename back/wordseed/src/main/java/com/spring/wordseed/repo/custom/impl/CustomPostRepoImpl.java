package com.spring.wordseed.repo.custom.impl;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.spring.wordseed.dto.out.ReadCommentOutDTO;
import com.spring.wordseed.dto.out.ReadPostByPostIdOutDTO;
import com.spring.wordseed.dto.out.ReadPostOutDTO;
import com.spring.wordseed.dto.out.ReadPostOutDTOs;
import com.spring.wordseed.entity.*;
import com.spring.wordseed.enu.PostSort;
import com.spring.wordseed.enu.PostType;
import com.spring.wordseed.enu.PostVisibility;
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
import java.util.Optional;

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
    private final QComment qComment = QComment.comment;

    @Override
    public ReadPostByPostIdOutDTO findPostByPostId(Long postId, Long srcUserId) {
        BooleanExpression likedExpression = JPAExpressions
                .selectOne()
                .from(qPost)
                .join(qPost.postLikeds, qPostLiked)
                .where(qPostLiked.user.userId.eq(srcUserId))
                .where(qPost.postId.eq(postId))
                .exists();

        BooleanExpression bookMarkedExpression = JPAExpressions
                .selectOne()
                .from(qPost)
                .join(qPost.bookMarks, qBookMark)
                .where(qBookMark.user.userId.eq(srcUserId))
                .where(qPost.postId.eq(postId))
                .exists();

        BooleanExpression subscribedExpression = JPAExpressions
                .selectOne()
                .from(qFollow)
                .join(qFollow.srcUser, qUser)
                .join(qFollow.dstUser, qUser2)
                .join(qUser2.posts, qPost)
                .where(qUser.userId.eq(srcUserId))
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
    // 특정 말씨에 해당하는 모든 작품 목록
    public List<ReadPostByPostIdOutDTO> findPostsWithWord(String postTypes, String mark, PostSort sort, String query, Long page, Long size, Long srcUserId, Long wordId) {
        List<PostType> postTypeList = Arrays.stream(postTypes.split(","))
                .map(PostType::valueOf)
                .toList();

        List<ReadPostByPostIdOutDTO> readPostByPostIdOutDTOList = new JPAQuery<>(em)
                .select(Projections.constructor(ReadPostByPostIdOutDTO.class,
                        qPost.postId,
                        qPost.user.userId,
                        qPost.user.userName,
                        qPost.postType,
                        qPost.postAlign,
                        qPost.postVisibility,
                        qPost.content,
                        qPost.url,
                        qPost.likedCnt,
                        qPost.bookMarkCnt,
                        qPost.commentCnt,
                        Expressions.TRUE,
                        Expressions.TRUE,
                        Expressions.TRUE,
                        qPost.word.wordId,
                        qPost.word.word,
                        qPost.createdAt,
                        qPost.updatedAt))
                .from(qPost)
                .where(qPost.word.wordId.eq(wordId))
                .where(qPost.postType.in(postTypeList))
                .where(qPost.postVisibility.eq(PostVisibility.PUBLIC).or(qPost.user.userId.eq(srcUserId)))
                .where((query == null || query.trim().length() == 0) ? Expressions.TRUE : qPost.word.word.eq(query))
                .offset((page - 1) * size)
                .limit(size)
                .orderBy(switch(sort){
                    case DATE_ASC -> qPost.createdAt.asc();
                    case DATE_DSC -> qPost.createdAt.desc();
                    case LIKE_ASC -> qPost.likedCnt.asc();
                    case LIKE_DSC -> qPost.likedCnt.desc();
                })
                .fetch();

        for (ReadPostByPostIdOutDTO readPostByPostIdOutDTO : readPostByPostIdOutDTOList){
            Post likedExpression = new JPAQuery<>(em)
                    .select(qPost)
                    .from(qPost)
                    .join(qPost.postLikeds, qPostLiked)
                    .where(qPostLiked.user.userId.eq(srcUserId))
                    .where(qPost.postId.eq(readPostByPostIdOutDTO.getPostId()))
                    .fetchOne();

            Post bookMarkedExpression = new JPAQuery<>(em)
                    .select(qPost)
                    .from(qPost)
                    .join(qPost.bookMarks, qBookMark)
                    .where(qBookMark.user.userId.eq(srcUserId))
                    .where(qPost.postId.eq(readPostByPostIdOutDTO.getPostId()))
                    .fetchOne();

            Follow subscribedExpression = new JPAQuery<>(em)
                    .select(qFollow)
                    .from(qFollow)
                    .where(qFollow.srcUser.userId.eq(srcUserId))
                    .where(qFollow.dstUser.userId.eq(readPostByPostIdOutDTO.getPostId()))
                    .fetchOne();

            readPostByPostIdOutDTO.setLiked(likedExpression != null);
            readPostByPostIdOutDTO.setBookMarked(bookMarkedExpression != null);
            readPostByPostIdOutDTO.setSubscribed(subscribedExpression != null);
        }

        if (mark.equals("true"))
            readPostByPostIdOutDTOList.removeIf(el -> !el.getBookMarked());

        return readPostByPostIdOutDTOList;
    }



    @Override
    // 관심 작가 등록한 사람들의 작품 목록
    public List<ReadPostByPostIdOutDTO> findPostsWithSubs(String postTypes, String mark, PostSort sort, String query, Long page, Long size, Long srcUserId) {
        List<PostType> postTypeList = Arrays.stream(postTypes.split(","))
                .map(PostType::valueOf)
                .toList();

        List<ReadPostByPostIdOutDTO> readPostByPostIdOutDTOList = new JPAQuery<>(em)
                .select(Projections.constructor(ReadPostByPostIdOutDTO.class,
                        qPost.postId,
                        qPost.user.userId,
                        qPost.user.userName,
                        qPost.postType,
                        qPost.postAlign,
                        qPost.postVisibility,
                        qPost.content,
                        qPost.url,
                        qPost.likedCnt,
                        qPost.bookMarkCnt,
                        qPost.commentCnt,
                        Expressions.TRUE,
                        Expressions.TRUE,
                        Expressions.TRUE,
                        qPost.word.wordId,
                        qPost.word.word,
                        qPost.createdAt,
                        qPost.updatedAt))
                .from(qUser)
                .join(qUser.srcUsers, qFollow)
                .join(qPost)
                .on(qFollow.dstUser.userId.eq(qPost.user.userId))
                .where(qUser.userId.eq(srcUserId))
                .where(qPost.postType.in(postTypeList))
                .where(qPost.postVisibility.eq(PostVisibility.PUBLIC))
                .where((query == null || query.trim().length() == 0) ? Expressions.TRUE : qPost.word.word.eq(query))
                .offset((page - 1) * size)
                .limit(size)
                .orderBy(switch(sort){
                    case DATE_ASC -> qPost.createdAt.asc();
                    case DATE_DSC -> qPost.createdAt.desc();
                    case LIKE_ASC -> qPost.likedCnt.asc();
                    case LIKE_DSC -> qPost.likedCnt.desc();
                })
                .fetch();

        for (ReadPostByPostIdOutDTO readPostByPostIdOutDTO : readPostByPostIdOutDTOList){
            Post likedExpression = new JPAQuery<>(em)
                    .select(qPost)
                    .from(qPost)
                    .join(qPost.postLikeds, qPostLiked)
                    .where(qPostLiked.user.userId.eq(srcUserId))
                    .where(qPost.postId.eq(readPostByPostIdOutDTO.getPostId()))
                    .fetchOne();

            Post bookMarkedExpression = new JPAQuery<>(em)
                    .select(qPost)
                    .from(qPost)
                    .join(qPost.bookMarks, qBookMark)
                    .where(qBookMark.user.userId.eq(srcUserId))
                    .where(qPost.postId.eq(readPostByPostIdOutDTO.getPostId()))
                    .fetchOne();

            readPostByPostIdOutDTO.setLiked(likedExpression != null);
            readPostByPostIdOutDTO.setBookMarked(bookMarkedExpression != null);
            readPostByPostIdOutDTO.setSubscribed(true);
        }

        if (mark.equals("true"))
            readPostByPostIdOutDTOList.removeIf(el -> !el.getBookMarked());

        return readPostByPostIdOutDTOList;
    }

    @Override
    // 내 작품 목록
    public List<ReadPostByPostIdOutDTO> findMyPosts(String postTypes, String mark, PostSort sort, String query, Long page, Long size, Long srcUserId) {
        List<PostType> postTypeList = Arrays.stream(postTypes.split(","))
                .map(PostType::valueOf)
                .toList();

        List<ReadPostByPostIdOutDTO> readPostByPostIdOutDTOList = new JPAQuery<>(em)
                .select(Projections.constructor(ReadPostByPostIdOutDTO.class,
                        qPost.postId,
                        qPost.user.userId,
                        qPost.user.userName,
                        qPost.postType,
                        qPost.postAlign,
                        qPost.postVisibility,
                        qPost.content,
                        qPost.url,
                        qPost.likedCnt,
                        qPost.bookMarkCnt,
                        qPost.commentCnt,
                        Expressions.TRUE,
                        Expressions.TRUE,
                        Expressions.TRUE,
                        qPost.word.wordId,
                        qPost.word.word,
                        qPost.createdAt,
                        qPost.updatedAt))
                .from(qPost)
                .where(qPost.postType.in(postTypeList))
                .where(qPost.user.userId.eq(srcUserId))
                .where((query == null || query.trim().length() == 0) ? Expressions.TRUE : qPost.word.word.eq(query))
                .offset((page - 1) * size)
                .limit(size)
                .orderBy(switch(sort){
                    case DATE_ASC -> qPost.createdAt.asc();
                    case DATE_DSC -> qPost.createdAt.desc();
                    case LIKE_ASC -> qPost.likedCnt.asc();
                    case LIKE_DSC -> qPost.likedCnt.desc();
                })
                .fetch();

        for (ReadPostByPostIdOutDTO readPostByPostIdOutDTO : readPostByPostIdOutDTOList){
            Post likedExpression = new JPAQuery<>(em)
                    .select(qPost)
                    .from(qPost)
                    .join(qPost.postLikeds, qPostLiked)
                    .where(qPostLiked.user.userId.eq(srcUserId))
                    .where(qPost.postId.eq(readPostByPostIdOutDTO.getPostId()))
                    .fetchOne();

            Post bookMarkedExpression = new JPAQuery<>(em)
                    .select(qPost)
                    .from(qPost)
                    .join(qPost.bookMarks, qBookMark)
                    .where(qBookMark.user.userId.eq(srcUserId))
                    .where(qPost.postId.eq(readPostByPostIdOutDTO.getPostId()))
                    .fetchOne();

            readPostByPostIdOutDTO.setLiked(likedExpression != null);
            readPostByPostIdOutDTO.setBookMarked(bookMarkedExpression != null);

        }

        if (mark.equals("true"))
            readPostByPostIdOutDTOList.removeIf(el -> !el.getBookMarked());

        return readPostByPostIdOutDTOList;
    }

    @Override
    // 내가 북마크한 작품 목록
    public List<ReadPostByPostIdOutDTO> findMyPostsWithBookMark(String postTypes, String mark, PostSort sort, String query, Long page, Long size, Long srcUserId) {
        List<PostType> postTypeList = Arrays.stream(postTypes.split(","))
                .map(PostType::valueOf)
                .toList();

        List<ReadPostByPostIdOutDTO> readPostByPostIdOutDTOList = new JPAQuery<>(em)
                .select(Projections.constructor(ReadPostByPostIdOutDTO.class,
                        qPost.postId,
                        qPost.user.userId,
                        qPost.user.userName,
                        qPost.postType,
                        qPost.postAlign,
                        qPost.postVisibility,
                        qPost.content,
                        qPost.url,
                        qPost.likedCnt,
                        qPost.bookMarkCnt,
                        qPost.commentCnt,
                        Expressions.TRUE,
                        Expressions.TRUE,
                        Expressions.TRUE,
                        qPost.word.wordId,
                        qPost.word.word,
                        qPost.createdAt,
                        qPost.updatedAt))
                .from(qUser)
                .join(qUser.bookMarks, qBookMark)
                .join(qBookMark.post, qPost)
                .where(qUser.userId.eq(srcUserId))
                .where(qPost.postType.in(postTypeList))
                .where(qPost.postVisibility.eq(PostVisibility.PUBLIC).or(qPost.user.userId.eq(srcUserId)))
                .where((query == null || query.trim().length() == 0) ? Expressions.TRUE : qPost.word.word.eq(query))
                .offset((page - 1) * size)
                .limit(size)
                .orderBy(switch(sort){
                    case DATE_ASC -> qPost.createdAt.asc();
                    case DATE_DSC -> qPost.createdAt.desc();
                    case LIKE_ASC -> qPost.likedCnt.asc();
                    case LIKE_DSC -> qPost.likedCnt.desc();
                })
                .fetch();

        for (ReadPostByPostIdOutDTO readPostByPostIdOutDTO : readPostByPostIdOutDTOList){
            Post likedExpression = new JPAQuery<>(em)
                    .select(qPost)
                    .from(qPost)
                    .join(qPost.postLikeds, qPostLiked)
                    .where(qPostLiked.user.userId.eq(srcUserId))
                    .where(qPost.postId.eq(readPostByPostIdOutDTO.getPostId()))
                    .fetchOne();

            Follow subscribedExpression = new JPAQuery<>(em)
                    .select(qFollow)
                    .from(qFollow)
                    .where(qFollow.srcUser.userId.eq(srcUserId))
                    .where(qFollow.dstUser.userId.eq(readPostByPostIdOutDTO.getUserId()))
                    .fetchOne();

            readPostByPostIdOutDTO.setLiked(likedExpression != null);
            readPostByPostIdOutDTO.setBookMarked(true);
            readPostByPostIdOutDTO.setSubscribed(subscribedExpression != null);
        }

        if (mark.equals("true"))
            readPostByPostIdOutDTOList.removeIf(el -> !el.getBookMarked());

        return readPostByPostIdOutDTOList;
    }


    @Override
    // 특정 사용자에 대한 작품 목록
    public List<ReadPostByPostIdOutDTO> findPostsWithUser(String postTypes, String mark, Long userId, PostSort sort, String query, Long page, Long size, Long srcUserId) {
        List<PostType> postTypeList = Arrays.stream(postTypes.split(","))
                .map(PostType::valueOf)
                .toList();

        List<ReadPostByPostIdOutDTO> readPostByPostIdOutDTOList = new JPAQuery<>(em)
                .select(Projections.constructor(ReadPostByPostIdOutDTO.class,
                        qPost.postId,
                        qPost.user.userId,
                        qPost.user.userName,
                        qPost.postType,
                        qPost.postAlign,
                        qPost.postVisibility,
                        qPost.content,
                        qPost.url,
                        qPost.likedCnt,
                        qPost.bookMarkCnt,
                        qPost.commentCnt,
                        Expressions.TRUE,
                        Expressions.TRUE,
                        Expressions.TRUE,
                        qPost.word.wordId,
                        qPost.word.word,
                        qPost.createdAt,
                        qPost.updatedAt))
                .from(qPost)
                .where(qPost.user.userId.eq(userId))
                .where(qPost.postType.in(postTypeList))
                .where(qPost.postVisibility.eq(PostVisibility.PUBLIC).or(qPost.user.userId.eq(srcUserId)))
                .where((query == null || query.trim().length() == 0) ? Expressions.TRUE : qPost.word.word.eq(query))
                .offset((page - 1) * size)
                .limit(size)
                .orderBy(switch(sort){
                    case DATE_ASC -> qPost.createdAt.asc();
                    case DATE_DSC -> qPost.createdAt.desc();
                    case LIKE_ASC -> qPost.likedCnt.asc();
                    case LIKE_DSC -> qPost.likedCnt.desc();
                })
                .fetch();

        Follow subscribedExpression = new JPAQuery<>(em)
                .select(qFollow)
                .from(qFollow)
                .where(qFollow.srcUser.userId.eq(srcUserId))
                .where(qFollow.dstUser.userId.eq(userId))
                .fetchOne();

        for (ReadPostByPostIdOutDTO readPostByPostIdOutDTO : readPostByPostIdOutDTOList){
            Post likedExpression = new JPAQuery<>(em)
                    .select(qPost)
                    .from(qPost)
                    .join(qPost.postLikeds, qPostLiked)
                    .where(qPostLiked.user.userId.eq(srcUserId))
                    .where(qPost.postId.eq(readPostByPostIdOutDTO.getPostId()))
                    .fetchOne();

            Post bookMarkedExpression = new JPAQuery<>(em)
                    .select(qPost)
                    .from(qPost)
                    .join(qPost.bookMarks, qBookMark)
                    .where(qBookMark.user.userId.eq(srcUserId))
                    .where(qPost.postId.eq(readPostByPostIdOutDTO.getPostId()))
                    .fetchOne();

            readPostByPostIdOutDTO.setLiked(likedExpression != null);
            readPostByPostIdOutDTO.setBookMarked(bookMarkedExpression != null);
            readPostByPostIdOutDTO.setSubscribed(subscribedExpression != null);
        }

        if (mark.equals("true"))
            readPostByPostIdOutDTOList.removeIf(el -> !el.getBookMarked());

        return readPostByPostIdOutDTOList;
    }

    public List<ReadCommentOutDTO> findCommentAllBy(Long postId, Long page, Long size) {
        List<ReadCommentOutDTO> ReadCommentOutDTOList = new JPAQuery<>(em)
                .select(Projections.constructor(ReadCommentOutDTO.class,
                        qComment.commentId,
                        qComment.user.userId,
                        qComment.post.postId,
                        qComment.content,
                        qComment.createdAt))
                .from(qComment)
                .where(qComment.post.postId.eq(postId))
                .orderBy(qComment.createdAt.desc())
                .offset((page - 1) * size)
                .limit(size)
                .fetch();

        return ReadCommentOutDTOList;
    }
  
    @Override
    public Optional<Post> findPostBy(Long postId, Long userId) {
        Post post = new JPAQuery<>(em)
                .select(qPost)
                .from(qPost)
                .where(qPost.postId.eq(postId))
                .where(qPost.user.userId.eq(userId))
                .fetchOne();

        return Optional.ofNullable(post);
    }
}
