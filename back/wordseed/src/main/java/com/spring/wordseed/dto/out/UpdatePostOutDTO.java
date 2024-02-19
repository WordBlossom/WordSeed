package com.spring.wordseed.dto.out;

import com.spring.wordseed.enu.PostAlign;
import com.spring.wordseed.enu.PostType;
import com.spring.wordseed.enu.PostVisibility;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class UpdatePostOutDTO {
    private Long postId;
    private String content;
    private String url;
    private PostType postType;
    private PostAlign postAlign;
    private PostVisibility postVisibility;
    private Long likedCnt;
    private Long BookMarkCnt;
    private Long commentCnt;
    private Long userId;
    private Long wordId;
    private String word;
    private Boolean liked;
    private Boolean bookMarked;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
