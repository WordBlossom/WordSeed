package com.spring.wordseed.dto.out;

import com.spring.wordseed.enu.PostAlign;
import com.spring.wordseed.enu.PostType;
import com.spring.wordseed.enu.PostVisibility;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
public class CreatePostOutDTO {
    private Long postId;
    private String content;
    private String url;
    private PostType postType;
    private PostAlign postAlign;
    private PostVisibility postVisibility;
    private Long likedCnt;
    private Long bookMarkCnt;
    private Long commentCnt;
    private Long userId;
    private Long wordId;
    private String word;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
