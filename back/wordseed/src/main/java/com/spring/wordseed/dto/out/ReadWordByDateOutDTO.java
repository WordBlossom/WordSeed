package com.spring.wordseed.dto.out;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
public class ReadWordByDateOutDTO {
    long wordId;
    String word;
    LocalDate date;

    @Builder
    public ReadWordByDateOutDTO(long wordId, String word, LocalDate date) {
        this.wordId = wordId;
        this.word = word;
        this.date = date;
    }
}
