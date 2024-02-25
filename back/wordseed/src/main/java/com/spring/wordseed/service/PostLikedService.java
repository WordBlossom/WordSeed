package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.DeleteLikeInDTO;

public interface PostLikedService {
    void deleteLike(DeleteLikeInDTO deleteLikeInDTO, Long userId);
}
