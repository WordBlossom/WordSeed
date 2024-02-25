package com.spring.wordseed.service.impl;

import com.spring.wordseed.dto.in.CreateBookMarkInDTO;
import com.spring.wordseed.dto.out.CreateBookMarkOutDTO;
import com.spring.wordseed.entity.BookMark;
import com.spring.wordseed.repo.BookMarkRepo;
import com.spring.wordseed.service.BookMarkService;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
@Repository
public class BookMarkServiceImpl implements BookMarkService {
    private final BookMarkRepo bookMarkRepo;

    public BookMarkServiceImpl(BookMarkRepo bookMarkRepo) {
        this.bookMarkRepo = bookMarkRepo;
    }

    @Override
    public CreateBookMarkOutDTO createBookMark(CreateBookMarkInDTO createBookMarkInDTO, Long userId) {
        BookMark bookMark = bookMarkRepo.findBookMarkBy(createBookMarkInDTO.getPostId(), userId);

        return CreateBookMarkOutDTO.builder()
                .bookMarkId(bookMark.getBookMarkId())
                .userId(bookMark.getUser().getUserId())
                .postId(bookMark.getPost().getPostId())
                .createdAt(bookMark.getCreatedAt())
                .updatedAt(bookMark.getUpdatedAt())
                .build();
    }
}
