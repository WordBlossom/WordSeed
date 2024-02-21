package com.spring.wordseed;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class WordseedApplication {

    public static void main(String[] args) {
        SpringApplication.run(WordseedApplication.class, args);
    }

}
