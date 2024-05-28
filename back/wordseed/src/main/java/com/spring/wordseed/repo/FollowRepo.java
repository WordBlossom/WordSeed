package com.spring.wordseed.repo;

import com.spring.wordseed.entity.Follow;
import com.spring.wordseed.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FollowRepo extends JpaRepository<Follow, Long> {
    Optional<Follow> findBySrcUserAndDstUser(User srcUser, User dstUser);
}