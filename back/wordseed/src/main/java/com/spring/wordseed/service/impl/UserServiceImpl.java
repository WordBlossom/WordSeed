package com.spring.wordseed.service.impl;

import com.spring.wordseed.dto.in.CreateUserInDTO;
import com.spring.wordseed.dto.in.ReadUserInDTOs;
import com.spring.wordseed.dto.in.UpdateUserInDTO;
import com.spring.wordseed.dto.out.ReadUserOutDTO;
import com.spring.wordseed.dto.out.ReadUserOutDTOs;
import com.spring.wordseed.dto.out.UpdateUserOutDTO;
import com.spring.wordseed.dto.tool.UserDTO;
import com.spring.wordseed.entity.User;
import com.spring.wordseed.entity.UserInfo;
import com.spring.wordseed.enu.Informable;
import com.spring.wordseed.enu.UserType;
import com.spring.wordseed.repo.UserInfoRepo;
import com.spring.wordseed.repo.UserRepo;
import com.spring.wordseed.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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

    @Override
    public UpdateUserOutDTO updateUser(UpdateUserInDTO updateUserInDTO) throws Exception {
        User user = userRepo.findWithUserInfoById(updateUserInDTO.getUserId())
                .orElseThrow(IllegalArgumentException::new);
        if(updateUserInDTO.getUserName() == null) throw new IllegalArgumentException();
        user.setUserName(updateUserInDTO.getUserName());
        user.setUserType(updateUserInDTO.getUserType());
        user.getUserInfo().setUserDecp(updateUserInDTO.getUserDecp());
        user.getUserInfo().setInformable(updateUserInDTO.getInformable());
        return UpdateUserOutDTO.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .userType(user.getUserType())
                .email(user.getEmail())
                .userDecp(user.getUserInfo().getUserDecp())
                .informable(user.getUserInfo().getInformable())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    @Override
    public ReadUserOutDTOs readUsers(ReadUserInDTOs readUserInDTOs) throws Exception {
        List<UserDTO> users = userRepo.findUserBy(readUserInDTOs.getUserId(), readUserInDTOs.getQuery(),
                readUserInDTOs.getPage(), readUserInDTOs.getSize()).orElse(new ArrayList<>());
        return ReadUserOutDTOs.builder()
                .users(users)
                .build();
    }
}