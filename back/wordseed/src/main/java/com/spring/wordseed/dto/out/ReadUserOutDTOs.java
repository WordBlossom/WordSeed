package com.spring.wordseed.dto.out;

import com.spring.wordseed.dto.tool.UserDTO;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReadUserOutDTOs {
    List<UserDTO> users;
}
