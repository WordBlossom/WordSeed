package com.spring.wordseed.dto.out;

import com.spring.wordseed.enu.Informable;
import com.spring.wordseed.enu.UserType;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class UpdateUserOutDTO {
    long userId;
    String userName;
    UserType userType;
    String email;
    String userDecp;
    Informable informable;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    @Builder

    public UpdateUserOutDTO(long userId, String userName, UserType userType, String email, String userDecp,
                            Informable informable, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.userId = userId;
        this.userName = userName;
        this.userType = userType;
        this.email = email;
        this.userDecp = userDecp;
        this.informable = informable;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
