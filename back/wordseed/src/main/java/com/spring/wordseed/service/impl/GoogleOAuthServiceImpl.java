package com.spring.wordseed.service.impl;

import com.spring.wordseed.service.GoogleOAuthService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class GoogleOAuthServiceImpl implements GoogleOAuthService {
    @Value("${google.client-id}")
    private String clientId;
    @Value("${google.client-secret}")
    private String clientSecret;
    @Value("${google.redirect-uri}")
    private String redirectUri;
    private static final String AUTHORIZATION_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
    private static final String TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
    private static final String USERINFO_ENDPOINT = "https://www.googleapis.com/oauth2/v3/userinfo";
    private static final String SCOPE = "openid profile email";

    private final WebClient webClient = WebClient.create();

    @Override
    public String getAuthorizationUrl() throws Exception {
        return AUTHORIZATION_ENDPOINT + "?client_id=" + URLEncoder.encode(clientId, StandardCharsets.UTF_8)
                + "&redirect_uri=" + URLEncoder.encode(redirectUri, StandardCharsets.UTF_8)
                + "&response_type=code"
                + "&scope=" + URLEncoder.encode(SCOPE, StandardCharsets.UTF_8);
    }

    @Override
    public Mono<String> exchangeCodeForTokens(String authorizationCode) throws Exception{
        return webClient.post()
                .uri(TOKEN_ENDPOINT)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .bodyValue("code=" + authorizationCode
                        + "&client_id=" + clientId
                        + "&client_secret=" + clientSecret
                        + "&redirect_uri=" + redirectUri
                        + "&grant_type=authorization_code")
                .retrieve()
                .bodyToMono(String.class)
                .map(this::parseToken);

    }

    private String parseToken(String response) {
        JSONObject jsonObject = new JSONObject(response);
        return jsonObject.getString("access_token");
    }

    @Override
    public Mono<JSONObject> getUserInfo(String accessToken) {
        return webClient.get()
                .uri(USERINFO_ENDPOINT)
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(String.class)
                .map(JSONObject::new);
    }
}
