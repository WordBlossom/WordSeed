package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.CreateWordInDTO;
import com.spring.wordseed.dto.in.ReadWordInDTOs;
import com.spring.wordseed.dto.out.ReadWordByDateOutDTO;
import com.spring.wordseed.dto.out.ReadWordOutDTOs;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public interface WordService {
    long createWord(CreateWordInDTO createWordInDTO) throws Exception;
    ReadWordByDateOutDTO readWordByDate(LocalDate date) throws Exception;
    ReadWordOutDTOs readWords(ReadWordInDTOs readWordInDTOs);
}
