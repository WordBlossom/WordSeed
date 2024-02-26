package com.spring.wordseed.repo.custom;

import com.spring.wordseed.dto.out.ReadPostByPostIdOutDTO;
import com.spring.wordseed.dto.out.ReadPostOutDTO;
import com.spring.wordseed.entity.Post;
import com.spring.wordseed.enu.PostSort;
import com.spring.wordseed.enu.PostType;

import java.util.List;
import java.util.Optional;

public interface CustomPostRepo {
    ReadPostByPostIdOutDTO findPostByPostId(Long postId);
    List<ReadPostOutDTO> FindPostAllBy(String postTypes, String mark, Long userId, PostSort sort, String query, Long page, Long size);
    Optional<Post> findPostBy(Long postId, Long userId);
}
