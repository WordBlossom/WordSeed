package com.spring.wordseed.dto.out;

import com.spring.wordseed.enu.PostType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReadPostOutDTO {
    private Long postId;
    private Long userId;
    private String userName;
    private PostType postType;
    private String content;
    private String url;
    private Long likedCnt;
    private Long bookMarkCnt;
    private Long commentCnt;
    private Boolean liked;
    private Boolean bookMarked;
    private Boolean subscribed;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
