package com.spring.wordseed.service.impl;

import com.spring.wordseed.dto.in.*;
import com.spring.wordseed.dto.out.*;
import com.spring.wordseed.entity.Post;
import com.spring.wordseed.entity.User;
import com.spring.wordseed.entity.Word;
import com.spring.wordseed.enu.PostAlign;
import com.spring.wordseed.enu.PostSort;
import com.spring.wordseed.enu.PostType;
import com.spring.wordseed.enu.PostVisibility;
import com.spring.wordseed.repo.PostRepo;
import com.spring.wordseed.repo.UserRepo;
import com.spring.wordseed.repo.WordRepo;
import com.spring.wordseed.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
@Service
@Transactional
public class PostServiceImpl implements PostService {

    private final PostRepo postRepo;
    private final UserRepo userRepo;
    private final WordRepo wordRepo;

    @Autowired
    public PostServiceImpl(PostRepo postRepo, UserRepo userRepo, WordRepo wordRepo) {
        this.postRepo = postRepo;
        this.userRepo = userRepo;
        this.wordRepo = wordRepo;
    }

    @Override
    public CreatePostOutDTO createPost(CreatePostInDTO createPostInDTO) {
        Post post = Post.builder()
                .content(createPostInDTO.getContent())
                .url(createPostInDTO.getUrl())
                .postType(createPostInDTO.getPostType())
                .postAlign(createPostInDTO.getPostAlign())
                .postVisibility(createPostInDTO.getPostVisibility())
                .likedCnt(0L)
                .bookMarkCnt(0L)
                .commentCnt(0L)
                .user(userRepo.getById(3L)) // token 유입
                .word(wordRepo.getById(1L)) // word 유입
                .build();

        post.setCreatedAt(LocalDateTime.now());
        post.setUpdatedAt(LocalDateTime.now());

        Post result = postRepo.save(post);

        CreatePostOutDTO createPostOutDTO = CreatePostOutDTO.builder()
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
    public ReadPostOutDTOs readPosts(String postType, String mark, Long userId, PostSort sort, String query, Long page, Long size) {
        return null;
    }

    @Override
    public ReadPostByPostIdOutDTO readPostByPostId(Long postId) {
        return null;
    }

    @Override
    public UpdatePostOutDTO updatePost(UpdatePostInDTO updatePostInDTO) {
        return null;
    }

    @Override
    public void deletePost(DeletePostInDTO deletePostInDTO) {

    }

    @Override
    public CreateCommentOutDTO createPost(CreateCommentInDTO createCommentInDTO) {
        return null;
    }

    @Override
    public UpdateCommentOutDTO UpdatePost(UpdateCommentInDTO updateCommentInDTO) {
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
