package com.spring.wordseed.service.impl;

import com.spring.wordseed.dto.in.UpdateCommentInDTO;
import com.spring.wordseed.dto.out.UpdateCommentOutDTO;
import com.spring.wordseed.dto.in.CreateCommentInDTO;
import com.spring.wordseed.dto.out.CreateCommentOutDTO;
import com.spring.wordseed.dto.in.DeleteCommentInDTO;
import com.spring.wordseed.entity.Comment;
import com.spring.wordseed.repo.CommentRepo;
import com.spring.wordseed.repo.PostRepo;
import com.spring.wordseed.repo.UserRepo;
import com.spring.wordseed.service.CommentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {
    private final CommentRepo commentRepo;
    private final UserRepo userRepo;
    private final PostRepo postRepo;

    public CommentServiceImpl(CommentRepo commentRepo, UserRepo userRepo, PostRepo postRepo) {
        this.commentRepo = commentRepo;
        this.userRepo = userRepo;
        this.postRepo = postRepo;
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

    @Override
    public CreateCommentOutDTO createComment(CreateCommentInDTO createCommentInDTO, Long userId) throws Exception {
        Comment comment = Comment.builder()
                .content(createCommentInDTO.getContent())
                .user(userRepo.findById(userId).orElseThrow(Exception::new))
                .post(postRepo.findById(createCommentInDTO.getPostId()).orElseThrow(Exception::new))
                .build();

        commentRepo.save(comment);

        return CreateCommentOutDTO.builder()
                .commentId(comment.getCommentId())
                .userId(comment.getUser().getUserId())
                .postId(comment.getPost().getPostId())
                .content(comment.getContent())
                .createdAt(comment.getCreatedAt())
                .updatedAt(comment.getUpdatedAt())
                .build();
    }
  
    @Override
    public void deleteComment(DeleteCommentInDTO deleteCommentInDTO) throws Exception {
        Comment comment = commentRepo.findById(deleteCommentInDTO.getCommentId()).orElseThrow(Exception::new);
        commentRepo.delete(comment);
    }
}
