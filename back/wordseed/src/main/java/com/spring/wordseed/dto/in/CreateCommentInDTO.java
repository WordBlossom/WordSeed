package com.spring.wordseed.dto.in;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CreateCommentInDTO {
    private Long postId;
    private String content;
}
