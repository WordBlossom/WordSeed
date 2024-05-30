package com.spring.wordseed.controller;

import com.spring.wordseed.dto.in.CreateUserInDTO;
import com.spring.wordseed.dto.tool.TokenDTO;
import com.spring.wordseed.dto.tool.UserInfoDTO;
import com.spring.wordseed.encoder.JwtTokenEncoder;
import com.spring.wordseed.service.AuthService;
import com.spring.wordseed.service.GoogleOAuthService;
import com.spring.wordseed.service.UserService;
import jakarta.security.auth.message.AuthException;
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
    private final JwtTokenEncoder jwtTokenEncoder;
    private final AuthService authService;

    @Autowired
    public AccountController(UserService userService, GoogleOAuthService googleOAuthService, JwtTokenEncoder jwtTokenEncoder, AuthService authService) {
        this.userService = userService;
        this.googleOAuthService = googleOAuthService;
        this.jwtTokenEncoder = jwtTokenEncoder;
        this.authService = authService;
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
        TokenDTO tokenDTO = userService.oauthLogin(userInfoDTO);

        HttpHeaders headers = new HttpHeaders();
        headers.set("access-token", tokenDTO.getAccessToken());
        headers.set("refresh-token", tokenDTO.getRefreshToken());
        return ResponseEntity.ok().headers(headers).body("Success");
    }

    @GetMapping("/reissue")
    public ResponseEntity<String> reissue(@RequestHeader("refresh-token") String refreshToken) throws Exception {
        try { // refreshToken이 없거나 유효하지 않은 경우 AuthException
            long userId = Long.parseLong(authService.validateToken(refreshToken));
            // refreshToken이 인증이 된 경우 DB와 일치하는지 확인 후 일치하지 않으면 AuthException -> redis로 성능 향상 가능
            if(!refreshToken.equals(userService.getRefreshToken(userId))) throw new AuthException();
            // DB와 일치하는 경우 userId로 토큰 재생성 및 발급
            String accessToken = jwtTokenEncoder.createAccessToken(String.valueOf(userId));
            HttpHeaders headers = new HttpHeaders();
            headers.set("access-token", accessToken);
            return ResponseEntity.ok().headers(headers).body("Success");
        }catch (Exception e) {
            throw new AuthException();
        }
    }
}