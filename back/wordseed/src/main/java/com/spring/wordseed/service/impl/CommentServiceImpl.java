package com.spring.wordseed.service.impl;

import com.spring.wordseed.dto.in.DeleteCommentInDTO;
import com.spring.wordseed.entity.Comment;
import com.spring.wordseed.repo.CommentRepo;
import com.spring.wordseed.service.CommentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {
    private final CommentRepo commentRepo;

    public CommentServiceImpl(CommentRepo commentRepo) {
        this.commentRepo = commentRepo;
    }

    @Override
    public void deleteComment(DeleteCommentInDTO deleteCommentInDTO) throws Exception {
        Comment comment = commentRepo.findById(deleteCommentInDTO.getCommentId()).orElseThrow(Exception::new);
        commentRepo.delete(comment);
    }
}
