package com.spring.wordseed.dto.out;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class CreateLikeOutDTO {
    private Long postLikedId;
    private Long userId;
    private Long postId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
