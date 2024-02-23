package com.spring.wordseed.dto.in;

import com.spring.wordseed.enu.Informable;
import com.spring.wordseed.enu.UserType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UpdateUserInDTO {
    long userId;
    String userName;
    UserType userType;
    String userDecp;
    Informable informable;
    @Builder
    public UpdateUserInDTO(String userName, UserType userType, String userDecp, Informable informable) {
        this.userName = userName;
        this.userType = userType;
        this.userDecp = userDecp;
        this.informable = informable;
    }
}
