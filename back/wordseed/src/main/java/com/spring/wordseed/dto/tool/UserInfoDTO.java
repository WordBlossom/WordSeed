package com.spring.wordseed.dto.tool;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDTO {
    String oauthId;
    String email;
    String provider;
}
