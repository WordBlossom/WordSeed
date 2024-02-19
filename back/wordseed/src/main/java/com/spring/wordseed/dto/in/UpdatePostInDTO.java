package com.spring.wordseed.dto.in;

import com.spring.wordseed.enu.PostAlign;
import com.spring.wordseed.enu.PostType;
import com.spring.wordseed.enu.PostVisibility;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UpdatePostInDTO {
    private Long postId;
    private String content;
    private String url;
    private PostType postType;
    private PostAlign postAlign;
    private PostVisibility postVisibility;
}
