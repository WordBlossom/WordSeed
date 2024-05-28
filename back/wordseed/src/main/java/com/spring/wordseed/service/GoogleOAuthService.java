package com.spring.wordseed.service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public interface GoogleOAuthService {
    public String getAuthorizationUrl() throws Exception;
    public Mono<String> exchangeCodeForTokens(String authorizationCode) throws Exception;
    public Mono<JSONObject> getUserInfo(String accessToken);
}
