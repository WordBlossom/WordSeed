package com.spring.wordseed.service.impl;

import com.spring.wordseed.dto.in.*;
import com.spring.wordseed.dto.out.*;
import com.spring.wordseed.entity.*;
import com.spring.wordseed.enu.PostSort;
import com.spring.wordseed.repo.CommentRepo;
import com.spring.wordseed.repo.PostRepo;
import com.spring.wordseed.repo.UserRepo;
import com.spring.wordseed.repo.WordRepo;
import com.spring.wordseed.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class PostServiceImpl implements PostService {

    private final PostRepo postRepo;
    private final UserRepo userRepo;
    private final WordRepo wordRepo;
    private final CommentRepo commentRepo;

    @Autowired
    public PostServiceImpl(PostRepo postRepo, UserRepo userRepo, WordRepo wordRepo, CommentRepo commentRepo) {
        this.postRepo = postRepo;
        this.userRepo = userRepo;
        this.wordRepo = wordRepo;
        this.commentRepo = commentRepo;
    }

    @Override
    public CreatePostOutDTO createPost(CreatePostInDTO createPostInDTO) throws Exception {

        Post post = Post.builder()
                .content(createPostInDTO.getContent())
                .url(createPostInDTO.getUrl())
                .postType(createPostInDTO.getPostType())
                .postAlign(createPostInDTO.getPostAlign())
                .postVisibility(createPostInDTO.getPostVisibility())
                .likedCnt(0L)
                .bookMarkCnt(0L)
                .commentCnt(0L)
                .user(userRepo.findById(3L).orElseThrow(Exception::new)) // token 유입
                .word(wordRepo.findById(1L).orElseThrow(Exception::new)) // word 유입
                .build();

        Post result = postRepo.save(post);

        CreatePostOutDTO createPostOutDTO =
                CreatePostOutDTO.builder()
                        .content(result.getContent())
                        .postId(result.getPostId())
                        .url(result.getUrl())
                        .postType(result.getPostType())
                        .postAlign(result.getPostAlign())
                        .postVisibility(result.getPostVisibility())
                        .likedCnt(result.getLikedCnt())
                        .bookMarkCnt(result.getBookMarkCnt())
                        .commentCnt(result.getCommentCnt())
                        .userId(result.getUser().getUserId())
                        .wordId(result.getWord().getWordId())
                        .createdAt(result.getCreatedAt())
                        .updatedAt(result.getUpdatedAt())
                        .word("use join")
                        .build();

        return createPostOutDTO;
    }

    @Override
    public ReadPostOutDTOs readPosts(String postTypes, String mark, Long userId, PostSort sort, String query, Long page, Long size) {
        List<ReadPostOutDTO> readPostOutDTOs = postRepo.FindPostAllBy(postTypes, mark, userId, sort, query, page, size);

        ReadPostOutDTOs posts = ReadPostOutDTOs.builder().posts(new ArrayList<>()).build();

        for (ReadPostOutDTO readPostOutDTO : readPostOutDTOs)
            posts.getPosts().add(readPostOutDTO);

        return posts;
    }

    @Override
    public ReadPostByPostIdOutDTO readPostByPostId(Long postId) {
        ReadPostByPostIdOutDTO readPostByPostIdOutDTO = postRepo.findPostByPostId(postId);
        return readPostByPostIdOutDTO;
    }

    @Override
    public UpdatePostOutDTO updatePost(UpdatePostInDTO updatePostInDTO) throws Exception {
        Post post = postRepo.findById(updatePostInDTO.getPostId()).orElseThrow(Exception::new);

        post.setPostId(updatePostInDTO.getPostId());
        post.setContent(updatePostInDTO.getContent());
        post.setUrl(updatePostInDTO.getUrl());
        post.setPostType(updatePostInDTO.getPostType());
        post.setPostAlign(updatePostInDTO.getPostAlign());
        post.setPostVisibility(updatePostInDTO.getPostVisibility());

        ReadPostByPostIdOutDTO readPostByPostIdOutDTO = postRepo.findPostByPostId(post.getPostId());

        return UpdatePostOutDTO.builder()
                .postId(readPostByPostIdOutDTO.getPostId())
                .userId(readPostByPostIdOutDTO.getUserId())
                .postType(readPostByPostIdOutDTO.getPostType())
                .postAlign(readPostByPostIdOutDTO.getPostAlign())
                .postVisibility(readPostByPostIdOutDTO.getPostVisibility())
                .content(readPostByPostIdOutDTO.getContent())
                .url(readPostByPostIdOutDTO.getUrl())
                .likedCnt(readPostByPostIdOutDTO.getLikedCnt())
                .BookMarkCnt(readPostByPostIdOutDTO.getBookMarkCnt())
                .commentCnt(readPostByPostIdOutDTO.getCommentCnt())
                .liked(readPostByPostIdOutDTO.getLiked())
                .bookMarked(readPostByPostIdOutDTO.getBookMarked())
                .wordId(readPostByPostIdOutDTO.getWordId())
                .word(readPostByPostIdOutDTO.getWord())
                .createdAt(readPostByPostIdOutDTO.getCreatedAt())
                .updatedAt(readPostByPostIdOutDTO.getUpdatedAt())
                .build();
    }

    @Override
    public void deletePost(DeletePostInDTO deletePostInDTO, Long userId) throws Exception {
        Post post = postRepo.findPostBy(deletePostInDTO.getPostId(), userId).orElseThrow(Exception::new);
        postRepo.delete(post);
    }



    @Override
    public UpdateCommentOutDTO UpdateComment(UpdateCommentInDTO updateCommentInDTO) {
        return null;
    }

    @Override
    public void deleteComment(DeleteCommentInDTO deleteCommentInDTO) {

    }

    @Override
    public CreateLikeOutDTO createLike(CreateLikeInDTO createLikeInDTO) {
        return null;
    }

    @Override
    public void deleteLike(DeleteLikeInDTO deleteLikeInDTO) {

    }

    @Override
    public CreateBookMarkOutDTO createBookMark(CreateBookMarkInDTO createBookMarkInDTO) {
        return null;
    }

    @Override
    public void deleteBookMark(DeleteBookMarkInDTO deleteBookMarkInDTO) {

    }
}
