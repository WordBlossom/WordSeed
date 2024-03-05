package com.spring.wordseed.dto.in;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.spring.wordseed.enu.FollowType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReadFollowerInDTOs {
    long authUserId;
    long userId;
    FollowType type;
    long page;
    long size;
}
