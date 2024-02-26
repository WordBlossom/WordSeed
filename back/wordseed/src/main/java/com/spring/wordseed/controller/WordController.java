package com.spring.wordseed.controller;

import com.spring.wordseed.dto.in.CreateWordInDTO;
import com.spring.wordseed.dto.in.ReadWordInDTOs;
import com.spring.wordseed.dto.out.ReadWordByDateOutDTO;
import com.spring.wordseed.dto.out.ReadWordOutDTOs;
import com.spring.wordseed.dto.tool.WordDTO;
import com.spring.wordseed.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/word", produces = "application/json; charset=utf-8")
public class WordController {
    private final WordService wordService;

    @Autowired
    public WordController(WordService wordService) {
        this.wordService = wordService;
    }

    @PostMapping
    public ResponseEntity<Long> createWord(@RequestBody CreateWordInDTO createWordInDTO) throws Exception {
        long wordId = wordService.createWord(createWordInDTO);
        return ResponseEntity.status(HttpStatus.OK).body(wordId);
    }
    @GetMapping
    public ResponseEntity<ReadWordByDateOutDTO> readWordByDate(@RequestParam("date") @DateTimeFormat(pattern="yyyy-mm-dd") LocalDate date) throws Exception {
        ReadWordByDateOutDTO readWordByDateOutDTO = wordService.readWordByDate(date);
        return ResponseEntity.status(HttpStatus.OK).body(readWordByDateOutDTO);
    }

    @GetMapping("/list")
    public ResponseEntity<ReadWordOutDTOs> readWords(@ModelAttribute ReadWordInDTOs readWordInDTOs) throws Exception {
        ReadWordOutDTOs readWordOutDTOs = wordService.readWords(readWordInDTOs);
        return ResponseEntity.status(HttpStatus.OK).body(readWordOutDTOs);
    }
}
