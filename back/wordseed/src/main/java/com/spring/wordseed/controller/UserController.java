package com.spring.wordseed.controller;

import com.spring.wordseed.dto.in.*;
import com.spring.wordseed.dto.out.*;
import com.spring.wordseed.service.FollowService;
import com.spring.wordseed.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/user", produces = "application/json; charset=utf-8")
public class UserController {
    private final UserService userService;
    private final FollowService followService;

    @Autowired
    public UserController(UserService userService, FollowService followService) {
        this.userService = userService;
        this.followService = followService;
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
    public ResponseEntity<ReadUserOutDTOs> readUsers(@ModelAttribute ReadUserInDTOs readUserInDTOs,
                                                     HttpServletRequest request) throws Exception {
        long userId = (long) request.getAttribute("userId");
        readUserInDTOs.setUserId(userId);
        ReadUserOutDTOs readUserOutDTOs = userService.readUsers(readUserInDTOs);
        return ResponseEntity.status(HttpStatus.OK).body(readUserOutDTOs);
    }

    @GetMapping("/info")
    public ResponseEntity<ReadUserInfoByIdOutDTO> readUserInfoById(@RequestParam("userId") long dstUserId,
                                                                   HttpServletRequest request) throws Exception {
        long srcUserId = (long) request.getAttribute("userId");
        ReadUserInfoByIdOutDTO readUserInfoByIdOutDTO = userService.readUserInfo(srcUserId, dstUserId);
        return ResponseEntity.status(HttpStatus.OK).body(readUserInfoByIdOutDTO);
    }
    @GetMapping("/follow")
    public ResponseEntity<ReadUserOutDTOs> readFollowers(@ModelAttribute ReadFollowerInDTOs readFollowerInDTOs,
                                                       HttpServletRequest request) throws Exception {
        long userId = (long) request.getAttribute("userId");
        readFollowerInDTOs.setAuthUserId(userId);
        ReadUserOutDTOs readFollowerOutDTOs = userService.readFollowers(readFollowerInDTOs);
        return ResponseEntity.status(HttpStatus.OK).body(readFollowerOutDTOs);
    }

    @PostMapping("/follow")
    public ResponseEntity<String> createFollow(@RequestBody CreateFollowInDTO createFollowInDTO,
                                               HttpServletRequest request) throws Exception {
        long userId = (long) request.getAttribute("userId");
        createFollowInDTO.setSrcUserId(userId);
        followService.createFollow(createFollowInDTO);
        return ResponseEntity.status(HttpStatus.OK).body("SUCCESS");
    }

    @DeleteMapping("/follow")
    public ResponseEntity<String> deleteFollow(@RequestBody DeleteFollowInDTO deleteFollowInDTO,
                                               HttpServletRequest request) throws Exception {
        long userId = (long) request.getAttribute("userId");
        deleteFollowInDTO.setSrcUserId(userId);
        followService.deleteFollow(deleteFollowInDTO);
        return ResponseEntity.status(HttpStatus.OK).body("SUCCESS");
    }

    @GetMapping("/pass")
    public ResponseEntity<String> pass() throws Exception{
        return ResponseEntity.status(HttpStatus.OK).body("SUCCESS");
    }
}