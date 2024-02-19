package com.spring.wordseed.controller;

import com.spring.wordseed.dto.in.*;
import com.spring.wordseed.dto.out.*;
import com.spring.wordseed.enu.PostAlign;
import com.spring.wordseed.enu.PostSort;
import com.spring.wordseed.enu.PostType;
import com.spring.wordseed.enu.PostVisibility;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {
    // 작품 업로드
    @PostMapping("")
    public ResponseEntity<CreatePostOutDTO> createPost(@RequestBody CreatePostInDTO createPostInDTO) throws Exception {
        // add request for userId
        CreatePostOutDTO createPostOutDTO = CreatePostOutDTO.builder()
                .postId(1L)
                .url(createPostInDTO.getUrl())
                .postType(createPostInDTO.getPostType())
                .postAlign(createPostInDTO.getPostAlign())
                .postVisibility(createPostInDTO.getPostVisibility())
                .likedCnt(0L)
                .bookMarkCnt(0L)
                .commentCnt(0L)
                .userId(1L)
                .wordId(1L)
                .word("random")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now()).build();

        return ResponseEntity.status(HttpStatus.OK).body(createPostOutDTO);
    }
    // 작품 목록 조회
    @GetMapping("/list")
    public ResponseEntity<List<ReadPostOutDTO>> readPosts(@RequestParam String postType,
                                                          @RequestParam String mark,
                                                          @RequestParam Long userId,
                                                          @RequestParam PostSort sort,
                                                          @RequestParam String query,
                                                          @RequestParam Long page,
                                                          @RequestParam Long size) throws Exception {

        List<ReadPostOutDTO> readPostOutDTOs = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            ReadPostOutDTO readPostOutDTO = ReadPostOutDTO.builder()
                    .postId((long) (i + 1))
                    .userId((long) (i + 1))
                    .userName("userName")
                    .postType(PostType.TEXT)
                    .content("content")
                    .url("url")
                    .likedCnt(0L)
                    .bookMarkCnt(0L)
                    .commentCnt(0L)
                    .liked(true)
                    .bookMarked(true)
                    .subscribed(true)
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();

            readPostOutDTOs.add(readPostOutDTO);
        }

        return ResponseEntity.status(HttpStatus.OK).body(readPostOutDTOs);
    }
    // 작품 상세 조회
    @GetMapping("/detail")
    public ResponseEntity<ReadPostByPostIdOutDTO> readPostByPostId(@RequestParam Long postId) throws Exception {
        ReadPostByPostIdOutDTO readPostByPostIdOutDTO = ReadPostByPostIdOutDTO.builder()
                .postId(1L)
                .userId(1L)
                .userName("userName")
                .postType(PostType.TEXT)
                .postAlign(PostAlign.LEFT)
                .postVisibility(PostVisibility.PRIVATE)
                .content("content")
                .url("url")
                .likedCnt(0L)
                .bookMarkCnt(0L)
                .commentCnt(0L)
                .liked(true)
                .bookMarked(true)
                .subscribed(true)
                .wordId(1L)
                .word("word")
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(readPostByPostIdOutDTO);
    }
    // 작품 수정
    @PutMapping("")
    public ResponseEntity<UpdatePostOutDTO> updatePost(@RequestBody UpdatePostInDTO updatePostInDTO) throws Exception {
        UpdatePostOutDTO updatePostOutDTO = UpdatePostOutDTO.builder()
                .postId(updatePostInDTO.getPostId())
                .content(updatePostInDTO.getContent())
                .url(updatePostInDTO.getUrl())
                .postType(updatePostInDTO.getPostType())
                .postAlign(updatePostInDTO.getPostAlign())
                .postVisibility(updatePostInDTO.getPostVisibility())
                .likedCnt(0L)
                .BookMarkCnt(0L)
                .commentCnt(0L)
                .userId(1L)
                .wordId(1L)
                .word("word")
                .liked(true)
                .bookMarked(true)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(updatePostOutDTO);
    }
    // 작품 삭제
    @DeleteMapping("")
    public ResponseEntity<HttpStatus> deletePost(@RequestParam Long postId) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    // 댓글 조회
    @GetMapping("/comment")
    public ResponseEntity<List<ReadCommentOutDTO>> readComments(@RequestParam Long postId,
                                                                @RequestParam Long page,
                                                                @RequestParam Long size) {
        List<ReadCommentOutDTO> readCommentOutDTOs = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            ReadCommentOutDTO readCommentOutDTO = ReadCommentOutDTO.builder()
                    .commentId(1L)
                    .userId(1L)
                    .postId(postId)
                    .content("content")
                    .createdAt(LocalDateTime.now())
                    .build();

            readCommentOutDTOs.add(readCommentOutDTO);
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
