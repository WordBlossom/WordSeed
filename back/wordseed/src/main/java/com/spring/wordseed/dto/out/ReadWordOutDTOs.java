package com.spring.wordseed.dto.out;

import com.spring.wordseed.dto.tool.WordDTO;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ReadWordOutDTOs {
    List<WordDTO> words;
    @Builder
    public ReadWordOutDTOs(List<WordDTO> words) {
        this.words = words;
    }
}
