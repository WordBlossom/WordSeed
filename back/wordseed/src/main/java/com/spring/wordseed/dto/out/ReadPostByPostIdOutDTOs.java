package com.spring.wordseed.dto.out;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class ReadPostByPostIdOutDTOs {
    private List<ReadPostByPostIdOutDTO> posts;
}
