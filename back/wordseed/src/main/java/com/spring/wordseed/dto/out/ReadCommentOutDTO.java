package com.spring.wordseed.dto.out;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class ReadCommentOutDTO {
    private Long commentId;
    private Long userId;
    private Long postId;
    private String content;
    LocalDateTime createdAt;
}
