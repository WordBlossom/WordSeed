package com.spring.wordseed.dto.tool;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class WordDTO {
    long wordId;
    String word;
    LocalDate createdAt;

    @Builder
    public WordDTO(long wordId, String word, LocalDate createdAt) {
        this.wordId = wordId;
        this.word = word;
        this.createdAt = createdAt;
    }
}
