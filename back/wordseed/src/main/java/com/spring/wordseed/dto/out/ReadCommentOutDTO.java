package com.spring.wordseed.dto.out;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadCommentOutDTO {
    private Long commentId;
    private Long userId;
    private Long postId;
    private String content;
    LocalDateTime createdAt;
}
