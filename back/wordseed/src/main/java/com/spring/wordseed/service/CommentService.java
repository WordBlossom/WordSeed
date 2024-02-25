package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.DeleteCommentInDTO;

public interface CommentService {
    void deleteComment(DeleteCommentInDTO deleteCommentInDTO) throws Exception;
}
