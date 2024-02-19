package com.spring.wordseed.dto.out;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReadUserInfoByIdOutDTO {
    long userId;
    String userName;
    String userDecp;
    long postCnt;
    long recvCnt;
    long sendCnt;
    @Builder
    public ReadUserInfoByIdOutDTO(long userId, String userName, String userDecp, long postCnt, long recvCnt, long sendCnt) {
        this.userId = userId;
        this.userName = userName;
        this.userDecp = userDecp;
        this.postCnt = postCnt;
        this.recvCnt = recvCnt;
        this.sendCnt = sendCnt;
    }
}
