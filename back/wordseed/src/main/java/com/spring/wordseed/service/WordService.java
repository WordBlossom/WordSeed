package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.CreateWordInDTO;
import com.spring.wordseed.dto.out.ReadWordByDateOutDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public interface WordService {
    long createWord(CreateWordInDTO createWordInDTO) throws Exception;
    ReadWordByDateOutDTO readWordByDate(LocalDate date) throws Exception;
}
