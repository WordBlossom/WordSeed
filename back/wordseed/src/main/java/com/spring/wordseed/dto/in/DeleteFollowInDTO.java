package com.spring.wordseed.dto.in;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DeleteFollowInDTO {
    long userId;
    @Builder
    public DeleteFollowInDTO(long userId) {
        this.userId = userId;
    }
}
