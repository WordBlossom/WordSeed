package com.spring.wordseed.repo.custom;

import com.spring.wordseed.dto.out.ReadPostByPostIdOutDTO;
import com.spring.wordseed.dto.out.ReadPostOutDTO;
import com.spring.wordseed.enu.PostSort;

import java.util.List;

public interface CustomPostRepo {
    ReadPostByPostIdOutDTO findPostByPostId(Long postId);
    List<ReadPostOutDTO> findPostsWithWord(String postTypes, String mark, PostSort sort, String query, Long page, Long size, Long srcUserId, Long wordId); // 특정 말씨에 해당하는 모든 작품 목록
    List<ReadPostOutDTO> findPostsWithSubs(String postTypes, String mark, PostSort sort, String query, Long page, Long size, Long srcUserId); // 관심 작가 등록한 사람들의 작품 목록
    List<ReadPostOutDTO> findMyPosts(String postTypes, String mark, PostSort sort, String query, Long page, Long size, Long srcUserId); // 내 작품 목록
    List<ReadPostOutDTO> findMyPostsWithBookMark(String postTypes, String mark, PostSort sort, String query, Long page, Long size, Long srcUserId); // 내가 북마크한 작품 목록
    List<ReadPostOutDTO> findPostsWithUser(String postTypes, String mark, Long userId, PostSort sort, String query, Long page, Long size, Long srcUserId); // 특정 사용자에 대한 작품 목록
}
