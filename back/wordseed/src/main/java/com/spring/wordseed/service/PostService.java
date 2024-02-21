package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.*;
import com.spring.wordseed.dto.out.*;
import com.spring.wordseed.enu.PostSort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface PostService {
    CreatePostOutDTO createPost(CreatePostInDTO createPostInDTO) throws Exception;
    ReadPostOutDTOs readPosts(String postType, String mark, Long userId, PostSort sort, String query, Long page, Long size);
    ReadPostByPostIdOutDTO readPostByPostId(Long postId);
    UpdatePostOutDTO updatePost(UpdatePostInDTO updatePostInDTO);
    void deletePost(DeletePostInDTO deletePostInDTO);
    CreateCommentOutDTO createPost(CreateCommentInDTO createCommentInDTO);
    UpdateCommentOutDTO UpdatePost(UpdateCommentInDTO updateCommentInDTO);
    void deleteComment(DeleteCommentInDTO deleteCommentInDTO);
    CreateLikeOutDTO createLike(CreateLikeInDTO createLikeInDTO);
    void deleteLike(DeleteLikeInDTO deleteLikeInDTO);
    CreateBookMarkOutDTO createBookMark(CreateBookMarkInDTO createBookMarkInDTO);
    void deleteBookMark(DeleteBookMarkInDTO deleteBookMarkInDTO);
}
