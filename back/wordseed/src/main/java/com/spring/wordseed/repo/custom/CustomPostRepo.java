package com.spring.wordseed.repo.custom;

import com.spring.wordseed.dto.out.ReadCommentOutDTO;
import com.spring.wordseed.dto.out.ReadPostByPostIdOutDTO;
import com.spring.wordseed.dto.out.ReadPostOutDTO;
import com.spring.wordseed.entity.Comment;
import com.spring.wordseed.entity.Post;
import com.spring.wordseed.enu.PostSort;

import java.util.List;
import java.util.Optional;

public interface CustomPostRepo {
    ReadPostByPostIdOutDTO findPostByPostId(Long postId, Long srcUserId);
    Optional<List<ReadPostByPostIdOutDTO>> findPostsWithWord(String postTypes, PostSort sort, Long page, Long size, Long srcUserId, Long wordId); // 특정 말씨에 해당하는 모든 작품 목록
    Optional<List<ReadPostByPostIdOutDTO>> findPostsWithSubs(String postTypes,  PostSort sort, Long page, Long size, Long srcUserId); // 관심 작가 등록한 사람들의 작품 목록
    Optional<List<ReadPostByPostIdOutDTO>> findMyPosts(String postTypes,  PostSort sort, Long page, Long size, Long srcUserId); // 내 작품 목록
    Optional<List<ReadPostByPostIdOutDTO>> findMyPostsWithBookMark(String postTypes,  PostSort sort, Long page, Long size, Long srcUserId); // 내가 북마크한 작품 목록
    Optional<List<ReadPostByPostIdOutDTO>> findPostsWithUser(String postTypes,  Long userId, PostSort sort, Long page, Long size, Long srcUserId); // 특정 사용자에 대한 작품 목록
    List<ReadCommentOutDTO> findCommentAllBy(Long postId, Long page, Long size);
    Optional<Post> findPostBy(Long postId, Long userId);
}
