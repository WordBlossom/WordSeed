package com.spring.wordseed.repo.custom;

import com.spring.wordseed.dto.out.ReadPostByPostIdOutDTO;

public interface CustomPostRepo {
    ReadPostByPostIdOutDTO findPostByPostId(Long postId);
}
