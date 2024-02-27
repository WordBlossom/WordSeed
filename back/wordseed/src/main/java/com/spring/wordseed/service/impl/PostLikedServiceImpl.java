package com.spring.wordseed.service.impl;

import com.querydsl.jpa.impl.JPAQuery;
import com.spring.wordseed.dto.in.DeleteLikeInDTO;
import com.spring.wordseed.dto.in.CreateLikeInDTO;
import com.spring.wordseed.dto.out.CreateLikeOutDTO;
import com.spring.wordseed.entity.PostLiked;
import com.spring.wordseed.repo.PostLikedRepo;
import com.spring.wordseed.repo.PostRepo;
import com.spring.wordseed.repo.UserRepo;
import com.spring.wordseed.service.PostLikedService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PostLikedServiceImpl implements PostLikedService {
    private final PostLikedRepo postLikedRepo;
    private final UserRepo userRepo;
    private final PostRepo postRepo;

    public PostLikedServiceImpl(PostLikedRepo postLikedRepo, UserRepo userRepo, PostRepo postRepo) {
        this.postLikedRepo = postLikedRepo;
        this.userRepo = userRepo;
        this.postRepo = postRepo;
    }

    @Override
    public CreateLikeOutDTO createLike(CreateLikeInDTO createLikeInDTO, Long userId) throws Exception {
        PostLiked postLiked = PostLiked.builder()
                .user(userRepo.findById(userId).orElseThrow(Exception::new))
                .post(postRepo.findById(createLikeInDTO.getPostId()).orElseThrow(Exception::new))
                .build();

        postLikedRepo.save(postLiked);

        return CreateLikeOutDTO.builder()
                .postLikedId(postLiked.getPostLikedId())
                .userId(postLiked.getUser().getUserId())
                .postId(postLiked.getPost().getPostId())
                .createdAt(postLiked.getCreatedAt())
                .updatedAt(postLiked.getUpdatedAt())
                .build();
    }
  
    @Override
    public void deleteLike(DeleteLikeInDTO deleteLikeInDTO, Long userId) {
        PostLiked postLiked = postLikedRepo.FindPostLikedIdBy(userId, deleteLikeInDTO.getPostId());
        postLikedRepo.delete(postLiked);
    }
}
