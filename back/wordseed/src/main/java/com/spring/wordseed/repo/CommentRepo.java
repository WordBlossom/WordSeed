package com.spring.wordseed.repo;

import com.spring.wordseed.entity.Comment;
import com.spring.wordseed.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long> {
}
