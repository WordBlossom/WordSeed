package com.spring.wordseed.encoder;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

public class JwtTokenEncoder implements TokenEncoder{
    @Value("${jwt.secret}")
    private String SECRET_KEY;
    @Value("${jwt.access_expiration}")
    private long ACCESS_TOKEN_EXPIRATION_TIME;
    @Value("${jwt.refresh_expiration}")
    private long REFRESH_TOKEN_EXPIRATION_TIME;

    @Override
    public String createAccessToken(String userId) {
        return Jwts.builder()
                .setSubject(userId)
                .claim("userId", userId)
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    @Override
    public String createRefreshToken(String userId) {
        return Jwts.builder()
                .setSubject(userId)
                .claim("userId", userId)
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }
}
