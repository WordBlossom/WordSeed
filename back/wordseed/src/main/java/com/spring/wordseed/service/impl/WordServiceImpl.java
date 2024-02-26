package com.spring.wordseed.service.impl;

import com.spring.wordseed.dto.in.CreateWordInDTO;
import com.spring.wordseed.dto.in.ReadWordInDTOs;
import com.spring.wordseed.dto.out.ReadWordByDateOutDTO;
import com.spring.wordseed.dto.out.ReadWordOutDTOs;
import com.spring.wordseed.dto.tool.WordDTO;
import com.spring.wordseed.entity.Word;
import com.spring.wordseed.repo.WordRepo;
import com.spring.wordseed.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    @Override
    public ReadWordOutDTOs readWords(ReadWordInDTOs readWordInDTOs) {
        Sort sort = Sort.by(Sort.Direction.DESC, "date");
        if(readWordInDTOs.getQuery().length() > 0)
            sort = Sort.by(Sort.Direction.ASC, "word");
        PageRequest pageRequest = PageRequest.of((int) readWordInDTOs.getPage(), (int) readWordInDTOs.getSize(), sort);
        List<Word> words = wordRepo.findByWordStartsWith(readWordInDTOs.getQuery(), pageRequest)
                .orElse(new ArrayList<>());
        List<WordDTO> wordDTOs = new ArrayList<>();
        for(Word word:words) {
            WordDTO wordDTO = WordDTO.builder()
                    .wordId(word.getWordId())
                    .word(word.getWord())
                    .createdAt(word.getDate())
                    .build();
            wordDTOs.add(wordDTO);
        }
        return ReadWordOutDTOs.builder()
                .words(wordDTOs)
                .build();
    }
}
