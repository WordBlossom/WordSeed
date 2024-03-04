package com.spring.wordseed.service;

import com.spring.wordseed.dto.in.CreateBookMarkInDTO;
import com.spring.wordseed.dto.in.DeleteBookMarkInDTO;
import com.spring.wordseed.dto.out.CreateBookMarkOutDTO;

public interface BookMarkService {
    CreateBookMarkOutDTO createBookMark(CreateBookMarkInDTO createBookMarkInDTO, Long userId) throws Exception;
    void deleteBookMark(DeleteBookMarkInDTO deleteBookMarkInDTO, long userId);
}
