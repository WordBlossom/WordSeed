package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.*;
import com.spring.wordseed.dto.out.*;
import com.spring.wordseed.enu.PostSort;
import com.spring.wordseed.enu.PostType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface PostService {
    CreatePostOutDTO createPost(CreatePostInDTO createPostInDTO, Long srcUserId) throws Exception;
    ReadPostByPostIdOutDTOs readPostsWithWord(String postTypes, PostSort sort, Long page, Long size, Long srcUserId, Long wordId);
    ReadPostByPostIdOutDTOs readPostsWithSubs(String postTypes,  PostSort sort, Long page, Long size, Long srcUserId);
    ReadPostByPostIdOutDTOs readMyPosts(String postTypes,  PostSort sort, Long page, Long size, Long srcUserId);
    ReadPostByPostIdOutDTOs readMyPostsWithBookMark(String postTypes,  PostSort sort, Long page, Long size, Long srcUserId);
    ReadPostByPostIdOutDTOs readPostsWithUser(String postTypes,  Long userId, PostSort sort, Long page, Long size, Long srcUserId);
    ReadPostByPostIdOutDTO readPostByPostId(Long postId, Long srcUserId);
    UpdatePostOutDTO updatePost(UpdatePostInDTO updatePostInDTO, Long srcUserId) throws Exception;
    ReadCommentOutDTOs readComment(Long postId, Long page, Long size);
    void deletePost(DeletePostInDTO deletePostInDTO, Long userId) throws Exception;
}
