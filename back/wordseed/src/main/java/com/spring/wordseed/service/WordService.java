package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.CreateWordInDTO;
import org.springframework.stereotype.Service;

@Service
public interface WordService {
    long createWord(CreateWordInDTO createWordInDTO) throws Exception;
}
