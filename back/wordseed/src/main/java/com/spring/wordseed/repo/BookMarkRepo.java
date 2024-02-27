package com.spring.wordseed.repo;

import com.spring.wordseed.entity.BookMark;
import com.spring.wordseed.repo.custom.CustomBookMarkRepo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookMarkRepo extends JpaRepository<BookMark, Long>, CustomBookMarkRepo {
}
