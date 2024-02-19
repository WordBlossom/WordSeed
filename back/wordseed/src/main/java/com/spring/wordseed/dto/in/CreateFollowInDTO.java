package com.spring.wordseed.dto.in;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateFollowInDTO {
    long userId;
    @Builder
    public CreateFollowInDTO(long userId) {
        this.userId = userId;
    }
}
