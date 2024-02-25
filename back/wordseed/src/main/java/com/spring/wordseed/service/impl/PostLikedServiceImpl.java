package com.spring.wordseed.service.impl;

import com.querydsl.jpa.impl.JPAQuery;
import com.spring.wordseed.dto.in.DeleteLikeInDTO;
import com.spring.wordseed.entity.PostLiked;
import com.spring.wordseed.repo.PostLikedRepo;
import com.spring.wordseed.service.PostLikedService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PostLikedServiceImpl implements PostLikedService {
    private final PostLikedRepo postLikedRepo;

    public PostLikedServiceImpl(PostLikedRepo postLikedRepo) {
        this.postLikedRepo = postLikedRepo;
    }

    @Override
    public void deleteLike(DeleteLikeInDTO deleteLikeInDTO, Long userId) {
        PostLiked postLiked = postLikedRepo.FindPostLikedIdBy(userId, deleteLikeInDTO.getPostId());
        postLikedRepo.delete(postLiked);
    }
}
