package com.spring.wordseed.dto.out;

import com.spring.wordseed.dto.tool.UserDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ReadUserOutDTOs {
    List<UserDTO> users;
    @Builder
    public ReadUserOutDTOs(List<UserDTO> users) {
        this.users = users;
    }
}
