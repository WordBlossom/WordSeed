package com.spring.wordseed.encoder;

public interface TokenEncoder {
    public String createAccessToken(String userId);
    public String createRefreshToken(String userId);
}
