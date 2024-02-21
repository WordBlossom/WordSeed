package com.spring.wordseed.entity;

import com.spring.wordseed.enu.PostAlign;
import com.spring.wordseed.enu.PostType;
import com.spring.wordseed.enu.PostVisibility;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "posts")
public class Post extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;
    private String content;
    private String url;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PostType postType;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PostAlign postAlign;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PostVisibility postVisibility;
    @Column(nullable = false)
    private Long likedCnt;
    @Column(nullable = false)
    private Long bookMarkCnt;
    @Column(nullable = false)
    private Long commentCnt;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "word_id")
    private Word word;
    @Builder.Default
    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PostLiked> postLikeds = new ArrayList<>();
    @Builder.Default
    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookMark> bookMarks = new ArrayList<>();
    @Builder.Default
    @OneToMany(mappedBy = "post", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();
}
