package com.spring.wordseed.repo;

import com.spring.wordseed.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WordRepo extends JpaRepository<Word, Long> {
    Optional<Word> findById(Long wordId);
}
