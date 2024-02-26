package com.spring.wordseed.service.impl;

import com.spring.wordseed.dto.in.CreateFollowInDTO;
import com.spring.wordseed.dto.in.DeleteFollowInDTO;
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
        long srcUserId = createFollowInDTO.getSrcUserId();
        long dstUserId = createFollowInDTO.getDstUserId();
        if(srcUserId == dstUserId)
            throw new IllegalArgumentException();
        User srcUser = userRepo.findById(srcUserId)
                .orElseThrow(IllegalArgumentException::new);
        User dstUser = userRepo.findById(dstUserId)
                .orElseThrow(IllegalArgumentException::new);
        Follow follow = Follow.builder()
                .srcUser(srcUser)
                .dstUser(dstUser)
                .build();
        followRepo.save(follow);
    }

    @Override
    public void deleteFollow(DeleteFollowInDTO deleteFollowInDTO) throws Exception {
        long srcUserId = deleteFollowInDTO.getSrcUserId();
        long dstUserId = deleteFollowInDTO.getDstUserId();
        if(srcUserId == dstUserId)
            throw new IllegalArgumentException();
        followRepo.deleteFollowByIds(srcUserId, dstUserId);
    }
}
