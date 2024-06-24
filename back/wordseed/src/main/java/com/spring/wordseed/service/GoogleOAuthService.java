package com.spring.wordseed.service;

import com.spring.wordseed.dto.tool.UserInfoDTO;
import org.springframework.stereotype.Service;

@Service
public interface GoogleOAuthService {
    public String getAuthorizationUrl() throws Exception;
    public String exchangeCodeForTokens(String authorizationCode);
    public UserInfoDTO getUserInfo(String accessToken);
}
