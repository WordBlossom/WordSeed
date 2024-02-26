package com.spring.wordseed.service.impl;

import com.spring.wordseed.dto.in.CreateFollowInDTO;
import com.spring.wordseed.entity.Follow;
import com.spring.wordseed.entity.User;
import com.spring.wordseed.repo.FollowRepo;
import com.spring.wordseed.repo.UserRepo;
import com.spring.wordseed.service.FollowService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FollowServiceImpl implements FollowService {
    private final FollowRepo followRepo;
    private final UserRepo userRepo;

    public FollowServiceImpl(FollowRepo followRepo, UserRepo userRepo) {
        this.followRepo = followRepo;
        this.userRepo = userRepo;
    }

    @Override
    public void createFollow(CreateFollowInDTO createFollowInDTO) throws Exception {
        if(createFollowInDTO.getSrcUserId() == createFollowInDTO.getDstUserId())
            throw new IllegalArgumentException();
        User srcUser = userRepo.findById(createFollowInDTO.getSrcUserId())
                .orElseThrow(IllegalArgumentException::new);
        User dstUser = userRepo.findById(createFollowInDTO.getDstUserId())
                .orElseThrow(IllegalArgumentException::new);
        Follow follow = Follow.builder()
                .srcUser(srcUser)
                .dstUser(dstUser)
                .build();
        followRepo.save(follow);
    }
}
