package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.UpdateCommentInDTO;
import com.spring.wordseed.dto.out.UpdateCommentOutDTO;
import com.spring.wordseed.dto.in.CreateCommentInDTO;
import com.spring.wordseed.dto.out.CreateCommentOutDTO;
import com.spring.wordseed.dto.in.DeleteCommentInDTO;

public interface CommentService {
    UpdateCommentOutDTO updateComment(UpdateCommentInDTO updateCommentInDTO) throws Exception;
    CreateCommentOutDTO createComment(CreateCommentInDTO createCommentInDTO, Long userId) throws Exception;
    void deleteComment(DeleteCommentInDTO deleteCommentInDTO) throws Exception;
}
