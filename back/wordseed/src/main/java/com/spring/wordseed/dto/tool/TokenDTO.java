package com.spring.wordseed.dto.tool;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenDTO {
    String accessToken;
    String refreshToken;
}
