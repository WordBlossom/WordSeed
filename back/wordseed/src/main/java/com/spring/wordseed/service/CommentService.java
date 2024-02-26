package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.CreateCommentInDTO;
import com.spring.wordseed.dto.out.CreateCommentOutDTO;

public interface CommentService {
    CreateCommentOutDTO createComment(CreateCommentInDTO createCommentInDTO, Long userId) throws Exception;
}
