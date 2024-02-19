package com.spring.wordseed.dto.in;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UpdateCommentInDTO {
    private Long commentId;
    private String content;
}
