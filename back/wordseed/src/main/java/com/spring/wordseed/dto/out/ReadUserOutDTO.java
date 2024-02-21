package com.spring.wordseed.dto.out;

import com.spring.wordseed.enu.Informable;
import com.spring.wordseed.enu.UserType;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReadUserOutDTO {
    private long userId;
    private String userName;
    private UserType userType;
    private String email;
    private String userDecp;
    private Informable informable;
}
