package com.spring.wordseed.dto.tool;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
    long userId;
    String userName;
    long sendCnt;
    long recvCnt;
    String userDecp;
    boolean subscribed;
    @Builder
    public UserDTO(long userId, String userName, long sendCnt, long recvCnt, String userDecp, boolean subscribed) {
        this.userId = userId;
        this.userName = userName;
        this.sendCnt = sendCnt;
        this.recvCnt = recvCnt;
        this.userDecp = userDecp;
        this.subscribed = subscribed;
    }
}
