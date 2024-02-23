package com.spring.wordseed.dto.out;

import com.spring.wordseed.enu.PostAlign;
import com.spring.wordseed.enu.PostType;
import com.spring.wordseed.enu.PostVisibility;
import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReadPostByPostIdOutDTO {
    private Long postId;
    private Long userId;
    private String userName;
    private PostType postType;
    private PostAlign postAlign;
    private PostVisibility postVisibility;
    private String content;
    private String url;
    private Long likedCnt;
    private Long bookMarkCnt;
    private Long commentCnt;
    private Boolean liked;
    private Boolean bookMarked;
    private Boolean subscribed;
    private Long wordId;
    private String word;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
