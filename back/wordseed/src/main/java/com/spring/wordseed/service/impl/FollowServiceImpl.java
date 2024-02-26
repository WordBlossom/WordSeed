package com.spring.wordseed.service.impl;

import com.spring.wordseed.dto.in.CreateFollowInDTO;
import com.spring.wordseed.dto.in.DeleteFollowInDTO;
import com.spring.wordseed.entity.Follow;
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
        if(srcUserId == dstUserId) throw new IllegalArgumentException();
        Follow follow = Follow.builder()
                .srcUser(userRepo.findById(srcUserId).orElseThrow(IllegalArgumentException::new))
                .dstUser(userRepo.findById(dstUserId).orElseThrow(IllegalArgumentException::new))
                .build();
        followRepo.save(follow);
    }

    @Override
    public void deleteFollow(DeleteFollowInDTO deleteFollowInDTO) throws Exception {
        followRepo.deleteFollowBy(deleteFollowInDTO.getSrcUserId(), deleteFollowInDTO.getDstUserId());
    }
}
