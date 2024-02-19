package com.spring.wordseed.dto.out;

import com.spring.wordseed.enu.Informable;
import com.spring.wordseed.enu.UserType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReadUserOutDTO {
    long userId;
    String userName;
    UserType userType;
    String email;
    String userDecp;
    Informable informable;

    @Builder
    public ReadUserOutDTO(long userId, String userName, UserType userType, String email, String userDecp, Informable informable) {
        this.userId = userId;
        this.userName = userName;
        this.userType = userType;
        this.email = email;
        this.userDecp = userDecp;
        this.informable = informable;
    }
}
