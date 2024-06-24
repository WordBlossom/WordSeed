package com.spring.wordseed.repo;

import com.spring.wordseed.entity.User;
import com.spring.wordseed.repo.custom.CustomUserRepo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepo extends JpaRepository<User, Long>, CustomUserRepo {
    User findByOauthIdAndProviderAndEmail(String oauthId, String provider, String email);
}