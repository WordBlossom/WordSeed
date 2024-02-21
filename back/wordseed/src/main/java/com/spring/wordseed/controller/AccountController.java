package com.spring.wordseed.controller;

import com.spring.wordseed.dto.in.CreateUserInDTO;
import com.spring.wordseed.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/account", produces = "application/json; charset=utf-8")
public class AccountController {
    private final UserService userService;

    @Autowired
    public AccountController(UserService userService) {
        this.userService = userService;
    }
    @PostMapping
    public ResponseEntity<Long> createUser(@RequestBody CreateUserInDTO createUserInDTO) throws Exception{
        long userId = userService.createUser(createUserInDTO);
        return ResponseEntity.status(HttpStatus.OK).body(userId);
    }
}
