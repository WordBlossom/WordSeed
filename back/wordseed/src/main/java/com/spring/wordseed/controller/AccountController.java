package com.spring.wordseed.controller;

import com.spring.wordseed.dto.in.CreateUserInDTO;
import com.spring.wordseed.dto.tool.TokenDTO;
import com.spring.wordseed.dto.tool.UserInfoDTO;
import com.spring.wordseed.service.GoogleOAuthService;
import com.spring.wordseed.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/account", produces = "application/json; charset=utf-8")
public class AccountController {
    private final UserService userService;
    private final GoogleOAuthService googleOAuthService;

    @Autowired
    public AccountController(UserService userService, GoogleOAuthService googleOAuthService) {
        this.userService = userService;
        this.googleOAuthService = googleOAuthService;
    }

    @PostMapping
    public ResponseEntity<Long> createUser(@RequestBody CreateUserInDTO createUserInDTO) throws Exception{
        long userId = userService.createUser(createUserInDTO).getUserId();
        return ResponseEntity.status(HttpStatus.OK).body(userId);
    }

    @GetMapping("/login/google")
    public String loginGoogle() throws Exception{
        return googleOAuthService.getAuthorizationUrl();
    }

    @GetMapping("/login/google/callback")
    public ResponseEntity<String> loginGoogleCallback(@RequestParam("code") String code) throws Exception {
        String accessToken = googleOAuthService.exchangeCodeForTokens(code);
        UserInfoDTO userInfoDTO = googleOAuthService.getUserInfo(accessToken);
        TokenDTO tokenDTO = userService.getTokens(userInfoDTO);

        HttpHeaders headers = new HttpHeaders();
        headers.set("access-token", tokenDTO.getAccessToken());
        headers.set("refresh-token", tokenDTO.getAccessToken());
        return ResponseEntity.ok().headers(headers).body("Success");
    }
}