package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.CreateLikeInDTO;
import com.spring.wordseed.dto.out.CreateLikeOutDTO;

public interface PostLikedService {

    CreateLikeOutDTO createLike(CreateLikeInDTO createLikeInDTO, Long userId) throws Exception;
}
