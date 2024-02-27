package com.spring.wordseed.dto.in;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReadWordInDTOs {
    String query;
    long page;
    long size;
}
