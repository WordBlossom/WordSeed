package com.spring.wordseed.dto.in;

import com.spring.wordseed.enu.UserType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateUserInDTO {
    String userName;
    String email;
}
