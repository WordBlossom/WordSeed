package com.spring.wordseed.controller;

import com.spring.wordseed.dto.in.*;
import com.spring.wordseed.dto.out.*;
import com.spring.wordseed.enu.*;
import com.spring.wordseed.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {
    private final PostService postService;
    @Autowired
    PostController(PostService postService){
        this.postService = postService;
    }
    // 작품 업로드
    @PostMapping("")
    public ResponseEntity<CreatePostOutDTO> createPost(@RequestBody CreatePostInDTO createPostInDTO) throws Exception {
        CreatePostOutDTO createPostOutDTO = postService.createPost(createPostInDTO);

        return ResponseEntity.status(HttpStatus.OK).body(createPostOutDTO);
    }
    // 작품 목록 조회
    @GetMapping("/list")
    public ResponseEntity<ReadPostOutDTOs> readPosts(@RequestParam("postType") String postType,
                                                          @RequestParam("mark") String mark,
                                                          @RequestParam("userId") Long userId,
                                                          @RequestParam("sort") PostSort sort,
                                                          @RequestParam("query") String query,
                                                          @RequestParam("page") Long page,
                                                          @RequestParam("size") Long size) throws Exception {
        ReadPostOutDTOs readPostOutDTOs = postService.readPosts(postType, mark, userId, sort, query, page, size);

        return ResponseEntity.status(HttpStatus.OK).body(readPostOutDTOs);
    }
    // 작품 상세 조회
    @GetMapping("/detail")
    public ResponseEntity<ReadPostByPostIdOutDTO> readPostByPostId(@RequestParam("postId") Long postId) throws Exception {
        ReadPostByPostIdOutDTO readPostByPostIdOutDTO = postService.readPostByPostId(postId);
        return ResponseEntity.status(HttpStatus.OK).body(readPostByPostIdOutDTO);
    }
    // 작품 수정
    @PutMapping("")
    public ResponseEntity<UpdatePostOutDTO> updatePost(@RequestBody UpdatePostInDTO updatePostInDTO) throws Exception {
        UpdatePostOutDTO updatePostOutDTO = postService.updatePost(updatePostInDTO);

        return ResponseEntity.status(HttpStatus.OK).body(updatePostOutDTO);
    }
    // 작품 삭제
    @DeleteMapping("")
    public ResponseEntity<HttpStatus> deletePost(@RequestBody DeletePostInDTO deletePostInDTO, HttpServletRequest request) throws Exception {
        long userId = (long) request.getAttribute("userId");
        postService.deletePost(deletePostInDTO, userId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    // 댓글 조회
    @GetMapping("/comment")
    public ResponseEntity<ReadCommentOutDTOs> readComments(@RequestParam("postId") Long postId,
                                                                @RequestParam("page") Long page,
                                                                @RequestParam("size") Long size) {
        ReadCommentOutDTOs readCommentOutDTOs = ReadCommentOutDTOs.builder()
                .comments(new ArrayList<>()).build();

        for (int i = 0; i < 5; i++) {
            ReadCommentOutDTO readCommentOutDTO = ReadCommentOutDTO.builder()
                    .commentId(1L)
                    .userId(1L)
                    .postId(postId)
                    .content("content")
                    .createdAt(LocalDateTime.now())
                    .build();

            readCommentOutDTOs.getComments().add(readCommentOutDTO);
        }

        return ResponseEntity.status(HttpStatus.OK).body(readCommentOutDTOs);
    }
    // 댓글 작성
    @PostMapping("/comment")
    public ResponseEntity<CreateCommentOutDTO> createPost(@RequestBody CreateCommentInDTO createCommentInDTO) throws Exception {
        // add request for userId
        CreateCommentOutDTO createCommentOutDTO = CreateCommentOutDTO.builder()
                .commentId(1L)
                .userId(1L)
                .postId(createCommentInDTO.getPostId())
                .content(createCommentInDTO.getContent())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(createCommentOutDTO);
    }
    // 댓글 수정
    @PutMapping("/comment")
    public ResponseEntity<UpdateCommentOutDTO> UpdatePost(@RequestBody UpdateCommentInDTO updateCommentInDTO) throws Exception {
        // add request for userId
        UpdateCommentOutDTO updateCommentOutDTO = UpdateCommentOutDTO.builder()
                .commentId(updateCommentInDTO.getCommentId())
                .userId(1L)
                .postId(1L)
                .content(updateCommentInDTO.getContent())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(updateCommentOutDTO);
    }
    // 댓글 삭제
    @DeleteMapping("/comment")
    public ResponseEntity<HttpStatus> deleteComment(@RequestBody DeleteCommentInDTO deleteCommentInDTO) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    // 좋아요 등록
    @PostMapping("/like")
    public ResponseEntity<CreateLikeOutDTO> createLike(@RequestBody CreateLikeInDTO createLikeInDTO) throws Exception{
        CreateLikeOutDTO createLikeOutDTO = CreateLikeOutDTO.builder()
                .postLikedId(1L)
                .userId(1L)
                .postId(1L)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(createLikeOutDTO);
    }
    // 좋아요 취소
    @DeleteMapping("/like")
    public ResponseEntity<HttpStatus> deleteLike(@RequestBody DeleteLikeInDTO deleteLikeInDTO) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    // 북마크 등록
    @PostMapping("/mark")
    public ResponseEntity<CreateBookMarkOutDTO> createBookMark(@RequestBody CreateBookMarkInDTO createBookMarkInDTO) throws Exception{
        CreateBookMarkOutDTO createBookMarkOutDTO = CreateBookMarkOutDTO.builder()
                .bookMarkId(1L)
                .userId(1L)
                .postId(1L)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(createBookMarkOutDTO);
    }
    
    // 북마크 취소
    @DeleteMapping("/mark")
    public ResponseEntity<HttpStatus> deleteBookMark(@RequestBody DeleteBookMarkInDTO deleteBookMarkInDTO) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
