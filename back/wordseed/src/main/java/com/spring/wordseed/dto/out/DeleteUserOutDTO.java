package com.spring.wordseed.dto.out;

import com.spring.wordseed.enu.Informable;
import com.spring.wordseed.enu.UserType;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DeleteUserOutDTO {
    long userId;
    String userName;
    UserType userType;
    String email;
}
