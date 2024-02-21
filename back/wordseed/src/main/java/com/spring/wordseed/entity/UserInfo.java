package com.spring.wordseed.entity;

import com.spring.wordseed.enu.Informable;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name = "user_infos")
public class UserInfo extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userInfoId;
    private String userDecp;
    @Column(nullable = false)
    private Long postCnt;
    @Column(nullable = false)
    private Long followSrcCnt;
    @Column(nullable = false)
    private Long followDstCnt;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Informable informable;
    @OneToOne(mappedBy = "userInfo")
    private User user;
}
