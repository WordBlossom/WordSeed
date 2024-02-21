package com.spring.wordseed.service.impl;

import com.spring.wordseed.dto.in.CreateUserInDTO;
import com.spring.wordseed.dto.out.ReadUserOutDTO;
import com.spring.wordseed.entity.User;
import com.spring.wordseed.entity.UserInfo;
import com.spring.wordseed.enu.Informable;
import com.spring.wordseed.enu.UserType;
import com.spring.wordseed.repo.UserInfoRepo;
import com.spring.wordseed.repo.UserRepo;
import com.spring.wordseed.service.UserService;
import jakarta.security.auth.message.AuthException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final UserInfoRepo userInfoRepo;
    @Autowired
    public UserServiceImpl(UserRepo userRepo, UserInfoRepo userInfoRepo) {
        this.userRepo = userRepo;
        this.userInfoRepo = userInfoRepo;
    }
    @Override
    public long createUser(CreateUserInDTO createUserInDTO) throws Exception{
        try {
            UserInfo userInfo = UserInfo.builder()
                    .followDstCnt(0L)
                    .followSrcCnt(0L)
                    .postCnt(0L)
                    .informable(Informable.FALSE)
                    .userDecp("")
                    .build();
            userInfo = userInfoRepo.save(userInfo);
            User user = User.builder()
                    .userName(createUserInDTO.getUserName())
                    .email(createUserInDTO.getEmail())
                    .userInfo(userInfo)
                    .userType(UserType.USER)
                    .build();
            user = userRepo.save(user);
            return user.getUserId();
        }catch (Exception e) {
            throw new IllegalArgumentException();
        }
    }
    @Override
    public ReadUserOutDTO readUser(long userId) throws Exception {
        User user = userRepo.findById(userId)
                    .orElseThrow(IllegalArgumentException::new);
        return ReadUserOutDTO.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .userType(user.getUserType())
                .userDecp(user.getUserInfo().getUserDecp())
                .email(user.getEmail())
                .informable(user.getUserInfo().getInformable())
                .build();
    }
}