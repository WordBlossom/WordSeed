package com.spring.wordseed.service.impl;

import com.spring.wordseed.service.AuthService;
import com.spring.wordseed.encoder.TokenEncoder;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import jakarta.security.auth.message.AuthException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthServiceImpl implements AuthService {
    @Value("${jwt.secret}")
    private String SECRET_KEY;
    private final TokenEncoder tokenEncoder;

    public AuthServiceImpl(TokenEncoder tokenEncoder) {
        this.tokenEncoder = tokenEncoder;
    }

    @Override
    public String[] createToken(long userId) throws Exception {
        String accessToken = tokenEncoder.createAccessToken(String.valueOf(userId));
        String refreshToken = tokenEncoder.createRefreshToken(String.valueOf(userId));
        return new String[] {accessToken, refreshToken};
    }

    @Override
    public String validateToken(String token) throws Exception {
        try{
            Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
            Date expiration = claims.getExpiration();
            if(expiration.before(new Date(System.currentTimeMillis()))) {
                throw new JwtException("Authorization Expired");
            }
            return claims.getSubject();
        }catch(JwtException e) {
            throw new AuthException();
        }
    }
}
