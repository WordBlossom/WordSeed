package com.spring.wordseed.dto.in;

import com.spring.wordseed.enu.PostAlign;
import com.spring.wordseed.enu.PostType;
import com.spring.wordseed.enu.PostVisibility;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreatePostInDTO {
    private String content;
    private String url;
    private PostType postType;
    private PostAlign postAlign;
    private PostVisibility postVisibility;
}
