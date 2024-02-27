package com.spring.wordseed.dto.out;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReadUserInfoByIdOutDTO {
    long userId;
    String userName;
    String userDecp;
    long postCnt;
    long sendCnt;
    long recvCnt;
    boolean subscribed;
}
