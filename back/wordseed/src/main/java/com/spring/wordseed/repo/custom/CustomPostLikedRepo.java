package com.spring.wordseed.repo.custom;

import com.spring.wordseed.dto.out.ReadPostByPostIdOutDTO;
import com.spring.wordseed.dto.out.ReadPostOutDTO;
import com.spring.wordseed.entity.PostLiked;
import com.spring.wordseed.enu.PostSort;

import java.util.List;

public interface CustomPostLikedRepo {
    PostLiked FindPostLikedIdBy(Long userId, Long postId);
}
