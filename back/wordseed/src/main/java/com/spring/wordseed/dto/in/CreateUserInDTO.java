package com.spring.wordseed.dto.in;

import com.spring.wordseed.enu.UserType;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserInDTO {
    String userName;
    String email;
    String oauthId;
    String provider;
}
