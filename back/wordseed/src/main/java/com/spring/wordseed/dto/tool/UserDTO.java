package com.spring.wordseed.dto.tool;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
    long userId;
    String userName;
    long sendCnt;
    long recvCnt;
    String userDecp;
    boolean subscribed;
}
