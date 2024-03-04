package com.spring.wordseed.repo.custom;

import com.spring.wordseed.entity.BookMark;

public interface CustomBookMarkRepo {
    BookMark findBookMarkBy(Long postId, Long userId);
}
