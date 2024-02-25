package com.spring.wordseed.service.impl;

import com.spring.wordseed.dto.in.UpdateCommentInDTO;
import com.spring.wordseed.dto.out.UpdateCommentOutDTO;
import com.spring.wordseed.entity.Comment;
import com.spring.wordseed.repo.CommentRepo;
import com.spring.wordseed.service.CommentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {
    private final CommentRepo commentRepo;

    public CommentServiceImpl(CommentRepo commentRepo) {
        this.commentRepo = commentRepo;
    }

    @Override
    public UpdateCommentOutDTO updateComment(UpdateCommentInDTO updateCommentInDTO) throws Exception {
        Comment comment = commentRepo.findById(updateCommentInDTO.getCommentId()).orElseThrow(Exception::new);
        comment.setContent(updateCommentInDTO.getContent());

        commentRepo.flush();

        return UpdateCommentOutDTO.builder()
                .commentId(comment.getCommentId())
                .userId(comment.getUser().getUserId())
                .postId(comment.getPost().getPostId())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }
}
