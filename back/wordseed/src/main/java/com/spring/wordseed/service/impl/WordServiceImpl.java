package com.spring.wordseed.service.impl;

import com.spring.wordseed.dto.in.CreateWordInDTO;
import com.spring.wordseed.dto.out.ReadWordByDateOutDTO;
import com.spring.wordseed.entity.Word;
import com.spring.wordseed.repo.WordRepo;
import com.spring.wordseed.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Transactional
public class WordServiceImpl implements WordService {
    private final WordRepo wordRepo;

    @Autowired
    public WordServiceImpl(WordRepo wordRepo) {
        this.wordRepo = wordRepo;
    }

    @Override
    public long createWord(CreateWordInDTO createWordInDTO) throws Exception {
        if(createWordInDTO.getWord().length() == 0) throw new IllegalArgumentException();
        Word word = Word.builder()
                .word(createWordInDTO.getWord())
                .date(createWordInDTO.getDate())
                .build();
        word = wordRepo.save(word);
        return word.getWordId();
    }

    @Override
    public ReadWordByDateOutDTO readWordByDate(LocalDate date) throws Exception {
        Word word = wordRepo.findFirstByDate(date)
                .orElseThrow(IllegalArgumentException::new);
        return ReadWordByDateOutDTO.builder()
                .wordId(word.getWordId())
                .word(word.getWord())
                .date(word.getDate())
                .build();
    }
}
