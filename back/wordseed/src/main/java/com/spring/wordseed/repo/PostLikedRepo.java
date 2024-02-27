package com.spring.wordseed.repo;

import com.spring.wordseed.entity.PostLiked;
import com.spring.wordseed.repo.custom.CustomPostLikedRepo;
import com.spring.wordseed.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostLikedRepo extends JpaRepository<PostLiked, Long>, CustomPostLikedRepo {
}
