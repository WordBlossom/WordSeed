package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.*;
import com.spring.wordseed.dto.out.*;
import com.spring.wordseed.enu.PostSort;
import com.spring.wordseed.enu.PostType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface PostService {
    CreatePostOutDTO createPost(CreatePostInDTO createPostInDTO) throws Exception;
    ReadPostOutDTOs readPostsWithWord(String postTypes, String mark, PostSort sort, String query, Long page, Long size, Long srcUserId, Long wordId);
    ReadPostOutDTOs readPostsWithSubs(String postTypes, String mark, PostSort sort, String query, Long page, Long size, Long srcUserId);
    ReadPostOutDTOs readMyPosts(String postTypes, String mark, PostSort sort, String query, Long page, Long size, Long srcUserId);
    ReadPostOutDTOs readMyPostsWithBookMark(String postTypes, String mark, PostSort sort, String query, Long page, Long size, Long srcUserId);
    ReadPostOutDTOs readPostsWithUser(String postTypes, String mark, Long userId, PostSort sort, String query, Long page, Long size, Long srcUserId);
    ReadPostByPostIdOutDTO readPostByPostId(Long postId);
    UpdatePostOutDTO updatePost(UpdatePostInDTO updatePostInDTO) throws Exception;
    ReadCommentOutDTOs readComment(Long postId, Long page, Long size);
    void deletePost(DeletePostInDTO deletePostInDTO, Long userId) throws Exception;
}
