package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.CreateFollowInDTO;
import org.springframework.stereotype.Service;

@Service
public interface FollowService {
    void createFollow(CreateFollowInDTO createFollowInDTO) throws Exception;
}
