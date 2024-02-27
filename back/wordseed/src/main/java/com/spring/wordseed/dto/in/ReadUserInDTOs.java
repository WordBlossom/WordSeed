package com.spring.wordseed.dto.in;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReadUserInDTOs {
    long userId;
    String query;
    long page;
    long size;
}
