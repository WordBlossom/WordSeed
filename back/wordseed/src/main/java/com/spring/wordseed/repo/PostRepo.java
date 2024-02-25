package com.spring.wordseed.repo;

import com.spring.wordseed.entity.Post;
import com.spring.wordseed.repo.custom.CustomPostRepo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PostRepo extends JpaRepository<Post, Long>, CustomPostRepo {

}