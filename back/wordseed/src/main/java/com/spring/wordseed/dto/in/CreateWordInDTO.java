package com.spring.wordseed.dto.in;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateWordInDTO {
    String word;
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    LocalDate date;

}
