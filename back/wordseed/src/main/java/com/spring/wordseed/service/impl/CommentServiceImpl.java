package com.spring.wordseed.service.impl;

import com.spring.wordseed.dto.in.CreateCommentInDTO;
import com.spring.wordseed.dto.out.CreateCommentOutDTO;
import com.spring.wordseed.entity.Comment;
import com.spring.wordseed.repo.CommentRepo;
import com.spring.wordseed.repo.PostRepo;
import com.spring.wordseed.repo.UserRepo;
import com.spring.wordseed.service.CommentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
}
