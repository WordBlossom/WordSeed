package com.spring.wordseed.config;

import com.spring.wordseed.encoder.JwtTokenEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EncoderConfig {
    @Bean
    public JwtTokenEncoder JwtTokenEncoder() {
        return new JwtTokenEncoder();
    }
}
