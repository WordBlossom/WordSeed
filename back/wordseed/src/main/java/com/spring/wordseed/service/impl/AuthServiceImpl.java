package com.spring.wordseed.service.impl;

import com.spring.wordseed.dto.tool.TokenDTO;
import com.spring.wordseed.service.AuthService;
import com.spring.wordseed.encoder.TokenEncoder;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.security.auth.message.AuthException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {
    @Value("${jwt.secret}")
    private String SECRET_KEY;
    private final TokenEncoder tokenEncoder;

    public AuthServiceImpl(TokenEncoder tokenEncoder) {
        this.tokenEncoder = tokenEncoder;
    }

    @Override
    public TokenDTO createToken(long userId) throws Exception {
        String accessToken = tokenEncoder.createAccessToken(String.valueOf(userId));
        String refreshToken = tokenEncoder.createRefreshToken(String.valueOf(userId));
        return TokenDTO.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public String validateToken(String token) throws Exception {
        try{
            Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
            return claims.getSubject();
        }catch (ExpiredJwtException e){
            throw new ExpiredJwtException(e.getHeader(), e.getClaims(), e.getMessage());
        }catch(JwtException e) {
            throw new AuthException();
        }
    }
}
