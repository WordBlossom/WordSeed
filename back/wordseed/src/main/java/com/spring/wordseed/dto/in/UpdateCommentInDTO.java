package com.spring.wordseed.dto.in;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class UpdateCommentInDTO {
    private Long commentId;
    private String content;
}
