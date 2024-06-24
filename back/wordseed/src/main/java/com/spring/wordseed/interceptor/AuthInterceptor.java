package com.spring.wordseed.interceptor;

import com.spring.wordseed.service.AuthService;
import jakarta.security.auth.message.AuthException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    @Value("${auth.header}")
    private String AUTHORIZATION_HEADER;
    @Value("${auth.prefix}")
    private String AUTHORIZATION_PREFIX;
    private final AuthService authService;

    public AuthInterceptor(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if(request.getMethod().equals("OPTIONS")) return true;
        String authorizationHeader = request.getHeader(AUTHORIZATION_HEADER);
        if(authorizationHeader == null || !authorizationHeader.startsWith(AUTHORIZATION_PREFIX + " ")) {
            throw new AuthException();
        }
        try {
            String token = authorizationHeader.substring(AUTHORIZATION_PREFIX.length() + 1);
            long userId = Long.parseLong(authService.validateToken(token));
            request.setAttribute("userId", userId);
        }catch (Exception e) {
            throw new AuthException();
        }
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
