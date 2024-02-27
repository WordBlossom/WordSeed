package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.CreateFollowInDTO;
import com.spring.wordseed.dto.in.DeleteFollowInDTO;
import org.springframework.stereotype.Service;

@Service
public interface FollowService {
    void createFollow(CreateFollowInDTO createFollowInDTO) throws Exception;
    void deleteFollow(DeleteFollowInDTO deleteFollowInDTO) throws Exception;
}
