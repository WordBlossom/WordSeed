package com.spring.wordseed.controller;

import com.spring.wordseed.dto.in.*;
import com.spring.wordseed.dto.out.*;
import com.spring.wordseed.entity.Post;
import com.spring.wordseed.enu.*;
import com.spring.wordseed.service.BookMarkService;
import com.spring.wordseed.service.PostLikedService;
import com.spring.wordseed.service.CommentService;
import com.spring.wordseed.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;

@RestController
@RequestMapping("/post")
public class PostController {
    private final PostService postService;
    private final BookMarkService bookMarkService;
    private final PostLikedService postLikedService;
    private final CommentService commentService;

    @Autowired

    PostController(PostService postService, PostLikedService postLikedService, CommentService commentService, BookMarkService bookMarkService){
        this.postService = postService;
        this.postLikedService = postLikedService;
        this.commentService = commentService;
        this.bookMarkService = bookMarkService;
    }

    // 작품 업로드
    @PostMapping("")
    public ResponseEntity<CreatePostOutDTO> createPost(@RequestBody CreatePostInDTO createPostInDTO) throws Exception {
        CreatePostOutDTO createPostOutDTO = postService.createPost(createPostInDTO);

        return ResponseEntity.status(HttpStatus.OK).body(createPostOutDTO);
    }

    // 특정 말씨에 대한 작품 목록 조회
    @GetMapping("/list/word")
    public ResponseEntity<ReadPostByPostIdOutDTOs> readPostsWithWord(@RequestParam("postType") String postType,
                                                     @RequestParam("mark") String mark,
                                                     @RequestParam("sort") PostSort sort,
                                                     @RequestParam(value = "query", required = false, defaultValue = "") String query,
                                                     @RequestParam(value = "wordId", required = false, defaultValue = "0") Long wordId,
                                                     @RequestParam("page") Long page,
                                                     @RequestParam("size") Long size,
                                                     HttpServletRequest request) throws Exception {
        long srcUserId = (long) request.getAttribute("userId");
        ReadPostByPostIdOutDTOs readPostByPostIdOutDTOs = postService.readPostsWithWord(postType, mark, sort, query, page, size, srcUserId, wordId);
        return ResponseEntity.status(HttpStatus.OK).body(readPostByPostIdOutDTOs);
    }
    
    // 관심 작가로 등록한 사람들의 작품 목록 조회
    @GetMapping("/list/subs")
    public ResponseEntity<ReadPostByPostIdOutDTOs> readPostsWithSubs(@RequestParam("postType") String postType,
                                                             @RequestParam("mark") String mark,
                                                             @RequestParam("sort") PostSort sort,
                                                             @RequestParam(value = "query", required = false, defaultValue = "") String query,
                                                             @RequestParam("page") Long page,
                                                             @RequestParam("size") Long size,
                                                             HttpServletRequest request) throws Exception {
        long srcUserId = (long) request.getAttribute("userId");
        ReadPostByPostIdOutDTOs readPostByPostIdOutDTOs = postService.readPostsWithSubs(postType, mark, sort, query, page, size, srcUserId);
        return ResponseEntity.status(HttpStatus.OK).body(readPostByPostIdOutDTOs);
    }
    // 나의 작품 목록 조회
    @GetMapping("/list/self")
    public ResponseEntity<ReadPostByPostIdOutDTOs> readMyPosts(@RequestParam("postType") String postType,
                                                             @RequestParam("mark") String mark,
                                                             @RequestParam("sort") PostSort sort,
                                                             @RequestParam(value = "query", required = false, defaultValue = "") String query,
                                                             @RequestParam("page") Long page,
                                                             @RequestParam("size") Long size,
                                                             HttpServletRequest request) throws Exception {
        long srcUserId = (long) request.getAttribute("userId");
        ReadPostByPostIdOutDTOs readPostByPostIdOutDTOs = postService.readMyPosts(postType, mark, sort, query, page, size, srcUserId);
        return ResponseEntity.status(HttpStatus.OK).body(readPostByPostIdOutDTOs);
    }
    
    // 내가 북마크한 작품 목록 조회
    @GetMapping("/list/book-mark")
    public ResponseEntity<ReadPostByPostIdOutDTOs> readMyPostsWithBookMark(@RequestParam("postType") String postType,
                                                       @RequestParam("mark") String mark,
                                                       @RequestParam("sort") PostSort sort,
                                                       @RequestParam(value = "query", required = false, defaultValue = "") String query,
                                                       @RequestParam("page") Long page,
                                                       @RequestParam("size") Long size,
                                                       HttpServletRequest request) throws Exception {
        long srcUserId = (long) request.getAttribute("userId");
        ReadPostByPostIdOutDTOs readPostByPostIdOutDTOs = postService.readMyPostsWithBookMark(postType, mark, sort, query, page, size, srcUserId);
        return ResponseEntity.status(HttpStatus.OK).body(readPostByPostIdOutDTOs);
    }
    
    // 특정 사용자에 대한 작품 목록 조회
    @GetMapping("/list/user")
    public ResponseEntity<ReadPostByPostIdOutDTOs> readPostsWithUser(@RequestParam("postType") String postType,
                                                             @RequestParam("mark") String mark,
                                                             @RequestParam(value = "userId", required = false, defaultValue = "0") Long userId,
                                                             @RequestParam("sort") PostSort sort,
                                                             @RequestParam(value = "query", required = false, defaultValue = "") String query,
                                                             @RequestParam("page") Long page,
                                                             @RequestParam("size") Long size,
                                                             HttpServletRequest request) throws Exception {
        long srcUserId = (long) request.getAttribute("userId");
        ReadPostByPostIdOutDTOs readPostByPostIdOutDTOs = postService.readPostsWithUser(postType, mark, userId, sort, query, page, size, srcUserId);
        return ResponseEntity.status(HttpStatus.OK).body(readPostByPostIdOutDTOs);
    }

    // 작품 상세 조회
    @GetMapping("/detail")
    public ResponseEntity<ReadPostByPostIdOutDTO> readPostByPostId(@RequestParam("postId") Long postId, HttpServletRequest request) throws Exception {
        long srcUserId = (long) request.getAttribute("userId");

        ReadPostByPostIdOutDTO readPostByPostIdOutDTO = postService.readPostByPostId(postId, srcUserId);
        return ResponseEntity.status(HttpStatus.OK).body(readPostByPostIdOutDTO);
    }

    // 작품 수정
    @PutMapping("")
    public ResponseEntity<UpdatePostOutDTO> updatePost(@RequestBody UpdatePostInDTO updatePostInDTO, HttpServletRequest request ) throws Exception {
        long userId = (long) request.getAttribute("userId");
        UpdatePostOutDTO updatePostOutDTO = postService.updatePost(updatePostInDTO, userId);
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
    public ResponseEntity<ReadCommentOutDTOs> readComments(@RequestParam("postId") Long postId, @RequestParam("page") Long page, @RequestParam("size") Long size) {
        ReadCommentOutDTOs readCommentOutDTOs = postService.readComment(postId, page, size);
        return ResponseEntity.status(HttpStatus.OK).body(readCommentOutDTOs);
    }

    // 댓글 작성
    @PostMapping("/comment")
    public ResponseEntity<CreateCommentOutDTO> createComment(@RequestBody CreateCommentInDTO createCommentInDTO, HttpServletRequest request) throws Exception {
        long userId = (long) request.getAttribute("userId");
        CreateCommentOutDTO createCommentOutDTO = commentService.createComment(createCommentInDTO, userId);

        return ResponseEntity.status(HttpStatus.OK).body(createCommentOutDTO);
    }

    // 댓글 수정
    @PutMapping("/comment")
    public ResponseEntity<UpdateCommentOutDTO> UpdateComment(@RequestBody UpdateCommentInDTO updateCommentInDTO) throws Exception {
        // add request for userId
        UpdateCommentOutDTO updateCommentOutDTO = commentService.updateComment(updateCommentInDTO);

        return ResponseEntity.status(HttpStatus.OK).body(updateCommentOutDTO);
    }

    // 댓글 삭제
    @DeleteMapping("/comment")
    public ResponseEntity<HttpStatus> deleteComment(@RequestBody DeleteCommentInDTO deleteCommentInDTO) throws Exception {
        commentService.deleteComment(deleteCommentInDTO);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 좋아요 등록
    @PostMapping("/like")
    public ResponseEntity<CreateLikeOutDTO> createLike(@RequestBody CreateLikeInDTO createLikeInDTO, HttpServletRequest request) throws Exception {
        long userId = (long) request.getAttribute("userId");
        CreateLikeOutDTO createLikeOutDTO = postLikedService.createLike(createLikeInDTO, userId);

        return ResponseEntity.status(HttpStatus.OK).body(createLikeOutDTO);
    }

    // 좋아요 취소
    @DeleteMapping("/like")
    public ResponseEntity<HttpStatus> deleteLike(@RequestBody DeleteLikeInDTO deleteLikeInDTO, HttpServletRequest request) throws Exception {
        long userId = (long) request.getAttribute("userId");
        postLikedService.deleteLike(deleteLikeInDTO, userId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    // 북마크 등록
    @PostMapping("/mark")
    public ResponseEntity<CreateBookMarkOutDTO> createBookMark(@RequestBody CreateBookMarkInDTO createBookMarkInDTO, HttpServletRequest request) throws Exception{
        long userId = (long) request.getAttribute("userId");
        CreateBookMarkOutDTO createBookMarkOutDTO = bookMarkService.createBookMark(createBookMarkInDTO, userId);

        return ResponseEntity.status(HttpStatus.OK).body(createBookMarkOutDTO);
    }

    // 북마크 취소
    @DeleteMapping("/mark")
    public ResponseEntity<HttpStatus> deleteBookMark(@RequestBody DeleteBookMarkInDTO deleteBookMarkInDTO, HttpServletRequest request) throws Exception {
        long userId = (long) request.getAttribute("userId");
        bookMarkService.deleteBookMark(deleteBookMarkInDTO, userId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
