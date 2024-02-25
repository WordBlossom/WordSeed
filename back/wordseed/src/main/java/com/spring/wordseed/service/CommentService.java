package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.UpdateCommentInDTO;
import com.spring.wordseed.dto.out.UpdateCommentOutDTO;

public interface CommentService {

    UpdateCommentOutDTO updateComment(UpdateCommentInDTO updateCommentInDTO) throws Exception;
}
