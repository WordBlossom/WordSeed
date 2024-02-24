package com.spring.wordseed.controller;

import com.spring.wordseed.dto.in.CreateFollowInDTO;
import com.spring.wordseed.dto.in.DeleteFollowInDTO;
import com.spring.wordseed.dto.in.UpdateUserInDTO;
import com.spring.wordseed.dto.out.*;
import com.spring.wordseed.dto.tool.UserDTO;
import com.spring.wordseed.enu.FollowType;
import com.spring.wordseed.enu.Informable;
import com.spring.wordseed.enu.UserType;
import com.spring.wordseed.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/user", produces = "application/json; charset=utf-8")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping
    public ResponseEntity<ReadUserOutDTO> readUser(HttpServletRequest request) throws Exception {
        long userId = (long) request.getAttribute("userId");
        ReadUserOutDTO readUserOutDTO = userService.readUser(userId);
        return ResponseEntity.status(HttpStatus.OK).body(readUserOutDTO);
    }
    @PutMapping
    public ResponseEntity<UpdateUserOutDTO> updateUser(@RequestBody UpdateUserInDTO updateUserInDTO,
                                                       HttpServletRequest request) throws Exception {
        long userId = (long) request.getAttribute("userId");
        updateUserInDTO.setUserId(userId);
        UpdateUserOutDTO updateUserOutDTO = userService.updateUser(updateUserInDTO);
        return ResponseEntity.status(HttpStatus.OK).body(updateUserOutDTO);
    }
    @DeleteMapping
    public ResponseEntity<DeleteUserOutDTO> deleteUser(HttpServletRequest request) throws Exception {
        long userId = (long) request.getAttribute("userId");
        DeleteUserOutDTO deleteUserOutDTO = userService.deleteUser(userId);
        return ResponseEntity.status(HttpStatus.OK).body(deleteUserOutDTO);
    }

    @GetMapping("/list")
    public ResponseEntity<ReadUserOutDTOs> readUsers(@RequestParam("query") String query,
                                                     @RequestParam("page") long page,
                                                     @RequestParam("size") long size) throws Exception {
        List<UserDTO> users = new ArrayList<>();
        for(int i=1;i<=size;i++) {
            UserDTO user = UserDTO.builder()
                    .userId(i)
                    .userName("" + query + page + i)
                    .sendCnt(i* 10L)
                    .recvCnt(i* 100L)
                    .userDecp("언젠가 어디선가 이글을 읽는 당신에게 작은 힘이 되기를 바라본다")
                    .subscribed((i % 2 == 0))
                    .build();
            users.add(user);
        }
        ReadUserOutDTOs readUserOutDTOs = new ReadUserOutDTOs(users);
        return ResponseEntity.status(HttpStatus.OK).body(readUserOutDTOs);
    }

    @GetMapping("/info")
    public ResponseEntity<ReadUserInfoByIdOutDTO> readUserInfoById(@RequestParam("userId") long userId) throws Exception {
        ReadUserInfoByIdOutDTO readUserInfoByIdOutDTO = ReadUserInfoByIdOutDTO.builder()
                .userId(userId)
                .userName("딸기 신부")
                .userDecp("형편없는 내 글을 견디면서 글을 쭉 써보자")
                .postCnt(15)
                .recvCnt(50)
                .sendCnt(10)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(readUserInfoByIdOutDTO);
    }
    @GetMapping("/follow") // out dto에 구독자인지 관심작가인지 enum 만들어서 보내주는 것도 좋을듯?
    public ResponseEntity<ReadFollowOutDTOs> readFollows(@RequestParam("userId") long userId,
                                                         @RequestParam("type") FollowType type,
                                                         @RequestParam("page") long page,
                                                         @RequestParam("size") long size) throws Exception {
        List<UserDTO> users = new ArrayList<>();
        for(int i=1;i<=size;i++) {
            UserDTO user = UserDTO.builder()
                    .userId(i)
                    .userName("" + type + page + i)
                    .sendCnt(i* 10L)
                    .recvCnt(i* 100L)
                    .userDecp("언젠가 어디선가 이글을 읽는 당신에게 작은 힘이 되기를 바라본다")
                    .subscribed((i % 2 == 0))
                    .build();
            users.add(user);
        }
        ReadFollowOutDTOs readFollowOutDTOs = new ReadFollowOutDTOs(users);
        return ResponseEntity.status(HttpStatus.OK).body(readFollowOutDTOs);
    }

    @PostMapping("follow")
    public ResponseEntity<String> readUser(@RequestBody CreateFollowInDTO createFollowInDTO) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body("SUCCESS");
    }

    @DeleteMapping("follow")
    public ResponseEntity<String> readUser(@RequestBody DeleteFollowInDTO deleteFollowInDTO) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body("SUCCESS");
    }
}