package com.spring.wordseed.controller;

import com.spring.wordseed.dto.out.ReadWordByDateOutDTO;
import com.spring.wordseed.dto.out.ReadWordOutDTOs;
import com.spring.wordseed.dto.tool.WordDTO;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/word", produces = "application/json; charset=utf-8")
public class WordController {
    @GetMapping
    public ResponseEntity<ReadWordByDateOutDTO> readWordByDate(@RequestParam("date") @DateTimeFormat(pattern="yyyy-mm-dd") LocalDate date) throws Exception {
        ReadWordByDateOutDTO readWordByDateOutDTO = ReadWordByDateOutDTO.builder()
                .wordId(1)
                .date(date)
                .word("하늘")
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(readWordByDateOutDTO);
    }

    @GetMapping("/list")
    public ResponseEntity<ReadWordOutDTOs> readWords(@RequestParam("query") String query,
                                                     @RequestParam("page") long page,
                                                     @RequestParam("size") long size) throws Exception {
        List<WordDTO> words = new ArrayList<>();
        for(int i=1;i<=size;i++) {
            WordDTO word = WordDTO.builder()
                    .wordId(i)
                    .word("" + query + page + i)
                    .createdAt(LocalDate.now().plusDays(i))
                    .build();
            words.add(word);
        }
        ReadWordOutDTOs readWordOutDTOs = new ReadWordOutDTOs(words);
        return ResponseEntity.status(HttpStatus.OK).body(readWordOutDTOs);
    }
}
