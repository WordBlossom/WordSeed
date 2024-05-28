package com.spring.wordseed.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.spring.wordseed.dto.in.CreateUserInDTO;
import com.spring.wordseed.service.GoogleOAuthService;
import com.spring.wordseed.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

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
        long userId = userService.createUser(createUserInDTO);
        return ResponseEntity.status(HttpStatus.OK).body(userId);
    }

    @GetMapping("/login")
    public String login() throws Exception{
        return googleOAuthService.getAuthorizationUrl();
    }

    @GetMapping("/login/google")
    public Mono<String> loginGoogle(@RequestParam("code") String code) throws Exception{
        return googleOAuthService.exchangeCodeForTokens(code)
                .flatMap(googleOAuthService::getUserInfo)
                .map(userInfo -> "User info: " + userInfo.toString())
                .onErrorReturn("Error: Failed to authenticate");
    }
}