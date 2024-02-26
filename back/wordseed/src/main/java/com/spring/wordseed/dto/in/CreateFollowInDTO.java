package com.spring.wordseed.dto.in;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateFollowInDTO {
    long srcUserId;
    @JsonProperty("userId")
    long dstUserId;
}