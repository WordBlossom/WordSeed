package com.spring.wordseed.service.impl;

import com.spring.wordseed.dto.in.CreateBookMarkInDTO;
import com.spring.wordseed.dto.out.CreateBookMarkOutDTO;
import com.spring.wordseed.entity.BookMark;
import com.spring.wordseed.repo.BookMarkRepo;
import com.spring.wordseed.repo.PostRepo;
import com.spring.wordseed.repo.UserRepo;
import com.spring.wordseed.service.BookMarkService;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

@Service
@Repository
public class BookMarkServiceImpl implements BookMarkService {
    private final BookMarkRepo bookMarkRepo;
    private final UserRepo userRepo;
    private final PostRepo postRepo;

    public BookMarkServiceImpl(BookMarkRepo bookMarkRepo, UserRepo userRepo, PostRepo postRepo) {
        this.bookMarkRepo = bookMarkRepo;
        this.userRepo = userRepo;
        this.postRepo = postRepo;
    }

    @Override
    public CreateBookMarkOutDTO createBookMark(CreateBookMarkInDTO createBookMarkInDTO, Long userId) throws Exception {
        BookMark bookMark = BookMark.builder()
                .user(userRepo.findById(userId).orElseThrow(Exception::new))
                .post(postRepo.findById(createBookMarkInDTO.getPostId()).orElseThrow(Exception::new))
                .build();

        bookMarkRepo.save(bookMark);
        bookMarkRepo.flush();

        return CreateBookMarkOutDTO.builder()
                .bookMarkId(bookMark.getBookMarkId())
                .userId(bookMark.getUser().getUserId())
                .postId(bookMark.getPost().getPostId())
                .createdAt(bookMark.getCreatedAt())
                .updatedAt(bookMark.getUpdatedAt())
                .build();
    }
}
